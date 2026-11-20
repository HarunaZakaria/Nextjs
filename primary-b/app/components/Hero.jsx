export default function Hero() {
  return (
    <section className="hero-section" id="top">
      <video
        className="hero-background-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/WhatsApp%20Image%202026-11-20%20at%201.47.15%20AM.jpeg"
        aria-hidden="true"
      >
        <source src="/images/school%20video.mp4" type="video/mp4" />
      </video>
      <div className="hero-inner section-wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Welcome to Diare Primary B
          </p>
          <h1>
            A bright start
            <br />
            for a <em>brighter</em>
            <br />
            tomorrow.
          </h1>
          <p className="hero-description">
            A caring school community where young minds find their confidence,
            discover their potential, and learn to shape their future.
          </p>
          <div className="hero-actions">
            <a className="button button--green" href="#about">
              Discover our school <span aria-hidden="true">↗</span>
            </a>
            <a className="hero-secondary-link" href="#learning">
              Explore learning <span aria-hidden="true">↓</span>
            </a>
          </div>
          <div className="hero-note">
            <span className="hero-note-icon" aria-hidden="true">
              ✳
            </span>
            <p>
              <strong>Big dreams begin here.</strong>
              <span>Growing together, one day at a time.</span>
            </p>
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span aria-hidden="true">↓</span> Scroll to explore
      </a>
    </section>
  );
}
