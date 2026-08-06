import crypto from 'crypto'

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
      return { statusCode: 401, body: 'Invalid signature' }
    }

    const payload = JSON.parse(rawBody)

    if (payload.type === 'payment.succeeded') {
      const { metadata, amount } = payload.payload
      // Payment confirmed — now safe to actually create the Google Calendar booking
      // (call your existing createBooking() from calendarService.js here)
      console.log('Payment confirmed for:', metadata.clientName, amount)
    }

    return { statusCode: 200, body: 'OK' }
    const result = await createBooking({ serviceName, clientName, clientNumber, startTime, endTime })
    
  } catch (err) {
    console.error('Webhook error:', err.message)
    return { statusCode: 500, body: 'Webhook processing failed' }
  }
}