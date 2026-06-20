import { useEffect, useRef } from 'react';
import { FaArrowRight, FaPlay, FaCheckCircle } from 'react-icons/fa';
import './Hero.css';

const highlights = [
  '500+ Projects Delivered',
  '150+ Happy Clients',
  '25+ Countries Served',
  'ISO 27001 Certified',
];

export default function Hero({ company }) {
  const heroRef = useRef(null);

  // Parallax on scroll
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollY = window.scrollY;
      el.style.setProperty('--parallax-y', `${scrollY * 0.3}px`);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef} aria-label="Hero section">
      {/* Background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__grid" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="hero__particle" style={{ '--delay': `${i * 0.3}s`, '--x': `${Math.random() * 100}%` }} />
          ))}
        </div>
      </div>

      <div className="container hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <div className="hero__badge animate-slide-up" style={{ '--delay': '0s' }}>
            <span className="hero__badge-dot" aria-hidden="true" />
            Trusted by 150+ Global Enterprises
          </div>

          <h1 className="hero__title animate-slide-up" style={{ '--delay': '0.1s' }}>
            Turning Ideas Into
            <span className="hero__title-gradient"> Digital Excellence</span>
          </h1>

          <p className="hero__subtitle animate-slide-up" style={{ '--delay': '0.2s' }}>
            {company?.shortDescription ||
              'Leading ICT consultancy delivering cutting-edge software solutions that drive digital transformation across industries worldwide.'}
          </p>

          {/* Stats */}
          <div className="hero__stats animate-slide-up" style={{ '--delay': '0.3s' }} role="list" aria-label="Company statistics">
            {[
              { value: company?.projects || '500+', label: 'Projects' },
              { value: company?.clients || '150+', label: 'Clients' },
              { value: company?.countries || '25+', label: 'Countries' },
              { value: company?.employees || '200+', label: 'Experts' },
            ].map((stat) => (
              <div key={stat.label} className="hero__stat" role="listitem">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="hero__actions animate-slide-up" style={{ '--delay': '0.4s' }}>
            <button className="btn btn-primary btn-lg" onClick={() => scrollTo('services')}>
              Explore Services <FaArrowRight aria-hidden="true" />
            </button>
            <button className="btn btn-outline btn-lg hero__play-btn" onClick={() => scrollTo('portfolio')}>
              <span className="hero__play-icon" aria-hidden="true"><FaPlay /></span>
              View Portfolio
            </button>
          </div>

          {/* Highlights */}
          <ul className="hero__highlights animate-slide-up" style={{ '--delay': '0.5s' }} aria-label="Key highlights">
            {highlights.map((h) => (
              <li key={h} className="hero__highlight">
                <FaCheckCircle className="hero__highlight-icon" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Visual */}
        <div className="hero__visual animate-slide-right" style={{ '--delay': '0.3s' }} aria-hidden="true">
          <div className="hero__visual-card hero__visual-card--main">
            <div className="hero__visual-header">
              <div className="hero__visual-dots">
                <span style={{ background: '#EF4444' }} />
                <span style={{ background: '#F59E0B' }} />
                <span style={{ background: '#10B981' }} />
              </div>
              <span className="hero__visual-label">NovaERP Dashboard</span>
            </div>
            <div className="hero__visual-chart">
              {[60, 85, 45, 92, 70, 88, 55].map((h, i) => (
                <div
                  key={i}
                  className="hero__visual-bar"
                  style={{ height: `${h}%`, '--bar-delay': `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="hero__visual-metrics">
              <div className="hero__visual-metric">
                <span className="hero__visual-metric-val">↑ 32%</span>
                <span className="hero__visual-metric-lbl">Revenue</span>
              </div>
              <div className="hero__visual-metric">
                <span className="hero__visual-metric-val">↑ 18%</span>
                <span className="hero__visual-metric-lbl">Users</span>
              </div>
              <div className="hero__visual-metric">
                <span className="hero__visual-metric-val">↓ 24%</span>
                <span className="hero__visual-metric-lbl">Costs</span>
              </div>
            </div>
          </div>

          <div className="hero__visual-card hero__visual-card--sm hero__visual-card--top-right">
            <div className="hero__visual-avatar hero__visual-avatar--blue" />
            <div>
              <div className="hero__visual-name">Sarah Chen</div>
              <div className="hero__visual-role">CTO — CapitalBank</div>
            </div>
            <div className="hero__visual-rating">⭐ 5.0</div>
          </div>

          <div className="hero__visual-card hero__visual-card--sm hero__visual-card--bottom-left">
            <div className="hero__visual-ring">
              <svg viewBox="0 0 36 36" aria-label="92% project success rate">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none"
                  stroke="url(#heroGrad)"
                  strokeWidth="3"
                  strokeDasharray="92 8"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0A66C2" />
                    <stop offset="100%" stopColor="#0EA5E9" />
                  </linearGradient>
                </defs>
              </svg>
              <span>92%</span>
            </div>
            <div>
              <div className="hero__visual-name">Success Rate</div>
              <div className="hero__visual-role">Project Delivery</div>
            </div>
          </div>

          {/* Tech stack floating icons */}
          <div className="hero__tech-icons">
            {['⚛️', '🐍', '☁️', '📱', '🔒', '📊'].map((icon, i) => (
              <div
                key={i}
                className="hero__tech-icon animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
                aria-hidden="true"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        className="hero__scroll"
        onClick={() => scrollTo('about')}
        aria-label="Scroll to about section"
      >
        <div className="hero__scroll-line" aria-hidden="true" />
        <span>Scroll Down</span>
      </button>
    </section>
  );
}
