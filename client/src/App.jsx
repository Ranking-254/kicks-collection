import React, { useState, useEffect } from 'react'; // Added hooks
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import CategoryPage from './pages/CategoryPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if the user was already logged in
    const auth = localStorage.getItem("adminToken");
    if (auth === "true") setIsAdmin(true);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />

        {/* ADMIN LOGIC: 
          If isAdmin is true, show the Dashboard. 
          If not, show the Login page.
        */}
        <Route 
          path="/admin" 
          element={isAdmin ? <AdminDashboard /> : <AdminLogin setAuth={setIsAdmin} />} 
        />
        
        {/* Optional: keeps the login accessible directly if needed */}
        <Route path="/admin/login" element={<AdminLogin setAuth={setIsAdmin} />} />
      </Routes>
    </div>
  );
}

export default App;