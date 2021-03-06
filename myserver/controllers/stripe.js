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

  export const createIntent = async (req, res) => {
    console.log("stripe-routes.js 35 | route reached", req.body);
    let { customerid, amount } = req.body;
    console.log("stripe-routes.js 37 | amount and cid", amount, customerid);

    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerid,
      type: "card"
    });
    console.log(JSON.stringify(paymentMethods));

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: "usd",
        customer: customerid, 
        setup_future_usage: 'on_session'
      });
      console.log("stripe-routes.js 49 | intent", JSON.stringify(paymentIntent));
      res.json({
        secret: paymentIntent.client_secret,
        message: "Intent Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 53 | error", error);
      res.json({
        message: "Intent Failed",
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

  export const getMethods = async (req, res) => {
    console.log("stripe-routes.js 90 | route reached", req.params.id);
    let customerid = req.params.id;
    console.log(customerid);

    try {
      const paymentMethods = await stripe.customers.listPaymentMethods(
        customerid,
        {type: 'card'}
      );
      console.log(JSON.stringify(paymentMethods));
      res.json({
        message: "Customer Successful",
        success: true,
        customerid: customerid,
        methods: paymentMethods
      });
    } catch (error) {
      console.log("stripe-routes.js 105 | error", error);
      res.json({
        message: "Customer Failed",
        success: false,
      });
    }
  }

  export const deleteMethod = async (req, res) => {
    console.log("stripe-routes.js 121 | route reached", req.params.id);
    let methodid = req.params.id;

    try {
      const paymentMethod = await stripe.paymentMethods.detach(
        methodid
      );
      console.log(JSON.stringify(paymentMethod));
      res.json({
        message: "Delete Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 126 | error", error);
      res.json({
        message: "Delete Failed",
        success: false,
      });
    }
  }

  export const updateMethod = async (req, res) => {
    console.log("stripe-routes.js 142 | route reached", req.params.id);
    let methodid = req.params.id;
    let methodupdate = req.body;

    try {
      const paymentMethod = await stripe.paymentMethods.update(
        methodid,
        methodupdate
      );
      console.log(JSON.stringify(paymentMethod));
      res.json({
        message: "Update Successful",
        success: true,
      });
    } catch (error) {
      console.log("stripe-routes.js 156 | error", error);
      res.json({
        message: "Update Failed",
        success: false,
      });
    }
  }

  export const getMethod = async (req, res) => {
    console.log("stripe-routes.js 159 | route reached", req.params.id);
    let methodid = req.params.id;
    
    try {
      const paymentMethod = await stripe.paymentMethods.retrieve(
        methodid
      );
      console.log(JSON.stringify(paymentMethod));
      res.json({
        message: "Method Successful",
        success: true,
        card: paymentMethod.card
      });
    } catch (error) {
      console.log("stripe-routes.js 172 | error", error);
      res.json({
        message: "Method Failed",
        success: false
      });
    }
  }