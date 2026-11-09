import { describe, expect, it } from 'vitest';
import { addDays, checkAnswer, findWords, grade, matchPct, pickReview, normalize, parseImport, streak } from './core';
import { prompts, situations } from '../content/speaking';
import { details } from '../content/details';
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
  it('sends right answers further away and makes wrong ones due again now', () => {
    // a card just added to review starts in box 0, due today
    const added = { box: 0, due: '2026-01-30' };
    const a = grade(added, true, '2026-01-30');
    expect(a).toEqual({ box: 1, due: '2026-02-02' });
    const b = grade(a, true, '2026-02-02');
    expect(b).toEqual({ box: 2, due: '2026-02-09' });
    expect(grade(b, false, '2026-02-09')).toEqual({ box: 0, due: '2026-02-09' });
  });
  it('builds a session from due items first, then other learned items', () => {
    const items = ['a', 'b', 'c', 'd'].map((id) => ({ id }));
    const cards = { a: { box: 0, due: '2026-01-01' }, b: { box: 2, due: '2026-03-01' }, c: { box: 1, due: '2026-01-02' } };
    const s = pickReview(items, cards, '2026-01-02', 50).map((x) => x.id);
    expect(s.slice(0, 2).sort()).toEqual(['a', 'c']);
    expect(s).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    expect(s).not.toContain('d');
    expect(pickReview(items, cards, '2026-01-02', 1)).toHaveLength(1);
  });
});

describe('findWords', () => {
  it('finds a word whatever the case or spacing, including its other meanings', () => {
    expect(findWords(words, '  BOOK ').map((w) => w.ar).sort()).toEqual(['كتاب', 'يحجز'].sort());
    expect(findWords(words, 'pull   request')).toHaveLength(1);
    expect(findWords(words, 'zzzz')).toHaveLength(0);
    expect(findWords(words, '  ')).toHaveLength(0);
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
      const d = details[l.id];
      expect(d, l.id).toBeTruthy();
      expect(d.rules.length && d.mistakes.length && d.en.length, l.id).toBeGreaterThan(0);
      for (const row of d.table ?? []) expect(row.length, `${l.id}: ${row[0]}`).toBe(d.table![0].length);
    }
    expect(plan).toHaveLength(14);
    for (const d of plan) for (const id of d.lessons) expect(ids.has(id), id).toBe(true);
    expect(new Set(words.map((w) => w.id)).size).toBe(words.length);
    console.log(`words: ${words.length}`);
    for (const w of words) expect(w.en && w.ar, w.id).toBeTruthy();
    expect(words[0].en).toBe('hello');
    expect(words[134].en).toBe('decide');
    expect(matchPct('i am a developer', 'I am a software developer.')).toBe(80);
    expect(situations.every((x) => x.lines.some((l) => l[0] === 'you'))).toBe(true);
    expect(prompts.length).toBeGreaterThanOrEqual(30);
  });
});
