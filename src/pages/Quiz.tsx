import { useState } from 'react';
import { checkAnswer, type Check } from '../lib/core';
import { speak } from '../lib/speech';
import type { Question } from '../lib/questions';

export const En = ({ children }: { children: React.ReactNode }) => <span className="en" dir="ltr">{children}</span>;

/** Arabic text with English phrases inside: isolates each phrase so its punctuation stays in place. */
export const Mixed = ({ text }: { text: string }) => (
  <>{text.split(/([A-Za-z](?:[A-Za-z0-9 .,'’/!?…-]*[A-Za-z0-9.,'’!?…])?)/).map((part, i) => (i % 2 ? <En key={i}>{part}</En> : part))}</>
);

export const Say =({ text }: { text: string }) => (
  <button className="say" aria-label="اسمعي" onClick={() => speak(text)}>🔊</button>
);

export type Result = { lesson: string; right: boolean };

/** Runs a list of questions one by one with instant feedback. */
export function Quiz({ questions, onDone }: { questions: Question[]; onDone: (r: Result[]) => void }) {
  const [i, setI] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<string | null>(null);
  const [check, setCheck] = useState<Check | null>(null);
  const q = questions[i];
  const answered = picked !== null || check !== null;

  const record = (right: boolean) => setResults([...results, { lesson: q.lesson, right }]);
  const next = () => {
    setPicked(null);
    setCheck(null);
    setText('');
    if (i + 1 === questions.length) onDone(results);
    else setI(i + 1);
  };

  return (
    <div className="card">
      <div className="bar"><i style={{ width: `${(i / questions.length) * 100}%` }} /></div>
      <p className="muted">{i + 1} / {questions.length}</p>
      {q.kind === 'choice' ? (
        <>
          <p className="prompt" dir="auto">{q.prompt}</p>
          <div className="options">
            {q.options.map((o) => (
              <button
                key={o}
                dir="ltr"
                disabled={answered}
                className={answered ? (o === q.answer ? 'good' : o === picked ? 'bad' : '') : ''}
                onClick={() => {
                  setPicked(o);
                  record(o === q.answer);
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="muted">اكتبي بالإنجليزي:</p>
          <p className="prompt">{q.prompt}</p>
          <textarea
            dir="ltr"
            rows={2}
            value={text}
            disabled={answered}
            autoCapitalize="sentences"
            onChange={(e) => setText(e.target.value)}
            placeholder="Type in English..."
          />
          {!answered && (
            <button
              className="primary"
              disabled={!text.trim()}
              onClick={() => {
                const c = checkAnswer(text, q.answer);
                setCheck(c);
                record(c.result !== 'wrong');
              }}
            >
              صححي
            </button>
          )}
          {check && (
            <div className={`feedback ${check.result}`}>
              <b>{check.result === 'right' ? 'صح! 🎉' : check.result === 'close' ? 'قربتي جدًا، راجعي الإملاء:' : 'مش مظبوطة. الإجابة الصح:'}</b>
              <p dir="ltr">
                {check.result === 'right' ? check.best : check.diff.map((d, n) => <span key={n} className={d.ok ? '' : 'miss'}>{d.word} </span>)}
                <Say text={check.best} />
              </p>
              {check.result !== 'right' && <small>الكلمات المعلّمة هي اللي ناقصة أو غلط عندك.</small>}
            </div>
          )}
        </>
      )}
      {answered && <button className="primary" onClick={next}>{i + 1 === questions.length ? 'النتيجة' : 'التالي'}</button>}
    </div>
  );
}
