import { useEffect, useRef, useState } from 'react';
import { FaArrowRight, FaBriefcase, FaCalendarAlt, FaClock } from 'react-icons/fa';
import './Portfolio.css';

const categories = ['All', 'Government', 'Commercial', 'Financial', 'Education'];

export default function Portfolio({ projects }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      className={`portfolio section ${visible ? 'portfolio--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="portfolio-title"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaBriefcase /> Our Portfolio
          </div>
          <h2 id="portfolio-title" className="section-title">
            Proven Track Record of <span>Digital Success</span>
          </h2>
          <p className="section-subtitle">
            Each project represents our commitment to excellence. Explore our portfolio of transformative
            solutions across industries and geographies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="portfolio__filters" role="tablist" aria-label="Project category filters">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              className={`portfolio__filter ${filter === cat ? 'portfolio__filter--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="portfolio__grid" role="list">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              className="project-card"
              style={{ '--project-color': project.color, '--delay': `${i * 0.1}s` }}
              role="listitem"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
              tabIndex={0}
              aria-label={`Project: ${project.title}`}
            >
              {/* Image Area */}
              <div className="project-card__image" style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}44)` }} aria-hidden="true">
                <div className="project-card__image-inner">
                  <div className="project-card__image-icon" style={{ background: project.color }}>
                    <FaBriefcase />
                  </div>
                  <div className="project-card__tech-stack">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span key={t} className="project-card__tech">{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="project-card__tech">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
                <div className="project-card__overlay">
                  <span className="project-card__overlay-text">View Details</span>
                  <FaArrowRight />
                </div>
              </div>

              {/* Content */}
              <div className="project-card__content">
                <div className="project-card__meta">
                  <span className="project-card__category" style={{ color: project.color }}>
                    {project.industry}
                  </span>
                  <span className="project-card__year">
                    <FaCalendarAlt aria-hidden="true" /> {project.year}
                  </span>
                </div>

                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__client">
                  <strong>Client:</strong> {project.client}
                </p>
                <p className="project-card__desc">{project.description}</p>

                <div className="project-card__outcome" aria-label="Project outcome">
                  <span className="project-card__outcome-icon" aria-hidden="true">✓</span>
                  <span>{project.outcome}</span>
                </div>

                <div className="project-card__footer">
                  <span className="project-card__duration">
                    <FaClock aria-hidden="true" /> {project.duration}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="portfolio__more">
          <p className="portfolio__more-text">And many more successful projects across various industries</p>
          <button
            className="btn btn-outline-dark"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Your Project <FaArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
