const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};
        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: 'i' };

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

exports.getHotPicks = async (req, res) => {
    try {
        const hotPicks = await Product.find({ isHotPick: true }).limit(20).sort({ createdAt: -1 });
        res.status(200).json(hotPicks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hot picks", error });
    }
};

exports.addProduct = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            const savedProducts = await Product.insertMany(req.body);
            res.status(201).json(savedProducts);
        } else {
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        }
    } catch (error) {
        res.status(400).json({ message: "Error saving product(s)", error });
    }
};

// --- REVIEW LOGIC ---

// Customer submits a review (Pending)
exports.addReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        const newReview = {
            user: req.body.user,
            rating: Number(req.body.rating),
            comment: req.body.comment,
            isApproved: false // Requires Admin
        };

        product.reviews.push(newReview);
        await product.save();
        res.status(200).json({ message: "Review submitted for approval" });
    } catch (error) {
        res.status(500).json(error);
    }
};

// Admin approves or deletes reviews
exports.handleReviewStatus = async (req, res) => {
    try {
        const { action } = req.body;
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (action === 'approve') {
            const review = product.reviews.id(req.params.reviewId);
            if (review) review.isApproved = true;
            
            // Recalculate average rating for approved ones only
            const approved = product.reviews.filter(r => r.isApproved);
            product.averageRating = approved.length > 0 
                ? approved.reduce((a, b) => a + b.rating, 0) / approved.length 
                : 5;
        } else {
            product.reviews.pull(req.params.reviewId);
        }

        await product.save();
        res.json({ message: "Review status updated" });
    } catch (error) {
        res.status(500).json(error);
    }
};