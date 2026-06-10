import React, { useState } from "react";
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight, 
  FaThLarge, 
  FaImages 
} from "react-icons/fa";
import "./ProjectsSection.css";

export default function ProjectsSection({ lang, t, projects, tModal }) {
  const categories = [t.categories.all, t.categories.salesforce, t.categories.webApps];
  const [activeCategory, setActiveCategory] = useState(t.categories.all);
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("gallery"); // "gallery" or "grid"
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Touch Swiping State
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

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

  // Reset index when active category or view mode changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory, viewMode]);

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredProjects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === filteredProjects.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  return (
    <section className="projects-section">
      {/* 🔹 Toolbar: Categorías & Selector de Vista */}
      <div className="projects-toolbar">
        <div className="projects-categories-wrapper">
          <div className="projects-categories">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                className={`${cat === activeCategory ? "active" : ""} filter-${idx === 0 ? "all" : idx === 1 ? "salesforce" : "web-app"}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-view-switcher">
          <button
            className={viewMode === "gallery" ? "active" : ""}
            onClick={() => setViewMode("gallery")}
            title={t.viewGallery}
          >
            <FaImages />
            <span>{t.viewGallery}</span>
          </button>
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
            title={t.viewGrid}
          >
            <FaThLarge />
            <span>{t.viewGrid}</span>
          </button>
        </div>
      </div>

      {/* 🔹 Contenido del Grid o Galería */}
      {viewMode === "gallery" ? (
        <div className="projects-gallery-layout">
          <div className="gallery-container">
            <button 
              className="nav-arrow prev-arrow" 
              onClick={handlePrev} 
              disabled={filteredProjects.length <= 1}
              aria-label="Previous project"
            >
              <FaChevronLeft />
            </button>
            
            <div 
              className="gallery-slider-viewport"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div 
                className="gallery-slider-track"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`
                }}
              >
                {filteredProjects.map((p, i) => (
                  <div key={i} className={`gallery-slide ${i === currentIndex ? "active" : ""}`}>
                    <div 
                      className={`project-card ${p.tech.some(t => ["Apex", "Flow", "Salesforce", "LWC"].includes(t)) ? "salesforce" : "web-app"}`} 
                      onClick={() => setSelectedProject(p)}
                    >
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
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="nav-arrow next-arrow" 
              onClick={handleNext} 
              disabled={filteredProjects.length <= 1}
              aria-label="Next project"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* 🔹 Dots Indicators */}
          {filteredProjects.length > 1 && (
            <div className="gallery-dots">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  className={`gallery-dot ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* 🔹 Grid de proyectos */
        <div className="projects-grid">
          {filteredProjects.map((p, i) => (
            <div 
              key={i} 
              className={`project-card ${p.tech.some(t => ["Apex", "Flow", "Salesforce", "LWC"].includes(t)) ? "salesforce" : "web-app"}`} 
              onClick={() => setSelectedProject(p)}
            >
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
      )}

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