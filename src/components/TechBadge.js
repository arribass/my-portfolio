import React from "react";
import "./TechBadge.css";

function TechBadge({ label, variant = "default" }) {
  return (
    <span className={`tech-badge ${variant}`}>
      {label}
    </span>
  );
}

export default TechBadge;