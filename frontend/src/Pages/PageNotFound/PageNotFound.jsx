import React, { useEffect } from 'react'
import { use } from 'react'
import { useNavigate } from 'react-router-dom'
import './PageNotFound.css'


const PageNotFound = () => {
  let navigate = useNavigate();
  useEffect(()=>{
    setTimeout(()=>navigate('/'),3000);
  },[])
  return (
    <div className='page-not-found'>Page not Found...You will be redirected in Homepage after 3 seconds...</div>
  )
}

export default PageNotFound