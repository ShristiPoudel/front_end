import React from 'react';
import { useNotifications } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const Notifications = () => {
  const { notifications, markAsRead, markAsUnread, loading } = useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = async (n) => {
    if (!n.is_read) {
      await markAsRead(n.id);
    }
    navigate(`/explore/${n.event}`); // Assuming `event_id` is in the notification object
  };

  if (loading) return <p>Loading notifications...</p>;

  return (
    <div className="notification-page">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`notification-item ${n.is_read ? 'read' : 'unread'}`}
              onClick={() => handleNotificationClick(n)}
              style={{ cursor: 'pointer' }}
            >
              <p>{n.message}</p>
              <span>{new Date(n.created_at).toLocaleString()}</span>
              <div className="actions" onClick={(e) => e.stopPropagation()}>
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
