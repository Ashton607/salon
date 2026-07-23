import React, { useState, useEffect, useRef } from "react";
import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';


const Navbar = () => {
const [menuOpen, setMenuOpen] = useState(false)
const navigate = useNavigate()
const location = useLocation()
const [sticky, setSticky] = useState(false)

const handleNavClick = (sectionId) => {
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={sticky ? 'blur-nav' : ''} >
      <ul>
        <li>
        <span onClick={() => handleNavClick('hero')}>Home</span>
        </li>
        <li>
        <span onClick={() => handleNavClick('services')}>Services</span>
        </li>
        <li>
        <RouterLink to="/about" onClick={() => setMenuOpen(false)}>About Us</RouterLink>
        </li>
        <li>
        <span onClick={() => handleNavClick('services')}>Book Online</span>
        </li>
        <li>
        <span onClick={() => handleNavClick('contact')}>Contact</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
