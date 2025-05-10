import React from 'react';
import { GoHeart } from 'react-icons/go';
import './EventCard.css'; 

const EventCard = ({ event, onClick, onFavorite, onBuyTicket }) => {
  return (
    <div className="event-card" onClick={() => onClick && onClick(event)}>
      <div className="favorite-btn-container">
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite && onFavorite(event.id);
          }}
        >
          <GoHeart />
        </button>
      </div>
      <img src={event.image} alt={event.title} />
      <p>{event.title}</p>
      <div className="event-category">
        Category: {event.category.map(cat => cat.name).join(', ')}
      </div>

      <div className="time-date">
        <div className="event-date">Date: {event.event_dates}</div>
        <div className="event-time">Time: {event.time_start}</div>
      </div>

      <div className="price">
        Start from:
        <div className='rs'>NPR {event.common_price}</div>
      </div>

      <div className="buy-ticket-btn-container">
        <button
          className="buy-ticket-btn"
          onClick={(e) => {
            e.stopPropagation();
            onBuyTicket && onBuyTicket(event.id);
          }}
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
