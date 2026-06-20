import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import './PageBanner.css';

export default function PageBanner({ title, subtitle, breadcrumbs = [], bg }) {
  return (
    <section className="page-banner" style={bg ? { backgroundImage: `url(${bg})` } : {}}>
      <div className="page-banner__overlay" aria-hidden="true" />
      <div className="page-banner__pattern" aria-hidden="true" />
      <div className="container page-banner__inner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">{title}</h1>
          {subtitle && <p className="page-banner__subtitle">{subtitle}</p>}
        </div>
        {breadcrumbs.length > 0 && (
          <nav className="page-banner__breadcrumb" aria-label="Breadcrumb">
            <ol className="page-banner__breadcrumb-list">
              <li>
                <Link to="/" className="page-banner__breadcrumb-link">
                  <FaHome aria-hidden="true" /> Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="page-banner__breadcrumb-item">
                  <FaChevronRight className="page-banner__breadcrumb-sep" aria-hidden="true" />
                  {crumb.to ? (
                    <Link to={crumb.to} className="page-banner__breadcrumb-link">{crumb.label}</Link>
                  ) : (
                    <span className="page-banner__breadcrumb-current" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
}
