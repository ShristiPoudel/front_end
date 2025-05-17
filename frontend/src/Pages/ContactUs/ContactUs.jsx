import React from "react";
import './ContactUs.css';

export default function ContactUs() {
  return (
    <div className="contactus">
      <header className="contactus-header">
        <h1>Contact Us</h1>
        <p>Have questions, feedback, or need help? We’d love to hear from you.</p>
      </header>

      <section className="contactus-form-section">
        <form className="contactus-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Enter a subject" />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Write your message here..."></textarea>
          </div>

          <div className="submit-button">
            <button type="submit">Send Message</button>
          </div>
        </form>
      </section>

      <section className="contactus-info">
        <h2>Other Ways to Reach Us</h2>
        <p>Email: support@eventhub.com</p>
        <p>Phone: +977-9800000001</p>
        <p>Address: EventHub HQ, Pokhara, Nepal</p>
      </section>
    </div>
  );
}