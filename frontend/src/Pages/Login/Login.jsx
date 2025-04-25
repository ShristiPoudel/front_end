import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { Link } from 'react-router-dom';
import api from '../../api/config';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });


  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { loginUser ,isLoggedIn} = useAuth();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log("Form Submitted")
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      return setError('Please fill in all fields');
    }

    try {
      setIsSubmitting(true);
      const response = await api.post("/user/login/", {
        email: loginData.email,
        password: loginData.password
      });

      // Assuming  API returns token, email, and role in the response
      console.log("Login successful:", response.data);

      if (response.data && response.data.token) {

        loginUser({
          token: response.data.token,
          email: loginData.email,
          role: response.data.user.role,
        });
        
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);
  

  return (
    <div className='login-page'>
      <div className='login'>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='login-input-fields'> 
            <label htmlFor="email">Enter your email:</label>
            <input
              type="email"
              id='email'
              name='email'
              autoComplete='email'
              placeholder='Your email'
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='login-input-fields'> 
            <label htmlFor="password">Enter your password:</label>
            <input
              type="password"
              id='password'
              name='password'
              autoComplete='current-password'
              placeholder='Your password'
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-btn">
            <button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p>
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;