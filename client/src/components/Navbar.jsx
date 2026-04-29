import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b sticky top-0 z-[100] shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="text-2xl font-black tracking-tighter text-black uppercase italic">
          KICKS<span className="text-yellow-400">COLLECTION</span>
        </Link>

        {/* DESKTOP LINKS (Hidden on Mobile) */}
        <div className="hidden md:flex space-x-8 font-black uppercase text-xs tracking-widest">
          <Link to="/category/shoes" className="hover:text-yellow-500 transition-colors">Shoes</Link>
          <Link to="/category/clothes" className="hover:text-yellow-500 transition-colors">Clothes</Link>
        </div>

        {/* MOBILE HAMBURGER BUTTON (Hidden on Desktop) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
        >
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-black text-white ${isOpen ? 'max-h-64 border-b' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 space-y-6 font-black uppercase italic tracking-widest text-center">
          <Link 
            to="/category/shoes" 
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400 transition-colors"
          >
            Shoes
          </Link>
          <Link 
            to="/category/clothes" 
            onClick={() => setIsOpen(false)}
            className="hover:text-yellow-400 transition-colors"
          >
            Clothes
          </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;