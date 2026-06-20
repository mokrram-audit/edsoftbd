import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Leadership.css';

export default function Leadership({ team }) {
  const all = team || [];

  const executives = all.filter((m) => m.id <= 4);
  const management = all.filter((m) => m.id === 5);
  const staff      = all.filter((m) => m.id > 5);

  const MemberCard = ({ member }) => (
    <div className="ldr-card">
      <div className="ldr-card__photo">
        {member.photo ? (
          <img src={member.photo} alt={member.name} loading="lazy" />
        ) : (
          <div
            className="ldr-card__avatar"
            style={{ background: `linear-gradient(160deg, ${member.color}, ${member.color}88)` }}
          >
            {member.initials}
          </div>
        )}
      </div>
      <div className="ldr-card__info">
        <h3 className="ldr-card__name">{member.name}</h3>
        <p className="ldr-card__role">{member.role}</p>
        {member.department && member.department !== 'Executive' && (
          <p className="ldr-card__dept">{member.department}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="leadership-page page-enter">
      <PageBanner
        title="Our Team"
        subtitle="The people behind eData Software Limited."
        breadcrumbs={[{ label: 'About', to: '/about' }, { label: 'Leadership' }]}
      />

      {/* ── Board / Executive ── */}
      <section className="section ldr-section" aria-labelledby="exec-heading">
        <div className="container">
          <h2 id="exec-heading" className="ldr-section__title">Board of Directors</h2>
          <div className="ldr-grid ldr-grid--center">
            {executives.map((m) => <MemberCard key={m.id} member={m} />)}
          </div>
        </div>
      </section>

      {/* ── Management ── */}
      {management.length > 0 && (
        <section className="section ldr-section ldr-section--alt" aria-labelledby="mgmt-heading">
          <div className="container">
            <h2 id="mgmt-heading" className="ldr-section__title">Top Management</h2>
            <div className="ldr-grid ldr-grid--center">
              {management.map((m) => <MemberCard key={m.id} member={m} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Staff ── */}
      {staff.length > 0 && (
        <section className="section ldr-section" aria-labelledby="staff-heading">
          <div className="container">
            <h2 id="staff-heading" className="ldr-section__title">Our Team Members</h2>
            <div className="ldr-grid">
              {staff.map((m) => <MemberCard key={m.id} member={m} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="section-sm ldr-cta" aria-labelledby="ldr-cta-title">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 id="ldr-cta-title" className="section-title">
            Want to Work With <span>Our Team?</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            We're always looking for talented people and great projects.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Get In Touch <FaArrowRight />
            </Link>
            <Link to="/about/overview" className="btn btn-outline-dark btn-lg">
              Company Overview
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
