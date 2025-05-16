
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './InfoBar.css';
import { IoLocationOutline, IoCalendarOutline, IoSearchOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { BiCategoryAlt } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import api from "../../api/config";

 

const InfoBar = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [organizer, setOrganizer] = useState('');
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/events/public-categories/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
  
    if (location) params.append("venue_location", location);
    if (selectedCategory) params.append("category", selectedCategory);
    if (date) params.append("event_date", date);
    if (organizer) params.append("organizer_name", organizer);
  
    // Price mapping
    if (price === "1") {
      params.append("common_price__lte", "1000");
      params.append("vip_price__lte", "1000");
    } else if (price === "2") {
      params.append("common_price__gte", "1000");
      params.append("common_price__lte", "2000");
      params.append("vip_price__gte", "1000");
      params.append("vip_price__lte", "2000");
    } else if (price === "3") {
      params.append("common_price__gte", "2000");
      params.append("vip_price__gte", "2000");
    }
  
    // 🔁 Navigate with query params (no API call here)
    navigate(`/discover-events?${params.toString()}`);
  };

  return (
    <>
      <div className="discovery-filter">
        <div className="filter-container">
          <div className="filter-group">
            <label><IoLocationOutline className='icon' /> Location</label>
            <input
              type="text"
              placeholder="Search by city"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label><LiaRupeeSignSolid className='icon' /> Price</label>
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
              <option value="">NPR</option>
              <option value="1">0 - 1000</option>
              <option value="2">1000 - 2000</option>
              <option value="3">Above 2000</option>
            </select>
          </div>

          <div className="filter-group">
            <label><IoCalendarOutline className='icon' /> Date</label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label><BiCategoryAlt className='icon' /> Type</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select Type</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label><GoPeople className='icon' /> Organizer</label>
            <input
              type="text"
              placeholder="Search by organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
            />
          </div>

          <div className="discover-btn">
            <button onClick={handleSearch}>
              <IoSearchOutline /> Discover Events
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
};

export default InfoBar;
