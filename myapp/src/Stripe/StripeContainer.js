import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";

const PUBLIC_KEY = "pk_test_51Kn4IQJaDc0P8cfzPLoNzmPCBsSqKKG7p9jIj18idDScyZ0rFNqgBzn53rRUX4oeIYeb1Gbuy5oaUyRhaYvgfq1P00UIvGZeql";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;