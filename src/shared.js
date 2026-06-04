import _logoSrc from './assets/logo-new.png';
/* ─────────── 7C SHARED JS ─────────── */
(function() {
  // Base path — root since we use a custom domain
  const _BASE = '';
  // Site Header Web Component
  class SiteHeader extends HTMLElement {
    connectedCallback() {
      // Check if user is logged in
      let isLogged = false;
      try { isLogged = !!localStorage.getItem('7c_user'); } catch(e){}

      const checkInLink = isLogged
        ? `<a href="${_BASE}/archive.html">ACCOUNT</a>`
        : `<a href="${_BASE}/claim.html">CHECK-IN</a>`;

      this.innerHTML = `
        <style>
          .nav {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr auto 1fr 1fr 1fr;
            align-items: center;
            padding: 26px 48px;
            background: transparent;
            position: relative; z-index: 30;
            font-family: "Helvetica Neue", sans-serif;
            font-weight: 300; font-size: 12px; letter-spacing: .22em; text-transform: uppercase;
            border-bottom: 1px solid #1a1a1a;
          }
          .nav a { display: inline-block; padding: 6px 0; position: relative; transition: opacity .3s; color: inherit; text-decoration: none; cursor: pointer; }
          .nav a:hover { opacity: .55; }
          .nav a::after { content:""; position: absolute; left: 0; right: 100%; bottom: -4px; height: 1px; background: #1a1a1a; transition: right .3s; }
          .nav a:hover::after { right: 0; }
          .nav a.active::after { right: 0; }
          .nav .nav-l { text-align: left; }
          .nav .nav-r { text-align: right; }
          .nav .logo { display: flex; align-items: center; justify-content: center; padding: 0 28px; }
          .nav .logo img { height: 32px; width: auto; display: block; }
          .nav .cart { display: inline-flex; align-items: center; gap: 8px; }
          .nav .cart .count {
            font-family: "Helvetica Neue", sans-serif; font-weight: 400; font-size: 10px;
            background: #0a0a0a; color: #fff; padding: 1px 6px; letter-spacing: .04em;
          }
          .nav .mobile-toggle { display: none; background: none; border: none; font-size: 10px; font-family: "Helvetica Neue", sans-serif; cursor: pointer; letter-spacing: .2em; text-transform: uppercase; padding: 10px; color: inherit; }
          .mobile-menu { display: none; position: fixed; top: 0; left: 0; width: 80%; max-width: 320px; height: 100vh; background: #fff; z-index: 1000; flex-direction: column; padding: 40px; border-right: 1px solid #1a1a1a; transform: translateX(-100%); transition: transform 0.3s ease; }
          .mobile-menu.open { transform: translateX(0); }
          .mobile-overlay { display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
          .mobile-overlay.open { opacity: 1; pointer-events: auto; }
          .mobile-menu a { display: block; padding: 18px 0; font-family: "Helvetica Neue", sans-serif; font-weight: 300; font-size: 12px; letter-spacing: .22em; text-transform: uppercase; color: #1a1a1a; text-decoration: none; border-bottom: 1px solid rgba(0,0,0,0.1); }
          .mobile-menu a:last-child { border-bottom: none; }
          .mobile-menu a .count { font-family: "Helvetica Neue", sans-serif; font-weight: 400; font-size: 10px; background: #0a0a0a; color: #fff; padding: 1px 6px; letter-spacing: .04em; margin-left: 6px; }
          .mobile-menu .close-btn { align-self: flex-start; margin-bottom: 40px; font-size: 10px; background: none; border: none; cursor: pointer; letter-spacing: .2em; text-transform: uppercase; padding: 10px 0; color: #1a1a1a; }
          @media (max-width: 980px) {
            .nav { display: flex; align-items: center; justify-content: center; padding: 18px 20px; }
            .nav .nav-l, .nav .nav-r { display: none; }
            .nav .logo { padding: 0; }
            .nav .mobile-toggle { display: block; position: absolute; left: 10px; }
            .mobile-menu { display: flex; }
            .mobile-overlay { display: block; }
          }
        </style>
        <nav class="nav">
          <button class="mobile-toggle">MENU</button>
          <div class="nav-l"><a href="${_BASE}/#shop">SHOP</a></div>
          <div class="nav-l"><a href="${_BASE}/#brand">BRAND</a></div>
          <div class="nav-l"><a href="${_BASE}/#arrivals">ARRIVALS</a></div>
          <div class="logo"><a href="${_BASE}/"><img src="${_logoSrc}" alt="7C"/></a></div>
          <div class="nav-r"><a href="${_BASE}/#search">SEARCH</a></div>
          <div class="nav-r">${checkInLink}</div>
          <div class="nav-r"><a href="${_BASE}/#cart" class="cart">CART <span class="count">00</span></a></div>
        </nav>
        <div class="mobile-overlay"></div>
        <div class="mobile-menu">
          <button class="close-btn">CLOSE</button>
          <a href="${_BASE}/#shop">SHOP</a>
          <a href="${_BASE}/#brand">BRAND</a>
          <a href="${_BASE}/#arrivals">ARRIVALS</a>
          <a href="${_BASE}/#search">SEARCH</a>
          ${checkInLink}
          <a href="${_BASE}/#cart">CART <span class="count">00</span></a>
        </div>
      `;

      const mToggle = this.querySelector('.mobile-toggle');
      const mMenu = this.querySelector('.mobile-menu');
      const mOverlay = this.querySelector('.mobile-overlay');
      const mClose = this.querySelector('.close-btn');

      if (mToggle && mMenu && mOverlay && mClose) {
        mToggle.addEventListener('click', () => {
          mMenu.classList.add('open');
          mOverlay.classList.add('open');
        });
        mClose.addEventListener('click', () => {
          mMenu.classList.remove('open');
          mOverlay.classList.remove('open');
        });
        mOverlay.addEventListener('click', () => {
          mMenu.classList.remove('open');
          mOverlay.classList.remove('open');
        });
        mMenu.querySelectorAll('a').forEach(link => {
          link.addEventListener('click', () => {
            mMenu.classList.remove('open');
            mOverlay.classList.remove('open');
          });
        });
      }
    }
  }
  customElements.define('site-header', SiteHeader);

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const theme = this.getAttribute('theme') || 'light';
      const bg = theme === 'dark' ? '#0a0a0a' : '#ffffff';
      const ink = theme === 'dark' ? '#f2f0ec' : '#0a0a0a';
      const grey = theme === 'dark' ? 'rgba(255,255,255,.5)' : '#888';
      const border = theme === 'dark' ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.1)';

      this.innerHTML = `
        <style>
          .site-footer {
            background: ${bg}; color: ${ink}; padding: 40px 48px;
            font-family: "Helvetica Neue", sans-serif; font-weight: 300;
            border-top: 1px solid ${border};
          }
          .foot-cols {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
            margin-bottom: 24px;
          }
          .foot-cols b {
            display: block; font-size: 10px; letter-spacing: .2em; text-transform: uppercase;
            color: ${grey}; margin-bottom: 24px; font-weight: 500;
          }
          .foot-cols a {
            display: block; padding: 6px 0; font-size: 13px; color: ${ink}; transition: opacity .2s;
          }
          .foot-cols a:hover { opacity: .6; }
          .foot-wordmark { margin-bottom: 40px; }
          .foot-wordmark img { 
            height: clamp(60px, 10vw, 120px); width: auto; 
            ${theme === 'dark' ? 'filter: invert(1);' : ''}
          }
          .foot-bottom {
            padding-top: 24px;
            display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px;
            font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: ${grey};
          }
          .foot-bottom .c2 { text-align: center; }
          .foot-bottom .c3 { text-align: right; }
          .foot-launch {
            font-family: "IBM Plex Mono", "SF Mono", ui-monospace, monospace;
            font-size: 9px; letter-spacing: .2em;
            color: ${grey}; opacity: .45;
            margin-left: 14px; transition: opacity .3s;
            text-decoration: none;
          }
          .foot-launch:hover { opacity: 1; color: ${ink}; }
          @media (max-width: 900px) {
            .site-footer { padding: 40px 20px; }
            .foot-cols { grid-template-columns: 1fr 1fr; }
            .foot-bottom { grid-template-columns: 1fr; gap: 12px; }
            .foot-bottom .c2, .foot-bottom .c3 { text-align: left; }
          }
        </style>
        <footer class="site-footer">
          <div class="foot-wordmark">
            <img src="${_logoSrc}" alt="7C" />
          </div>
          <div class="foot-cols">
            <div>
              <b>SHOP</b>
              <a href="${_BASE}/#shop">Arrivals</a>
              <a href="${_BASE}/#shop">Collections</a>
              <a href="${_BASE}/#shop">Archive</a>
            </div>
            <div>
              <b>BRAND</b>
              <a href="${_BASE}/#brand">Studio</a>
              <a href="${_BASE}/#brand">Manifesto</a>
              <a href="${_BASE}/#brand">Ledger</a>
            </div>
            <div>
              <b>SERVICE</b>
              <a href="#">Contact</a>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
            </div>
            <div>
              <b>LEGAL</b>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
          <div class="foot-bottom">
            <div>© 7C STUDIOS · MMXXVI <a href="${_BASE}/launch.html" class="foot-launch" title="Launch Sequence">↗ LAUNCH</a></div>
            <div class="c2">EVERYWHERE — NOWHERE</div>
            <div class="c3" id="sf-time">00:00:00</div>
          </div>
        </footer>
      `;
      const timeEl = this.querySelector('#sf-time');
      if (timeEl) {
        const update = () => {
          timeEl.textContent = new Intl.DateTimeFormat('en-GB', { 
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: 'Europe/Madrid' 
          }).format(new Date()) + ' LOCAL';
        };
        update(); setInterval(update, 1000);
      }
    }
  }
  customElements.define('site-footer', SiteFooter);

  // Reveal observer
  const io = new IntersectionObserver((ents) => {
    ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  setTimeout(() => document.querySelectorAll('.reveal:not(.in)').forEach(el => el.classList.add('in')), 6000);

  // Barcode helper
  window.drawBarcode = function(svg, seed) {
    if (!svg) return;
    const bars = []; let x = 0, s = seed || Math.random()*1e6;
    const rnd = () => { s = (s*9301+49297)%233280; return s/233280; };
    while (x < 100) {
      const w = 0.4 + rnd()*2.2;
      if (rnd() > .35) bars.push(`<rect x="${x.toFixed(2)}" y="0" width="${w.toFixed(2)}" height="100%" fill="currentColor"/>`);
      x += w + .3 + rnd()*.7;
    }
    svg.innerHTML = bars.join('');
  };
  document.querySelectorAll('[data-barcode]').forEach((s, i) => drawBarcode(s, parseInt(s.dataset.barcode) || (i+1)*777));

  // Local store helpers for garment state
  window.SevenC = {
    ensureDemo() {
      // Seed a demo user + archive so deep-linked pages never crash
      if (!localStorage.getItem('7c_user')) {
        localStorage.setItem('7c_user', JSON.stringify({
          name: 'PASSENGER · DEMO', email: 'demo@7c.studios',
          joined: new Date().toISOString(), city: 'BARCELONA'
        }));
      }
      // Version guard — clear old archive if it was seeded with placeholder data
      if (localStorage.getItem('7c_archive_v') !== 'ss26') {
        localStorage.removeItem('7c_archive');
        localStorage.setItem('7c_archive_v', 'ss26');
      }
      if (!localStorage.getItem('7c_archive')) {
        localStorage.setItem('7c_archive', JSON.stringify([
          { no: 'AJ02', name: 'AVIATOR JACKET', cat: 'NAPPA LEATHER · SKY BLUE', season: 'SS26',
            edition: '0001 / 0777', size: 'M · EU 48', status: 'ACTIVE', silhouette: 'jacket',
            material: 'NAPPA LEATHER', color: 'SKY BLUE', price: '€1.782',
            shell: 'NAPPA LEATHER (BOVINE)', tannery: 'VEGETABLE TANNAGE', lining: 'COTTON SATEEN', trims: 'YKK BRASS ZIP', weight: '1.10 KG', care: 'DRY CLEAN ONLY',
            journey: [
              { city: 'FRANCE / NETHERLANDS', country: 'EU', date: 'JAN 26', role: 'RAW BOVINE LEATHER SOURCING', mode: 'ORIGIN', lat: 46.60, lng: 2.35 },
              { city: 'SANTA CROCE SULL\'ARNO', country: 'IT', date: 'FEB 26', role: 'TANNERY & BLUE DYE', mode: 'ROAD', lat: 43.73, lng: 10.77 },
              { city: 'PRATO', country: 'IT', date: 'MAR 26', role: 'TECHNICAL FINISHING & COLOUR TREATMENT', mode: 'ROAD', lat: 43.88, lng: 11.10 },
              { city: 'FLORENCE', country: 'IT', date: 'APR 26', role: 'GARMENT MANUFACTURE', mode: 'ROAD', lat: 43.77, lng: 11.25 },
              { city: 'MILAN', country: 'IT', date: 'MAY 26', role: 'QUALITY CONTROL & PACKAGING', mode: 'RAIL', lat: 45.46, lng: 9.19 },
              { city: 'PASSENGER / FINAL DESTINATION', country: '—', date: 'MAY 26', role: 'DISTRIBUTION', mode: 'FINAL', lat: 43.77, lng: 11.25 },
            ] },
          { no: 'CSO1', name: 'COAT SHELL', cat: 'GABARDINE · JET BLACK', season: 'SS26',
            edition: '0001 / 0777', size: 'M · EU 48', status: 'ACTIVE', silhouette: 'coat',
            material: 'GABARDINE', color: 'JET BLACK', price: '€1.485',
            shell: 'FULL GRAIN WHITE LEATHER', tannery: 'VEGETABLE TANNAGE', lining: 'GABARDINE WEAVE', trims: 'CONCEALED PRESS STUD', weight: '1.30 KG', care: 'DRY CLEAN ONLY',
            journey: [
              { city: 'SANTA CROCE SULL\'ARNO', country: 'IT', date: 'JAN 26', role: 'LEATHER SOURCING — FULL GRAIN WHITE', mode: 'ORIGIN', lat: 43.73, lng: 10.77 },
              { city: 'PRATO', country: 'IT', date: 'FEB 26', role: 'DIGITAL SURFACE PRINTING & TREATMENT', mode: 'ROAD', lat: 43.88, lng: 11.10 },
              { city: 'FLORENCE', country: 'IT', date: 'MAR 26', role: 'OUTERWEAR CONSTRUCTION & SOUND-ISOLATION COLLAR', mode: 'ROAD', lat: 43.77, lng: 11.25 },
              { city: 'MILAN', country: 'IT', date: 'APR 26', role: 'QUALITY CONTROL & PACKAGING', mode: 'RAIL', lat: 45.46, lng: 9.19 },
              { city: 'PASSENGER / FINAL DESTINATION', country: '—', date: 'MAY 26', role: 'DISTRIBUTION', mode: 'FINAL', lat: 43.77, lng: 11.25 },
            ] },
        ]));
      }
    },
    getUser() { try { return JSON.parse(localStorage.getItem('7c_user') || 'null'); } catch { return null; } },
    setUser(u) { localStorage.setItem('7c_user', JSON.stringify(u)); },
    getArchive() { try { return JSON.parse(localStorage.getItem('7c_archive') || '[]'); } catch { return []; } },
    setArchive(a) { localStorage.setItem('7c_archive', JSON.stringify(a)); },
    addGarment(g) {
      const a = this.getArchive();
      if (!a.find(x => x.no === g.no)) { a.push(g); this.setArchive(a); }
    },
    getJourneys() { try { return JSON.parse(localStorage.getItem('7c_journeys') || '{}'); } catch { return {}; } },
    setJourneys(j) { localStorage.setItem('7c_journeys', JSON.stringify(j)); },
    addPassage(no, p) {
      const j = this.getJourneys();
      j[no] = j[no] || [];
      j[no].push(p); this.setJourneys(j);
    },
  };

  // Live clock utility
  window.startClock = function(el, tz, prefix) {
    if (!el) return;
    const f = () => { el.textContent = (prefix||'') + new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false,timeZone:tz||'Europe/Madrid'}).format(new Date()); };
    f(); setInterval(f, 1000);
  };
})();
