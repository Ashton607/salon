import { useState,useEffect } from 'react'
import './Hero.css'
import {IoIosArrowForward } from 'react-icons/io'
import {Link} from 'react-scroll'

const Hero = () => {
useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        const line1 = entry.target.querySelector('.line1')
        const line2 = entry.target.querySelector('.line2')
        const p = entry.target.querySelector('.hero-subtitle')
        const cta = entry.target.querySelector('.hero-scroll')

          if (entry.isIntersecting) {
            line1.classList.add('animate-in');
            line2.classList.add('animate-in');
            p.classList.add('animate-in');
            cta.classList.add('animate-in');
          } else {
            line1.classList.remove('animate-in');
            line2.classList.remove('animate-in');
            p.classList.remove('animate-in');
            cta.classList.remove('animate-in');
          }
        });
      }, { threshold: 0.1 });
    
      const HeroContent = document.querySelector('.hero-content');
      if (HeroContent) {
        observer.observe(HeroContent);
      }
    
      return () => observer.disconnect();
    }, []);
  
  return (
    <div className='Hero' id='hero'>

    <div className="hero-content">

    <h1 className="hero-title">
          <span className="line1">Complete Hair, Nails, Skincare</span>
          <span className="line2">& Makeup Studio in Kimberley</span>
    </h1>

    <p className="hero-subtitle">
          Experience a bespoke transformation<br/>
          with the quality you deserve.</p>
    
   <Link to="booking" smooth={true} offset={-70} duration={500}>
   <span className='hero-scroll'>Book Your Appoinment Now <IoIosArrowForward style={{ marginBottom: '-1.5px' }} /></span>
   </Link>

    </div>
      
    </div>
  )
}

export default Hero
