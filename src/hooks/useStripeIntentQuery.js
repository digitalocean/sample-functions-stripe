import { useState, useEffect } from "react";

export function useStripeIntentQuey() {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("api/payments/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt"}], amount: 100 }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.intent.client_secret));
  }, []);

  return {
    clientSecret
  }
}