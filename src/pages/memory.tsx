import { useMemo, useRef, useState } from 'react';
import { dayStr, findWords, parseImport, pickReview } from '../lib/core';
import type { Question } from '../lib/questions';
import { addToReview, allSentences, allWords, dueCards, gradeCard, learnWords, reachedLessons, update, useStore } from '../lib/store';
import { sentenceGroups } from '../content/sentences';
import { En, Quiz, Say } from './Quiz';

export function WordsPage() {
  const s = useStore();
  const learned = s.learnedByDay[dayStr()] ?? 0;
  const remaining = Math.max(0, s.dailyGoal - learned);
  const fresh = allWords(s).filter((w) => !s.cards[w.id]);
  const batch = fresh.slice(0, remaining || 5);
  const [en, setEn] = useState('');
  const [ar, setAr] = useState('');
  const [msg, setMsg] = useState('');
  const matches = findWords(allWords(s), en);
  const sameMeaning = matches.some((w) => w.ar === ar.trim());

  const add = () => {
    const word = en.trim().replace(/\s+/g, ' ');
    if (!word) return setMsg('اكتبي الكلمة بالإنجليزي الأول.');
    if (!ar.trim()) return setMsg('اكتبي المعنى بالعربي عشان الكلمة تتضاف.');
    if (sameMeaning) return setMsg('الكلمة دي موجودة بنفس المعنى، فمش هتتكرر.');
    // a new meaning of a word we already have gets its own card
    const id = `w:${word.toLowerCase()}${matches.length ? `#${ar.trim()}` : ''}`;
    update((st) => ({ customWords: [...st.customWords, { id, en: word, ar: ar.trim() }] }));
    addToReview([id]);
    setEn('');
    setAr('');
    setMsg(`اتضافت "${word}" ✅ ودخلت المراجعة.`);
  };
  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') add();
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
        <input dir="ltr" placeholder="English" value={en} onKeyDown={onEnter} onChange={(e) => { setEn(e.target.value); setMsg(''); }} />
        {matches.length > 0 && (
          <div className="feedback close">
            <b>الكلمة دي موجودة في التطبيق ✅</b>
            {matches.map((w) => (
              <div key={w.id} className="row">
                <span><Say text={w.en} /> {w.ar}</span>
                {s.cards[w.id]
                  ? <small>بتحفظيها</small>
                  : <button onClick={() => addToReview([w.id])}>ضيفيها للمراجعة</button>}
              </div>
            ))}
            <small>لو تقصدي معنى تاني، اكتبيه تحت.</small>
          </div>
        )}
        <input placeholder="المعنى بالعربي" value={ar} onKeyDown={onEnter} onChange={(e) => { setAr(e.target.value); setMsg(''); }} />
        <button className="primary" onClick={add}>{matches.length ? 'إضافة كمعنى تاني' : 'إضافة'}</button>
        {msg && <p role="status" className="good-note">{msg}</p>}
      </div>
      {s.customWords.length > 0 && (
        <>
          <h2>كلماتي ({s.customWords.length})</h2>
          {[...s.customWords].reverse().map((w) => (
            <div key={w.id} className="card row"><span dir="ltr"><Say text={w.en} /> <b>{w.en}</b></span><span>{w.ar}</span></div>
          ))}
        </>
      )}
    </>
  );
}

const SIZES = [20, 50, 100];

export function ReviewPage() {
  const s = useStore();
  const [size, setSize] = useState(50);
  const [qs, setQs] = useState<Question[] | null>(null);
  const [done, setDone] = useState<{ right: number; total: number } | null>(null);
  const items = [...allWords(s), ...allSentences(s)];
  const learned = items.filter((x) => s.cards[x.id]).length;
  const due = dueCards(s).length;

  const start = () => {
    // words that share an Arabic meaning (arrive / reach) are all accepted for it
    const byMeaning = new Map<string, string[]>();
    for (const x of items) byMeaning.set(x.ar, [...(byMeaning.get(x.ar) ?? []), x.en]);
    const picked = pickReview(items, s.cards, dayStr(), size);
    setQs(picked.map((x) => ({ kind: 'write', lesson: x.id, prompt: x.ar, answer: [x.en, ...byMeaning.get(x.ar)!.filter((e) => e !== x.en)].join('|') })));
    setDone(null);
  };

  if (qs && !done) {
    return (
      <>
        <h1>المراجعة</h1>
        <Quiz
          questions={qs}
          help={false}
          onAnswer={(r) => gradeCard(r.lesson, r.right)}
          onDone={(r) => setDone({ right: r.filter((x) => x.right).length, total: r.length })}
        />
      </>
    );
  }
  return (
    <>
      <h1>المراجعة</h1>
      {done && (
        <div className="card center">
          <h2 dir="ltr">{done.right} / {done.total}</h2>
          <p>{done.right === done.total ? 'كله صح 🎉' : `${done.total - done.right} غلط، وهيرجعوا أول المراجعة الجاية.`}</p>
          <small className="muted">اللي جاوبتيه صح بيغيب أكتر كل مرة: 3 أيام، وبعدين أسبوع، وبعدين أسبوعين، لحد شهرين.</small>
        </div>
      )}
      <div className="card center">
        {learned ? (
          <>
            <p>عليها الدور: <b>{due}</b> من {learned} حاجة بتحفظيها.</p>
            <p className="muted">هتشوفي المعنى بالعربي وتكتبيه بالإنجليزي، وأنا أصحح.</p>
            <div className="row">
              <span>عدد الأسئلة</span>
              <select value={size} onChange={(e) => setSize(Number(e.target.value))}>
                {SIZES.map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <button className="primary" onClick={start}>{done ? 'مراجعة تانية' : 'ابدئي المراجعة'}</button>
          </>
        ) : (
          <>
            <p>لسه مفيش حاجة بتحفظيها.</p>
            <a className="btn primary" href="#/words">ابدئي بكلمات النهارده</a>
          </>
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
