import React, { useEffect,useState, useRef } from 'react';
import { SiSalesforce } from "react-icons/si";
import { FaReact, FaGitAlt } from "react-icons/fa";

function AboutSection({ t, lang }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`about-container ${visible ? "fade-in" : ""}`}
    >
      {/* Imagen izquierda con efecto Flip */}
      <div className="about-image">
        <div 
          className={`about-image-inner ${isFlipped ? 'is-flipped' : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="about-image-front">
            <img
              src={`${process.env.PUBLIC_URL}/Adrian_Arribas.png`} 
              alt={t.photoAlt}
              className="profile-image"
            />
          </div>
          <div className="about-image-back">
            <img
              src={`${process.env.PUBLIC_URL}/avatar.png`} 
              alt={t.avatarAlt}
              className="profile-image"
            />
          </div>
        </div>
      </div>

      {/* Texto derecha */}
      <div className="about-text">
        <h3>{t.title}</h3>

        <p>
          <strong>{t.role}</strong>, {t.spec}
        </p>

        <p>{t.passion}</p>

        {/* Tech Stack Integrado */}
        <div className="tech-grid integrated">
          <div className="tech-card">
            <SiSalesforce size={24} />
            <h4>Salesforce</h4>
            <p>Apex, LWC, SOQL, Integrations</p>
          </div>

          <div className="tech-card">
            <FaReact size={24} />
            <h4>React</h4>
            <p>Hooks, State, Components</p>
          </div>

          <div className="tech-card">
            <FaGitAlt size={24} />
            <h4>Git & CI/CD</h4>
            <p>Actions, Branching</p>
          </div>
        </div>

        <div className="about-tags">
          <span>Apex</span>
          <span>LWC</span>
          <span>Integraciones</span>
          <span>React</span>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;