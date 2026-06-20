import { FaHandshake, FaStar } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Clients.css';

export default function Clients({ clients, testimonials }) {
  const doubled = [...clients, ...clients];

  return (
    <div className="clients-page page-enter">
      <PageBanner
        title="Our Clients"
        subtitle="Trusted by leading organizations across banking, retail, government, education, and more."
        breadcrumbs={[{ label: 'Clients' }]}
      />

      {/* Marquee */}
      <section className="section-sm" style={{background:'var(--bg-light)'}} aria-labelledby="clients-marquee-title">
        <div className="container" style={{marginBottom:'32px'}}>
          <div className="section-header" style={{marginBottom:'0'}}>
            <div className="section-badge"><FaHandshake /> Our Partners</div>
            <h2 id="clients-marquee-title" className="section-title">
              Trusted by <span>Industry Leaders</span>
            </h2>
          </div>
        </div>
        <div className="clients-marquee" aria-label="Client logos" aria-live="off">
          <div className="clients-marquee__track" aria-hidden="true">
            {doubled.map((c, i) => (
              <div key={`${c.id}-${i}`} className="client-chip" style={{'--cc': c.color}}>
                <div className="client-chip__icon"><span>{c.initials}</span></div>
                <div>
                  <div className="client-chip__name">{c.name}</div>
                  <div className="client-chip__industry">{c.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All clients grid */}
      <section className="section" aria-labelledby="clients-grid-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Network</div>
            <h2 id="clients-grid-title" className="section-title">
              120+ <span>Satisfied Clients</span>
            </h2>
          </div>
          <div className="clients-grid" role="list">
            {clients.map((c) => (
              <div key={c.id} className="clients-card" role="listitem" style={{'--cc':c.color}}>
                <div className="clients-card__icon"><span>{c.initials}</span></div>
                <div className="clients-card__name">{c.name}</div>
                <div className="clients-card__industry">{c.industry}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{background:'var(--bg-light)'}} aria-labelledby="clients-reviews-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Reviews</div>
            <h2 id="clients-reviews-title" className="section-title">
              What Clients <span>Say About Us</span>
            </h2>
          </div>
          <div className="clients-reviews" role="list">
            {(testimonials || []).map((t) => (
              <div key={t.id} className="clients-review" role="listitem">
                <div className="stars" style={{marginBottom:'14px'}} aria-label={`${t.rating} stars`}>
                  {[...Array(t.rating)].map((_,i) => <FaStar key={i} aria-hidden="true"/>)}
                </div>
                <blockquote className="clients-review__text">"{t.text}"</blockquote>
                <div className="clients-review__author">
                  <div className="clients-review__avatar"
                    style={{background:`linear-gradient(135deg,${t.color},${t.color}bb)`}} aria-hidden="true">
                    {t.initials}
                  </div>
                  <div>
                    <div className="clients-review__name">{t.name}</div>
                    <div className="clients-review__role">{t.role} · {t.company}</div>
                    <div className="clients-review__country">📍 {t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm" style={{background:'var(--secondary)'}}>
        <div className="container">
          <div className="clients-stats" role="list">
            {[
              {val:'120+', lbl:'Active Clients'},
              {val:'15+',  lbl:'Countries'},
              {val:'98%',  lbl:'Retention Rate'},
              {val:'4.9★', lbl:'Average Rating'},
            ].map((s) => (
              <div key={s.lbl} className="clients-stat" role="listitem">
                <span className="clients-stat__val">{s.val}</span>
                <span className="clients-stat__lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
