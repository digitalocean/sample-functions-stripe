import { useState, useEffect } from "react";
export function useStripeIntentQuey() {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://faas-nyc1-26c15.doserverless.io/api/v1/web/fn-f4097f1d-a375-4bd1-8a59-6f15d8bb82e5/payments/stripe", {
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