const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    originalPrice: {
        type: Number,
        required: false,
        default: 0
    },
    // Updated to handle multiple images
    imageUrls: {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A product must have at least one image.'
        }
    },
    size: { 
        type: [String], 
        required: true 
    }, 
    category: { 
        type: String, 
        required: true, 
        enum: [
            'shoes', 
            'clothes', 
            'foam-cleaner', 
            'laptop-stands', 
            'thermo-cups', 
            'sneaker-guards', 
            'human-hair', 
            'semi-human', 
            'braids'
        ] 
    },
    isHotPick: { 
        type: Boolean, 
        default: false 
    },
    reviews: [
        {
            user: String,
            rating: Number,
            comment: String,
            isApproved: { type: Boolean, default: false },
            date: { type: Date, default: Date.now }
        }
    ],
    averageRating: { 
        type: Number, 
        default: 5 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Product', ProductSchema);