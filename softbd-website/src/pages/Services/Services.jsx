import { Link } from 'react-router-dom';
import {
  FaCode, FaCloud, FaMobileAlt, FaChartBar, FaShieldAlt, FaCogs,
  FaGraduationCap, FaPenNib, FaCubes, FaVideo, FaImages, FaPaintBrush,
  FaArrowRight, FaCheckCircle,
} from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import './Services.css';

const iconMap = {
  FaCode,
  FaCloud,
  FaMobile:            FaMobileAlt,
  FaChartBar,
  FaShieldAlt,
  FaCogs,
  FaChalkboardTeacher: FaGraduationCap,
  FaPencilRuler:       FaPenNib,
  FaCube:              FaCubes,
  FaFilm:              FaVideo,
  FaPhotoVideo:        FaImages,
  FaPalette:           FaPaintBrush,
};

export default function Services({ services }) {
  return (
    <div className="services-page page-enter">
      <PageBanner
        title="Our Services"
        subtitle="End-to-end technology services designed to accelerate your digital transformation."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services Grid */}
      <section className="section" aria-labelledby="services-list-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">What We Offer</div>
            <h2 id="services-list-title" className="section-title">
              Comprehensive <span>Technology Services</span>
            </h2>
            <p className="section-subtitle">
              From custom software to cloud infrastructure, our multidisciplinary team
              covers the full technology spectrum.
            </p>
          </div>

          <div className="srv-grid" role="list">
            {services.map((s, i) => {
              const Icon = iconMap[s.icon] || FaCode;
              return (
                <article key={s.id} className="srv-card" role="listitem"
                  style={{'--delay': `${i * 0.06}s`}}>
                  <div className="srv-card__header">
                    <div className="srv-card__icon"><Icon /></div>
                    <h3 className="srv-card__title">{s.title}</h3>
                  </div>
                  <p className="srv-card__desc">{s.description}</p>
                  <ul className="srv-card__features" aria-label={`Features of ${s.title}`}>
                    {s.features.map((f) => (
                      <li key={f} className="srv-card__feature">
                        <FaCheckCircle aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="srv-card__footer">
                    <Link to="/contact" className="btn btn-outline-dark btn-sm srv-card__btn">
                      Get Started <FaArrowRight aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section" style={{background:'var(--bg-light)'}} aria-labelledby="process-title">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">How We Work</div>
            <h2 id="process-title" className="section-title">
              Our <span>Delivery Process</span>
            </h2>
          </div>
          <div className="srv-process" role="list">
            {[
              { step:'01', title:'Discovery',       desc:'We learn your business goals, challenges, and requirements through structured workshops.' },
              { step:'02', title:'Planning',         desc:'Architecture, tech stack, timelines, and sprints are defined collaboratively with your team.' },
              { step:'03', title:'Development',      desc:'Agile sprints with regular demos keep you in the loop throughout development.' },
              { step:'04', title:'Testing & QA',     desc:'Rigorous automated and manual testing ensures quality before every release.' },
              { step:'05', title:'Deployment',       desc:'Smooth CI/CD-powered deployments with zero downtime and full rollback support.' },
              { step:'06', title:'Support & Growth', desc:'Ongoing monitoring, optimisation, and feature development post-launch.' },
            ].map((item) => (
              <div key={item.step} className="srv-process__item" role="listitem">
                <div className="srv-process__step" aria-hidden="true">{item.step}</div>
                <h3 className="srv-process__title">{item.title}</h3>
                <p className="srv-process__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container" style={{textAlign:'center'}}>
          <h2 className="section-title">Ready to Get <span>Started?</span></h2>
          <p className="section-subtitle" style={{margin:'0 auto 32px'}}>
            Tell us about your project — we'll respond within 24 hours.
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request a Free Consultation <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
