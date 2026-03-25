function Timeline({ events }) {
  return (
    <div className="timeline-container">
      {/* Línea horizontal */}
      <div className="timeline-line" />

      {/* Eventos */}
      <div className="timeline-events">
        {events.map((event, index) => (
          <div className="timeline-event" key={index}>
            <div className="event-dot" />
            <div className="event-content">
              <h4>{event.title}</h4>
              <p className="event-date">{event.date}</p>
              <p className="event-desc">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Timeline;