// Pure logic (no browser APIs), covered by tests.

const contractions: [RegExp, string][] = [
  [/\bcan't\b|\bcannot\b/g, 'can not'], [/\bwon't\b/g, 'will not'], [/\bi'm\b/g, 'i am'], [/\blet's\b/g, 'let us'], [/n't\b/g, ' not'],
  [/\b(you|we|they)'re\b/g, '$1 are'], [/\b(he|she|it|that|there|what|where|who)'s\b/g, '$1 is'], [/'ve\b/g, ' have'], [/'ll\b/g, ' will'], [/'d\b/g, ' would'],
];

/** Lowercase, straighten quotes, expand contractions, drop punctuation. */
export function normalize(s: string): string {
  let t = s.toLowerCase().replace(/[’`]/g, "'");
  for (const [re, r] of contractions) t = t.replace(re, r);
  return t.replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function distance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}

export type Check = { result: 'right' | 'close' | 'wrong'; best: string; diff: { word: string; ok: boolean }[] };

/** answer may list accepted forms separated by |. A small typo counts as "close". */
export function checkAnswer(input: string, answer: string): Check {
  const options = answer.split('|');
  const n = normalize(input);
  const scored = options.map((o) => ({ o, d: distance(n, normalize(o)) })).sort((x, y) => x.d - y.d);
  const { o: best, d } = scored[0];
  const typed = new Set(n.split(' '));
  const diff = normalize(best).split(' ').map((word) => ({ word, ok: typed.has(word) }));
  return { result: d === 0 ? 'right' : d <= 2 && n.length > 3 ? 'close' : 'wrong', best, diff };
}

export type Card = { box: number; due: string };
const INTERVALS = [1, 2, 4, 7, 15, 30];

export function dayStr(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function addDays(day: string, n: number): string {
  const [y, m, d] = day.split('-').map(Number);
  return dayStr(new Date(y, m - 1, d + n));
}

/** Spaced repetition: remembered moves the card up a box, forgotten sends it back to tomorrow. */
export function grade(card: Card | undefined, remembered: boolean, today: string): Card {
  const box = remembered ? Math.min((card?.box ?? -1) + 1, INTERVALS.length - 1) : 0;
  return { box, due: addDays(today, INTERVALS[box]) };
}

export function streak(days: string[], today: string): number {
  const set = new Set(days);
  let day = set.has(today) ? today : addDays(today, -1);
  let n = 0;
  while (set.has(day)) {
    n++;
    day = addDays(day, -1);
  }
  return n;
}

export function shuffle<T>(a: readonly T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

/** Parses pasted book lines: "English | Arabic" (also tab or " - " separated). */
export function parseImport(text: string): { en: string; ar: string }[] {
  return text.split(/\r?\n/).flatMap((line) => {
    const parts = line.split(/\s*\|\s*|\t|\s+-\s+/).map((p) => p.trim()).filter(Boolean);
    if (parts.length < 2) return [];
    const isAr = (s: string) => /[؀-ۿ]/.test(s);
    const en = parts.find((p) => !isAr(p));
    const ar = parts.find(isAr);
    return en && ar ? [{ en, ar }] : [];
  });
}
