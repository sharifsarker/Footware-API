require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async function (req, res) {
  try {
    const { price } = req.body;

    // Validate the input
    if (!price || typeof price !== "number" || price <= 0) {
      return res.status(400).send({ error: "Invalid price provided" });
    }

    // Calculate the order amount in cents
    const amount = calculateOrderAmount(price);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// Function to calculate the order amount in cents
function calculateOrderAmount(price) {
  return Math.round(price * 100); // Convert dollars to cents
}
