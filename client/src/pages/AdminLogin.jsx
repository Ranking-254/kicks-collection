import React, { useState } from 'react';
import axios from 'axios';

const AdminLogin = ({ setAuth }) => {
  const [pass, setPass] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/products/admin/login`, { password: pass });
      if (res.data.success) {
        localStorage.setItem("adminToken", "true");
        setAuth(true);
      }
    } catch (err) {
      alert("Wrong password, Chief.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] w-full max-w-sm shadow-2xl">
        <h2 className="text-2xl font-black uppercase italic mb-6 text-center">Owner Access 🔐</h2>
        <input 
          type="password" 
          placeholder="Enter Admin Password" 
          className="w-full border-2 border-gray-100 p-4 rounded-2xl mb-4 outline-none focus:border-yellow-400 font-bold"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black transition-all">
          Unlock Dashboard
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;