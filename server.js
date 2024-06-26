require('dotenv').config();
const cors = require("cors");
const express = require("express");
const router = require('./src/routes');

const app = express();
const port = 3000;

// Middleware
app.use(cors({origin: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/assets', express.static('assets'));


// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Routes
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
