import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { sendWhatsAppOrder } from '../utils/whatsapp';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ProductDetailsModal = ({ product, onClose }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [reviewData, setReviewData] = useState({ user: '', rating: 5, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // NEW: State to track the currently selected image in the gallery
  // Fallback to product.imageUrl if imageUrls isn't available yet
  const [activeImg, setActiveImg] = useState(product.imageUrls?.[0] || product.imageUrl);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.patch(`${API_URL}/api/products/${product._id}/review`, reviewData);
      alert("Review posted! Refresh to see it.");
      setReviewData({ user: '', rating: 5, comment: '' });
    } catch (err) {
      alert("Failed to post review");
    }
    setIsSubmitting(false);
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] z-[10000]">
        
        {/* LEFT: IMAGE SECTION WITH GALLERY */}
        <div className="md:w-1/2 flex flex-col bg-gray-50">
          {/* Main Active Image */}
          <div className="h-64 md:h-[500px] overflow-hidden bg-gray-100">
            <img 
              src={activeImg} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500" 
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.imageUrls && product.imageUrls.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto justify-center bg-white border-t border-gray-100">
              {product.imageUrls.map((url, index) => (
                <img 
                  key={index}
                  src={url}
                  onClick={() => setActiveImg(url)}
                  className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                    activeImg === url 
                    ? "border-yellow-400 scale-105 shadow-md" 
                    : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
                  }`}
                  alt={`View ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: DETAILS & REVIEWS */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto bg-white">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-black uppercase italic leading-none">{product.name}</h2>
            <button onClick={onClose} className="text-gray-300 hover:text-black text-5xl">&times;</button>
          </div>

          <p className="text-3xl font-black text-black mb-8">KES {product.price}</p>

          {/* SIZE SELECTOR */}
          <div className="mb-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Pick Size</h4>
            <div className="flex flex-wrap gap-2">
              {product.size.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl font-black border-2 transition-all ${
                    selectedSize === s ? "border-black bg-black text-white" : "border-gray-100 text-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-10 p-6 bg-gray-50 rounded-3xl text-sm italic text-gray-600">
            "{product.description}"
          </div>

          {/* ✍️ WRITE A REVIEW SECTION */}
          <div className="mb-10 border-t border-gray-100 pt-8">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Drop a Review</h4>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="flex gap-4">
                <input 
                  type="text" placeholder="Your Name" 
                  className="flex-1 bg-gray-50 p-3 rounded-xl outline-none text-sm border border-transparent focus:border-yellow-400"
                  value={reviewData.user} onChange={(e)=>setReviewData({...reviewData, user: e.target.value})} required
                />
                <select 
                  className="bg-gray-50 p-3 rounded-xl outline-none text-sm font-bold"
                  value={reviewData.rating} onChange={(e)=>setReviewData({...reviewData, rating: e.target.value})}
                >
                  <option value="5">⭐⭐⭐⭐⭐</option>
                  <option value="4">⭐⭐⭐⭐</option>
                  <option value="3">⭐⭐⭐</option>
                  <option value="2">⭐⭐</option>
                  <option value="1">⭐</option>
                </select>
              </div>
              <textarea 
                placeholder="What do you think of these kicks?" 
                className="w-full bg-gray-50 p-3 rounded-xl outline-none text-sm h-20 border border-transparent focus:border-yellow-400"
                value={reviewData.comment} onChange={(e)=>setReviewData({...reviewData, comment: e.target.value})} required
              ></textarea>
              <button 
                type="submit" disabled={isSubmitting}
                className="bg-black text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-colors"
              >
                {isSubmitting ? "Posting..." : "Post Review"}
              </button>
            </form>
          </div>

          {/* DISPLAY REVIEWS */}
          <div className="mb-10">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Recent Feedback</h4>
            <div className="space-y-6">
              {product.reviews?.filter(rev => rev.isApproved).length > 0 ? (
                product.reviews
                  .filter(rev => rev.isApproved)
                  .map((rev, i) => (
                    <div key={i} className="border-l-2 border-yellow-400 pl-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-black text-[10px] uppercase">{rev.user}</span>
                        <span>{"⭐".repeat(rev.rating)}</span>
                      </div>
                      <p className="text-gray-500 text-xs italic">"{rev.comment}"</p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-400 text-xs italic font-bold uppercase tracking-widest">No verified reviews yet.</p>
              )}
            </div>
          </div>

          <button 
            onClick={() => selectedSize && sendWhatsAppOrder(product, selectedSize)}
            className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl mt-auto ${
              selectedSize ? "bg-green-500 text-white shadow-green-200" : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
          >
            {selectedSize ? `Order Size ${selectedSize}` : "Select Size First"}
          </button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default ProductDetailsModal;