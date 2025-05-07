import React from 'react';
import { GoHeart } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import './Explore.css';

const Explore = () => {
  const location = useLocation();
  const event = location.state?.events;

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
      {/* Banner Section */}
      <div className="explore-banner">
        <img src={event.image} alt={event.title} className="explore-banner-img" />
        <div className="explore-banner-overlay">
          <h1 className="explore-banner-title">{event.title}</h1>
          <p className="explore-banner-org">
            By <span className="explore-banner-org-name">{event.organizer || "The World Organizers"}</span>
          </p>
        </div>
        <button
          className="explore-favorite-btn"
          onClick={() => handleFavorite(event.id)}
        >
          <GoHeart />
        </button>
      </div>

      {/* Categories */}
      <div className="explore-tags">
        {event.category?.map((cat, index) => (
          <span key={index} className="explore-tag">
            {cat.name}
          </span>
        ))}
      </div>

      {/* Floating Info Bar */}
      <div className="explore-info-bar">
        <div className="info-item">
          <strong>Date</strong>
          <p>{event.event_dates}</p>
        </div>
        <div className="info-item">
          <strong>Time</strong>
          <p>{event.time_start}</p>
        </div>
        <div className="info-item">
          <strong>Type</strong>
          <p>{event.duration || '60 min'}</p>
        </div>
        <div className="info-item">
          <strong>Location</strong>
          <p>{event.venue_location}</p>
        </div>
        <div className="info-item price-box">
          <strong>Price</strong>
          <p>${event.common_price}</p>
        </div>
        <div className="info-item">
          <button className="buy-ticket-btn" onClick={() => handleBuyTicket(event.id)}>
            Buy Ticket
          </button>
        </div>
      </div>

      {/* Event Description */}
      <div className="explore-description">
        <p>{event.description}</p>
      </div>

      {/* Guidelines Section */}
      <div className="explore-section">
        <h3>Event guidelines and policies</h3>
        <ul>
          <li>
            We prioritize creating a safe and inclusive environment for all attendees. Any form of
            discrimination, harassment, or disruptive behavior will not be tolerated.
          </li>
          <li>
            To ensure the success of the event, please adhere to our photography policy which
            respects the privacy of all guests.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="explore-section">
        <h3>Frequently Asked Questions</h3>
        <details>
          <summary>What time does the Imagine Dragons concert in LA begin?</summary>
          <p>{event.time_start}</p>
        </details>
        <details>
          <summary>Where is the Grand Arena located, and how do I get there?</summary>
          <p>{event.venue_location}</p>
        </details>
        <details>
          <summary>Will there be any opening acts before Imagine Dragons take the stage?</summary>
          <p>To be announced.</p>
        </details>
        <details>
          <summary>Can I bring a camera or recording device to the event?</summary>
          <p>Only mobile devices allowed unless authorized by the organizers.</p>
        </details>
      </div>

      {/* Ask Question */}
      <div className="explore-section">
        <p>
          Don’t see the answer you’re looking for?{' '}
          <a href="#ask">Post Your Question</a>
        </p>
        <form className="explore-question-form">
          <input
            type="text"
            placeholder="Please submit your question"
            className="question-input"
          />
          <button type="submit" className="question-submit-btn">
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Explore;
