// backend/index.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
//const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // To parse JSON request bodies

// Routes
app.use('/api/products', productRoutes);

// Start Server
//app.listen(PORT, () => {
  //console.log(`🚀 Server is running on http://localhost:${PORT}`);
//});
module.exports = app;