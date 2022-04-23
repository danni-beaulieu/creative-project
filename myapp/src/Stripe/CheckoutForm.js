import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useCookies } from "react-cookie";

export const CheckoutForm = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["userid", "customerid"]);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('0');
  const [methods, setMethods] = useState([]);
  // const [customerid, setCustomerID] = useState(cookies.customerid);
  // const [userid, setUserID] = useState(cookies.userid);
  const stripe = useStripe();
  const elements = useElements();
  let userid = cookies.userid;
  let customerid = cookies.customerid;

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const getPaymentMethods = async () => {
    console.log(customerid);
    const response = await axios.get(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/customer/${customerid}`);
    console.log(JSON.stringify(response.data));
    let pms = new Array();
    let cards = response.data.methods.data;
    for (let pm in cards) {
      let newPM = {id: cards[pm].id, four: cards[pm].card.last4};
      pms.push(newPM);
    }
    console.log(JSON.stringify(pms));
    setMethods(pms);
  }

  const updateUser = async () => {
    await axios.patch(`http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/users/${userid}`,{
        customer_id: customerid
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(typeof userid);
    console.log(typeof customerid);
    let secret = '';
    let payerror = false;

    if (customerid == null || customerid == '' || customerid == "null") {
      try {
        const response = await axios.post("http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/customer");

        console.log("Stripe 22 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 24 | customer successful!" + JSON.stringify(response.data));
          customerid = response.data.customerid;
          setCookie("customerid", customerid, { path: '/' });
          updateUser();
        }
      } catch (error) {
        console.log("CheckoutForm.js 29 | ", error);
      }
    }

    console.log(customerid);

    try {
      const response = await axios.post("http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/stripe/intent",
        {
          customerid:customerid,
          amount:amount
        });

      console.log("Stripe 49 | data", response.data.success);
      if (response.data.success) {
        console.log("CheckoutForm.js 51 | intent successful!" + JSON.stringify(response.data));
        secret = response.data.secret;
        console.log(secret);
      }
    } catch (error) {
      payerror = true;
      console.log("CheckoutForm.js 29 | ", error, payerror);
    }

    if (!payerror) {

      try {
        console.log(method);
        if (method == "0") {
          const payload = await stripe.confirmCardPayment(secret, {
            payment_method: {
              card: elements.getElement(CardElement)
            }
          });
          if (payload.error) {
            console.log(`Payment failed ${payload.error.message}`);
          } else {
            console.log(`Payment succeeded ${JSON.stringify(payload)}`);
          }
        } else {
          const payload = await stripe.confirmCardPayment(secret, {
            payment_method: method
          });
          if (payload.error) {
            console.log(`Payment failed ${payload.error.message}`);
          } else {
            console.log(`Payment succeeded ${JSON.stringify(payload)}`);
          }
        }
      } catch (error) {
        console.log("CheckoutForm.js 80 | ", error);
      }
    }
  };

  return (
    <div className="container">
    <div className="columns">
    <div className="column is-half is-offset-one-quarter">
    <div>
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
    <div className="control">

      { methods.map((pm) => (
              <label key={ pm.id } className="radio">
              <input 
                key={ pm.id } 
                type="radio" 
                name="saved_cards_radio" 
                value={ pm.id }
                onChange={ (e) => setMethod(e.target.value) }
                />
                  { pm.four }
            </label>
      )) }

      <label className="radio">
        <input type="radio" name="saved_cards_radio" defaultChecked value="0" onChange={ (e) => setMethod(e.target.value) }/>
        Add
      </label>
      </div>

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