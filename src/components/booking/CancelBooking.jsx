import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './CancelBooking.css'

const CancelBooking = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [booking, setBooking] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    fetch(`/.netlify/functions/cancel-booking?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setStatus('error')
        } else {
          setBooking(data)
          setStatus('ready')
        }
      })
      .catch(() => setStatus('error'))
  }, [token])

  const handleCancel = async () => {
    setStatus('cancelling')
    const res = await fetch('/.netlify/functions/cancel-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    })
    if (res.ok) {
      setStatus('cancelled')
    } else {
      setStatus('error')
    }
  }

  return (
    <div className="cancel-booking-page">
      <div className="cancel-card">

        {status === 'loading' && (
          <p className="cancel-status-msg">Loading your booking...</p>
        )}

        {status === 'error' && (
          <p className="cancel-status-msg error">We couldn't find that booking.</p>
        )}

        {status === 'cancelled' && (
          <p className="cancel-status-msg success">Your appointment has been cancelled.</p>
        )}

        {(status === 'ready' || status === 'cancelling') && booking && (
          <>
            <h3>Cancel Appointment?</h3>
            <p className="booking-summary">{booking.summary}</p>
            <p className="booking-time">
              {new Date(booking.start).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}
            </p>
            <button
              className="cancel-btn"
              onClick={handleCancel}
              disabled={status === 'cancelling'}
            >
              {status === 'cancelling' ? 'Cancelling...' : 'Yes, Cancel Appointment'}
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default CancelBooking