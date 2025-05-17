import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <h2>Never miss an event!</h2>
          </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>EVENTS</h3>
            <ul>
            <li><Link to="/events">Categories</Link></li>
              <li><Link to="/">Popular Events</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>ABOUT</h3>
            <ul>
              <li><Link to = "aboutus">Our Story</Link></li>
              <li><a href="#">Team</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>SUPPORT</h3>
            <ul>
              <li><Link to ="/contactus">Contact Us</Link></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>FOLLOW US</h3>
            <div className="social-icons">
              <a href="#"><FaFacebook/></a>
              <a href="#"><FaInstagram/></a>
              <a href="#"><FaTwitterSquare /></a>
              <a href="#"><FaPinterest /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 EventHub. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
