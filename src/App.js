import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

import AboutSection from "./components/AboutSection";
import TechBadge from "./components/TechBadge";
import Timeline from "./components/Timeline";
import ProjectsSection from "./components/ProjectsSection";
import { translations, timelineTranslations, projectsTranslations } from "./translations";
// import Section from "./components/Section";


import {
  FaGithub,
  FaFilePdf
} from "react-icons/fa";

// import {
//   SiSalesforce,
// } from "react-icons/si";

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
            <div className="repo-card terminal">
              <div className="repo-window-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="window-title">reusable-lookup.sh</span>
              </div>
              <div className="repo-body">
                <div className="repo-header">
                  <h3>Reusable Lookup</h3>
                  <span className="repo-tag">Salesforce</span>
                </div>
                <div className="repo-terminal-content">
                  <p>$ {t.utilities.description}</p>
                  <p className="terminal-output">{lang === 'es' ? 'Componente versátil para búsquedas dinámicas.' : 'Versatile component for dynamic searching.'}</p>
                  <p>$ {t.utilities.features}</p>
                  <ul className="terminal-list">
                    <li>{" > "} {lang === 'es' ? 'Soporte multiobjeto' : 'Multi-object support'}</li>
                    <li>{" > "} {lang === 'es' ? 'Motor dinámico SOSL/SOQL' : 'Dynamic SOSL/SOQL engine'}</li>
                    <li>{" > "} {lang === 'es' ? 'Plantillas personalizables' : 'Customizable templates'}</li>
                  </ul>
                </div>
                <div className="repo-badges">
                  <TechBadge label="Apex" variant="backend" />
                  <TechBadge label="LWC" variant="frontend" />
                </div>
              </div>
              <div className="repo-footer">
                <a
                  href="https://github.com/arribass/reusable-lookup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  $ {t.utilities.clone}
                </a>
              </div>
            </div>

            <div className="repo-card terminal">
              <div className="repo-window-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="window-title">reusable-picklist.sh</span>
              </div>
              <div className="repo-body">
                <div className="repo-header">
                  <h3>Reusable Picklist</h3>
                  <span className="repo-tag">Salesforce</span>
                </div>
                <div className="repo-terminal-content">
                  <p>$ {t.utilities.description}</p>
                  <p className="terminal-output">{lang === 'es' ? 'Picklist ligero y personalizable.' : 'Lightweight customizable picklist.'}</p>
                  <p>$ {t.utilities.features}</p>
                  <ul className="terminal-list">
                    <li>{" > "} {lang === 'es' ? 'Compatible con LWC y Flow' : 'LWC & Flow compatible'}</li>
                    <li>{" > "} {lang === 'es' ? 'Basado en metadatos' : 'Metadata-driven'}</li>
                    <li>{" > "} {lang === 'es' ? 'Configuración sin código' : 'No-code configuration'}</li>
                  </ul>
                </div>
                <div className="repo-badges">
                  <TechBadge label="LWC" variant="frontend" />
                  <TechBadge label="Apex" variant="backend" />
                </div>
              </div>
              <div className="repo-footer">
                <a
                  href="https://github.com/arribass/reusable-picklist"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  $ {t.utilities.clone}
                </a>
              </div>
            </div>

            <div className="repo-card terminal">
              <div className="repo-window-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="window-title">record-validator.sh</span>
              </div>
              <div className="repo-body">
                <div className="repo-header">
                  <h3>Flow Action Validator</h3>
                  <span className="repo-tag">Salesforce</span>
                </div>
                <div className="repo-terminal-content">
                  <p>$ {t.utilities.description}</p>
                  <p className="terminal-output">{lang === 'es' ? 'Validación dinámica de campos de registro.' : 'Dynamic record field validation.'}</p>
                  <p>$ {t.utilities.features}</p>
                  <ul className="terminal-list">
                    <li>{" > "} {lang === 'es' ? 'Motor de condiciones dinámico' : 'Dynamic condition engine'}</li>
                    <li>{" > "} {lang === 'es' ? 'Mensajes de error personalizados' : 'Custom error messaging'}</li>
                    <li>{" > "} {lang === 'es' ? 'Seguro para procesamiento por lotes' : 'Bulk-safe validation'}</li>
                  </ul>
                </div>
                <div className="repo-badges">
                  <TechBadge label="Apex" variant="backend" />
                  <TechBadge label="Flow" variant="frontend" />
                </div>
              </div>
              <div className="repo-footer">
                <a
                  href="https://github.com/arribass/flow-Action-Record-Validator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link"
                >
                  $ {t.utilities.clone}
                </a>
              </div>
            </div>
          </div>
        </Section>
        <footer className="footer">
          <div className="footer-content">
            <p>© {new Date().getFullYear()} Adrian Arribas</p>
            <div className="contact">
              <h4>{t.footer.contact}</h4>
              <p>{t.footer.desc}</p>
              <a href="mailto:adri47arribas@gmail.com">{t.footer.email}</a> |{" "}
              <a
                href="https://www.linkedin.com/in/arribas/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </main>

    </div>
  );
}

export default App;