const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Needed for the inline delete/put
const { 
    getProducts, 
    getHotPicks, 
    addProduct, 
    addReview, 
    handleReviewStatus 
} = require('../controllers/productController');

// Standard Routes
router.get('/', getProducts);
router.get('/hot-picks', getHotPicks);
router.post('/add', addProduct);

// --- Review Routes ---
// Submit a review (Frontend uses: PATCH /api/products/:id/review)
router.patch('/:id/review', addReview);

// Admin Action (Frontend uses: PATCH /api/products/:productId/review/:reviewId)
router.patch('/:productId/review/:reviewId', handleReviewStatus);

// Product Management
router.delete('/:id', async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.status(200).json({ success: true, token: "authenticated_admin_session" });
  } else {
    res.status(401).json({ success: false, message: "Invalid Password" });
  }
});

module.exports = router;