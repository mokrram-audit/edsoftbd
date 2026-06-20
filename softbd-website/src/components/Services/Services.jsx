import { useEffect, useRef, useState } from 'react';
import {
  FaCode, FaCloud, FaMobileAlt, FaChartBar, FaShieldAlt, FaCogs,
  FaArrowRight, FaLaptopCode
} from 'react-icons/fa';
import './Services.css';

const iconMap = {
  FaCode: FaCode,
  FaCloud: FaCloud,
  FaMobile: FaMobileAlt,
  FaChartBar: FaChartBar,
  FaShieldAlt: FaShieldAlt,
  FaCogs: FaCogs,
};

export default function Services({ services }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className={`services section ${visible ? 'services--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="services-title"
    >
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaLaptopCode /> Our Services
          </div>
          <h2 id="services-title" className="section-title">
            Comprehensive <span>Technology Services</span>
          </h2>
          <p className="section-subtitle">
            From concept to deployment, we deliver end-to-end technology solutions tailored to your
            industry needs and business objectives.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services__grid" role="list">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || FaCode;
            const isActive = activeService === service.id;
            return (
              <article
                key={service.id}
                className={`service-card ${isActive ? 'service-card--active' : ''}`}
                style={{ '--card-color': service.color, '--delay': `${i * 0.1}s` }}
                role="listitem"
                onMouseEnter={() => setActiveService(service.id)}
                onMouseLeave={() => setActiveService(null)}
                tabIndex={0}
                onFocus={() => setActiveService(service.id)}
                onBlur={() => setActiveService(null)}
                aria-label={`Service: ${service.title}`}
              >
                {/* Icon */}
                <div className="service-card__icon" aria-hidden="true">
                  <Icon />
                </div>

                {/* Content */}
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.shortDescription}</p>

                {/* Features */}
                <ul className="service-card__features" aria-label={`Features of ${service.title}`}>
                  {service.features.map((f) => (
                    <li key={f} className="service-card__feature">
                      <span className="service-card__feature-dot" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="service-card__link" aria-hidden="true">
                  <span>Learn More</span>
                  <FaArrowRight />
                </div>

                {/* Hover bg */}
                <div className="service-card__bg" aria-hidden="true" />
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="services__cta">
          <p className="services__cta-text">
            Don't see your specific need? We tailor solutions to match your unique requirements.
          </p>
          <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Discuss Your Project <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
