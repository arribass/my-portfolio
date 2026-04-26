import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import "./ProjectsSection.css";

export default function ProjectsSection({ lang, t, projects, tModal }) {
  const categories = [t.categories.all, t.categories.salesforce, t.categories.webApps];
  const [activeCategory, setActiveCategory] = useState(t.categories.all);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === t.categories.all
      ? projects
      : projects.filter((p) =>
          p.tech.some((tech) => {
            if (activeCategory === "Web Apps") return ["React", "Next.js", "Tailwind"].includes(tech);
            if (activeCategory === "Salesforce") return ["Apex", "Flow", "Salesforce", "LWC"].includes(tech);
            return false;
          })
        );

  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section className="projects-section">
      {/* 🔹 Categorías */}
      <div className="projects-filter-wrapper">
        <div className="projects-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={cat === activeCategory ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 🔹 Grid de proyectos */}
      <div className="projects-grid">
        {filteredProjects.map((p, i) => (
          <div key={i} className="project-card" onClick={() => setSelectedProject(p)}>
            <div className="project-image">
              <img src={`${process.env.PUBLIC_URL}/${p.image}`} alt={p.title} />
              <div className="project-overlay">
                <span>{lang === 'es' ? 'Ver detalles' : 'View details'}</span>
              </div>
            </div>
            <div className="project-content">
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <div className="project-tech-tags">
                {p.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
              </div>
              <a 
                href={p.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link"
                onClick={(e) => e.stopPropagation()}
              >
                {p.type === "github" ? <FaGithub /> : <FaExternalLinkAlt />}
                <span>{p.type === "github" ? "GitHub" : "Demo"}</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal Detail Page */}
      {selectedProject && (
        <div className="project-modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              <FaTimes />
            </button>
            
            <div className="modal-body">
              <div className="modal-image-col">
                <img src={`${process.env.PUBLIC_URL}/${selectedProject.image}`} alt={selectedProject.title} />
              </div>
              
              <div className="modal-info-col">
                <h2>{selectedProject.title}</h2>
                <div className="modal-tech-list">
                  {selectedProject.tech.map(tech => <span key={tech} className="tech-tag">{tech}</span>)}
                </div>
                
                <p className="modal-full-desc">{selectedProject.description}</p>
                
                <h3>{tModal.highlights}</h3>
                <ul className="modal-features">
                  {selectedProject.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
                
                <div className="modal-actions">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="modal-btn-primary">
                    {selectedProject.type === "github" ? <FaGithub /> : <FaExternalLinkAlt />}
                    <span>{selectedProject.type === "github" ? tModal.github : tModal.demo}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}