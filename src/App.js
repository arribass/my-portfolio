import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

import AboutSection from "./components/AboutSection";
import TechBadge from "./components/TechBadge";
import Timeline from "./components/Timeline";
import ProjectsSection from "./components/ProjectsSection";
import TournamentsSection from "./components/TournamentsSection";
import { translations, timelineTranslations, projectsTranslations } from "./translations";
// import Section from "./components/Section";


import {
  FaGithub,
  FaFilePdf,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp
} from "react-icons/fa";

import {
  SiSalesforce,
} from "react-icons/si";

/**
 * Componente Section que:
 * - Observa cuando entra en pantalla
 * - Añade clase "visible" cuando aparece
*/
function Section({ id, title, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const section = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Cuando la sección entra en viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.2, // Se activa cuando el 20% es visible
      }
    );

    observer.observe(section);

    return () => observer.unobserve(section);
  }, []);

  return (
    <section ref={ref} id={id} className="section-placeholder">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// function App() {
//   return (
//     <div className="App under-construction">

//       <main className="main-content">
//       <Section id="about">
//         <AboutSection />
//        </Section>

//         <section className="construction-card">
//           <h2>🚧 Under Construction 🚧</h2>
//           <p>
//             El portfolio está en proceso de mejora.
//             Vuelve pronto para ver la nueva versión.
//           </p>
//         </section>

//       </main>

//     </div>
//   );
// }
// export default App;



function App() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header className={`top-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="top-bar-inner">

          {/* LEFT - Name & Language Toggle */}
          <div className="nav-left">
            <span className="brand">Adrián Arribas</span>
            <div className="lang-switcher">
              <button
                className={lang === 'es' ? 'active' : ''}
                onClick={() => setLang('es')}
              >
                ES
              </button>
              <span className="separator">|</span>
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
          </div>

          {/* CENTER - Navigation */}
          <nav className="nav-center">
            <a href="#about">{t.nav.about}</a>
            <a href="#experience">{t.nav.experience}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#code">{t.nav.code}</a>
            <a href="#tournaments">{t.nav.tournaments}</a>
          </nav>

          {/* RIGHT - GitHub */}
          <div className="nav-right">
            <a
              href={process.env.PUBLIC_URL + "/" + encodeURIComponent("CV Adrián Arribas 2024 EN.pdf")}
              target="_blank"
              rel="noopener noreferrer"
              className="cv-link"
            >
              <FaFilePdf />
              <span>{t.nav.cv}</span>
            </a>
            <a
              href="https://github.com/arribass/my-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <FaGithub />
              <span>{t.nav.source}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="main-content">
        <Section id="about">
          <AboutSection lang={lang} t={t.about} />
        </Section>

        {/* Timeline */}
        <Section id="experience" title={t.experience.title}>
          <Timeline events={timelineTranslations[lang]} t={t.experience} />
        </Section>

        {/* Proyectos */}
        <Section id="projects" title={t.projects.title}>
          <ProjectsSection
            lang={lang}
            t={t.projects}
            projects={projectsTranslations[lang]}
            tModal={translations[lang].modal}
          />
        </Section>

        <Section id="code" title={t.utilities.title}>
          <div className="utilities-grid">
            {/* Reusable Lookup */}
            <div className="salesforce-card">
              <div className="sf-card-header">
                <div className="sf-card-title-wrapper">
                  <SiSalesforce className="sf-logo-icon" />
                  <h3 className="sf-card-title">Reusable Lookup</h3>
                </div>
                <a
                  href="https://github.com/arribass/reusable-lookup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-github-link"
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="sf-card-body">
                <p className="sf-card-desc">
                  {lang === 'es' ? 'Componente versátil para búsquedas dinámicas.' : 'Versatile component for dynamic searching.'}
                </p>
                <ul className="sf-features-list">
                  <li>{lang === 'es' ? 'Soporte multiobjeto' : 'Multi-object support'}</li>
                  <li>{lang === 'es' ? 'Motor dinámico SOSL/SOQL' : 'Dynamic SOSL/SOQL engine'}</li>
                  <li>{lang === 'es' ? 'Plantillas personalizables' : 'Customizable templates'}</li>
                </ul>
                <div className="sf-card-footer">
                  <div className="sf-card-badges">
                    <TechBadge label="Apex" variant="backend" />
                    <TechBadge label="LWC" variant="frontend" />
                  </div>
                  <a
                    href="https://github.com/arribass/reusable-lookup"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sf-card-link"
                  >
                    {lang === 'es' ? 'Ver Código' : 'View Code'}
                  </a>
                </div>
              </div>
            </div>

            {/* Reusable Picklist */}
            <div className="salesforce-card">
              <div className="sf-card-header">
                <div className="sf-card-title-wrapper">
                  <SiSalesforce className="sf-logo-icon" />
                  <h3 className="sf-card-title">Reusable Picklist</h3>
                </div>
                <a
                  href="https://github.com/arribass/reusable-picklist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-github-link"
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="sf-card-body">
                <p className="sf-card-desc">
                  {lang === 'es' ? 'Picklist ligero y personalizable.' : 'Lightweight customizable picklist.'}
                </p>
                <ul className="sf-features-list">
                  <li>{lang === 'es' ? 'Compatible con LWC y Flow' : 'LWC & Flow compatible'}</li>
                  <li>{lang === 'es' ? 'Basado en metadatos' : 'Metadata-driven'}</li>
                  <li>{lang === 'es' ? 'Configuración sin código' : 'No-code configuration'}</li>
                </ul>
                <div className="sf-card-footer">
                  <div className="sf-card-badges">
                    <TechBadge label="LWC" variant="frontend" />
                    <TechBadge label="Apex" variant="backend" />
                  </div>
                  <a
                    href="https://github.com/arribass/reusable-picklist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sf-card-link"
                  >
                    {lang === 'es' ? 'Ver Código' : 'View Code'}
                  </a>
                </div>
              </div>
            </div>

            {/* Flow Action Validator */}
            <div className="salesforce-card">
              <div className="sf-card-header">
                <div className="sf-card-title-wrapper">
                  <SiSalesforce className="sf-logo-icon" />
                  <h3 className="sf-card-title">Flow Action Validator</h3>
                </div>
                <a
                  href="https://github.com/arribass/flow-Action-Record-Validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sf-github-link"
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="sf-card-body">
                <p className="sf-card-desc">
                  {lang === 'es' ? 'Validación dinámica de campos de registro.' : 'Dynamic record field validation.'}
                </p>
                <ul className="sf-features-list">
                  <li>{lang === 'es' ? 'Motor de condiciones dinámico' : 'Dynamic condition engine'}</li>
                  <li>{lang === 'es' ? 'Mensajes de error personalizados' : 'Custom error messaging'}</li>
                  <li>{lang === 'es' ? 'Seguro para procesamiento por lotes' : 'Bulk-safe validation'}</li>
                </ul>
                <div className="sf-card-footer">
                  <div className="sf-card-badges">
                    <TechBadge label="Apex" variant="backend" />
                    <TechBadge label="Flow" variant="frontend" />
                  </div>
                  <a
                    href="https://github.com/arribass/flow-Action-Record-Validator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sf-card-link"
                  >
                    {lang === 'es' ? 'Ver Código' : 'View Code'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Torneos Beta Section */}
        <Section id="tournaments" title={t.tournaments.title}>
          <TournamentsSection lang={lang} t={t.tournaments} />
        </Section>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-grid">
              
              {/* Col 1: Bio / Brand */}
              <div className="footer-col brand-col">
                <span className="footer-brand">Adrián Arribas</span>
                <p className="footer-bio">
                  {lang === 'es' 
                    ? 'Desarrollador y Analista Salesforce especializado en crear soluciones escalables, limpias y de alto rendimiento.' 
                    : 'Salesforce Developer & Analyst specializing in creating scalable, clean, and high-performance solutions.'}
                </p>
              </div>

              {/* Col 2: Navigation Links */}
              <div className="footer-col links-col">
                <h4>{lang === 'es' ? 'Navegación' : 'Navigation'}</h4>
                <ul>
                  <li><a href="#about">{t.nav.about}</a></li>
                  <li><a href="#experience">{t.nav.experience}</a></li>
                  <li><a href="#projects">{t.nav.projects}</a></li>
                  <li><a href="#code">{t.nav.code}</a></li>
                  <li><a href="#tournaments">{t.nav.tournaments}</a></li>
                </ul>
              </div>

              {/* Col 3: Contact Info */}
              <div className="footer-col contact-col">
                <h4>{t.footer.contact}</h4>
                <p className="footer-desc">{t.footer.desc}</p>
                <div className="footer-contact-links">
                  <a href="mailto:adri47arribas@gmail.com" className="footer-contact-item">
                    <FaEnvelope />
                    <span>adri47arribas@gmail.com</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/adrian-arribas-garcia-5470791b4/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                  >
                    <FaLinkedin />
                    <span>LinkedIn</span>
                  </a>
                  <a 
                    href="https://github.com/arribass" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="footer-contact-item"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Bottom Bar: Copyright & Scroll to Top */}
            <div className="footer-bottom">
              <p className="copyright">
                © {new Date().getFullYear()} Adrián Arribas. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
              </p>
              <button 
                className="scroll-to-top" 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Scroll to top"
              >
                <FaArrowUp />
              </button>
            </div>

          </div>
        </footer>
      </main>

    </div>
  );
}

export default App;