import React from 'react'
import './Booking.css'
import { FaRegCheckCircle } from "react-icons/fa"
import { Link } from 'react-router-dom'

const BookingSuccess = () => {
  return (
    <div className="booking-availability">
      <div className="booking-receipt">
        <h3>
          Payment Received
          <FaRegCheckCircle style={{ marginBottom: '-3px', marginLeft: '5px' }} size={23} />
        </h3>
        <p className="receipt-note">
          Thanks for booking with us! Your appointment is confirmed and you'll receive
          a reminder closer to the date.
        </p>
        <Link to="/" className="next-btn" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '20px' }}>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default BookingSuccess