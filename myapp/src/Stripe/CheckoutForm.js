import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";

export const CheckoutForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userid", "customerid"]);
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    let customerid = cookies.customerid;
    event.preventDefault();

    console.log(customerid)
    try {
      const response = await axios.get("http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/customer");

      console.log("Stripe 22 | data", response.data.success);
      if (response.data.success) {
        console.log("CheckoutForm.js 24 | customer successful!" + JSON.stringify(response.data));
        customerid = response.data.customerid;
        setCookie("customerid", customerid, { path: '/' });
      }
    } catch (error) {
      console.log("CheckoutForm.js 29 | ", error);
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    if (!error) {
        console.log("Stripe 23 | token generated!", paymentMethod);
        console.log("Amount: " + amount);
        try {
          const { id } = paymentMethod;
          const response = await axios.post(
            "http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/charge",
            {
              amount: amount,
              id: id,
            }
          );
  
          console.log("Stripe 35 | data", response.data.success);
          if (response.data.success) {
            console.log("CheckoutForm.js 25 | payment successful!");
          }
        } catch (error) {
          console.log("CheckoutForm.js 28 | ", error);
        }
      } else {
        console.log(error.message);
      }
    };

  return (
    <div className="container">
    <div className="columns">
    <div className="column is-half is-offset-one-quarter">
    <div>
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div className="field">
        <label className="label">Amount</label>
        <input 
            className="input"
            type="text"
            placeholder="Amount"
            value={ amount }
            onChange={ (e) => setAmount(e.target.value) }
        />
      </div>
      <CardElement />
      <div className="field">
          <button className="button is-primary">Donate</button>
      </div>
    </form>
    </div>
    </div>
    </div>
    </div>
  );
};