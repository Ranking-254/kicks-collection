import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [sizeInput, setSizeInput] = useState("");

  const [formData, setFormData] = useState({
    name: '', description: '', price: '', originalPrice: '', 
    category: 'shoes', imageUrls: [], isHotPick: false, size: [] // Changed imageUrl to imageUrls array
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);
    } catch (err) { console.error("Fetch error:", err); }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewStatus = async (productId, reviewId, action) => {
    try {
      await axios.patch(`${API_URL}/api/products/${productId}/review/${reviewId}`, { action });
      fetchProducts();
      alert(`Review ${action === 'approve' ? 'Approved' : 'Deleted'}!`);
    } catch (err) { alert("Error updating review"); }
  };

  const addSize = (e) => {
    e.preventDefault();
    if (!sizeInput.trim()) return;
    if (!formData.size.includes(sizeInput.trim().toUpperCase())) {
      setFormData({ ...formData, size: [...formData.size, sizeInput.trim().toUpperCase()] });
    }
    setSizeInput("");
  };

  const removeSize = (sizeToRemove) => {
    setFormData({ ...formData, size: formData.size.filter(s => s !== sizeToRemove) });
  };

  // UPDATED: Handle Multiple Image Uploads
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    setIsUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, 
          data
        );
        uploadedUrls.push(res.data.secure_url);
      }
      
      setFormData(prev => ({ 
        ...prev, 
        imageUrls: [...prev.imageUrls, ...uploadedUrls] 
      }));
      setIsUploading(false);
    } catch (err) {
      alert("Upload failed");
      setIsUploading(false);
    }
  };

  const removeImage = (urlToRemove) => {
    setFormData({ ...formData, imageUrls: formData.imageUrls.filter(url => url !== urlToRemove) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.imageUrls.length === 0) return alert("Upload at least one image!");
    try {
      if (editingId) {
        await axios.put(`${API_URL}/api/products/${editingId}`, formData);
      } else {
        await axios.post(`${API_URL}/api/products/add`, formData);
      }
      setShowModal(false);
      resetForm();
      fetchProducts();
      alert("Inventory Updated!");
    } catch (err) { alert("Error saving product"); }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', price: '', originalPrice: '', category: 'shoes', imageUrls: [], isHotPick: false, size: [] });
    setEditingId(null);
  };

  const openEdit = (product) => {
    setFormData({
        ...product,
        imageUrls: product.imageUrls || [product.imageUrl] // Fallback for old single-image data
    });
    setEditingId(product._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item permanently?")) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        fetchProducts();
      } catch (err) { alert("Delete failed."); }
    }
  };

  return (
    <div className="p-4 md:p-10 bg-[#f8f9fa] min-h-screen font-sans text-black">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">Kicks Manager</h1>
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Store Control Panel</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }} 
          className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all shadow-2xl active:scale-95"
        >
          + ADD NEW DROP
        </button>
      </div>

      <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden mb-16">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-black uppercase italic">Current Inventory ({products.length})</h2>
          <input 
            type="text" 
            placeholder="Search items..." 
            className="bg-gray-50 px-6 py-3 rounded-xl outline-none border border-transparent focus:border-black w-full md:w-64 text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="p-6">Product</th>
                <th className="p-6">Category</th>
                <th className="p-6">Price</th>
                <th className="p-6">Status</th>
                <th className="p-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map(p => (
                <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 flex items-center gap-4">
                    {/* Display first image from array */}
                    <img src={p.imageUrls ? p.imageUrls[0] : p.imageUrl} className="w-12 h-12 object-cover rounded-xl border" alt="" />
                    <div>
                      <p className="font-black text-sm uppercase truncate max-w-[150px]">{p.name}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">{p.size.join(', ')}</p>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {p.category}
                    </span>
                  </td>
                  <td className="p-6">
                    <p className="font-black text-sm italic">KES {p.price}</p>
                    {p.originalPrice > p.price && <p className="text-[9px] text-red-500 line-through">KES {p.originalPrice}</p>}
                  </td>
                  <td className="p-6">
                    {p.isHotPick ? (
                      <span className="text-[9px] font-black text-yellow-600 bg-yellow-50 px-2 py-1 rounded uppercase tracking-widest border border-yellow-200">Hot Pick 🔥</span>
                    ) : (
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Standard</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 hover:bg-black hover:text-white rounded-lg transition-colors group">
                        ✏️
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-colors">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="max-w-4xl">
        <h2 className="text-2xl font-black uppercase italic mb-8 border-l-8 border-yellow-400 pl-4">Pending Reviews 🛡️</h2>
        <div className="space-y-4">
          {products.flatMap(p => (p.reviews || []).filter(r => !r.isApproved).map(rev => (
            <div key={rev._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex-1">
                <p className="text-[9px] font-black bg-black text-white px-3 py-1 rounded-full uppercase mb-3 inline-block">{p.name}</p>
                <h4 className="font-black text-sm uppercase italic">{rev.user} says:</h4>
                <p className="text-gray-500 text-sm italic mt-2">"{rev.comment}"</p>
                <div className="flex mt-3">{"⭐".repeat(rev.rating)}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleReviewStatus(p._id, rev._id, 'approve')} className="bg-green-500 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 shadow-xl shadow-green-100 transition-all active:scale-95">Approve</button>
                <button onClick={() => handleReviewStatus(p._id, rev._id, 'delete')} className="bg-red-50 text-red-600 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all">Discard</button>
              </div>
            </div>
          )))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[999] backdrop-blur-md">
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <h2 className="text-3xl font-black mb-8 uppercase italic leading-none">{editingId ? "Update Drop" : "New Drop"}</h2>
            
            <div className="space-y-6">
                <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 block">Visuals (Select Multiple)</label>
                    {/* Added 'multiple' attribute */}
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white" />
                    
                    {/* Image Preview Gallery */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                        {formData.imageUrls.map((url, index) => (
                            <div key={index} className="relative group">
                                <img src={url} className="w-full h-20 object-cover rounded-xl border-2 border-gray-100" />
                                <button 
                                    type="button" 
                                    onClick={() => removeImage(url)} 
                                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    {isUploading && <p className="text-blue-500 text-[10px] font-black animate-pulse mt-2">UPLOADING {formData.imageUrls.length} IMAGES...</p>}
                </div>

                <input type="text" placeholder="Name" className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none font-bold italic uppercase" value={formData.name} onChange={(e)=>setFormData({...formData, name: e.target.value})} required />
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[10px] font-black text-gray-300 uppercase">Original Price</label>
                    <input type="number" className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-red-400" value={formData.originalPrice} onChange={(e)=>setFormData({...formData, originalPrice: e.target.value})} />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-black text-gray-300 uppercase italic">Sale Price</label>
                    <input type="number" className="w-full border-b-2 border-gray-100 py-2 outline-none focus:border-green-400 font-black" value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} required />
                  </div>
                </div>

                <textarea placeholder="Description" className="w-full border-b-2 border-gray-100 py-3 focus:border-black outline-none h-20 text-sm" value={formData.description} onChange={(e)=>setFormData({...formData, description: e.target.value})} required />

                <div className="bg-gray-50 p-6 rounded-3xl">
                    <label className="block mb-3 text-[10px] font-black uppercase text-gray-400">Sizes Available</label>
                    <div className="flex gap-2 mb-4">
                        <input type="text" placeholder="e.g. 44" className="flex-1 bg-white border p-3 rounded-xl text-sm outline-none focus:border-black" value={sizeInput} onChange={(e) => setSizeInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addSize(e)} />
                        <button type="button" onClick={addSize} className="bg-black text-white px-6 rounded-xl font-bold uppercase text-[10px]">Add</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.size.map(s => (
                            <span key={s} className="bg-white border-2 border-black px-4 py-1.5 rounded-full text-[10px] font-black flex items-center gap-2">
                                {s} <button type="button" onClick={() => removeSize(s)} className="text-red-500 text-lg">×</button>
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                    <select className="bg-transparent font-black uppercase text-[10px] outline-none" value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})}>
                        <option value="shoes">Shoes</option>
                        <option value="clothes">Clothes</option>
                    </select>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 accent-black" checked={formData.isHotPick} onChange={(e)=>setFormData({...formData, isHotPick: e.target.checked})} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Hot Pick 🔥</span>
                    </label>
                </div>
            </div>

            <div className="flex gap-4 mt-10">
              <button type="submit" disabled={isUploading} className="flex-1 bg-black text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-yellow-400 hover:text-black transition-all">
                {editingId ? "Update" : "Drop It"}
              </button>
              <button type="button" onClick={()=>{setShowModal(false); resetForm();}} className="flex-1 bg-gray-100 py-5 rounded-2xl font-black uppercase tracking-widest">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;