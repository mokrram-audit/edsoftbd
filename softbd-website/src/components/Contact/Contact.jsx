import { useEffect, useRef, useState } from 'react';
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe,
  FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaHeadset
} from 'react-icons/fa';
import { submitContactForm } from '../../services/api';
import './Contact.css';

const initialForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  service: '',
  message: '',
};

const services = [
  'Custom Software Development',
  'Cloud Solutions & DevOps',
  'Mobile App Development',
  'Data Analytics & BI',
  'Cybersecurity Services',
  'IT Consulting & Strategy',
  'Other',
];

export default function Contact({ company }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const validate = (data) => {
    const errs = {};
    if (!data.name.trim()) errs.name = 'Full name is required.';
    if (!data.email.trim()) errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email.';
    if (!data.message.trim()) errs.message = 'Please tell us about your project.';
    else if (data.message.trim().length < 20) errs.message = 'Message must be at least 20 characters.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(initialForm).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('loading');
    try {
      const result = await submitContactForm(form);
      if (result.success) {
        setStatus('success');
        setForm(initialForm);
        setTouched({});
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className={`contact section ${visible ? 'contact--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="contact-title"
      style={{ background: 'var(--bg-light)' }}
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaHeadset /> Contact Us
          </div>
          <h2 id="contact-title" className="section-title">
            Let's Build Something <span>Amazing Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Tell us about it. Our team will get back to you
            within 24 hours with expert insights and next steps.
          </p>
        </div>

        <div className="contact__layout">
          {/* Info Panel */}
          <aside className="contact__info" aria-label="Contact information">
            <div className="contact__info-header">
              <h3>Get In Touch</h3>
              <p>We'd love to hear from you. Reach out through any of these channels.</p>
            </div>

            <div className="contact__info-items" role="list">
              {[
                { icon: FaMapMarkerAlt, label: 'Address', value: company?.address, color: '#0A66C2' },
                { icon: FaPhone, label: 'Phone', value: company?.phone, color: '#10B981' },
                { icon: FaEnvelope, label: 'Email', value: company?.email, color: '#8B5CF6' },
                { icon: FaGlobe, label: 'Website', value: company?.website, color: '#F59E0B' },
              ].map(({ icon: Icon, label, value, color }) => (
                <div key={label} className="contact__info-item" role="listitem" style={{ '--item-color': color }}>
                  <div className="contact__info-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <div>
                    <span className="contact__info-label">{label}</span>
                    <span className="contact__info-value">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="contact__social" aria-label="Social media links">
              <p className="contact__social-label">Follow Us</p>
              <div className="contact__social-links">
                {company?.social && Object.entries(company.social).map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    className="contact__social-link"
                    aria-label={`Follow us on ${key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key.charAt(0).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>

            {/* Office Hours */}
            <div className="contact__hours" aria-label="Office hours">
              <p className="contact__hours-title">Office Hours</p>
              <div className="contact__hours-items">
                <div><span>Monday – Friday</span><span>9:00 AM – 6:00 PM</span></div>
                <div><span>Saturday</span><span>10:00 AM – 2:00 PM</span></div>
                <div><span>Sunday</span><span>Closed</span></div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="contact__form-wrapper" aria-label="Contact form">
            {status === 'success' ? (
              <div className="contact__success" role="alert" aria-live="polite">
                <div className="contact__success-icon" aria-hidden="true">
                  <FaCheckCircle />
                </div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setStatus(null)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact__form" noValidate aria-label="Contact form">
                <h3 className="contact__form-title">Send Us a Message</h3>

                {status === 'error' && (
                  <div className="contact__form-error" role="alert" aria-live="assertive">
                    <FaExclamationCircle aria-hidden="true" />
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name ? 'input--error' : ''}
                      aria-required="true"
                      aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                      aria-invalid={!!(errors.name && touched.name)}
                      autoComplete="name"
                    />
                    {errors.name && touched.name && (
                      <span id="name-error" className="contact__field-error" role="alert">{errors.name}</span>
                    )}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? 'input--error' : ''}
                      aria-required="true"
                      aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                      aria-invalid={!!(errors.email && touched.email)}
                      autoComplete="email"
                    />
                    {errors.email && touched.email && (
                      <span id="email-error" className="contact__field-error" role="alert">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="contact__form-row">
                  <div className="contact__field">
                    <label htmlFor="contact-company">Company Name</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      placeholder="Your Company"
                      value={form.company}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>
                  <div className="contact__field">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-service">Service of Interest</label>
                  <select
                    id="contact-service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">Select a service...</option>
                    {services.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="contact-message">Project Details <span aria-hidden="true">*</span></label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.message && touched.message ? 'input--error' : ''}
                    aria-required="true"
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                    aria-invalid={!!(errors.message && touched.message)}
                  />
                  {errors.message && touched.message && (
                    <span id="message-error" className="contact__field-error" role="alert">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg contact__submit"
                  disabled={status === 'loading'}
                  aria-busy={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="contact__spinner" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane aria-hidden="true" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="contact__privacy">
                  🔒 Your information is secure and will never be shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
