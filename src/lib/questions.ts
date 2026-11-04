import { shuffle } from './core';
import { allSentences, reachedLessons, type State } from './store';
import type { Lesson } from '../content/grammar';

export type Question =
  | { kind: 'choice'; lesson: string; prompt: string; options: string[]; answer: string }
  | { kind: 'write'; lesson: string; prompt: string; answer: string }
  | { kind: 'listen'; lesson: string; prompt: string; answer: string };

export const quizOf = (l: Lesson): Question[] => [
  ...l.quiz.map(([prompt, right, a, b]): Question => ({ kind: 'choice', lesson: l.id, prompt, answer: right, options: shuffle([right, a, b]) })),
  ...l.write.map(([prompt, answer]): Question => ({ kind: 'write', lesson: l.id, prompt, answer })),
];

/** Arabic-to-English writing drill limited to the grammar she has reached. */
export function writingSet(s: State, count = 10): Question[] {
  const reached = reachedLessons(s);
  const ids = new Set(reached.map((l) => l.id));
  const fromLessons = reached.flatMap((l) => l.write.map(([prompt, answer]): Question => ({ kind: 'write', lesson: l.id, prompt, answer })));
  const fromPool = allSentences(s)
    .filter((x) => ids.has(x.lesson))
    .map((x): Question => ({ kind: 'write', lesson: x.lesson, prompt: x.ar, answer: x.en }));
  const n = Math.ceil(count / 2);
  const a = shuffle(fromLessons).slice(0, n);
  return shuffle([...a, ...shuffle(fromPool).slice(0, count - a.length)]);
}

/** Sentences limited to the grammar she has reached, used for listening and shadowing. */
export function reachedSentences(s: State) {
  const ids = new Set(reachedLessons(s).map((l) => l.id));
  return allSentences(s).filter((x) => ids.has(x.lesson));
}

/** Dictation: hear a sentence and type it. */
export const listeningSet = (s: State, count = 10): Question[] =>
  shuffle(reachedSentences(s)).slice(0, count).map((x) => ({ kind: 'listen', lesson: x.lesson, prompt: x.ar, answer: x.en }));

/** Random exam across every lesson reached, plus the words she already learned. */
export function examSet(s: State, count = 15, words: { id: string; en: string; ar: string }[] = []): Question[] {
  const grammar = shuffle(reachedLessons(s).flatMap(quizOf));
  const known = words.filter((w) => s.cards[w.id]);
  const vocab: Question[] = shuffle(known).slice(0, 4).map((w) => {
    const wrong = shuffle(words.filter((x) => x.id !== w.id)).slice(0, 2).map((x) => x.en);
    return { kind: 'choice', lesson: 'vocab', prompt: `معنى "${w.ar}" بالإنجليزي؟`, answer: w.en, options: shuffle([w.en, ...wrong]) };
  });
  return shuffle([...vocab, ...grammar.slice(0, count - vocab.length)]);
}
