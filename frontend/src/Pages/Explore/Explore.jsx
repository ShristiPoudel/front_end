import React from 'react';
import { GoHeart } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import "./Explore.css";

const Explore = () => {
  const location = useLocation();
  const event = location.state?.events; 

  console.log("Event Data:", event); 

  if (!event) {
    return <p>No event details available.</p>;
  }

   const handleFavorite = (eventId) => {
   console.log('Added to favorites:', eventId);
 };

  const handleBuyTicket = (eventId) => {
    console.log('Buy ticket for:', eventId);
  };

  return (
    <div className="explore">
    <div className="explore-event-details">
      {/* Favorite Button */}
      <div className="explore-favorite-btn-container">
        <button className="explore-favorite-btn" onClick={() => handleFavorite(event.id)}>
          <GoHeart />
        </button>
      </div>

      
      <img src={event.image} alt={event.title} className="explore-event-image" />

    
      <h2>{event.title}</h2>

      
      <p className="explore-event-description">{event.description}</p>

      <div className="explore-event-category">
        <strong>Categories:</strong>
        {event.category?.map((cat, index) => (
          <span key={index} className="category-badge">
            {cat.name}
          </span>
        ))}
      </div>

      <div className="explore-time-date">
        <div className="explore-event-date"><strong>Date:</strong> {event.event_dates}</div>
        <div className="explore-event-time"><strong>Time:</strong> {event.time_start}</div>
      </div>

      <div className="explore-venue-details">
        <p><strong>Venue Name:</strong> {event.venue_name}</p>
        <p><strong>Venue Location:</strong> {event.venue_location}</p>
        <p><strong>Capacity:</strong> {event.venue_capacity} people</p>
      </div>

      <div className="explore-ticket-prices">
        <p><strong>General Price:</strong> ${event.common_price}</p>
        <p><strong>VIP Price:</strong> ${event.vip_price}</p>
      </div>

    
      <div className="explore-interest-count"><strong>Interested:</strong> {event.interest_count || 0}</div>
      <div className="buy-ticket-btn-container">
        <button className="buy-ticket-btn" onClick={() => handleBuyTicket(event.id)}>
          Buy Ticket
        </button>
      </div>
    </div>
    </div>
  );
};

export default Explore;
