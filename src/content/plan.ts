export type PlanDay = { day: number; goal: string; lessons: string[]; speak: string };

/** 14 days, about 45 minutes a day: every day feeds the self-introduction. */
export const plan: PlanDay[] = [
  { day: 1, goal: 'اسمك ووظيفتك', lessons: ['be'], speak: 'قولي بصوت عالي 10 مرات: My name is ... I am a software developer.' },
  { day: 2, goal: 'الملكية والعيلة', lessons: ['pronouns'], speak: 'اتكلمي عن اسمك وشغلك وعيلتك في 3 جمل.' },
  { day: 3, goal: 'a / an والوظايف', lessons: ['articles', 'plurals'], speak: 'وصفي شغلك: I work in a company. I am part of a team.' },
  { day: 4, goal: 'ساكنة فين وبتعملي إيه', lessons: ['simple'], speak: 'I live in ... I work at ... سجلي نفسك واسمعي.' },
  { day: 5, goal: 'النفي والأسئلة', lessons: ['do', 'wh'], speak: 'جاوبي بصوت عالي: What do you do? Where do you live?' },
  { day: 6, goal: 'عندك إيه', lessons: ['have', 'thereis'], speak: 'I have ... years of experience. I have one sister.' },
  { day: 7, goal: 'مراجعة وامتحان 1', lessons: [], speak: 'اعملي امتحان عشوائي، وقولي التعريف الأول كله من غير ما تبصي.' },
  { day: 8, goal: 'بتحبي تعملي إيه', lessons: ['can', 'gerund'], speak: 'I can ... I enjoy ... I want to ...' },
  { day: 9, goal: 'بتشتغلي على إيه دلوقتي', lessons: ['continuous'], speak: 'I am working on ... I am learning English.' },
  { day: 10, goal: 'خبرتك في الماضي', lessons: ['pastbe', 'past'], speak: 'I studied ... I graduated in ... I started my career in ...' },
  { day: 11, goal: 'خبرتك لحد دلوقتي', lessons: ['perfect'], speak: 'I have worked as a developer for ... years.' },
  { day: 12, goal: 'أهدافك', lessons: ['will', 'going'], speak: 'I am going to improve my English. I will ...' },
  { day: 13, goal: 'ربط الجمل', lessons: ['linking'], speak: 'اربطي التعريف بـ and / because / but وسجلي دقيقة كاملة.' },
  { day: 14, goal: 'يوم التعريف!', lessons: [], speak: 'قولي التعريف كله 3 مرات: بالكتابة، بالقراءة، ومن الذاكرة. جربيه مع حد حقيقي أو في مكالمة.' },
];
