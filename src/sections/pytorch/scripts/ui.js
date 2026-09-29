/* ui.js — renders the PyTorch reference into a mount node.
   Same contract as the OOP section's ui.js: mount(root, dict).

   Unlike the OOP section, these code blocks are NOT live-executable: PyTorch
   is not available in Pyodide (no WASM build exists, and there is no GPU
   access from a browser sandbox regardless), so a "Run" button here would
   either silently fail or have to fake its output — neither is honest. Every
   card instead shows its code next to the real, pre-computed output you'd
   get running it yourself locally, tucked behind a reveal so it doesn't
   spoil the read. */

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Hand Torchy something to say — same event contract as the other pets'
    *:context events, just under its own name. */
function tellTorchy(text, mood) {
  window.dispatchEvent(new CustomEvent('torchy:context', { detail: { text, mood } }));
}

function codebox(d, code, output) {
  return `
<div class="codebox">
  <div class="codebox-head">Python</div>
  <pre><code>${esc(code)}</code></pre>
</div>
<details class="expected">
  <summary>${esc(d.ui.outputLabel)}</summary>
  <pre>${esc(output)}</pre>
</details>`;
}

function card(d, c) {
  return `
<details class="card2" data-card-num="${c.num}">
  <summary class="card2-summary">
    <span class="card2-num">${c.num}</span>
    <h3 class="card2-title">${esc(c.title)}</h3>
    <span class="card2-chevron">▾</span>
  </summary>
  <div class="card2-body">
    <p>${esc(c.desc)}</p>
    ${codebox(d, c.code, c.output)}
  </div>
</details>`;
}

function part(d, p) {
  const anchor = `part-${p.num}`;
  return `
<section class="part" id="${anchor}">
  <div class="part-head">
    <span class="part-num">PART ${p.num}</span>
    <h2 class="part-title">${esc(p.title)}</h2>
  </div>
  <div class="cards">
    ${p.cards.map((c) => card(d, c)).join('')}
  </div>
</section>`;
}

function toc(d) {
  return `
<nav class="toc" aria-label="${esc(d.ui.tocLabel)}">
  ${d.parts.map((p) => `<a href="#part-${p.num}"><b>${p.num}</b>${esc(p.title)}</a>`).join('')}
</nav>`;
}

function shell(d, homeHref) {
  return `
<div class="wrap">
  <header class="head">
    <a class="back" href="${homeHref}">${esc(d.ui.backHome)}</a>
    <h1><span aria-hidden="true">🔥</span> ${esc(d.ui.heroA)} <em>${esc(d.ui.heroEm)}</em></h1>
    <p class="tagline">${esc(d.ui.heroSub)}</p>
    <p class="note">${esc(d.ui.pyodideNote)}</p>
  </header>

  ${toc(d)}

  ${d.parts.map((p) => part(d, p)).join('')}

  <p class="wrap foot">${esc(d.site.foot)}</p>
</div>`;
}

/** Torchy explains a card the moment it opens — no poke required, same
    proactive behaviour as the rest of the pet family. */
function wireCards(root, d) {
  const byNum = new Map(d.parts.flatMap((p) => p.cards).map((c) => [String(c.num), c]));
  root.querySelectorAll('[data-card-num]').forEach((el) => {
    el.addEventListener('toggle', () => {
      if (!el.open) return;
      const c = byNum.get(el.dataset.cardNum);
      if (c) tellTorchy(c.desc, 'think');
    });
  });
}

export function mount(root, dict) {
  const d = dict;
  const homeHref = root.dataset.home || '/';
  root.innerHTML = shell(d, homeHref);
  wireCards(root, d);
}
