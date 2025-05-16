import React, { createContext, useContext, useState } from 'react';

const InterestContext = createContext();

export const InterestProvider = ({ children }) => {
  const [interestedEvents, setInterestedEvents] = useState(new Set());

  const markInterested = (eventId) => {
    setInterestedEvents(prev => new Set(prev).add(eventId));
  };

  const unmarkInterested = (eventId) => {
    setInterestedEvents(prev => {
      const newSet = new Set(prev);
      newSet.delete(eventId);
      return newSet;
    });
  };

  const isInterested = (eventId) => interestedEvents.has(eventId);

  return (
    <InterestContext.Provider value={{ markInterested, unmarkInterested, isInterested, interestedEvents }}>
      {children}
    </InterestContext.Provider>
  );
};

export const useInterest = () => useContext(InterestContext);
