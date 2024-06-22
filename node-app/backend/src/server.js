require('dotenv').config();
const cors = require("cors");
const express = require("express");
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors({origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
