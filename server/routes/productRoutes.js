const express = require('express');
const router = express.Router();
const { getProducts, getHotPicks, addProduct } = require('../controllers/ProductController');

// Route for all products & category filtering
// Usage: GET /api/products  OR  /api/products?category=shoes
router.get('/', getProducts);

// Route for Hero Section
// Usage: GET /api/products/hot-picks
router.get('/hot-picks', getHotPicks);

// Route to add items (Admin use)
router.post('/add', addProduct);

module.exports = router;
