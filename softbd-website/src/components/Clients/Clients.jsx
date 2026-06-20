import { useEffect, useRef, useState } from 'react';
import { FaHandshake } from 'react-icons/fa';
import './Clients.css';

export default function Clients({ clients }) {
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

  // Duplicate for seamless marquee
  const doubled = [...clients, ...clients];

  return (
    <section
      id="clients"
      className={`clients section-sm ${visible ? 'clients--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="clients-title"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaHandshake /> Trusted Partners
          </div>
          <h2 id="clients-title" className="section-title">
            Trusted by <span>Industry Leaders</span>
          </h2>
          <p className="section-subtitle">
            We are proud to serve leading organizations across banking, retail, government,
            education, and more — building lasting partnerships through technology.
          </p>
        </div>
      </div>

      {/* Marquee - outside container for full-width */}
      <div className="clients__marquee-wrapper" aria-label="Client logos carousel" aria-live="off">
        <div className="clients__marquee-track" aria-hidden="true">
          {doubled.map((client, i) => (
            <div
              key={`${client.id}-${i}`}
              className="client-logo"
              style={{ '--client-color': client.color }}
            >
              <div className="client-logo__icon" aria-hidden="true">
                <span>{client.initials}</span>
              </div>
              <div className="client-logo__info">
                <span className="client-logo__name">{client.name}</span>
                <span className="client-logo__industry">{client.industry}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="container">
        <div className="clients__stats" role="list" aria-label="Client statistics">
          {[
            { value: '150+', label: 'Active Clients' },
            { value: '25+', label: 'Countries' },
            { value: '98%', label: 'Retention Rate' },
            { value: '4.9/5', label: 'Average Rating' },
          ].map((s) => (
            <div key={s.label} className="clients__stat" role="listitem">
              <span className="clients__stat-value">{s.value}</span>
              <span className="clients__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
