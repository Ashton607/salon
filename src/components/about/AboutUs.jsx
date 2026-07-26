import React from 'react'
import './AboutUs.css'
import aboutVideo from '../../assets/aboutbg.mp4'
import posterImg from '../../assets/aboutImg.jpg'

const AboutUs = () => {
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
          <span className="line1">Your Local Hair & Nail</span>
          <span className="line2">Beauty Experts in Upington</span>
        </h1>
        <p className="about-subtitle">Founded on a passion for creative styling and meticulous beauty care, our salon is
        dedicated to bringing top tier hair design and luxury nail artistry to Upington Northern Cape.
        We believe every visit should be a relaxing escape where your personal beauty goals
        come to life with personal care and premium products.</p>
      </div>

    </div>
  )
}

export default AboutUs