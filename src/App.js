import React, { useState, useEffect, useRef } from 'react';
import "./App.css";

import AboutSection from "./components/AboutSection";
import ProjectCard from "./components/ProjectCard";
import TechBadge from "./components/TechBadge";
import Timeline from "./components/Timeline";
import ProjectsSection from "./components/ProjectsSection";
// import Section from "./components/Section";


import { FaGithub } from "react-icons/fa";

import {
  FaReact,
  FaGitAlt,
  // FaNodeJs,
} from "react-icons/fa";

import {
  // SiJavascript,
  SiSalesforce,
  // SiTypescript,
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

const myTimeline = [
{ title: "Aprendí React", date: "2022", description: "Primer proyecto personal en React." },
{ title: "Salesforce Developer", date: "2023", description: "Comencé a trabajar con Apex y LWC." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },
{ title: "Portfolio Online", date: "2024", description: "Desarrollé mi portfolio con React." },

];

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
        <AboutSection />
      </Section>
      {/* Proyectos */}
      <Section id="projects" title="Proyectos">
        <div className="projects-grid">

          <ProjectCard
            title="Portfolio v1"
            description="Primera versión de mi portfolio personal."
            repoUrl="https://github.com/arribass/my-portfolio"
          />

          <ProjectCard
            title="Flow Action Record Validator"
            description="Flow Action para validar condiciones dinámicamente en Salesforce."
            repoUrl="https://github.com/arribass/flow-Action-Record-Validator"
          />

        </div>
      <ProjectsSection></ProjectsSection>
      </Section>
      {/* Tech Stack */}
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
            <FaGitAlt size={40} />
            <h4>Git & CI/CD</h4>
            <p>GitHub Actions, branching strategies</p>
          </div>

          {/* <div className="tech-card">
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
          </div> */}


        </div>
      </Section>
      {/* Timeline */}
    <div>
      <h2 style={{ textAlign: "center" }}>Mi Timeline</h2>
      <Timeline events={myTimeline} />
    </div>

      <Section id="code" title="Salesforce Utilities">
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
          <TechBadge label="Apex" variant="backend" />
          <TechBadge label="Flow" variant="frontend" />
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
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Adrian Arribas</p>
          <div className="contact">
            <h4>¡Contáctame!</h4>
            <p>No dudes en ponerte en contacto conmigo a través de:</p>
            <a href="mailto:adri47arribas@gmail.com">Correo electrónico</a> |{" "}
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

      <button className="close-btn" onClick={() => setSelectedProject(null)}> Cerrar </button>
        </div>
      </div>)}
    </div>);
}

export default App;