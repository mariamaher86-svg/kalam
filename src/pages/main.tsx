import { useRef, useState } from 'react';
import { dayStr, streak } from '../lib/core';
import { allSentences, allWords, currentIndex, currentPlanDay, planDayDone, dueCards, exportBackup, importBackup, PASS, update, useStore, weakLessons } from '../lib/store';
import { lessons } from '../content/grammar';
import { plan } from '../content/plan';
import { En, Mixed } from './Quiz';

export function Home() {
  const s = useStore();
  const today = dayStr();
  const lesson = lessons[currentIndex(s)];
  const due = dueCards(s).length;
  const learned = s.learnedByDay[today] ?? 0;
  const day = plan[currentPlanDay(s) - 1];
  return (
    <>
      <h1>كلام <En>Kalam</En></h1>
      <p className="muted">🔥 {streak(s.activeDays, today)} يوم ورا بعض</p>
      <a className="card link hero" href="#/plan">
        <small>خطة الأسبوعين — يوم {day.day} من 14</small>
        <b>{day.goal}</b>
        <span><Mixed text={day.speak} /></span>
      </a>
      <h2>مهام النهارده</h2>
      <a className="card link row" href={`#/lesson/${lesson.id}`}><span>📘 الدرس الحالي<br /><En>{lesson.title}</En></span><b>←</b></a>
      <a className="card link row" href="#/words"><span>🧠 كلمات النهارده</span><b>{learned}/{s.dailyGoal}</b></a>
      <a className="card link row" href="#/review"><span>🔁 المراجعة</span><b>{due}</b></a>
      <a className="card link row" href="#/writing"><span>✍️ ترجمي وأصححلك</span><b>←</b></a>
      <a className="card link row" href="#/intro"><span>🎤 عرّفي نفسك</span><b>←</b></a>
    </>
  );
}

export function Practice() {
  const items = [
    ['words', '🧠', 'كلمات النهارده', 'احفظي 5 كلمات أو أكتر'],
    ['review', '🔁', 'المراجعة', 'الكلمات والجمل اللي عليها الدور'],
    ['sentences', '💬', 'الجمل', 'أكتر من 1000 جملة، وضيفي كتابك'],
    ['writing', '✍️', 'الكتابة والتصحيح', 'جمل عربي على قد مرحلتك'],
    ['exam', '📝', 'امتحان عشوائي', 'ويقولك ضعيفة في إيه'],
    ['speak', '🗣️', 'كلام يومي', 'سؤال كل يوم تجاوبيه بصوتك'],
    ['shadow', '🦜', 'تقليد النطق', 'اسمعي الجملة وقوليها زيها'],
    ['listen', '🎧', 'استماع وكتابة', 'اسمعي الجملة واكتبيها'],
    ['situations', '🎭', 'مواقف جاهزة', 'الاجتماع والـ stand-up والمقابلة وغيرهم'],
    ['intro', '🎤', 'عرّفي نفسك', 'جهزي تعريفك واتمرني بالصوت'],
    ['plan', '🗓️', 'خطة الأسبوعين', '14 يوم لحد ما تعرّفي نفسك'],
  ];
  return (
    <>
      <h1>تمرين</h1>
      {items.map(([p, i, t, d]) => (
        <a key={p} className="card link row" href={`#/${p}`}>
          <span>{i} <b>{t}</b><br /><small className="muted">{d}</small></span><b>←</b>
        </a>
      ))}
    </>
  );
}

export function Progress() {
  const s = useStore();
  const file = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');
  const passed = lessons.filter((l) => (s.lessons[l.id]?.best ?? 0) >= PASS).length;
  const ids = (list: { id: string }[]) => list.filter((x) => s.cards[x.id]).length;
  const mastered = Object.values(s.cards).filter((c) => c.box >= 3).length;
  const stats = [
    ['دروس خلصت', `${passed} / ${lessons.length}`],
    ['كلمات بتحفظيها', `${ids(allWords(s))} / ${allWords(s).length}`],
    ['جمل بتحفظيها', `${ids(allSentences(s))} / ${allSentences(s).length}`],
    ['ثبتت في الذاكرة', mastered],
    ['أيام ورا بعض', streak(s.activeDays, dayStr())],
    ['أيام الخطة', `${plan.filter((d) => planDayDone(s, d)).length} / 14`],
    ['مرات الكلام', s.spoken],
    ['آخر امتحان', s.exams.length ? `${s.exams[s.exams.length - 1].score}%` : '—'],
  ];
  const weak = weakLessons(s);
  const last = s.exams.slice(-5);

  const save = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([exportBackup()], { type: 'application/json' }));
    a.download = `kalam-backup-${dayStr()}.json`;
    a.click();
  };
  const restore = async (f?: File) => {
    if (!f) return;
    try {
      importBackup(await f.text());
      setMsg('تم الاسترجاع ✅');
    } catch {
      setMsg('الملف ده مش نسخة احتياطية صحيحة.');
    }
  };

  return (
    <>
      <h1>تقدمي</h1>
      <div className="grid">
        {stats.map(([k, v]) => <div key={k} className="card stat"><b dir="ltr">{v}</b><small>{k}</small></div>)}
      </div>
      <h2>محتاجة تذاكري تاني</h2>
      {weak.length ? weak.map((w) => (
        <a key={w.lesson.id} className="card link row" href={`#/lesson/${w.lesson.id}`}><span><En>{w.lesson.title}</En></span><b className="badtext">{w.pct}%</b></a>
      )) : <p className="muted">لسه مفيش نقط ضعف ظاهرة. اعملي امتحان عشوائي عشان نعرف.</p>}
      {last.length > 0 && <><h2>آخر الامتحانات</h2><p dir="ltr" className="muted">{last.map((e) => `${e.score}%`).join('  ·  ')}</p></>}
      <h2>إعدادات</h2>
      <div className="card row">
        <span>كلمات جديدة كل يوم</span>
        <select value={s.dailyGoal} onChange={(e) => update(() => ({ dailyGoal: Number(e.target.value) }))}>
          {[3, 5, 8, 10, 15, 20, 30].map((n) => <option key={n}>{n}</option>)}
        </select>
      </div>
      <div className="card">
        <p className="muted">بياناتك متخزنة على الموبايل بس. خدي نسخة احتياطية كل فترة.</p>
        <div className="actions">
          <button onClick={save}>حفظ نسخة</button>
          <button onClick={() => file.current?.click()}>استرجاع نسخة</button>
        </div>
        <input ref={file} hidden type="file" accept=".json" onChange={(e) => restore(e.target.files?.[0])} />
        {msg && <p>{msg}</p>}
      </div>
    </>
  );
}
