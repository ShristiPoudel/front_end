import React from 'react';
import { GoHeart } from 'react-icons/go';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import './EventCard.css';

const EventCard = ({ event, onClick, onFavorite, onBuyTicket }) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate(); // ✅ Setup navigation

  const userRole = user?.role;
  const isOrganizer = user?.email === event.user;

  const handleBuyTicketClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.error('Please log in to buy a ticket');
      setTimeout(()=>{
        navigate("/login")

      },1500)
      return;
    }

    if (userRole === 'organizer' && !isOrganizer) {
      toast.error('Login as Attendee');
    } else {
      navigate(`/explore/${event.id}`); // ✅ Navigate to explore page for this event
    }
  };

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
      <p style={{ fontWeight: 'bold' }}>{event.title}</p>
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

      {!isOrganizer && (
        <div className="buy-ticket-btn-container">
          <button
            className="buy-ticket-btn"
            onClick={handleBuyTicketClick}
            disabled={isOrganizer}
          >
            Buy Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
