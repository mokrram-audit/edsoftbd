import {
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava, FaPhp,
  FaApple, FaAndroid, FaAws, FaGoogle, FaDocker, FaLinux, FaGithub,
  FaDatabase, FaChartBar, FaSearch, FaBug, FaShieldAlt, FaLock,
  FaNetworkWired, FaVideo, FaFilm, FaEye, FaMagic, FaGraduationCap,
  FaBookOpen, FaFileWord, FaPaintBrush, FaPalette, FaCubes, FaPenNib,
  FaCode, FaMobileAlt, FaBrain, FaServer, FaLayerGroup, FaArrowRight,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Technologies.css';

/* ── Icon map for grouped sections ──────────────────────── */
const iconMap = {
  FaReact, FaVuejs, FaAngular, FaNodeJs, FaPython, FaJava, FaPhp,
  FaApple, FaAndroid, FaAws, FaGoogle, FaDocker, FaLinux, FaGithub,
  FaDatabase, FaChartBar, FaSearch, FaBug, FaShieldAlt, FaLock,
  FaNetworkWired, FaVideo, FaFilm, FaEye, FaMagic, FaGraduationCap,
  FaBookOpen, FaFileWord, FaPaintBrush, FaPalette, FaCubes, FaPenNib,
  FaCode, FaMobile: FaMobileAlt, FaBrain, FaServer, FaLayerGroup,
};

export default function Technologies({ technologies }) {
  return (
    <div className="tech-page page-enter">
      <PageBanner
        title="Technologies"
        subtitle="The tools and platforms behind every service we deliver."
        breadcrumbs={[{ label: 'Technologies' }]}
      />

      {/* ── Grouped Sections ── */}
      <section className="section" aria-labelledby="tech-groups-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Technologies</div>
            <h2 id="tech-groups-title" className="section-title">
              A Full Spectrum of <span>Modern Technologies</span>
            </h2>
            <p className="section-subtitle">
              A full spectrum of modern technologies is used to build scalable, secure, and
              future-ready solutions. From frontend to backend, mobile to cloud, the focus
              is on proven stacks that support successful digital products.
            </p>
          </div>

          <div className="tech-groups">
            {technologies.map((cat, ci) => (
              <div key={cat.category} className="tech-group">
                <div className="tech-group__label">
                  <span className="tech-group__num">{String(ci + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="tech-group__title">{cat.category}</h3>
                    {cat.description && (
                      <p className="tech-group__desc">{cat.description}</p>
                    )}
                  </div>
                </div>

                <div className="tech-group__items">
                  {cat.items.map((item) => {
                    const Icon = iconMap[item.icon] || FaCode;
                    return (
                      <div key={item.name} className="tech-item">
                        <div className="tech-item__icon"><Icon /></div>
                        <span className="tech-item__name">{item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm tech-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title" style={{ color: 'white' }}>
            Not Sure Which Stack <span style={{ color: 'var(--accent)' }}>Fits Your Project?</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '32px', fontSize: '16px' }}>
            Our team will help you choose the right technology for your exact requirements.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Talk to an Expert <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
