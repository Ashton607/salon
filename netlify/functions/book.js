import { checkAvailability, createBooking } from './calendarService.js'

export const handler = async (event) => {
  const { serviceName, clientName, clientEmail, startTime, endTime } = JSON.parse(event.body)

  try {
    const isFree = await checkAvailability(startTime, endTime)
    if (!isFree) {
      return {
        statusCode: 409,
        body: JSON.stringify({ error: 'That slot was just booked. Please choose another.' })
      }
    }

    const result = await createBooking({ serviceName, clientName, clientEmail, startTime, endTime })

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