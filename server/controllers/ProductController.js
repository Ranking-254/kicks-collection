const Product = require('../models/Product');

// Get all products OR filter by category
// Updated getProducts in server/controllers/productController.js
exports.getProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let filter = {};
        
        // Category filtering
        if (category) {
            filter.category = category;
        }

        // Search logic: 'i' makes it case-insensitive
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(filter).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};

// Get only "Hot Picks" for the Hero section
exports.getHotPicks = async (req, res) => {
    try {
        const hotPicks = await Product.find({ isHotPick: true }).limit(5);
        res.status(200).json(hotPicks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching hot picks", error });
    }
};

// Add a new product (You'll need this to populate your shop)
// Update this in server/controllers/productController.js
exports.addProduct = async (req, res) => {
    try {
        if (Array.isArray(req.body)) {
            // Handle bulk insert
            const savedProducts = await Product.insertMany(req.body);
            res.status(201).json(savedProducts);
        } else {
            // Handle single insert
            const newProduct = new Product(req.body);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        }
    } catch (error) {
        res.status(400).json({ message: "Error saving product(s)", error });
    }
};