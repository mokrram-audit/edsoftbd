import { useEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaArrowRight, FaBoxOpen } from 'react-icons/fa';
import './Products.css';

export default function Products({ products }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const activeProduct = products[active];

  return (
    <section
      id="products"
      className={`products section ${visible ? 'products--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="products-title"
      style={{ background: 'var(--bg-light)' }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaBoxOpen /> Products & Solutions
          </div>
          <h2 id="products-title" className="section-title">
            Ready-to-Deploy <span>Business Solutions</span>
          </h2>
          <p className="section-subtitle">
            Our suite of enterprise products is battle-tested across industries, delivering measurable
            results from day one.
          </p>
        </div>

        <div className="products__layout">
          {/* Tabs */}
          <div className="products__tabs" role="tablist" aria-label="Product tabs">
            {products.map((p, i) => (
              <button
                key={p.id}
                role="tab"
                aria-selected={active === i}
                aria-controls={`product-panel-${p.id}`}
                id={`product-tab-${p.id}`}
                className={`products__tab ${active === i ? 'products__tab--active' : ''}`}
                onClick={() => setActive(i)}
                style={{ '--tab-gradient': p.gradient }}
              >
                <div className="products__tab-indicator" aria-hidden="true" />
                <div className="products__tab-content">
                  <span className="products__tab-name">{p.name}</span>
                  <span className="products__tab-category">{p.category}</span>
                </div>
                {i === active && (
                  <span
                    className="products__tab-badge"
                    style={{ background: p.badgeColor }}
                    aria-label={`Badge: ${p.badge}`}
                  >
                    {p.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Panel */}
          {activeProduct && (
            <div
              className="products__panel"
              role="tabpanel"
              id={`product-panel-${activeProduct.id}`}
              aria-labelledby={`product-tab-${activeProduct.id}`}
              key={activeProduct.id}
            >
              <div className="products__panel-left">
                {/* Product hero */}
                <div className="products__hero" style={{ background: activeProduct.gradient }} aria-hidden="true">
                  <div className="products__hero-pattern" />
                  <div className="products__hero-content">
                    <h3 className="products__hero-name">{activeProduct.name}</h3>
                    <p className="products__hero-tagline">{activeProduct.tagline}</p>
                    <span
                      className="products__hero-badge"
                      style={{ background: 'rgba(255,255,255,0.2)' }}
                    >
                      {activeProduct.badge}
                    </span>
                  </div>
                  {/* Decorative elements */}
                  <div className="products__hero-deco products__hero-deco--1" />
                  <div className="products__hero-deco products__hero-deco--2" />
                </div>
              </div>

              <div className="products__panel-right">
                <div className="products__panel-badge" style={{ background: activeProduct.badgeColor }}>
                  {activeProduct.badge}
                </div>
                <h3 className="products__panel-name">{activeProduct.name}</h3>
                <p className="products__panel-category">{activeProduct.category}</p>
                <p className="products__panel-desc">{activeProduct.description}</p>

                <h4 className="products__panel-features-title">Key Features</h4>
                <ul className="products__panel-features" aria-label={`Features of ${activeProduct.name}`}>
                  {activeProduct.features.map((f) => (
                    <li key={f} className="products__panel-feature">
                      <FaCheckCircle className="products__feature-icon" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="products__panel-actions">
                  <button className="btn btn-primary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    Request Demo <FaArrowRight aria-hidden="true" />
                  </button>
                  <button className="btn btn-outline-dark">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
