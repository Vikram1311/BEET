"use client";

import { useEffect, useState } from "react";

type Format = "poster" | "photo" | "post" | "video";
type SavedPost = { id: string; format: Format; title: string; text: string; business: string; category: string; city: string; createdAt: string };

const labels = {
  en: { create: "Create", saved: "My drafts", jobs: "Jobs & services", language: "Language", tagline: "Your work deserves to be seen.", headline: "Create something great for your business.", intro: "Write what you do. BEET helps shape it into a ready-to-share post or poster.", start: "Start creating", creator: "Create from your words", creatorHint: "Tell BEET what you offer. Choose a format and make your first draft.", business: "Business or service name", businessPlaceholder: "e.g. Sharma Laptop Repair", category: "Choose a category", matter: "What do you want to tell people?", matterHint: "e.g. I repair laptops in Jaipur. Same-day service and free diagnosis. Call 98765 43210.", city: "City or service area", cityPlaceholder: "e.g. Jaipur", poster: "Poster", photo: "Photo design", post: "Social post", video: "Video idea", generate: "Create my draft", preview: "Your preview", previewHint: "Your content will appear here", change: "Edit your words anytime", save: "Save draft", share: "Share", download: "Download poster", upload: "Add your own photo", uploadHint: "Optional · JPG or PNG", savedTitle: "Your saved drafts", empty: "Your saved drafts will appear here.", jobsTitle: "Jobs and service opportunities", search: "Search by job, skill, or city", noJobs: "No sample opportunities match your search.", demo: "BEET can prepare copy and poster designs here. AI photo/video generation and social publishing need connected services and are not enabled in this preview.", generated: "Draft created! Review it, make changes, then save or share.", savedToast: "Draft saved on this device", shareToast: "Sharing is not supported on this browser", footer: "BEET · Create, share and grow", sample: "Community sample", work: "Explore opportunities", all: "All opportunities", posterNote: "Poster download creates a simple SVG design from your text.", videoNote: "Video idea only · AI video generation will be connected later.", media: "Add a photo", mediaHint: "Use your own real photo; BEET does not create an AI image yet.", delete: "Delete", allIndia: "India-wide", },
  hi: { create: "बनाएँ", saved: "मेरे ड्राफ्ट", jobs: "नौकरी और सेवाएँ", language: "भाषा", tagline: "आपके काम को पहचान मिलनी चाहिए।", headline: "अपने कारोबार के लिए कुछ शानदार बनाएँ।", intro: "आप क्या करते हैं, लिखें। BEET उसे शेयर करने लायक पोस्ट या पोस्टर बनाने में मदद करेगा।", start: "बनाना शुरू करें", creator: "अपने लिखे से बनाएँ", creatorHint: "BEET को बताएँ कि आप क्या सेवा देते हैं। फॉर्मेट चुनें और पहला ड्राफ्ट बनाएँ।", business: "कारोबार या सेवा का नाम", businessPlaceholder: "जैसे शर्मा लैपटॉप रिपेयर", category: "कैटेगरी चुनें", matter: "लोगों को क्या बताना चाहते हैं?", matterHint: "जैसे मैं जयपुर में लैपटॉप रिपेयर करता हूँ। उसी दिन सेवा और फ्री जाँच। कॉल करें 98765 43210।", city: "शहर या सेवा क्षेत्र", cityPlaceholder: "जैसे जयपुर", poster: "पोस्टर", photo: "फोटो डिज़ाइन", post: "सोशल पोस्ट", video: "वीडियो आइडिया", generate: "मेरा ड्राफ्ट बनाएँ", preview: "आपका प्रीव्यू", previewHint: "आपका कंटेंट यहाँ दिखेगा", change: "अपना टेक्स्ट कभी भी बदलें", save: "ड्राफ्ट सेव करें", share: "शेयर करें", download: "पोस्टर डाउनलोड करें", upload: "अपनी फोटो जोड़ें", uploadHint: "वैकल्पिक · JPG या PNG", savedTitle: "आपके सेव किए ड्राफ्ट", empty: "आपके सेव किए ड्राफ्ट यहाँ दिखेंगे।", jobsTitle: "नौकरी और सेवा के अवसर", search: "काम, कौशल या शहर से खोजें", noJobs: "इस खोज से कोई नमूना अवसर नहीं मिला।", demo: "BEET यहाँ पोस्ट का टेक्स्ट और पोस्टर डिज़ाइन तैयार कर सकता है। AI फोटो/वीडियो जनरेशन और सोशल पोस्टिंग के लिए जुड़े सर्विस चाहिए; इस प्रीव्यू में उपलब्ध नहीं हैं।", generated: "ड्राफ्ट बन गया! देखकर बदलें, फिर सेव या शेयर करें।", savedToast: "ड्राफ्ट इस डिवाइस पर सेव हुआ", shareToast: "इस ब्राउज़र में शेयर उपलब्ध नहीं है", footer: "BEET · बनाएँ, शेयर करें और आगे बढ़ें", sample: "कम्युनिटी नमूना", work: "अवसर देखें", all: "सभी अवसर", posterNote: "डाउनलोड में आपके टेक्स्ट से बना साधारण SVG पोस्टर मिलेगा।", videoNote: "अभी वीडियो आइडिया · AI वीडियो जनरेशन बाद में जोड़ा जाएगा।", media: "अपनी फोटो जोड़ें", mediaHint: "अपनी असली फोटो इस्तेमाल करें; BEET अभी AI फोटो नहीं बनाता।", delete: "हटाएँ", allIndia: "पूरे भारत में", },
};

const categoryOptions = ["Auto & Transport", "Taxi & Cab", "Petrol Pump", "Mechanic", "Dent & Paint", "Tyre Service", "Truck Driver", "Bus Service", "Electrician", "Plumber", "Carpenter", "Tile Worker", "Painter", "Furniture", "Laptop Repair", "Mobile Repair", "TV Repair", "Fridge & AC Repair", "Washing Machine Repair", "Locksmith", "Welder", "Vegetable Seller", "Milk Supplier", "Grocery Supplier", "Meat & Fish", "Water Supplier", "Restaurant", "Tiffin Service", "Bakery", "Fruit Seller", "Grain Seller", "Hospital", "Doctor", "Chemist & Pharmacy", "Ayurveda", "Gym & Fitness", "Tailor", "Laundry & Ironing", "Electronics Sales", "Shoes & Clothing", "Utensils", "Grocery Store", "Property", "Construction Labour", "Labour", "Engineer", "Home Builder", "Cement & Sand", "Plot for Sale", "Teacher & Coaching", "Computer Course", "CSC Services", "Printing", "Accountant", "Lawyer", "Salon & Barber", "Beauty Parlour", "House Help", "Driver", "Security Guard", "Event & DJ", "Farmer", "Seeds & Fertilizer", "Tractor Service", "Animal & Dairy", "Other"];
const sampleJobs = [
  { title: "Delivery Driver", city: "Delhi", category: "Auto & Transport" },
  { title: "AC Technician", city: "Jaipur", category: "Repairs & Electronics" },
  { title: "Home Tutor — Maths", city: "Lucknow", category: "Education" },
  { title: "Electrician", city: "Pune", category: "Home Services" },
];

export default function Home() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [tab, setTab] = useState<"create" | "saved" | "jobs">("create");
  const [format, setFormat] = useState<Format>("poster");
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("Laptop Repair");
  const [matter, setMatter] = useState("");
  const [city, setCity] = useState("");
  const [output, setOutput] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoName, setPhotoName] = useState("");
  const [drafts, setDrafts] = useState<SavedPost[]>([]);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const t = labels[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("beet-language");
    if (savedLanguage === "en" || savedLanguage === "hi") setLanguage(savedLanguage);
    try { setDrafts(JSON.parse(localStorage.getItem("beet-drafts-v2") || "[]")); } catch { setDrafts([]); }
  }, []);

  function notify(message: string) { setToast(message); window.setTimeout(() => setToast(""), 2400); }
  function updateLanguage(value: string) { const next = value as "en" | "hi"; setLanguage(next); localStorage.setItem("beet-language", next); }
  function createDraft() {
    if (!matter.trim()) { document.getElementById("matter")?.focus(); return; }
    const name = business.trim() || (language === "hi" ? "आपका कारोबार" : "Your business");
    const location = city.trim() ? ` · ${city.trim()}` : "";
    const made = language === "hi"
      ? `${name}${location}\n${matter.trim()}\nआज ही संपर्क करें!`
      : `${name}${location}\n${matter.trim()}\nContact us today!`;
    setOutput(made);
    document.getElementById("preview")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function saveDraft() {
    const text = output || matter.trim();
    if (!text) { createDraft(); return; }
    const item: SavedPost = { id: crypto.randomUUID(), format, title: matter.trim().slice(0, 55) || t.poster, text, business, category, city, createdAt: new Date().toLocaleDateString() };
    const next = [item, ...drafts]; setDrafts(next); localStorage.setItem("beet-drafts-v2", JSON.stringify(next)); notify(t.savedToast);
  }
  async function share() {
    const text = output || matter;
    try { if (navigator.share) await navigator.share({ title: business || "BEET", text }); else { await navigator.clipboard.writeText(text); notify(t.share); } } catch { /* sharing cancelled */ }
  }
  function downloadPoster() {
    const text = (output || matter || "BEET").split("\n");
    const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&apos;" }[c] || c));
    const lines = text.slice(0, 5).map((line, i) => `<text x="64" y="${250 + i * 66}" fill="white" font-family="Arial,sans-serif" font-size="${i === 0 ? 26 : 34}" font-weight="${i === 0 ? 700 : 800}">${esc(line)}</text>`).join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350"><defs><linearGradient id="g" x2="1" y2="1"><stop stop-color="#ff8a4c"/><stop offset=".52" stop-color="#7347e8"/><stop offset="1" stop-color="#221344"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><circle cx="930" cy="200" r="210" fill="#d8ff45" opacity=".8"/><circle cx="70" cy="1250" r="280" fill="#fa5fa1" opacity=".55"/><text x="64" y="130" fill="white" font-family="Arial" font-size="42" font-weight="900">BEET</text>${lines}<text x="64" y="1230" fill="white" font-family="Arial" font-size="24">Create · Share · Grow</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const link = document.createElement("a"); link.href = url; link.download = "beet-poster.svg"; link.click(); URL.revokeObjectURL(url);
  }
  function removeDraft(id: string) { const next = drafts.filter((d) => d.id !== id); setDrafts(next); localStorage.setItem("beet-drafts-v2", JSON.stringify(next)); }
  function uploadPhoto(file?: File) { if (!file) return; setPhoto(URL.createObjectURL(file)); setPhotoName(file.name); }

  return <main className="beet-app" lang={language}>
    <header className="site-header"><a className="logo" href="#home"><span>BE</span>ET<span className="logo-dot">.</span></a><span className="header-tag">{t.tagline}</span><nav className="top-nav"><button className={tab === "create" ? "nav-active" : ""} onClick={() => setTab("create")}>{t.create}</button><button className={tab === "saved" ? "nav-active" : ""} onClick={() => setTab("saved")}>{t.saved}</button><button className={tab === "jobs" ? "nav-active" : ""} onClick={() => setTab("jobs")}>{t.jobs}</button></nav><label className="language-select"><span>🌐</span><select aria-label={t.language} value={language} onChange={(e) => updateLanguage(e.target.value)}><option value="en">EN</option><option value="hi">हिंदी</option></select></label></header>
    {tab === "create" && <>
      <section id="home" className="color-hero"><div className="hero-copy"><span className="hero-pill">✦ BEET CREATOR STUDIO</span><h1>{t.headline}</h1><p>{t.intro}</p><button className="hero-cta" onClick={() => document.getElementById("creator")?.scrollIntoView({ behavior: "smooth" })}>{t.start} <span>↓</span></button><div className="hero-proof"><span>✦</span> {language === "hi" ? "पोस्टर · फोटो · पोस्ट · वीडियो आइडिया" : "Poster · Photo · Post · Video idea"}</div></div><div className="hero-art" aria-label="Colorful BEET poster examples"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="mini-poster poster-orange"><small>BEET · LOCAL BUSINESS</small><strong>Good work.<br/>Great service.</strong><span>Made for your community ✦</span></div><div className="mini-poster poster-purple"><small>YOUR NEXT BIG THING</small><strong>Make it<br/>happen.</strong><span>CREATE · SHARE · GROW</span></div><div className="hero-sticker">✦<small>MADE<br/>WITH BEET</small></div></div></section>
      <section className="creator-wrap" id="creator"><div className="section-heading"><div><span className="section-kicker">01 · CREATE</span><h2>{t.creator}</h2><p>{t.creatorHint}</p></div><span className="step-badge">BEET AI · PREVIEW</span></div>
        <div className="creator-layout"><section className="creator-card"><label className="form-label">{t.business}<input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder={t.businessPlaceholder}/></label><div className="form-pair"><label className="form-label">{t.category}<select value={category} onChange={(e) => setCategory(e.target.value)}>{categoryOptions.map((item) => <option key={item}>{item}</option>)}</select></label><label className="form-label">{t.city}<input value={city} onChange={(e) => setCity(e.target.value)} placeholder={t.cityPlaceholder}/></label></div><div className="form-label format-label">{t.format ?? (language === "hi" ? "क्या बनाना है?" : "Choose a format")}</div><div className="format-choices">{([["poster", "▧", t.poster], ["photo", "▣", t.photo], ["post", "✎", t.post], ["video", "▶", t.video]] as [Format, string, string][]).map(([id, icon, label]) => <button key={id} className={`format-choice ${format === id ? "format-selected" : ""}`} onClick={() => setFormat(id)}><span className="format-icon">{icon}</span><strong>{label}</strong><small>{id === "video" ? "Idea" : id === "post" ? "Text" : "Design"}</small></button>)}</div><label className="form-label matter-label" htmlFor="matter">{t.matter}<textarea id="matter" value={matter} onChange={(e) => setMatter(e.target.value)} placeholder={t.matterHint} rows={5}/></label>{(format === "photo" || format === "poster") && <label className="photo-upload"><span className="upload-symbol">＋</span><span><strong>{t.upload}</strong><small>{photoName || t.mediaHint}</small></span><input type="file" accept="image/*" onChange={(e) => uploadPhoto(e.target.files?.[0])}/></label>}<button className="create-button" onClick={createDraft}><span>✦</span>{t.generate}<b>→</b></button><p className="fine-print">{t.demo}</p></section>
          <section className="preview-card" id="preview"><div className="preview-heading"><div><span className="section-kicker">02 · PREVIEW</span><h3>{t.preview}</h3></div><span className="live-dot"><i/> LIVE PREVIEW</span></div><div className={`poster-preview preview-${format}`}>
            {photo && (format === "photo" || format === "poster") && <img className="uploaded-photo" src={photo} alt="Your uploaded business photo"/>}
            {format === "video" && <span className="play-badge">▶</span>}
            <div className="preview-content"><span className="preview-brand">{business || "YOUR BUSINESS"} · {category.toUpperCase()}</span><strong>{(output || matter || t.previewHint).split("\n").slice(0, 3).map((line, i) => <span key={i}>{line}</span>)}</strong><small>{city || (language === "hi" ? "आपके शहर में उपलब्ध" : "Available in your area")}</small><b className="preview-beet">BEET ✦</b></div></div><p className="preview-note">{format === "video" ? t.videoNote : t.posterNote}</p><div className="preview-buttons"><button className="save-button" onClick={saveDraft}>{t.save}</button>{format === "poster" && <button className="download-button" onClick={downloadPoster}>↓ {t.download}</button>}<button className="share-button" onClick={share}>{t.share} ↗</button></div></section></div></section>
      <section className="saved-strip"><div><span className="section-kicker">03 · YOUR WORK</span><h2>{t.savedTitle}</h2></div><button className="text-link" onClick={() => setTab("saved")}>{t.saved} ({drafts.length}) →</button></section>
    </>}
    {tab === "saved" && <section className="content-page"><span className="section-kicker">BEET STUDIO</span><h1>{t.savedTitle}</h1><p className="page-subtitle">{drafts.length ? `${drafts.length} ${language === "hi" ? "ड्राफ्ट" : "drafts"}` : t.empty}</p>{drafts.length > 0 && <div className="saved-grid">{drafts.map((d) => <article className="saved-card" key={d.id}><span className="format-chip">{d.format}</span><small>{d.category} · {d.createdAt}</small><h3>{d.title}</h3><p>{d.text}</p><div><button onClick={() => { setOutput(d.text); setMatter(d.text); setFormat(d.format); setTab("create"); }}>Edit / open</button><button onClick={() => removeDraft(d.id)}>{t.delete}</button></div></article>)}</div>}</section>}
    {tab === "jobs" && <JobsPage language={language} query={query} setQuery={setQuery}/>}
    <footer className="site-footer"><span className="logo"><span>BE</span>ET<span className="logo-dot">.</span></span><span>{t.footer}</span></footer>{toast && <div className="toast-message" role="status">✓ {toast}</div>}
  </main>;
}

function JobsPage({ language, query, setQuery }: { language: "en" | "hi"; query: string; setQuery: (s: string) => void }) {
  const t = labels[language];
  const matching = sampleJobs.filter((j) => `${j.title} ${j.city} ${j.category}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="content-page"><span className="section-kicker">BEET COMMUNITY</span><h1>{t.jobsTitle}</h1><p className="page-subtitle">{language === "hi" ? "अपने आस-पास के काम और अवसर खोजें।" : "Find work and opportunities in your community."}</p><div className="job-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.search}/></div><div className="opportunity-list">{matching.length ? matching.map((j) => <article key={j.title} className="opportunity-card"><span className="opportunity-icon">✦</span><div><h3>{j.title}</h3><p>{j.category} · {j.city} · {t.sample}</p></div><button className="text-link">{language === "hi" ? "देखें →" : "View →"}</button></article>) : <p>{t.noJobs}</p>}</div><p className="fine-print">Sample listings only · External social-media posts are not automatically copied.</p></section>;
}
