/* NMF "Bli medlem" demo. Renders content.js, drives the kilo chart. No payment, nothing stored. */
(function () {
  'use strict';
  var C = window.NMF_CONFIG, L = window.NMF_LINKS, T = window.NMF_CONTENT;
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TILES = 60, TILE_KG = C.dayKg / TILES;   // full grid = one clean-up day
  var TILE_IMGS = [
    'litter-09-pile-nets-rope-tauverkkaos.jpg',
    'litter-10-pile-nets-excavator-tauverkoggravemaskin.jpg',
    'litter-12-pile-tyres-night-DSCF5291.jpg',
    'litter-05-beach-pile-group-FiuMare_-bilde-1.jpeg',
    'litter-13-microplastic-rocks-closeup-microplastvedvann.jpg',
    'litter-07-canoe-bags-lake-Elver-og-Vassdrag_-bilde-7.jpg'
  ];
  var maxTier = Math.max.apply(null, C.tiers);
  var axisMax = Math.ceil(maxTier / C.krPerKg / 250) * 250;   // 10 000 kr -> 1 000 kg
  var lang = /[?&]lang=(no|en)\b/.exec(location.search), saved;
  try { saved = localStorage.getItem('nmf-lang'); } catch (e) {}   // throws in private mode / cookies blocked
  lang = lang ? lang[1] : (saved === 'en' ? 'en' : 'no');

  var custom = $('#custom'), bar = $('#bar'), chart = $('#chart'), headline = $('#kg-headline');
  var numEl = document.createElement('span');
  numEl.className = 'kg-num';
  var tiles = [], lastTier = null, shownKg = 0, raf = 0;

  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+$)/g, '\u00A0'); }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, T[lang]);
  }
  function t(path, vars) {
    var s = get(path);
    if (typeof s !== 'string') { console.warn('content.js: missing key', path); return ''; }
    return s.replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; });
  }

  // valueAsNumber, not parseInt: "1e3" is 1000. ponytail: clamp at 10 M kr, fmt() garbles numbers past 1e21.
  function customKr() { var c = Math.min(Math.floor(custom.valueAsNumber), 1e7); return c > 0 ? c : 0; }
  function extraKr() {
    var r = $('input[name=tier]:checked');
    return customKr() || (r ? +r.value : 0);
  }

  function equivalence(kg) {
    var e = get('step2.equivalence');
    var units = kg < 10 ? ['bottle', 'ropeMetre'] : kg < 100 ? ['ropeMetre', 'jerrycan'] : ['sack', 'ropeMetre'];
    var parts = units.map(function (u) {
      var n = kg / C.units[u];
      n = u === 'bottle' && n > 50 ? Math.round(n / 10) * 10 : Math.round(n);
      return (n === 1 ? e[u].one : e[u].many).replace('{n}', fmt(n));
    });
    return e.intro + ' ' + parts.join(e.joiner) + '.';
  }

  function animateKg(target) {
    cancelAnimationFrame(raf);
    if (reduceMotion) { shownKg = target; numEl.textContent = fmt(target); return; }
    var from = shownKg, t0 = performance.now();
    headline.setAttribute('aria-busy', 'true');   // live region: announce the final number, not every frame
    (function step(now) {
      var p = Math.min(1, (now - t0) / 600);
      p = 1 - Math.pow(1 - p, 3);
      shownKg = from + (target - from) * p;
      numEl.textContent = fmt(shownKg);
      if (p < 1) raf = requestAnimationFrame(step); else headline.removeAttribute('aria-busy');
    })(t0);
  }

  function update() {
    var total = +$('input[name=membership]:checked').value + extraKr();
    var kg = Math.round(total / C.krPerKg);
    var vars = {
      now: fmt(C.membersNow), goal: fmt(C.membersGoal), left: fmt(C.membersGoal - C.membersNow),
      dayKg: fmt(C.dayKg), kg: fmt(kg), amount: fmt(total)
    };
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n, vars); });
    $$('[data-i18n-attr]').forEach(function (el) {
      el.dataset.i18nAttr.split(',').forEach(function (pair) {
        var p = pair.split(':');
        el.setAttribute(p[0], t(p[1], vars));
      });
    });
    // Headline keeps the number in its own fixed-width span so the text does not shift while counting.
    var parts = get('step2.kgHeadline').split('{kg}');
    headline.textContent = '';
    headline.append(parts[0], numEl, parts[1] || '');
    animateKg(kg);
    $('#cta-amt').textContent = fmt(total) + ' kr';
    bar.style.height = Math.min(100, kg / axisMax * 100) + '%';
    chart.classList.toggle('full-day', kg >= C.dayKg);
    var filled = Math.min(TILES, Math.ceil(kg / TILE_KG));
    tiles.forEach(function (el, i) { el.classList.toggle('on', i < filled); });
    $('#equiv').textContent = equivalence(kg);
  }

  function render() {
    document.documentElement.lang = lang;
    document.title = get('meta.title');
    var facts = $('#facts');
    facts.textContent = '';
    get('facts.items').forEach(function (f) {
      var a = document.createElement('article');
      a.className = 'card fact';
      a.innerHTML = '<p class="fact-number"></p><p class="fact-text"></p><a class="small" target="_blank" rel="noopener"></a>';
      a.children[0].textContent = f.number;
      a.children[1].textContent = f.text;
      a.children[2].textContent = f.source;
      a.children[2].href = f.url;
      if (f.example) {
        var tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = get('hero.exampleTag');
        a.append(' ', tag);
      }
      facts.append(a);
    });
    update();
  }

  $$('[data-link]').forEach(function (a) { a.href = L[a.dataset.link]; });
  C.tiers.forEach(function (kr) {
    var l = document.createElement('label');
    l.className = 'tier';
    l.innerHTML = '<input type="radio" name="tier"><span class="pill"></span><span class="tier-note"></span>';
    l.children[0].value = kr;
    l.children[1].textContent = fmt(kr) + ' kr';
    l.children[2].dataset.i18n = 'step2.tierNotes.' + kr;
    $('#tiers').append(l);
  });
  for (var v = 0; v <= axisMax; v += axisMax / 5) {
    var tick = document.createElement('span');
    tick.textContent = fmt(v);
    tick.style.bottom = v / axisMax * 100 + '%';
    $('#y-axis').append(tick);
  }
  $('#ref').style.bottom = C.dayKg / axisMax * 100 + '%';
  for (var i = 0; i < TILES; i++) {
    var tile = document.createElement('div');
    tile.className = 'tile';
    tile.style.setProperty('--img', 'url(assets/' + TILE_IMGS[i % TILE_IMGS.length] + ')');
    tile.style.setProperty('--i', i);
    tiles.push(tile);
    $('#tiles').append(tile);
  }
  var progress = $('#progress');
  progress.setAttribute('aria-valuemax', C.membersGoal);
  progress.setAttribute('aria-valuenow', C.membersNow);
  progress.firstElementChild.style.width = C.membersNow / C.membersGoal * 100 + '%';

  // click, not change: a second click on the chosen pill clears it, and arrow keys also fire click on radios.
  $('#tiers').addEventListener('click', function (e) {
    var r = e.target;
    if (r.name !== 'tier') return;
    if (r.value === lastTier) { r.checked = false; lastTier = null; } else { lastTier = r.value; }
    custom.value = '';
    update();
  });
  custom.addEventListener('input', function () {
    if (customKr()) {
      $$('input[name=tier]').forEach(function (r) { r.checked = false; });
      lastTier = null;
    }
    update();
  });
  $$('input[name=membership]').forEach(function (r) { r.addEventListener('change', update); });
  $('#pay').addEventListener('click', function () {
    var d = $('#thanks');
    if (d.showModal) d.showModal();
  });
  $('#lang').addEventListener('click', function () {
    lang = lang === 'no' ? 'en' : 'no';
    try { localStorage.setItem('nmf-lang', lang); } catch (e) {}
    render();
  });
  $('#hamburger').addEventListener('click', function () {
    var open = $('#header').classList.toggle('open');
    this.setAttribute('aria-expanded', open);
  });

  render();
})();
