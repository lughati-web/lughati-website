# USER ACTION REQUIRED — موقع لغتي + Google Play

كل ما هنا يحتاج **قرارًا أو معلومة منك**؛ لا شيء فيه يمكن للكود أن يقرّره. (آخر تحديث 2026-09-21 بعد تنفيذ حذف الحساب داخل التطبيق وخيارات خصوصية الإعلانات.)

## 1. بيانات لا بدّ منها قبل نشر سياسة الخصوصية (Play Console يشترطها)

| # | المطلوب | أين يُدخل |
|---|---|---|
| 1 | **بريد التواصل العام** (نفس بريد Play Console) | `assets/js/site-config.js` → `contactEmail`. يظهر تلقائيًا في الخصوصية وحذف الحساب والتواصل. **وأيضًا** استبدل نص الـ placeholder `[بريد التواصل العام — يُضاف قبل النشر]` / `[public contact email — to be added before publication]` في الملفات الثلاثة حتى يظهر بلا JavaScript. |
| 2 | **اسم الجهة المسؤولة/المطوّر** كما سيظهر في Play | `privacy-policy.html` → القسم 1 (عربي + إنجليزي)، ابحث عن `[اسم الجهة المسؤولة` و`[responsible party` |
| 3 | **مدة الردّ على طلبات الحذف بالبريد** (مثلًا: 30 يومًا) | `privacy-policy.html` القسم 12 + `delete-account.html`، `[مدة الرد]` و`[response time]` |
| 4 | بعد استكمال 1–3: **أزل علامة «مسودّة قبل النشر»** من رأس الصفحة (عربي + إنجليزي) | `privacy-policy.html` → `doc-meta` |

لم يعد هناك placeholder لخادم التحقق: السياسة تقول الآن إن التحقق **غير مضبوط في هذا الإصدار**. عند ضبطه لاحقًا (عمل منفصل) حدّث القسم 7 باسم المشغّل ومدة الاحتفاظ.
للتأكد من عدم بقاء أي placeholder: `grep -n 'class="todo"' *.html`.

## 2. الروابط

| المطلوب | أين |
|---|---|
| **رابط Google Play** بعد نشر التطبيق | `assets/js/site-config.js` → `playUrl` |
| **عنوان الموقع النهائي** | `assets/js/site-config.js` → `siteUrl`؛ واستبدل `og:image` في كل صفحة بمسار مطلق |
| رابط الخصوصية + رابط حذف الحساب في Play Console | `https://<siteUrl>/privacy-policy.html` و`https://<siteUrl>/delete-account.html` |

## 3. Play Console — قرارات يدوية

1. **Target audience (الفئة العمرية).** الوثائق تقول 13+، وأنت قلت «للبالغين والأطفال». إن أدرجت أي فئة **دون 13**: تنطبق سياسة Families ويلزم عمل إضافي **غير منفَّذ** (شاشة عمر محايدة، إخفاء تسجيل الدخول بـ Google عن الأطفال، مراجعة المحتوى والإعلانات). إن أبقيت 13+: السلوك الحالي كافٍ (وسم الطفل عند إدخال عمر < 13).
2. **Data safety:** الإجابات في `store-assets/google-play/DATA_SAFETY_FINAL_REVIEW.md` (Account creation = Yes عبر Google؛ رابط الحذف = صفحة الموقع).
3. **AdMob → Privacy & messaging:** أنشئ رسائل GDPR / الولايات الأمريكية، وإلا لن يعرض UMP نموذجًا ولن يظهر بند «خيارات خصوصيّة الإعلانات».
4. **معرّفات AdMob للإنتاج** (`lughati.admob.appId` / `rewardedUnit` / `bannerUnit`) — النسخة الحالية تستخدم معرّفات Google التجريبية.
5. **Google Auth Platform → Branding:** روابط الخصوصية والشروط بعد النشر (تنبيه Google ظهر أثناء الاختبار).

## 4. حذف الحساب — الحالة

**منفَّذ داخل التطبيق** (`AccountDeletionCoordinator`): يحذف ملف Drive بالإذن الحالي `drive.appdata`، يلغي الإذن عبر `oauth2.googleapis.com/revoke`، ثم يمسح الجهاز بعد أن يقرأ المستخدم النتيجة. عند فشل حذف Drive لا يُمسح شيء وتظهر رسالة السبب. الصفحة `delete-account.html` تصف الطريقة داخل التطبيق ثم اليدوية ثم البريد. لا يبقى BLOCKER سوى بريد التواصل (البند 1).

## 5. النشر على GitHub Pages

المستودع: `https://github.com/lughati-web/lughati-website` (فرع `main`). المتبقي عندك: Settings → Pages → Source: `main` / `(root)`، ثم الرابط المتوقع `https://lughati-web.github.io/lughati-website/`. تغييرات الخصوصية وحذف الحساب الأخيرة **مُلتزمة محليًا ولم تُدفع بعد** — `git push` عند رغبتك.

## 6. شروط الاستخدام

`terms.html` هيكل فقط + بند الأصوات المولّدة آليًا (المعتمد من `legal/`). النص الكامل يحتاج كتابتك/اعتمادك؛ لم يُخترع شيء.
