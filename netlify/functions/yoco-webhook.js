import crypto from 'crypto'
import { checkAvailability, createBooking } from './calendarService.js'

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

  const { clientName, clientNumber, serviceName, startTime, endTime, depositPaid, fullPrice } = metadata

  const isFree = await checkAvailability(startTime, endTime)

  if (!isFree) {
    console.error('Slot no longer available at webhook time:', startTime)
    return { statusCode: 200, body: 'OK - slot conflict, needs manual review' }
  }

  const result = await createBooking({
    serviceName,
    clientName,
    clientNumber,
    startTime,
    endTime,
    depositPaid,
    fullPrice
  })

  console.log('Booking created from webhook:', result.id)
}

    return { statusCode: 200, body: 'OK' }
  } catch (err) {
    console.error('Webhook error:', err.message)
    return { statusCode: 500, body: 'Webhook processing failed' }
  }
}