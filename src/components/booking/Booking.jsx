import React, { useState } from 'react'
import './Booking.css'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'

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
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [selectedDate, setSelectedDate] = useState(today.getDate())
  const [selectedTime, setSelectedTime] = useState('10:00 am')
  const [clientName, setClientName] = useState('')
  const [clientNumber, setClientNumber] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(hairstyles[0].name)
  const [status, setStatus] = useState('idle') // idle | checking | booking | error
  const [errorMessage, setErrorMessage] = useState('')
  const [clientEmail, setClientEmail] = useState('')

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December']

  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth()

  const buildCalendarDays = () => {
    const firstDay = new Date(viewYear, viewMonth, 1).getDay()
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate()
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
    setSelectedDate(1)
  }

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
    setSelectedDate(1)
  }

  const timeSlots = [
    '10:00 am', '10:30 am',
    '11:00 am', '11:30 am',
    '12:00 pm', '12:30 pm',
    '1:00 pm', '1:30 pm',
    '2:00 pm', '2:30 pm',
    '3:00 pm', '3:30 pm',
    '4:00 pm', '4:30 pm'
  ]

  const buildISOTime = (day, time) => {
    const [rawTime, meridiem] = time.split(' ')
    let [hours, minutes] = rawTime.split(':').map(Number)
    if (meridiem === 'pm' && hours !== 12) hours += 12
    if (meridiem === 'am' && hours === 12) hours = 0

    const paddedMonth = String(viewMonth + 1).padStart(2, '0')
    const paddedDay = String(day).padStart(2, '0')
    const paddedHours = String(hours).padStart(2, '0')
    const paddedMinutes = String(minutes).padStart(2, '0')
    const isoString = `${viewYear}-${paddedMonth}-${paddedDay}T${paddedHours}:${paddedMinutes}:00+02:00`

    if (isNaN(new Date(isoString).getTime())) {
      console.error('Invalid date constructed:', isoString)
      return null
    }

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

  const handlePayment = async () => {
    if (!clientName || !clientNumber || !clientEmail) {
      setErrorMessage('Please enter your name, number and email.')
      setStatus('error')
      return
    }

    const startTime = buildISOTime(selectedDate, selectedTime)
    if (!startTime) {
      setErrorMessage('Please select a valid date and time.')
      setStatus('error')
      return
    }
    const endTime = addOneHour(startTime)

    setStatus('booking')
    setErrorMessage('')

    const style = hairstyles.find((h) => h.name === selectedStyle)
    const fullPrice = parseFloat(style.price.replace('R', ''))
    const depositAmount = fullPrice / 2

    try {
      // Final availability check right before sending the client to pay
      const availRes = await fetch('/.netlify/functions/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startTime, endTime })
      })
      const availData = await availRes.json()

      if (!availData.available) {
        setErrorMessage('That slot was just booked. Please choose another.')
        setStatus('error')
        return
      }

      // Create the Yoco checkout, passing booking details through as metadata
      const res = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        amount: depositAmount,
        fullPrice,
        clientName,
        clientNumber,
        clientEmail,
        serviceName: style.name,
        startTime,
        endTime
      })
    })
      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error || 'Could not start payment.')
        setStatus('error')
        return
      }

      // Redirect the browser to Yoco's hosted payment page
      window.location.href = data.redirectUrl
    } catch (err) {
      setErrorMessage('Could not start payment. Please try again.')
      setStatus('error')
    }
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

        <label className="form-label">Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          className="booking-input"
        />

        <label className="form-label">Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
          className="booking-input"
        />

        <label className="form-label">Email</label>
        <input
        type="email"
        placeholder="Email Address"
        value={clientEmail}
        onChange={(e) => setClientEmail(e.target.value)}
        className="booking-input"
        />

        <div className="booking-form">
          <label className="form-label">
            Hairstyle
            <select
              className="booking-input"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {hairstyles.map((h) => (
                <option key={h.name} value={h.name}>
                  {h.name}
                </option>
              ))}
            </select>
          </label>
          <span className="style-price">{hairstyles.find((h) => h.name === selectedStyle)?.price}</span>
        </div>
        <p className="deposit-note">
          A 50% Non-refundable deposit (R{(parseFloat(hairstyles.find((h) => h.name === selectedStyle)?.price.replace('R', '')) / 2).toFixed(2)}) is due now to secure your booking. The remaining balance is payable at your appointment.
          </p>

        <button
          className="next-btn"
          onClick={handlePayment}
          disabled={status === 'booking'}
        >
          {status === 'booking' ? 'Redirecting to payment...' : 'Confirm & Pay'}
        </button>
        {status === 'error' && <p className="error-msg">{errorMessage}</p>}
      </div>

    </div>
  )
}

export default Booking