"use client";

import { useEffect, useState } from "react";

type Language = "en" | "hi";

const copy = {
  en: {
    language: "Language",
    templates: "Templates",
    jobs: "Jobs",
    postJob: "Post a Job",
    getStarted: "Get Started",
    eyebrow: "CREATE • PROMOTE • HIRE",
    headline: "Everything you need to",
    grow: "grow.",
    intro: "Create posters and marketing videos, upload or share them, and find the right people for every opportunity.",
    explore: "Explore Templates",
    hiring: "WE'RE HIRING",
    posterHeadline: "Build the future<br />with us",
    posterDetail: "Creative team • Full time",
    ready: "70+ READY TEMPLATES",
    choose: "Choose a category",
    createShare: "Create & Share →",
    nextRole: "FIND YOUR NEXT ROLE",
    jobsTitle: "Jobs made for you",
    searchJobs: "Search Jobs",
    hire: "HIRE GREAT PEOPLE",
    postTitle: "Post a job and reach the right talent",
    categories: [
      ["Jobs", "Job posts, hiring and recruitment"],
      ["Education", "Admissions, classes and courses"],
      ["Business", "Offers, events and promotions"],
      ["Food", "Restaurant and delivery marketing"],
      ["Real Estate", "Property listings and open houses"],
      ["Health", "Clinics, wellness and appointments"],
      ["Events", "Invites, weddings and celebrations"],
      ["Services", "Local services and professional offers"],
    ],
  },
  hi: {
    language: "भाषा",
    templates: "टेम्पलेट",
    jobs: "नौकरियाँ",
    postJob: "नौकरी पोस्ट करें",
    getStarted: "शुरू करें",
    eyebrow: "बनाएँ • प्रचार करें • भर्ती करें",
    headline: "बढ़ने के लिए सब कुछ",
    grow: "एक जगह।",
    intro: "पोस्टर और मार्केटिंग वीडियो बनाएँ, उन्हें अपलोड या शेयर करें, और हर अवसर के लिए सही लोगों को खोजें।",
    explore: "टेम्पलेट देखें",
    hiring: "हमें लोगों की ज़रूरत है",
    posterHeadline: "हमारे साथ<br />भविष्य बनाएँ",
    posterDetail: "क्रिएटिव टीम • फुल टाइम",
    ready: "70+ तैयार टेम्पलेट",
    choose: "अपनी कैटेगरी चुनें",
    createShare: "बनाएँ और शेयर करें →",
    nextRole: "अपनी अगली नौकरी खोजें",
    jobsTitle: "आपके लिए नौकरियाँ",
    searchJobs: "नौकरी खोजें",
    hire: "बेहतरीन लोगों को भर्ती करें",
    postTitle: "नौकरी पोस्ट करें और सही उम्मीदवारों तक पहुँचें",
    categories: [
      ["नौकरियाँ", "नौकरी पोस्ट, भर्ती और करियर"],
      ["शिक्षा", "एडमिशन, कक्षाएँ और कोर्स"],
      ["व्याप��र", "ऑफर, इवेंट और प्रचार"],
      ["खाना", "रेस्तराँ और डिलीवरी का प्रचार"],
      ["रियल एस्टेट", "प्रॉपर्टी लिस्टिंग और ओपन हाउस"],
      ["स्वास्थ्य", "क्लिनिक, वेलनेस और अपॉइंटमेंट"],
      ["इवेंट", "निमंत्रण, शादी और समारोह"],
      ["सेवाएँ", "स्थानीय और पेशेवर सेवाएँ"],
    ],
  },
} satisfies Record<Language, {
  language: string; templates: string; jobs: string; postJob: string; getStarted: string;
  eyebrow: string; headline: string; grow: string; intro: string; explore: string;
  hiring: string; posterHeadline: string; posterDetail: string; ready: string; choose: string;
  createShare: string; nextRole: string; jobsTitle: string; searchJobs: string; hire: string;
  postTitle: string; categories: string[][];
}>;

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("beet-language");
    if (saved === "en" || saved === "hi") setLanguage(saved);
  }, []);

  const t = copy[language];

  function changeLanguage(value: string) {
    const nextLanguage = value as Language;
    setLanguage(nextLanguage);
    window.localStorage.setItem("beet-language", nextLanguage);
  }

  return (
    <main lang={language}>
      <header className="nav">
        <a className="brand" href="#" aria-label="BEET home"><span>BE</span>ET</a>
        <nav aria-label="Main navigation">
          <a href="#templates">{t.templates}</a>
          <a href="#jobs">{t.jobs}</a>
          <a href="#post">{t.postJob}</a>
        </nav>
        <label className="language-picker">
          <span>{t.language}</span>
          <select value={language} onChange={(event) => changeLanguage(event.target.value)} aria-label={t.language}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
          </select>
        </label>
        <button className="primary">{t.getStarted}</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.headline} <em>{t.grow}</em></h1>
          <p className="lead">{t.intro}</p>
          <div className="actions">
            <a className="primary link" href="#templates">{t.explore}</a>
            <a className="secondary link" href="#post">{t.postJob}</a>
          </div>
        </div>
        <div className="preview">
          <div className="poster">
            <span>{t.hiring}</span>
            <strong dangerouslySetInnerHTML={{ __html: t.posterHeadline }} />
            <small>{t.posterDetail}</small>
          </div>
        </div>
      </section>

      <section id="templates" className="section">
        <p className="eyebrow">{t.ready}</p>
        <h2>{t.choose}</h2>
        <div className="grid">
          {t.categories.map(([title, description]) => (
            <article className="card" key={title}>
              <div className="icon">{title[0]}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button className="text-button">{t.createShare}</button>
            </article>
          ))}
        </div>
      </section>

      <section id="jobs" className="section jobs">
        <div><p className="eyebrow">{t.nextRole}</p><h2>{t.jobsTitle}</h2></div>
        <button className="secondary">{t.searchJobs}</button>
      </section>

      <section id="post" className="section post">
        <div><p className="eyebrow">{t.hire}</p><h2>{t.postTitle}</h2></div>
        <button className="primary">{t.postJob}</button>
      </section>
    </main>
  );
}
