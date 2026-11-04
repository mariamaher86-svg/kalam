import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

/** A crash shows its message and a way back, never a blank screen. */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  state = { error: null };
  static getDerivedStateFromError(e: Error) {
    return { error: e.message };
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main>
        <h1>حصلت مشكلة</h1>
        <p>تقدمك لسه محفوظ. جربي تفتحي التطبيق تاني، ولو المشكلة فضلت ابعتي الرسالة دي:</p>
        <p dir="ltr" className="card">{this.state.error}</p>
        <button className="primary" onClick={() => { location.hash = ''; location.reload(); }}>افتحي من الأول</button>
      </main>
    );
  }
}

createRoot(document.getElementById('root')!).render(<ErrorBoundary><App /></ErrorBoundary>);

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
