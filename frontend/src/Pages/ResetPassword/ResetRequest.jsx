import React, { useState } from 'react';
import api from '../../api/config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ResetPass.css';

const ResetRequest = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter your email.');
      return;
    }

    setIsSubmitting(true);
    try {
      await api.post('/user/password-reset/', { email });
      toast.success('Password reset link sent. Check your email.');
      setEmail('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Your Password</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your registered email:</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default ResetRequest;