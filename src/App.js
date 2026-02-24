import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 🌟 Top bar sticky */}
      <header className="top-bar">
        <h1>Adrian Arribas</h1>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* 🃏 Card central con info */}
      <main className="main-content">
        <div className="profile-card" id="about">
          <h2>Hola, soy Adrian</h2>
          <p>
            Desarrollador Salesforce y React, creando apps y herramientas
            interactivas. Me gusta documentar, hacer quizzes y probar cosas nuevas.
          </p>
        </div>

        {/* 📦 Proyectos */}
        <section id="projects" className="projects-grid">
          <div className="project-card">
            <h3>Salesforce Notes</h3>
            <p>Apuntes y quizzes de Salesforce</p>
          </div>
          <div className="project-card">
            <h3>Portfolio</h3>
            <p>Mis proyectos en React y más</p>
          </div>
          <div className="project-card">
            <h3>Quiz App</h3>
            <p>Prueba tus conocimientos con quizzes interactivos</p>
          </div>
        </section>
      </main>

      <footer>
        © {new Date().getFullYear()} Adrian Arribas
      </footer>
    </div>
  );
}

export default App;