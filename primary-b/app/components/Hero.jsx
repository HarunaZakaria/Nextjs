import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-section" id="top">
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
        <div className="hero-visual">
          <div className="hero-image-frame">
            <Image
              src="/images (2).jpg"
              alt="Pupils gathered outside for a lesson at Diare Primary B"
              width={549}
              height={364}
              priority
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </div>
          <div className="hero-image-accent" aria-hidden="true" />
          <div className="hero-image-label">
            <span className="label-sparkle" aria-hidden="true">
              ✳
            </span>
            <span>Curious minds, kind hearts</span>
          </div>
          <div className="hero-image-index" aria-hidden="true">
            01 <span /> 07
          </div>
        </div>
      </div>
      <a className="scroll-cue" href="#about">
        <span aria-hidden="true">↓</span> Scroll to explore
      </a>
    </section>
  );
}
