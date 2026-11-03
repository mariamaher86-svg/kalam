export type Word = { id: string; en: string; ar: string };

const raw = `hello|أهلًا
name|اسم
work|شغل
job|وظيفة
company|شركة
team|فريق
live|يسكن
city|مدينة
from|من
year|سنة
old|عجوز / قديم
new|جديد
like|يحب
love|يعشق
want|يريد
need|يحتاج
speak|يتكلم
learn|يتعلم
understand|يفهم
know|يعرف
think|يفكر
say|يقول
tell|يحكي / يقول لحد
ask|يسأل
answer|يجاوب
help|يساعد
start|يبدأ
finish|يخلص
try|يحاول
make|يعمل / يصنع
use|يستخدم
give|يدي
take|ياخد
get|يجيب / يحصل على
go|يروح
come|ييجي
see|يشوف
look|يبص
hear|يسمع
read|يقرأ
write|يكتب
eat|ياكل
drink|يشرب
sleep|ينام
wake up|يصحى
buy|يشتري
pay|يدفع
open|يفتح
close|يقفل
wait|يستنى
meet|يقابل
call|يكلم / يتصل
send|يبعت
today|النهارده
tomorrow|بكره
yesterday|امبارح
now|دلوقتي
later|بعدين
always|دايمًا
never|عمره ما
sometimes|أحيانًا
early|بدري
late|متأخر
morning|الصبح
night|بالليل
week|أسبوع
month|شهر
family|عيلة
mother|أم
father|أب
sister|أخت
brother|أخ
husband|زوج
wife|زوجة
friend|صديق
children|أطفال
home|البيت
money|فلوس
time|وقت
food|أكل
water|مية
good|كويس
bad|وحش
easy|سهل
hard|صعب
big|كبير
small|صغير
fast|سريع
slow|بطيء
happy|مبسوط
tired|تعبان
busy|مشغول
ready|جاهز
sure|متأكد
important|مهم
different|مختلف
because|عشان
but|بس / لكن
maybe|يمكن
really|فعلًا
hobby|هواية
experience|خبرة
goal|هدف
skill|مهارة
improve|يحسّن
practice|يتمرن
fix|يصلّح
build|يبني
develop|يطور
test|يختبر
deploy|ينشر (التطبيق)
release|إصدار
feature|ميزة
bug|غلطة في الكود
issue|مشكلة
requirement|متطلب
deadline|ميعاد التسليم
meeting|اجتماع
manager|مدير
client|عميل
user|مستخدم
database|قاعدة بيانات
server|سيرفر
request|طلب
response|رد
review|مراجعة
update|تحديث
solve|يحل
explain|يشرح
estimate|يقدّر الوقت
progress|تقدم
blocked|واقف على حاجة
agree|يوافق
suggest|يقترح
decide|يقرر`;

export const words: Word[] = raw.split('\n').map((l) => {
  const [en, ar] = l.split('|');
  return { id: `w:${en}`, en, ar };
});
