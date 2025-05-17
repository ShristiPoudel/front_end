// src/Pages/resetpass/ResetPass.jsx

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./ResetPass.css";
import api from "../../api/config";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Invalid or missing token.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setError("Please fill in both fields.");
    }

    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const response = await api.post("/user/password-reset-confirm/", {
        token,
        new_password: newPassword,
      });

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (err) {
      const message =
        err.response?.data?.error ||
        err.response?.data?.detail ||
        "Failed to reset password.";
      setError(message);
    }
  };

  return (
    <div className="reset-pass-container">
      <div className="reset-pass-form">
        <h2>Reset Your Password</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;