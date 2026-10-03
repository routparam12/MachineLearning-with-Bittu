/* Structural metadata for the 11 pipeline stages. Prose (eyebrow, title, body)
   and the short rail labels live in i18n/*.js and are merged in by index.
   `game` names the component slotted into that stage's section, or null. */

export const STAGES = [
  { id: 'ingest',      game: null },
  { id: 'chunk',       game: 'TheCut' },
  { id: 'embed',       game: 'DropThePin' },
  { id: 'store',       game: null },
  { id: 'route',       game: 'PickThePipe' },
  { id: 'retrieve',    game: 'TwoBadges' },
  { id: 'rerank',      game: 'TheDial' },
  { id: 'assemble',    game: 'BuildTheAsk' },
  { id: 'generate',    game: 'WhatBroke' },
  { id: 'ground',      game: 'CheckTheClaim' },
  { id: 'personalize', game: null },
];

/* Chapter 3 in the games spec == pipeline stage 2 (chunking). "Two Searches" is
   folded into the retrieve stage alongside "Two Badges"; only one game renders
   per stage section, so Two Searches ships as an option inside TwoBadges' stage
   if you want both — kept as a component for that. */
