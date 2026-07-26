import React from 'react'
import './Booking.css'

const Booking = () => {
  return (
    <div className='Booking' id='booking'>
    <div className="booking-content">
    <span className="booking-badge">online booking</span>
    <h1 className="booking-title">
        <span className="line1">Book Your Hair & Nail</span>
        <span className="line2">Appointment in Upington.</span>
    </h1>
    <p className="booking-subtitle">Ready for a fresh new look? Reserve your spot online in seconds. Select your preferred 
        hair styling or nail treatment, pick a date and time that fits your schedule, and let 
        our stylists take care of the rest.</p>
    </div>
    </div>
  )
}

export default Booking
