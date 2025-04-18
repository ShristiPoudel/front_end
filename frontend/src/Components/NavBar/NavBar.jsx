import React, { useState , useEffect } from 'react'
import "./NavBar.css"
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div className='navbar'>
        <div className="navlogo">
          <img src={logo} alt="" />  
          <p>EVENTHUB</p>
        </div>
        <ul className="nav-menu">
           <li> Events</li>
            <li>Create Event</li>
            <li> Manage Events</li>
            <li>Contact Us </li>
            <li> Feedback</li>
        </ul>

        <div className="login-signup">
            <button className='log-in-btn'>Login</button>  
            {/* <button>Sign Up</button>  */}
        
            </div>
         </div>


  )
}

export default NavBar