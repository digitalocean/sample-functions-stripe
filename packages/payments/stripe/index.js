const STRIPE_SECRET_KEY = process.env['STRIPE_SECRET_KEY']
const stripe = require("stripe")(STRIPE_SECRET_KEY);

async function main(args) {
  if (args.__ow_method == "options") {
    return {
      headers: {
        'Access-Control-Allow-Methods': 'OPTIONS, POST',
        'Access-Control-Allow-Origin': '*'
      },
      statusCode: 200
    }
  }

  const { amount, currency = "usd" } = args;
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    return {
      statusCode: 200,
      body: {
        intent: paymentIntent
      }
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 400,
      headers: error.headers,
      body: {
        error
      }
    }
  }
}

exports.main = main;