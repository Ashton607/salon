import React from 'react'
import './Footer.css'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'
import { IoLocationOutline, IoCallOutline, IoTimeOutline } from 'react-icons/io5'

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-top">

        <div className="footer-brand">
          <h2 className="footer-logo">We Style</h2>
          <p className="footer-tagline">
            Your local hair & nail beauty experts in Upington, Northern Cape.
          </p>
          <div className="footer-socials">
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#team">Meet the Team</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#booking">Book Online</a>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <div className="footer-info-row">
            <IoLocationOutline />
            <span>65 Schroder Street, Upington, 8801</span>
          </div>
          <div className="footer-info-row">
            <IoCallOutline />
            <span>+27 XX XXX XXXX</span>
          </div>
          <div className="footer-info-row">
            <IoTimeOutline />
            <span>Mon - Sat: 9am - 5pm</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} We Style. All rights reserved.</p>
        <div className="footer-legal">
          <a href="#">Privacy Policy</a>
          <span className="divider">|</span>
          <a href="#">Terms of Service</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer