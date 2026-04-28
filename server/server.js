const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://your-frontend-name.vercel.app", "http://localhost:5173"],
  credentials: true
}));
// Use the routes
app.use('/api/products', productRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 Connected to Kicks Collection DB"))
    .catch((err) => console.log("❌ DB Connection Error:", err));

// Basic Route for testing
app.get('/', (req, res) => {
    res.send("Kicks Collection API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port localhost:http://localhost:${PORT}`));

module.exports = app;