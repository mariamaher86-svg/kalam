# كلام — Kalam

تطبيق يخليكي تتكلمي وتكتبي إنجليزي في أسرع وقت. نفس طريقة **صوتي**: ويب + PWA، بيشتغل من غير نت، والبيانات على الموبايل بس.

## التشغيل

```bash
npm install
npm run dev
```

على الموبايل من نفس الواي فاي: `npm run dev:phone`. أوامر تانية: `npm test` و `npm run build`.

## النشر على الموبايل (GitHub Pages)

1. اعملي repo جديد **Public** وفاضي اسمه `kalam` على GitHub.
2. **Settings ← Pages ← Source: GitHub Actions**.
3. من الفولدر ده:
   ```bash
   git init -b main
   git add -A
   git commit -m "First version of Kalam"
   git remote add origin https://github.com/mariamaher86-svg/kalam.git
   git push -u origin main
   ```
4. كل push بعد كده بيتنشر لوحده على `https://mariamaher86-svg.github.io/kalam/`.
5. افتحي اللينك من Chrome على الموبايل ← القائمة ← **Add to Home screen**.

ملاحظة: الـ workflow بيستخدم `npm ci`، فلازم `package-lock.json` يترفع مع الكود.

## إضافة كتاب الجمل

من **تمرين ← الجمل ← ضيفي كتابك**: ارفعي ملف txt/csv أو الصقي الجمل. كل سطر: `English | عربي`. الجمل الموجودة في التطبيق أصلية ومش منقولة من كتاب منشور.
