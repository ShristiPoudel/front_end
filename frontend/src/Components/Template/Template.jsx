import React, { useEffect, useState } from 'react';
import api from '../../api/config';
import './Template.css';
import fixed from '../../assets/fixed.png';
import { useNavigate } from 'react-router-dom';
import EventCard from '../EventCard/EventCard';
import dayjs from 'dayjs';

const Template = ({ eventList: searchResults = [] }) => {
  const navigate = useNavigate();
  const [eventList, setEventList] = useState([]);
  const [day, setDay] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 14;

  const [isMobile, setIsMobile] = useState(
    window.innerWidth > 630 && window.innerWidth < 800
  );
  const [isSmallMobile, setIsSmallMobile] = useState(
    window.innerWidth <= 630
  );

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
        console.log("events", response.data);
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width > 630 && width < 800);
      setIsSmallMobile(width <= 630);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🧠 Filter Logic
  const filterEventsByDay = (events, filter) => {
    const today = dayjs().startOf('day');
    const tomorrow = today.add(1, 'day');
    const endOfWeek = today.endOf('week');

    switch (filter) {
      case 'Today':
        return events.filter(event => dayjs(event.event_dates).isSame(today, 'day'));
      case 'Tomorrow':
        return events.filter(event => dayjs(event.event_dates).isSame(tomorrow, 'day'));
      case 'This Week':
        return events.filter(event =>
          dayjs(event.event_dates).isAfter(today.subtract(1, 'day')) &&
          dayjs(event.event_dates).isBefore(endOfWeek.add(1, 'day'))
        );
      case 'All':
      default:
        return events;
    }
  };

  const filteredEvents = filterEventsByDay(eventList, day);
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const visibleEvents = filteredEvents.slice(0, currentPage * eventsPerPage);

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
    // setSelectedEvent(event);
    // setShowModal(true);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="template-container">
      <ul className="filter-tabs">
        <li onClick={() => { setDay('All'); setCurrentPage(1); }}>
          All {day === "All" && <hr />}
        </li>
        <li onClick={() => { setDay('Today'); setCurrentPage(1); }}>
          Today {day === "Today" && <hr />}
        </li>
        <li onClick={() => { setDay('Tomorrow'); setCurrentPage(1); }}>
          Tomorrow {day === "Tomorrow" && <hr />}
        </li>
        <li onClick={() => { setDay('This Week'); setCurrentPage(1); }}>
          This Week {day === "This Week" && <hr />}
        </li>
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

          if (isMobile && index === 6) {
            return [
              <div key="spacer-1" className="grid-spacer"></div>,
              <div key="spacer-2" className="grid-spacer"></div>,
              card
            ];
          } else if (!isMobile && !isSmallMobile && index === 8) {
            return [
              <div key="spacer-1" className="grid-spacer"></div>,
              <div key="spacer-2" className="grid-spacer"></div>,
              card
            ];
          }

          return [card];
        })}
      </div>
      {day === "All" && (
  <div className="fixed">
    <img src={fixed} alt="fixedImage" className='fixed-image' />
  </div>
)}

{filteredEvents.length > eventsPerPage && (
  <div className='load-more-events'>
    {currentPage * eventsPerPage < filteredEvents.length ? (
      <button className='load-more-events-btn' onClick={handleLoadMore}>
        LOAD MORE EVENTS
      </button>
    ) : (
      <button
        className='load-more-events-btn'
        onClick={() => setCurrentPage(1)}
      >
        SHOW LESS EVENTS
      </button>
    )}
  </div>
)}


    </div>
  );
};

export default Template;
