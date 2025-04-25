import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUp.css";
import api from '../../api/config';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    role:'attendee',
    agreed: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    console.log("form submitted");
    e.preventDefault();
    setError('');

    if (!signupData.name || !signupData.email || !signupData.password) {
      return setError('Please fill in all fields');
    }

    if (!signupData.agreed) {
      return setError('You must agree to the terms and privacy policy');
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/user/sign-up/", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        role: signupData.role
      });

      console.log("Signup successful:", response.data);

      navigate('/login'); 
    } catch (err) {
      console.error("Signup error:", err.response?.data);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='signup-page'>
      <div className='signup'>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        <form className='signup-form' onSubmit={handleSubmit}>
          <div className='signup-input-fields'>
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id='name'
              name='name'
              autoComplete='name'
              placeholder='Your name'
              value={signupData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='signup-input-fields'>
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id='email'
              name='email'
              autoComplete='email'
              placeholder='Your email'
              value={signupData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='signup-input-fields'>
            <label htmlFor="password">Enter your password:</label>
            <input
              type="password"
              id='password'
              name='password'
              autoComplete='new-password'
              placeholder='Your password'
              value={signupData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className='signup-input-fields'>
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
                name='agreed'
                checked={signupData.agreed}
                onChange={handleChange}
              />
              By continuing, I agree to the terms of use & privacy policy.
            </label>
          </div>

          <div className="signup-btn">
            <button
              type="submit"
              // disabled={isSubmitting || !signupData.agreed}
            >
              {isSubmitting ? 'Processing...' : 'Sign Up'}
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