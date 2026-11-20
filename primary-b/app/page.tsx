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
    image: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.26%20AM%20(1).jpeg",
    alt: "Pupils working in a classroom at Diare Primary B",
    className: "program-card--green",
  },
  {
    number: "02",
    title: "Curiosity in the classroom",
    description:
      "Encourage children to ask questions, share ideas, and discover new ways to understand the world.",
    image: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.27%20AM%20(1).jpeg",
    alt: "A pupil solving a problem at the classroom whiteboard",
    className: "program-card--yellow",
  },
  {
    number: "03",
    title: "Character and community",
    description:
      "Create a welcoming place where respect, friendship, and a sense of belonging grow every day.",
    image: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.28%20AM.jpeg",
    alt: "A teacher with pupils at Diare Primary B",
    className: "program-card--peach",
  },
];

const galleryImages = [
  {
    src: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.26%20AM.jpeg",
    alt: "Pupils sharing a moment together outdoors",
    className: "gallery-image--wide",
  },
  {
    src: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.27%20AM%20(3).jpeg",
    alt: "Pupils studying together at their classroom desks",
    className: "",
  },
  {
    src: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.29%20AM.jpeg",
    alt: "Pupils together in their classroom",
    className: "",
  },
];

const staff = [
  {
    name: "Toahiru Abdul Rahaman",
    role: "Headteacher",
    description:
      "Leads the school community and supports a positive environment for learning.",
  },
  {
    name: "Alhassan Yussif",
    role: "Assistant Headteacher",
    description:
      "Supports school leadership and helps pupils and staff thrive each day.",
  },
  {
    name: "Raphael",
    role: "Sports Coordinator",
    description:
      "Encourages pupils to take part, stay active, and learn through sport.",
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
              src="/images/WhatsApp%20Image%202026-11-20%20at%201.47.15%20AM.jpeg"
              alt="Pupils welcoming visitors to their classroom"
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
              <article className="approach-point reveal-on-scroll">
                <span className="approach-number">01</span>
                <div>
                  <h3>Strong foundations</h3>
                  <p>
                    A thoughtful start in reading, writing, and mathematics
                    gives children room to grow.
                  </p>
                </div>
              </article>
              <article className="approach-point reveal-on-scroll">
                <span className="approach-number">02</span>
                <div>
                  <h3>Learning together</h3>
                  <p>
                    Every question, new idea, and shared discovery belongs in
                    the classroom.
                  </p>
                </div>
              </article>
              <article className="approach-point reveal-on-scroll">
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
              src="/images/WhatsApp%20Image%202026-11-20%20at%201.47.27%20AM%20(2).jpeg"
              alt="Pupils helping care for the school grounds"
              width={337}
              height={149}
              sizes="(max-width: 760px) 100vw, 50vw"
            />
            <span className="campus-sticker">A place to belong</span>
          </div>
        </section>

        <section
          className="management-section"
          id="management"
          aria-labelledby="management-title"
        >
          <div className="section-wrap">
            <div className="section-title-row management-heading reveal-on-scroll">
              <div>
                <p className="eyebrow">The people behind our school</p>
                <h2 id="management-title">Meet our team.</h2>
              </div>
              <p className="section-description">
                Dedicated school leaders and staff help make Diare Primary B a
                welcoming place to learn, grow, and belong.
              </p>
            </div>
            <div className="management-layout">
              <div className="staff-list">
                {staff.map((member, index) => (
                  <article
                    className="staff-card reveal-on-scroll"
                    key={member.name}
                  >
                    <span className="staff-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="staff-details">
                      <p className="staff-role">{member.role}</p>
                      <h3>{member.name}</h3>
                      <p className="staff-description">{member.description}</p>
                    </div>
                    <span className="staff-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </article>
                ))}
              </div>
              <div className="management-gallery reveal-on-scroll">
                <div className="management-photo">
                  <Image
                    src="/images/staff.jpeg"
                    alt="School staff meeting together at Diare Primary B"
                    width={516}
                    height={387}
                    sizes="(max-width: 760px) 100vw, 36vw"
                  />
                </div>
              </div>
            </div>
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
