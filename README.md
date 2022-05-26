## Getting Started

This is an example of how to process a payments using Stripe and deployed on App Platform. We deploy two App Platform components
- **Static Site** - site:  A React based component [which uses Stripe Elements](https://www.npmjs.com/package/@stripe/react-stripe-js)
- **Functions** - function-api: A function based api with two handler
  - **payments/stripe** - processes the payment intent from the client
  - **webhooks/stripe_webhook** - called by Stripe in response to a payment intent event. 

**Note: Following these steps may result in charges for the use of DigitalOcean services.**

### Requirements

* You need a DigitalOcean account. If you don't already have one, you can sign up at https://cloud.digitalocean.com/registrations/new.

### Stripe
You will need a Stripe account an the [Stripe API Keys](https://dashboard.stripe.com/test/apikeys)

When deploying the App, these environment variables are required. 

```
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_ENDPOINT_SECRET
REACT_APP_STRIPE_PUBLISHABLE_KEY 
```

# Deploying the App

Click this button to deploy the app to the DigitalOcean App Platform. If you are not logged in, you will be prompted to log in with your DigitalOcean account.

[![Deploy to DigitalOcean](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/ddebarros/sample-functions-stripe/tree/main)

Using this button disables the ability to automatically re-deploy your app when pushing to a branch or tag in your repository as you are using this repo directly.