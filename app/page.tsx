"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";

type Language = "en" | "hi";
type Section = "create" | "calendar" | "jobs" | "brand";
type Draft = { id: string; title: string; category: string; format: string; caption: string; status: string; date: string; mediaName?: string; };

const translations = {
  en: {
    subtitle: "Your business growth studio", create: "Create content", calendar: "Content calendar", jobs: "Jobs & services", brand: "My brand", welcome: "Good morning! What are we creating today?", welcomeText: "Make a polished post for your business, plan your content, and discover opportunities—all in one place.", newContent: "Create a post", business: "Business or service", businessPlaceholder: "e.g. Sharma Laptop Repair", category: "Category", format: "Content format", poster: "Poster / image", video: "Short video / reel", story: "Story", offer: "What should this promote?", offerPlaceholder: "e.g. Laptop repair, same-day service, call us today", location: "Location (optional)", locationPlaceholder: "City or service area", upload: "Add your own photo or video", generate: "Generate content idea", generated: "Your content draft", caption: "Caption", editCaption: "Edit caption before saving", save: "Save as draft", share: "Share", saved: "Saved drafts", calendarTitle: "Plan your week", calendarText: "Your scheduled and saved content will show up here.", findWork: "Find jobs and services", findText: "Explore opportunities shared on BEET. Search by role, skill, or city.", search: "Search jobs, skills, or city", all: "All opportunities", apply: "View opportunity", brandTitle: "Set up your brand", brandText: "Add a few details so BEET can help keep your content consistent.", brandName: "Business name", tone: "Brand voice", friendly: "Friendly", professional: "Professional", saveBrand: "Save brand profile", brandSaved: "Brand profile saved on this device", demo: "BEET Studio preview · AI generation, media creation, scheduling and social publishing need connected services and are not active in this demo.", noDrafts: "No drafts yet. Create your first post!", noJobs: "No matches. Try another search.", copied: "Caption copied!", schedule: "Scheduled", draft: "Draft", uploadHint: "Images/videos stay in this browser preview; nothing is uploaded to a server.", jobsCount: "sample opportunities", profile: "Profile", createLabel: "Create", language: "Language", locationLabel: "India-wide", overview: "Overview", allCategories: "All categories", createAnother: "Create another post", date: "Publish date", scheduleButton: "Save schedule", remove: "Delete", savedToast: "Your draft is saved on this device.", scheduleToast: "Schedule saved on this device.", source: "BEET community demo", powered: "A smarter way to create, promote and find work.",
  },
  hi: {
    subtitle: "आपके कारोबार का ग्रोथ स्टूडियो", create: "कंटेंट बनाएँ", calendar: "कंटेंट कैलेंडर", jobs: "नौकरी और सेवाएँ", brand: "मेरा ब्रांड", welcome: "नमस्ते! आज क्या बनाएँ?", welcomeText: "अपने कारोबार के लिए आकर्षक पोस्ट बनाएँ, कंटेंट की योजना बनाएँ और अवसर खोजें—एक ही जगह।", newContent: "पोस्ट बनाएँ", business: "कारोबार या सेवा", businessPlaceholder: "जैसे शर्मा लैपटॉप रिपेयर", category: "कैटेगरी", format: "कंटेंट का प्रकार", poster: "पोस्टर / तस्वीर", video: "शॉर्ट वीडियो / रील", story: "स्टोरी", offer: "आप किसका प्रचार करना चाहते हैं?", offerPlaceholder: "जैसे लैपटॉप रिपेयर, उसी दिन सेवा, आज कॉल करें", location: "जगह (वैकल्पिक)", locationPlaceholder: "शहर या सेवा क्षेत्र", upload: "अपनी तस्वीर या वीडियो जोड़ें", generate: "कंटेंट आइडिया बनाएँ", generated: "आपका कंटेंट ड्राफ्ट", caption: "कैप्शन", editCaption: "सेव करने से पहले कैप्शन बदलें", save: "ड्राफ्ट सेव करें", share: "शेयर करें", saved: "सेव किए ड्राफ्ट", calendarTitle: "इस हफ्ते की योजना", calendarText: "आपका शेड्यूल और सेव किया कंटेंट यहाँ दिखेगा।", findWork: "नौकरी और सेवाएँ खोजें", findText: "BEET पर साझा किए गए अवसर देखें। काम, कौशल या शहर से खोजें।", search: "नौकरी, कौशल या शहर खोजें", all: "सभी अवसर", apply: "अवसर देखें", brandTitle: "अपना ब्रांड सेट करें", brandText: "कुछ जानकारी जोड़ें ताकि BEET आपके कंटेंट को एक जैसा रखने में मदद करे।", brandName: "कारोबार का नाम", tone: "ब्रांड की भाषा", friendly: "दोस्ताना", professional: "पेशेवर", saveBrand: "ब्रांड प्रोफाइल सेव करें", brandSaved: "ब्रांड प्रोफाइल इस डिवा��स पर सेव है", demo: "BEET Studio प्रीव्यू · AI जनरेशन, मीडिया निर्माण, शेड्यूलिंग और सोशल पोस्टिंग के लिए जुड़े हुए सर्विस चाहिए; इस डेमो में ये सक्रिय नहीं हैं।", noDrafts: "अभी कोई ड्राफ्ट नहीं। अपनी पहली पोस्ट बनाएँ!", noJobs: "कोई मेल नहीं मिला। दूसरी खोज करें।", copied: "कैप्शन कॉपी हो गया!", schedule: "शेड्यूल", draft: "ड्राफ्ट", uploadHint: "तस्वीर/वीडियो सिर्फ इस ब्राउज़र प्रीव्यू में रहेगा; सर्वर पर अपलोड नहीं होगा।", jobsCount: "नमूना अवसर", profile: "प्रोफाइल", createLabel: "बनाएँ", language: "भाषा", locationLabel: "पूरे भारत में", overview: "ओवरव्यू", allCategories: "सभी कैटेगरी", createAnother: "एक और पोस्ट बनाएँ", date: "पोस्ट की तारीख", scheduleButton: "शेड्यूल सेव करें", remove: "हटाएँ", savedToast: "ड्राफ्ट इस डिवाइस पर सेव हुआ।", scheduleToast: "शेड्यूल इस डिवाइस पर सेव हुआ।", source: "BEET कम्युनिटी डेमो", powered: "बनाएँ, प्रचार करें और काम खोजें—स्मार्ट तरीके से।",
  },
} satisfies Record<Language, Record<string, string>>;

const categories = ["Auto & Transport", "Home Services", "Repairs & Electronics", "Food & Grocery", "Health & Wellness", "Retail & Shopping", "Property & Construction", "Education & Professional", "Personal & Events", "Agriculture", "Jobs", "Other"];
const opportunities = [
  { title: "Delivery Driver", company: "Local logistics partner", city: "Delhi", type: "Full time", category: "Auto & Transport" },
  { title: "AC Technician", company: "CoolCare Services", city: "Jaipur", type: "Contract", category: "Repairs & Electronics" },
  { title: "Home Tutor — Maths", company: "BrightPath Learning", city: "Lucknow", type: "Part time", category: "Education & Professional" },
  { title: "Electrician", company: "Verified service request", city: "Pune", type: "Service work", category: "Home Services" },
  { title: "Farm Equipment Operator", company: "Community listing", city: "Indore", type: "Seasonal", category: "Agriculture" },
];

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [section, setSection] = useState<Section>("create");
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [format, setFormat] = useState("poster");
  const [offer, setOffer] = useState("");
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [mediaName, setMediaName] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [brandName, setBrandName] = useState("");
  const [toast, setToast] = useState("");

  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("beet-language");
    if (savedLanguage === "en" || savedLanguage === "hi") setLanguage(savedLanguage);
    try {
      setDrafts(JSON.parse(localStorage.getItem("beet-drafts") || "[]"));
      setBrandName(localStorage.getItem("beet-brand") || "");
    } catch { setDrafts([]); }
  }, []);

  const filteredJobs = useMemo(() => opportunities.filter((job) => `${job.title} ${job.company} ${job.city} ${job.category}`.toLowerCase().includes(search.toLowerCase())), [search]);

  function notify(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function changeLanguage(value: string) {
    const next = value as Language;
    setLanguage(next);
    localStorage.setItem("beet-language", next);
  }

  function makeContent() {
    const name = business.trim() || (language === "hi" ? "आपका कारोबार" : "Your business");
    const service = offer.trim() || (language === "hi" ? "हमारी भरोसेमंद सेवा" : "our trusted service");
    const place = location.trim() ? ` ${language === "hi" ? "जगह:" : "Find us in"} ${location.trim()}.` : "";
    setCaption(language === "hi"
      ? `${name} पर ${service} उपलब्ध है। बेहतरीन सेवा और सही कीमत के लिए आज ही संपर्क करें!${place}\n\n#BEET #${category.replaceAll(" ", "")}`
      : `${name}: ${service}. Get friendly, reliable service at a great price—contact us today!${place}\n\n#BEET #${category.replaceAll(" ", "")}`);
  }

  function saveDraft(status = "Draft") {
    if (!caption.trim()) makeContent();
    const next: Draft = {
      id: crypto.randomUUID(), title: offer.trim() || (language === "hi" ? "नई पोस्ट" : "New post"), category,
      format: format === "video" ? t.video : format === "story" ? t.story : t.poster,
      caption: caption.trim() || (language === "hi" ? `${business || "आपका कारोबार"}: ${offer || "हमारी सेवा"}। आज संपर्क करें!` : `${business || "Your business"}: ${offer || "Our service"}. Contact us today!`),
      status, date: new Date().toISOString().slice(0, 10), mediaName: mediaName || undefined,
    };
    const updated = [next, ...drafts];
    setDrafts(updated);
    localStorage.setItem("beet-drafts", JSON.stringify(updated));
    notify(t.savedToast);
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setMediaName(file.name);
    setMediaUrl(URL.createObjectURL(file));
  }

  async function shareDraft(draft: Draft) {
    try {
      if (navigator.share) await navigator.share({ title: draft.title, text: draft.caption });
      else {
        await navigator.clipboard.writeText(draft.caption);
        notify(t.copied);
      }
    } catch { /* User cancelled the share sheet. */ }
  }

  function deleteDraft(id: string) {
    const updated = drafts.filter((draft) => draft.id !== id);
    setDrafts(updated);
    localStorage.setItem("beet-drafts", JSON.stringify(updated));
  }

  function saveBrand() {
    localStorage.setItem("beet-brand", brandName);
    notify(t.brandSaved);
  }

  return (
    <main className="studio-shell" lang={language}>
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="BEET home"><span>BE</span>ET</a>
        <p className="brand-subtitle">{t.subtitle}</p>
        <div className="side-menu" role="navigation" aria-label="Studio">
          {([["create", "✦", t.create], ["calendar", "▦", t.calendar], ["jobs", "⌕", t.jobs], ["brand", "◉", t.brand]] as [Section, string, string][]).map(([id, icon, label]) => (
            <button key={id} className={`side-link ${section === id ? "active" : ""}`} onClick={() => setSection(id)}><span>{icon}</span>{label}</button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <label className="language-control"><span>🌐 {t.language}</span><select value={language} onChange={(event) => changeLanguage(event.target.value)}><option value="en">English</option><option value="hi">हिन्दी</option></select></label>
          <div className="user-chip"><div className="avatar">B</div><div><strong>BEET</strong><small>{t.profile}</small></div></div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar"><div><span className="breadcrumb">BEET Studio</span><span className="beta-tag">BETA</span></div><button className="profile-button" onClick={() => setSection("brand")}>◉ <span>{brandName || t.profile}</span></button></header>
        <div className="page-content">
          {section === "create" && <>
            <div className="welcome-row"><div><p className="eyebrow">{t.createLabel} · BEET STUDIO</p><h1>{t.welcome}</h1><p className="muted">{t.welcomeText}</p></div><div className="welcome-sparkle">✦</div></div>
            <div className="studio-grid">
              <section className="panel editor-panel">
                <div className="panel-heading"><div className="heading-icon">✦</div><div><h2>{t.newContent}</h2><p>{t.demo}</p></div></div>
                <label className="field-label">{t.business}<input value={business} onChange={(e) => setBusiness(e.target.value)} placeholder={t.businessPlaceholder} /></label>
                <div className="field-row"><label className="field-label">{t.category}<select value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-label">{t.format}<select value={format} onChange={(e) => setFormat(e.target.value)}><option value="poster">{t.poster}</option><option value="video">{t.video}</option><option value="story">{t.story}</option></select></label></div>
                <label className="field-label">{t.offer}<textarea value={offer} onChange={(e) => setOffer(e.target.value)} placeholder={t.offerPlaceholder} rows={3} /></label>
                <label className="field-label">{t.location}<input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.locationPlaceholder} /></label>
                <label className="upload-box"><span className="upload-icon">＋</span><span><strong>{t.upload}</strong><small>{mediaName || t.uploadHint}</small></span><input type="file" accept="image/*,video/*" onChange={handleUpload} /></label>
                <button className="primary-button full-button" onClick={makeContent}>✦ {t.generate}</button>
              </section>

              <section className="panel preview-panel">
                <div className="preview-top"><div><h2>{t.generated}</h2><p>{format === "video" ? "▶" : "▧"} {format === "video" ? t.video : format === "story" ? t.story : t.poster}</p></div><span className="preview-dot">●</span></div>
                <div className={`creative-preview ${format}`}>
                  {mediaUrl && (mediaUrl.startsWith("blob:") && mediaName.match(/\.(mp4|webm|mov)$/i) ? <video src={mediaUrl} controls /> : <img src={mediaUrl} alt="Uploaded preview" />)}
                  <div className="creative-overlay"><span className="creative-kicker">{business || (language === "hi" ? "आपका कारोबार" : "YOUR BUSINESS")}</span><strong>{offer || (language === "hi" ? "अपनी सेवा यहाँ दिखाएँ" : "Showcase your service")}</strong><small>{location || (language === "hi" ? "आपके शहर में" : "Serving your area")}</small></div>
                </div>
                <label className="field-label caption-label">{t.caption}<textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={language === "hi" ? "पहले कंटेंट आइडिया बनाएँ…" : "Generate a content idea to start…"} rows={5} /></label>
                <div className="preview-actions"><button className="secondary-button" onClick={() => saveDraft("Draft")}>{t.save}</button><button className="primary-button" onClick={() => saveDraft("Ready to share")}>{t.share} ↗</button></div>
              </section>
            </div>
            <DraftList drafts={drafts} t={t} onShare={shareDraft} onDelete={deleteDraft} />
          </>}

          {section === "calendar" && <><div className="welcome-row"><div><p className="eyebrow">BEET STUDIO</p><h1>{t.calendarTitle}</h1><p className="muted">{t.calendarText}</p></div><div className="welcome-sparkle">▦</div></div><DraftList drafts={drafts} t={t} onShare={shareDraft} onDelete={deleteDraft} /></>}

          {section === "jobs" && <><div className="welcome-row"><div><p className="eyebrow">BEET COMMUNITY</p><h1>{t.findWork}</h1><p className="muted">{t.findText}</p></div><div className="welcome-sparkle">⌕</div></div><section className="panel jobs-panel"><div className="search-box"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t.search} /></div><div className="job-filters"><button className="filter-chip selected">{t.all}</button><span>{filteredJobs.length} {t.jobsCount}</span></div><div className="job-list">{filteredJobs.length ? filteredJobs.map((job) => <article className="job-card" key={job.title}><div className="job-icon">{job.title[0]}</div><div className="job-details"><h3>{job.title}</h3><p>{job.company} · {job.city}</p><div className="job-tags"><span>{job.type}</span><span>{job.category}</span></div></div><button className="secondary-button" onClick={() => notify(t.demo)}>{t.apply} →</button></article>) : <p className="empty-state">{t.noJobs}</p>}</div><p className="source-note">{t.source} · {t.locationLabel}</p></section></>}

          {section === "brand" && <><div className="welcome-row"><div><p className="eyebrow">BEET STUDIO</p><h1>{t.brandTitle}</h1><p className="muted">{t.brandText}</p></div><div className="welcome-sparkle">◉</div></div><section className="panel brand-panel"><div className="brand-profile-icon">{(brandName || "B")[0].toUpperCase()}</div><label className="field-label">{t.brandName}<input value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder={t.businessPlaceholder} /></label><label className="field-label">{t.category}<select>{categories.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-label">{t.tone}<select><option>{t.friendly}</option><option>{t.professional}</option></select></label><button className="primary-button" onClick={saveBrand}>{t.saveBrand}</button></section></>}
          <footer className="footer-note">{t.powered}</footer>
        </div>
      </section>
      {toast && <div className="toast" role="status">✓ {toast}</div>}
    </main>
  );
}

function DraftList({ drafts, t, onShare, onDelete }: { drafts: Draft[]; t: Record<string, string>; onShare: (draft: Draft) => void; onDelete: (id: string) => void }) {
  return <section className="draft-section"><div className="section-title"><div><p className="eyebrow">YOUR CONTENT</p><h2>{t.saved}</h2></div><span className="count-badge">{drafts.length}</span></div>{drafts.length === 0 ? <div className="empty-card">✧<p>{t.noDrafts}</p></div> : <div className="draft-grid">{drafts.map((draft) => <article className="draft-card" key={draft.id}><div className="draft-card-top"><span className="format-tag">{draft.format}</span><span className="status-tag">{draft.status === "Draft" ? t.draft : t.schedule}</span></div><h3>{draft.title}</h3><p className="draft-category">{draft.category}{draft.mediaName ? ` · ${draft.mediaName}` : ""}</p><p className="draft-caption">{draft.caption}</p><div className="draft-actions"><button className="secondary-button" onClick={() => onShare(draft)}>{t.share} ↗</button><button className="delete-button" onClick={() => onDelete(draft.id)}>{t.remove}</button></div></article>)}</div>}</section>;
}
