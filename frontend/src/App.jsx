import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar'
import Homepage from './Pages/Homepage/Homepage';
import CreateEvent from './Pages/CreateEvent/CreateEvent';
import Explore from './Pages/Explore/Explore';
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
import Login from './Pages/Login/Login'

const App = () => {
  return (
    <div>
        <div className="app">
      <Router>
        <NavBar />
        <div className="main" >
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="explore" element={<Explore />} />
            <Route path="events" element={<Events />} />
            <Route path="contactus" element={ <ContactUs />} />
            <Route path="feedback" element={ <Feedback />} />
            <Route path="login"   element={ <Login />} />
            <Route path="sign-up" element={ <SignUp />}  />
            <Route path="create-events" element={<CreateEvent />} />
            <Route path="manage-events" element={<ManageEvent />} />
            <Route path='book-event' element={<BookEvent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="log-out" element={<Logout />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
    </div>
  )
}

export default App