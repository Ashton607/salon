import { checkAvailability } from './calendarService.js'

export const handler = async (event) => {
  const { startTime, endTime } = JSON.parse(event.body)

  try {
    const isFree = await checkAvailability(startTime, endTime)
    return {
      statusCode: 200,
      body: JSON.stringify({ available: isFree })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}