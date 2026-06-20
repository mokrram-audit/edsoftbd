import { Link } from 'react-router-dom';
import {
  FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaGithub,
  FaArrowUp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaWhatsapp
} from 'react-icons/fa';
import './Footer.css';

const socialIcons = {
  facebook: FaFacebook,
  twitter:  FaTwitter,
  linkedin: FaLinkedin,
  youtube:  FaYoutube,
  github:   FaGithub,
};

const footerNav = [
  {
    title: 'Company',
    links: [
      { label: 'Our Team',    to: '/about/leadership' },
      { label: 'Overview',    to: '/about/overview' },
      { label: 'Careers',     to: '/contact' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Services',      to: '/services' },
      { label: 'Portfolio',     to: '/portfolio' },
      { label: 'Technologies',  to: '/technologies' },
      { label: 'Contact Us',    to: '/contact' },
    ],
  },
];

export default function Footer({ company }) {
  return (
    <footer className="footer" role="contentinfo">
      {/* Main */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src="/white logo-01.png" alt="eData Software Limited" className="footer__logo-img" />
            </Link>
            <p className="footer__brand-desc">
              {company?.shortDescription ||
                'Leading ICT consultancy delivering cutting-edge software solutions across Bangladesh and beyond.'}
            </p>
            <address className="footer__address" aria-label="Contact information">
              {[
                { Icon: FaMapMarkerAlt, text: company?.address },
                { Icon: FaPhone,        text: company?.phone },
                { Icon: FaEnvelope,     text: company?.email },
                { Icon: FaGlobe,        text: company?.website },
              ].map(({ Icon, text }, i) => text && (
                <div key={i} className="footer__address-item">
                  <Icon aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </address>
            <nav className="footer__social" aria-label="Social media links">
              {company?.social && Object.entries(company.social).map(([key, url]) => {
                const Icon = socialIcons[key];
                if (!Icon) return null;
                return (
                  <a key={key} href={url} className="footer__social-link"
                     aria-label={`${company.name} on ${key}`}
                     target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Nav Columns */}
          {footerNav.map((col) => (
            <div key={col.title} className="footer__col">
              <h3 className="footer__col-title">{col.title}</h3>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__col-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            &copy; {new Date().getFullYear()} {company?.name || 'eData Software Limited'}. All rights reserved.
          </p>
        </div>
      </div>

      {/* WhatsApp Float */}
      <a
        href={`https://wa.me/${company?.whatsapp || '8801964661441'}`}
        className="footer__whatsapp"
        aria-label="Chat on WhatsApp"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>

      {/* Scroll Top */}
      <button
        className="footer__scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <FaArrowUp aria-hidden="true" />
      </button>
    </footer>
  );
}
