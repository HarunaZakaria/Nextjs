import Image from "next/image";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import ScrollAnimations from "./components/ScrollAnimations";

const programs = [
  {
    number: "01",
    title: "Foundations for learning",
    description:
      "Daily classroom lessons help pupils strengthen reading, writing, numeracy, and other essential skills.",
    image: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.26%20AM%20(1).jpeg",
    alt: "Pupils working in a classroom at Diare Primary B",
    className: "program-card--green",
  },
  {
    number: "02",
    title: "Curiosity in the classroom",
    description:
      "Pupils take part, ask questions, and share ideas as they learn alongside their classmates.",
    image: "/images/WhatsApp%20Image%202026-11-20%20at%201.47.27%20AM%20(1).jpeg",
    alt: "A pupil solving a problem at the classroom whiteboard",
    className: "program-card--yellow",
  },
  {
    number: "03",
    title: "Character and community",
    description:
      "Respect, responsibility, and cooperation help make our school a supportive place to learn.",
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
              <span>Learning and growing together.</span>
            </div>
          </div>
          <div className="welcome-copy reveal-on-scroll">
            <p className="eyebrow">A government school for our community</p>
            <h2>
              A strong start in learning belongs to <em>every child.</em>
            </h2>
            <p className="section-description">
              Diare Primary B is part of public education and serves pupils in
              our community. Our teachers support children as they build
              knowledge, develop skills, and learn alongside one another.
            </p>
            <a className="text-link" href="#our-approach">
              How we support learning <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="approach-section" id="our-approach">
          <div className="section-wrap approach-inner">
            <div className="section-heading reveal-on-scroll">
              <p className="eyebrow eyebrow--light">Our role in public education</p>
              <h2>A strong start opens doors.</h2>
              <p>
                Our teachers support pupils to learn, participate, and prepare
                for the next stage of their education.
              </p>
            </div>
            <div className="approach-points">
              <article className="approach-point reveal-on-scroll">
                <span className="approach-number">01</span>
                <div>
                  <h3>Strong foundations</h3>
                  <p>
                    Regular practice in reading, writing, and mathematics helps
                    pupils build essential skills.
                  </p>
                </div>
              </article>
              <article className="approach-point reveal-on-scroll">
                <span className="approach-number">02</span>
                <div>
                  <h3>Learning together</h3>
                  <p>
                    Pupils ask questions, contribute ideas, and learn from one
                    another in class.
                  </p>
                </div>
              </article>
              <article className="approach-point reveal-on-scroll">
                <span className="approach-number">03</span>
                <div>
                  <h3>Growing with care</h3>
                  <p>
                    Kindness, respect, and encouragement help pupils feel
                    welcome and ready to learn.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="programs-section section-wrap" id="learning">
          <div className="section-title-row reveal-on-scroll">
            <div>
              <p className="eyebrow">Learning in every classroom</p>
              <h2>Room to learn. Space to grow.</h2>
            </div>
            <p className="section-description">
              From essential classroom skills to shared discovery, pupils
              learn and grow together at Diare Primary B.
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
            <h2>A government school serving our community.</h2>
            <p className="section-description">
              Diare Primary B is a government primary school where children
              from our community come together to learn. We work to make each
              school day purposeful, welcoming, and supportive for pupils.
            </p>
            <a className="button button--dark" href="#about">
              Learn about our school <span aria-hidden="true">↗</span>
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
                <p className="eyebrow">Our school leadership and staff</p>
                <h2 id="management-title">Meet our school team.</h2>
              </div>
              <p className="section-description">
                Our headteacher, assistant headteacher, and staff support the
                daily work of teaching and school life.
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
                <h2>Everyday learning and school life.</h2>
              </div>
              <p className="section-description">
                A look at classroom lessons, friendships, and activities in our
                school community.
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
          <p className="eyebrow eyebrow--light">Public education, shared community</p>
          <h2>Learning together, serving our community.</h2>
          <p>
            Diare Primary B is a government primary school serving pupils and
            families in our community. Explore the school to learn about our
            classrooms, staff, and everyday learning.
          </p>
          <a className="button button--light" href="#about">
            About Diare Primary B <span aria-hidden="true">↗</span>
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
              <small>Government primary school.</small>
            </span>
          </a>
          <p>Serving our community through education.</p>
          <span className="footer-copyright">
            Diare Primary B · Government Primary School
          </span>
        </div>
      </footer>
    </>
  );
}
