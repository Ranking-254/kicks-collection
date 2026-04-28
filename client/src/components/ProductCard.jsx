import React from 'react';
import { sendWhatsAppOrder } from '../utils/whatsapp';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:scale-105 transition-transform">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="text-gray-600">Size: {product.size.join(', ')}</p>
        <p className="text-green-600 font-bold text-lg mt-2">KES {product.price}</p>
        
        <button 
          onClick={() => sendWhatsAppOrder(product)}
          className="w-full mt-4 bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 transition"
        >
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};

export default ProductCard;