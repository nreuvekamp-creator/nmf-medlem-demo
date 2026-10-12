# NMF visual kit (nmf.no + nmf.profundo.no/medlem)

Collected 2026-10-12 from live HTML/CSS (curl) and verified with Playwright screenshots at 1440px and 390px. Theme: WordPress "mint" by Mint Media AS (Bootstrap 4 + WPBakery). Scratch copies of all HTML/CSS and screenshots are in the session scratchpad (`sitekit/dl`, `sitekit/shots`).

## 1. Header

Markup (home page, identical on all pages):

```
#wrapper-navbar
  nav#main-nav.navbar.navbar-expand-xl.bg-dark      (position: fixed, 87px tall at 1440px, bg #01394b)
    .container (flex, space-between, align-items center)
      a.navbar-brand.custom-logo-link > img 108x108 png   (rendered 60px high in a 170px box, object-fit contain; 46px wide at <=850px)
      #left-menu.navbar-nav   Hjem | Saker | Kampanjer v | Mer v
      a.navbar-brand.nav-text "Norges Miljøvernforbund"   (absolutely centred, white, Literata 1.25rem; in-flow on <=991px)
      #right-menu.navbar-nav  Kontakt | Doner | Min Side
      ul.navbar-nav > a.nav-link.btn.btn-primary.text-white "Bli medlem"
      button.navbar-toggler.hamburger.hamburger--spin  (only <1200px)
```

| Item | href | Style |
|---|---|---|
| Hjem | https://www.nmf.no/ | nav link, light blue #7ebed3 (odd items) |
| Saker | https://www.nmf.no/saker/ | nav link, white (even items) |
| Kampanjer (dropdown) | # ; children: Miljøkampanjer /miljokampanjer/, Underskriftskampanjer /underskriftskampanjer/ | light blue, caret |
| Mer (dropdown) | # ; children: Om nmf /om-nmf/, Publikasjoner /publikasjoner/, Naturboksen /naturboksen/ | white, caret |
| (centre) Norges Miljøvernforbund | https://www.nmf.no/ | white text brand |
| Kontakt | https://www.nmf.no/kontakt/ | light blue |
| Doner | https://nmf.profundo.no/gi | white |
| Min Side | https://www.nmf.no/minside/ | light blue |
| Bli medlem | https://nmf.profundo.no/medlem | yellow text #ffcc00, transparent bg, no border, radius 10px; hover bg #00354c |

CSS facts (theme.css unless noted):
- `.navbar { position: fixed !important; z-index: 999; width: 100%; border-bottom: 1px solid rgba(0,0,0,.1); padding: .5rem 1rem }` so the header stays on top while scrolling (measured navTop = 0 after scroll). Content starts under it (hero is 99vh so it does not matter there).
- `.bg-dark { background-color: #01394b !important }` (theme overrides Bootstrap's #343a40).
- `#main-nav .navbar-nav .nav-link { font-weight: 400; margin-right: 15px }`; measured: Literata serif 20px, padding 8px 12.8px, link height 46px.
- Alternating colours: `#main-nav .navbar-nav .nav-item:nth-child(odd) .nav-link { color: #7ebed3 }` (hover white), `:nth-child(even) .nav-link { color: #fff }` (hover #7ebed3); generic `.nav-link:hover { color: #ffcc00 }`.
- `#main-nav .btn-primary { background: transparent; color: #ffcc00 !important; border: none }`, `:hover { background: #00354c; color: #ffcc00 }`.
- Fonts for menu come from customizer CSS: `.navbar a, .menu-item a { font-family: 'Literata', serif !important; font-weight: 400 }`.
- Dropdown (customizer CSS): white bg, `1px solid #ddd`, radius 4px, shadow `0 4px 8px rgba(0,0,0,.1)`, padding .5em 0, min-width 12rem; links #333 padding .5em 1em, hover bg #f5f5f5 / #000.
- Hamburger: `.hamburger-box 40x24px`, three 4px bars, radius 4px, 10px apart; CSS base colour #36778b but it renders white on the navy bar (screenshot). `hamburger--spin` animates to an X when open.
- Mobile (<1200px, verified at 390px): logo 46px + centred brand text + hamburger right; the menu opens in-flow beneath the bar on the same navy background, links stacked (Hjem, Saker, Kampanjer v, Mer v, Kontakt, Doner, Min Side, Bli medlem in yellow), dropdowns become plain indented lists at <=768px.
- Logo: https://www.nmf.no/wp-content/uploads/2024/06/cropped-7e949c_c69463e208f7425e832fb7686598682amv2.png (108x108). Larger versions: the favicon base file (512x512) and the Profundo header logo (1417x1417), see assets. No SVG logo exists on the site.
- Favicon: https://www.nmf.no/wp-content/uploads/2024/06/cropped-cropped-7e949c_c69463e208f7425e832fb7686598682amv2-32x32.png (also -192x192, -180x180 apple-touch-icon). Round emblem: grey ring with black "NORGES MILJØVERNFORBUND" / "NMF", inner light-blue rectangle with sun, eagle, tree, frog (the "totem").

## 2. Footer

Two stacked wrappers, both bg #01394b, white text (`.white, .white a { color: #fff }`), Poppins 300 16px, headings in nexa-rust-slab-black (uppercase look), full-width row with container 1140px inside.

`#wrapper-footer-full` > `.vc_row.vc_custom_1718954600924 { background-color: #01394b }` with four `vc_col-sm-3` columns (padding ~60px top/bottom, measured block height 421px):

| Col | Content |
|---|---|
| 1 | Logo img 108x108 (same png) |
| 2 | h3.font-size-xss (26px) "Sidekart"; links: Hjem /#, Saker /saker, Kampanjer /kampanjer, Om NMF /om-nmf, Kontakt oss /kontakt, Doner https://www.nmf.no/#doner, Bli medlem https://nmf.profundo.no/medlem (target _blank), Personvern /personvern/ |
| 3 | h3 "Info"; `Adresse: Skuteviksbodene 24, Bergen, Norge` ; `Epost: nmf@nmf.no` ; `Telefon: 55306700` (bold labels) |
| 4 | h3.font-size-xs (28px) "Ønsker du å kontakte oss?" ; button `.calltoaction.secondary .button` "Kontakt oss" -> https://nmf.no/kontakt/ ; h3.font-size-xxs (18px) "Følg oss" ; Facebook https://www.facebook.com/miljovernforbundet/events/?_rdr , Instagram https://www.instagram.com/miljovernforbundet/ , TikTok https://www.tiktok.com/@miljovernforbundet_ (plain text links, no icons) |

`#wrapper-footer { padding: 10px 0; background: #01394b }` > `.site-info { color: #fff; display: flex; justify-content: space-between }`: left "©2026 Norges Miljøvernforbund", right "Personvern | Mint Media AS" (links to /personvern/ and https://mintmedia.no).

Not on nmf.no: postcode and org number. Those are on the Profundo page: "NMF | Skuteviksbodene 24 | 5806 Bergen | Organisasjonsnummer: 871351082 | nmf.no" and "Lurer du på noe? Kontakt oss gjerne på 55306700 eller nmf@nmf.no".

## 3. Typography

Loaded font sources:
- Adobe Typekit kits, imported at the top of theme.css: `@import url("https://use.typekit.net/hkx2jct.css"); @import url("https://use.typekit.net/izx6iqc.css");` providing `poppins` (body) and `nexa-rust-slab-black` (headings). These are licensed to nmf.no's kit; a demo page cannot load them from another domain. Free stand-ins: Poppins (Google Fonts, identical), and for Nexa Rust Slab Black use "Alfa Slab One" or "Zilla Slab 900" (slab, heavy, uppercase look).
- Google Fonts actually used: `Literata:wght@400;500;700` and `Playfair+Display` (both via `@import` in customizer CSS) ; `Open+Sans` is linked in head but no rule uses it. "Inter" is referenced inline on the home page (explore cards, recruit section) but never loaded, so it falls back to Poppins/system sans.

| Role | Font | Size / weight / line-height | Colour |
|---|---|---|---|
| body | poppins, sans-serif | 16px / 300 / 1.5 | #212529 on #E5E6E5 |
| h1, h2, h3 | nexa-rust-slab-black | 900; h1 2.5rem, h2 2rem (h2 uppercase), h3 1.75rem; lh 1.2; margin-bottom .5rem | inherits (#212529), white in hero/footer |
| hero h1 "NMF" | nexa-rust-slab-black | `.font-size-xxl` 90px / lh 1.2 | #fff |
| hero h2 | nexa-rust-slab-black | 32px uppercase | #fff |
| section titles (Utforsk NMF, Støtt våre kampanjer, Bli med oss på laget) | 'Literata', serif (inline) | 2.3rem | #1f2d3d |
| `.headline` (used on some pages) | 'Playfair Display' | 700, lh 1.1, letter-spacing .02em | |
| nav links | Literata | 20px / 400 | see header |
| card title (vc-loop-post h3 a) | nexa-rust-slab-black | 14px / 900 / 1.3, 3-line clamp | #333 |
| card excerpt | Literata (container) | 12px / 1.4 | #555 |
| "Les mer" | Literata | 16px / 500 | #386c8a |
| hero buttons | poppins | 15px / 400 | #fff |
| footer headings | nexa-rust-slab-black | 26 / 28 / 18px (font-size-xss / xs / xxs), lh 1.3em | #fff |
| theme size helpers | | xxl 90, xl 64, lg 52, md 48, mds 42, sm 32, xs 28, xss 26, xxs 18 px | |
| h4-h6 | inherit body | 1.5 / 1.25 / 1rem, weight 500 | |

Mobile (<=600px customizer rule): h1 1.3rem, h2/h3/p 1rem.

## 4. Colour tokens

| Token | Hex | Where |
|---|---|---|
| navy (header + footer) | #01394b | `.bg-dark`, footer rows, `.navbar.hero-menu` |
| primary teal-blue | #36778b | links, `.btn-primary`, hero "Bli medlem" button, hamburger, active Saker tab, read-more pills, `--primary` |
| primary hover / active | #2b5f6f / #285866 (btn), #214854 (link hover) | |
| secondary dark | #052020 | `.btn-secondary`, `--secondary`, button shadows |
| light blue (secondary button) | #8ac2d3 | hero "Om NMF", footer "Kontakt oss" |
| light blue nav links | #7ebed3 | odd nav items |
| yellow accent | #ffcc00 (nav Bli medlem) / #ffc432 (theme hover text, `.calltoaction.third`, underline in `.history-container`) | |
| deep teal (custom components) | #005566 (gradient to #003847), hover #00404a / #003f49 | campaign buttons, signature form, counters |
| teal-green complement | #00675F (hover #005F55), #008080 (hover #006666) | kampanje buttons |
| dark heading teal | #00343c | kampanje card h3, popup text |
| title ink | #1f2d3d | section titles |
| campaign box | #223d46 bg, #1b3138 border, #e0f7f5 text | `.nmf-campaign-box` |
| link blue (custom) | #386c8a (hover #005177), #3a7ca5 | "Les mer", "Se mer" button, recruit "Bli medlem" button, explore card Kampanjer |
| explore card accents | #c49a2c (Saker, gold), #2f9e44 (Bli medlem, green), #5c6ac4 (Om, indigo) | left borders + link text |
| hover green | #2b7a0b | `.inner-article:hover h3 a` |
| red CTA | #dc2626 (hover #b91c1c) "Tips oss" floating pill; #d62828 tips form | |
| body bg | #E5E6E5 | body |
| surface | #fff cards; #f9f9f9 kampanje card; #f7fbfd explore gradient end; #f9fafb inputs | |
| borders | rgba(0,0,0,.125) card, #ddd, #e5e7eb inputs, #ccc popup inputs | |
| text | #212529 body, #333 titles, #555 excerpts, #4a4a4a category | |
| Bootstrap extras | #dc3545 danger, #28a745 success, #ffc107 warning, #17a2b8 info | |

Not found: #171835 (the only matches are substrings of WPBakery tab ids), #61a229 / #4e8221 are the cookie-banner button colours (cookie-law-info plugin), not brand colours.

## 5. Buttons and cards

Buttons:
- Bootstrap `.btn`: padding .375rem .75rem, 16px, radius 10px, transition .15s. `.btn-primary` #36778b/#36778b border, hover #2b5f6f, focus ring rgba(84,139,156,.5).
- Theme `.calltoaction .button` (hero, footer): display block, padding 15px 50px 15px 40px, 15px/400, line-height 20px, radius 10px, `2px solid` border, transition ease-in .2s; variants: `.primary` bg #36778b border #36778b + shadow `0 0 20px rgba(0,0,0,.1)` and an arrow icon; `.primaryv2` bg #36778b with white border (this is what the hero "Bli medlem" renders: white text, #36778b bg, 2px white border, 54px tall); `.secondary` bg #8ac2d3 white border; `.white` white bg #052020 text; `.inverted` #ffc432 bg #36778b text; `.third` #ffc432; hover generally -> transparent bg, text #ffc432, `scale: 1.02`. Not uppercase.
- Custom (customizer) buttons: `.nmf-button-blue` #005566, white, 600, UPPERCASE, .9rem, padding 10px 20px, radius 6px, shadow 0 4px 12px rgba(0,0,0,.1), hover #00404a + translateY(-2px). `.kampanje-knapp` same at .85rem. `.custom-button` ("Se mer"): #386c8a, 12px 24px, 16px, radius 8px, hover #005177. Recruit "Bli medlem": inline `.75rem 2rem; background #3a7ca5; radius 12px; weight 600`. Signature submit: 42px tall, gradient #005566->#003847, 700, .95rem, UPPERCASE, letter-spacing .5px, radius 10px, shadow 0 2px 10px rgba(0,85,102,.4). Tips-oss pill: radius 50px, 14px 28px, 1.2rem 600.
- Inputs (signature/popup forms): `1px solid #e5e7eb`, radius 8px, padding 10px 14px, .9rem, bg #f9fafb, focus border #005566 + `0 0 0 3px rgba(0,85,102,.1)`; labels 600 .95rem #00343c.

Cards:
- Post cards on home and /saker/ (`article.vc-loop-post.card.h-100`, 3 per row in `.vc-loop-posts` with -15px gutters): white bg, radius 12px, overflow hidden, shadow `0 6px 18px rgba(0,0,0,.08)`, hover translateY(-5px) + `0 12px 24px rgba(0,0,0,.12)`, flex column, text centred; `.card-img-container` 250px tall (230px <=992px) with `img.card-img-top` object-fit cover; `.card-body` padding 15px; title h3 14px 3-line clamp #333; excerpt 12px #555 3-line clamp; `.card-meta` centred with `span.read-more` "Les mer" #386c8a 500 (hover underline); `a.card-link-overlay` makes the whole card clickable. Markup:
  `<article class="vc-loop-post card h-100"><a class="card-link-overlay" href=...></a><div class="card-img-container"><img class="card-img-top"></div><div class="card-body"><h3 class="card-title"><a>Title</a></h3><p class="card-text">...</p><div class="card-meta"><span class="read-more">Les mer</span></div></div></article>`
- /saker/ page: h1 "VÅRE SAKER" centred (uppercase slab) + grey subtitle, pill search box ("Søk i artikler", 2px blue border, full width), then category tab buttons (Marintmiljø, Artsmangfold, Miljøgifter, Trygg mat, Energi, Samferdsel, Andre saker): white Poppins text, active #36778b, inactive muted grey-blue (approx #6c9aa8 from screenshot), ~45px tall, small radius, 10px gaps; category heading "MARINTMILJØ" underlined; then the card grid above. A wolf mascot widget ("wolfy") sits fixed bottom-right.
- Explore cards (home, `.nmf-explore-card`): radius 22px, padding 2.2rem 2rem 2.4rem, gradient `#ffffffee -> #f7fbfd`, shadow `0 14px 40px rgba(10,30,40,.12)`, border-left 6px colour-coded, h3 Literata 1.7rem, hover translateY(-7px). Grid 4 columns >=1100px, 2 at >=768px, horizontal scroll-snap on mobile.
- Kampanje cards: bg #f9f9f9, radius 10px, max-width 350px, img 200px cover with 1px #ddd bottom border, padding 20px, shadow 0 4px 16px rgba(0,0,0,.1).
- Signature/campaign box: white, radius 12px, lifted (translateY(-5px), shadow 0 15px 30px rgba(0,0,0,.15)), header gradient #005566->#003847 with white 1.25rem 800 title, counter 1.8rem 800 #005566.

## 6. Layout

- Container: Bootstrap 4 `.container` max-width 540/720/960/1140px at 576/768/992/1200px, 15px side padding. `.wrapper { padding: 30px 0 }`, WPBakery spacers 30px, explore section padding 4rem 1.5rem 4.5rem, campaign/recruit headers padding 3rem 1.5rem 1.5rem; `.wpb_text_column p { line-height: 35px }` for text columns.
- Home hero `.vc_row.hero-video.vc_row-no-padding`: full-width, `height: 99vh`, background image https://www.nmf.no/wp-content/uploads/2024/06/forsidebilde.jpg (1792x1024, orcas under a fjord with snow mountains) `center / cover`, `:after` overlay `rgba(0,0,0,.3)`. Text block `.front-text` absolute (top 220px, left 110px, translateY(250px); top 374px <=1195px): h1 "NMF" 90px white, h2 "Norges Miljøvernforbund" 32px white uppercase, p "En av Norges mest aktive frivillige organisasjoner innen miljøvern" white Poppins ~18px, then two buttons "Bli medlem" (#36778b) and "Om NMF" (#8ac2d3). On mobile the text sits in the lower half, buttons stacked.
- Home sections in order: hero; "Siste nytt" (h1 centred) + search + 6 cards + hidden 6 more + "Se mer" button; "Utforsk NMF" + 4 explore cards; "Støtt våre kampanjer" + campaign box (text left, signature form right); "Bli med oss på laget" recruit card (video left, text + "Bli medlem" right, max-width 1100px, radius 18px, shadow 0 12px 40px rgba(10,30,40,.12)); footer. Fixed red "Tips oss" pill top-right.

## 7. Profundo membership page (https://nmf.profundo.no/medlem)

- Stack: Bootstrap 3.3.2 (maxcdn), Font Awesome 7, toastr, own /css/style.css (3 KB). Body: "Helvetica Neue", Helvetica, Arial 14px #333 on white; everything in one centred `col-sm-4` (360px wide at 1440px); the grid columns left/right are empty.
- Header: `<img src="/img/nmf/NMF_hovedlogo.png">` full column width (360px round emblem).
- Form (`POST https://nmf.profundo.no/medlem`), field order:
  1. label "Type medlemskap" (required star in red) + `select#medlemskap.form-control`: "Ordinært medlemskap (200,- pr år)" (ME-7-1, default), "Pensjonist (50,- pr år)", "Student (50,- pr år)", "Ufør / AAP / Dagpenger (50,- pr år)".
  2. `button.vipps-button.vipps-button-continue` (name vippsrecurring): orange Vipps SVG "Fortsett med Vipps", 162x34px.
  3. `button.btn.btn-primary#videre` "Fortsett med kortbetaling" (Bootstrap 3 blue #337ab7, border #2e6da4, radius 4px, padding 6px 12px, 34px tall). Clicking reveals the hidden fields below (JS).
  4. Mobil (numeric), Fornavn, Etternavn, Adresse, Postnr/sted (80px "Postnr" input + auto poststed), E-post; each `label` + `input.form-control` (34px, 1px #ccc, radius 4px), form-group margin 20px.
  5. `button.btn.btn-primary[name=send]` "Bli medlem".
  Hidden honeypot `#email_work`.
- Footer, centred: "Vilkår" link (https://nmf.no/vilkar-for-medlemskap/); "NMF | Skuteviksbodene 24 | 5806 Bergen | Organisasjonsnummer: 871351082 | nmf.no"; "Lurer du på noe? Kontakt oss gjerne på 55306700 eller nmf@nmf.no".
- Feel: bare, default Bootstrap 3, no NMF colours except the logo. A successor should keep the same order (membership type -> Vipps -> card -> contact fields -> Bli medlem) but use the nmf.no navy/teal, Poppins and the round logo.

## 8. Assets downloaded (/Users/niels/nmf-medlem/assets/)

Logo and icons:

| File | Source | Note |
|---|---|---|
| nmf-logo-108.png | https://www.nmf.no/wp-content/uploads/2024/06/cropped-7e949c_c69463e208f7425e832fb7686598682amv2.png (header + footer logo) | 108x108, indexed png |
| nmf-logo-512.png | https://www.nmf.no/wp-content/uploads/2024/06/cropped-cropped-7e949c_c69463e208f7425e832fb7686598682amv2.png (site-icon base, home head) | 512x512, best nmf.no-hosted size |
| nmf-logo-profundo-hovedlogo.png | https://nmf.profundo.no/img/nmf/NMF_hovedlogo.png (Profundo header) | 1417x1417 RGBA, crispest version of the emblem |
| nmf-favicon-32.png, nmf-favicon-192.png | ...cropped-cropped-...-32x32.png / -192x192.png (home head `rel=icon`) | |

Photos (all from nmf.no; NMF's own photos unless noted, usage rights belong to NMF, fine for an internal demo). Ratings: hero = full-width background with text overlay; pile = close-up of litter mass to visualise weight.

| File | Source URL (page) | Shows | Orientation, px | Hero | Pile |
|---|---|---|---|---|---|
| litter-01-boat-volunteers-rydditide.jpg | https://www.nmf.no/wp-content/uploads/2026/01/rydditide.jpg (Levende Hav 2025) | NMF work boat on calm fjord with volunteers and filled white sacks | landscape 1200x671 | 5 | 2 |
| litter-02-kids-coast-signs-Skoleturne5.jpg | .../2026/01/Skoleturne5.jpg (Levende Hav 2025) | school kids on rocky shore holding handmade signs, mountains behind | landscape 1200x900 | 4 | 1 |
| litter-03-underwater-ghost-trap-teineplukk4.jpg | .../2026/01/teineplukk4.jpg (Levende Hav 2025) | diver video still, lost crab trap under water, turquoise | landscape 1920x1080 (low quality) | 3 | 2 |
| litter-04-beach-group-bags-Fiumare3.jpg | .../2026/01/Fiumare3.jpg (Levende Hav 2025) | large volunteer group on sand beach behind collected sacks and flags | landscape 958x720 | 4 | 3 |
| litter-05-beach-pile-group-FiuMare_-bilde-1.jpeg | .../2026/01/FiuMare_-bilde-1.jpeg (FiuMare strandrydding) | 5 volunteers around a pile: nets, buoys, yellow jerrycan, sacks, FiuMare banner | landscape 1536x1093 | 4 | 4 |
| litter-06-quay-group-banner-IMG_8264-2.jpg | .../2025/12/IMG_8264-2.jpg (Levende Hav 2025) | team on quay with "Miljøvern" banner and sacks, harbour behind | landscape 1192x744 | 4 | 3 |
| litter-07-canoe-bags-lake-Elver-og-Vassdrag_-bilde-7.jpg | .../2026/02/Elver-og-Vassdrag_-bilde-7.jpg (Elver & Vassdrag 2025) | canoe loaded with white sacks crossing Nesttunvatnet, autumn | landscape 1200x936 | 4 | 4 |
| litter-08-team-waders-Elver_og_Vassdrag__bilde_3-scaled.jpg | .../2026/02/Elver_og_Vassdrag__bilde_3-scaled.jpg (Elver & Vassdrag 2025) | 6-person team in black waders with sacks, portrait pose | landscape 2560x1694 | 4 | 1 |
| litter-09-pile-nets-rope-tauverkkaos.jpg | .../2025/04/tauverkkaos.jpg (Oceanize anmeldelse) | heap of discarded fishing nets and rope, sacks, daylight | landscape 768x617 | 2 | 5 |
| litter-10-pile-nets-excavator-tauverkoggravemaskin.jpg | .../2025/04/tauverkoggravemaskin.jpg (same post) | mountain of nets with excavator | landscape 768x615 | 2 | 5 |
| litter-11-boat-tyres-crew-SAM0394-2.jpeg | .../2026/09/SAM0394-2.jpeg (Hjelmås dekkdeponi) | two crew on small boat hauling tyres, harbour | landscape 1200x675 | 4 | 3 |
| litter-12-pile-tyres-night-DSCF5291.jpg | .../2026/09/DSCF5291.jpg (Hjelmås dekkdeponi) | pile of salvaged tyres on quay at night | landscape 1200x799 | 2 | 4 |
| litter-13-microplastic-rocks-closeup-microplastvedvann.jpg | .../2025/04/microplastvedvann.jpg (Oceanize) | plastic fibres between shoreline stones, close-up | portrait 768x894 | 1 | 4 |
| scenic-01-fjord-aerial-2010-10-25_Oslofjord.jpg | .../2026/09/2010-10-25_Oslofjord.jpg (Oslofjordplan post) | aerial Oslofjord islands, blue sky | landscape 1280x853 | 5 | 0 |
| hero-home-forsidebilde.jpg | https://www.nmf.no/wp-content/uploads/2024/06/forsidebilde.jpg (home hero background) | orcas below the surface, snowy fjord mountains (looks AI-generated) | landscape 1792x1024 | 5 | 0 |
| poster-medlem-Hjelp-oss-a-ta-vare-pa-miljoet_plakat-958x539-1.webp | .../2024/11/Hjelp-oss-a-ta-vare-pa-miljoet_plakat-958x539-1.webp (sidebar of every post) | membership poster: two terns on a rock, script text "Hjelp oss å ta vare på miljøet! Vi skal gi det videre..." and "nmf.no/medlem", credit "Foto: Arnfinn Nilsen" | landscape 958x539 | 3 | 0 |

Other candidates seen but not copied: Elver-og-Vassdrag bilde 1/2/4 (group with sacks 768px; forest litter; dumped car), FiuMare bilde 3/4 (beach group, classroom), skoleturne.jpg (classroom), IMG_4825.jpg (hands holding tyre ring), Abandoned_boat_Kippford (third-party geograph.org.uk CC BY-SA), 2-2009..2-2023.png (aerial mussel-farm screenshots), muchotiers.jpg (underwater tyres).

Mug:
- No mug, cup, nettbutikk or medlemsgave exists on nmf.no (site HTML, search page) and web searches for "Miljøvernforbundet krus" / "Norges Miljøvernforbund nettbutikk krus medlemsgave" return nothing (only unrelated Naturvernforbundet material).
- Fallback: `mug-fallback-red-ceramic-cc0-daderot.jpg` = Wikimedia Commons "File:Coffee - Massachusetts.jpg", author Daderot, licence CC0 1.0 (public domain dedication), original 2950x2847, saved here at 1920x1853. Plain glossy red ceramic mug, side view, handle left, white background: a logo can be overlaid on the body; being CC0 it may also be recoloured (desaturate to white/navy) freely. No clean white mug on a neutral background was found on Commons (white-mug hits all had busy backgrounds); Unsplash/Pexels were not queried (no API key).

## 9. Membership-related copy found on nmf.no

- No member count, membership total or goal is published anywhere on nmf.no (home, saker, om-nmf, kontakt, posts).
- Hero: "En av Norges mest aktive frivillige organisasjoner innen miljøvern".
- Explore card "Bli medlem": "Stå sammen med oss og styrk miljøvernet der det trengs." link "Bli en del av NMF ->".
- Recruit section: "Bli med oss på laget" / "Bli med i Norges Miljøvernforbund: Stå sammen med oss for å beskytte natur, dyr og mennesker. Som medlem får du innsikt, mulighet til å bidra og styrker kampen for miljøet." button "Bli medlem".
- Om NMF: "stiftet i 1993 av Kurt Oddekalv ... hovedsete i Bergen"; "Totemet er Norges Miljøvernforbunds høyeste symbol og ethvert medlem i Miljøvernforbundet plikter lojalt å beskytte og verne om totemets elementer."
- Poster in every post sidebar: "Hjelp oss å ta vare på miljøet! Vi skal gi det videre... nmf.no/medlem".
- Prices (Profundo): ordinary 200 kr/year, pensioner/student/ufør 50 kr/year. (old.nmf.no still lists 380/200, outdated.)
- Footer link "Doner" -> https://nmf.profundo.no/gi.

## 10. Could not find / not verified

- Org number and postcode on nmf.no itself (only on Profundo); no social icons, only text links.
- Member count or membership goal: none published.
- #171835 navy and #61a229/#4e8221 greens are not brand colours (see section 4).
- An SVG or wide (horizontal) logo: none; only the round png emblem.
- Exact inactive Saker tab colour and the hamburger's rendered colour come from the screenshot, not from a CSS rule I could isolate.
- The Typekit fonts (poppins, nexa-rust-slab-black) cannot legally be loaded by the demo; use Google Poppins + a slab stand-in.
- Hover states and the "Fortsett med kortbetaling" reveal were not interacted with in the browser (read from CSS/markup).
