import React from 'react';
import InformationLayout from '../components/InformationLayout';

const About = () => {
  return (
    <InformationLayout title="Our Story">
      <section className="space-y-6">
        <div className="bg-black text-white p-8 rounded-3xl mb-12">
          <h2 className="text-2xl font-black uppercase italic text-yellow-400 mb-4">
            The Intersection of Code & Culture
          </h2>
          <p className="text-sm font-bold leading-relaxed tracking-wide">
            KICKSCOLLECTION ISN'T JUST A STORE; IT'S A NODE IN THE DIGITAL CULTURE NETWORK. 
            FOUNDED BY PATTIN MUGAMBI, A SOFTWARE ENGINEER DRIVEN BY PRECISION AND STYLE, 
            WE BRIDGE THE GAP BETWEEN TECHNICAL EXCELLENCE AND STREETWEAR AUTHENTICITY.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-2 border-gray-100 p-6 rounded-2xl">
            <h3 className="text-lg font-black mb-2 underline decoration-yellow-400">NAIROBI_NODE_001</h3>
            <p className="text-gray-600">Based in the heart of Kenya, we curate the finest selection of kicks, outfits, and accessories for the modern trendsetter.</p>
          </div>
          <div className="border-2 border-gray-100 p-6 rounded-2xl">
            <h3 className="text-lg font-black mb-2 underline decoration-yellow-400">MERU_NODE_002</h3>
            <p className="text-gray-600">Expanding our reach to Meru, ensuring high-quality streetwear is accessible nationwide through our robust logistics network.</p>
          </div>
        </div>

        <div className="pt-10 border-t-2 border-gray-100">
          <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Technical Backbone</h3>
          <p className="text-gray-500 italic">
            Powered by SYSTX Digital Infrastructure, our platform is built for speed, security, and a seamless user experience.
          </p>
        </div>
      </section>
    </InformationLayout>
  );
};

export default About;