export const translations = {
  es: {
    nav: {
      about: "Sobre mí",
      experience: "Trayectoria",
      projects: "Proyectos",
      code: "Mejores repos",
      source: "Código fuente",
      cv: "Mi CV"
    },
    about: {
      title: "Hola, soy Adrián 👋",
      role: "Analista y Developer de Salesforce en Seidor",
      spec: "especializado en desarrollo con Apex, LWC, integraciones y arquitectura.",
      passion: "Me apasiona construir soluciones limpias, escalables y bien estructuradas. Disfruto tanto la parte técnica como el diseño de soluciones.",
      avatarAlt: "Avatar de Adrián",
      photoAlt: "Adrián Arribas"
    },
    experience: {
      title: "Mi Trayectoria",
      showMore: "Ver trayectoria completa ↓",
      showLess: "Ver menos ↑"
    },
    projects: {
      title: "Proyectos",
      categories: {
        all: "Todos",
        salesforce: "Salesforce",
        frontend: "Frontend",
        tools: "Herramientas"
      }
    },
    utilities: {
      title: "Salesforce Utilities",
      description: "description --get",
      features: "features --list",
      clone: "git clone --view"
    },
    footer: {
      contact: "¡Contáctame!",
      desc: "No dudes en ponerte en contacto conmigo a través de:",
      email: "Correo electrónico"
    },
    modal: {
      highlights: "Destacados del proyecto:",
      github: "Ver en GitHub",
      demo: "Abrir Demo",
      close: "Cerrar"
    }
  },
  en: {
    nav: {
      about: "About me",
      experience: "Experience",
      projects: "Projects",
      code: "Best repos",
      source: "Source code",
      cv: "My CV"
    },
    about: {
      title: "Hi, I'm Adrián 👋",
      role: "Salesforce Analyst & Developer at Seidor",
      spec: "specializing in Apex development, LWC, integrations, and architecture.",
      passion: "I'm passionate about building clean, scalable, and well-structured solutions. I enjoy both the technical side and solution design.",
      avatarAlt: "Adrian's Avatar",
      photoAlt: "Adrian Arribas"
    },
    experience: {
      title: "My Experience",
      showMore: "Show full timeline ↓",
      showLess: "Show less ↑"
    },
    projects: {
      title: "Projects",
      categories: {
        all: "All",
        salesforce: "Salesforce",
        frontend: "Frontend",
        tools: "Tools"
      }
    },
    utilities: {
      title: "Salesforce Utilities",
      description: "description --get",
      features: "features --list",
      clone: "git clone --view"
    },
    footer: {
      contact: "Get in touch!",
      desc: "Feel free to reach out to me via:",
      email: "Email"
    },
    modal: {
      highlights: "Project Highlights:",
      github: "View on GitHub",
      demo: "Open Demo",
      close: "Close"
    }
  }
};

export const timelineTranslations = {
  es: [
    { title: "Primeros pasos en Programación", date: "2021", description: "Comencé mi viaje en el mundo del desarrollo explorando lógica y algoritmos básicos." },
    { title: "Especialización en Salesforce", date: "2022", description: "Inicié mi carrera como desarrollador en el ecosistema Salesforce, dominando Apex, LWC y automatizaciones." },
    { title: "Adopción de React & Frontend", date: "2023", description: "Expandí mis habilidades hacia el desarrollo web moderno, aprendiendo React para crear interfaces dinámicas." },
    { title: "Workshop Intelligence Dashboard", date: "2024", description: "Lanzamiento de una plataforma completa de gestión para talleres, integrando Supabase y análisis financiero." },
    { title: "Showroom Digital Premium", date: "2024", description: "Desarrollo de una experiencia visual inmersiva para exhibición de productos artesanales de alta gama." },
  ],
  en: [
    { title: "First Steps in Programming", date: "2021", description: "I started my journey in the development world exploring basic logic and algorithms." },
    { title: "Salesforce Specialization", date: "2022", description: "I began my career as a developer in the Salesforce ecosystem, mastering Apex, LWC, and automations." },
    { title: "Adopting React & Frontend", date: "2023", description: "I expanded my skills towards modern web development, learning React to create dynamic interfaces." },
    { title: "Workshop Intelligence Dashboard", date: "2024", description: "Launched a complete workshop management platform, integrating Supabase and financial analysis." },
    { title: "Premium Digital Showroom", date: "2024", description: "Developed an immersive visual experience for displaying high-end handcrafted products." },
  ]
};

export const projectsTranslations = {
  es: [
    {
      title: "Workshop Intelligence Dashboard",
      description: "Plataforma integral de gestión para talleres de luthería. Control de inventario, finanzas y seguimiento de producción.",
      tech: ["React", "Tailwind", "Supabase"],
      link: "https://guitar-builder-tau.vercel.app/dashboard",
      image: "projects/guitar-dashboard.png",
      type: "external",
      details: [
        "Sistema de gestión financiera con cálculo de valoración neta.",
        "Seguimiento detallado de la producción de instrumentos.",
        "Gestión de inventario de maderas y hardware.",
        "Panel de administración con estadísticas en tiempo real."
      ]
    },
    {
      title: "Arribas Luthier Showroom",
      description: "Showroom digital premium para exposición de guitarras artesanales con enfoque en marca y experiencia de usuario.",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      link: "https://guitar-builder-tau.vercel.app/showroom-aarribas",
      image: "projects/guitar-showroom.png",
      type: "external",
      details: [
        "Catálogo interactivo de la colección 'Workbench'.",
        "Diseño minimalista premium enfocado en fotografía de alta calidad.",
        "Optimización SEO y rendimiento para dispositivos móviles.",
        "Integración de animaciones suaves con Framer Motion."
      ]
    },
    {
      title: "Reusable Lookup Controller",
      description: "Componente LWC versátil para búsquedas dinámicas de registros en Salesforce con soporte multi-objeto.",
      tech: ["Apex", "LWC", "Salesforce"],
      link: "https://github.com/arribass/reusable-lookup",
      image: "projects/reusable-lookup.png",
      type: "github",
      details: [
        "Búsqueda dinámica basada en SOSL/SOQL.",
        "Plantillas de resultados personalizables.",
        "Soporte para múltiples objetos con un solo componente.",
        "Fácil integración en otros componentes LWC y Flows."
      ]
    },
    {
      title: "Flow Action Record Validator",
      description: "Custom Flow Action de Salesforce para validar condiciones de registros de forma dinámica y declarativa.",
      tech: ["Apex", "Flow", "Salesforce"],
      link: "https://github.com/arribass/flow-Action-Record-Validator",
      image: "projects/flow-validator.png",
      type: "github",
      details: [
        "Validación de registros sin escribir APEX adicional.",
        "Mensajes de error personalizados configurables en el Flow.",
        "Ejecución eficiente mediante procesamiento por lotes.",
        "Compatible con automatizaciones complejas de Salesforce."
      ]
    },
    {
      title: "Salesforce Notes",
      description: "Documentación técnica avanzada y guías prácticas para el ecosistema Salesforce.",
      tech: ["Apex", "Flow", "Salesforce"],
      link: "https://github.com/arribass/salesforce-notes",
      image: "projects/salesforce-notes.png",
      type: "github",
      details: [
        "Repositorio centralizado de 'best practices' de Apex.",
        "Guías sobre patrones de diseño en Salesforce.",
        "Ejemplos de optimización de consultas SOQL.",
        "Documentación técnica de fácil acceso para devs."
      ]
    },
    {
      title: "Portfolio v1",
      description: "Primera iteración de mi portfolio personal desarrollado para establecer mi presencia digital.",
      tech: ["React", "CSS"],
      link: "https://github.com/arribass/my-portfolio",
      image: "projects/portfolio-v1.png",
      type: "github",
      details: [
        "Arquitectura modular de componentes React.",
        "Implementación de animaciones CSS nativas.",
        "Navegación fluida de una sola página (SPA).",
        "Maquetación responsive adaptiva."
      ]
    },
  ],
  en: [
    {
      title: "Workshop Intelligence Dashboard",
      description: "Comprehensive management platform for lutherie workshops. Inventory control, finances, and production tracking.",
      tech: ["React", "Tailwind", "Supabase"],
      link: "https://guitar-builder-tau.vercel.app/dashboard",
      image: "projects/guitar-dashboard.png",
      type: "external",
      details: [
        "Financial management system with net valuation calculation.",
        "Detailed tracking of instrument production.",
        "Inventory management for precious woods and hardware.",
        "Admin dashboard with real-time statistics."
      ]
    },
    {
      title: "Arribas Luthier Showroom",
      description: "Premium digital showroom for displaying handcrafted guitars with a focus on branding and UX.",
      tech: ["Next.js", "Tailwind", "Framer Motion"],
      link: "https://guitar-builder-tau.vercel.app/showroom-aarribas",
      image: "projects/guitar-showroom.png",
      type: "external",
      details: [
        "Interactive catalog of the 'Workbench' collection.",
        "Minimalist premium design focused on high-quality photography.",
        "SEO and performance optimization for mobile devices.",
        "Smooth animation integration with Framer Motion."
      ]
    },
    {
      title: "Reusable Lookup Controller",
      description: "Versatile LWC component for dynamic record searching in Salesforce with multi-object support.",
      tech: ["Apex", "LWC", "Salesforce"],
      link: "https://github.com/arribass/reusable-lookup",
      image: "projects/reusable-lookup.png",
      type: "github",
      details: [
        "Dynamic searching based on SOSL/SOQL.",
        "Customizable result templates.",
        "Multi-object support within a single component.",
        "Easy integration into other LWCs and Flows."
      ]
    },
    {
      title: "Flow Action Record Validator",
      description: "Custom Salesforce Flow Action for validating record conditions dynamically and declaratively.",
      tech: ["Apex", "Flow", "Salesforce"],
      link: "https://github.com/arribass/flow-Action-Record-Validator",
      image: "projects/flow-validator.png",
      type: "github",
      details: [
        "Record validation without writing additional APEX.",
        "Customizable error messages configurable in Flow Builder.",
        "Efficient execution through bulk processing.",
        "Compatible with complex Salesforce automations."
      ]
    },
    {
      title: "Salesforce Notes",
      description: "Advanced technical documentation and practical guides for the Salesforce ecosystem.",
      tech: ["Apex", "Flow", "Salesforce"],
      link: "https://github.com/arribass/salesforce-notes",
      image: "projects/salesforce-notes.png",
      type: "github",
      details: [
        "Centralized repository of Apex best practices.",
        "Guides on Salesforce design patterns.",
        "SOQL query optimization examples.",
        "Easy-access technical documentation for developers."
      ]
    },
    {
      title: "Portfolio v1",
      description: "First iteration of my personal portfolio developed to establish my digital presence.",
      tech: ["React", "CSS"],
      link: "https://github.com/arribass/my-portfolio",
      image: "projects/portfolio-v1.png",
      type: "github",
      details: [
        "Modular React component architecture.",
        "Implementation of native CSS animations.",
        "Seamless Single Page Application (SPA) navigation.",
        "Adaptive responsive layout."
      ]
    },
  ]
};
