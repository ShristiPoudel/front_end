import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditEvent.css"; 
import api from '../../api/config';
import { useLocation, useNavigate } from 'react-router-dom';

const EditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    event_dates: "",
    time_start: "",
    venue_name: "",
    venue_location: "",
    venue_capacity: "",
    vip_price: "",
    common_price: "",
    description: "",
    image: null,
  });

  const [token] = useState(localStorage.getItem("authToken") || "");
  const [error, setError] = useState(null);


  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        category: event.category?.map(cat => cat.name).join(", ") || "",
        event_dates: event.event_dates || "",
        time_start: event.time_start || "",
        venue_name: event.venue_name || "",
        venue_location: event.venue_location || "",
        venue_capacity: event.venue_capacity || "",
        vip_price: event.vip_price || "",
        common_price: event.common_price || "",
        description: event.description || "",
        image: null,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === "category") {
        formData[key]
          .split(",")
          .map(c => c.trim())
          .filter(Boolean)
          .forEach(cat => data.append("category", cat));
      } else if (formData[key] !== null && formData[key] !== "") {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await api.put(`/events/${event.id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Event updated successfully!");
      setTimeout(() => {
        navigate(`/explore/${event.id}`);
      }, 1500); // 1.5 seconds
      
      console.log(response.data);
    } catch (error) {
      console.error("Error updating event:", error.response?.data || error.message);
      setError(error.response?.data || "An error occurred");
      toast.error("Failed to update event.");
    }
  };

  if (!event) {
    return <p>No event data provided for editing.</p>;
  }

  return (
    <div className="create-container">
      <ToastContainer />
      <div className="create-event">
        <h1>Edit Event</h1>
        {error && <div className="error-message">{JSON.stringify(error)}</div>}

        <form className="post-event-fields" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Reuse same form groups */}
          <div className="form-group">
            <label htmlFor="title">Event Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="category">Event Categories:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} />
            <small>Separate multiple categories with commas.</small>
          </div>

          <div className="form-group">
            <label htmlFor="event_dates">Event Date:</label>
            <input type="date" name="event_dates" value={formData.event_dates} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="time_start">Event Time:</label>
            <input type="time" name="time_start" value={formData.time_start} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="venue_name">Venue Name:</label>
            <input type="text" name="venue_name" value={formData.venue_name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="venue_location">Venue Location:</label>
            <input type="text" name="venue_location" value={formData.venue_location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="venue_capacity">Venue Capacity:</label>
            <input type="number" name="venue_capacity" value={formData.venue_capacity} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="vip_price">VIP Ticket Price (Rs):</label>
            <input type="number" name="vip_price" value={formData.vip_price} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="common_price">General Ticket Price (Rs):</label>
            <input type="number" name="common_price" value={formData.common_price} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="image">Change Event Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="5" />
          </div>

          <div className="post">
            <button type="submit">Update Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
