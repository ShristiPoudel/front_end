import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'
import api from '../../api/config'



const Login = () => {
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { loginUser,isLoggedIn } = useAuth();
  
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
 
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log("form sumitted");
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
     

      console.log("Login successful:", response.data);
      loginUser({
        token: response.data.token,
        email: loginData.email,
        role: response.data.role,
        isLoggedIn: true
        
      });
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              // disabled={isSubmitting || !loginData.agreed}
            >
              {isSubmitting ? 'Processing...' : 'Continue'}
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