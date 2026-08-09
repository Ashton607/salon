import crypto from 'crypto'
import { checkAvailability, createBooking } from './calendarService.js'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const handler = async (event) => {
  const signatureHeader = event.headers['webhook-signature']
  const webhookId = event.headers['webhook-id']
  const webhookTimestamp = event.headers['webhook-timestamp']
  const rawBody = event.body

  try {
    // Verify the signature so we know this really came from Yoco
    const signedContent = `${webhookId}.${webhookTimestamp}.${rawBody}`
    const secretBytes = Buffer.from(process.env.YOCO_WEBHOOK_SECRET.replace('whsec_', ''), 'base64')
    const expectedSignature = crypto
      .createHmac('sha256', secretBytes)
      .update(signedContent)
      .digest('base64')

    const receivedSignature = signatureHeader.split(' ')[0].split(',')[1]

    if (expectedSignature !== receivedSignature) {
      console.error('Webhook signature mismatch')
      return { statusCode: 401, body: 'Invalid signature' }
    }

    const payload = JSON.parse(rawBody)
    console.log('Webhook received, type:', payload.type)

    if (payload.type === 'payment.succeeded') {
    const { metadata } = payload.payload

  if (!metadata || !metadata.startTime || !metadata.endTime) {
    console.error('Missing booking metadata on payment:', metadata)
    return { statusCode: 200, body: 'OK - but missing metadata' }
  }

  const { clientName, clientNumber, clientEmail, serviceName, startTime, endTime, depositPaid, fullPrice } = metadata

  const isFree = await checkAvailability(startTime, endTime)

  if (!isFree) {
    console.error('Slot no longer available at webhook time:', startTime)
    return { statusCode: 200, body: 'OK - slot conflict, needs manual review' }
  }

  const result = await createBooking({
    serviceName,
    clientName,
    clientNumber,
    clientEmail,
    startTime,
    endTime,
    depositPaid,
    fullPrice
  })
  console.log('Booking created from webhook:', result.id)

  const cancelLink = `${process.env.SITE_URL}/cancel-booking?token=${result.cancellationToken}`


try {
  await resend.emails.send({
    from: 'bookings@luxinteractive.co.za', // or your verified domain
    to: clientEmail,
    subject: 'Your Booking Confirmation',
    html: `
      <h2>Booking Confirmed</h2>
      <p>Hi ${clientName},</p>
      <p>Your <strong>${serviceName}</strong> appointment is booked for
      ${new Date(startTime).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}.</p>
      <p>Deposit paid: R${depositPaid} — balance due at appointment: R${(fullPrice - depositPaid).toFixed(2)}</p>
      <p>Need to cancel? <a href="${cancelLink}">Click here</a>.</p>
    `
  })
} catch (emailErr) {
  console.error('Failed to send client confirmation email:', emailErr.message)
}

// Notify the owner too
try {
  await resend.emails.send({
    from: 'bookings@luxinteractive.co.za',
    to: process.env.OWNER_EMAIL,
    subject: `New Booking: ${clientName} - ${serviceName}`,
    html: `
      <h2>New Booking Received</h2>
      <p><strong>Client:</strong> ${clientName}</p>
      <p><strong>Number:</strong> ${clientNumber}</p>
      <p><strong>Email:</strong> ${clientEmail}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Date/Time:</strong> ${new Date(startTime).toLocaleString('en-ZA', { timeZone: 'Africa/Johannesburg' })}</p>
      <p><strong>Deposit paid:</strong> R${depositPaid} — Balance due: R${(fullPrice - depositPaid).toFixed(2)}</p>
    `
  })
} catch (emailErr) {
  console.error('Failed to send owner notification email:', emailErr.message)
}
  
}

    return { statusCode: 200, body: 'OK' }
  } catch (err) {
    console.error('Webhook error:', err.message)
    return { statusCode: 500, body: 'Webhook processing failed' }
  }
}