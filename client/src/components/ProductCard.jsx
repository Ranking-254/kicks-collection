import React, { useState } from 'react';
import ProductDetailsModal from './ProductDetailsModal';

const ProductCard = ({ product }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const originalPrice = Number(product.originalPrice);
  const currentPrice = Number(product.price);
  const savedAmount = (originalPrice > currentPrice) ? originalPrice - currentPrice : 0;

  // 🛠️ THE FIX: Get image and apply Cloudinary high-res + sharpening transformation
  let displayImage = (product.imageUrls && product.imageUrls.length > 0) 
    ? product.imageUrls[0] 
    : (product.imageUrl || 'https://via.placeholder.com/400x400?text=No+Image');

  // Apply high-res, sharpening, and padding if it's a Cloudinary link
  if (displayImage.includes('res.cloudinary.com')) {
    displayImage = displayImage.replace(
      '/upload/', 
      '/upload/q_auto:best,f_auto,e_sharpen:100,c_pad,b_white/'
    );
  }

  return (
    <>
      <div 
        onClick={() => setShowDetails(true)}
        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full cursor-pointer"
      >
        {/* SALE BADGE */}
        {savedAmount > 0 && (
          <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-black text-[10px] font-black px-3 py-1.5 rounded-full uppercase animate-pulse">
            SAVE KES {savedAmount}
          </div>
        )}

        <div className="relative h-64 overflow-hidden">
          <img 
            src={displayImage} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-black text-lg uppercase italic truncate">{product.name}</h3>
          <div className="flex items-center gap-3 mt-2 mb-4">
            {savedAmount > 0 && <span className="text-gray-400 text-sm line-through">KES {product.originalPrice}</span>}
            <span className="text-xl font-black text-black">KES {product.price}</span>
          </div>
          <button className="mt-auto w-full bg-black text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest group-hover:bg-yellow-400 group-hover:text-black transition-colors">
            View Details
          </button>
        </div>
      </div>

      {showDetails && (
        <ProductDetailsModal 
          product={product} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;