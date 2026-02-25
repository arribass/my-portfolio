import React, { useEffect,useState, useRef } from 'react';
function AboutSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
      {/* Imagen izquierda */}
      <div className="about-image">
        <img
          src={`${process.env.PUBLIC_URL}/Adrian_Arribas.png`} 
          alt="Adrián Arribas"
          className="profile-image"
        />
      </div>

      {/* Texto derecha */}
      <div className="about-text">
        <h3>Hola, soy Adrián 👋</h3>

        <p>
          Soy <strong>Analista y Developer de Salesforce en Seidor</strong>,
          especializado en desarrollo con Apex, LWC, integraciones y arquitectura.
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
    </div>
  );
}

export default AboutSection;