import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

export const CheckoutForm = () => {
  const [cookies, setCookie] = useCookies(["userid", "customerid"]);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('0');
  const [methods, setMethods] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
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

  const makeDonation = async () => {
    const response = await axios.post("http://ec2-44-202-59-171.compute-1.amazonaws.com:5000/donations",{
      project_id: id,
      user_id: cookies.userid,
      amount: amount
    });
    console.log(JSON.stringify(response))
    if (response.data.success) {
      navigate("/");
    }
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

        if (response.data.success) {
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

      if (response.data.success) {
        secret = response.data.secret;
      }
    } catch (error) {
      payerror = true;
      console.log("CheckoutForm.js 29 | ", error, payerror);
    }

    if (!payerror) {
      try {
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
            makeDonation();
          }
        } else {
          const payload = await stripe.confirmCardPayment(secret, {
            payment_method: method
          });
          if (payload.error) {
            console.log(`Payment failed ${payload.error.message}`);
          } else {
            console.log(`Payment succeeded ${JSON.stringify(payload)}`);
            makeDonation();
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