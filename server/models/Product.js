const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    size: { type: [String], required: true }, // Array: ['40', '41'] or ['L', 'XL']
    imageUrl: { type: String, required: true },
    category: { 
        type: String, 
        required: true, 
        enum: ['shoes', 'clothes'] // Limits input to these two
    },
    isHotPick: { type: Boolean, default: false }, // For your Hero section
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);