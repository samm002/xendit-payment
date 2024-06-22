require('dotenv').config();
const { v4: uuidv4 } = require("uuid");
const axios = require('axios');

const pay = async (req, res) => {
  const paymentUrl = 'https://api.xendit.co/v2/invoices';
  const { paymentAmount } = req.body;
  const externalId = uuidv4();
  const apiKey = process.env.XENDIT_API_KEY;
  const password = "";

  const paymentData = {
    amount: paymentAmount,
    external_id: externalId,
  };

  try {
    const response = await axios.post(paymentUrl, paymentData, {
      auth: { 
        username: apiKey,
        password: password,
      }
    });

    const paymentUrlResponse = response.data.invoice_url;

    console.log("Success Generate Payment Url :", paymentUrlResponse);

    res.status(200).json({ 
      message: "Success Generate Payment Url", 
      data: paymentUrlResponse,
    });
  } catch(error) {
    console.error('Error Generating Payment Url :', error);
    res.status(500).json({ 
      message: "Error Generating Payment Url", 
      error: error, 
    });
  } 
}

module.exports = { 
  pay,
};