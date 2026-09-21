# USER ACTION REQUIRED — موقع لغتي

كل ما في هذا الملف يحتاج **قرارًا أو معلومة منك**؛ لا شيء هنا يمكن للكود أن يقرّره. ما عدا ذلك، الموقع static وجاهز.

## 1. بيانات لا بدّ منها قبل نشر سياسة الخصوصية (Play Console يشترطها)

| # | المطلوب | أين يُدخل |
|---|---|---|
| 1 | **بريد التواصل العام** (نفس بريد Play Console) | `assets/js/site-config.js` → `contactEmail`. يظهر تلقائيًا في الخصوصية وحذف الحساب والتواصل. **وأيضًا** استبدل نص الـ placeholder `[بريد التواصل العام — يُضاف قبل النشر]` / `[public contact email — to be added before publication]` في الملفات الثلاثة حتى يظهر بلا JavaScript. |
| 2 | **اسم الجهة المسؤولة/المطوّر** كما سيظهر في Play | `privacy-policy.html` → القسم 1 (عربي + إنجليزي)، ابحث عن `[اسم الجهة المسؤولة` و`[responsible party` |
| 3 | **البلد / الولاية القضائية** | `privacy-policy.html` → القسم 1، `[البلد/الولاية القضائية]` و`[country / jurisdiction]` |
| 4 | **مدة الردّ على طلبات الحذف** (مثلًا: 30 يومًا) | `privacy-policy.html` القسم 12 + `delete-account.html`، `[مدة الرد]` و`[response time]` |
| 5 | **خادم التحقق من المشتريات**: من يشغّله؟ ومدة الاحتفاظ بالسجلات؟ (ملاحظة: `lughati.verification.endpoint` غير مضبوط الآن → لا يُمنح أي شراء في هذا البناء؛ يجب ضبطه قبل الإطلاق) | `privacy-policy.html` القسم 7: `[مشغّل خدمة التحقق]` و`[مدة الاحتفاظ]`، والصف الأخير من جدول القسم 16 |
| 6 | بعد استكمال 1–5: **أزل علامة «مسودّة قبل النشر»** من رأس الصفحة (عربي + إنجليزي) | `privacy-policy.html` → `doc-meta` |

كل placeholder داخل الصفحات موسوم بـ `class="todo"` (إطار برتقالي مقصود). للتأكد من عدم بقاء أي منها: `grep -n 'class="todo"' *.html`.

## 2. الروابط

| المطلوب | أين |
|---|---|
| **رابط Google Play** بعد نشر التطبيق | `assets/js/site-config.js` → `playUrl`. تتحوّل أزرار «قريبًا على Google Play» تلقائيًا إلى «حمّل من Google Play». |
| **عنوان الموقع النهائي** (GitHub Pages أو Domain) | `assets/js/site-config.js` → `siteUrl` (للـ canonical). و**استبدل** `content="assets/images/og-feature-1024x500.png"` في وسم `og:image` بكل صفحة بالرابط المطلق (`https://…/assets/images/og-feature-1024x500.png`) لأن منصات المشاركة لا تقرأ المسارات النسبية. |
| رابط سياسة الخصوصية في Play Console + `DATA_SAFETY_NOTES.md` | بعد النشر: `https://<siteUrl>/privacy-policy.html` |

## 3. حذف الحساب — قرار

المراجعة النهائية (2026-09-21، `store-assets/google-play/DATA_SAFETY_FINAL_REVIEW.md` §4): تسجيل الدخول بـ Google **يُعدّ إنشاء/ربط حساب** بمعايير Play (التطبيق يعرض «حساب Lughati»)، فمتطلّب حذف الحساب ينطبق. الصفحة `delete-account.html` صادقة مع الوضع الحالي ولا تدّعي حذفًا كاملًا داخل التطبيق.

- **BLOCKER** قبل اعتبار الحذف متوافقًا: (1) حذف ملف Drive من `appDataFolder` داخل التطبيق، (2) إلغاء إذن Google داخل التطبيق، (3) زر «حذف الحساب» واحد ينفّذهما مع الحذف المحلي. تغيير كود في `app/` يحتاج موافقتك ولم يُنفَّذ.
- بعد التنفيذ: حدّث الخطوتين 1 و3 في `delete-account.html` («داخل التطبيق» بدل «من إعدادات Drive/حساب Google»)، واحذف ملاحظة «عن هذا الإصدار»، وعدّل القسم 12 في `privacy-policy.html`.

## 4. النشر على GitHub Pages

المستودع: `https://github.com/lughati-web/lughati-website` (فرع `main`). المتبقي عندك: Settings → Pages → Source: `main` / `(root)`، ثم الرابط المتوقع `https://lughati-web.github.io/lughati-website/`. لا يلزم `.nojekyll` ولا build. تصحيحات الخصوصية الأخيرة (commit `cdf0797`) **مُلتزمة محليًا ولم تُدفع بعد** — `git push` عند رغبتك.

## 5. شروط الاستخدام

`terms.html` هيكل فقط + بند الأصوات المولّدة آليًا (المعتمد من `legal/`). النص الكامل يحتاج كتابتك/اعتمادك؛ لم يُخترع شيء.
