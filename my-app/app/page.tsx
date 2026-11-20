import Image from "next/image";
import Navbar from "./components/Navbar";

const benefits = [
  {
    title: "Inpatient care",
    description: "Hospital stays, specialist care and essential treatment.",
    image:
      "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=900&q=85",
    label: "Care when you need it most",
  },
  {
    title: "Outpatient services",
    description: "Consultations, diagnosis and day-to-day healthcare.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    label: "Everyday health support",
  },
  {
    title: "Maternity care",
    description: "Antenatal care and support for growing families.",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=85",
    label: "Support for every new beginning",
  },
  {
    title: "Eye care",
    description: "Eye examinations and treatment for healthy vision.",
    image:
      "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=900&q=85",
    label: "See a healthier future",
  },
];

const news = [
  {
    category: "Public education",
    title: "Regional teams encouraged to bring health insurance information closer to communities",
    date: "15 November 2026",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Partnerships",
    title: "NHIA leadership meets healthcare partners to strengthen quality care",
    date: "12 November 2026",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=85",
  },
  {
    category: "Community",
    title: "Students celebrate teamwork at the latest inter-school health quiz",
    date: "08 November 2026",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
  },
];

const quickLinks = [
  { title: "Check your membership", detail: "Manage your NHIS membership", icon: "01" },
  { title: "Claims payment", detail: "Claims and payment information", icon: "02" },
  { title: "Find a provider", detail: "Explore accredited facilities", icon: "03" },
  { title: "Medicines list", detail: "View covered medicines", icon: "04" },
];

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
    >
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3.5 10h12m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span /> National Health Insurance Authority</p>
            <h1>Health cover.<br /><span>Peace of mind.</span></h1>
            <p className="hero-description">
              Making quality healthcare accessible to everyone in Ghana. Learn
              what your NHIS membership covers and how to get started.
            </p>
            <div className="hero-actions">
              <a className="button button-green" href="#membership">
                Explore your benefits <ArrowIcon />
              </a>
              <a className="text-link" href="#about">Discover NHIS <ArrowIcon /></a>
            </div>
            <div className="hero-note">
              <span className="note-check">✓</span>
              <span>Care that keeps you and your family moving forward.</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-photo" role="img" aria-label="Healthcare professional speaking with a patient" />
            <div className="hero-photo-shade" />
            <div className="hero-stamp">
              <span className="stamp-star">✳</span>
              <span>Care for<br /><strong>every Ghanaian</strong></span>
            </div>
            <div className="hero-caption">
              <span className="caption-dot" />
              <span>Building a healthier Ghana, together</span>
            </div>
          </div>
          <div className="hero-index"><span>01</span> / 04</div>
        </section>

        <section className="quick-links" aria-label="Popular services">
          <div className="quick-intro">
            <p className="eyebrow">Here to help</p>
            <h2>What do you<br />need today?</h2>
          </div>
          {quickLinks.map((item) => (
            <a className="quick-link" href="#services" key={item.title}>
              <span className="quick-number">{item.icon}</span>
              <span className="quick-link-copy">
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </span>
              <ArrowIcon diagonal />
            </a>
          ))}
        </section>

        <section className="benefits-section section-wrap" id="membership">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your membership</p>
              <h2>Healthcare that covers <span>more.</span></h2>
            </div>
            <a className="text-link" href="#services">View all benefits <ArrowIcon /></a>
          </div>
          <p className="section-intro">
            From routine visits to specialist treatment, NHIS supports you with
            a broad package of essential health services.
          </p>
          <div className="benefit-grid">
            {benefits.map((benefit, index) => (
              <a className="benefit-card" href="#services" key={benefit.title}>
                <div
                  className="benefit-image"
                  role="img"
                  aria-label={benefit.label}
                  style={{ backgroundImage: `url("${benefit.image}")` }}
                >
                  <span className="benefit-count">0{index + 1}</span>
                </div>
                <div className="benefit-card-content">
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                  <span className="round-arrow"><ArrowIcon diagonal /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="service-banner" id="services">
          <div className="service-image" role="img" aria-label="Doctor caring for a patient" />
          <div className="service-copy">
            <p className="eyebrow">Simple. Convenient. Secure.</p>
            <h2>Your health cover,<br />within reach.</h2>
            <p>
              Link your Ghana Card, check your membership and find the
              information you need — all in one place.
            </p>
            <a className="button button-light" href="#membership">
              Explore member services <ArrowIcon />
            </a>
          </div>
          <div className="service-mark" aria-hidden="true">NHIS</div>
        </section>

        <section className="news-section section-wrap" id="news">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Stories & updates</p>
              <h2>What&apos;s happening <span>at NHIA.</span></h2>
            </div>
            <a className="text-link" href="#news">All news and updates <ArrowIcon /></a>
          </div>
          <div className="news-grid">
            {news.map((item) => (
              <article className="news-card" key={item.title}>
                <a className="news-image" href="#news" aria-label={`Read: ${item.title}`}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                </a>
                <div className="news-content">
                  <div className="news-meta"><span>{item.category}</span><time>{item.date}</time></div>
                  <h3><a href="#news">{item.title}</a></h3>
                  <a className="news-read" href="#news">Read story <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-strip" id="about">
          <div>
            <p className="eyebrow">Need a hand?</p>
            <h2>We&apos;re here for you.</h2>
            <p>Questions about membership or services? Our team is ready to help.</p>
          </div>
          <div className="contact-actions">
            <a className="button button-green" href="tel:0800110221">Call 0800 11 00 22 <ArrowIcon /></a>
            <a className="text-link" href="mailto:info@nhia.gov.gh">Email the NHIA <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <Image src="/nhi-logo.png" alt="NHIS — National Health Insurance Scheme" width={252} height={138} />
            </a>
            <p>Working together for a healthier Ghana.</p>
          </div>
          <div className="footer-column">
            <h3>Explore</h3>
            <a href="#about">About the NHIA</a>
            <a href="#membership">Membership</a>
            <a href="#services">Health providers</a>
            <a href="#news">News & updates</a>
          </div>
          <div className="footer-column">
            <h3>Useful links</h3>
            <a href="#services">Claims payment</a>
            <a href="#services">Medicines list</a>
            <a href="#services">Downloads</a>
            <a href="#about">Contact us</a>
          </div>
          <div className="footer-column footer-contact">
            <h3>Get in touch</h3>
            <a href="tel:0800110221">0800 11 00 22</a>
            <a href="mailto:info@nhia.gov.gh">info@nhia.gov.gh</a>
            <span>Monday – Friday, 8:00am – 5:00pm</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 National Health Insurance Authority</span>
          <span>Serving Ghana with care.</span>
        </div>
      </footer>
    </>
  );
}
