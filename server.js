const express = require('express');
const app = require('./app.js');
const connectDB = require('./config/databaseConn.js');

require('dotenv').config();

//process.env is the way to access any attribute value from .env file.
const PORT = process.env.PORT || 3000;

// connecting DB before starting the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error in connecting to DB', error);
    process.exit(1);
  });
