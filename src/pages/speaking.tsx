import { useState } from 'react';
import { checkAnswer, matchPct, shuffle } from '../lib/core';
import { listeningSet, reachedSentences, type Question } from '../lib/questions';
import { canListen, listen, speak } from '../lib/speech';
import { recordAnswers, recordSpeech, useStore } from '../lib/store';
import { prompts, situations } from '../content/speaking';
import { En, Quiz, Say } from './Quiz';

const NoMic = () => <p className="muted">المتصفح ده مش بيدعم سماع الكلام. جربي Chrome.</p>;

function useRecorder() {
  const [state, setState] = useState<'idle' | 'on' | 'error'>('idle');
  const record = async (onHeard: (text: string) => void) => {
    setState('on');
    try {
      const heard = await listen();
      onHeard(heard);
      if (heard) recordSpeech();
      setState('idle');
    } catch {
      setState('error');
    }
  };
  return { state, record };
}

const MicError = () => <p className="badtext">الميكروفون مش شغال. اسمحي بيه وتأكدي من النت.</p>;

/** Says a target sentence back: what was heard, a match score, and which words were missed. */
function SpeechCheck({ target }: { target: string }) {
  const { state, record } = useRecorder();
  const [heard, setHeard] = useState<string | null>(null);
  if (!canListen()) return <NoMic />;
  return (
    <div className="center">
      <button className="primary" disabled={state === 'on'} onClick={() => record(setHeard)}>{state === 'on' ? '🎙️ بسمعك...' : '🎙️ قوليها'}</button>
      {state === 'error' && <MicError />}
      {heard === '' && <p className="muted">مسمعتش حاجة. جربي تاني بصوت أوضح.</p>}
      {heard && (
        <div className="feedback close">
          <b dir="ltr">{matchPct(heard, target)}%</b>
          <p dir="ltr">{checkAnswer(heard, target).diff.map((d, i) => <span key={i} className={d.ok ? '' : 'miss'}>{d.word} </span>)}</p>
          <small>سمعت: <En>{heard}</En></small>
        </div>
      )}
    </div>
  );
}

export function SpeakPage() {
  // a new question each day, and "another question" moves on from it
  const [i, setI] = useState(() => Math.floor(Date.now() / 86400000) % prompts.length);
  const [text, setText] = useState('');
  const [hint, setHint] = useState(false);
  const { state, record } = useRecorder();
  const [q, ar, starter] = prompts[i];
  const count = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <>
      <h1>كلام يومي</h1>
      <p className="muted">جاوبي بصوتك من غير ما تخافي من الغلط. الهدف توصلي لـ 30 كلمة.</p>
      <div className="card center">
        <p className="prompt" dir="ltr">{q} <Say text={q} /></p>
        <small className="muted">{ar}</small>
        <div className="actions">
          {canListen() && <button className="primary" disabled={state === 'on'} onClick={() => record((h) => setText((t) => `${t} ${h}`.trim()))}>{state === 'on' ? '🎙️ بسمعك...' : text ? '🎙️ كملي كلام' : '🎙️ ابدئي الكلام'}</button>}
          <button onClick={() => setHint(!hint)}>مساعدة</button>
        </div>
        {!canListen() && <NoMic />}
        {state === 'error' && <MicError />}
        {hint && <p dir="ltr">{starter}</p>}
        {text && (
          <div className="feedback close">
            <p dir="ltr">{text}</p>
            <b>{count} كلمة{count >= 30 ? ' 🎉' : ''}</b>
          </div>
        )}
        <div className="actions">
          <button onClick={() => speak(text)} disabled={!text}>🔊 اسمعي كلامك</button>
          <button onClick={() => { setI((i + 1) % prompts.length); setText(''); setHint(false); }}>سؤال تاني</button>
        </div>
      </div>
    </>
  );
}

export function ShadowPage() {
  const s = useStore();
  const [deck] = useState(() => shuffle(reachedSentences(s)));
  const [i, setI] = useState(0);
  const [hide, setHide] = useState(false);
  const x = deck[i % deck.length];
  return (
    <>
      <h1>تقليد النطق</h1>
      <p className="muted">اسمعي الجملة، وقوليها بنفس الطريقة والسرعة، وكرريها لحد ما تبقى سهلة.</p>
      <div className="card center">
        <p className="prompt" dir="ltr">{hide ? '• • •' : x.en}</p>
        <small className="muted">{x.ar}</small>
        <div className="actions">
          <button className="primary" onClick={() => speak(x.en)}>🔊 اسمعي</button>
          <button onClick={() => speak(x.en, 0.6)}>🐢 أبطأ</button>
          <button onClick={() => setHide(!hide)}>{hide ? 'إظهار' : 'إخفاء'}</button>
        </div>
        <SpeechCheck key={x.id} target={x.en} />
        <div className="actions"><button onClick={() => setI(i + 1)}>الجملة الجاية</button></div>
      </div>
    </>
  );
}

export function ListenPage() {
  const s = useStore();
  const [qs, setQs] = useState<Question[]>(() => listeningSet(s));
  const [done, setDone] = useState<number | null>(null);
  return (
    <>
      <h1>استماع وكتابة</h1>
      <p className="muted">اسمعي الجملة واكتبيها. الترجمة بتظهر بعد الإجابة.</p>
      {done === null ? (
        <Quiz key={qs[0]?.answer} questions={qs} onDone={(r) => { recordAnswers(r); setDone(r.filter((x) => x.right).length); }} />
      ) : (
        <div className="card center">
          <h2 dir="ltr">{done} / {qs.length}</h2>
          <button className="primary" onClick={() => { setQs(listeningSet(s)); setDone(null); }}>جمل تانية</button>
        </div>
      )}
    </>
  );
}

export function SituationsPage() {
  return (
    <>
      <h1>مواقف جاهزة</h1>
      <p className="muted">حوارات لمواقف حقيقية. اسمعيها، وبعدين خبي جملك وقوليها من الذاكرة.</p>
      {situations.map((x) => (
        <a key={x.id} className="card link row" href={`#/situation/${x.id}`}><span><En>{x.title}</En><br /><small className="muted">{x.titleAr}</small></span><b>←</b></a>
      ))}
    </>
  );
}

export function SituationPage({ id }: { id: string }) {
  const [hide, setHide] = useState(false);
  const x = situations.find((v) => v.id === id);
  if (!x) return <p>الموقف مش موجود.</p>;
  return (
    <>
      <h1 dir="ltr" className="ltr">{x.title}</h1>
      <p className="muted">{x.titleAr}</p>
      <button className="wide" onClick={() => setHide(!hide)}>{hide ? 'إظهار جملي' : 'خبي جملي واتمرني'}</button>
      {x.lines.map(([who, en, ar]) => (
        <div key={en} className={`card ${who === 'you' ? 'current' : ''}`}>
          <small className="muted">{who === 'you' ? 'إنتي' : 'الشخص التاني'}</small>
          <p dir="ltr"><Say text={en} /> {who === 'you' && hide ? '• • •' : en}</p>
          <small className="muted">{ar}</small>
          {who === 'you' && <SpeechCheck target={en} />}
        </div>
      ))}
    </>
  );
}
