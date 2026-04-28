import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-tighter text-black">
          KICKS<span className="text-gray-500 font-light">COLLECTION</span>
        </Link>
        
        <div className="space-x-6 font-medium">
          <Link to="/category/shoes" className="hover:text-gray-500 transition">Shoes</Link>
          <Link to="/category/clothes" className="hover:text-gray-500 transition">Clothes</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;