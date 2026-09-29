/* index.ts — locale registry for the PyTorch section, same contract as the
   OOP section's i18n/index.ts. Keep this the only place that knows locale codes. */

import { en } from './en.js';
import { hi } from './hi.js';

export type Lang = 'en' | 'hi';

export const DEFAULT_LANG: Lang = 'en';
export const LANGS: Lang[] = ['en', 'hi'];
export const DICTS: Record<Lang, any> = { en, hi };

export const isLang = (x: unknown): x is Lang =>
  typeof x === 'string' && (LANGS as string[]).includes(x);

export const dict = (lang: string | undefined) => DICTS[isLang(lang) ? lang : DEFAULT_LANG];

/** This section's segment under /{lang}/. */
export const BASE = 'pytorch';

export function href(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `/${lang}/${BASE}/${clean}` : `/${lang}/${BASE}/`;
}

/** Same page, other locale — used by the language switcher. */
export function swapLang(url: URL, to: Lang): string {
  const parts = url.pathname.split('/').filter(Boolean);
  if (isLang(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return '/' + parts.join('/') + (parts.length === 1 ? '/' : '');
}

export const langPaths = () => LANGS.map((lang) => ({ params: { lang } }));
