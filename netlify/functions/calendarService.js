import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/calendar']
})

const calendar = google.calendar({ version: 'v3', auth })
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID

export async function checkAvailability(startTime, endTime) {
  try {
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime,
        timeMax: endTime,
        items: [{ id: CALENDAR_ID }]
      }
    })
    return res.data.calendars[CALENDAR_ID].busy.length === 0
  } catch (err) {
    console.error('Calendar API error:', err.message)
    throw err
  }
}

export async function createBooking({ serviceName, clientName, clientNumber, startTime, endTime, depositPaid, fullPrice }) {
  const balanceDue = fullPrice && depositPaid ? (fullPrice - depositPaid).toFixed(2) : null

  const description = balanceDue
    ? `Booked by ${clientName} (${clientNumber})\nDeposit paid: R${depositPaid}\nBalance due at appointment: R${balanceDue}`
    : `Booked by ${clientName} (${clientNumber})`

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    requestBody: {
      summary: `${serviceName} - ${clientName}`,
      description,
      start: { dateTime: startTime, timeZone: 'Africa/Johannesburg' },
      end: { dateTime: endTime, timeZone: 'Africa/Johannesburg' }
    }
  })
  return res.data
}