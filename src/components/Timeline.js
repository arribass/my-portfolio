import React, { useState, useEffect, useRef } from 'react';
import './Timeline.css';

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
      className={`timeline-item ${isVisible ? 'in-view' : ''}`} 
      key={index}
      ref={itemRef}
    >
      <div className="timeline-dot" />
      <div className="timeline-content">
        <div className="timeline-header">
          {event.icon && <div className="timeline-icon">{event.icon}</div>}
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
  const [activeFilter, setActiveFilter] = useState('all');
  const [isExpanded, setIsExpanded] = useState(false);

  const filters = t.filters || {
    all: "Todos",
    work: "Laboral",
    projects: "Proyectos"
  };

  const filteredEvents = activeFilter === 'all'
    ? events
    : events.filter(event => event.category === activeFilter);

  const displayedEvents = isExpanded ? filteredEvents : filteredEvents.slice(0, 3);

  return (
    <div className="timeline-container">
      <div className="timeline-filters">
        {Object.entries(filters).map(([key, label]) => (
          <button
            key={key}
            className={`timeline-filter-btn ${activeFilter === key ? 'active' : ''}`}
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