import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../../api/config';
import EventCard from '../../Components/EventCard/EventCard';
import { useAuth } from '../../context/AuthContext';
import '../../Components/Template/Template.css';
import './DiscoverEvents.css';

const DiscoverEvents = () => {
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { token } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 16;

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const visibleEvents = filteredEvents.slice(0, currentPage * eventsPerPage);

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const paramsObject = Object.fromEntries(searchParams.entries());

        const authToken = localStorage.getItem('authToken');

        const response = await api.get('/events/public-events/', {
          params: paramsObject,
          headers: authToken ? { Authorization: `Token ${authToken}` } : {},
        });

        setFilteredEvents(response.data);
      } catch (error) {
        console.error('Error fetching filtered events:', error);
        setFilteredEvents([]);
      }
    };

    fetchFilteredEvents();
  }, [location.search]);

  // Optional: Reset pagination on new search
  useEffect(() => {
    setCurrentPage(1);
  }, [location.search]);

  // Scroll to top when showing less
  const handleShowLess = () => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="discover-events-page">
      <h2 className="discovered">Discovered Events</h2>
      <div className="template-container">
        {filteredEvents.length > 0 ? (
          <div className="template-design">
            {visibleEvents.map((event) => (
              <Link
                key={event.id}
                to={`/explore/${event.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        ) : (
          <p className="discovered-p">No events found.</p>
        )}
      </div>

      {filteredEvents.length > eventsPerPage && (
  <div className="load-more-events-filter">
    {currentPage * eventsPerPage < filteredEvents.length ? (
      <button className="load-more-events-btn-filter" onClick={() => setCurrentPage(prev => prev + 1)}>
        LOAD MORE EVENTS
      </button>
    ) : (
      <button className="load-more-events-btn-filter" onClick={handleShowLess}>
        SHOW LESS EVENTS
      </button>
    )}
  </div>
)}

    </div>
  );
};

export default DiscoverEvents;
