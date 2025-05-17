import React from "react";
import about from '../../assets/about.jpg';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <div className="aboutus">
      <header className="aboutus-header">
        <h1>We’re EventHub, the Event Company.</h1>
        <p>
          From the moment we launched, our focus has been on delivering meaningful event experiences by putting people first.
        </p>
      </header>

      <section className="aboutus-story">
        <img
          src={about}
          alt="EventHub Team Celebrating"
        />
        <div className="aboutus-story-content">
          <h2>Our Story</h2>
          <p>
            EventHub began with a simple mission — to connect people through seamless, smart, and engaging events. Whether it's a tech meetup, a music concert, or a professional workshop, we believe every event is an opportunity to build community.
          </p>
        </div>
      </section>

      <section className="aboutus-values">
        <h2>What Drives Us</h2>
        <div className="aboutus-value-boxes">
          <div className="aboutus-value-box">
            <h3>Customer-Centric</h3>
            <p>
              We build everything with our attendees and organizers in mind, making sure every interaction is smooth and intuitive.
            </p>
          </div>
          <div className="aboutus-value-box">
            <h3>Innovative Platform</h3>
            <p>
              From real-time ticketing to personalized event dashboards, we use technology to bring the best to your fingertips.
            </p>
          </div>
          <div className="aboutus-value-box">
            <h3>Inclusive Events</h3>
            <p>
              We empower organizers to reach diverse audiences and create events where everyone belongs.
            </p>
          </div>
        </div>
      </section>

      <section className="aboutus-cta">
        <h2>Have Questions?</h2>
        <p>Connect with our support team or explore the platform to learn more.</p>
        <a href="/contactus">Contact Us</a>
      </section>
    </div>
  );
}