import React, { useEffect, useState } from 'react';
import api from '../../api/config';
import './Events.css';
import '../../Components/Template/Template.css'; // for .template-design styles
import EventCard from '../../Components/EventCard/EventCard';
import { useNavigate, Link } from 'react-router-dom';

const categoryMap = {
  'Music & Concerts': ['music', 'concerts'],
  'Arts & Culture': ['arts', 'culture'],
  'Tech & Workshops': ['tech', 'workshop', 'technology'],
  'Games & Sports': ['games', 'sports'],
};

const Events = () => {
  const [groupedEvents, setGroupedEvents] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const headers = token ? { Authorization: `Token ${token}` } : {};
        const response = await api.get('/events/public-events/', { headers });
        const allEvents = response.data;

        const grouped = {
          'Music & Concerts': [],
          'Arts & Culture': [],
          'Tech & Workshops': [],
          'Games & Sports': [],
          'Entertainment': [],
        };

        allEvents.forEach(event => {
          const categories = event.category?.map(c => c.name.toLowerCase()) || [];
          let matched = false;

          for (const [groupName, keywords] of Object.entries(categoryMap)) {
            if (categories.some(cat => keywords.includes(cat))) {
              grouped[groupName].push(event);
              matched = true;
              break;
            }
          }

          if (!matched) {
            grouped['Entertainment'].push(event);
          }
        });

        setGroupedEvents(grouped);
      } catch (error) {
        console.error('Error fetching grouped events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="explore-events-page">
      {Object.entries(groupedEvents).map(([title, events]) =>
        events.length > 0 ? (
          <div key={title} className="event-category-section">
            <h2 className="event-category-title">{title}</h2>
            <div className="template-container-event">
              <div className="template-design">
                {events.map(event => (
                  <Link
                    key={event.id}
                    to={`/explore/${event.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <EventCard event={event} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Events;
