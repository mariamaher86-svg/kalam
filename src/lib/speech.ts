/** Reads English aloud with the phone's built-in voice (works offline on most phones). */
export function speak(text: string, rate = 0.9) {
  if (!('speechSynthesis' in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.split('|')[0]);
  u.lang = 'en-US';
  u.rate = rate;
  speechSynthesis.speak(u);
}

type Recognition = { lang: string; interimResults: boolean; start(): void; onresult: ((e: { results: { 0: { transcript: string } }[] }) => void) | null; onerror: ((e: { error: string }) => void) | null; onend: (() => void) | null };

const getRecognition = () => {
  const w = window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
};
export const canListen = () => !!getRecognition();

/** Listens once and resolves with what was heard. Needs the microphone and usually internet. */
export function listen(): Promise<string> {
  return new Promise((resolve, reject) => {
    const R = getRecognition();
    if (!R) return reject(new Error('unsupported'));
    const r = new R();
    let heard = '';
    r.lang = 'en-US';
    r.interimResults = false;
    r.onresult = (e) => {
      heard = Array.from(e.results).map((x) => x[0].transcript).join(' ');
    };
    r.onerror = (e) => reject(new Error(e.error));
    r.onend = () => resolve(heard);
    r.start();
  });
}
