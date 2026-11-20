"use client";

import { useEffect, useRef } from "react";

const VIDEO_LOOP_END = 2;

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const restartFromBeginning = () => {
      video.currentTime = 0;
      video.play().catch((error) => {
        if (error.name !== "NotAllowedError") {
          console.error("Unable to resume the hero background video:", error);
        }
      });
    };

    const loopFirstTwoSeconds = () => {
      if (video.currentTime >= VIDEO_LOOP_END) {
        video.currentTime = 0;
      }
    };

    video.addEventListener("timeupdate", loopFirstTwoSeconds);
    video.addEventListener("ended", restartFromBeginning);

    return () => {
      video.removeEventListener("timeupdate", loopFirstTwoSeconds);
      video.removeEventListener("ended", restartFromBeginning);
    };
  }, []);

  return (
    <section className="hero-section" id="top">
      <video
        ref={videoRef}
        className="hero-background-video"
        autoPlay
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
            Government primary school · Diare Primary B
          </p>
          <h1>
            Learning together
            <br />
            for every
            <br />
            <em>child.</em>
          </h1>
          <p className="hero-description">
            Diare Primary B is a government school serving our community.
            Pupils learn together, build essential skills, and prepare for
            their next steps.
          </p>
          <div className="hero-actions">
            <a className="button button--green" href="#about">
              About our school <span aria-hidden="true">↗</span>
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
              <strong>Learning is a shared effort.</strong>
              <span>Pupils, teachers, families, and community.</span>
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
