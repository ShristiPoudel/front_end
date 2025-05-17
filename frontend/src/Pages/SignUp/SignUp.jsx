import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import api from "../../api/config";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignUp = () => {
  const getTermsText = (role) => {
    const intro = `Terms and Conditions
  
  Welcome to Event Hub. By using our platform, you agree to the following terms and conditions. Please read them carefully.
  `;

    const attendeeTerms = `
 
  Data Security and Privacy:
  • We take your privacy seriously. All personal information you provide (name, email, preferences, etc.) is securely stored and protected.
  • Your data will never be shared or sold to third parties without your consent.
  • You agree to receive notifications and updates related to events based on your preferences.
  • Any misuse of the system, including attempts to exploit or tamper with the platform, will result in account suspension or permanent ban.
  `;

    const organizerTerms = `
  
  Data Security:
  • Organizer account data, including login credentials and event details, is securely handled and protected under our privacy policy.
  • Organizers must ensure that all event listings are genuine and lawful. Posting misleading, fake, or spammy content will result in immediate account action.
  
  Subscription Policy:
  • Organizers can publish up to 2 events for free.
  • To post additional events, organizers must subscribe to a premium plan available under their dashboard.
  
  Commission on Ticket Sales:
  • Event Hub charges a 15% commission on every ticket sold through the platform.
  • This commission is automatically deducted during the transaction process.
  • By using our platform, you agree to this revenue-sharing model.
  `;

    const changes = `

  • Event Hub reserves the right to update or modify these terms at any time. Users will be notified of significant changes via email or in-app notification.
  • By continuing to use Event Hub, you agree to comply with the above terms. If you do not accept these conditions, please refrain from using our platform.`;

    return `${intro}${
      role === "organizer" ? organizerTerms : attendeeTerms
    }${changes}`;
  };

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
    agreed: false,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();
    setError("");

    if (!signupData.name || !signupData.email || !signupData.password) {
      return setError("Please fill in all fields");
    }

    if (!signupData.agreed) {
      return setError("You must agree to the terms and privacy policy");
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/user/sign-up/", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role,
      });

      console.log("Signup successful:", response.data);

      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup">
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        {showTermsModal && (
          <div className="modal-overlay-term" role="dialog" aria-modal="true">
            <div className="modal-content-term">
              <button
                className="modal-close-btn"
                onClick={() => setShowTermsModal(false)}
                aria-label="Close terms modal"
              >
                &times;
              </button>
              <pre className="modal-text">{getTermsText(signupData.role)}</pre>
            </div>
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-fields">
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-input-fields">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="Your email"
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-input-fields">
            <label htmlFor="password">Enter your password:</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              placeholder="Your password"
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signup-input-fields">
            <label htmlFor="role">Select your role:</label>
            <select
              id="role"
              name="role"
              value={signupData.role}
              onChange={handleChange}
              required
            >
              <option value="attendee">Attendee</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          <div className="signup-agree">
            <label>
              <input
                type="checkbox"
                name="agreed"
                checked={signupData.agreed}
                onChange={handleChange}
              />
              By continuing, I agree to the{" "}
              <span
                className="terms-link"
                onClick={() => setShowTermsModal(true)}
                style={{ color: "#007bff", cursor: "pointer" }}
              >
                {signupData.role === "organizer"
                  ? "Organizer Terms"
                  : "Attendee Terms"}
              </span>
            </label>
          </div>

          <div className="signup-btn">
            <button
              type="submit"
              // disabled={isSubmitting || !signupData.agreed}
            >
              {isSubmitting ? "Processing..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
