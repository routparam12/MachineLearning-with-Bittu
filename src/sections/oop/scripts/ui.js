/* ui.js — renders the OOP-in-Python walkthrough into a mount node.
   Same contract as the Transformer section's ui.js: mount(root, dict) builds
   the shell. Language comes from the page, because switching locale is a
   navigation, not a re-render. */

import { runPython } from './pyrunner.js';
import * as sound from '../../../shared/scripts/audio.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** Hand Classy something to say — same event contract as the Transformer
    section's transy:context, just under its own name so the two pets never
    cross-talk if a page ever imports both. */
function tellClassy(text, mood) {
  window.dispatchEvent(new CustomEvent('classy:context', { detail: { text, mood } }));
}

let boxSeq = 0;

/** One runnable code block: source, a "Run" button, a result panel, and the
    reference output tucked behind a <details> for anyone who wants to peek
    before running it themselves. */
function pybox(d, code, output) {
  const id = `pybox-${boxSeq++}`;
  return `
<div class="pybox" data-pybox id="${id}">
  <div class="pybox-head">
    <span class="pybox-label">Python</span>
    <button class="runbtn" data-run type="button">${esc(d.ui.runBtn)}</button>
  </div>
  <pre><code class="py-src">${esc(code)}</code></pre>
  <div class="pyresult" data-result></div>
  <details class="expected">
    <summary>${esc(d.ui.outputLabel)}</summary>
    <pre>${esc(output)}</pre>
  </details>
</div>`;
}

function pillar(d, card) {
  return `
<details class="pillar" data-pillar data-card-id="${card.id}">
  <summary class="pillar-summary">
    <span class="pillar-icon" aria-hidden="true">${card.icon}</span>
    <span>
      <h3 class="pillar-title">${esc(card.title)}</h3>
      <p class="pillar-oneliner">${esc(card.oneLiner)}</p>
    </span>
    <span class="pillar-chevron">▾</span>
  </summary>
  <div class="pillar-body">
    <div class="pillar-section">
      <h4>${esc(d.ui.definitionLabel)}</h4>
      <p>${esc(card.definition)}</p>
    </div>
    <div class="pillar-section">
      <h4>${esc(d.ui.implementationLabel)}</h4>
      <p>${esc(card.note)}</p>
    </div>
    <div class="pillar-section">
      <h4>${esc(d.ui.exampleLabel)}</h4>
      ${pybox(d, card.code, card.output)}
    </div>
    <div class="pillar-section">
      <h4>${esc(d.ui.realLifeLabel)}</h4>
      <p class="real-life">${esc(card.realLife)}</p>
    </div>
  </div>
</details>`;
}

function shell(d, homeHref) {
  return `
<div class="wrap">
  <header class="head">
    <a class="back" href="${homeHref}">${esc(d.ui.backHome)}</a>
    <h1><span aria-hidden="true">🐍</span> ${esc(d.ui.heroA)} <em>${esc(d.ui.heroEm)}</em></h1>
    <p class="tagline">${esc(d.ui.heroSub)}</p>
  </header>

  <section class="content-card">
    <p class="kicker">${esc(d.ui.introTitle)}</p>
    <h3>${esc(d.ui.classObjectTitle)}</h3>
    <p>${esc(d.ui.classObjectDef)}</p>
    ${pybox(d, d.classObject.code, d.classObject.output)}
  </section>

  <section class="pillars-head">
    <p class="kicker">${esc(d.ui.cardsTitle)}</p>
    <p>${esc(d.ui.cardsSub)}</p>
  </section>

  <section class="pillars">
    ${d.cards.map((card) => pillar(d, card)).join('')}
  </section>

  <section class="recap">
    <h3>${esc(d.ui.recapTitle)}</h3>
    <table>
      <thead><tr>
        <th>${esc(d.ui.recapConcept)}</th>
        <th>${esc(d.ui.recapMatlab)}</th>
        <th>${esc(d.ui.recapExample)}</th>
      </tr></thead>
      <tbody>
        ${d.recap.map((row) => `<tr><td>${esc(row.concept)}</td><td>${esc(row.matlab)}</td><td>${esc(row.example)}</td></tr>`).join('')}
      </tbody>
    </table>
    <p class="pyodide-note">${esc(d.ui.pyodideNote)}</p>
  </section>

  <p class="wrap foot">${esc(d.site.foot)}</p>
</div>`;
}

/** Wire every .pybox's Run button once, delegated from the root so freshly
    rendered boxes (none, here — the shell is static — but kept consistent
    with the rest of the site's mount pattern) all work. */
function wireRunButtons(root, d) {
  root.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-run]');
    if (!btn) return;
    const box = btn.closest('[data-pybox]');
    const src = box.querySelector('.py-src').textContent;
    const result = box.querySelector('[data-result]');

    sound.resumeIfEnabled();
    btn.disabled = true;
    btn.textContent = d.ui.runningLabel;
    result.className = 'pyresult pending';
    result.innerHTML = `<div class="pyresult-inner">${esc(d.ui.loadingLabel)}</div>`;

    try {
      const { stdout, error } = await runPython(src);
      if (error) {
        result.className = 'pyresult err';
        result.innerHTML = `<div class="pyresult-inner"><span class="pyresult-tag">${esc(d.ui.errorLabel)}</span>${esc(error)}</div>`;
        sound.playError();
        tellClassy(d.pet.runErr, 'oops');
      } else {
        result.className = 'pyresult ok';
        result.innerHTML = `<div class="pyresult-inner"><span class="pyresult-tag">${esc(d.ui.resultLabel)}</span>${esc(stdout) || '(no output)'}</div>`;
        sound.playSuccess();
        tellClassy(d.pet.runOk, 'done');
      }
    } catch (err) {
      result.className = 'pyresult err';
      result.innerHTML = `<div class="pyresult-inner"><span class="pyresult-tag">${esc(d.ui.errorLabel)}</span>${esc(err.message || String(err))}</div>`;
      tellClassy(d.pet.runErr, 'oops');
    } finally {
      btn.disabled = false;
      btn.textContent = d.ui.runAgainBtn;
    }
  });
}

/** Classy explains a pillar the moment it opens — no poke required, same
    proactive behaviour as the run-result narration above. */
function wirePillars(root, d) {
  const byId = Object.fromEntries(d.cards.map((c) => [c.id, c]));
  root.querySelectorAll('[data-pillar]').forEach((el) => {
    el.addEventListener('toggle', () => {
      if (!el.open) return;
      sound.playClick();
      const card = byId[el.dataset.cardId];
      if (card) tellClassy(card.definition, 'think');
    });
  });
}

export function mount(root, dict) {
  const d = dict;
  const homeHref = root.dataset.home || '/';
  root.innerHTML = shell(d, homeHref);
  wireRunButtons(root, d);
  wirePillars(root, d);
}
