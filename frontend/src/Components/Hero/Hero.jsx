import React from 'react'
import ImageSlider, { Slide } from "react-auto-image-slider";
import hero from '../../assets/hero-image.jpg'
 import seminar from '../../assets/seminar.jpg'
import sports from '../../assets/sports.jpg'
import "./hero.css"



const Hero = () => {
  return (
    
    <div className="hero-container">
    <div className='hero'>
         <ImageSlider effectDelay={500} autoPlayDelay={2000} infinite  >
      <Slide>
        <img alt="hero" src={hero} />
      </Slide>
       <Slide>
        <img alt="seminar" src={seminar}/>
      </Slide>
       <Slide>
         <img alt="sports" src={sports} />
      </Slide>
    </ImageSlider>
    <div className="book-now-container">
            <h2>Get your events fix</h2>
            <h2>with festival !!</h2>
            <button className="book-now-btn">Book Now</button>
          </div>
    </div>
    </div>
    
  )
}


export default Hero;
