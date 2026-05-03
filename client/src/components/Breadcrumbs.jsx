import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  
  const categoryMap = {
    'shoes': 'Fashion',
    'clothes': 'Fashion',
    'foam-cleaner': 'Accessories',
    'laptop-stands': 'Accessories',
    'thermo-cups': 'Accessories',
    'sneaker-guards': 'Accessories',
    'human-hair': 'Wigs',
    'semi-human': 'Wigs',
    'braids': 'Wigs'
  };

  const pathnames = location.pathname.split('/').filter((x) => x);
  
  // Show "HOME" if on main page, otherwise follow path
  if (location.pathname === '/' || pathnames.length === 0) {
    return <span className="text-[10px] font-black uppercase tracking-widest text-black">Home / Store</span>;
  }

  const subCategory = pathnames[pathnames.length - 1];
  const parentCategory = categoryMap[subCategory];

  return (
    <nav className="flex flex-wrap items-center gap-1 text-[9px] font-black uppercase tracking-tighter text-gray-400">
      <Link to="/" className="hover:text-black transition-colors">Home</Link>
      
      {parentCategory && (
        <>
          <span>/</span>
          <span className="text-black">{parentCategory}</span>
        </>
      )}

      <span>/</span>
      <span className="text-yellow-500 italic">
        {subCategory.replace(/-/g, ' ')}
      </span>
    </nav>
  );
};

export default Breadcrumbs;