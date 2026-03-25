import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import "./ProjectsSection.css";

const projectsData = [
  {
    title: "Salesforce Notes",
    description: "Documentación técnica para Salesforce.",
    tech: ["Apex", "Flow"],
    link: "https://github.com/arribass/salesforce-notes",
  },
  {
    title: "Quiz App",
    description: "App React con preguntas aleatorias.",
    tech: ["React", "JavaScript"],
    link: "https://github.com/arribass/quiz-app",
  },
  {
    title: "AI Image Generator",
    description: "Genera imágenes con IA según prompt.",
    tech: ["Python", "AI"],
    link: "https://github.com/arribass/ai-image-gen",
  },
  {
    title: "Network Monitor",
    description: "Monitor de redes y hardware.",
    tech: ["Hardware", "Networking"],
    link: "https://github.com/arribass/network-monitor",
  },
];

const categories = ["Todos", "Apex / Flow", "React / JS", "IA", "Hardware / Redes"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projectsData
      : projectsData.filter((p) =>
          p.tech.some((t) => {
            if (activeCategory === "Apex / Flow") return ["Apex", "Flow"].includes(t);
            if (activeCategory === "React / JS") return ["React", "JavaScript"].includes(t);
            if (activeCategory === "IA") return ["AI", "Python"].includes(t);
            if (activeCategory === "Hardware / Redes") return ["Hardware", "Networking"].includes(t);
            return false;
          })
        );

  return (
    <section className="projects-section">
      <h3>He aquí algunos de mis proyectos más destacables</h3>

      {/* 🔹 Categorías */}
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

      {/* 🔹 Grid de proyectos */}
      <div className="projects-grid">
        {filteredProjects.map((p, i) => (
          <div key={i} className="project-card">
            <h4>{p.title}</h4>
            <p>{p.description}</p>
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              <FaGithub style={{ marginRight: "6px" }} />
              Ver en GitHub
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}