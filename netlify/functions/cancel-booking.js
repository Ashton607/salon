import { findEventByToken, cancelBooking } from './calendarService.js'

export const handler = async (event) => {
  const { httpMethod, queryStringParameters, body } = event

  try {
    if (httpMethod === 'GET') {
      // Look up booking details for the confirmation screen
      const token = queryStringParameters.token
      const bookingEvent = await findEventByToken(token)

      if (!bookingEvent) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Booking not found.' }) }
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          summary: bookingEvent.summary,
          start: bookingEvent.start.dateTime,
          end: bookingEvent.end.dateTime
        })
      }
    }

    if (httpMethod === 'POST') {
      // Actually cancel it
      const { token } = JSON.parse(body)
      const cancelled = await cancelBooking(token)

      if (!cancelled) {
        return { statusCode: 404, body: JSON.stringify({ error: 'Booking not found.' }) }
      }

      return { statusCode: 200, body: JSON.stringify({ success: true }) }
    }

    return { statusCode: 405, body: 'Method not allowed' }
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
  }
}