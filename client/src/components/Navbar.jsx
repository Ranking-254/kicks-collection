import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Breadcrumbs from './Breadcrumbs'; 
// 🛠️ Added more specific icons from Font Awesome 6
import { 
  FaShirt, FaBagShopping, FaCrown, 
  FaLaptop, FaShoePrints, FaSprayCan, 
  FaShieldHalved, FaMugHot, FaScissors 
} from 'react-icons/fa6'; 

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openCategory, setOpenCategory] = useState(null);

  // Updated structure to allow icons for subcategories
  const categories = [
    {
      name: 'Fashion',
      icon: <FaShirt />,
      sub: [
        { name: 'Shoes', icon: <FaShoePrints size={12} /> },
        { name: 'Clothes', icon: <FaShirt size={12} /> }
      ]
    },
    {
      name: 'Accessories',
      icon: <FaBagShopping />,
      sub: [
        { name: 'Foam Cleaner', icon: <FaSprayCan size={12} /> },
        { name: 'Laptop Stands', icon: <FaLaptop size={12} /> },
        { name: 'Thermo Cups', icon: <FaMugHot size={12} /> },
        { name: 'Sneaker Guards', icon: <FaShieldHalved size={12} /> }
      ]
    },
    {
      name: 'Wigs',
      icon: <FaCrown />,
      sub: [
        { name: 'Human Hair', icon: <FaScissors size={12} /> },
        { name: 'Semi Human Hair', icon: <FaScissors size={12} /> },
        { name: 'Braids', icon: <FaCrown size={12} /> }
      ]
    }
  ];

  const toggleCategory = (name) => {
    setOpenCategory(openCategory === name ? null : name);
  };

  return (
    <>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-[110] bg-black text-white p-2 rounded-md shadow-lg md:flex items-center gap-2 text-xs font-bold uppercase tracking-tighter"
      >
        {isSidebarOpen ? '✕ Close' : '☰ Shop by Category'}
      </button>

      <nav className={`fixed md:sticky top-0 left-0 z-[100] bg-white border-r border-gray-200 h-screen transition-all duration-300 ease-in-out shadow-2xl md:shadow-none ${
        isSidebarOpen ? 'w-72 opacity-100' : 'w-0 opacity-0 -translate-x-full md:translate-x-0 overflow-hidden'
      }`}>
        
        <div className="p-6 pt-20">
          <Logo className="h-12 mb-10" variant="light" />
          
          <div className="mb-6 border-b pb-2">
             <Breadcrumbs />
          </div>

          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.name} className="border-b border-gray-50 pb-2">
                <button 
                  onClick={() => toggleCategory(cat.name)}
                  className="w-full flex items-center justify-between font-black text-sm uppercase py-2 hover:text-yellow-500 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg text-black">{cat.icon}</span>
                    {cat.name}
                  </span>
                  <span className={`transition-transform duration-300 ${openCategory === cat.name ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openCategory === cat.name ? 'max-h-80 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <ul className="space-y-2 ml-2 border-l-2 border-yellow-400 pl-4">
                    {cat.sub.map(subItem => (
                      <li key={subItem.name}>
                        <Link 
                          to={`/category/${subItem.name.toLowerCase().replace(/ /g, '-')}`}
                          className="text-gray-500 hover:text-black hover:font-bold transition-all text-[10px] flex items-center gap-2 py-1 uppercase tracking-wide group"
                        >
                          <span className="text-gray-300 group-hover:text-yellow-500 transition-colors">
                            {subItem.icon}
                          </span>
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;