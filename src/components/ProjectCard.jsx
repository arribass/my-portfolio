import React from "react";
import { FaGithub } from "react-icons/fa";
// import "./ProjectCard.css";

function ProjectCard({ title, description, repoUrl }) {
  return (
    <div className="project-card">
      <div className="project-header">
        <h3>{title}</h3>

        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-icon"
          >
            <FaGithub size={20} />
          </a>
        )}
      </div>

      <p>{description}</p>
    </div>
  );
}

export default ProjectCard;