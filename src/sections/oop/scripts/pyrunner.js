/* pyrunner.js — runs real Python in the browser via Pyodide (CPython compiled
   to WebAssembly), loaded lazily from a CDN on the first "Run" click so pages
   that never run code never pay for it.

   Each call gets its own fresh globals dict, so one card's `class Shape` can't
   leak into another card's run. stdout is captured with contextlib.redirect_stdout;
   an exception is caught in Python and its traceback returned as text instead of
   throwing across the JS/Python boundary, so partial stdout is never lost. */

const PYODIDE_VERSION = '0.26.4';
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

let pyodidePromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      if (typeof window.loadPyodide !== 'function') {
        await loadScript(INDEX_URL + 'pyodide.js');
      }
      return window.loadPyodide({ indexURL: INDEX_URL });
    })().catch((err) => { pyodidePromise = null; throw err; });
  }
  return pyodidePromise;
}

function indent(code, spaces) {
  const pad = ' '.repeat(spaces);
  return code.split('\n').map((line) => (line.length ? pad + line : line)).join('\n');
}

/** Run `code`, capturing print() output. Returns { stdout, error }: error is a
    Python traceback string, or null on success. Never throws for user code errors —
    only for infrastructure failures (Pyodide itself failing to load). */
export async function runPython(code) {
  const pyodide = await getPyodide();
  const namespace = pyodide.globals.get('dict')();
  try {
    const wrapped = [
      'import io, contextlib, traceback, json',
      '__buf = io.StringIO()',
      '__err = None',
      'try:',
      '    with contextlib.redirect_stdout(__buf):',
      indent(code, 8),
      'except Exception:',
      '    __err = traceback.format_exc()',
      'json.dumps({"stdout": __buf.getvalue(), "error": __err})',
    ].join('\n');
    const raw = await pyodide.runPythonAsync(wrapped, { globals: namespace });
    return JSON.parse(raw);
  } finally {
    namespace.destroy();
  }
}

export const isReady = () => pyodidePromise !== null;
