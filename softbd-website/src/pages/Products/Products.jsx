import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Products.css';

export default function Products({ products }) {
  const [active, setActive] = useState(0);
  const p = products[active];

  return (
    <div className="products-page page-enter">
      <PageBanner
        title="Products & Solutions"
        subtitle="Battle-tested enterprise products that drive efficiency and growth from day one."
        breadcrumbs={[{ label: 'Products' }]}
      />

      {/* Product Cards */}
      <section className="section" aria-labelledby="products-list-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Products</div>
            <h2 id="products-list-title" className="section-title">
              Ready-to-Deploy <span>Business Software</span>
            </h2>
            <p className="section-subtitle">
              Built for the Bangladeshi and regional market with global standards.
            </p>
          </div>

          <div className="prod-grid" role="list">
            {products.map((prod, i) => (
              <article key={prod.id} className="prod-card" role="listitem" style={{'--pg': prod.gradient}}>
                <div className="prod-card__hero" style={{background: prod.gradient}} aria-hidden="true">
                  <div className="prod-card__hero-deco" />
                  <span className="prod-card__hero-name">{prod.name}</span>
                  <span className="prod-card__hero-badge" style={{background:'rgba(255,255,255,0.25)'}}>{prod.badge}</span>
                </div>
                <div className="prod-card__body">
                  <h3 className="prod-card__title">{prod.name}</h3>
                  <p className="prod-card__category" style={{color: prod.badgeColor}}>{prod.category}</p>
                  <p className="prod-card__desc">{prod.description}</p>
                  <ul className="prod-card__features" aria-label={`Features of ${prod.name}`}>
                    {prod.features.map((f) => (
                      <li key={f}><FaCheckCircle aria-hidden="true" />{f}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="btn btn-sm prod-card__cta"
                    style={{background: prod.badgeColor, color:'white', borderColor: prod.badgeColor}}>
                    Request Demo <FaArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="section" style={{background:'var(--bg-light)'}} aria-labelledby="compare-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Compare</div>
            <h2 id="compare-title" className="section-title">
              Which Solution is <span>Right for You?</span>
            </h2>
          </div>
          <div className="prod-compare" role="table" aria-label="Product comparison table">
            <div className="prod-compare__header" role="row">
              <div role="columnheader">Feature</div>
              {products.map((p) => (
                <div key={p.id} role="columnheader" style={{color: p.badgeColor}}>{p.name}</div>
              ))}
            </div>
            {['Multi-company Support','Role-based Access','Mobile App','API Integration','Analytics Dashboard','Custom Reports','Cloud Hosting'].map((feature, fi) => (
              <div key={feature} className="prod-compare__row" role="row">
                <div role="cell" className="prod-compare__feature">{feature}</div>
                {products.map((p, pi) => (
                  <div key={p.id} role="cell">
                    <span className={`prod-compare__check ${pi <= fi % 3 + 1 ? 'prod-compare__check--yes' : 'prod-compare__check--no'}`}>
                      {pi <= fi % 3 + 1 ? '✓' : '—'}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="section-title">Not sure which product <span>fits best?</span></h2>
          <p className="section-subtitle" style={{margin:'0 auto 32px'}}>
            Our consultants will help you choose and customise the right solution for your business.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">Talk to an Expert <FaArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
