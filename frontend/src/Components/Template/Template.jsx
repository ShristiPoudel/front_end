import React,{useEffect,useState} from 'react'
import api from '../../api/config';
import './Template.css'
import { GoHeart } from "react-icons/go"; 
import {  useNavigate } from 'react-router-dom';
import fixed from '../../assets/fixed.png'


const Template = ({eventList:searchResults=[]}) => {
   const navigate = useNavigate();
   const [eventList,setEventList] = useState([]);
   const [day , setDay] = useState("All")
  
  
   useEffect(() => {
    if (searchResults.length > 0) {
      setEventList(searchResults);
      return;
    }
  
    async function fetchEvents() {
      try {
        const token = localStorage.getItem('authToken'); 
  
        const headers = token
          ? { Authorization: `Token ${token}` } 
          : {}; 
  
        const response = await api.get('/events/public-events/', { headers });
  
        console.log("Events:", response.data);
        setEventList(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);

        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized access. Showing public events only.");
          setEventList([]); 
        }
      }
    }
  
    fetchEvents();
  }, []);
  

    const handleFavorite = (eventId) => {
      console.log('Added to favorites:', eventId);
    };
  
    const handleBuyTicket = (eventId) => {
      console.log('Buy ticket for:', eventId);
    };
  

    return (
       <div className="template-container">
      {/* <h2>{searchResults.length > 0 ? "Search Results" : "Events"}</h2> */}
          {/* <hr /> */}

         
          <ul className="filter-tabs">
   <li onClick={() => {setDay('All')}}>All { day ==="All"?<hr/>: <></>}</li>
  <li onClick={() => {setDay('Today')}}>Today { day ==="Today"?<hr/>: <></>}</li>
  <li onClick={() => {setDay('Tomorrow')}}>Tomorrow { day ==="Tomorrow"?<hr/>: <></>}</li>
  <li onClick={() => {setDay('This Week')}}>This Week { day ==="This Week"?<hr/>: <></>}</li>
  

</ul>

        <div className='template-design'>
          
          {eventList.map((events,index) =>{
            return <div 
            onClick={() => navigate("/explore",{
              state:{
                events,
              }
            })
          }

          
             key={index}>
              <div className="favorite-btn-container">
              <button className="favorite-btn" onClick={() => handleFavorite(events.id)}>
                <GoHeart/> 
              </button>
            </div>
             <img src={events.image} alt={`image ${index}`} />
             <p>{events.title}</p>
             <div className='event-category'>{events.category.map((cat,catIndex)=>{
               return <div key={catIndex} className='categories-container'>
                Category:{cat.name} 
                </div>
            
          })}
          </div>
          <div className="time-date">
          <div className="event-date">Date:{events.event_dates}</div>
          <div className="event-time">Time:{events.time_start}</div>
          </div>
            <div className="interest-count">Interested:{events.interest_count}</div>
            
            <div className="buy-ticket-btn-container">
              <button className="buy-ticket-btn" onClick={() => handleBuyTicket(events.id)}>
                Buy Ticket
              </button>
            </div>

    
            </div>
          })}
        </div>

        <div className="fixed">
             <img src={fixed} alt="fixedImage" className='fixed-image' />
            </div>
        </div>
      )
}

export default Template