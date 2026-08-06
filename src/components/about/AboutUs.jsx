import React from 'react'
import './AboutUs.css'
import aboutVideo from '../../assets/aboutbg.mp4'
import posterImg from '../../assets/aboutImg.jpg'
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from 'react-router-dom'

const AboutUs = () => {
const navigate = useNavigate()

  return (
    <div className='AboutUs'>

      <video
        className="about-video"
        autoPlay
        loop
        muted
        playsInline
        poster={posterImg}
      >
        <source src={aboutVideo} type="video/mp4" />
      </video>

      <div className="about-overlay"></div>

      <div className="about-content">
        <span className="about-badge">our story</span>
        <h1 className="about-title">
          <span className="line1">Your Local</span>
          <span className="line2">Beauty Expert in Kimberley</span>
        </h1>
        <p className="about-subtitle">Founded on a passion for creative styling and meticulous beauty care, our salon is
        dedicated to bringing top tier hair design and luxury nail artistry to Kimberley Northern Cape.
        We believe every visit should be a relaxing escape where your personal beauty goals
        come to life with personal care and premium products.Our team believes great hair and nails aren't
        about gender, they're about confidence, and every chair in our salon is an invitation to be exactly
        who you are. From a sharp fade to a soft balayage, from a classic manicure to bold nail art, we tailor 
        every visit around you your hair, your hands, your story. Step in, sit down, and let us help you leave
        looking (and feeling) like the best version of yourself.</p>

      <span className="team" onClick={() => navigate('/team')}>
      Meet the team
      <IoIosArrowForward className="team-icon" />
      </span>
      </div>

    </div>
  )
}

export default AboutUs