import React, { useState,useEffect } from 'react';
import './NavBar.css';
import logo from '../../assets/logo.png';
import logo1 from '../../assets/logo1.png'
import logo2 from '../../assets/nobg.png'
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { IoMdNotificationsOutline } from "react-icons/io";
import api from '../../api/config'
import axios  from 'axios';
import { useNotifications } from '../../context/NotificationContext';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { unreadCount } = useNotifications();


const toggleMenu = () => setMenuOpen(prev => !prev);

  const { user, isLoggedIn } = useAuth();
  const userRole = user?.role;



  return (
    <div className="navbar">
      <div className="navlogo">        
        <Link to="/"><img src={logo2} alt="EventHub Logo" /></Link>
      </div>

      <ul className="nav-menu">
        <li><Link to="/events">Explore</Link></li>

        {isLoggedIn && userRole === 'organizer' && (
          <>
            <li><Link to="/organizer-dashboard/create-events">Create Event</Link></li>
            {/* <li><Link to="/organizer-dashboard/manage-events">My Events</Link></li> */}
          </>
        )}

        {isLoggedIn && userRole === 'attendee' && (
          <>
          
          <li><Link to="/attendee-dashboard/book-event">My Ticket</Link></li>
          </>
        )}
        

        <li><Link to="/contactus">Contact Us</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>

      
         
      </ul>

       {/* <div className="search-bar">
        <input type="text" placeholder="Search events..." />
        <FaSearch className="search-icon" />
      </div>  */}



      <div className="login-signup">
        {!isLoggedIn ? (
          <button className="log-in-btn">
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <>
            <button className="log-out-btn">
              <Link to="/log-out">Logout</Link>
            </button>
            <Link to="/profile">
              <CgProfile className="profile-icon" />
            </Link>
            <Link to="/notifications" className="notification-wrapper">
              <IoMdNotificationsOutline className="notification-icon" />
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </Link>
          </>
        )}
      
      <div className="hamburger-menu" onClick={toggleMenu}>
  <div className={`hamburger-icon ${menuOpen ? 'open' : ''}`}>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
    <div className="login-signupham">
        {!isLoggedIn ? (
          <button className="log-in-btnham">
            <Link to="/login">Login</Link>
          </button>
        ) : (
          <>
           <Link to="/profile">
              <CgProfile className="profile-iconham" />
            </Link>
             <Link to="/notifications" className="notification-wrapper">
                    <IoMdNotificationsOutline className="notification-iconham" />
                    {unreadCount > 0 && <span className="notification-badge-ham">{unreadCount}</span>}
                  </Link>
            <button className="log-out-btnham">
              <Link to="/log-out">Logout</Link>
            </button>
           
          </>
        )}
        </div>
  <li><Link to="/events" onClick={() => setMenuOpen(false)}>Explore</Link></li>

  {isLoggedIn && userRole === 'organizer' && (
    <li><Link to="/organizer-dashboard/create-events" onClick={() => setMenuOpen(false)}>Create Event</Link></li>
  )}

  {isLoggedIn && userRole === 'attendee' && (
    <li><Link to="/attendee-dashboard/book-event" onClick={() => setMenuOpen(false)}>My Ticket</Link></li>
  )}

  <li><Link to="/contactus" onClick={() => setMenuOpen(false)}>Contact Us</Link></li>
  <li><Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link></li>
</ul>

</div>
</div>
    </div>
    
  );
};

export default NavBar;

