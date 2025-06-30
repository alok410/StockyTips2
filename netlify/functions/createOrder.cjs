const Razorpay = require("razorpay");

exports.handler = async function (event, context) {
  try {
    const instance = new Razorpay({
      key_id: "rzp_live_QxWMEYJBmq2amj",
      key_secret: "bnele52tIDdbiaurLlpofGDq"
    });

    const order = await instance.orders.create({
      amount: 9900,
      currency: "INR",  
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2"
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(order)
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
