import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

const Hero = () => {
  const [hotPicks, setHotPicks] = useState([]);

  useEffect(() => {
    const fetchHotPicks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products/hot-picks');
        setHotPicks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotPicks();
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6 mb-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-black mb-2 uppercase italic">Today's Hot Picks</h2>
        <p className="text-gray-400 mb-8">The freshest drops in the closet right now.</p>
        
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x">
          {hotPicks.map(product => (
            <div key={product._id} className="min-w-[280px] snap-center text-black">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;