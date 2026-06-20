import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaPaperPlane, FaCheckCircle, FaHeadset } from 'react-icons/fa';
import PageBanner from '../../components/PageBanner/PageBanner';
import { submitContactForm } from '../../services/api';
import './Contact.css';

const initForm = { name:'', email:'', company:'', phone:'', service:'', message:'' };
const serviceOptions = [
  'Custom Software Development','Cloud Solutions & DevOps','Mobile App Development',
  'Data Analytics & BI','Cybersecurity Services','IT Consulting & Strategy','Other',
];

export default function Contact({ company }) {
  const [form, setForm]     = useState(initForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null);

  const validate = (data) => {
    const e = {};
    if (!data.name.trim())    e.name    = 'Full name is required.';
    if (!data.email.trim())   e.email   = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email.';
    if (!data.message.trim()) e.message = 'Please describe your project.';
    else if (data.message.trim().length < 20) e.message = 'Message must be at least 20 characters.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: validate({ ...form, [name]: value })[name] }));
  };
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(initForm).map((k) => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus('loading');
    try {
      const res = await submitContactForm(form);
      setStatus(res.success ? 'success' : 'error');
      if (res.success) { setForm(initForm); setTouched({}); setErrors({}); }
    } catch { setStatus('error'); }
  };

  return (
    <div className="contact-page page-enter">
      <PageBanner
        title="Contact Us"
        subtitle="Reach out to start a conversation — we'll get back to you within 24 hours."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      {/* Map placeholder + info */}
      <section className="contact-top" aria-label="Contact information">
        <div className="container contact-top__grid">
          {[
            { Icon: FaMapMarkerAlt, label:'Address',  val: company?.address, color:'var(--primary)' },
            { Icon: FaPhone,        label:'Phone',    val: company?.phone,   color:'#10B981' },
            { Icon: FaEnvelope,     label:'Email',    val: company?.email,   color:'#8B5CF6' },
            { Icon: FaGlobe,        label:'Website',  val: company?.website, color:'var(--accent)' },
          ].map(({ Icon, label, val, color }) => (
            <div key={label} className="contact-info-card" style={{'--cic': color}}>
              <div className="contact-info-card__icon"><Icon /></div>
              <div>
                <div className="contact-info-card__label">{label}</div>
                <div className="contact-info-card__val">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Side Info */}
      <section className="section" aria-labelledby="contact-form-title">
        <div className="container">
          <div className="contact-layout">
            {/* Side Info */}
            <aside className="contact-side" aria-label="Additional contact information">
              <div className="contact-side__inner">
                <h3 className="contact-side__title">
                  <FaHeadset aria-hidden="true" /> Let's Talk
                </h3>
                <p className="contact-side__text">
                  Whether you have a project in mind, need a quick consultation, or just want to learn
                  more about what eData can do for your business — we're here to help.
                </p>
                <div className="contact-side__hours" aria-label="Office hours">
                  <div className="contact-side__hours-title">Office Hours</div>
                  {[
                    ['Monday – Friday', '9:00 AM – 6:00 PM'],
                    ['Saturday',        '10:00 AM – 2:00 PM'],
                    ['Sunday',          'Closed'],
                  ].map(([day, time]) => (
                    <div key={day} className="contact-side__hours-row">
                      <span>{day}</span><span>{time}</span>
                    </div>
                  ))}
                </div>
                <div className="contact-side__social" aria-label="Social media links">
                  <div className="contact-side__social-label">Follow eData</div>
                  <div className="contact-side__social-links">
                    {company?.social && Object.entries(company.social).map(([key, url]) => (
                      <a key={key} href={url} className="contact-side__social-link"
                        aria-label={`eData on ${key}`} target="_blank" rel="noopener noreferrer">
                        {key[0].toUpperCase()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Form */}
            <div className="contact-form-wrap">
              {status === 'success' ? (
                <div className="contact-success" role="alert" aria-live="polite">
                  <div className="contact-success__icon" aria-hidden="true"><FaCheckCircle /></div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setStatus(null)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate aria-label="Contact form">
                  <h2 id="contact-form-title" className="contact-form__title">Send Us a Message</h2>
                  {status === 'error' && (
                    <div className="contact-form__err" role="alert" aria-live="assertive">
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}
                  <div className="cf-row">
                    {[
                      { id:'contact-name',    name:'name',    type:'text',  label:'Full Name',      req:true,  ph:'John Smith',         auto:'name'         },
                      { id:'contact-email',   name:'email',   type:'email', label:'Email Address',  req:true,  ph:'john@company.com',   auto:'email'        },
                      { id:'contact-company', name:'company', type:'text',  label:'Company',        req:false, ph:'Your Company',       auto:'organization' },
                      { id:'contact-phone',   name:'phone',   type:'tel',   label:'Phone',          req:false, ph:'+880-1700-000000',   auto:'tel'          },
                    ].map(({ id, name, type, label, req, ph, auto }) => (
                      <div key={name} className="cf-field">
                        <label htmlFor={id}>{label} {req && <span aria-hidden="true">*</span>}</label>
                        <input id={id} type={type} name={name} placeholder={ph}
                          value={form[name]} onChange={handleChange} onBlur={handleBlur}
                          autoComplete={auto}
                          className={errors[name] && touched[name] ? 'cf-input--err' : ''}
                          aria-required={req} aria-invalid={!!(errors[name] && touched[name])}
                        />
                        {errors[name] && touched[name] && (
                          <span className="cf-field__err" role="alert">{errors[name]}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="cf-field" style={{marginBottom:'16px'}}>
                    <label htmlFor="contact-service">Service of Interest</label>
                    <select id="contact-service" name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service...</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="cf-field" style={{marginBottom:'20px'}}>
                    <label htmlFor="contact-msg">Project Details <span aria-hidden="true">*</span></label>
                    <textarea id="contact-msg" name="message" rows={5}
                      placeholder="Tell us about your project, timeline, and goals..."
                      value={form.message} onChange={handleChange} onBlur={handleBlur}
                      className={errors.message && touched.message ? 'cf-input--err' : ''}
                      aria-required="true" aria-invalid={!!(errors.message && touched.message)}
                    />
                    {errors.message && touched.message && (
                      <span className="cf-field__err" role="alert">{errors.message}</span>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg cf-submit"
                    disabled={status === 'loading'} aria-busy={status === 'loading'}>
                    {status === 'loading'
                      ? <><span className="cf-spinner" aria-hidden="true"/>Sending...</>
                      : <><FaPaperPlane aria-hidden="true"/> Send Message</>
                    }
                  </button>
                  <p className="cf-privacy">🔒 Your data is secure and never shared with third parties.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
