import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight, FaUsers, FaGlobe, FaAward, FaRocket } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './About.css';

export default function About({ company, team }) {
  const mission = Array.isArray(company?.mission) ? company.mission.join(' ') : company?.mission;
  const vision  = Array.isArray(company?.vision)  ? company.vision.join(' ')  : company?.vision;

  const milestones = [
    { year: '2015', event: 'Founded',           desc: 'eData Software Limited was incorporated in Dhaka.' },
    { year: '2017', event: 'First 30 Clients',  desc: 'Grew to serve clients across multiple industries.' },
    { year: '2019', event: 'ISO Certification', desc: 'Achieved ISO 9001 and ISO 27001 certifications.' },
    { year: '2021', event: 'Regional Expansion',desc: 'Extended services to South & Southeast Asia.' },
    { year: '2024', event: '300+ Projects',     desc: 'Milestone of 300 successfully delivered solutions.' },
  ];

  return (
    <div className="about-page page-enter">
      <PageBanner
        title="About eData Software"
        subtitle="Who we are, what drives us, and why we do what we do."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* ── Mission & Vision ── */}
      <section className="section" aria-labelledby="mv-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Identity</div>
            <h2 id="mv-title" className="section-title">
              Driven by <span>Purpose & Innovation</span>
            </h2>
            <p className="section-subtitle">{company?.description}</p>
          </div>

          <div className="about-mv__grid">
            <div className="about-mv-card about-mv-card--mission">
              <div className="about-mv-card__icon" aria-hidden="true">🎯</div>
              <h3>Our Mission</h3>
              <p>{mission}</p>
            </div>
            <div className="about-mv-card about-mv-card--vision">
              <div className="about-mv-card__icon" aria-hidden="true">🔭</div>
              <h3>Our Vision</h3>
              <p>{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="section" style={{background:'var(--bg-light)'}} aria-labelledby="values-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Core Values</div>
            <h2 id="values-title" className="section-title">
              What We <span>Believe In</span>
            </h2>
          </div>
          <div className="about-values__grid" role="list">
            {(company?.values || []).map((v, i) => (
              <div key={i} className="about-value-card" role="listitem">
                <FaCheckCircle className="about-value-card__icon" aria-hidden="true" />
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="section" style={{background:'var(--secondary)'}} aria-labelledby="stats-title">
        <div className="container">
          <h2 id="stats-title" className="section-title" style={{color:'white',textAlign:'center',marginBottom:'56px'}}>
            Numbers That <span>Speak for Themselves</span>
          </h2>
          <div className="about-stats__grid" role="list">
            {[
              { Icon: FaRocket, value: company?.projects  || '300+',  label: 'Projects Delivered',  color: 'var(--primary)' },
              { Icon: FaUsers,  value: company?.clients   || '120+',  label: 'Satisfied Clients',   color: 'var(--accent)'  },
              { Icon: FaGlobe,  value: company?.countries || '15+',   label: 'Countries Served',    color: '#10B981'        },
              { Icon: FaAward,  value: company?.employees || '100+',  label: 'Expert Team Members', color: '#0EA5E9'        },
            ].map(({ Icon, value, label, color }) => (
              <div key={label} className="about-stat-card" role="listitem" style={{'--asc-color': color}}>
                <div className="about-stat-card__icon"><Icon /></div>
                <span className="about-stat-card__value">{value}</span>
                <span className="about-stat-card__label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section" aria-labelledby="timeline-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Journey</div>
            <h2 id="timeline-title" className="section-title">
              How We Got <span>Here</span>
            </h2>
          </div>
          <div className="about-timeline" role="list">
            {milestones.map((m, i) => (
              <div key={i} className={`about-timeline__item ${i % 2 === 0 ? 'about-timeline__item--left' : 'about-timeline__item--right'}`} role="listitem">
                <div className="about-timeline__content">
                  <span className="about-timeline__year">{m.year}</span>
                  <h3 className="about-timeline__event">{m.event}</h3>
                  <p className="about-timeline__desc">{m.desc}</p>
                </div>
                <div className="about-timeline__dot" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section" style={{background:'var(--bg-light)'}} aria-labelledby="team-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our People</div>
            <h2 id="team-title" className="section-title">
              Meet the <span>Leadership Team</span>
            </h2>
            <p className="section-subtitle">
              Passionate experts committed to your success.
            </p>
          </div>
          <div className="about-team__grid" role="list">
            {(team || []).map((member) => (
              <div key={member.id} className="about-team-card" role="listitem">
                <div className="about-team-card__avatar" style={{background: `linear-gradient(135deg,${member.color},${member.color}bb)`}} aria-hidden="true">
                  {member.initials}
                </div>
                <h3 className="about-team-card__name">{member.name}</h3>
                <p className="about-team-card__role" style={{color: member.color}}>{member.role}</p>
                <p className="about-team-card__bio">{member.bio}</p>
                <div className="about-team-card__social" aria-label={`${member.name}'s social links`}>
                  <a href={member.linkedin} className="about-team-card__social-link" aria-label="LinkedIn">in</a>
                  <a href={member.twitter}  className="about-team-card__social-link" aria-label="Twitter">tw</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm" aria-labelledby="about-cta-title">
        <div className="container" style={{textAlign:'center'}}>
          <h2 id="about-cta-title" className="section-title">
            Want to Work With <span>Our Team?</span>
          </h2>
          <p className="section-subtitle" style={{margin:'0 auto 32px'}}>
            We're always looking for talented people and great projects.
          </p>
          <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/contact" className="btn btn-primary btn-lg">Get In Touch <FaArrowRight /></Link>
            <Link to="/services" className="btn btn-outline-dark btn-lg">Our Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
