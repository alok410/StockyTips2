const Razorpay = require("razorpay");

exports.handler = async function (event) {
  let amount = 9900; // default ₹99

  // ✅ Handle missing or invalid JSON
  try {
    if (event.body) {
      const parsed = JSON.parse(event.body);
      if (parsed.amount) {
        amount = parsed.amount;
      }
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON in request body" }),
    };
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 1,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ order_id: order.id }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
