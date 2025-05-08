import React, { useState } from 'react';
import './BuyTicket.css';

const BuyTicket = ({ event, onClose, onConfirm }) => {
  const [quantity, setQuantity] = useState(1);
  const [ticketType, setTicketType] = useState('common');

  if (!event) return null;

  const price =
    ticketType === 'vip' ? event.vip_price : event.common_price;

  const handleConfirm = () => {
    onConfirm(quantity, event.id, ticketType);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{event.title}</h3>

        {/* Ticket Type Selection */}
        <label htmlFor="ticketType">Ticket Type:</label>
        <select
          id="ticketType"
          value={ticketType}
          onChange={(e) => setTicketType(e.target.value)}
        >
          <option value="common">Common - NPR {event.common_price}</option>
          <option value="vip">VIP - NPR {event.vip_price}</option>
        </select>

        {/* Quantity */}
        <label htmlFor="ticketQty">Quantity:</label>
        <input
          id="ticketQty"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
        />

        {/* Total */}
        <p>Total: NPR {price * quantity}</p>

        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleConfirm}>Pay</button>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
