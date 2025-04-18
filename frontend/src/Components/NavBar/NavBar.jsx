import React, { useState , useEffect } from 'react'
import "./NavBar.css"
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";


const NavBar = () => {
 

  return (
    <div className='navbar'>
        <div className="navlogo">
          <img src={logo} alt="" />  
          <p> <Link to="/">EVENTHUB</Link></p>
        </div>
        <ul className="nav-menu">
            <li> <Link to="/events">Events</Link></li>
            <li> <Link to="/create-events">Create Event</Link></li>
            <li> <Link to="/manage-events">Manage Event</Link></li>
            <li><Link to="/contactus" >Contact Us </Link></li>
            <li> <Link to="/feedback">Feedback</Link></li>
      
          </ul>
         
        <div className='login-signup'>
        
            <button className='log-in-btn'><Link to="/login">Login</Link></button>
            {/* <button className='log-out-btn'><Link to="/log-out">Logout</Link></button> */}
            {/* <Link to="/profile"><CgProfile className='profile-icon'/></Link> 
           */}
         </div>

    </div>
  )
}

export default NavBar