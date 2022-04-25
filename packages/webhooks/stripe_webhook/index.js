const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY']
const STRIPE_WEBHOOK_ENDPOINT_SECRET = process.env['STRIPE_ENDPOINT_SECRET']

const stripe = require("stripe")(STRIPE_SECRET_KEY);


async function main(args) {
  const sig = args.__ow_headers['stripe-signature'];

  /**
   * To validate the stripe payload signature we must use the 
   * exact request body sent from the stripe request. 
   * To prevent the platform from parsing the request content, 
   * we must set "web=raw" in the functions configuration
   */
  const payload = new Buffer.from(args.__ow_body ?? '', 'base64')



  let event = null;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, STRIPE_WEBHOOK_ENDPOINT_SECRET);
  } catch (err) {
    console.err(`Unable to validate payload for ${payload.id}`)
    return {
      statusCode: 400,
      body: {
        error: {
          message: 'Unable to validate payload'
        }
      }
    }
  }

  let intent = null;
  let errorMessage = '';

  switch (event['type']) {
    case 'payment_intent.created':
      intent = event.data.object
      console.log('🔄 Payment Intent Created:', intent.id)
    case 'payment_intent.succeeded':
      intent = event.data.object;
      console.log("✅ Payment Intent Succeeded:", intent.id);
      break;
    case 'payment_intent.payment_failed':
      console.log("❌ Payment Intent Failed:", intent.id);
      intent = event.data.object;
      errorMessage = intent.last_payment_error && intent.last_payment_error.message;
      break;
    default:
      return {
        statusCode: 200,
        body: {
          message: `received unhandled event event: ${event['type']}`
        }
      }
  }

  return {
    statusCode: 200,
    body: {
      error_message: errorMessage,
      amount: intent.amount,
      type: event.type
    }
  }
}

exports.main = main;