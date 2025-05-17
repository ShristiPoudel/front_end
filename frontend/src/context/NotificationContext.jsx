import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const fetchNotifications = async () => {
    const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }


    try {
      const headers = { Authorization: `Token ${token}` };
      const res = await axios.get('http://127.0.0.1:8000/notifications/', { headers });
      setNotifications(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch notifications', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);
  
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
        return;
      }

      const headers = {
        Authorization: `Token ${token}`,
      };
      await axios.put(`http://127.0.0.1:8000/notifications/${id}/read/`, {}, {
        headers});
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  const markAsUnread = (id) => {
    // Optional endpoint; for frontend toggle:
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: false } : n))
    );
  };

  useEffect(() => {
    if (!token) return;
  
    fetchNotifications(); // your fetch function that uses token
  }, [token]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAsUnread, loading }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
