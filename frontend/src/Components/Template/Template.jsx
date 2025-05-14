import React, { useEffect, useState } from 'react';
import api from '../../api/config';
import './Template.css';
import fixed from '../../assets/fixed.png';
import BuyTicket from '../../Pages/BuyTicket/BuyTicket';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoHeart } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';

const Template = ({ eventList: searchResults = [] }) => {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [day, setDay] = useState("All");
  // const [showModal, setShowModal] = useState(false);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 14;

  useEffect(() => {
    if (searchResults.length > 0) {
      setEventList(searchResults);
      return;
    }

    async function fetchEvents() {
      try {
        const token = localStorage.getItem('authToken');
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await api.get('/events/public-events/', { headers });
        console.log("events",response.data);
        setEventList(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        if (error.response && error.response.status === 401) {
          setEventList([]);
        }
      }
    }

    fetchEvents();
  }, []);

  const handleFavorite = (eventId) => {
    console.log('Added to favorites:', eventId);
  };

  const handleBuyTicket = (eventId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const event = eventList.find(e => e.id === eventId);
    setSelectedEvent(event);
    setShowModal(true);
  };

  // const handleConfirmPurchase = async (quantity, eventId, ticketType = 'common') => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) {
  //     navigate('/login');
  //     return;
  //   }

  //   try {
  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Token ${token}`,
  //     };

  //     const response = await axios.post(
  //       `http://127.0.0.1:8000/events/${eventId}/khalti-initiate/`,
  //       { ticket_type: ticketType, quantity },
  //       { headers }
  //     );

  //     if (response.data.payment_url) {
  //       window.location.href = response.data.payment_url;
  //     }
  //   } catch (error) {
  //     console.error('Error initiating payment:', error);
  //     toast.success('Failed to initiate payment. Please try again.');
  //   }
  // };

  const totalPages = Math.ceil(eventList.length / eventsPerPage);
  const visibleEvents = eventList.slice(0, currentPage * eventsPerPage);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="template-container">
      <ul className="filter-tabs">
        <li onClick={() => setDay('All')}>All {day === "All" && <hr />}</li>
        <li onClick={() => setDay('Today')}>Today {day === "Today" && <hr />}</li>
        <li onClick={() => setDay('Tomorrow')}>Tomorrow {day === "Tomorrow" && <hr />}</li>
        <li onClick={() => setDay('This Week')}>This Week {day === "This Week" && <hr />}</li>
      </ul>

      <div className="template-design">
        {visibleEvents.flatMap((event, index) => {
          const card = (
            <EventCard
              key={`card-${index}`}
              event={event}
              onClick={(e) =>
                navigate(`/explore/${event.id}`, { state: { events: event } })
              }
              onFavorite={handleFavorite}
              onBuyTicket={handleBuyTicket}
            />
          );

          if (index === 8) {
            return [
              <div key="spacer-1" className="grid-spacer"></div>,
              <div key="spacer-2" className="grid-spacer"></div>,
              card,
            ];
          }

          return [card];
        })}
      </div>

      <div className="fixed">
        <img src={fixed} alt="fixedImage" className='fixed-image' />
      </div>

      <div className='load-more-events'>
  {currentPage * eventsPerPage < eventList.length ? (
    <button className='load-more-events-btn' onClick={handleLoadMore}>
      LOAD MORE EVENTS
    </button>
  ) : (
    <button
      className='load-more-events-btn'
      onClick={() => setCurrentPage(1)}
      disabled={eventList.length <= eventsPerPage}
    >
      SHOW LESS EVENTS
    </button>
  )}
</div>


{/* 
      {showModal && selectedEvent && (
        <BuyTicket
          event={selectedEvent}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmPurchase}
        />
      )} */}
    </div>
  );
};

export default Template;