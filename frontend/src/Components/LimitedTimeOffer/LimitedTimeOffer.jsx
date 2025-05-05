import React from 'react';
import './LimitedTimeOffer.css'; // You'll style this separately

const LimitedTimeOffer = ({ eventList, handleBuyTicket }) => {
  const limitedEvent = eventList.find(event => event.id === 17);

  if (!limitedEvent) return null; // Fallback if not found

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

          <button
            className="buy-ticket-btn"
            onClick={() => handleBuyTicket(limitedEvent.id)}
          >
            Buy Ticket
          </button>
        </div>
      </div>
    </section>
  );
};

export default LimitedTimeOffer;
