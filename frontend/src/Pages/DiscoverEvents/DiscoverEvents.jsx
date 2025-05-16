import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api/config';
import EventCard from '../../Components/EventCard/EventCard';
import { useAuth } from '../../context/AuthContext';
import '../../Components/Template/Template.css';  
import './DiscoverEvents.css'

const DiscoverEvents = () => {
  const location = useLocation();
  const [filteredEvents, setFilteredEvents] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const paramsObject = Object.fromEntries(searchParams.entries());

        const token = localStorage.getItem("token");

        const response = await api.get('/events/public-events/', {
          params: paramsObject,
          headers: token ? { Authorization: `Token ${token}` } : {}
        });
        
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching filtered events:", error);
        setFilteredEvents([]);
      }
    };

    fetchFilteredEvents();
  }, [location.search, token]);

  return (
    <div className="discover-events-page">
      <h2 className='discovered'>Discovered Events</h2>
      {filteredEvents.length > 0 ? (
        <div className="template-design">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className='discovered-p'>No events found.</p>
      )}
    </div>
  );
};

export default DiscoverEvents;
