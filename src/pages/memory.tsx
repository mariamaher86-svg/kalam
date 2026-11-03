import { useMemo, useRef, useState } from 'react';
import { dayStr, parseImport, shuffle } from '../lib/core';
import { addToReview, allSentences, allWords, dueCards, gradeCard, learnWords, reachedLessons, update, useStore } from '../lib/store';
import { sentenceGroups } from '../content/sentences';
import { En, Say } from './Quiz';

export function WordsPage() {
  const s = useStore();
  const learned = s.learnedByDay[dayStr()] ?? 0;
  const remaining = Math.max(0, s.dailyGoal - learned);
  const fresh = allWords(s).filter((w) => !s.cards[w.id]);
  const batch = fresh.slice(0, remaining || 5);
  const [en, setEn] = useState('');
  const [ar, setAr] = useState('');

  const add = () => {
    const id = `w:${en.trim().toLowerCase()}`;
    if (!en.trim() || !ar.trim() || allWords(s).some((w) => w.id === id)) return;
    update((st) => ({ customWords: [...st.customWords, { id, en: en.trim(), ar: ar.trim() }] }));
    addToReview([id]);
    setEn('');
    setAr('');
  };

  return (
    <>
      <h1>كلمات النهارده</h1>
      <p className="muted">حفظتي {learned} من {s.dailyGoal} النهارده.</p>
      {remaining === 0 && <p className="good-note">خلصتي هدف النهارده 🎉 لو عايزة تزودي، دي 5 كمان:</p>}
      {batch.map((w) => (
        <div key={w.id} className="card row"><span dir="ltr"><Say text={w.en} /> <b>{w.en}</b></span><span>{w.ar}</span></div>
      ))}
      {batch.length > 0
        ? <button className="primary wide" onClick={() => learnWords(batch.map((w) => w.id))}>حفظتهم، ضيفيهم للمراجعة</button>
        : <p className="muted">خلصتي كل الكلمات! ضيفي كلماتك من تحت.</p>}
      <h2>ضيفي كلمة من عندك</h2>
      <div className="card form">
        <input dir="ltr" placeholder="English" value={en} onChange={(e) => setEn(e.target.value)} />
        <input placeholder="المعنى بالعربي" value={ar} onChange={(e) => setAr(e.target.value)} />
        <button onClick={add}>إضافة</button>
      </div>
    </>
  );
}

export function ReviewPage() {
  const s = useStore();
  // fixed for the session, so grading a card doesn't reshuffle the deck
  const [deck] = useState(() => shuffle(dueCards(s)));
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(false);
  const [forgot, setForgot] = useState(0);
  const card = deck[i];

  if (!card) {
    return (
      <>
        <h1>المراجعة</h1>
        <div className="card center">
          {deck.length ? <p>خلصتي {deck.length} ✅ — نسيتي {forgot}، وهيرجعوا بكره.</p> : <p>مفيش حاجة عليها الدور دلوقتي 👌</p>}
          <a className="btn primary" href="#/words">كلمات جديدة</a>
        </div>
      </>
    );
  }
  const answer = (ok: boolean) => {
    gradeCard(card.id, ok);
    if (!ok) setForgot(forgot + 1);
    setShown(false);
    setI(i + 1);
  };
  return (
    <>
      <h1>المراجعة</h1>
      <p className="muted">{i + 1} / {deck.length}</p>
      <div className="card center">
        <p className="prompt">{card.ar}</p>
        {shown ? (
          <>
            <p className="prompt" dir="ltr">{card.en} <Say text={card.en} /></p>
            <p className="muted">قوليها بصوت عالي، وبعدين:</p>
            <div className="actions">
              <button className="badbtn" onClick={() => answer(false)}>نسيتها</button>
              <button className="primary" onClick={() => answer(true)}>فاكراها</button>
            </div>
          </>
        ) : (
          <button className="primary" onClick={() => setShown(true)}>فكري فيها، وبعدين اضغطي</button>
        )}
      </div>
    </>
  );
}

const PAGE = 20;

export function SentencesPage() {
  const s = useStore();
  const groups = [...sentenceGroups, ...(s.customSentences.length ? ['كتابي'] : [])];
  const [group, setGroup] = useState(groups[0]);
  const [page, setPage] = useState(0);
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  const file = useRef<HTMLInputElement>(null);
  const reached = useMemo(() => new Set(reachedLessons(s).map((l) => l.id)), [s]);
  const list = allSentences(s).filter((x) => x.group === group);
  const visible = list.slice(page * PAGE, (page + 1) * PAGE);
  const pages = Math.ceil(list.length / PAGE);

  const doImport = (raw: string) => {
    const rows = parseImport(raw);
    if (!rows.length) return setMsg('ملقتش جمل. كل سطر لازم يبقى: English | عربي');
    const known = new Set(allSentences(s).map((x) => x.en.toLowerCase()));
    const fresh = rows.filter((r) => !known.has(r.en.toLowerCase()));
    update((st) => ({
      customSentences: [...st.customSentences, ...fresh.map((r, i) => ({ id: `s:c${Date.now()}-${i}`, group: 'كتابي', lesson: 'be', ...r }))],
    }));
    setText('');
    setMsg(`اتضاف ${fresh.length} جملة في مجموعة "كتابي" ✅`);
  };

  return (
    <>
      <h1>الجمل</h1>
      <p className="muted">{allSentences(s).length} جملة. دوسي ⭐ عشان الجملة تدخل الحفظ والمراجعة.</p>
      <select className="wide" value={group} onChange={(e) => { setGroup(e.target.value); setPage(0); }}>
        {groups.map((g) => <option key={g}>{g}</option>)}
      </select>
      {visible.map((x) => (
        <div key={x.id} className={`card sentence ${reached.has(x.lesson) ? '' : 'later'}`}>
          <div>
            <p dir="ltr"><Say text={x.en} /> {x.en}</p>
            <small className="muted">{x.ar}</small>
          </div>
          <button className="star" disabled={!!s.cards[x.id]} onClick={() => addToReview([x.id])} aria-label="احفظي">{s.cards[x.id] ? '✅' : '⭐'}</button>
        </div>
      ))}
      {pages > 1 && (
        <div className="actions pager">
          <button disabled={page === 0} onClick={() => setPage(page - 1)}>السابق</button>
          <span dir="ltr">{page + 1} / {pages}</span>
          <button disabled={page + 1 >= pages} onClick={() => setPage(page + 1)}>التالي</button>
        </div>
      )}
      <h2>ضيفي كتابك <En>(1000 sentences)</En></h2>
      <div className="card form">
        <p className="muted">الصقي الجمل أو ارفعي ملف txt/csv. كل سطر: <En>English | عربي</En></p>
        <textarea rows={4} dir="auto" value={text} onChange={(e) => setText(e.target.value)} placeholder="I am happy | أنا مبسوطة" />
        <div className="actions">
          <button className="primary" disabled={!text.trim()} onClick={() => doImport(text)}>إضافة</button>
          <button onClick={() => file.current?.click()}>رفع ملف</button>
        </div>
        <input ref={file} hidden type="file" accept=".txt,.csv,.tsv" onChange={async (e) => { const f = e.target.files?.[0]; if (f) doImport(await f.text()); }} />
        {msg && <p>{msg}</p>}
      </div>
    </>
  );
}
