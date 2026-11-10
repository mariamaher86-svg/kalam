import { useState } from 'react';
import { distance, dayStr, normalize } from '../lib/core';
import { examSet, writingSet, type Question } from '../lib/questions';
import { canListen, listen, speak } from '../lib/speech';
import { allWords, currentPlanDay, planDayDone, recordAnswers, update, useStore, type Intro } from '../lib/store';
import { lessonById } from '../content/grammar';
import { plan } from '../content/plan';
import { En, Mixed, Quiz, Say, type Result } from './Quiz';

export function WritingPage() {
  const s = useStore();
  const [qs, setQs] = useState<Question[]>(() => writingSet(s));
  const [done, setDone] = useState<number | null>(null);
  return (
    <>
      <h1>الكتابة والتصحيح</h1>
      <p className="muted">الجمل على قد الدروس اللي وصلتيلها.</p>
      {done === null ? (
        <Quiz key={qs[0]?.prompt} questions={qs} onDone={(r) => { recordAnswers(r); setDone(r.filter((x) => x.right).length); }} />
      ) : (
        <div className="card center">
          <h2 dir="ltr">{done} / {qs.length}</h2>
          <button className="primary" onClick={() => { setQs(writingSet(s)); setDone(null); }}>جمل تانية</button>
        </div>
      )}
    </>
  );
}

export function ExamPage() {
  const s = useStore();
  const [qs, setQs] = useState<Question[] | null>(null);
  const [res, setRes] = useState<Result[] | null>(null);

  if (qs && !res) {
    return (
      <>
        <h1>امتحان عشوائي</h1>
        <Quiz
          questions={qs}
          onDone={(r) => {
            recordAnswers(r);
            const score = Math.round((r.filter((x) => x.right).length / r.length) * 100);
            update((st) => ({ exams: [...st.exams, { day: dayStr(), score }] }));
            setRes(r);
          }}
        />
      </>
    );
  }
  if (res) {
    const by = new Map<string, { r: number; w: number }>();
    for (const x of res) {
      const c = by.get(x.lesson) ?? { r: 0, w: 0 };
      by.set(x.lesson, x.right ? { ...c, r: c.r + 1 } : { ...c, w: c.w + 1 });
    }
    const weak = [...by].filter(([, c]) => c.w > 0).sort((a, b) => b[1].w - a[1].w);
    return (
      <>
        <h1>النتيجة</h1>
        <div className="card center"><h2 dir="ltr">{Math.round((res.filter((x) => x.right).length / res.length) * 100)}%</h2></div>
        <h2>{weak.length ? 'ضعيفة في:' : 'مفيش غلطات، برافو! 🎉'}</h2>
        {weak.map(([id, c]) => id === 'vocab' ? (
          <a key={id} className="card link row" href="#/review"><span>الكلمات — راجعيها</span><b className="badtext">{c.w} غلط</b></a>
        ) : (
          <a key={id} className="card link row" href={`#/lesson/${id}`}><span><En>{lessonById(id)?.title}</En></span><b className="badtext">{c.w} غلط</b></a>
        ))}
        <button className="primary wide" onClick={() => { setQs(null); setRes(null); }}>امتحان جديد</button>
      </>
    );
  }
  return (
    <>
      <h1>امتحان عشوائي</h1>
      <div className="card center">
        <p>لحد 15 سؤال عشوائي من كل الدروس اللي وصلتيلها والكلمات اللي حفظتيها، وفي الآخر هقولك ضعيفة في إيه.</p>
        <button className="primary" onClick={() => setQs(examSet(s, 15, allWords(s)))}>ابدئي</button>
      </div>
    </>
  );
}

export function PlanPage() {
  const s = useStore();
  const today = currentPlanDay(s);
  const toggle = (d: number) => update((st) => ({ planDone: st.planDone.includes(d) ? st.planDone.filter((x) => x !== d) : [...st.planDone, d] }));
  return (
    <>
      <h1>خطة الأسبوعين</h1>
      <p className="muted">45 دقيقة كل يوم. الهدف: بعد 14 يوم تعرّفي نفسك بالإنجليزي بثقة.</p>
      <div className="card"><b>كل يوم:</b> الدرس (15 دقيقة) ← 5 كلمات (5) ← المراجعة (5) ← ترجمة (10) ← كلام بصوت عالي (10).</div>
      <p className="muted">اليوم بيتعلّم لوحده لما تعدي دروسه، وتقدري تعلّميه بنفسك كمان. ومش لازم تستني يوم كامل عشان تبدأي اللي بعده.</p>
      {plan.map((d) => (
        <div key={d.day} className={`card ${d.day === today ? 'current' : ''}`}>
          <div className="row">
            <b>يوم {d.day}: {d.goal}</b>
            <input type="checkbox" aria-label={`خلصت يوم ${d.day}`} checked={planDayDone(s, d)} onChange={() => toggle(d.day)} />
          </div>
          {d.lessons.map((id) => <p key={id}><a href={`#/lesson/${id}`}><En>{lessonById(id)?.title}</En></a></p>)}
          {!d.lessons.length && <p><a href="#/exam">امتحان عشوائي</a> · <a href="#/intro">عرّفي نفسك</a></p>}
          <small className="muted">🗣️ <Mixed text={d.speak} /></small>
        </div>
      ))}
    </>
  );
}

/** Builds the speech only from the fields she filled, one sentence each. */
export function buildIntro(i: Intro): [string, string][] {
  const out: [string, string][] = [];
  out.push(['Hello, nice to meet you.', 'أهلًا، سعيدة بمعرفتك.']);
  if (i.name) out.push([`My name is ${i.name}.`, `اسمي ${i.name}.`]);
  if (i.age) out.push([`I am ${i.age} years old.`, `عندي ${i.age} سنة.`]);
  if (i.city) out.push([`I am from Egypt, and I live in ${i.city}.`, `أنا من مصر وساكنة في ${i.city}.`]);
  out.push(['I am a software developer.', 'أنا مبرمجة.']);
  if (i.company) out.push([`I work at ${i.company}.`, `بشتغل في ${i.company}.`]);
  if (i.years) out.push([`I have ${i.years} years of experience.`, `عندي خبرة ${i.years} سنين.`]);
  if (i.family) out.push([i.family, 'عن عيلتي.']);
  if (i.hobby) out.push([`In my free time, I enjoy ${i.hobby}.`, `في وقت فراغي بحب ${i.hobby}.`]);
  out.push(['I am learning English because it is important for my work.', 'بتعلم إنجليزي عشان مهم لشغلي.']);
  if (i.goal) out.push([`My goal is to ${i.goal}.`, 'ده هدفي.']);
  out.push(['Thank you for listening.', 'شكرًا إنكم سمعتوني.']);
  return out;
}

const fields: [keyof Intro, string, string][] = [
  ['name', 'اسمك', 'Maria'],
  ['age', 'سنك', '30'],
  ['city', 'ساكنة فين', 'Cairo'],
  ['company', 'الشركة', 'ABC Tech'],
  ['years', 'سنين الخبرة', '5'],
  ['family', 'جملة عن عيلتك (إنجليزي)', 'I have one sister.'],
  ['hobby', 'هوايتك (إنجليزي)', 'reading'],
  ['goal', 'هدفك (إنجليزي)', 'speak English fluently at work'],
];

export function IntroPage() {
  const s = useStore();
  const lines = buildIntro(s.intro);
  const full = lines.map((l) => l[0]).join(' ');
  const [hide, setHide] = useState(false);
  const [heard, setHeard] = useState('');
  const [state, setState] = useState<'idle' | 'on' | 'error'>('idle');
  const score = heard ? Math.max(0, Math.round((1 - distance(normalize(heard), normalize(full)) / normalize(full).length) * 100)) : null;

  const record = async () => {
    setState('on');
    setHeard('');
    try {
      setHeard(await listen());
      setState('idle');
    } catch {
      setState('error');
    }
  };

  return (
    <>
      <h1>عرّفي نفسك</h1>
      <div className="card form">
        {fields.map(([k, label, ph]) => (
          <label key={k}>{label}
            <input dir="auto" value={s.intro[k]} placeholder={ph} onChange={(e) => update((st) => ({ intro: { ...st.intro, [k]: e.target.value } }))} />
          </label>
        ))}
      </div>
      <h2>تعريفك</h2>
      <div className="actions">
        <button className="primary" onClick={() => speak(full, 0.85)}>🔊 اسمعيه كله</button>
        <button onClick={() => setHide(!hide)}>{hide ? 'إظهار' : 'اخفيه واختبري نفسك'}</button>
      </div>
      {lines.map(([en, ar]) => (
        <div key={en} className="card example">
          <p dir="ltr"><Say text={en} /> {hide ? '• • •' : en}</p>
          <small className="muted">{ar}</small>
        </div>
      ))}
      <h2>اتكلمي وأنا أسمعك</h2>
      <div className="card center">
        {canListen() ? (
          <>
            <button className="primary" disabled={state === 'on'} onClick={record}>{state === 'on' ? '🎙️ بسمعك...' : '🎙️ ابدئي الكلام'}</button>
            {state === 'error' && <p className="badtext">الميكروفون مش شغال. اسمحي بيه وتأكدي من النت.</p>}
            {heard && <><p dir="ltr">{heard}</p><h2 dir="ltr">{score}%</h2><small className="muted">نسبة تطابق كلامك مع التعريف.</small></>}
          </>
        ) : (
          <p className="muted">المتصفح ده مش بيدعم سماع الكلام. جربي Chrome، أو سجلي بتطبيق التسجيل في الموبايل وقارني.</p>
        )}
      </div>
    </>
  );
}
