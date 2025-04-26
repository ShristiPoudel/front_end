import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateEvent.css"; 
import api from '../../api/config';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: [],
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData({ ...formData, category: Array.from(e.target.selectedOptions, option => option.value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === "category") {
        formData[key].forEach(category => data.append("category", category));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post("/events/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Event created successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating event:", error.response?.data || error.message);
      setError(error.response?.data || "An error occurred");
      toast.error("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="create-container">
      <ToastContainer />
      <div className="create-event">
        <h1>Create an Event</h1>
        {error && <div className="error-message">{JSON.stringify(error)}</div>}
        
        <form className="post-event-fields" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="title">Event Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter event name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Event Category:</label>
            <select 
              id="category"
              name="category" 
              multiple
              value={formData.category} 
              onChange={handleChange}
              className="category-select"
            >
              <option value="Music">Music</option>
              <option value="Tech">Tech</option>
              <option value="Sports">Sports</option>
            </select>
            <small>(Hold CTRL to select multiple)</small>
          </div>

          <div className="form-group">
            <label htmlFor="event_dates">Event Date:</label>
            <input
              type="date"
              id="event_dates"
              name="event_dates"
              value={formData.event_dates}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="time_start">Event Time:</label>
            <input
              type="time"
              id="time_start"
              name="time_start"
              value={formData.time_start}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue_name">Venue Name:</label>
            <input
              type="text"
              id="venue_name"
              name="venue_name"
              placeholder="Enter event venue"
              value={formData.venue_name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue_location">Venue Location:</label>
            <input
              type="text"
              id="venue_location"
              name="venue_location"
              placeholder="Enter event location"
              value={formData.venue_location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="venue_capacity">Venue Capacity:</label>
            <input
              type="number"
              id="venue_capacity"
              name="venue_capacity"
              placeholder="Enter venue capacity"
              value={formData.venue_capacity}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vip_price">VIP Ticket Price (Rs):</label>
            <input
              type="number"
              id="vip_price"
              name="vip_price"
              placeholder="Enter ticket price"
              value={formData.vip_price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="common_price">General Ticket Price (Rs):</label>
            <input
              type="number"
              id="common_price"
              name="common_price"
              placeholder="Enter ticket price"
              value={formData.common_price}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Event Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              name="description"
              placeholder="Provide event details..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

          <div className="post">
            <button type="submit">Create Event:</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;