export type Sentence = { id: string; en: string; ar: string; group: string; lesson: string };

// The sentences are original (not copied from a published book): frequent spoken patterns
// multiplied by everyday verbs and places, plus hand-written work and daily sentences.

const verbs: [string, string][] = [
  ['drink some water', 'أشرب شوية مية'], ['eat something', 'آكل حاجة'], ['go home', 'أروح البيت'], ['go to work', 'أروح الشغل'], ['learn English', 'أتعلم إنجليزي'],
  ['speak English', 'أتكلم إنجليزي'], ['talk to you', 'أكلمك'], ['call my mother', 'أكلم ماما'], ['send an email', 'أبعت إيميل'], ['read this book', 'أقرأ الكتاب ده'],
  ['write the report', 'أكتب التقرير'], ['fix this bug', 'أصلح الغلطة دي'], ['finish my work', 'أخلص شغلي'], ['start the project', 'أبدأ المشروع'], ['test the app', 'أختبر التطبيق'],
  ['join the meeting', 'أدخل الاجتماع'], ['ask a question', 'أسأل سؤال'], ['answer the phone', 'أرد على التليفون'], ['help my team', 'أساعد فريقي'], ['buy a new phone', 'أشتري تليفون جديد'],
  ['pay the bill', 'أدفع الفاتورة'], ['book a ticket', 'أحجز تذكرة'], ['travel next year', 'أسافر السنة الجاية'], ['see a doctor', 'أروح لدكتور'], ['take a break', 'آخد راحة'],
  ['get some sleep', 'أنام شوية'], ['wake up early', 'أصحى بدري'], ['stay at home', 'أفضل في البيت'], ['leave now', 'أمشي دلوقتي'], ['wait here', 'أستنى هنا'],
  ['open the door', 'أفتح الباب'], ['close the window', 'أقفل الشباك'], ['clean the house', 'أنضف البيت'], ['cook dinner', 'أطبخ العشا'], ['make some coffee', 'أعمل قهوة'],
  ['watch a movie', 'أتفرج على فيلم'], ['listen to music', 'أسمع مزيكا'], ['meet my friends', 'أقابل أصحابي'], ['visit my family', 'أزور عيلتي'], ['change my job', 'أغير شغلي'],
  ['save some money', 'أوفر شوية فلوس'], ['find a solution', 'ألاقي حل'], ['understand this', 'أفهم ده'], ['explain the problem', 'أشرح المشكلة'], ['review the code', 'أراجع الكود'],
  ['update the system', 'أحدث السيستم'], ['improve my English', 'أحسن إنجليزيتي'], ['practice every day', 'أتمرن كل يوم'], ['walk to work', 'أمشي للشغل'], ['rest a little', 'أرتاح شوية'],
];

const verbPatterns: [string, string, string][] = [
  ['I want to', 'عايزة', 'simple'], ['I need to', 'محتاجة', 'simple'], ['I don\'t want to', 'مش عايزة', 'do'], ['I can', 'أقدر', 'can'], ['I can\'t', 'مش قادرة', 'can'],
  ['I have to', 'لازم', 'must'], ['I should', 'المفروض', 'must'], ['I like to', 'بحب', 'simple'], ['Let me', 'خليني', 'object'], ['I forgot to', 'نسيت', 'past'],
  ['I\'m trying to', 'بحاول', 'continuous'], ['I decided to', 'قررت', 'gerund'], ['I hope to', 'أتمنى', 'gerund'], ['I would like to', 'حابة', 'cond2'], ['I\'m going to try to', 'هحاول', 'going'],
];

const places: [string, string][] = [
  ['bank', 'بنك'], ['airport', 'مطار'], ['hospital', 'مستشفى'], ['pharmacy', 'صيدلية'], ['hotel', 'فندق'], ['restaurant', 'مطعم'], ['station', 'محطة'], ['office', 'مكتب'], ['school', 'مدرسة'], ['university', 'جامعة'],
  ['market', 'سوق'], ['supermarket', 'سوبرماركت'], ['mall', 'مول'], ['park', 'جنينة'], ['gym', 'جيم'], ['club', 'نادي'], ['cafe', 'كافيه'], ['museum', 'متحف'], ['library', 'مكتبة'], ['post office', 'بوسطة'],
  ['metro', 'مترو'], ['bus stop', 'موقف الأتوبيس'], ['main street', 'شارع الرئيسي'], ['parking lot', 'جراج'], ['meeting room', 'أوضة الاجتماعات'], ['elevator', 'أسانسير'], ['entrance', 'مدخل'], ['exit', 'مخرج'], ['beach', 'شط'], ['embassy', 'سفارة'],
];

const placePatterns: [(n: string) => string, (a: string) => string, string][] = [
  [(n) => `Where is the ${n}?`, (a) => `فين ال${a}؟`, 'be'],
  [(n) => `I can't find the ${n}.`, (a) => `مش لاقية ال${a}.`, 'can'],
  [(n) => `I'm looking for the ${n}.`, (a) => `بدور على ال${a}.`, 'continuous'],
  [(n) => `How can I get to the ${n}?`, (a) => `أوصل لل${a} إزاي؟`, 'can'],
  [(n) => `I'm near the ${n}.`, (a) => `أنا قريبة من ال${a}.`, 'be'],
  [(n) => `I'm going to the ${n}.`, (a) => `أنا رايحة ال${a}.`, 'continuous'],
  [(n) => `Let's meet at the ${n}.`, (a) => `نتقابل عند ال${a}.`, 'prep'],
];

const hand: [string, string, string, string][] = [
  ['Introductions', 'be', 'Hello, nice to meet you.', 'أهلًا، سعيدة بمعرفتك.'],
  ['Introductions', 'be', 'Let me introduce myself.', 'خليني أعرفك بنفسي.'],
  ['Introductions', 'be', 'My name is Maria.', 'اسمي ماريا.'],
  ['Introductions', 'simple', 'I live in Cairo.', 'أنا ساكنة في القاهرة.'],
  ['Introductions', 'be', 'I am a software developer.', 'أنا مبرمجة.'],
  ['Introductions', 'simple', 'I enjoy solving problems.', 'بستمتع بحل المشاكل.'],
  ['Introductions', 'continuous', 'I am learning English now.', 'بتعلم إنجليزي دلوقتي.'],
  ['Introductions', 'wh', 'What do you do?', 'بتشتغل إيه؟'],
  ['Introductions', 'wh', 'Where are you from?', 'إنت منين؟'],
  ['Introductions', 'simple', 'I am from Egypt.', 'أنا من مصر.'],
  ['Daily', 'be', 'How are you today?', 'عامل إيه النهارده؟'],
  ['Daily', 'be', 'I am fine, thank you.', 'أنا كويسة، شكرًا.'],
  ['Daily', 'be', 'I am sorry, I am late.', 'آسفة، اتأخرت.'],
  ['Daily', 'can', 'Can you say that again?', 'ممكن تقول ده تاني؟'],
  ['Daily', 'can', 'Can you speak slowly, please?', 'ممكن تتكلم ببطء من فضلك؟'],
  ['Daily', 'do', 'I don\'t understand.', 'مش فاهمة.'],
  ['Daily', 'wh', 'What does this word mean?', 'الكلمة دي معناها إيه؟'],
  ['Daily', 'wh', 'How much is this?', 'ده بكام؟'],
  ['Daily', 'wh', 'What time is it?', 'الساعة كام؟'],
  ['Daily', 'simple', 'I agree with you.', 'أنا موافقة معاك.'],
  ['Daily', 'be', 'That is a good idea.', 'دي فكرة كويسة.'],
  ['Daily', 'be', 'No problem, it is okay.', 'مفيش مشكلة، تمام.'],
  ['Daily', 'will', 'I will call you back.', 'هكلمك تاني.'],
  ['Daily', 'will', 'See you tomorrow.', 'أشوفك بكره.'],
  ['Work', 'continuous', 'I am working on a new feature.', 'بشتغل على ميزة جديدة.'],
  ['Work', 'perfect', 'I have fixed the bug.', 'صلحت الغلطة.'],
  ['Work', 'past', 'I finished the task yesterday.', 'خلصت المهمة امبارح.'],
  ['Work', 'will', 'I will finish it today.', 'هخلصها النهارده.'],
  ['Work', 'be', 'I am blocked on this issue.', 'أنا واقفة على المشكلة دي.'],
  ['Work', 'can', 'Can you review my code?', 'ممكن تراجع الكود بتاعي؟'],
  ['Work', 'can', 'Can we discuss this in the meeting?', 'ممكن نناقش ده في الاجتماع؟'],
  ['Work', 'do', 'The app doesn\'t work on this phone.', 'التطبيق مش شغال على التليفون ده.'],
  ['Work', 'thereis', 'There is a problem with the server.', 'فيه مشكلة في السيرفر.'],
  ['Work', 'thereis', 'There are two open issues.', 'فيه مشكلتين مفتوحين.'],
  ['Work', 'must', 'We should test it first.', 'المفروض نختبرها الأول.'],
  ['Work', 'must', 'We have to deploy today.', 'لازم ننشر النهارده.'],
  ['Work', 'passive', 'The new version was released.', 'النسخة الجديدة نزلت.'],
  ['Work', 'wh', 'When is the deadline?', 'ميعاد التسليم إمتى؟'],
  ['Work', 'wh', 'How long will it take?', 'هتاخد قد إيه؟'],
  ['Work', 'simple', 'I need more time for this task.', 'محتاجة وقت أكتر للمهمة دي.'],
  ['Work', 'simple', 'I think the problem is in the database.', 'أعتقد المشكلة في قاعدة البيانات.'],
  ['Work', 'cond1', 'If it works, I will deploy it.', 'لو اشتغلت هنشرها.'],
  ['Work', 'perfect', 'I have worked in this company for three years.', 'بشتغل في الشركة دي من تلات سنين.'],
];

const buildAll = (): Sentence[] => {
  const out: Sentence[] = hand.map(([group, lesson, en, ar], i) => ({ id: `s:h${i}`, group, lesson, en, ar }));
  verbPatterns.forEach(([pe, pa, lesson], p) =>
    verbs.forEach(([ve, va], v) => out.push({ id: `s:v${p}-${v}`, group: pe, lesson, en: `${pe} ${ve}.`, ar: `${pa} ${va}.` })),
  );
  placePatterns.forEach(([fe, fa, lesson], p) =>
    places.forEach(([pe, pa], v) => out.push({ id: `s:p${p}-${v}`, group: 'Places', lesson, en: fe(pe), ar: fa(pa) })),
  );
  return out;
};

export const sentences: Sentence[] = buildAll();
export const sentenceGroups = [...new Set(sentences.map((s) => s.group))];
