import { useSyncExternalStore } from 'react';
import { dayStr, grade, type Card } from './core';
import { lessons } from '../content/grammar';
import { sentences, type Sentence } from '../content/sentences';
import { words, type Word } from '../content/vocab';

export type Intro = { name: string; age: string; city: string; company: string; years: string; family: string; hobby: string; goal: string };

export type State = {
  planStart: string;
  dailyGoal: number;
  lessons: Record<string, { best: number }>;
  /** right/wrong per lesson id, used to find weak areas */
  stats: Record<string, { r: number; w: number }>;
  cards: Record<string, Card>;
  learnedByDay: Record<string, number>;
  activeDays: string[];
  planDone: number[];
  exams: { day: string; score: number }[];
  customWords: Word[];
  customSentences: Sentence[];
  intro: Intro;
};

const KEY = 'kalam-state';
const initial = (): State => ({
  planStart: dayStr(),
  dailyGoal: 5,
  lessons: {},
  stats: {},
  cards: {},
  learnedByDay: {},
  activeDays: [],
  planDone: [],
  exams: [],
  customWords: [],
  customSentences: [],
  intro: { name: '', age: '', city: 'Cairo', company: '', years: '', family: '', hobby: 'reading', goal: 'speak English fluently at work' },
});

function load(): State {
  try {
    return { ...initial(), ...JSON.parse(localStorage.getItem(KEY) ?? '{}') };
  } catch {
    return initial();
  }
}

let state = load();
const listeners = new Set<() => void>();

export function update(fn: (s: State) => Partial<State>) {
  const today = dayStr();
  const changes = fn(state);
  state = { ...state, ...changes };
  if (!state.activeDays.includes(today)) state = { ...state, activeDays: [...state.activeDays, today] };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
  listeners.forEach((l) => l());
}

export const useStore = () =>
  useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );

export const allWords = (s: State) => [...words, ...s.customWords];
export const allSentences = (s: State) => [...sentences, ...s.customSentences];

export const PASS = 70;
/** The lesson she is on: the first one not yet passed. */
export function currentIndex(s: State): number {
  const i = lessons.findIndex((l) => (s.lessons[l.id]?.best ?? 0) < PASS);
  return i < 0 ? lessons.length - 1 : i;
}
export const reachedLessons = (s: State) => lessons.slice(0, currentIndex(s) + 1);

export function dueCards(s: State): { id: string; en: string; ar: string }[] {
  const today = dayStr();
  const items = [...allWords(s), ...allSentences(s)];
  return items.filter((i) => s.cards[i.id] && s.cards[i.id].due <= today);
}

export const addToReview = (ids: string[]) =>
  update((s) => {
    const today = dayStr();
    const cards = { ...s.cards };
    for (const id of ids) if (!cards[id]) cards[id] = { box: 0, due: today };
    return { cards };
  });

export const gradeCard = (id: string, remembered: boolean) => update((s) => ({ cards: { ...s.cards, [id]: grade(s.cards[id], remembered, dayStr()) } }));

export function learnWords(ids: string[]) {
  addToReview(ids);
  const today = dayStr();
  update((s) => ({ learnedByDay: { ...s.learnedByDay, [today]: (s.learnedByDay[today] ?? 0) + ids.length } }));
}

export function recordAnswers(results: { lesson: string; right: boolean }[]) {
  update((s) => {
    const stats = { ...s.stats };
    for (const { lesson, right } of results) {
      const c = stats[lesson] ?? { r: 0, w: 0 };
      stats[lesson] = right ? { ...c, r: c.r + 1 } : { ...c, w: c.w + 1 };
    }
    return { stats };
  });
}

/** Lessons with enough answers and under 70% correct, weakest first. */
export function weakLessons(s: State) {
  return lessons
    .map((l) => ({ lesson: l, stat: s.stats[l.id] }))
    .filter((x) => x.stat && x.stat.r + x.stat.w >= 3)
    .map((x) => ({ lesson: x.lesson, pct: Math.round((x.stat.r / (x.stat.r + x.stat.w)) * 100) }))
    .filter((x) => x.pct < PASS)
    .sort((a, b) => a.pct - b.pct);
}

export function exportBackup() {
  return JSON.stringify(state);
}
export function importBackup(json: string) {
  const parsed = JSON.parse(json);
  if (typeof parsed !== 'object' || !parsed.cards) throw new Error('bad backup');
  update(() => ({ ...initial(), ...parsed }));
}
