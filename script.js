/* ============================================================
   عدّل البيانات هنا فقط
   ============================================================ */
const profile = {
  name:  "Hadeer Zainhom",
  title: "Logistic Specialist",

  photo: "profile.png",     // صورتك الشخصية (بجانب الملفات)
  logo:  "logo.png",        // صورة اللوجو (بجانب الملفات)
  logoLink: "#",            // الرابط اللي يفتح لما تضغط على اللوجو (موقع الشركة مثلاً)

  /* ---- الاتصال: رقم واحد أو أكتر ---- */
  // لو فيه رقم واحد بس: الزرار بيتصل مباشرة.
  // لو فيه رقمين: الأرقام بتظهر تحت الزرار، وعند الضغط بتظهر قائمة يختار منها.
  callNumbers: ["01000885394", "01001686804"],   // ← غيّر الرقم التاني

  /* ---- واتساب: رقم واحد أو أكتر ---- */
  // اكتب الرقم عادي (01xxxxxxxxx) وهيتحول للصيغة الدولية (+20) أوتوماتيك
  whatsappNumbers: ["01000885394"], // ← غيّر الرقم التاني

  /* ---- لينكدإن ---- */
  linkedin:     "https://www.linkedin.com/in/hadeer-elaraby-771728232/?isSelfProfile=false",
  linkedinText: "Hadeer Zainhom",    // النص اللي يظهر تحت "Connect With Me"

  /* ---- الإيميل ---- */
  email:     "hadeer.zainhom@ alfagroup-egy.com",
  emailText: "hadeer.zainhom@ alfagroup-egy.com",  // النص اللي يظهر تحت "Email Me"

  /* ---- السوشيال ---- */
  facebook:  "https://www.facebook.com/TCL.Alfa/",
  instagram: "https://www.instagram.com/tcl.alfa",
  linkedintwo: "https://www.linkedin.com/company/tcl-alfa-alfa-group/",
  website: "https://alfagroup-egy.com/",   // رابط الموقع — عدّله لو مختلف

  /* ---- WeChat ---- */
  wechatId: "HADERELARBY",   // ← اكتب الـ ID هنا (سيبه فاضي "" لو عايز تخفي الأيقونة)
  wechatQr: "QR.JPEG"     // ← صورة QR (اختياري) — حطها بجانب الملفات، أو سيبها "" لو مش عايزها
};
/* ============================================================ */

const $ = (id) => document.getElementById(id);

// Content
$("name").textContent  = profile.name;
$("title").textContent = profile.title;
$("photo").src = profile.photo;
$("logo").src  = profile.logo;
$("brandLink").href = profile.logoLink;
document.title = `${profile.name} | Alfa`;

// ---- Call + WhatsApp (رقم واحد أو أكتر) ----
const toIntl = (n) => {                       // 010... → 2010...
  let d = String(n).replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0"))  d = "20" + d.slice(1);
  return d;
};
const telUrl  = (n) => `tel:${String(n).replace(/[^\d+]/g, "")}`;
const waUrlOf = (n) => `https://wa.me/${toIntl(n)}`;

const callList = profile.callNumbers;
const waList   = profile.whatsappNumbers;

function fillNumbers(el, list) {
  el.textContent = "";
  if (list.length > 1) el.classList.add("multi");
  list.forEach((n) => {
    const line = document.createElement("span");
    line.textContent = n;
    el.appendChild(line);
  });
}

// قائمة اختيار الرقم
const sheet = $("sheet");
function closeSheet() {
  sheet.classList.remove("open");
  sheet.setAttribute("aria-hidden", "true");
}
function openSheet(kind) {
  const isCall = kind === "call";
  const btn  = $(isCall ? "callBtn" : "waBtn");
  const list = isCall ? callList : waList;

  $("sheetTitle").textContent = btn.querySelector("strong").textContent;
  const box = $("sheetList");
  box.textContent = "";

  list.forEach((n) => {
    const a = document.createElement("a");
    a.className = "sheet__item";
    a.href = isCall ? telUrl(n) : waUrlOf(n);
    if (!isCall) { a.target = "_blank"; a.rel = "noopener"; }

    const ic = document.createElement("span");
    ic.className = "sheet__icon" + (isCall ? "" : " sheet__icon--wa");
    ic.appendChild(btn.querySelector(".btn__icon svg").cloneNode(true));

    const num = document.createElement("span");
    num.className = "sheet__num";
    num.textContent = n;

    const go = document.createElement("span");
    go.className = "sheet__go";

    a.append(ic, num, go);
    a.addEventListener("click", () => setTimeout(closeSheet, 150));
    box.appendChild(a);
  });

  sheet.classList.add("open");
  sheet.setAttribute("aria-hidden", "false");
}
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
$("sheetCancel").addEventListener("click", closeSheet);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSheet(); });

function bindAction(el, list, kind) {
  if (list.length > 1) {
    el.href = "#";
    el.removeAttribute("target");
    el.addEventListener("click", (e) => { e.preventDefault(); openSheet(kind); });
  } else {
    el.href = kind === "call" ? telUrl(list[0]) : waUrlOf(list[0]);
  }
}
fillNumbers($("callText"), callList);
fillNumbers($("waText"), waList);
bindAction($("callBtn"), callList, "call");
bindAction($("waBtn"),   waList,   "wa");
bindAction($("waLink"),  waList,   "wa");   // أيقونة الواتساب في السوشيال

// LinkedIn
$("liBtn").href  = profile.linkedin;
$("liLink").href = profile.linkedintwo;
$("liText").textContent = profile.linkedinText;

// Email
$("mailBtn").href = `mailto:${profile.email}`;
$("mailText").textContent = profile.emailText;

// Social
$("fbLink").href = profile.facebook;
$("igLink").href = profile.instagram;
$("webLink").href = profile.website;

// ---- WeChat ----
if (!profile.wechatId) {
  $("wechatBtn").remove();
} else {
  const wcSheet = $("wechatSheet");
  const wcCopy  = $("wechatCopy");
  let copyTimer;

  $("wechatId").textContent = profile.wechatId;
  $("wechatText").textContent = profile.wechatId;
  if (profile.wechatQr) {
    const qr = $("wechatQr");
    qr.onload = () => { qr.hidden = false; };   // تظهر بس لو الصورة موجودة
    qr.src = profile.wechatQr;
  }

  const closeWechat = () => {
    wcSheet.classList.remove("open");
    wcSheet.setAttribute("aria-hidden", "true");
  };
  $("wechatBtn").addEventListener("click", () => {
    wcCopy.textContent = "Copy ID";
    wcSheet.classList.add("open");
    wcSheet.setAttribute("aria-hidden", "false");
  });
  wcSheet.addEventListener("click", (e) => { if (e.target === wcSheet) closeWechat(); });
  $("wechatClose").addEventListener("click", closeWechat);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeWechat(); });

  wcCopy.addEventListener("click", async () => {
    const ok = await copyLink(profile.wechatId);   // نفس دالة النسخ بتاعة زرار الشير
    wcCopy.textContent = ok ? "Copied ✓" : "Copy failed";
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { wcCopy.textContent = "Copy ID"; }, 2000);
  });
}

// Toast
let toastTimer;
function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}

// Share
async function copyLink(url) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch (e) { /* نكمل للطريقة البديلة */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, url.length);
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

$("shareBtn").addEventListener("click", async () => {
  const url = location.href;
  const data = {
    title: `${profile.name} - Alfa`,
    text: `${profile.name} | ${profile.title}`,
    url
  };

  // 1) مشاركة النظام (موبايل / بعض المتصفحات)
  if (navigator.share) {
    try {
      await navigator.share(data);
      return;
    } catch (err) {
      if (err && err.name === "AbortError") return;   // المستخدم قفل نافذة المشاركة
      /* أي خطأ تاني → نكمل لنسخ الرابط */
    }
  }

  // 2) نسخ الرابط + رسالة تأكيد
  const ok = await copyLink(url);
  showToast(ok ? "Link copied" : url);
});

// Lightbox: فتح الصورة بالحجم الكبير
const lightbox = $("lightbox");
function openLightbox() {
  const photo = $("photo");
  $("lightboxImg").src = photo.currentSrc || photo.src;
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}
$("avatarBtn").addEventListener("click", openLightbox);
lightbox.addEventListener("click", closeLightbox);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
