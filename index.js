// import express module
const express = require('express');
const mongoose = require('mongoose');

// import auth router
const authRouter = require('./routes/auth');

// define the port number
const PORT = 3000;

// create express app
const app = express();

// middleware
app.use(express.json());
app.use(authRouter);

// mongoose connection string
const DB = "mongodb+srv://aldi_store_api:aldiprasetyo@cluster0.5snyeic.mongodb.net/storeDB?retryWrites=true&w=majority&appName=Cluster0";

// connect to MongoDB
mongoose.connect(DB)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ Connection failed:', err.message));

// start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
