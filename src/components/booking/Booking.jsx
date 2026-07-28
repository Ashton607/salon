import React, { useState } from 'react'
import './Booking.css'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(27)
  const [selectedTime, setSelectedTime] = useState('10:00 am')
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | checking | booking | success | error
  const [errorMessage, setErrorMessage] = useState('')

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const calendarDays = [
    null, null, null, 1, 2, 3, 4,
    5, 6, 7, 8, 9, 10, 11,
    12, 13, 14, 15, 16, 17, 18,
    19, 20, 21, 22, 23, 24, 25,
    26, 27, 28, 29, 30, 31
  ]

  const availableDays = [27, 28, 29, 30, 31]
  const pastDays = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]

  const timeSlots = [
    '10:00 am', '10:30 am',
    '11:00 am', '11:30 am',
    '12:00 pm', '12:30 pm',
    '1:00 pm', '1:30 pm',
    '2:00 pm', '2:30 pm'
  ]

  // Convert "10:00 am" + day number -> full ISO datetime string
  const buildISOTime = (day, time) => {
    const [rawTime, meridiem] = time.split(' ')
    let [hours, minutes] = rawTime.split(':').map(Number)
    if (meridiem === 'pm' && hours !== 12) hours += 12
    if (meridiem === 'am' && hours === 12) hours = 0
    const paddedDay = String(day).padStart(2, '0')
    const paddedHours = String(hours).padStart(2, '0')
    const paddedMinutes = String(minutes).padStart(2, '0')
    return `2026-07-${paddedDay}T${paddedHours}:${paddedMinutes}:00+02:00`
  }

  const addOneHour = (isoString) => {
    const date = new Date(isoString)
    date.setHours(date.getHours() + 1)
    return date.toISOString().replace('Z', '+00:00') // keep consistent offset format
  }

  const handleTimeSelect = async (time) => {
    setSelectedTime(time)
    setStatus('checking')
    setErrorMessage('')

    const startTime = buildISOTime(selectedDate, time)
    const endTime = addOneHour(startTime)

    try {
      const res = await fetch('/.netlify/functions/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime, endTime })
      })
      const data = await res.json()

      if (!data.available) {
        setErrorMessage('That slot is no longer available. Please choose another.')
        setStatus('error')
      } else {
        setStatus('idle')
      }
    } catch (err) {
      setErrorMessage('Could not check availability. Please try again.')
      setStatus('error')
    }
  }

  const handleBooking = async () => {
    if (!clientName || !clientEmail) {
      setErrorMessage('Please enter your name and email.')
      setStatus('error')
      return
    }

    setStatus('booking')
    setErrorMessage('')

    const startTime = buildISOTime(selectedDate, selectedTime)
    const endTime = addOneHour(startTime)

    try {
      const res = await fetch('/.netlify/functions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: 'Custom Color Matching & Blending',
          clientName,
          clientEmail,
          
          endTime
        })
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch (err) {
      setErrorMessage('Could not complete booking. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="booking-availability">
        <div className="booking-confirmation">
          <h3>Booking Confirmed 🎉</h3>
          <p>Thanks {clientName}, your appointment is set for July {selectedDate}, 2026 at {selectedTime}.</p>
          <p>We've saved your details — see you then!</p>
        </div>
      </div>
    )
  }

  return (
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

      <div className="booking-times">
        <h4>Availability for Monday, July {selectedDate}</h4>
        <div className="time-grid">
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`time-slot ${selectedTime === time ? 'active' : ''}`}
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </button>
          ))}
        </div>
        {status === 'checking' && <span className="checking-msg">Checking availability...</span>}
      </div>

      <div className="booking-details">
        <h4>Service Details</h4>
        <div className="details-content">
          <p className="service-name">Custom Color Matching & Blending</p>
          <p className="service-price">R 850</p>
          <p className="service-datetime">July {selectedDate}, 2026 at {selectedTime}</p>
          <p className="service-duration">1 hr</p>
        </div>

        <div className="booking-form">
          <input
            type="text"
            placeholder="Your Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="booking-input"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className="booking-input"
          />
        </div>

        {status === 'error' && <p className="error-msg">{errorMessage}</p>}

        <button
          className="next-btn"
          onClick={handleBooking}
          disabled={status === 'booking'}
        >
          {status === 'booking' ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>

    </div>
  )
}

export default Booking