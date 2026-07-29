import React, { useState } from 'react'
import './Booking.css'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import { FaRegCheckCircle } from "react-icons/fa";

const hairstyles = [
  { name: 'Sleek Straight Blowout', price: 'R250' },
  { name: 'Soft Beach Waves', price: 'R200' },
  { name: 'Box Braids', price: 'R350' },
  { name: 'Voluminous Blowout Curls', price: 'R280' },
  { name: 'Sleek High Ponytail', price: 'R180' },
  { name: 'Classic Manicure', price: 'R150' },
  { name: 'Classic Pedicure', price: 'R180' },
  { name: 'Nail Polish & Art', price: 'R100' }
]

const Booking = () => {
  const today = new Date()

  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth()) // 0-indexed
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [selectedTime, setSelectedTime] = useState('10:00 am')
  const [clientName, setClientName] = useState('')
  const [clientNumber, setClientNumber] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(hairstyles[0].name)
  const [status, setStatus] = useState('idle') // idle | checking | booking | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [receipt, setReceipt] = useState(null)

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  // Build calendar grid for viewYear/viewMonth
  const buildCalendarDays = () => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay() // weekday of 1st
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate() // days in month
    const grid = []
    for (let i = 0; i < firstDay; i++) grid.push(null)
    for (let d = 1; d <= totalDays; d++) grid.push(d)
    return grid
  }

  const calendarDays = buildCalendarDays()

  const isPastDay = (day) => {
    if (!isCurrentMonth) return viewYear < today.getFullYear() || (viewYear === today.getFullYear() && viewMonth < today.getMonth())
    return day < today.getDate()
  }

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
  }

  const timeSlots = [
    '10:00 am', '10:30 am',
    '11:00 am', '11:30 am',
    '12:00 pm', '12:30 pm',
    '13:00 pm', '13:30 pm',
    '14:00 pm', '14:30 pm',
    '15:00 pm', '15:30 pm',
    '16:00 pm', '16:30 pm'
  ]

  const buildISOTime = (day, time) => {
  console.log('buildISOTime called with:', { day, time }) // ADD THIS

  const [rawTime, meridiem] = time.split(' ')
  let [hours, minutes] = rawTime.split(':').map(Number)
  if (meridiem === 'pm' && hours !== 12) hours += 12
  if (meridiem === 'am' && hours === 12) hours = 0

  console.log('parsed hours/minutes:', { hours, minutes, meridiem }) // ADD THIS

  const paddedMonth = String(viewMonth + 1).padStart(2, '0')
  const paddedDay = String(day).padStart(2, '0')
  const paddedHours = String(hours).padStart(2, '0')
  const paddedMinutes = String(minutes).padStart(2, '0')
  const isoString = `${viewYear}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:00+02:00`

  console.log('constructed isoString:', isoString) // ADD THIS

  return isoString
}

  const addOneHour = (isoString) => {
    const date = new Date(isoString)
    date.setHours(date.getHours() + 1)
    return date.toISOString().replace('Z', '+00:00')
  }

  const handleTimeSelect = async (time) => {
  setSelectedTime(time)
  setStatus('checking')
  setErrorMessage('')

  const startTime = buildISOTime(selectedDate, time)
  if (!startTime) {
    setErrorMessage('Please select a valid date.')
    setStatus('error')
    return
  }

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
    if (!clientName || !clientNumber) {
      setErrorMessage('Please enter your name and number.')
      setStatus('error')
      return
    }

    setStatus('booking')
    setErrorMessage('')

    const startTime = buildISOTime(selectedDate, selectedTime)
    const endTime = addOneHour(startTime)
    const style = hairstyles.find((h) => h.name === selectedStyle)

    try {
      const res = await fetch('/.netlify/functions/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: style.name,
          clientName,
          clientNumber,
          startTime,
          endTime
        })
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setReceipt({
        date: `${monthNames[viewMonth]} ${selectedDate}, ${viewYear}`,
        time: selectedTime,
        name: clientName,
        number: clientNumber,
        style: style.name,
        price: style.price
      })
      setStatus('success')
    } catch (err) {
      setErrorMessage('Could not complete booking. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success' && receipt) {
    return (
      <div className="booking-availability">
        <div className="booking-receipt">
          <h3>Booking Confirmed<FaRegCheckCircle style={{marginBottom:'-3px', marginLeft:'5px'}} size={23}/></h3>
          <div className="receipt-box">
            <div className="receipt-row"><span>Date</span><span>{receipt.date}</span></div>
            <div className="receipt-row"><span>Time</span><span>{receipt.time}</span></div>
            <div className="receipt-row"><span>Name</span><span>{receipt.name}</span></div>
            <div className="receipt-row"><span>Number</span><span>{receipt.number}</span></div>
            <div className="receipt-row"><span>Hairstyle</span><span>{receipt.style}</span></div>
            <div className="receipt-row total"><span>Total</span><span>R {receipt.price}</span></div>
          </div>
          <p className="receipt-note">Thanks {receipt.name}, we'll see you then!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-availability" id='booking'>

      <div className="booking-calendar">
        <div className="calendar-header">
          <h3>Select a Date and Time</h3>
        </div>

        <div className="calendar-nav">
          <button className="nav-arrow" onClick={goToPrevMonth}><IoChevronBack /></button>
          <span className="month-label">{monthNames[viewMonth]} {viewYear}</span>
          <button className="nav-arrow" onClick={goToNextMonth}><IoChevronForward /></button>
        </div>

        <div className="calendar-grid">
          {days.map((day) => (
            <div className="day-label" key={day}>{day}</div>
          ))}

          {calendarDays.map((day, index) => {
            if (!day) return <div className="day-cell empty" key={index}></div>

            const past = isPastDay(day)
            const isSelected = selectedDate === day && isCurrentMonth

            return (
              <div
                className={`day-cell ${past ? 'past' : ''} ${isSelected ? 'selected' : ''}`}
                key={index}
                onClick={() => !past && setSelectedDate(day)}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>

      <div className="booking-times">
        <h4>Availability for {monthNames[viewMonth]} {selectedDate}</h4>
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
        <h4>Your Details</h4>

        <div className="booking-form">
          <label className="form-label">Hairstyle</label>
          <select
            className="booking-input"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            {hairstyles.map((h) => (
              <option key={h.name} value={h.name}>
                {h.name}  {h.price}
              </option>
            ))}
          </select>

          <label className="form-label">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="booking-input"
          />

          <label className="form-label">Number</label>
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={clientNumber}
            onChange={(e) => setClientNumber(e.target.value)}
            className="booking-input"
          />
        </div>

        

        <button
          className="next-btn"
          onClick={handleBooking}
          disabled={status === 'booking'}
        >
          {status === 'booking' ? 'Booking...' : 'Confirm Booking'}
        </button>
        {status === 'error' && <p className="error-msg">{errorMessage}</p>}
      </div>

    </div>
  )
}

export default Booking