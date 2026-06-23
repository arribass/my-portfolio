import React, { useState, useEffect, useRef } from 'react';
import { FaBriefcase, FaGraduationCap, FaGuitar, FaCode, FaLaptopCode } from 'react-icons/fa';
import './Timeline.css';

const getEventIcon = (event) => {
  const title = event.title.toLowerCase();
  if (title.includes('grado') || title.includes('degree') || title.includes('universidad')) {
    return <FaGraduationCap />;
  }
  if (title.includes('guitar') || title.includes('luthier')) {
    return <FaGuitar />;
  }
  if (title.includes('primero') || title.includes('first steps') || title.includes('programación') || title.includes('programming')) {
    return <FaCode />;
  }
  if (event.category === 'work') {
    return <FaBriefcase />;
  }
  return <FaLaptopCode />;
};

const TimelineItem = ({ event, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const currentItem = itemRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (currentItem) {
      observer.observe(currentItem);
    }

    return () => {
      if (currentItem) {
        observer.unobserve(currentItem);
      }
    };
  }, []);

  return (
    <div 
      className={`timeline-item ${event.category} ${isVisible ? 'in-view' : ''}`} 
      key={index}
      ref={itemRef}
    >
      <div className="timeline-dot" />
      <div className="timeline-content">
        <div className="timeline-header">
          <div className="timeline-icon">{getEventIcon(event)}</div>
          <div className="timeline-details">
            <span className="timeline-date">{event.date}</span>
            <h4>{event.title}</h4>
          </div>
        </div>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

function Timeline({ events, t }) {
  const [activeFilter, setActiveFilter] = useState('work');
  const [isExpanded, setIsExpanded] = useState(false);

  const filters = t.filters || {
    all: "Todos",
    work: "Laboral",
    project: "Proyectos"
  };

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

  const displayedEvents = isExpanded ? filteredEvents : filteredEvents.slice(0, 3);

  return (
    <div className={`timeline-container ${activeFilter === 'all' ? 'timeline-compact' : ''}`}>
      <div className="timeline-filters">
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            className={`timeline-filter-btn filter-${key} ${activeFilter === key ? 'active' : ''}`}
            onClick={() => {
              setActiveFilter(key);
              setIsExpanded(false); // Reset expansion for better UX
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="timeline-line-v" />
      
      <div className="timeline-items">
        {displayedEvents.map((event, index) => (
          <TimelineItem key={`${event.title}-${index}`} event={event} index={index} />
        ))}
      </div>
      
      {filteredEvents.length > 3 && (
        <div className="timeline-actions">
          <button 
            className="timeline-toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? t.showLess : t.showMore}
          </button>
        </div>
      )}
    </div>
  );
}

export default Timeline;