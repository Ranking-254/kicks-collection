import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // We will move your current App.js logic here
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />
      </Routes>
    </div>
  );
}

export default App;