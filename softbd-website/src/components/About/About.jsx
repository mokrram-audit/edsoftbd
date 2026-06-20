import { useEffect, useRef, useState } from 'react';
import { FaAward, FaUsers, FaGlobe, FaRocket, FaCheckCircle } from 'react-icons/fa';
import './About.css';

const iconMap = {
  award: FaAward,
  users: FaUsers,
  globe: FaGlobe,
  rocket: FaRocket,
};

export default function About({ company }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const milestones = [
    { year: '2009', event: 'Company Founded', desc: 'Started with a vision to revolutionize software development.' },
    { year: '2013', event: 'First 50 Clients', desc: 'Expanded to serve clients across Southeast Asia.' },
    { year: '2017', event: 'ISO Certification', desc: 'Achieved ISO 27001 and ISO 9001 certifications.' },
    { year: '2021', event: 'Global Expansion', desc: 'Established offices in 5 continents.' },
    { year: '2024', event: '500+ Projects', desc: 'Delivered over 500 successful digital solutions.' },
  ];

  return (
    <section id="about" className={`about section ${visible ? 'about--visible' : ''}`} ref={sectionRef} aria-labelledby="about-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaAward /> About Us
          </div>
          <h2 id="about-title" className="section-title">
            15+ Years of <span>Engineering Excellence</span>
          </h2>
          <p className="section-subtitle">
            We are a premier ICT consultancy passionate about transforming businesses through technology.
            Our team of 200+ experts brings deep domain knowledge and relentless innovation to every project.
          </p>
        </div>

        {/* Main Grid */}
        <div className="about__grid">
          {/* Left: Image Visual */}
          <div className="about__visual" aria-hidden="true">
            <div className="about__visual-main">
              <div className="about__visual-pattern" />
              <div className="about__visual-content">
                <div className="about__visual-icon-wrap">
                  <FaRocket className="about__visual-icon" />
                </div>
                <h3 className="about__visual-title">Building the Future</h3>
                <p className="about__visual-text">Innovation at every level of development</p>
              </div>

              {/* Floating cards */}
              <div className="about__float-card about__float-card--1">
                <span className="about__float-card-value">{company?.founded || '2009'}</span>
                <span className="about__float-card-label">Year Founded</span>
              </div>
              <div className="about__float-card about__float-card--2">
                <span className="about__float-card-value">98%</span>
                <span className="about__float-card-label">Client Retention</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="about__content">
            <p className="about__description">
              {company?.description ||
                'TechNova Solutions is a premier global ICT consultancy and software development company dedicated to empowering businesses through innovative technology solutions.'}
            </p>

            {/* Values */}
            <div className="about__values" role="list" aria-label="Company values">
              {(company?.values || []).map((v, i) => (
                <div key={i} className="about__value-item" role="listitem">
                  <FaCheckCircle className="about__value-icon" aria-hidden="true" />
                  <div>
                    <h4 className="about__value-title">{v.title}</h4>
                    <p className="about__value-text">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="about__stats" role="list" aria-label="Key statistics">
              {[
                { icon: FaUsers, value: company?.employees || '200+', label: 'Expert Team', color: '#0A66C2' },
                { icon: FaGlobe, value: company?.countries || '25+', label: 'Countries', color: '#10B981' },
                { icon: FaAward, value: '15+', label: 'Years', color: '#8B5CF6' },
                { icon: FaRocket, value: company?.projects || '500+', label: 'Projects', color: '#F59E0B' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="about__stat-card" role="listitem" style={{ '--stat-color': stat.color }}>
                    <div className="about__stat-icon" aria-hidden="true">
                      <Icon />
                    </div>
                    <span className="about__stat-value">{stat.value}</span>
                    <span className="about__stat-label">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="about__timeline" role="list" aria-label="Company milestones">
          <h3 className="about__timeline-title">Our Journey</h3>
          <div className="about__timeline-track">
            {milestones.map((m, i) => (
              <div key={i} className="about__milestone" role="listitem">
                <div className="about__milestone-dot" aria-hidden="true" />
                <div className="about__milestone-content">
                  <span className="about__milestone-year">{m.year}</span>
                  <h4 className="about__milestone-event">{m.event}</h4>
                  <p className="about__milestone-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
