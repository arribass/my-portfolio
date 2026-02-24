// src/App.js
import React from 'react';
import './App.css';

const projects = [
  { name: 'Salesforce Notes', description: 'Apuntes y quizzes de Salesforce', link: '#' },
  { name: 'Portfolio', description: 'Mis proyectos en React y más', link: '#' },
  { name: 'Quiz App', description: 'Prueba tus conocimientos con quizzes interactivos', link: '#' },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>👋 Hola, soy Adrian</h1>
        <p>Bienvenido a mi portfolio de proyectos React</p>

        <div className="projects-grid">
          {projects.map((proj, idx) => (
            <a key={idx} href={proj.link} className="project-card">
              <h2>{proj.name}</h2>
              <p>{proj.description}</p>
            </a>
          ))}
        </div>

        <footer style={{ marginTop: '40px', opacity: 0.7 }}>
          © {new Date().getFullYear()} Adrian Arribas
        </footer>
      </header>
    </div>
  );
}

export default App;
