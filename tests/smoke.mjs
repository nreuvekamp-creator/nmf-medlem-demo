// Run: node tests/smoke.mjs   (serves this folder with python3 -m http.server; set BASE_URL=https://host/ to test a deployed copy)
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NB = String.fromCharCode(160);   // U+00A0, the thousands separator fmt() emits
const root = fileURLToPath(new URL('..', import.meta.url));

// ponytail: no package.json here, so fall back to the newest Playwright in the npx cache
// (`npx -y playwright@1.64 install chromium-headless-shell` fills it and fetches the browser).
async function loadPlaywright() {
  try { return await import('playwright'); } catch {}
  const cache = join(homedir(), '.npm/_npx');
  const ver = d => JSON.parse(readFileSync(join(d, 'package.json'), 'utf8')).version;
  const dirs = (existsSync(cache) ? readdirSync(cache) : [])
    .map(d => join(cache, d, 'node_modules/playwright')).filter(d => existsSync(join(d, 'package.json')));
  assert(dirs.length, 'Playwright not found; run: npx -y playwright@1.64 install chromium-headless-shell');
  dirs.sort((a, b) => ver(a).localeCompare(ver(b), undefined, { numeric: true }));
  return import(join(dirs.pop(), 'index.mjs'));
}

async function startServer() {
  if (process.env.BASE_URL) return { base: process.env.BASE_URL.replace(/\/?$/, '/'), stop() {} };
  const port = await new Promise(r => { const s = createServer().listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => r(p)); }); });
  const proc = spawn('python3', ['-m', 'http.server', String(port), '--bind', '127.0.0.1', '-d', root], { stdio: 'ignore' });
  const base = `http://127.0.0.1:${port}/`;
  for (let i = 0; i < 50 && !(await fetch(base, { method: 'HEAD' }).then(r => r.ok, () => false)); i++) await new Promise(r => setTimeout(r, 100));
  return { base, stop: () => proc.kill() };
}

const errors = [];
let fails = 0;
async function check(name, fn) {
  try { await fn(); console.log('ok   ' + name); }
  catch (e) {
    fails++;
    const detail = 'expected' in e ? `got ${JSON.stringify(e.actual)}, expected ${JSON.stringify(e.expected)}` : String(e.message || e).split('\n')[0];
    console.log('FAIL ' + name + ': ' + detail);
  }
}
async function open(ctx, base, path = '') {
  const page = await ctx.newPage();
  page.on('console', m => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', e => errors.push(String(e)));
  await page.route(/fonts\.g(oogleapis|static)\.com/, r => r.fulfill({ contentType: 'text/css', body: '' }));   // offline-safe, fast
  await page.goto(base + path);
  return page;
}
async function expectHeadline(page, want) {
  await page.waitForFunction(s => document.getElementById('kg-headline').textContent === s, want, { timeout: 3000 })
    .catch(async () => { throw new Error(`headline is "${await page.textContent('#kg-headline')}", expected "${want}"`); });
}
const tilesOn = page => page.$$eval('#tiles .tile.on', t => t.length);
const tiersChecked = page => page.$$eval('input[name=tier]:checked', r => r.length);
const tier = kr => `label.tier:has(input[value="${kr}"])`;
const setCustom = (page, v) => page.evaluate(v => {   // paste-like: value set, one input event
  const c = document.getElementById('custom'); c.value = v; c.dispatchEvent(new Event('input', { bubbles: true }));
}, v);

const pw = await loadPlaywright();
const { base, stop } = await startServer();
const browser = await pw.chromium.launch();
try {
  const page = await open(browser, base);

  await check('default: ordinary 200 kr shows 20 kg, live region not busy after count-up', async () => {
    await expectHeadline(page, 'ca. 20 kg');
    await page.waitForFunction(() => !document.getElementById('kg-headline').hasAttribute('aria-busy'), null, { timeout: 2000 });
    assert.equal(await tilesOn(page), 2);
  });
  await check('student 50 kr -> 5 kg, 1 tile', async () => {
    await page.click('label.choice:has(input[value="50"])');
    await expectHeadline(page, 'ca. 5 kg');
    assert.equal(await tilesOn(page), 1);
  });
  await check('ordinary + 2000 kr tier -> 220 kg, 22 tiles, CTA 2 200 kr, equivalence matches', async () => {
    await page.click('label.choice:has(input[value="200"])');
    await page.click(tier(2000));
    await expectHeadline(page, 'ca. 220 kg');
    assert.equal(await tilesOn(page), 22);
    assert.equal(await page.textContent('#cta-amt'), `2${NB}200 kr`);
    assert.equal(await page.textContent('#equiv'), `Omtrent det samme som 22 fulle søppelsekker eller 1${NB}100 meter tykt tau.`);
  });
  await check('2000 kr tier clicked again -> deselected, back to 20 kg', async () => {
    await page.click(tier(2000));
    await expectHeadline(page, 'ca. 20 kg');
    assert.equal(await tiersChecked(page), 0);
  });
  await check('keyboard: ArrowDown on the tier radios updates the chart', async () => {
    await page.focus('input[name=tier]');
    await page.keyboard.press('ArrowDown');
    await expectHeadline(page, 'ca. 70 kg');
    await page.click(tier(500));
    await expectHeadline(page, 'ca. 20 kg');
  });
  await check('custom 10000 -> 1 020 kg, 60 tiles, tier cleared', async () => {
    await page.click(tier(100));
    await page.fill('#custom', '10000');
    await expectHeadline(page, `ca. 1${NB}020 kg`);
    assert.equal(await tilesOn(page), 60);
    assert.equal(await tiersChecked(page), 0);
    assert.equal(await page.textContent('#cta-amt'), `10${NB}200 kr`);
  });
  await check('custom "abc" / "-5" / "0" -> membership only; "1e3" = 1000; huge paste clamped', async () => {
    await setCustom(page, 'abc');
    await expectHeadline(page, 'ca. 20 kg');
    await page.fill('#custom', '-5');
    await expectHeadline(page, 'ca. 20 kg');
    await page.fill('#custom', '0');
    await expectHeadline(page, 'ca. 20 kg');
    await page.fill('#custom', '1e3');
    assert.equal(await page.textContent('#cta-amt'), `1${NB}200 kr`);
    await page.fill('#custom', '99999999999999999999999');
    assert.equal(await page.textContent('#cta-amt'), `10${NB}000${NB}200 kr`);
    await page.fill('#custom', '');
    await expectHeadline(page, 'ca. 20 kg');
  });
  await check('?lang=en -> html lang="en", nav "Home", dynamic strings in English', async () => {
    await page.goto(base + '?lang=en');
    assert.equal(await page.getAttribute('html', 'lang'), 'en');
    assert.equal(await page.textContent('#menu a[data-link=hjem]'), 'Home');
    await expectHeadline(page, 'about 20 kg');
    assert.equal(await page.title(), 'Become a member | Norges Miljøvernforbund');
    assert.equal(await page.getAttribute('#custom', 'placeholder'), 'Amount in kr');
  });
  await check('toggle -> Norwegian again, dynamic strings re-rendered', async () => {
    await page.click('#lang');
    assert.equal(await page.getAttribute('html', 'lang'), 'no');
    assert.equal(await page.textContent('#menu a[data-link=hjem]'), 'Hjem');
    await expectHeadline(page, 'ca. 20 kg');
    assert.equal(await page.getAttribute('#custom', 'placeholder'), 'Beløp i kr');
  });
  await check('dialog opens with the kg, closes, focus returns to the pay button', async () => {
    await page.click(tier(2000));
    await expectHeadline(page, 'ca. 220 kg');
    await page.click('#pay');
    assert.equal(await page.$eval('#thanks', d => d.open), true);
    assert.match(await page.textContent('#thanks'), /omtrent 220 kg/);
    await page.click('#thanks form button');
    assert.equal(await page.$eval('#thanks', d => d.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.id), 'pay');
  });
  await check('prefers-reduced-motion: same final numbers, set without animation', async () => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const p = await open(ctx, base);
    await p.click(tier(2000));
    assert.equal(await p.textContent('#kg-headline'), 'ca. 220 kg');   // synchronous, no rAF
    assert.equal(await tilesOn(p), 22);
    assert.equal(await p.textContent('#cta-amt'), `2${NB}200 kr`);
    assert.equal(await p.getAttribute('#kg-headline', 'aria-busy'), null);
    await ctx.close();
  });
  await check('localStorage throwing (private mode) still renders and toggles language', async () => {
    const ctx = await browser.newContext();
    await ctx.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }));
    const p = await open(ctx, base);
    await expectHeadline(p, 'ca. 20 kg');
    await p.click('#lang');
    assert.equal(await p.getAttribute('html', 'lang'), 'en');
    await ctx.close();
  });
  await check('no console errors or page errors during the run', () => assert.deepEqual(errors, []));
} finally {
  await browser.close();
  stop();
}
console.log(fails ? `${fails} check(s) failed` : 'all 13 checks passed');
process.exit(fails ? 1 : 0);
