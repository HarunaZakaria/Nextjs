import Image from "next/image";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ScrollAnimations from "./components/ScrollAnimations";

const programs = [
  {
    number: "01",
    title: "Foundations for learning",
    description:
      "Build confidence in literacy, numeracy, and the everyday skills that help young learners thrive.",
    image: "/images (6).jpg",
    alt: "A teacher supporting pupils as they work in class",
    className: "program-card--green",
  },
  {
    number: "02",
    title: "Curiosity in the classroom",
    description:
      "Encourage children to ask questions, share ideas, and discover new ways to understand the world.",
    image: "/images (3).jpg",
    alt: "Pupils learning together around a classroom tablet",
    className: "program-card--yellow",
  },
  {
    number: "03",
    title: "Character and community",
    description:
      "Create a welcoming place where respect, friendship, and a sense of belonging grow every day.",
    image: "/images (2).jpg",
    alt: "Primary school pupils gathered outside beneath a tree",
    className: "program-card--peach",
  },
];

const galleryImages = [
  {
    src: "/images (5).jpg",
    alt: "Pupils focused on their work during a classroom lesson",
    className: "gallery-image--wide",
  },
  {
    src: "/images (7).jpg",
    alt: "Pupils learning together at their classroom desks",
    className: "",
  },
  {
    src: "/images (8).jpg",
    alt: "A teacher helping a pupil with classwork",
    className: "",
  },
];

export default function Home() {
  return (
    <>
      <NavBar />
      <ScrollAnimations />
      <main>
        <Hero />

        <section className="welcome-section section-wrap" id="about">
          <div className="welcome-photo-wrap reveal-on-scroll">
            <Image
              className="welcome-photo"
              src="/images (8).jpg"
              alt="A teacher guiding a pupil through a lesson"
              width={576}
              height={384}
              sizes="(max-width: 760px) 100vw, 46vw"
            />
            <div className="photo-caption">
              <span className="caption-mark" aria-hidden="true">
                ✳
              </span>
              <span>Small steps. Bright futures.</span>
            </div>
          </div>
          <div className="welcome-copy reveal-on-scroll">
            <p className="eyebrow">A warm welcome</p>
            <h2>
              Every child deserves a place to <em>shine.</em>
            </h2>
            <p className="section-description">
              At Diare Primary B, learning is about more than what is written
              on the board. It is about building confidence, finding
              friendships, and giving every child the support to discover what
              they can do.
            </p>
            <a className="text-link" href="#our-approach">
              Get to know our school <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="approach-section" id="our-approach">
          <div className="section-wrap approach-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow eyebrow--light">Learning with purpose</p>
              <h2>A good start makes all the difference.</h2>
              <p>
                We want every school day to help children feel capable,
                connected, and excited to learn.
              </p>
            </div>
            <div className="approach-points">
              <article               className="approach-point reveal-on-scroll">
                <span className="approach-number">01</span>
                <div>
                  <h3>Strong foundations</h3>
                  <p>
                    A thoughtful start in reading, writing, and mathematics
                    gives children room to grow.
                  </p>
                </div>
              </article>
              <article               className="approach-point reveal-on-scroll">
                <span className="approach-number">02</span>
                <div>
                  <h3>Learning together</h3>
                  <p>
                    Every question, new idea, and shared discovery belongs in
                    the classroom.
                  </p>
                </div>
              </article>
              <article               className="approach-point reveal-on-scroll">
                <span className="approach-number">03</span>
                <div>
                  <h3>Growing with care</h3>
                  <p>
                    Kindness, respect, and encouragement help children bring
                    their best selves to school.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="programs-section section-wrap" id="learning">
          <div className="section-title-row reveal-on-scroll">
            <div>
              <p className="eyebrow">Curiosity starts here</p>
              <h2>Room to learn. Space to grow.</h2>
            </div>
            <p className="section-description">
              From classroom fundamentals to everyday discovery, we make space
              for every learner to find their way.
            </p>
          </div>
          <div className="program-grid">
            {programs.map((program) => (
              <article
                className={`program-card reveal-on-scroll ${program.className}`}
                key={program.number}
              >
                <div className="program-image-wrap">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    width={576}
                    height={384}
                    sizes="(max-width: 760px) 100vw, (max-width: 1050px) 50vw, 33vw"
                  />
                </div>
                <div className="program-content">
                  <span className="program-number">{program.number}</span>
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="campus-section section-wrap" id="school">
          <div className="campus-copy reveal-on-scroll">
            <p className="eyebrow">Our school, our community</p>
            <h2>A place where the next chapter begins.</h2>
            <p className="section-description">
              A welcoming school environment gives children room to focus,
              feel at home, and imagine what comes next. We are proud to learn
              and grow together as one school community.
            </p>
            <a className="button button--dark" href="#contact">
              Connect with our school <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="campus-image-wrap reveal-on-scroll">
            <Image
              src="/images (4).jpg"
              alt="The school building in the sunshine"
              width={337}
              height={149}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="campus-sticker">A place to belong</span>
          </div>
        </section>

        <section className="gallery-section" id="school-life">
          <div className="section-wrap">
            <div className="section-title-row gallery-title-row reveal-on-scroll">
              <div>
                <p className="eyebrow">Life at Diare Primary B</p>
                <h2>Little moments. Big memories.</h2>
              </div>
              <p className="section-description">
                A glimpse into the lessons, friendships, and everyday moments
                that make school special.
              </p>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image) => (
                <div
                  className={`gallery-image reveal-on-scroll ${image.className}`}
                  key={image.src}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={576}
                    height={384}
                    sizes="(max-width: 760px) 100vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section section-wrap reveal-on-scroll"
          id="contact"
        >
          <div className="contact-decoration" aria-hidden="true">
            ✳
          </div>
          <p className="eyebrow eyebrow--light">Your next step starts here</p>
          <h2>Let&apos;s help your child love learning.</h2>
          <p>
            Have a question about Diare Primary B? We would love to hear from
            you. Get in touch with the school to learn more.
          </p>
          <a className="button button--light" href="#top">
            Back to the top <span aria-hidden="true">↑</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-inner">
          <a className="footer-brand" href="#top">
            <span className="brand-icon" aria-hidden="true">
              D
            </span>
            <span>
              <strong>Diare Primary B</strong>
              <small>Learning together, growing together.</small>
            </span>
          </a>
          <p>Made with care for our school community.</p>
          <span className="footer-copyright">
            Diare Primary B · All rights reserved
          </span>
        </div>
      </footer>
    </>
  );
}
