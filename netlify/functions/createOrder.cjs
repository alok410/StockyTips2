exports.handler = async function (event, context) {
  const Razorpay = require("razorpay");

  const instance = new Razorpay({
    key_id: "rzp_live_QxWMEYJBmq2amj",
      key_secret: "bnele52tIDdbiaurLlpofGDq"
  });

  const body = JSON.parse(event.body);

  const options = {
    amount: body.amount, // in paise
    currency: "INR",
    receipt: "receipt_order_74394",
    payment_capture: 1,
  };

  try {
    const order = await instance.orders.create(options);
    return {
      statusCode: 200,
      body: JSON.stringify({ order_id: order.id }),
    };
  } catch (err) {
    console.error("Order creation failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create Razorpay order" }),
    };
  }
};
