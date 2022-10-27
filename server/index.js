const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config()
const connectDB = require('./db');
const PORT = process.env.PORT || 3001;

const app = express();
connectDB()
const router = require('./routes/index');

app.use(cors());

// app.use(express.bodyParser());
app.use(express.json())

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

