import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar  from './components/Navbar/Navbar';
import Footer  from './components/Footer/Footer';

import Home         from './pages/Home/Home';
import About        from './pages/About/About';
import Overview     from './pages/Overview/Overview';
import Leadership   from './pages/Leadership/Leadership';
import Services     from './pages/Services/Services';
import Portfolio    from './pages/Portfolio/Portfolio';
import Technologies from './pages/Technologies/Technologies';
import Contact      from './pages/Contact/Contact';
import NotFound     from './pages/NotFound/NotFound';

import {
  getCompanyInfo, getServices, getProjects,
  getTestimonials, getTechnologies, getTeam,
} from './services/api';

/* ── Loading screen ──────────────────────────────────────── */
function Loader() {
  return (
    <div style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      background:'var(--dark)', gap:'24px',
    }} role="status" aria-label="Loading">
      <img src="/edata soft-02.png" alt="eData Software Limited"
        style={{height:'60px',width:'auto',opacity:'0.9'}} />
      <div style={{
        width:'48px',height:'48px',
        border:'3px solid rgba(139,26,47,0.2)',
        borderTop:'3px solid #8B1A2F',
        borderRadius:'50%',
        animation:'rotate 0.8s linear infinite',
      }} aria-hidden="true"/>
      <p style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',fontFamily:'Inter,sans-serif'}}>
        Loading eData Software…
      </p>
      <style>{`@keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* ── Scroll to top on route change ──────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ── Top progress bar ────────────────────────────────────── */
function ProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(0);
    const t1 = setTimeout(() => setWidth(70), 10);
    const t2 = setTimeout(() => setWidth(100), 400);
    const t3 = setTimeout(() => setWidth(0), 700);
    return () => [t1,t2,t3].forEach(clearTimeout);
  }, [useLocation().pathname]);

  if (!width) return null;
  return (
    <div style={{
      position:'fixed',top:0,left:0,zIndex:9999,
      height:'3px',width:`${width}%`,
      background:'linear-gradient(90deg, var(--primary), var(--accent))',
      transition:'width 0.4s ease',
      pointerEvents:'none',
    }} aria-hidden="true"/>
  );
}

export default function App() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    Promise.all([
      getCompanyInfo(), getServices(), getProjects(),
      getTestimonials(), getTechnologies(), getTeam(),
    ])
      .then(([company, services, projects, testimonials, technologies, team]) =>
        setData({ company, services, projects, testimonials, technologies, team })
      )
      .catch((err) => { console.error(err); setError('Failed to load. Please refresh.'); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'var(--dark)',color:'white',textAlign:'center',padding:'24px',fontFamily:'Inter,sans-serif'}}>
      <div>
        <p style={{fontSize:'48px',marginBottom:'12px'}}>⚠️</p>
        <p style={{fontSize:'16px',color:'rgba(255,255,255,0.6)',marginBottom:'24px'}}>{error}</p>
        <button onClick={()=>window.location.reload()}
          style={{padding:'12px 28px',background:'var(--primary)',color:'white',border:'none',
            borderRadius:'8px',fontSize:'14px',cursor:'pointer'}}>
          Refresh
        </button>
      </div>
    </div>
  );

  const { company, services, projects, testimonials, technologies, team } = data;

  return (
    <>
      {/* Skip link */}
      <a href="#main" style={{
        position:'absolute',top:'-40px',left:'16px',zIndex:9999,
        padding:'8px 16px',background:'var(--primary)',color:'white',
        borderRadius:'4px',fontSize:'14px',fontWeight:'600',textDecoration:'none',
        transition:'top 0.2s',
      }}
        onFocus={e=>(e.target.style.top='8px')}
        onBlur={e=>(e.target.style.top='-40px')}>
        Skip to content
      </a>

      <ScrollToTop />
      <ProgressBar />
      <Navbar />

      {/* Offset for fixed navbar (68px) */}
      <main id="main" style={{paddingTop:'68px'}}>
        <Routes>
          <Route path="/"                   element={<Home         company={company} />} />
          <Route path="/about"              element={<About        company={company} team={team} />} />
          <Route path="/about/overview"     element={<Overview     company={company} />} />
          <Route path="/about/leadership"   element={<Leadership   team={team} />} />
          <Route path="/services"           element={<Services     services={services} />} />
          <Route path="/portfolio"          element={<Portfolio    projects={projects} />} />
          <Route path="/technologies"       element={<Technologies technologies={technologies} />} />
          <Route path="/contact"            element={<Contact      company={company} />} />
          <Route path="*"                   element={<NotFound />} />
        </Routes>
      </main>

      <Footer company={company} />
    </>
  );
}
