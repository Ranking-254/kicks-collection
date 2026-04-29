import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        
        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* BRAND SECTION */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-black tracking-tighter uppercase italic">
              KICKS<span className="text-yellow-400">COLLECTION</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              Elevating your drip since 2024. The best selection of authentic kicks and streetwear in Nairobi.
            </p>
          </div>

          {/* SHOP LINKS */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link to="/category/shoes" className="hover:text-yellow-400 transition">Shoes</Link></li>
              <li><Link to="/category/clothes" className="hover:text-yellow-400 transition">Streetwear</Link></li>
              <li><Link to="/" className="hover:text-yellow-400 transition">New Drops</Link></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><button className="hover:text-yellow-400 transition">Shipping Info</button></li>
              <li><button className="hover:text-yellow-400 transition">Size Guide</button></li>
              <li><button className="hover:text-yellow-400 transition">Return Policy</button></li>
            </ul>
          </div>

          {/* CONTACT & SOCIAL */}
          <div>
            <h4 className="font-black uppercase text-xs tracking-widest mb-6">Connect</h4>
            <p className="text-gray-400 text-sm mb-4">Nairobi, Kenya</p>
            <div className="flex space-x-4">
              {/* You can add icons here later */}
              <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition">IG</a>
              <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition">FB</a>
              <a href="#" className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition">TK</a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>© {currentYear} KICKSCOLLECTION. ALL RIGHTS RESERVED.</p>
          
          {/* YOUR COMPANY SECTION */}
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <a 
              href="https://systx-infra.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-yellow-400 transition border-b border-yellow-400 pb-0.5"
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