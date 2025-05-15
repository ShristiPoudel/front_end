import React from 'react';
import './TicketCard.css';
import logo from '../../assets/nobg.png';

const TicketCard = ({ ticket }) => {
  return (

<div className="ticket-card">
  
      <div className="ticket-header">
       <img src={logo} alt="EventHub Logo" /> 
       <div className="header-text">
       <div className="logo">{ticket.event_title}</div>
        <div className="location">
          {ticket.venue_name}, 
         <div className="venue_location"> {ticket.venue_location} </div>
        </div>
       </div>
      </div>

      
      <div className="ticket-details">
        <div className='ticket-name'><strong>Event Date:</strong> {ticket.event_dates}</div>
        <div className='ticket-name'><strong>Event Time:</strong> {ticket.time_start}</div>
        <div className='ticket-name'><strong>Location:</strong> {ticket.venue_location}</div>
        <div className='ticket-name'><strong>ID:</strong> {ticket.id }</div>
        <div className='ticket-name'><strong>Email:</strong> {ticket.user_email }</div>
      </div>

      <div className="ticket-footer">
        <div className="ticket-type">{ticket.ticket_type} Ticket</div>
        <div className="qr">
        <img src={ticket.qr_code} alt="QR Code" className="qr-image" />
        <div className="terms">
          Tickets once sold cannot be refunded.<br />
          *Terms and Conditions Applied.
        </div>
        </div>
      </div>
    </div>

  );
};

export default TicketCard;
