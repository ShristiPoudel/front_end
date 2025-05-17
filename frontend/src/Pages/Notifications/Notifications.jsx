import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import './Notifications.css';
import { useNavigate } from 'react-router-dom';


const Notifications = () => {
  const { notifications, markAsRead, markAsUnread, loading } = useNotifications();
  const navigate = useNavigate();

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li key={n.id} className={`notification-item ${n.is_read ? 'read' : 'unread'}`}>
              <p>{n.message}</p>
              <span>{new Date(n.created_at).toLocaleString()}</span>
              <div className="actions">
                {n.is_read ? (
                  <button onClick={() => markAsUnread(n.id)}>Mark as Unread</button>
                ) : (
                  <button onClick={() => markAsRead(n.id)}>Mark as Read</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
