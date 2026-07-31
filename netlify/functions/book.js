import { checkAvailability, createBooking } from './calendarService.js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const handler = async (event) => {
  const { serviceName, clientName, clientNumber, startTime, endTime } = JSON.parse(event.body)

  try {
    const isFree = await checkAvailability(startTime, endTime)
    if (!isFree) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'That slot was just booked. Please choose another.' })
      }
    }

    const result = await createBooking({ serviceName, clientName, clientNumber, startTime, endTime })

    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // swap for your verified domain later
        to: process.env.OWNER_EMAIL,
        subject: `New Booking: ${clientName} - ${serviceName}`,
        html: `
          <h2>New Booking Received</h2>
          <p><strong>Client:</strong> ${clientName}</p>
          <p><strong>Number:</strong> ${clientNumber}</p>
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Date/Time:</strong> ${new Date(startTime).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
        `
      })
    } catch (emailErr) {
      console.error('Failed to send owner notification email:', emailErr.message)
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, event: result })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}