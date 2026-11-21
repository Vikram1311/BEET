"use client";

const categories = [
  ["Jobs", "Job post, hiring and recruitment"],
  ["Education", "Admission, classes and courses"],
  ["Business", "Offers, events and promotions"],
  ["Food", "Restaurant and delivery marketing"],
  ["Real Estate", "Property listings and open houses"],
  ["Health", "Clinics, wellness and appointments"],
  ["Events", "Invites, weddings and celebrations"],
  ["Services", "Local services and professional offers"],
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#"><span>BE</span>ET</a>
        <nav>
          <a href="#templates">Templates</a>
          <a href="#jobs">Jobs</a>
          <a href="#post">Post a Job</a>
        </nav>
        <button className="primary">Get Started</button>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">CREATE • PROMOTE • HIRE</p>
          <h1>Everything you need to <em>grow.</em></h1>
          <p className="lead">Create posters and marketing videos, upload or share them, and find the right people for every opportunity.</p>
          <div className="actions">
            <a className="primary link" href="#templates">Explore Templates</a>
            <a className="secondary link" href="#post">Post a Job</a>
          </div>
        </div>
        <div className="preview">
          <div className="poster">
            <span>WE'RE HIRING</span>
            <strong>Build the future<br />with us</strong>
            <small>Creative team • Full time</small>
          </div>
        </div>
      </section>

      <section id="templates" className="section">
        <p className="eyebrow">70+ READY TEMPLATES</p>
        <h2>Choose a category</h2>
        <div className="grid">
          {categories.map(([title, description]) => (
            <article className="card" key={title}>
              <div className="icon">{title[0]}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button className="text-button">Create & Share →</button>
            </article>
          ))}
        </div>
      </section>

      <section id="jobs" className="section jobs">
        <div><p className="eyebrow">FIND YOUR NEXT ROLE</p><h2>Jobs made for you</h2></div>
        <button className="secondary">Search Jobs</button>
      </section>

      <section id="post" className="section post">
        <div><p className="eyebrow">HIRE GREAT PEOPLE</p><h2>Post a job and reach the right talent</h2></div>
        <button className="primary">Post a Job</button>
      </section>
    </main>
  );
}
