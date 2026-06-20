import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaBullseye, FaEye } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Overview.css';

export default function Overview({ company }) {
  const mission = Array.isArray(company?.mission) ? company.mission : [company?.mission];
  const vision  = Array.isArray(company?.vision)  ? company.vision  : [company?.vision];

  const galleryImages = [
    { src: '/overview/01.jpeg', alt: 'eData Software office' },
    { src: '/overview/02.jpeg', alt: 'eData Software team at work' },
    { src: '/overview/04.jpeg', alt: 'eData Software workspace' },
    { src: '/overview/06.jpeg', alt: 'eData Software operations' },
  ];

  return (
    <div className="overview-page page-enter">
      <PageBanner
        title="Company Overview"
        subtitle="Who we are, what we do, and why it matters."
        breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Overview' }]}
      />

      {/* ── About Section ── */}
      <section className="section" aria-labelledby="overview-intro-title">
        <div className="container">

          {/* Top: text left, gallery right */}
          <div className="overview-intro__grid">
            <div className="overview-intro__text">
              <div className="section-badge">About the Company</div>
              <h2 id="overview-intro-title" className="section-title" style={{ textAlign: 'left', marginBottom: '20px' }}>
                eData Software <span>Limited</span>
              </h2>
              <p className="overview-address">
                <strong>📍</strong> {company?.address}
              </p>
              <p className="overview-para">{company?.description}</p>
            </div>

            <div className="overview-gallery" aria-label="Company photo gallery">
              {galleryImages.map((img, i) => (
                <div key={i} className="overview-gallery__item">
                  <img src={img.src} alt={img.alt} loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: extended text full width */}
          {company?.extendedDescription && (
            <div className="overview-intro__full">
              <p className="overview-para">{company.extendedDescription}</p>
              <div>
                <Link to="/contact" className="btn btn-primary overview-cta-btn">
                  Get In Touch <FaArrowRight />
                </Link>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section" style={{ background: 'var(--bg-light)' }} aria-labelledby="ov-mv-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Purpose</div>
            <h2 id="ov-mv-title" className="section-title">
              Our Mission <span>&amp; Vision</span>
            </h2>
          </div>
          <div className="overview-mv__grid">
            {/* Mission */}
            <div className="overview-mv-card overview-mv-card--mission">
              <div className="overview-mv-card__header">
                <div className="overview-mv-card__icon" aria-hidden="true"><FaBullseye /></div>
                <h3>Our Mission</h3>
              </div>
              <ul className="overview-mv-list" role="list">
                {mission.map((item, i) => (
                  <li key={i} role="listitem">
                    <FaCheckCircle className="overview-mv-list__icon" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="overview-mv-card overview-mv-card--vision">
              <div className="overview-mv-card__header">
                <div className="overview-mv-card__icon" aria-hidden="true"><FaEye /></div>
                <h3>Our Vision</h3>
              </div>
              <ul className="overview-mv-list" role="list">
                {vision.map((item, i) => (
                  <li key={i} role="listitem">
                    <FaCheckCircle className="overview-mv-list__icon" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" aria-labelledby="ov-values-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Core Values</div>
            <h2 id="ov-values-title" className="section-title">
              What We <span>Believe In</span>
            </h2>
          </div>
          <div className="overview-values__grid" role="list">
            {(company?.values || []).map((v, i) => (
              <div key={i} className="overview-value-card" role="listitem">
                <FaCheckCircle className="overview-value-card__icon" aria-hidden="true" />
                <h3 className="overview-value-card__title">{v.title}</h3>
                <p className="overview-value-card__desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" style={{ background: 'var(--secondary)' }} aria-labelledby="ov-cta-title">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 id="ov-cta-title" className="section-title" style={{ color: 'white' }}>
            Ready to Work With <span>Our Team?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px', color: 'rgba(255,255,255,0.7)' }}>
            Let's build something great together.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get In Touch <FaArrowRight /></Link>
            <Link to="/about/leadership" className="btn btn-lg" style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              Meet the Leadership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
