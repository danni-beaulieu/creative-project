import Stripe from 'stripe';
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

export const chargeStripe = async (req, res) => {
    
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);

    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "Your Company Description",
        payment_method: id,
        confirm: true,
      });
      console.log("stripe-routes.js 19 | payment", payment);
      res.json({
        message: "Payment Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 17 | error", error);
      res.json({
        message: "Payment Failed",
        success: false,
      });
    }
  }

  export const newCustomer = async (req, res) => {
    
    console.log("stripe-routes.js 36 | route reached", req.body);

    try {
      const customer = await stripe.customers.create({});
      console.log("stripe-routes.js 40 | customer", customer.id);
      res.json({
        message: "Customer Successful",
        success: true,
        customerid: customer.id
      });
    } catch (error) {
      console.log("stripe-routes.js 47 | error", error);
      res.json({
        message: "Customer Failed",
        success: false,
      });
    }
  }