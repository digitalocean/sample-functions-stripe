import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useStripeIntentQuey } from './hooks/useStripeIntentQuery';
import CheckoutForm from "./CheckoutForm";
import "./App.css";

const stripePromise = loadStripe(process.env['REACT_APP_STRIPE_PUBLISHABLE_KEY']);

export default function App() {
  const {clientSecret } = useStripeIntentQuey();
  return (
    <div className="App">
      {clientSecret && (
        <Elements
          options={{
            clientSecret,
            appearance: {
              theme: 'night'
            },
          }} stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}