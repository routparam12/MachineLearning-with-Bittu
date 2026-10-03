import en from './en.js';
import hi from './hi.js';

export const LOCALES = ['en', 'hi'];
export const DEFAULT_LOCALE = 'en';

const DICTS = { en, hi };

export function getDict(locale) {
  return DICTS[locale] || DICTS[DEFAULT_LOCALE];
}

export function swapLocale(url, to) {
  const parts = url.pathname.split('/').filter(Boolean);
  if (LOCALES.includes(parts[0])) parts[0] = to;
  else parts.unshift(to);
  return '/' + parts.join('/') + '/';
}

