import React from 'react'
import './Team.css'
import { FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa'
import t1 from '../../assets/team1.jpg'
import t2 from '../../assets/team2.jpg'
import t3 from '../../assets/team3.png'
import t4 from '../../assets/team4.png'

const teamMembers = [
  {
    img: t1,
    name: 'Jillie Bernard',
    role: 'Founder & Master Stylist'
  },
  {
    img: t2,
    name: 'Laura Davis',
    role: 'Senior Hair Colorist'
  },
  {
    img: t3,
    name: 'Amara Solomons',
    role: 'Braiding & Extensions Specialist'
  },
  {
    img: t4,
    name: 'Chloe Adams',
    role: 'Nail Technician'
  }
]


const Team = () => {
  return (
    <div className='Team'>
    <div className="team-content">
    <span className="services-badge">meet our team</span>
    <h1 className="services-title">
        <span className="line1">The Talented Hands</span>
        <span className="line2">Behind Your Fresh Look</span>
    </h1>
    <p className="services-subtitle">From master hair colorists to creative nail artists, meet the friendly specialists 
    who love making you look and feel your absolute best. Get to know the team dedicated 
    to giving you a relaxing, personalized salon experience.</p>

     <div className="team-cards">
      {teamMembers.map((member, index) => (
        <div className="team-card" key={index}>
          <img src={member.img} alt={member.name} className="team-photo" />
          <div className="team-info">
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="team-socials">
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
      
    </div>
  )
}

export default Team
