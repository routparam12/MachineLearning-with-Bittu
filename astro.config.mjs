import { defineConfig } from 'astro/config';

// Honour a PORT from the environment (useful for hosted previews), else Astro's default.
const port = Number(process.env.PORT) || 4321;

export default defineConfig({
  site: 'https://ml-with-bittu.routparamjeet.workers.dev',
  // Set `base` if you deploy to a subfolder, e.g. GitHub Pages:
  // base: '/MachineLearning-with-Bittu',
  server: { port },

  // Six learning sections share this site:
  //   /{lang}/                      → ML with Bittu
  //   /{lang}/oop/                  → OOP in Python
  //   /{lang}/pytorch/              → PyTorch Essentials
  //   /{lang}/searching-sorting/…   → Algo Adda (Searching & Sorting)
  //   /{lang}/rag/                  → RAG Pipeline
  //   /{lang}/transformer/          → Transformer Forward Pass
  i18n: {
    locales: ['en', 'hi'],
    defaultLocale: 'en',
    // Keep the localized routes, but let src/pages/index.astro render the
    // production landing page directly instead of redirecting visitors to /en/.
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },

  // Bare, unprefixed entry points for each non-default section.
  redirects: {
    '/searching-sorting': '/en/searching-sorting/',
    '/rag': '/en/rag/',
    '/transformer': '/en/transformer/',
    '/oop': '/en/oop/',
    '/pytorch': '/en/pytorch/',
  },
});
