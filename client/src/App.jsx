import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Footer from './components/Footer';
import ShippingInfo from './pages/ShippingInfo';
import ReturnPolicy from './pages/ReturnPolicy';
import SizeGuide from './pages/SizeGuide';
import About from './pages/About';
import CustomerCare from './pages/CustomerCare';
function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminToken");
    if (auth === "true") setIsAdmin(true);
  }, []);

  return (
    /* 🛠️ CHANGE 1: Use 'flex flex-col md:flex-row' to stack on mobile but sidebar on desktop */
    <div className="min-h-screen bg-white text-black font-sans flex flex-col md:flex-row">
      
      {/* 🛠️ CHANGE 2: Navbar is now our Sidebar. It stays on the left. */}
      <Navbar />

      {/* 🛠️ CHANGE 3: Create a wrapper for the main content + footer */}
      <div className="flex-grow flex flex-col min-w-0">
        <main className="flex-grow">
        
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:type" element={<CategoryPage />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/return-policy" element={<ReturnPolicy />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/about" element={<About />} />
            <Route path="/customer-care" element={<CustomerCare />} />


            {/* Admin Logic */}
            <Route 
              path="/admin" 
              element={isAdmin ? <AdminDashboard /> : <AdminLogin setAuth={setIsAdmin} />} 
            />
            <Route path="/admin/login" element={<AdminLogin setAuth={setIsAdmin} />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom of the content area */}
        <Footer />
      </div>
    </div>
  );
}

export default App;