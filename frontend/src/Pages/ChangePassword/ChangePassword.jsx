import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/config';
import './ChangePassword.css';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const headers = { Authorization: `Token ${token}` };

      const response = await api.post('/user/change-password/', formData, { headers });

      setMessage(response.data.message);
      setFormData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });

  
      setTimeout(() => {
        navigate('/profile');
      }, 1000);
    } catch (error) {
      console.log('Backend error:', error.response?.data); // helpful for debugging

      const responseErrors = error.response?.data || {};
      const formattedErrors = {
        ...responseErrors,
        general:
          responseErrors.non_field_errors?.[0] ||
          responseErrors.detail ||
          'Something went wrong. Please check your inputs.',
      };
      setErrors(formattedErrors);
    }
  };

  return (
    <div className="change-password-container">
      <h2 className="title">Change Password</h2>

      {message && <div className="success-message">{message}</div>}
      {errors.general && <div className="error-message">{errors.general}</div>}

      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="current_password"
            value={formData.current_password}
            onChange={handleChange}
            required
          />
          {errors.current_password && (
            <p className="error-text">{errors.current_password[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
          {errors.new_password && (
            <p className="error-text">{errors.new_password[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          {errors.confirm_password && (
            <p className="error-text">{errors.confirm_password[0]}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
