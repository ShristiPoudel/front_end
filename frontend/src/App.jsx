import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Homepage from './Pages/Homepage/Homepage';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import Events from './Pages/Events/Events';
import ContactUs from './Pages/ContactUs/ContactUs';
import Feedback from './Pages/FeedBack/FeedBack';
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Profile from './Pages/Profile/Profile';
import Footer from './Components/Footer/Footer';
import ManageEvent from './Pages/ManageEvent/ManageEvent';
import BookEvent from './Pages/BookEvent/BookEvent';
import Logout from './Pages/Logout/Logout';
import SignUp from './Pages/SignUp/SignUp';
import Login from './Pages/Login/Login';
import AboutUs from './Pages/AboutUs/AboutUs';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { user, isLoggedIn, loading } = useAuth();
  console.log("Is user logged in?", isLoggedIn);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <Router>
        <NavBar />
        <ToastContainer />
        <div className="main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/aboutus" element={<AboutUs />} />

            {/* Auth-only (common) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/log-out" element={<Logout />} />
            </Route>

            {/* Organizer-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
              <Route path="/organizer-dashboard/create-events" element={<CreateEvent />} />
              <Route path="/organizer-dashboard/manage-events" element={<ManageEvent />} />
            </Route>

            {/* Attendee-Only Routes */}
            <Route element={<ProtectedRoute allowedRoles={['attendee']} />}>
              <Route path="/attendee-dashboard/book-event" element={<BookEvent />} />
              <Route path="/attendee-dashboard/feedback" element={<Feedback />} />
            </Route>

            {/* Redirect if logged in */}
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/sign-up"
              element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
            />

            {/* Catch-All */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
