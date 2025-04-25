import React, { createContext, useContext, useState, useEffect } from 'react';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const email = localStorage.getItem('userEmail');
      const role = localStorage.getItem('role');
      

      if (token && email && role) {
        setUser({ token, email, role });
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error loading authentication data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loginUser = (userData) => {
    const { token, email, role } = userData;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', role);
    setUser({ token, email, role });
    setIsLoggedIn(true);

  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loginUser, logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);