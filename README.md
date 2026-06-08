# Bebo Hosting

موقع استضافات ثابت تم إنشاؤه في هذا المستودع، جاهز للنشر على Vercel.

## مميزات الموقع
- اختيار خطط الاستضافة: Starter، Business، Ultimate
- تخصيص الموارد بنفسك: CPU، RAM، مساحة تخزين، نطاق ترددي
- اختيار اللغة أو التقنية: PHP، Node.js، Python، React، WordPress، Laravel
- إضافة اسم الدومين المفضل
- تصميم عربي حديث ومتجاوب

## تشغيل المشروع محلياً
1. افتح `index.html` في المتصفح.

## نشر على Vercel
1. سجل دخولك في Vercel عبر حسابك.
2. اربط المستودع `b3farhansaad/Bebo` أو قم برفع الملفات.
3. تأكد من وجود `index.html` و `styles.css` و `script.js` و `resources.json` و `vercel.json` في جذر المستودع.
4. نشر المشروع.

## نشر على GitHub Pages
1. من إعدادات المستودع على GitHub، انتقل إلى `Pages`.
2. اختر الفرع `main` والمجلد `/` (Root).
3. احفظ الإعدادات.
4. بعد دقائق قليلة، سيكون الموقع متاحًا عبر `https://b3farhansaad.github.io/Bebo/`.

## الربط مع jExactyl
- الملف `resources.json` يحتوي إعدادات `jexactyl.panelUrl` و `jexactyl.serverId`.
- عند استضافته على GitHub Pages، يتم تحميل الموارد من GitHub تلقائياً.
- إذا كنت تريد ربط الموقع فعليًا بلوحة jExactyl، فستحتاج إلى إضافة نقطة نهاية API (Backend) تحمي مفتاح API الخاص بك.
