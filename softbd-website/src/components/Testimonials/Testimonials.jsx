import { useEffect, useRef, useState, useCallback } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight, FaComments } from 'react-icons/fa';
import './Testimonials.css';

export default function Testimonials({ testimonials }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      goTo((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goTo = useCallback((indexOrFn) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(typeof indexOrFn === 'function' ? indexOrFn : () => indexOrFn);
      setIsAnimating(false);
    }, 200);
  }, [isAnimating]);

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  const visible3 = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section
      id="testimonials"
      className={`testimonials section ${visible ? 'testimonials--visible' : ''}`}
      ref={sectionRef}
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="section-header">
          <div className="section-badge" aria-hidden="true">
            <FaComments /> Client Reviews
          </div>
          <h2 id="testimonials-title" className="section-title">
            What Our <span>Clients Say</span>
          </h2>
          <p className="section-subtitle">
            Don't take our word for it. Here's what the leaders and teams we've partnered
            with have to say about their experience.
          </p>
        </div>

        {/* Featured Testimonial */}
        <div className={`testimonials__featured ${isAnimating ? 'testimonials__featured--exit' : ''}`}>
          {testimonials[current] && (
            <>
              <FaQuoteLeft className="testimonials__quote-icon" aria-hidden="true" />
              <blockquote className="testimonials__text">
                "{testimonials[current].text}"
              </blockquote>
              <div className="testimonials__author">
                <div
                  className="testimonials__avatar"
                  style={{ background: `linear-gradient(135deg, ${testimonials[current].color}, ${testimonials[current].color}cc)` }}
                  aria-hidden="true"
                >
                  {testimonials[current].initials}
                </div>
                <div className="testimonials__author-info">
                  <span className="testimonials__author-name">{testimonials[current].name}</span>
                  <span className="testimonials__author-role">
                    {testimonials[current].role} · {testimonials[current].company}
                  </span>
                  <span className="testimonials__author-country">📍 {testimonials[current].country}</span>
                </div>
                <div className="stars" role="img" aria-label={`Rating: ${testimonials[current].rating} out of 5 stars`}>
                  {[...Array(testimonials[current].rating)].map((_, i) => (
                    <FaStar key={i} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Cards row */}
        <div className="testimonials__cards" role="list">
          {visible3.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className={`testimonial-card ${i === 0 ? 'testimonial-card--active' : ''}`}
              role="listitem"
              onClick={() => goTo((current + i) % testimonials.length)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && goTo((current + i) % testimonials.length)}
              aria-label={`Testimonial from ${t.name}`}
              aria-current={i === 0 ? 'true' : undefined}
            >
              <div className="testimonial-card__header">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div className="testimonial-card__name">{t.name}</div>
                  <div className="testimonial-card__company">{t.company}</div>
                </div>
                <div className="stars" style={{ marginLeft: 'auto', fontSize: '12px' }} aria-label={`${t.rating} stars`}>
                  {[...Array(t.rating)].map((_, j) => <FaStar key={j} aria-hidden="true" />)}
                </div>
              </div>
              <p className="testimonial-card__text">"{t.text.slice(0, 120)}..."</p>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="testimonials__nav" role="group" aria-label="Testimonial navigation">
          <button
            className="testimonials__nav-btn"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <div className="testimonials__dots" role="tablist" aria-label="Testimonial dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            className="testimonials__nav-btn"
            onClick={next}
            aria-label="Next testimonial"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
