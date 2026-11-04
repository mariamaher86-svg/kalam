import { useState } from 'react';
import { details } from '../content/details';
import { lessonById, lessons, type Level } from '../content/grammar';
import { quizOf } from '../lib/questions';
import { currentIndex, PASS, recordAnswers, update, useStore } from '../lib/store';
import { En, Mixed, Quiz, Say } from './Quiz';

const levels: [Level, string][] = [['Beginner', 'مبتدئ'], ['Intermediate', 'متوسط'], ['Advanced', 'متقدم']];

export function LessonsPage() {
  const s = useStore();
  const cur = lessons[currentIndex(s)].id;
  return (
    <>
      <h1>الجرامر</h1>
      {levels.map(([lv, ar]) => (
        <section key={lv}>
          <h2>{ar} <En>{lv}</En></h2>
          {lessons.filter((l) => l.level === lv).map((l) => {
            const best = s.lessons[l.id]?.best;
            return (
              <a key={l.id} href={`#/lesson/${l.id}`} className={`card link row ${l.id === cur ? 'current' : ''}`}>
                <span><En>{l.title}</En><br /><small className="muted">{l.titleAr}</small></span>
                <b>{best === undefined ? (l.id === cur ? '▶' : '') : best >= PASS ? `✅ ${best}%` : `${best}%`}</b>
              </a>
            );
          })}
        </section>
      ))}
    </>
  );
}

export function LessonPage({ id }: { id: string }) {
  const lesson = lessonById(id);
  const [questions, setQuestions] = useState<ReturnType<typeof quizOf> | null>(null);
  const [score, setScore] = useState<number | null>(null);
  if (!lesson) return <p>الدرس مش موجود.</p>;
  const detail = details[lesson.id];
  const nextLesson = lessons[lessons.indexOf(lesson) + 1];

  return (
    <>
      <h1 dir="ltr" className="ltr">{lesson.title}</h1>
      <p className="muted">{lesson.titleAr}</p>
      {score !== null ? (
        <div className="card center">
          <h2 dir="ltr">{score}%</h2>
          <p>{score >= PASS ? 'برافو! عديتي الدرس 🎉' : `محتاجة ${PASS}% عشان تعدي. اقري الشرح تاني وحاولي.`}</p>
          <div className="actions">
            <button onClick={() => { setScore(null); setQuestions(null); }}>الشرح تاني</button>
            {score >= PASS && nextLesson && <a className="btn primary" href={`#/lesson/${nextLesson.id}`}>الدرس الجاي</a>}
          </div>
        </div>
      ) : questions ? (
        <Quiz
          questions={questions}
          onDone={(r) => {
            const pct = Math.round((r.filter((x) => x.right).length / r.length) * 100);
            recordAnswers(r);
            update((s) => ({ lessons: { ...s.lessons, [id]: { best: Math.max(pct, s.lessons[id]?.best ?? 0) } } }));
            setScore(pct);
          }}
        />
      ) : (
        <>
          <div className="card">
            <h3>الشرح بالعربي</h3>
            <ol className="rules">{detail.rules.map((r) => <li key={r}><Mixed text={r} /></li>)}</ol>
          </div>
          {detail.table && (
            <div className="card">
              <h3>الجدول</h3>
              <table>
                <thead><tr>{detail.table[0].map((c, i) => <th key={i} dir="auto">{c}</th>)}</tr></thead>
                <tbody>{detail.table.slice(1).map((row, r) => <tr key={r}>{row.map((c, i) => <td key={i} dir="auto">{c}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )}
          <div className="card">
            <h3>أخطاء شائعة</h3>
            {detail.mistakes.map(([wrong, right, why]) => (
              <div key={wrong} className="example">
                <p dir="auto">❌ <s>{wrong}</s></p>
                <p dir="auto">✅ <b>{right}</b></p>
                <small className="muted"><Mixed text={why} /></small>
              </div>
            ))}
          </div>
          <div className="card" dir="ltr">
            <h3>In English</h3>
            <ol className="rules">{detail.en.map((r) => <li key={r}>{r}</li>)}</ol>
          </div>
          <div className="card">
            <h3>أمثلة</h3>
            {lesson.examples.map(([en, ar]) => (
              <div key={en} className="example"><p dir="ltr"><Say text={en} /> {en}</p><small className="muted">{ar}</small></div>
            ))}
          </div>
          <button className="primary wide" onClick={() => setQuestions(quizOf(lesson))}>ابدئي الأسئلة</button>
        </>
      )}
    </>
  );
}
