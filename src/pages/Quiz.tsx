import { useState } from 'react';
import { checkAnswer, type Check } from '../lib/core';
import { lookup } from '../lib/lookup';
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

/** Text whose words can be tapped to see their meaning in the other language. */
export function TapText({ text }: { text: string }) {
  const [picked, setPicked] = useState<string | null>(null);
  const meanings = picked ? lookup(picked) : [];
  return (
    <>
      <span dir="auto">
        {text.split(/(\s+)/).map((part, i) => (part.trim() ? <span key={i} className={`tap ${part === picked ? 'on' : ''}`} onClick={() => setPicked(part === picked ? null : part)}>{part}</span> : part))}
      </span>
      {picked && (
        <span className="bubble" dir="auto">
          <b>{picked.replace(/[.,!?؟،:"]/g, '')}</b>: {meanings.length ? meanings.join(' / ') : 'مش لاقية الكلمة دي في القاموس'}
        </span>
      )}
    </>
  );
}

export type Result = { lesson: string; right: boolean };

/** Runs a list of questions one by one with instant feedback. */
export function Quiz({ questions, onDone, onAnswer, help = true }: { questions: Question[]; onDone: (r: Result[]) => void; onAnswer?: (r: Result) => void; help?: boolean }) {
  const [i, setI] = useState(0);
  const [results, setResults] = useState<Result[]>([]);
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<string | null>(null);
  // a tapped option is only a choice until she confirms it
  const [selected, setSelected] = useState<string | null>(null);
  const [check, setCheck] = useState<Check | null>(null);
  const q = questions[i];
  const answered = picked !== null || check !== null;

  const record = (right: boolean) => {
    setResults([...results, { lesson: q.lesson, right }]);
    // saved per answer, so leaving halfway keeps what was answered
    onAnswer?.({ lesson: q.lesson, right });
  };
  const submit = (typed: string) => {
    const c = checkAnswer(typed, q.answer);
    setCheck(c);
    record(c.result !== 'wrong');
  };
  const next = () => {
    setPicked(null);
    setSelected(null);
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
          <p className="prompt" dir="auto">{help ? <TapText key={q.prompt} text={q.prompt} /> : q.prompt}</p>
          <div className="options">
            {q.options.map((o) => (
              <button
                key={o}
                dir="ltr"
                disabled={answered}
                className={answered ? (o === q.answer ? 'good' : o === picked ? 'bad' : '') : o === selected ? 'chosen' : ''}
                onClick={() => setSelected(o)}
              >
                {o}
              </button>
            ))}
          </div>
          {!answered && (
            <button
              className="primary"
              disabled={!selected}
              onClick={() => {
                setPicked(selected);
                record(selected === q.answer);
              }}
            >
              صححي
            </button>
          )}
        </>
      ) : (
        <>
          {q.kind === 'write' ? (
            <>
              <p className="muted">اكتبي بالإنجليزي:{help && ' (دوسي على أي كلمة عشان تعرفي معناها)'}</p>
              <p className="prompt">{help ? <TapText key={q.prompt} text={q.prompt} /> : q.prompt}</p>
            </>
          ) : (
            <>
              <p className="muted">اسمعي واكتبي اللي سمعتيه:</p>
              <div className="actions">
                <button className="primary" onClick={() => speak(q.answer)}>🔊 اسمعي</button>
                <button onClick={() => speak(q.answer, 0.6)}>🐢 أبطأ</button>
              </div>
              {answered && <p className="prompt">{q.prompt}</p>}
            </>
          )}
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
            <div className="actions">
              <button className="primary" disabled={!text.trim()} onClick={() => submit(text)}>صححي</button>
              <button onClick={() => submit('')}>مش عارفاها</button>
            </div>
          )}
          {check && (
            <div className={`feedback ${check.result}`}>
              <b>{check.result === 'right' ? 'صح! 🎉' : check.result === 'close' ? 'قربتي جدًا، راجعي الإملاء:' : 'مش مظبوطة. الإجابة الصح:'}</b>
              <p dir="ltr">
                {check.result === 'right' ? check.best : check.diff.map((d, n) => <span key={n} className={d.ok ? '' : 'miss'}>{d.word} </span>)}
                <Say text={check.best} />
              </p>
              {check.result !== 'right' && <small>{check.diff.every((d) => d.ok) ? 'كل الكلمات دي موجودة عندك، بس الترتيب مختلف أو فيه كلمات زيادة.' : 'الكلمات المعلّمة هي اللي ناقصة أو غلط عندك.'}</small>}
            </div>
          )}
        </>
      )}
      {answered && <button className="primary" onClick={next}>{i + 1 === questions.length ? 'النتيجة' : 'التالي'}</button>}
    </div>
  );
}
