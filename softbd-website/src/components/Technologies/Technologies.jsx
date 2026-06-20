import { useEffect, useRef, useState } from 'react';
import {
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava,
  FaPhp, FaApple, FaAndroid, FaAws, FaGoogle, FaDocker
} from 'react-icons/fa';
import { FaCode } from 'react-icons/fa';
import './Technologies.css';

const iconMap = {
  FaReact: FaReact,
  FaVuejs: FaVuejs,
  FaAngular: FaAngular,
  FaNodeJs: FaNodeJs,
  FaPython: FaPython,
  FaJava: FaJava,
  FaPhp: FaPhp,
  FaApple: FaApple,
  FaAndroid: FaAndroid,
  FaAws: FaAws,
  FaGoogle: FaGoogle,
  FaDocker: FaDocker,
};

export default function Technologies({ technologies }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);

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
      id="technologies"
      className={`technologies section ${visible ? 'technologies--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="tech-title"
      style={{ background: 'var(--dark)' }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge technologies__badge" aria-hidden="true">
            <FaCode /> Technology Stack
          </div>
          <h2 id="tech-title" className="section-title" style={{ color: 'white' }}>
            Built With <span>Industry-Leading</span> Technologies
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.6)' }}>
            We carefully select the best tools for each project, leveraging modern frameworks
            and platforms to deliver robust, future-proof solutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="tech__tabs" role="tablist" aria-label="Technology categories">
          {technologies.map((cat, i) => (
            <button
              key={cat.category}
              role="tab"
              aria-selected={activeCategory === i}
              aria-controls={`tech-panel-${i}`}
              id={`tech-tab-${i}`}
              className={`tech__tab ${activeCategory === i ? 'tech__tab--active' : ''}`}
              style={{ '--cat-color': cat.color }}
              onClick={() => setActiveCategory(i)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        {technologies[activeCategory] && (
          <div
            className="tech__grid"
            role="tabpanel"
            id={`tech-panel-${activeCategory}`}
            aria-labelledby={`tech-tab-${activeCategory}`}
            key={activeCategory}
          >
            {technologies[activeCategory].items.map((item, i) => {
              const Icon = iconMap[item.icon] || FaCode;
              return (
                <div
                  key={item.name}
                  className="tech__item"
                  style={{ '--item-color': technologies[activeCategory].color, '--delay': `${i * 0.1}s` }}
                >
                  <div className="tech__item-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <span className="tech__item-name">{item.name}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* All Technologies banner */}
        <div className="tech__all-banner" aria-label="All technology categories overview">
          {technologies.map((cat) => (
            <div key={cat.category} className="tech__all-item" style={{ '--cat-color': cat.color }}>
              <div className="tech__all-dot" aria-hidden="true" />
              <span>{cat.category}</span>
              <span className="tech__all-count">{cat.items.length}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
