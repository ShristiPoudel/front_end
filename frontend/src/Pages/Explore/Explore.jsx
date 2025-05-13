import React,{useState,useEffect} from 'react';
import { GoHeart } from 'react-icons/go';
import { useLocation } from 'react-router-dom';
import './Explore.css';
import api from '../../api/config';
import locationMap from '../../assets/location.jpg'
import { IoLocationOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';
import { IoMdArrowDropdown } from "react-icons/io";
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const Explore = () => {
  const {id}= useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  const[event,setEvent] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  
  useEffect(() => {
    if (!event && id) {
      api.get(`/events/public-events/${id}/`)
        .then(response => setEvent(response.data))
        .catch(error => console.error('Error fetching event:', error));
    }
  }, [event, id]);

  if (!event) {
    return <p>Loading event details...</p>; // or spinner
  }
  const handleFavorite = (eventId) => {
    console.log('Added to favorites:', eventId);
  };

  const handleBuyTicket = (eventId) => {
    console.log('Buy ticket for:', eventId);
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('authToken');
      
      console.log("Attempting to delete event:", {
        eventId,
        endpoint: `/events/${eventId}/`,
        tokenPresent: !!token
      });
  
      const response = await api.delete(`/events/${eventId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      console.log("Delete response:", response);
      toast.success("Event deleted successfully");
      navigate("/");
      
    } catch (err) {
      console.error("Full delete error:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        config: err.config
      });
      
      toast.error(err.response?.data?.message || "Failed to delete event");
    }
  };
  

  return (
    <div className="explore">
      {/* Banner Section */}
      <div className="explore-banner">
        <img src={event.image} alt={event.title} className="explore-banner-img" />

        <div className="explore-banner-details">
          <h1 className="explore-banner-title">{event.title}</h1>
          <p className="explore-banner-org">
            By <span className="explore-banner-org-name">{event.organizer_name || "The World Organizers"}</span>
           </p> 
          </div>
       

        <div className='explore-favorite-btn-container'>
        <button
          className="explore-favorite-btn"
          onClick={() => handleFavorite(event.id)}
        >
          <GoHeart />
        </button>
        </div>
      </div>

      {/* Categories */}
      <div className="explore-tags-section">
    <div className="explore-tags">
      {event.category?.map((cat, index) => (
        <span key={index} className="explore-tag">
          {cat.name}
        </span>
      ))}
    </div>
  </div>


 

      <div className="explore-map-wrapper">
        {/* Floating Info Bar */}
      <div className="explore-info-bar">
      <div className="info-item">
      <label>
           <IoCalendarOutline className='item-icon' />
           Date
         </label>
            <p>{event.event_dates}</p>
          </div>
          <div className="info-item">
            <label>
            <IoSearchOutline className="info-icon" />
              Time
              </label>
            <p>{event.time_start}</p>
          </div>
          <div className="info-item">
            <label>
            <BiCategoryAlt className="info-icon" />
              Type</label>
            <p>
              {Array.isArray(event.category) && event.category.length > 0
                ? event.category.map(cat => cat.name).join(', ')
                : 'N/A'}
            </p>
          </div>
          <div className="info-item">
            <label>
            <IoLocationOutline className="info-icon" />
              Location
              </label>
            <p>{event.venue_location}</p>
          </div>
          <div className="info-item price-box">
            <label>
            <LiaRupeeSignSolid className="info-icon" />
              Price
              </label>
            <p>NPR {event.common_price}</p>
          </div>


          <div className="info-item dropdown-wrapper">
          {user?.role === 'organizer' && user?.email === event.user ? (
    <div className="organizer-dropdown">
      <button
        className="explore-buy-ticket-btn"
        onClick={() => setDropdownOpen(prev => !prev)}
      >
        Manage Event <IoMdArrowDropdown />
      </button>

      {dropdownOpen && (
        <div className="dropdown-menu styled-dropdown">
          <button
            className="dropdown-item"
            onClick={() => navigate("/organizer-dashboard/edit-events", { state: { event } })}
          >
            <FaEdit className="dropdown-icon" />
            Edit
          </button>
          <button
            className="dropdown-item"
            onClick={() => setShowConfirm(true)}

          >
            <FaTrash className="dropdown-icon" />
            Delete
          </button>
        </div>
      )}
    </div>
  ) : (
    <button
      className="explore-buy-ticket-btn"
      onClick={() => handleBuyTicket(event.id)}
    >
      Buy Ticket
    </button>
  )}
</div>




        </div>


      {/* Event Description */}
      <div className="explore-description">
        <p>{event.description}</p>
      </div>

      <div className="explore-map-section">
        <img
          alt="Venue Map"
          src={locationMap}
          className="explore-map-img"
        />
      </div>
      </div>

      {/* Guidelines Section */}
      <div className="explore-section">
        <h3>Event guidelines and policies</h3>
        <ul>
          <li>
            We prioritize creating a safe and inclusive environment for all attendees. Any form of
            discrimination, harassment, or disruptive behavior will not be tolerated.
          </li>
          <li>
            To ensure the success of the event, please adhere to our photography policy which
            respects the privacy of all guests.
          </li>
        </ul>
      </div>

      {/* FAQ Section */}
      <div className="explore-section">
        <h3>Frequently Asked Questions</h3>
        <details>
          <summary>What time does the {event.title} in {event.venue_location} begin?</summary>
          <p>{event.time_start}</p>
        </details>
        <details>
          <summary>Where is the {event.venue_name} located, and how do I get there?</summary>
          <p>{event.venue_location}</p>
        </details>
        <details>
          <summary>Will there be any opening acts before {event.title} take the stage?</summary>
          <p>To be announced.</p>
        </details>
        <details>
          <summary>Can I bring a camera or recording device to the event?</summary>
          <p>Only mobile devices allowed unless authorized by the organizers.</p>
        </details>
      </div>

      {/* Ask Question */}
      <div className="explore-section">
        <p className='postp'>
          Don’t see the answer you’re looking for? Post Your Question
        </p>
        <form className="explore-question-form">
          <input
            type="text"
            placeholder="Please submit your question"
            className="question-input"
          />
          <button type="submit" className="question-submit-btn">
            Post
          </button>
        </form>
      </div>


      {showConfirm && (
  <div className="confirm-modal">
    <div className="confirm-box">
      <p>Are you sure you want to delete this event?</p>
      <div className="confirm-buttons">
        <button onClick={() => handleDelete(event.id)} className="confirm-yes">Yes, Delete</button>
        <button onClick={() => setShowConfirm(false)} className="confirm-no">Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Explore;
