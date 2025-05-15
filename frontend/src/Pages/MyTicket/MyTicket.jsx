import React,{useState,useEffect}from 'react'
import api from '../../api/config';
import TicketCard from '../../Components/TicketCard/TicketCard';


const MyTicket = () => {


    const [tickets, setTickets] = useState([]);

  useEffect(()=>{

    async function getTicket(){

        try{
            const token = localStorage.getItem('authToken');
            if (!token) {
              navigate('/login');
              return;
            }
    
            const headers = {
              Authorization: `Token ${token}`,
            };
    

        const getResponse = await api.get('/events/my-tickets', { headers })
        setTickets(getResponse.data)
        console.log("My Tickets",getResponse.data);

        }
        catch(error){
            console.log("Error fetching my tickets",error)
        }

    }

    getTicket();



  },[])

  return (
   
    <div className="ticket-list">
    {tickets.length > 0 ? (
      tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
    ) : (
      <p>No tickets found.</p>
    )}
  </div>
  )
}

export default MyTicket