const { Invoice: InvoiceClient } = require('xendit-node');
const { v4: uuidv4 } = require("uuid");
const path = require('path');
const url = process.env.APP_URL;

const xenditInvoiceClient = new InvoiceClient({ secretKey: process.env.XENDIT_API_KEY });

const homePage = (req, res) => {
  try {
    res.render(path.join(__dirname, 'views', 'index'), { url });
  } catch (error) {
    console.error('Error rendering home page:', error);
    res.status(500).send('Error rendering home page');
  }
}

const pay = async (req, res) => {
  const { paymentAmount } = req.body;
  const externalId = uuidv4();

  const paymentData = {
    "amount" : paymentAmount,
    "invoiceDuration" : 172800,
    "externalId" : externalId,
    "description" : `Invoice of ${externalId}`,
    "currency" : "IDR",
    "reminderTime" : 1
  };

  try {
    const response = await xenditInvoiceClient.createInvoice({
      data: paymentData
    });
    
    console.log("Success Generate Payment Url :", response.invoiceUrl);

    res.status(200).json({ 
      message: "Success Generate Payment Url", 
      data: response.invoiceUrl,
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
  homePage,
  pay,
};