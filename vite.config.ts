import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

/** After the build: write dist/sw.js that precaches every built file, so the app works offline. */
function offline(): Plugin {
  let outDir = 'dist';
  return {
    name: 'kalam-offline',
    apply: 'build',
    configResolved(c) {
      outDir = c.build.outDir;
    },
    closeBundle() {
      const walk = (d: string): string[] => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [relative(outDir, join(d, f)).replaceAll('\\', '/')]));
      const list = ['./', ...walk(outDir).filter((f) => f !== 'sw.js')];
      const cache = `kalam-${Date.now()}`;
      writeFileSync(
        join(outDir, 'sw.js'),
        `const C=${JSON.stringify(cache)},L=${JSON.stringify(list)};
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(L)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method==='GET')e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||fetch(e.request)))});`,
      );
    },
  };
}

// `npm run dev:phone` serves on the local network over HTTPS so the phone allows the microphone.
export default defineConfig(({ mode }) => ({
  base: './',
  plugins: [react(), offline(), ...(mode === 'phone' ? [basicSsl()] : [])],
}));
