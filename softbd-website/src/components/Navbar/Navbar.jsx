import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import './Navbar.css';

const aboutDropdown = [
  { label: 'Overview',   to: '/about/overview'   },
  { label: 'Leadership', to: '/about/leadership' },
];

const navLinks = [
  { label: 'Home',         to: '/' },
  { label: 'About',        to: '/about',        dropdown: aboutDropdown },
  { label: 'Services',     to: '/services' },
  { label: 'Portfolio',    to: '/portfolio' },
  { label: 'Technologies', to: '/technologies' },
  { label: 'Contact',      to: '/contact' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);
  const location = useLocation();

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 60), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMenuOpen(false);
    setMobileOpen(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo" aria-label="eData Software Limited home">
            <img src="/white logo-01.png" alt="eData Software Limited" className="navbar__logo-img navbar__logo-img--white" />
            <img src="/edata soft-02.png"  alt="eData Software Limited" className="navbar__logo-img navbar__logo-img--color" />
          </Link>

          {/* Desktop Links */}
          <ul className="navbar__links" role="menubar">
            {navLinks.map((link) => (
              <li
                key={link.to}
                className={`navbar__item ${link.dropdown ? 'navbar__item--has-dropdown' : ''}`}
                role="none"
              >
                {link.dropdown ? (
                  <>
                    {/* Trigger — styled as a link, dropdown opens on CSS :hover of the <li> */}
                    <span
                      role="menuitem"
                      className={`navbar__link navbar__link--drop-trigger ${isActive(link.to) ? 'navbar__link--active' : ''}`}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <FaChevronDown className="navbar__chevron" aria-hidden="true" />
                    </span>

                    <div className="navbar__dropdown" role="menu" aria-label={`${link.label} submenu`}>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          role="menuitem"
                          className="navbar__dropdown-link"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.to}
                    role="menuitem"
                    className={`navbar__link ${isActive(link.to) ? 'navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link to="/contact" className="btn btn-primary navbar__cta">
            Get In Touch
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobile navigation"
      >
        <div className="navbar__mobile-logo">
          <img src="/edata soft-02.png" alt="eData Software Limited" />
        </div>
        <ul className="navbar__mobile-list">
          {navLinks.map((link) => (
            <li key={link.to}>
              {link.dropdown ? (
                <>
                  <button
                    className={`navbar__mobile-link navbar__mobile-link--btn ${isActive(link.to) ? 'navbar__mobile-link--active' : ''}`}
                    onClick={() => setMobileOpen(mobileOpen === link.label ? null : link.label)}
                    aria-expanded={mobileOpen === link.label}
                  >
                    {link.label}
                    <FaChevronDown
                      className="navbar__mobile-chevron"
                      style={{ transform: mobileOpen === link.label ? 'rotate(180deg)' : 'none' }}
                      aria-hidden="true"
                    />
                  </button>
                  {mobileOpen === link.label && (
                    <ul className="navbar__mobile-submenu">
                      {link.dropdown.map((item) => (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className="navbar__mobile-sublink"
                            onClick={() => setMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.to.split('#')[0]}
                  className={`navbar__mobile-link ${isActive(link.to) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <Link
          to="/contact"
          className="btn btn-primary"
          style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
          onClick={() => setMenuOpen(false)}
        >
          Get In Touch
        </Link>
      </div>
    </>
  );
}
