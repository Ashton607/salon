import React, { useState } from 'react'
import './Booking.css'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const Booking = () => {
const [selectedDate, setSelectedDate] = useState(27)
const [selectedTime, setSelectedTime] = useState('10:00 am')
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31
  ]
const availableDays = [27, 28, 29, 30, 31] // days with an availability dot 
const pastDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]


const timeSlots = [
    '10:00 am', '10:30 am',
    '11:00 am', '11:30 am',
    '12:00 pm', '12:30 pm',
    '1:00 pm', '1:30 pm',
    '2:00 pm', '2:30 pm'
  ]
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
    
     <div className="booking-availability">

      <div className="booking-calendar">
        <div className="calendar-header">
          <h3>Select a Date and Time</h3>
          <span className="timezone">Time zone: South Africa Standard Time (SAST) <span className="chevron">▾</span></span>
        </div>

        <div className="calendar-nav">
          <button className="nav-arrow"><IoChevronBack /></button>
          <span className="month-label">July 2026</span>
          <button className="nav-arrow"><IoChevronForward /></button>
        </div>

        <div className="calendar-grid">
          {days.map((day) => (
            <div className="day-label" key={day}>{day}</div>
          ))}

          {calendarDays.map((day, index) => {
            if (!day) return <div className="day-cell empty" key={index}></div>

            const isPast = pastDays.includes(day)
            const hasAvailability = availableDays.includes(day)
            const isSelected = selectedDate === day

            return (
              <div
                className={`day-cell ${isPast ? 'past' : ''} ${isSelected ? 'selected' : ''}`}
                key={index}
                onClick={() => !isPast && setSelectedDate(day)}
              >
                {day}
                {hasAvailability && <span className="availability-dot"></span>}
              </div>
            )
          })}
        </div>
      </div>
    </div>

    <div className="booking-times">
        <h4>Availability for Monday, July {selectedDate}</h4>
        <div className="time-grid">
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'active' : ''}`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
        <span className="show-all">Show all sessions</span>
      </div>

      <div className="booking-details">
        <h4>Service Details</h4>
        <div className="details-content">
          <p className="service-name">Custom Color Matching & Blending</p>
          <p className="service-price">R 850</p>
          <p className="service-datetime">July {selectedDate}, 2026 at {selectedTime}</p>
          <p className="service-staff">Staff Member #1</p>
          <p className="service-duration">1 hr</p>
          <span className="less-details">Less details ▲</span>
        </div>
        <button className="next-btn">Next</button>
      </div>

    </div>

    </div>
  )
}

export default Booking
