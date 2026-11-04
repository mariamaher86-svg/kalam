/** The full explanation of each lesson, written for someone starting from zero. */
export type Detail = {
  /** Arabic steps, in teaching order */
  rules: string[];
  /** first row is the header */
  table?: string[][];
  /** [wrong, right, why] */
  mistakes: [string, string, string][];
  /** the same ideas in simple English */
  en: string[];
};

export const details: Record<string, Detail> = {
  be: {
    rules: ['في العربي بنقول "أنا مبسوطة" من غير فعل، لكن الجملة الإنجليزي لازم يبقى فيها فعل. عشان كده بنحط am أو is أو are، ومعناهم هنا "يكون" ومش بنترجمهم.', 'النفي: نحط not بعد الفعل. I am not.', 'السؤال: نقدم الفعل قبل الفاعل. You are ready تبقى Are you ready?', 'الاختصار في الكلام: I am تبقى I\'m، و he is تبقى he\'s، و you are تبقى you\'re، و is not تبقى isn\'t، و are not تبقى aren\'t.'],
    table: [['الضمير', 'المعنى', 'الفعل', 'مثال'], ['I', 'أنا', 'am', 'I am happy.'], ['he', 'هو', 'is', 'He is busy.'], ['she', 'هي', 'is', 'She is here.'], ['it', 'لغير العاقل', 'is', 'It is new.'], ['you', 'إنت/إنتي/إنتو', 'are', 'You are late.'], ['we', 'إحنا', 'are', 'We are ready.'], ['they', 'هم', 'are', 'They are home.']],
    mistakes: [['I happy.', 'I am happy.', 'الفعل مينفعش يتشال.'], ['She are busy.', 'She is busy.', 'she دايمًا معاها is.'], ['You are ready?', 'Are you ready?', 'في السؤال الفعل ييجي الأول.']],
    en: ['Every English sentence needs a verb, so use am, is, or are.', 'I takes am. He, she, and it take is. You, we, and they take are.', 'Add not to make it negative. Put the verb first to ask a question.'],
  },
  pronouns: {
    rules: ['الضمير الفاعل هو اللي بيعمل الفعل، وبييجي قبل الفعل: I work.', 'صفة الملكية بتيجي قبل الاسم، ومعناها "بتاع": my book يعني كتابي. الإنجليزي بيقدمها، فبنقول "بتاعي كتاب" مش "كتاب بتاعي".', 'مع الأسماء بنزود \'s: Sara\'s car يعني عربية سارة. لاحظي إن المالك بييجي الأول والمملوك بعده، عكس العربي.', 'his لراجل و her لست، حسب صاحب الحاجة مش الحاجة نفسها.'],
    table: [['الضمير', 'الملكية', 'المعنى', 'مثال'], ['I', 'my', 'بتاعي', 'my name'], ['you', 'your', 'بتاعك', 'your job'], ['he', 'his', 'بتاعه', 'his car'], ['she', 'her', 'بتاعها', 'her phone'], ['it', 'its', 'بتاعه لغير العاقل', 'its color'], ['we', 'our', 'بتاعنا', 'our team'], ['they', 'their', 'بتاعهم', 'their house']],
    mistakes: [['I name is Sara.', 'My name is Sara.', 'قبل الاسم بنستخدم my.'], ['the car of Sara', 'Sara\'s car', 'للأشخاص بنستخدم \'s.'], ['She loves his job. (شغلها هي)', 'She loves her job.', 'صاحبة الشغل ست، فنقول her.']],
    en: ['Subject pronouns do the action: I, you, he, she, it, we, they.', 'Possessive words come before a noun: my, your, his, her, its, our, their.', 'Add \'s to a person\'s name to show ownership: Ali\'s phone.'],
  },
  articles: {
    rules: ['الحروف المتحركة (Vowels) في الإنجليزي خمسة: a, e, i, o, u. باقي الحروف اسمها ساكنة (Consonants) زي b, c, d, k, m, t.', 'a أو an معناها "واحد" أو "واحدة"، وبنستخدمها مع اسم مفرد بنذكره لأول مرة أو مش محدد: I have a car (عندي عربية، أي عربية).', 'قبل الكلمة اللي بتبدأ بصوت ساكن نقول a: a book, a car, a developer.', 'قبل الكلمة اللي بتبدأ بصوت متحرك نقول an: an apple, an egg, an idea, an office, an umbrella.', 'المهم الصوت مش الحرف المكتوب: an hour لأن h مش بتتنطق فبتبدأ بصوت متحرك، و a university لأنها بتتنطق "يو" فبتبدأ بصوت ساكن.', 'the معناها "ال" في العربي، وبنستخدمها للحاجة المحددة اللي عارفين بنتكلم عن أنهي واحدة: I bought a car. The car is red.', 'الوظايف لازم قبلها a أو an: I am a developer. مع الجمع مش بنستخدم a: I have books.'],
    table: [['الأداة', 'إمتى', 'مثال'], ['a', 'مفرد + صوت ساكن', 'a laptop'], ['an', 'مفرد + صوت متحرك', 'an email'], ['the', 'حاجة محددة، مفرد أو جمع', 'the meeting'], ['بدون أداة', 'جمع أو كلام عام', 'I like books.']],
    mistakes: [['I am developer.', 'I am a developer.', 'الوظيفة لازم قبلها a.'], ['a apple', 'an apple', 'apple بتبدأ بصوت متحرك.'], ['a hour', 'an hour', 'حرف h هنا مش بيتنطق.'], ['I have a books.', 'I have books.', 'a للمفرد بس.']],
    en: ['The vowels are a, e, i, o, u. The other letters are consonants.', 'Use a before a consonant sound and an before a vowel sound.', 'The sound matters, not the letter: an hour, a university.', 'Use the when both people know which thing you mean.'],
  },
  plurals: {
    rules: ['القاعدة العامة: نزود s في آخر الاسم: book تبقى books.', 'لو الكلمة منتهية بـ s أو ch أو sh أو x نزود es عشان تتنطق: box تبقى boxes.', 'لو منتهية بحرف ساكن + y، نشيل y ونزود ies: city تبقى cities. لو قبل y حرف متحرك نزود s بس: day تبقى days.', 'فيه كلمات شاذة لازم تتحفظ، زي اللي في الجدول.', 'في الإنجليزي مفيش مثنى: اتنين وأكتر كلهم جمع: two books.'],
    table: [['المفرد', 'الجمع', 'المعنى'], ['man', 'men', 'رجالة'], ['woman', 'women', 'ستات'], ['child', 'children', 'أطفال'], ['person', 'people', 'ناس'], ['foot', 'feet', 'أقدام'], ['tooth', 'teeth', 'أسنان']],
    mistakes: [['two book', 'two books', 'بعد رقم أكبر من واحد الاسم جمع.'], ['childs', 'children', 'كلمة شاذة.'], ['citys', 'cities', 'y بعد حرف ساكن تبقى ies.']],
    en: ['Add s to most nouns. Add es after s, ch, sh, and x.', 'Change a consonant plus y to ies: city, cities.', 'Learn irregular plurals by heart: man, men; child, children; person, people.'],
  },
  this: {
    rules: ['اختاري الكلمة بسؤالين: الحاجة قريبة ولا بعيدة؟ وواحدة ولا أكتر؟', 'نفس الكلمة بتنفع للمذكر والمؤنث: this معناها ده أو دي.', 'بعد this و that نستخدم is، وبعد these و those نستخدم are.'],
    table: [['', 'قريب', 'بعيد'], ['مفرد', 'this', 'that'], ['جمع', 'these', 'those']],
    mistakes: [['This are my friends.', 'These are my friends.', 'الجمع معاه these و are.'], ['these book', 'this book', 'book مفرد.'], ['Those is my car.', 'That is my car.', 'that للمفرد البعيد.']],
    en: ['This and these are for near things. That and those are for far things.', 'This and that are singular. These and those are plural.'],
  },
  thereis: {
    rules: ['كلمة "فيه" بمعنى "يوجد" بنقولها There is للمفرد و There are للجمع.', 'بنستخدمها لما نقول إن حاجة موجودة، مش لما نحدد مكانها بس: There is a bank near here.', 'النفي: There isn\'t و There aren\'t.', 'السؤال: نقدم الفعل: Is there...? و Are there...?', 'there هنا مش معناها "هناك". هي جزء من التعبير.'],
    table: [['النوع', 'مفرد', 'جمع'], ['إثبات', 'There is a bug.', 'There are two bugs.'], ['نفي', 'There isn\'t a bug.', 'There aren\'t any bugs.'], ['سؤال', 'Is there a bug?', 'Are there any bugs?']],
    mistakes: [['It has a problem here.', 'There is a problem here.', '"فيه" معناها There is مش has.'], ['There is two bugs.', 'There are two bugs.', 'الجمع معاه are.'], ['There are a bank.', 'There is a bank.', 'bank مفرد.']],
    en: ['Use there is and there are to say something exists.', 'There is goes with singular nouns. There are goes with plural nouns.'],
  },
  have: {
    rules: ['"عندي" في الإنجليزي فعل: I have. مش بنقول "at me".', 'مع he و she و it بنقول has، ومع باقي الضماير have.', 'النفي: don\'t have و doesn\'t have. بعد doesn\'t بنرجع لـ have.', 'السؤال: Do you have...? و Does she have...?', 'بتستخدم كمان في السن؟ لأ. السن بـ be: I am 30 years old، مش I have 30 years.'],
    table: [['الفاعل', 'إثبات', 'نفي', 'سؤال'], ['I / you / we / they', 'have', 'don\'t have', 'Do ... have?'], ['he / she / it', 'has', 'doesn\'t have', 'Does ... have?']],
    mistakes: [['She have a car.', 'She has a car.', 'she معاها has.'], ['She doesn\'t has a car.', 'She doesn\'t have a car.', 'بعد doesn\'t الفعل يرجع لأصله.'], ['I have 30 years.', 'I am 30 years old.', 'السن بنقوله بـ be.']],
    en: ['Use have with I, you, we, they. Use has with he, she, it.', 'Negative: don\'t have, doesn\'t have. Question: Do you have? Does she have?'],
  },
  simple: {
    rules: ['بنستخدمه لحاجة بتحصل بشكل متكرر أو حقيقة ثابتة: I work every day. مش للي بيحصل دلوقتي حالًا.', 'مع I و you و we و they الفعل زي ما هو: I work.', 'مع he و she و it نزود s: She works. دي أهم قاعدة في الدرس.', 'لو الفعل منتهي بـ s أو ch أو sh أو x أو o نزود es: go تبقى goes و watch تبقى watches.', 'لو منتهي بحرف ساكن + y تبقى ies: study تبقى studies. فعل have يبقى has.', 'كلمات بتيجي معاه: every day, always, usually, sometimes, on Sundays.'],
    table: [['الفاعل', 'work', 'go', 'study'], ['I / you / we / they', 'work', 'go', 'study'], ['he / she / it', 'works', 'goes', 'studies']],
    mistakes: [['She work here.', 'She works here.', 'مع she نزود s.'], ['I works here.', 'I work here.', 'مع I مفيش s.'], ['I am work here.', 'I work here.', 'مش بنجمع am مع الفعل هنا.']],
    en: ['Use the present simple for habits and facts.', 'Add s or es to the verb after he, she, and it.', 'Use the base verb after I, you, we, and they.'],
  },
  do: {
    rules: ['في المضارع البسيط مش بنحط not بعد الفعل مباشرة. بنستخدم فعل مساعد: do أو does.', 'النفي: I don\'t work و She doesn\'t work.', 'السؤال: Do you work? و Does she work?', 'does هي اللي بتاخد الـ s، فالفعل الأساسي يرجع لأصله من غير s.', 'الإجابة القصيرة: Yes, I do. و No, she doesn\'t.', 'do هنا مش معناها "يعمل"، هي بس أداة مساعدة.'],
    table: [['الفاعل', 'نفي', 'سؤال'], ['I / you / we / they', 'don\'t work', 'Do ... work?'], ['he / she / it', 'doesn\'t work', 'Does ... work?']],
    mistakes: [['I not work.', 'I don\'t work.', 'لازم فعل مساعد.'], ['She doesn\'t works.', 'She doesn\'t work.', 'الـ s راحت لـ does.'], ['You like tea?', 'Do you like tea?', 'السؤال بيبدأ بـ Do.'], ['Does she works?', 'Does she work?', 'بعد Does الفعل يرجع لأصله.']],
    en: ['Use don\'t or doesn\'t plus the base verb to make a negative.', 'Use Do or Does before the subject to ask a question.', 'After does and doesn\'t, the main verb has no s.'],
  },
  wh: {
    rules: ['الترتيب ثابت: أداة السؤال، بعدها do أو does أو be، بعدها الفاعل، بعدها الفعل.', 'مع فعل عادي: Where do you work?', 'مع be: Where are you? من غير do.', 'how much للي مابيتعدش زي الفلوس والمية، و how many للي بيتعد زي الكتب.', 'الإجابة على why بتبدأ بـ because.'],
    table: [['الأداة', 'المعنى', 'مثال'], ['What', 'إيه', 'What is your name?'], ['Where', 'فين', 'Where do you live?'], ['When', 'إمتى', 'When is the meeting?'], ['Who', 'مين', 'Who is she?'], ['Why', 'ليه', 'Why are you late?'], ['How', 'إزاي', 'How are you?'], ['How old', 'عندك كام سنة', 'How old are you?'], ['How much', 'بكام / قد إيه', 'How much is it?'], ['How many', 'كام (عدد)', 'How many books?']],
    mistakes: [['Where you work?', 'Where do you work?', 'ناقص do.'], ['What your name?', 'What is your name?', 'ناقص is.'], ['Where you are?', 'Where are you?', 'الفعل قبل الفاعل.']],
    en: ['Word order: question word, then do or be, then the subject, then the verb.', 'Use how much with uncountable nouns and how many with countable nouns.'],
  },
  prep: {
    rules: ['للوقت فكري من الأصغر للأكبر: at للساعة، on لليوم والتاريخ، in للشهر والسنة وأجزاء اليوم.', 'للمكان: in يعني جوه حاجة، on يعني فوق سطح، at يعني عند نقطة أو مكان معروف.', 'تعبيرات لازم تتحفظ: at home, at work, at night, in the morning, on the phone.', 'مع next و last و every و today مش بنستخدم حرف جر: I work every day.'],
    table: [['الحرف', 'وقت', 'مكان'], ['at', 'at 5:00 / at night', 'at work / at home'], ['on', 'on Monday / on May 5', 'on the table'], ['in', 'in June / in 2026 / in the morning', 'in the room / in Cairo']],
    mistakes: [['in Monday', 'on Monday', 'الأيام معاها on.'], ['in 5 o\'clock', 'at 5 o\'clock', 'الساعة معاها at.'], ['I live at Cairo.', 'I live in Cairo.', 'المدن معاها in.'], ['on next week', 'next week', 'next من غير حرف جر.']],
    en: ['Time: at for clock times, on for days and dates, in for months and years.', 'Place: in for inside, on for surfaces, at for a point or known place.'],
  },
  can: {
    rules: ['can معناها "يقدر" أو "ممكن". شكلها ثابت مع كل الضماير: I can, she can.', 'بعدها الفعل في أصله مباشرة، من غير to ومن غير s: She can swim.', 'النفي: can\'t أو cannot.', 'السؤال: نقدم can: Can you help me? ودي كمان طريقة مؤدبة للطلب.', 'الماضي منها could: I could swim.'],
    table: [['النوع', 'الترتيب', 'مثال'], ['إثبات', 'فاعل + can + فعل', 'I can code.'], ['نفي', 'فاعل + can\'t + فعل', 'I can\'t drive.'], ['سؤال', 'Can + فاعل + فعل', 'Can you help?']],
    mistakes: [['She cans swim.', 'She can swim.', 'can مش بتاخد s.'], ['I can to go.', 'I can go.', 'مفيش to بعد can.'], ['I don\'t can.', 'I can\'t.', 'النفي بـ can\'t.'], ['She can swims.', 'She can swim.', 'الفعل بعد can في أصله.']],
    en: ['Can shows ability or asks for something politely.', 'Use the base verb after can. Do not add to or s.'],
  },
  continuous: {
    rules: ['بنستخدمه للي بيحصل دلوقتي أو في الفترة دي: I am learning English.', 'التركيب: am أو is أو are + الفعل بـ ing. الجزئين لازم يكونوا موجودين.', 'لو الفعل منتهي بـ e نشيلها: make تبقى making.', 'لو الفعل قصير منتهي بساكن قبله متحرك واحد نكرر الأخير: run تبقى running.', 'أفعال الحالة زي know و want و like و need مش بتيجي عادة في ing: I know، مش I am knowing.', 'الفرق: I work here (عادة) و I am working now (حالًا).'],
    table: [['النوع', 'مثال'], ['إثبات', 'She is working.'], ['نفي', 'She isn\'t working.'], ['سؤال', 'Is she working?'], ['مع أداة سؤال', 'What is she doing?']],
    mistakes: [['I working now.', 'I am working now.', 'ناقص am.'], ['I am work now.', 'I am working now.', 'الفعل لازم بـ ing.'], ['I am knowing him.', 'I know him.', 'know فعل حالة.']],
    en: ['Use am, is, or are plus verb-ing for actions happening now.', 'Common words: now, right now, at the moment, today.', 'Do not use it with state verbs such as know, want, and like.'],
  },
  pastbe: {
    rules: ['ده ماضي am و is و are، ومعناه "كان".', 'am و is يبقوا was، و are تبقى were.', 'النفي: wasn\'t و weren\'t.', 'السؤال: Was she...? و Were you...?', 'كلمات بتيجي معاه: yesterday, last night, last week, ago.'],
    table: [['الفاعل', 'إثبات', 'نفي', 'سؤال'], ['I / he / she / it', 'was', 'wasn\'t', 'Was ...?'], ['you / we / they', 'were', 'weren\'t', 'Were ...?']],
    mistakes: [['I were late.', 'I was late.', 'I معاها was.'], ['They was here.', 'They were here.', 'they معاها were.'], ['Did you were busy?', 'Were you busy?', 'مش بنستخدم did مع be.']],
    en: ['Was goes with I, he, she, it. Were goes with you, we, they.', 'Put was or were first to ask a question.'],
  },
  past: {
    rules: ['بنستخدمه لحاجة حصلت وخلصت في وقت معروف: I worked yesterday.', 'الفعل العادي نزود له ed: work تبقى worked. لو منتهي بـ e نزود d: live تبقى lived. وحرف ساكن + y تبقى ied: study تبقى studied.', 'الفعل الشاذ ليه شكل خاص لازم يتحفظ، زي الجدول.', 'شكل الماضي واحد مع كل الضماير: I went, she went.', 'النفي: didn\'t + الفعل في أصله. السؤال: Did + فاعل + الفعل في أصله.'],
    table: [['الفعل', 'الماضي', 'المعنى'], ['go', 'went', 'راح'], ['see', 'saw', 'شاف'], ['have', 'had', 'كان عنده'], ['eat', 'ate', 'أكل'], ['make', 'made', 'عمل'], ['take', 'took', 'أخد'], ['come', 'came', 'جه'], ['write', 'wrote', 'كتب'], ['buy', 'bought', 'اشترى'], ['say', 'said', 'قال']],
    mistakes: [['I goed.', 'I went.', 'go فعل شاذ.'], ['I didn\'t went.', 'I didn\'t go.', 'بعد didn\'t الفعل في أصله.'], ['Did you saw it?', 'Did you see it?', 'بعد Did الفعل في أصله.']],
    en: ['Use the past simple for finished actions at a known time.', 'Regular verbs add ed. Irregular verbs must be memorized.', 'Use didn\'t or Did with the base verb.'],
  },
  going: {
    rules: ['بنستخدمه لخطة قررناها قبل ما نتكلم: I am going to travel next month.', 'كمان لتوقع عندنا دليل عليه: Look at the clouds. It is going to rain.', 'التركيب: am أو is أو are + going to + الفعل في أصله.', 'في الكلام السريع بتتنطق gonna، لكن في الكتابة نكتب going to.'],
    table: [['النوع', 'مثال'], ['إثبات', 'I am going to study.'], ['نفي', 'I am not going to study.'], ['سؤال', 'Are you going to study?']],
    mistakes: [['I going to study.', 'I am going to study.', 'ناقص am.'], ['I am going to studying.', 'I am going to study.', 'بعد to الفعل في أصله.'], ['She are going to come.', 'She is going to come.', 'she معاها is.']],
    en: ['Use be going to for plans and for predictions based on evidence.', 'Form: am, is, or are, then going to, then the base verb.'],
  },
  will: {
    rules: ['بنستخدم will لقرار لسه واخدينه دلوقتي: The phone is ringing. I will answer.', 'كمان للوعد: I will help you، وللتوقع من غير دليل: I think it will be fine.', 'التركيب: will + الفعل في أصله، وشكلها ثابت مع كل الضماير.', 'الاختصار: I will تبقى I\'ll، والنفي will not تبقى won\'t.', 'الفرق: going to لخطة قديمة، و will لقرار لحظي.'],
    table: [['النوع', 'مثال'], ['إثبات', 'I will call you.'], ['نفي', 'I won\'t call you.'], ['سؤال', 'Will you call me?']],
    mistakes: [['She wills come.', 'She will come.', 'will مش بتاخد s.'], ['I will to call.', 'I will call.', 'مفيش to بعد will.'], ['I will calling.', 'I will call.', 'الفعل في أصله.']],
    en: ['Use will for quick decisions, promises, and predictions.', 'Use the base verb after will. The negative is won\'t.'],
  },
  compare: {
    rules: ['للمقارنة بين حاجتين: الصفة القصيرة (مقطع واحد) نزود لها er + than: fast تبقى faster than.', 'الصفة الطويلة نحط قبلها more: more expensive than.', 'للأفضل في مجموعة: the + صفة بـ est، أو the most مع الطويلة: the fastest, the most expensive.', 'حرف ساكن + y تبقى ier: easy تبقى easier. وكلمة قصيرة منتهية بمتحرك + ساكن بنكرر الأخير: big تبقى bigger.', 'شواذ: good, better, best و bad, worse, worst.'],
    table: [['الصفة', 'مقارنة', 'الأفضل'], ['fast', 'faster', 'the fastest'], ['easy', 'easier', 'the easiest'], ['big', 'bigger', 'the biggest'], ['expensive', 'more expensive', 'the most expensive'], ['good', 'better', 'the best'], ['bad', 'worse', 'the worst']],
    mistakes: [['more faster', 'faster', 'مش بنجمع more مع er.'], ['better from', 'better than', 'المقارنة بـ than.'], ['gooder', 'better', 'good شاذة.']],
    en: ['Short adjectives add er and est. Long adjectives use more and the most.', 'Use than when you compare two things.'],
  },
  freq: {
    rules: ['الكلمات دي بتقول الحاجة بتحصل قد إيه.', 'بتيجي قبل الفعل العادي: I always work.', 'بتيجي بعد am و is و are: I am always busy.', 'never معناها نفي، فمش بنحط معاها not.', 'للسؤال: How often do you study? يعني بتذاكري قد إيه.'],
    table: [['الكلمة', 'المعنى', 'النسبة'], ['always', 'دايمًا', '100%'], ['usually', 'عادةً', '80%'], ['often', 'كتير', '60%'], ['sometimes', 'أحيانًا', '40%'], ['rarely', 'نادرًا', '10%'], ['never', 'أبدًا', '0%']],
    mistakes: [['I work always.', 'I always work.', 'قبل الفعل العادي.'], ['I always am busy.', 'I am always busy.', 'بعد فعل be.'], ['I don\'t never eat.', 'I never eat.', 'never لوحدها نفي.']],
    en: ['Put frequency adverbs before a main verb and after be.', 'Never already has a negative meaning, so do not add not.'],
  },
  count: {
    rules: ['اسم معدود: تقدري تقولي معاه رقم: one book, two books.', 'اسم غير معدود: مالوش جمع زي water و money و time و information و advice.', 'many مع المعدود، و much مع غير المعدود، وغالبًا في النفي والسؤال.', 'a lot of تنفع مع الاتنين، وهي الأسهل في الجمل المثبتة.', 'some في الإثبات والطلب بأدب، و any في النفي والسؤال.'],
    table: [['الكلمة', 'معدود', 'غير معدود'], ['many', 'many books', '—'], ['much', '—', 'much water'], ['a lot of', 'a lot of books', 'a lot of water'], ['some', 'some books', 'some water'], ['any', 'any books?', 'any water?']],
    mistakes: [['much books', 'many books', 'books معدودة.'], ['many money', 'much money', 'money غير معدودة.'], ['informations', 'information', 'مالهاش جمع.'], ['I don\'t have some time.', 'I don\'t have any time.', 'في النفي any.']],
    en: ['Countable nouns can have a number. Uncountable nouns have no plural.', 'Use many with countable nouns and much with uncountable nouns.', 'Use some in positive sentences and any in negatives and questions.'],
  },
  object: {
    rules: ['الضمير الفاعل بيعمل الفعل وبييجي قبله: I call her.', 'ضمير المفعول بيقع عليه الفعل وبييجي بعده: She calls me.', 'بعد حروف الجر زي with و for و to بنستخدم ضمير المفعول: with me, for them.'],
    table: [['فاعل', 'مفعول', 'مثال'], ['I', 'me', 'Call me.'], ['you', 'you', 'I see you.'], ['he', 'him', 'I know him.'], ['she', 'her', 'Ask her.'], ['it', 'it', 'Fix it.'], ['we', 'us', 'Help us.'], ['they', 'them', 'Call them.']],
    mistakes: [['Help I.', 'Help me.', 'بعد الفعل me.'], ['I know he.', 'I know him.', 'بعد الفعل him.'], ['with they', 'with them', 'بعد حرف الجر them.']],
    en: ['Object pronouns come after verbs and prepositions.', 'They are me, you, him, her, it, us, them.'],
  },
  must: {
    rules: ['have to و must معناهم "لازم". have to أشهر في الكلام عن الواجبات والقواعد.', 'مع he و she نقول has to.', 'should معناها "المفروض" أو "الأحسن"، وبنستخدمها للنصيحة، وهي أخف من لازم.', 'بعد must و should الفعل في أصله من غير to. لكن have to فيها to.', 'انتبهي للفرق: mustn\'t يعني ممنوع، و don\'t have to يعني مش لازم بس عادي لو عملتيها.'],
    table: [['التعبير', 'المعنى', 'مثال'], ['have to', 'لازم', 'I have to go.'], ['must', 'لازم', 'You must stop.'], ['should', 'المفروض', 'You should rest.'], ['don\'t have to', 'مش لازم', 'You don\'t have to pay.'], ['mustn\'t', 'ممنوع', 'You mustn\'t smoke here.']],
    mistakes: [['I must to go.', 'I must go.', 'مفيش to بعد must.'], ['She have to go.', 'She has to go.', 'she معاها has.'], ['You should to rest.', 'You should rest.', 'مفيش to بعد should.']],
    en: ['Must and have to show obligation. Should gives advice.', 'Mustn\'t means it is forbidden. Don\'t have to means it is not necessary.'],
  },
  perfect: {
    rules: ['التركيب: have أو has + التصريف التالت للفعل.', 'التصريف التالت في الفعل العادي زي الماضي: worked. وفي الشاذ ليه شكل خاص: seen, gone, done.', 'استخدام 1: خبرة في حياتك من غير ذكر الوقت: I have been to Dubai.', 'استخدام 2: حاجة بدأت في الماضي ولسه مستمرة: I have worked here for 5 years.', 'استخدام 3: حاجة لسه حاصلة ونتيجتها مهمة دلوقتي: I have just finished.', 'for مع المدة: for 5 years. و since مع نقطة البداية: since 2020.', 'لو ذكرتي وقت منتهي زي yesterday نستخدم الماضي البسيط: I finished yesterday.'],
    table: [['الفعل', 'الماضي', 'التصريف التالت'], ['go', 'went', 'gone'], ['see', 'saw', 'seen'], ['do', 'did', 'done'], ['write', 'wrote', 'written'], ['eat', 'ate', 'eaten'], ['be', 'was/were', 'been'], ['have', 'had', 'had'], ['make', 'made', 'made']],
    mistakes: [['I have saw it.', 'I have seen it.', 'بعد have التصريف التالت.'], ['I work here for 5 years.', 'I have worked here for 5 years.', 'لسه مستمر فبنستخدم perfect.'], ['I have finished yesterday.', 'I finished yesterday.', 'yesterday معاها الماضي البسيط.']],
    en: ['Form: have or has plus the past participle.', 'Use it for experiences, recent results, and actions that continue until now.', 'Use for with a period and since with a starting point.'],
  },
  pastcont: {
    rules: ['التركيب: was أو were + الفعل بـ ing.', 'بنستخدمه لحاجة كانت مستمرة في لحظة في الماضي: At 10, I was sleeping.', 'لما حدث قصير يقطع حدث طويل: الطويل مستمر، والقصير ماضي بسيط: I was working when she called.', 'while بتيجي عادة مع الطويل، و when مع القصير.'],
    table: [['النوع', 'مثال'], ['إثبات', 'They were working.'], ['نفي', 'They weren\'t working.'], ['سؤال', 'Were they working?']],
    mistakes: [['I was sleep.', 'I was sleeping.', 'لازم ing.'], ['We was working.', 'We were working.', 'we معاها were.'], ['I worked when she called. (كنت في نص الشغل)', 'I was working when she called.', 'الحدث الطويل مستمر.']],
    en: ['Form: was or were plus verb-ing.', 'Use it for an action in progress at a past moment.', 'Use the past simple for the short action that interrupts it.'],
  },
  cond1: {
    rules: ['الشرط ده لحاجة ممكن تحصل فعلًا في المستقبل.', 'جزء if ييجي مضارع بسيط، حتى لو المعنى مستقبل. والجزء التاني بـ will.', 'ممكن نبدل الجزئين. لو if في الأول نحط فاصلة: If it rains, I will stay. لو في النص مفيش فاصلة: I will stay if it rains.'],
    table: [['جزء if', 'الجزء التاني'], ['If I finish,', 'I will call you.'], ['If it rains,', 'we will stay home.'], ['If she studies,', 'she will pass.']],
    mistakes: [['If it will rain, I will stay.', 'If it rains, I will stay.', 'مفيش will بعد if.'], ['If I finish, I call you later.', 'If I finish, I will call you later.', 'النتيجة بـ will.']],
    en: ['Use the first conditional for a real future possibility.', 'Form: if plus present simple, then will plus base verb.'],
  },
  cond2: {
    rules: ['الشرط ده لحاجة خيالية أو بعيدة عن الواقع دلوقتي.', 'جزء if ييجي ماضي بسيط، لكن المعنى عن الحاضر. والجزء التاني would + الفعل في أصله.', 'مع be بنفضل نقول were مع كل الضماير: If I were you.', 'مقارنة: If I have time (ممكن فعلًا) و If I had time (بس معنديش).'],
    table: [['جزء if', 'الجزء التاني'], ['If I had money,', 'I would travel.'], ['If I were you,', 'I would go.'], ['If she lived here,', 'she would visit us.']],
    mistakes: [['If I would have money', 'If I had money', 'مفيش would بعد if.'], ['I would went.', 'I would go.', 'بعد would الفعل في أصله.']],
    en: ['Use the second conditional for unreal situations now.', 'Form: if plus past simple, then would plus base verb.'],
  },
  gerund: {
    rules: ['لما فعلين ييجوا ورا بعض، الفعل الأول هو اللي بيحدد شكل التاني.', 'أفعال بعدها ing، زي enjoy و finish و avoid و keep و mind.', 'أفعال بعدها to، زي want و need و decide و hope و plan و learn.', 'like و love و start تنفع مع الاتنين.', 'بعد حرف الجر زي at و in و about دايمًا ing: good at coding.', 'لما الفعل يبدأ الجملة كفاعل نستخدم ing: Learning English is fun.'],
    table: [['ing بعد', 'to بعد'], ['enjoy reading', 'want to read'], ['finish working', 'need to work'], ['avoid eating', 'decide to eat'], ['keep trying', 'hope to try']],
    mistakes: [['I enjoy to read.', 'I enjoy reading.', 'enjoy بعدها ing.'], ['I want learning.', 'I want to learn.', 'want بعدها to.'], ['good at cook', 'good at cooking', 'بعد حرف الجر ing.']],
    en: ['Some verbs take verb-ing: enjoy, finish, avoid.', 'Some verbs take to plus a verb: want, need, decide.', 'Use verb-ing after prepositions.'],
  },
  passive: {
    rules: ['بنستخدمه لما المهم الحاجة اللي حصلت، مش مين عملها: The bug was fixed.', 'التركيب: be في الزمن المناسب + التصريف التالت.', 'المفعول في الجملة العادية بيبقى في الأول: Ali fixed the bug تبقى The bug was fixed.', 'لو عايزين نذكر الفاعل نستخدم by: The bug was fixed by Ali.'],
    table: [['الزمن', 'عادي', 'مبني للمجهول'], ['مضارع', 'They review the code.', 'The code is reviewed.'], ['ماضي', 'They fixed the bug.', 'The bug was fixed.'], ['مستقبل', 'They will deploy it.', 'It will be deployed.']],
    mistakes: [['The bug fixed.', 'The bug was fixed.', 'ناقص was.'], ['The app is use.', 'The app is used.', 'لازم التصريف التالت.'], ['It was made from Ali.', 'It was made by Ali.', 'الفاعل بـ by.']],
    en: ['Use the passive when the action matters more than the person doing it.', 'Form: be plus past participle. Add by to name the doer.'],
  },
  relative: {
    rules: ['دي طريقة نوصل بيها جملتين بكلمة "اللي" عشان نوضح نقصد مين.', 'who للناس، which للحاجات، where للأماكن، و that تنفع للناس والحاجات في الكلام العادي.', 'لو الكلمة دي بعدها فاعل تاني ممكن نشيلها: The book I bought.', 'مانكررش الضمير بعدها: The book that I bought، مش The book that I bought it.'],
    table: [['الكلمة', 'تستخدم لـ', 'مثال'], ['who', 'ناس', 'the man who called'], ['which', 'حاجات', 'the app which I built'], ['where', 'أماكن', 'the office where I work'], ['that', 'ناس أو حاجات', 'the car that I bought']],
    mistakes: [['the man which called', 'the man who called', 'الناس معاها who.'], ['the book that I bought it', 'the book that I bought', 'مش بنكرر it.'], ['the city who I live', 'the city where I live', 'الأماكن معاها where.']],
    en: ['Who is for people, which is for things, and where is for places.', 'That can replace who or which. Do not repeat the object after it.'],
  },
  reported: {
    rules: ['بنستخدمه لما ننقل كلام حد قاله قبل كده، من غير ما نقتبسه حرفيًا.', 'الفعل بيرجع خطوة للماضي، زي الجدول.', 'الضماير بتتغير حسب المعنى: "I am tired" تبقى She said she was tired.', 'said من غير شخص بعدها مباشرة: She said that. و told لازم بعدها شخص: She told me.', 'كلمة that بعد said و told اختيارية.'],
    table: [['الكلام الأصلي', 'بعد النقل'], ['am / is', 'was'], ['are', 'were'], ['work', 'worked'], ['will', 'would'], ['can', 'could'], ['worked / have worked', 'had worked']],
    mistakes: [['She said me she was busy.', 'She told me she was busy.', 'مع الشخص نستخدم told.'], ['He told he was late.', 'He said he was late.', 'told لازم بعدها شخص.'], ['He said he will come.', 'He said he would come.', 'will تبقى would.']],
    en: ['Reported speech tells what someone said. The verb usually moves one step back.', 'Say takes no person directly. Tell needs a person: She told me.'],
  },
  may: {
    rules: ['الأفعال دي بتوضح إحنا متأكدين قد إيه.', 'must be: تخمين متأكدين منه تقريبًا لأن عندنا دليل.', 'may be أو might be: احتمال، ممكن آه وممكن لأ.', 'can\'t be: متأكدين إنه مش ممكن.', 'بعدهم الفعل في أصله من غير to.'],
    table: [['التعبير', 'التأكد', 'مثال'], ['must be', '90%', 'She must be at work.'], ['may / might be', '50%', 'He might be late.'], ['can\'t be', '0%', 'That can\'t be true.']],
    mistakes: [['He might to come.', 'He might come.', 'مفيش to.'], ['She must to be home.', 'She must be home.', 'مفيش to.'], ['He mights come.', 'He might come.', 'مش بتاخد s.']],
    en: ['Must means you are almost sure. May and might mean it is possible.', 'Can\'t means you are sure it is not true.'],
  },
  used: {
    rules: ['used to + الفعل في أصله: عادة كانت موجودة في الماضي وبطلت.', 'شكلها واحد مع كل الضماير: I used to, she used to.', 'في النفي والسؤال تبقى use to من غير d: I didn\'t use to, Did you use to?', 'متخلطيش بينها وبين be used to + ing يعني متعودة دلوقتي: I am used to working late.'],
    table: [['التعبير', 'المعنى', 'مثال'], ['used to + فعل', 'كنت بعمل زمان', 'I used to smoke.'], ['didn\'t use to', 'ماكنتش بعمل زمان', 'I didn\'t use to drink coffee.'], ['be used to + ing', 'متعودة دلوقتي', 'I am used to waking up early.']],
    mistakes: [['I use to live there.', 'I used to live there.', 'في الإثبات used.'], ['Did you used to work?', 'Did you use to work?', 'بعد did من غير d.'], ['I used to living there.', 'I used to live there.', 'الفعل في أصله.']],
    en: ['Use used to plus a base verb for past habits that stopped.', 'After did or didn\'t, write use to without d.'],
  },
  pastperfect: {
    rules: ['التركيب: had + التصريف التالت، وشكله واحد مع كل الضماير.', 'بنستخدمه لما يبقى عندنا حدثين في الماضي ونوضح أنهي حصل الأول.', 'الأقدم بـ had، والأحدث ماضي بسيط: The train had left when I arrived.', 'كلمات بتيجي معاه: before, after, already, by the time.'],
    table: [['النوع', 'مثال'], ['إثبات', 'She had finished.'], ['نفي', 'She hadn\'t finished.'], ['سؤال', 'Had she finished?']],
    mistakes: [['I had went.', 'I had gone.', 'بعد had التصريف التالت.'], ['When I arrived, the train left. (كان مشي قبلها)', 'When I arrived, the train had left.', 'الحدث الأقدم بـ had.']],
    en: ['Form: had plus past participle.', 'Use it for the earlier of two past events.'],
  },
  cond3: {
    rules: ['الشرط ده عن حاجة في الماضي ما حصلتش، وبنتخيل نتيجتها لو كانت حصلت.', 'جزء if: had + التصريف التالت.', 'الجزء التاني: would have + التصريف التالت.', 'المعنى الحقيقي عكس الجملة: If I had studied يعني أنا ما ذاكرتش.'],
    table: [['جزء if', 'الجزء التاني'], ['If I had known,', 'I would have come.'], ['If she had called,', 'I would have helped.'], ['If we had tried,', 'we would have won.']],
    mistakes: [['If I would have known', 'If I had known', 'مفيش would بعد if.'], ['I would have went.', 'I would have gone.', 'لازم التصريف التالت.'], ['If I knew, I would have come. (عن الماضي)', 'If I had known, I would have come.', 'الماضي محتاج had.']],
    en: ['Use the third conditional for an imagined different past.', 'Form: if plus had plus participle, then would have plus participle.'],
  },
  wish: {
    rules: ['wish معناها "ياريت"، وبنستخدمها لحاجة مش زي ما عايزينها.', 'أمنية عن دلوقتي: wish + ماضي بسيط: I wish I had time يعني معنديش وقت.', 'أمنية عن الماضي: wish + had + التصريف التالت: I wish I had gone يعني ما رحتش.', 'مع be بنقول were: I wish I were taller.', 'لقدرة نفسنا فيها: I wish I could speak English.'],
    table: [['الزمن', 'التركيب', 'مثال'], ['دلوقتي', 'wish + ماضي', 'I wish I knew.'], ['قدرة', 'wish + could', 'I wish I could go.'], ['الماضي', 'wish + had + تصريف تالت', 'I wish I had studied.']],
    mistakes: [['I wish I have time.', 'I wish I had time.', 'بعد wish عن دلوقتي ماضي.'], ['I wish I went yesterday.', 'I wish I had gone yesterday.', 'عن الماضي had.'], ['I wish I can go.', 'I wish I could go.', 'can تبقى could.']],
    en: ['Use wish plus past simple for the present.', 'Use wish plus past perfect for the past.'],
  },
  linking: {
    rules: ['الكلمات دي بتربط الجمل القصيرة وتخلي كلامك طبيعي.', 'because بتجيب السبب: I stayed because I was sick.', 'so بتجيب النتيجة: I was sick, so I stayed.', 'because of بعدها اسم: because of the traffic.', 'although بتيجي مع جملة كاملة، ومانقولش معاها but في نفس الجملة.', 'however بداية جملة جديدة وبعدها فاصلة، وهي أنسب للكتابة الرسمية.'],
    table: [['الكلمة', 'المعنى', 'مثال'], ['and', 'و', 'I code and test.'], ['but', 'بس', 'It is hard but fun.'], ['because', 'عشان', 'I stayed because I was sick.'], ['so', 'فـ', 'I was tired, so I slept.'], ['although', 'مع إن', 'Although it is late, I will work.'], ['however', 'لكن', 'It is hard. However, I like it.'], ['then', 'بعدين', 'I ate, then I slept.']],
    mistakes: [['Although it is hard, but I like it.', 'Although it is hard, I like it.', 'مانجمعش although مع but.'], ['because the traffic', 'because of the traffic', 'قبل الاسم because of.'], ['Because I was tired, so I slept.', 'I was tired, so I slept.', 'نستخدم واحدة بس.']],
    en: ['Because gives a reason and so gives a result.', 'Although adds a contrast. Do not use but in the same sentence.', 'Use because of before a noun.'],
  },
};
