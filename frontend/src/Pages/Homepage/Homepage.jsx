import React, { useEffect, useState } from 'react';
import Hero from '../../Components/Hero/Hero';
import Template from '../../Components/Template/Template';
import LimitedTimeOffer from '../../Components/LimitedTimeOffer/LimitedTimeOffer';
import api from '../../api/config';

const Homepage = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem('authToken');
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await api.get('/events/public-events/', { headers });
        setEventList(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEventList([]);
      }
    }

    fetchEvents();
  }, []);

  const handleBuyTicket = (eventId) => {
    console.log("Buy ticket for:", eventId);
  };

  return (
    <div>
      <Hero />
      <Template eventList={eventList} />
      <LimitedTimeOffer eventList={eventList} handleBuyTicket={handleBuyTicket} />
    </div>
  );
};

export default Homepage;
