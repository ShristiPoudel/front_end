import React from 'react'
import './InfoBar.css'
import { IoLocationOutline } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GoPeople } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";


const InfoBar = () => {
  return (
     <div className="discovery-filter">
     <div className="filter-container">
       <div className="filter-group">
         <label>
           <IoLocationOutline className='icon' />
           Location
         </label>
         <input type="text" placeholder="Search by city" />
       </div>
       
       <div className="filter-group">
         <label>
           <LiaRupeeSignSolid className='icon' />
           Price
         </label>
         <select>
           <option value="">$ - $$$</option>
           <option value="1">$</option>
           <option value="2">$$</option>
           <option value="3">$$$</option>
         </select>
       </div>
       
       <div className="filter-group">
         <label>
           <IoCalendarOutline className='icon' />
           Date
         </label>
         <input type="date" defaultValue="2023-07-20" />
       </div>
       
       <div className="filter-group">
         <label>
           <BiCategoryAlt className='icon' />
           Type
         </label>
         <select>
           <option value="">Select Type</option>
           <option value="music">Music</option>
           <option value="sports">Sports</option>
           <option value="tech">Tech</option>
         </select>
       </div>
       
       <div className="filter-group">
         <label>
           <GoPeople className='icon' />
           Organizer
         </label>
         <select>
           <option value="">Select Any</option>
           <option value="org1">Organizer 1</option>
           <option value="org2">Organizer 2</option>
         </select>
       </div>
       
       <div className="discover-btn">
         <button>
           <IoSearchOutline />
           Discover Events
         </button>
       </div>

       </div>
       </div>
  )
}

export default InfoBar
 
