import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
  FaArrowRight, FaCheckCircle,
  FaCode, FaCloud, FaMobileAlt, FaChartBar, FaShieldAlt, FaCogs, FaChalkboardTeacher,
} from 'react-icons/fa';
import clientsData from '../../data/clients.json';
import './Home.css';

/* ── Quick service cards shown on home ── */
const homeServices = [
  { icon: FaCode,               title: 'Custom Software',    desc: 'Tailored web & desktop applications built for your exact business needs.',   color: '#0A66C2' },
  { icon: FaCloud,              title: 'Cloud & DevOps',     desc: 'Cloud migration, AWS / Azure architecture and CI/CD pipelines.',             color: '#0EA5E9' },
  { icon: FaMobileAlt,          title: 'Mobile Apps',        desc: 'Native and cross-platform iOS & Android applications.',                     color: '#8B5CF6' },
  { icon: FaChartBar,           title: 'Data Analytics & BI',desc: 'Business intelligence dashboards and predictive insights.',                 color: '#F59E0B' },
  { icon: FaShieldAlt,          title: 'Cybersecurity',      desc: 'Security audits, penetration testing, compliance and incident response.',   color: '#EF4444' },
  { icon: FaCogs,               title: 'IT Consulting',      desc: 'Digital transformation strategy and technology road-mapping.',              color: '#10B981' },
  { icon: FaChalkboardTeacher,  title: 'IT / ITES Training', desc: 'Professional IT training covering software development, BPO, supply chain management and e-safety.', color: '#6366F1' },
];

/* ── Intersection-observer hook ── */
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home({ company }) {
  const [servRef, servVisible] = useVisible();
  const [cliRef,  cliVisible]  = useVisible();

  // Duplicate clients for seamless marquee
  const doubled = [...clientsData, ...clientsData];

  return (
    <div className="home page-enter">

      {/* ════════════════════════════════ HERO ════════════════════════════════ */}
      <section id="home" className="hm-hero" aria-labelledby="hm-hero-title">
        {/* decorative bg orbs */}
        <div className="hm-hero__bg" aria-hidden="true">
          <div className="hm-hero__orb hm-hero__orb--1" />
          <div className="hm-hero__orb hm-hero__orb--2" />
          <div className="hm-hero__grid" />
        </div>

        <div className="container hm-hero__container">

          {/* BASIS badge */}
          <div className="hm-basis-badge" aria-label="Member of BASIS Bangladesh">
            <img src="/basis.png" alt="BASIS Bangladesh logo" className="hm-basis-badge__img" />
            <span>Member of <strong>BASIS Bangladesh</strong></span>
          </div>

          <h1 id="hm-hero-title" className="hm-hero__title">
            Empowering Business Through<br />
            <span className="hm-hero__title-highlight">Digital Innovation</span>
          </h1>

          <p className="hm-hero__subtitle">
            {company?.shortDescription ||
              'eData Software Limited is one of the leading IT solution companies in Bangladesh, delivering cutting-edge software products, training and consultancy services.'}
          </p>

          <div className="hm-hero__actions">
            <Link to="/services" className="btn btn-primary btn-lg">
              Explore Services <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Get Free Consultation
            </Link>
          </div>

          {/* Stats */}
          <div className="hm-hero__stats" role="list" aria-label="Key statistics">
            {[
              { value: company?.projects  || '300+', label: 'Projects Delivered' },
              { value: company?.clients   || '120+', label: 'Happy Clients'      },
              { value: company?.countries || '15+',  label: 'Countries Served'   },
              { value: company?.employees || '100+', label: 'Expert Team'        },
            ].map((s) => (
              <div key={s.label} className="hm-hero__stat" role="listitem">
                <span className="hm-hero__stat-value">{s.value}</span>
                <span className="hm-hero__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ ABOUT INTRO ════════════════════════ */}
      <section className="hm-about section-sm" aria-labelledby="hm-about-title">
        <div className="container hm-about__inner">

          {/* Left — text */}
          <div className="hm-about__text">
            <div className="section-badge" style={{ marginBottom: '16px' }}>About eData Software</div>
            <h2 id="hm-about-title" className="hm-about__title">
              A Trusted IT Partner<br />in Bangladesh
            </h2>
            <p className="hm-about__desc">
              Founded in 2015, eData Software Limited is a leading Information Technology solution company
              headquartered in Dhaka. We specialise in custom software development, cloud services,
              mobile applications, IT training and consultancy — serving clients across banking,
              government, retail, healthcare, and more.
            </p>
            <p className="hm-about__desc">
              As a proud member of <strong>BASIS</strong> (Bangladesh Association of Software and Information
              Services), we uphold the highest industry standards and contribute to the growth of
              Bangladesh's digital economy.
            </p>

            <ul className="hm-about__checks" aria-label="Company highlights">
              {[
                'Proud Member of BASIS Bangladesh',
                '300+ Successfully Delivered Projects',
                'Trusted by 120+ Global Businesses',
              ].map((h) => (
                <li key={h} className="hm-about__check">
                  <FaCheckCircle aria-hidden="true" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <Link to="/about/overview" className="btn btn-primary" style={{ marginTop: '8px' }}>
              Learn More About Us <FaArrowRight aria-hidden="true" />
            </Link>
          </div>

          {/* Right — BASIS card */}
          <div className="hm-about__card-wrap" aria-hidden="true">
            <div className="hm-basis-card">
              <div className="hm-basis-card__logo">
                <img src="/basis.png" alt="BASIS Bangladesh" className="hm-basis-card__img" />
              </div>
              <p className="hm-basis-card__title">Member of BASIS</p>
              <p className="hm-basis-card__sub">
                Bangladesh Association of Software<br />and Information Services
              </p>
              <div className="hm-basis-card__divider" />
              <div className="hm-basis-card__stats">
                <div>
                  <strong>{company?.founded || '2015'}</strong>
                  <span>Founded</span>
                </div>
                <div>
                  <strong>{company?.employees || '100+'}</strong>
                  <span>Experts</span>
                </div>
                <div>
                  <strong>{company?.projects || '300+'}</strong>
                  <span>Projects</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════ SERVICES ═══════════════════════════ */}
      <section
        className={`hm-services section ${servVisible ? 'hm-services--visible' : ''}`}
        ref={servRef}
        style={{ background: 'var(--bg-light)' }}
        aria-labelledby="hm-services-title"
      >
        <div className="container">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <div className="section-badge">What We Do</div>
            <h2 id="hm-services-title" className="section-title">
              Our Core <span>Service Areas</span>
            </h2>
            <p className="section-subtitle">
              End-to-end technology solutions tailored to your industry and business objectives.
            </p>
          </div>

          <div className="hm-services__grid" role="list">
            {homeServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="hm-service-card"
                  role="listitem"
                  style={{ '--sc-color': s.color, '--delay': `${i * 0.08}s` }}
                >
                  <div className="hm-service-card__icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3 className="hm-service-card__title">{s.title}</h3>
                  <p className="hm-service-card__desc">{s.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="hm-services__cta">
            <Link to="/services" className="btn btn-primary btn-lg">
              View All Services <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ CLIENTS ════════════════════════════ */}
      <section
        className={`hm-clients section ${cliVisible ? 'hm-clients--visible' : ''}`}
        ref={cliRef}
        aria-labelledby="hm-clients-title"
      >
        <div className="container">
          <div className="section-header" style={{ marginBottom: '48px' }}>
            <div className="section-badge">Our Clients</div>
            <h2 id="hm-clients-title" className="section-title">
              Trusted by <span>Industry Leaders</span>
            </h2>
            <p className="section-subtitle">
              We are proud to serve leading organisations across government, banking, telecom,
              retail, and more — building lasting partnerships through technology.
            </p>
          </div>
        </div>

        {/* Scrolling marquee — full width */}
        <div className="hm-clients__marquee" aria-label="Client logos" aria-live="off">
          <div className="hm-clients__track" aria-hidden="true">
            {doubled.map((client, i) => (
              <div
                key={`${client.id}-${i}`}
                className="hm-client-chip"
                style={{ '--chip-color': client.color }}
              >
                <span className="hm-client-chip__initials">{client.initials}</span>
                <span className="hm-client-chip__name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row — reverse direction */}
        <div className="hm-clients__marquee hm-clients__marquee--reverse" aria-hidden="true">
          <div className="hm-clients__track hm-clients__track--rev">
            {doubled.map((client, i) => (
              <div
                key={`rev-${client.id}-${i}`}
                className="hm-client-chip"
                style={{ '--chip-color': client.color }}
              >
                <span className="hm-client-chip__initials">{client.initials}</span>
                <span className="hm-client-chip__name">{client.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="container">
          <div className="hm-clients__stats" role="list" aria-label="Client statistics">
            {[
              { value: '120+',  label: 'Active Clients'  },
              { value: '15+',   label: 'Countries'       },
              { value: '98%',   label: 'Retention Rate'  },
              { value: '4.9/5', label: 'Average Rating'  },
            ].map((s) => (
              <div key={s.label} className="hm-clients__stat" role="listitem">
                <span className="hm-clients__stat-value">{s.value}</span>
                <span className="hm-clients__stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
