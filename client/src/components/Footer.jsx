import React from 'react';
import { Link } from 'react-router-dom';
// 🛠️ Font Awesome 6 Imports
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter } from 'react-icons/fa6';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND SECTION */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase italic">
              KICKS<span className="text-yellow-400">COLLECTION</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Elevating your drip since 2024. The best selection of authentic kicks and streetwear in Nairobi. 
              <Link to="/about" className="text-white block mt-2 hover:text-yellow-400 underline decoration-yellow-400 text-xs italic font-bold uppercase tracking-widest">
                Our Story // About Us
              </Link>
            </p>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase text-[10px]">
              <li><Link to="/category/shoes" className="hover:text-yellow-400 transition">Shoes</Link></li>
              <li><Link to="/category/clothes" className="hover:text-yellow-400 transition">Streetwear</Link></li>
              <li><Link to="/category/laptop-stands" className="hover:text-yellow-400 transition">Laptop Stands</Link></li>
              <li><Link to="/category/braids" className="hover:text-yellow-400 transition">Braids</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Support Hub</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold uppercase text-[10px]">
              <li><Link to="/customer-care" className="hover:text-yellow-400 transition underline decoration-gray-800">Contact Support</Link></li>
              <li><Link to="/shipping-info" className="hover:text-yellow-400 transition">Shipping Info</Link></li>
              <li><Link to="/size-guide" className="hover:text-yellow-400 transition">Size Guide</Link></li>
              <li><Link to="/return-policy" className="hover:text-yellow-400 transition">Return Policy</Link></li>
            </ul>
          </div>

          {/* CONNECT SECTION */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Connect</h4>
            <p className="text-gray-400 text-[10px] font-black mb-4 italic tracking-widest">Nairobi,KENYA</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/pattin_njue" target="_blank" rel="noopener noreferrer"  className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition transform active:scale-90 shadow-lg">
                <FaInstagram size={18} />
              </a>
              <a href="https://www.facebook.com/kicksCollection" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition transform active:scale-90 shadow-lg">
                <FaFacebookF size={16} />
              </a>
              <a href="https://x.com/NjuePattin" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition transform active:scale-90 shadow-lg">
                <FaTwitter size={16} />
              </a>
              <a 
                href="https://wa.me/254712345678" // Replace with your actual number
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition transform active:scale-90 shadow-lg"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>© {currentYear} KICKSCOLLECTION. ALL RIGHTS RESERVED.</p>
          
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <a 
              href="https://systx-infra.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition border-b-2 border-yellow-400 pb-0.5"
            >
              SYSTX CREATIONS
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;