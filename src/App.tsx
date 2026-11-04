import { useEffect, useState } from 'react';
import { Home, Practice, Progress } from './pages/main';
import { LessonPage, LessonsPage } from './pages/lessons';
import { ReviewPage, SentencesPage, WordsPage } from './pages/memory';
import { ExamPage, IntroPage, PlanPage, WritingPage } from './pages/skills';
import { ListenPage, ShadowPage, SituationPage, SituationsPage, SpeakPage } from './pages/speaking';

const route = () => location.hash.replace(/^#\/?/, '').split('/');
export const go = (path: string) => {
  location.hash = `/${path}`;
};

const tabs = [
  ['', 'الرئيسية', '🏠'],
  ['lessons', 'الجرامر', '📘'],
  ['practice', 'تمرين', '✍️'],
  ['progress', 'تقدمي', '📈'],
] as const;

export function App() {
  const [r, setR] = useState(route);
  useEffect(() => {
    const on = () => {
      setR(route());
      window.scrollTo(0, 0);
    };
    addEventListener('hashchange', on);
    return () => removeEventListener('hashchange', on);
  }, []);

  const [page, arg] = r;
  const views: Record<string, React.ReactNode> = {
    lessons: <LessonsPage />,
    lesson: <LessonPage key={arg} id={arg} />,
    practice: <Practice />,
    progress: <Progress />,
    words: <WordsPage />,
    review: <ReviewPage />,
    sentences: <SentencesPage />,
    writing: <WritingPage />,
    exam: <ExamPage />,
    plan: <PlanPage />,
    intro: <IntroPage />,
    speak: <SpeakPage />,
    shadow: <ShadowPage />,
    listen: <ListenPage />,
    situations: <SituationsPage />,
    situation: <SituationPage key={arg} id={arg} />,
  };
  return (
    <>
      <main>{views[page] ?? <Home />}</main>
      <nav className="tabs">
        {tabs.map(([p, label, icon]) => (
          <a key={p} href={`#/${p}`} className={page === p || (!views[page] && p === '') ? 'on' : ''}>
            <span>{icon}</span>
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}
