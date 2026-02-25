import React, { useEffect,useState, useRef } from 'react';
import { FaGithub } from "react-icons/fa";
import './App.css';

import {
  FaReact,
  FaGitAlt,
  FaNodeJs,
} from "react-icons/fa";

import {
  SiJavascript,
  SiSalesforce,
  SiTypescript,
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

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <div className="App">

<header className="top-bar">
  <div className="top-bar-inner">

    {/* LEFT - Name */}
    <div className="nav-left">
      <span className="brand">Adrián Arribas</span>
    </div>

    {/* CENTER - Navigation */}
    <nav className="nav-center">
      <a href="#about">Sobre mí</a>
      <a href="#projects">Proyectos</a>
      <a href="#techstack">Tech stack</a>
      <a href="#code">Mejores repos</a>
    </nav>

    {/* RIGHT - GitHub */}
    <div className="nav-right">
      <a
        href="https://github.com/arribass/my-portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        <FaGithub style={{ marginRight: "6px" }} />
        Código fuente
      </a>
    </div>

  </div>
</header>

      <main className="main-content">
      <Section id="about">
        <div className="about-container">
          <div className="about-text">
            <h3>Hola, soy Adrián 👋</h3>
            <p>
              Soy <strong>Analista y Developer de Salesforce en Seidor</strong>, especializado en
              desarrollo con Apex, LWC, integraciones y arquitectura en la plataforma.
            </p>
            <p>
              Me apasiona construir soluciones limpias, escalables y bien estructuradas.
              Disfruto tanto la parte técnica como el diseño de soluciones.
            </p>
            <div className="about-tags">
              <span>Apex</span>
              <span>LWC</span>
              <span>Integraciones</span>
              <span>React</span>
            </div>
          </div>
          <div className="about-card">
            <h4>Actualmente</h4>
            <p>🔹 Salesforce Developer @ Seidor</p>
            <p>🔹 Construyendo ForceNotes</p>
            <p>🔹 Mejorando mi stack Frontend</p>
          </div>

        </div>
      </Section>

        <Section id="projects" title="Proyectos">
          <div className="projects-grid">

            <div className="project-card">
              <h3>Portfolio v1</h3>
              <p>Primera versión de mi portfolio personal.</p>
              {/* <button
                onClick={() =>
                  setSelectedProject({
                    title: "Portfolio v1",
                    description:
                      "Primera versión de mi portfolio creada con React y desplegada en GitHub Pages.",
                    tech: ["React", "CSS", "GitHub Actions"],
                  })
                }
              >
                Ver proyecto
              </button> */}
            </div>

            <div className="project-card">
              <h3>Salesforce Notes</h3>
              <p>Documentación técnica y recursos Salesforce.</p>
              {/* <button
                onClick={() =>
                  setSelectedProject({
                    title: "Salesforce Notes",
                    description:
                      "Documentación técnica creada con Docusaurus orientada a desarrolladores Salesforce.",
                    tech: ["Docusaurus", "MDX", "GitHub Pages"],
                  })
                }
              >
                Ver proyecto
              </button> */}
            </div>

          </div>
        </Section>

    <Section id="techstack" title="Tech Stack">
      <div className="tech-grid">

        <div className="tech-card">
          <SiSalesforce size={40} />
          <h4>Salesforce</h4>
          <p>Apex, LWC, SOQL, Integrations, Data Modeling</p>
        </div>

        <div className="tech-card">
          <FaReact size={40} />
          <h4>React</h4>
          <p>Hooks, Components, State Management</p>
        </div>

        <div className="tech-card">
          <SiJavascript size={40} />
          <h4>JavaScript</h4>
          <p>ES6+, Async/Await, Clean Architecture</p>
        </div>

        <div className="tech-card">
          <SiTypescript size={40} />
          <h4>TypeScript</h4>
          <p>Type-safe front-end development</p>
        </div>

        <div className="tech-card">
          <FaNodeJs size={40} />
          <h4>Node.js</h4>
          <p>APIs & Backend basics</p>
        </div>

        <div className="tech-card">
          <FaGitAlt size={40} />
          <h4>Git & CI/CD</h4>
          <p>GitHub Actions, branching strategies</p>
        </div>

      </div>
    </Section>
    <Section id="code" title="Código Fuente">
      <div className="repo-card">
        <div className="repo-header">
          <h3>Flow Action Record Validator</h3>
          <span className="repo-tag">Salesforce</span>
        </div>
        <p>
          Custom Flow Action to validate record conditions dynamically.
          Built for Salesforce environments where declarative logic needs
          controlled validation.
        </p>

        <div className="repo-footer">
          <a
            href="https://github.com/arribass/flow-Action-Record-Validator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en GitHub →
          </a>
        </div>

      </div>
      {/* <img src="https://github-readme-stats.vercel.app/api/pin/?username=arribass&repo=flow-Action-Record-Validator" /> */}
    </Section>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Adrian Arribas
      </footer>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>

            <div className="tech-list">
              {selectedProject.tech.map((tech, index) => (
                <span key={index} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

      <button
        className="close-btn"
        onClick={() => setSelectedProject(null)}
      >
        Cerrar
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default App;