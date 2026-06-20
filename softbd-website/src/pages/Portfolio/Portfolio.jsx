import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLaptopCode, FaBuilding, FaShoppingCart, FaHeartbeat,
  FaGraduationCap, FaMoneyBillWave, FaUsers, FaLandmark, FaArrowRight,
} from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Portfolio.css';

const categories = [
  { label: 'All',                   icon: FaLaptopCode    },
  { label: 'Government',            icon: FaLandmark      },
  { label: 'Enterprise',            icon: FaBuilding      },
  { label: 'Accounting & Finance',  icon: FaMoneyBillWave },
  { label: 'Retail & Commerce',     icon: FaShoppingCart  },
  { label: 'Healthcare',            icon: FaHeartbeat     },
  { label: 'HR & Payroll',          icon: FaUsers         },
  { label: 'Education',             icon: FaGraduationCap },
];

export default function Portfolio({ projects }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <div className="portfolio-page page-enter">
      <PageBanner
        title="Our Portfolio"
        subtitle="A showcase of software products built across industries — from finance and healthcare to retail and education."
        breadcrumbs={[{ label: 'Portfolio' }]}
      />

      <section className="section" aria-labelledby="portfolio-list-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Software Products</div>
            <h2 id="portfolio-list-title" className="section-title">
              Proven Solutions Across <span>Every Industry</span>
            </h2>
            <p className="section-subtitle">
              Every product below is a real solution we have built — click a category
              to filter by industry.
            </p>
          </div>

          {/* ── Category Tabs ── */}
          <div className="pf-tabs" role="tablist" aria-label="Product categories">
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                role="tab"
                aria-selected={filter === label}
                className={`pf-tab ${filter === label ? 'pf-tab--active' : ''}`}
                onClick={() => setFilter(label)}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          {/* ── Count ── */}
          <p className="pf-count" aria-live="polite">
            Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
            {filter !== 'All' && <> in <em>{filter}</em></>}
          </p>

          {/* ── Grid ── */}
          <div className="pf-grid" role="list">
            {filtered.map((p, i) => (
              <article
                key={p.id}
                className="pf-card"
                role="listitem"
                style={{ '--delay': `${(i % 9) * 0.05}s` }}
              >
                <div className="pf-card__body">
                  {/* Industry badge */}
                  <div className="pf-card__meta">
                    <span className="pf-card__industry">
                      {p.industry}
                    </span>
                  </div>

                  <h3 className="pf-card__title">{p.title}</h3>
                  <p className="pf-card__desc">{p.description}</p>

                  {/* Tech tags */}
                  <div className="pf-card__tags">
                    {p.technologies.map((t) => (
                      <span key={t} className="pf-card__tag">{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: 'var(--secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: 'white' }}>
            Need a Custom <span>Software Solution?</span>
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.65)', margin: '0 auto 32px' }}>
            We build tailored software for your exact business requirements.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Start Your Project <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
