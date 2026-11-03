import { describe, expect, it } from 'vitest';
import { addDays, checkAnswer, grade, normalize, parseImport, streak } from './core';
import { lessons } from '../content/grammar';
import { sentences } from '../content/sentences';
import { plan } from '../content/plan';
import { words } from '../content/vocab';

describe('checkAnswer', () => {
  it('accepts contractions, case and punctuation', () => {
    expect(checkAnswer("i'm a developer", 'I am a developer.').result).toBe('right');
    expect(checkAnswer("I can't hear you", 'I can not hear you.').result).toBe('right');
  });
  it('accepts alternatives, flags typos and wrong answers', () => {
    expect(checkAnswer('I must go', 'I have to go.|I must go.').result).toBe('right');
    expect(checkAnswer('I am a developr', 'I am a developer.').result).toBe('close');
    const wrong = checkAnswer('She go home', 'She is going home.');
    expect(wrong.result).toBe('wrong');
    expect(wrong.diff.filter((d) => !d.ok).map((d) => d.word)).toEqual(['is', 'going']);
  });
});

describe('spaced repetition', () => {
  it('moves up on success and resets on failure', () => {
    const a = grade(undefined, true, '2026-01-30');
    expect(a).toEqual({ box: 0, due: '2026-01-31' });
    const b = grade(a, true, '2026-01-31');
    expect(b).toEqual({ box: 1, due: '2026-02-02' });
    expect(grade(b, false, '2026-02-02').box).toBe(0);
  });
});

describe('helpers', () => {
  it('counts a streak that may end yesterday', () => {
    expect(streak(['2026-03-01', '2026-03-02'], '2026-03-03')).toBe(2);
    expect(streak(['2026-03-01'], '2026-03-03')).toBe(0);
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });
  it('parses imported lines in any order', () => {
    expect(parseImport('Hello | أهلًا\nnoise\nمرحبا\tWelcome')).toEqual([{ en: 'Hello', ar: 'أهلًا' }, { en: 'Welcome', ar: 'مرحبا' }]);
  });
});

describe('content', () => {
  const ids = new Set(lessons.map((l) => l.id));
  it('has 1000+ unique sentences linked to real lessons', () => {
    expect(sentences.length).toBeGreaterThanOrEqual(1000);
    expect(new Set(sentences.map((s) => s.id)).size).toBe(sentences.length);
    expect(new Set(sentences.map((s) => normalize(s.en))).size).toBe(sentences.length);
    for (const s of sentences) expect(ids.has(s.lesson), s.en).toBe(true);
  });
  it('has well-formed lessons, plan and vocabulary', () => {
    expect(ids.size).toBe(lessons.length);
    for (const l of lessons) {
      expect(l.quiz.length, l.id).toBeGreaterThanOrEqual(3);
      for (const q of l.quiz) expect(new Set(q.slice(1)).size, q[0]).toBe(3);
      expect(l.en && l.ar, l.id).toBeTruthy();
    }
    expect(plan).toHaveLength(14);
    for (const d of plan) for (const id of d.lessons) expect(ids.has(id), id).toBe(true);
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
  });
});
