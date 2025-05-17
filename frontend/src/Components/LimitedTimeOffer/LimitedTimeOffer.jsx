import React from 'react';
import './LimitedTimeOffer.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LimitedTimeOffer = ({ eventList }) => {
  const limitedEvent = eventList.find(event => event.id === 17);
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  if (!limitedEvent) return null;

  const userRole = user?.role;
  const isEventOwner = user?.email === limitedEvent.user;

  // ✅ Show button for:
  // - attendees
  // - organizers who are NOT the event owner
  const shouldShowButton =
    userRole === 'attendee' || (userRole === 'organizer' && !isEventOwner);

  const handleBuyTicket = () => {
    if (!isLoggedIn) {
      toast.error('Please log in to buy a ticket');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    // prevent event owner organizer from buying ticket
    if (userRole === 'organizer' && isEventOwner) {
      toast.error("You can't buy tickets for your own event.");
      return;
    }

    navigate(`/explore/${limitedEvent.id}`);
  };

  return (
    <section className="limited-offer-section">
      <div className="limited-offer-content">
        <div className="ticket-image-wrapper">
          <div className="ticket-shape-back"></div>
          <img
            src={limitedEvent.image}
            alt={limitedEvent.title}
            className="ticket-image"
          />
        </div>

        <div className="limited-offer-text">
          <h2 className="offer-heading">LIMITED TIME OFFER !</h2>
          <h3>{limitedEvent.title}</h3>
          <p>{limitedEvent.description}</p>

          {shouldShowButton && (
            <button className="limited-btn" onClick={handleBuyTicket}>
              Buy Ticket
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;
