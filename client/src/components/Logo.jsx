import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png'; 

const Logo = ({ className = "h-20" }) => {
  return (
    <Link to="/" className="flex items-center group">
      <div className={`relative overflow-hidden flex items-center justify-center ${className}`}>
        <img
          src={logoImg}
          alt="Kicks Collection"
          className="h-full w-auto object-contain contrast-[1.2] brightness-[1.05] saturate-[1.1]"
        />
      </div>
      
      {/* OPTIONAL: Brand Text (If the JPEG is just an icon) */}
      <span className="hidden md:block font-black uppercase italic tracking-tighter text-2xl ml-2">
        KICKS<span className="text-yellow-400">COLLECTION</span>
      </span>
    </Link>
  );
};

export default Logo;