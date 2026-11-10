import { words } from '../content/vocab';

// Tap-to-translate: finds a word in the vocabulary in either language, forgiving common prefixes and endings.

const isArabic = (s: string) => /[؀-ۿ]/.test(s);
const normAr = (s: string) =>
  s.replace(/[ً-ْـ]/g, '').replace(/[^ء-ي\s]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').trim();
const cleanEn = (s: string) => s.toLowerCase().replace(/[’]/g, "'").replace(/^[^a-z]+|[^a-z']+$/g, '');

const arExact = new Map<string, string[]>();
const arLoose = new Map<string, string[]>();
const enIndex = new Map<string, string[]>();
const push = (m: Map<string, string[]>, k: string, v: string) => {
  if (!k) return;
  const list = m.get(k) ?? [];
  if (!list.includes(v)) m.set(k, [...list, v]);
};
for (const w of words) {
  push(enIndex, w.en.toLowerCase(), w.ar);
  for (const part of w.ar.split(/[/،,()]/)) {
    const tokens = normAr(part).split(/\s+/).filter(Boolean);
    if (tokens.length === 1) push(arExact, tokens[0], w.en);
    else for (const t of tokens) if (t.length > 2) push(arLoose, t, w.en);
  }
}

const AR_PREFIXES = ['وال', 'بال', 'فال', 'كال', 'لل', 'ال', 'و', 'ب', 'ل', 'ف'];
const AR_SUFFIXES = ['هما', 'كم', 'هم', 'نا', 'ها', 'ين', 'ات', 'ون', 'ي', 'ك', 'ه'];

function arForms(word: string): string[] {
  const w = normAr(word);
  const forms = [w];
  for (const p of AR_PREFIXES) if (w.startsWith(p) && w.length - p.length > 1) forms.push(w.slice(p.length));
  for (const f of [...forms]) for (const s of AR_SUFFIXES) if (f.endsWith(s) && f.length - s.length > 1) forms.push(f.slice(0, -s.length));
  return forms;
}

function enForms(word: string): string[] {
  const w = cleanEn(word);
  const forms = [w, w.replace(/'s$/, '')];
  if (w.endsWith('ies')) forms.push(`${w.slice(0, -3)}y`);
  if (w.endsWith('es')) forms.push(w.slice(0, -2));
  if (w.endsWith('s')) forms.push(w.slice(0, -1));
  if (w.endsWith('ied')) forms.push(`${w.slice(0, -3)}y`);
  if (w.endsWith('ed')) forms.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith('ing')) forms.push(w.slice(0, -3), `${w.slice(0, -3)}e`);
  return forms;
}

/** Up to 4 meanings for a tapped word, or an empty list. */
export function lookup(word: string): string[] {
  const found: string[] = [];
  const add = (list?: string[]) => list?.forEach((x) => !found.includes(x) && found.push(x));
  if (isArabic(word)) {
    const forms = arForms(word);
    forms.forEach((f) => add(arExact.get(f)));
    if (!found.length) forms.forEach((f) => add(arLoose.get(f)));
  } else {
    enForms(word).forEach((f) => add(enIndex.get(f)));
  }
  return found.slice(0, 4);
}
