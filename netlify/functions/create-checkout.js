export const handler = async (event) => {
  const { amount, clientName, clientNumber, serviceName, startTime, endTime } = JSON.parse(event.body)

  try {
    const amountInCents = Math.round(amount * 100) // Yoco expects cents, e.g. R250 -> 25000

    const res = await fetch('https://payments.yoco.com/api/checkouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.YOCO_SECRET_KEY}`
      },
      body: JSON.stringify({
        amount: amountInCents,
        currency: 'ZAR',
        successUrl: `${process.env.SITE_URL}/booking-success`,
        cancelUrl: `${process.env.SITE_URL}/booking-cancelled`,
        failureUrl: `${process.env.SITE_URL}/booking-failed`,
        metadata: {
          clientName,
          clientNumber,
          serviceName,
          startTime,
          endTime
        }
      })
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Failed to create checkout: ${errText}`)
    }

    const data = await res.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ redirectUrl: data.redirectUrl, checkoutId: data.id })
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}