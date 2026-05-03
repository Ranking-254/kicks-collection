import React from 'react';

const InformationLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-0">
      <div className="container mx-auto max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-12 border-l-8 border-yellow-400 pl-6">
          {title}
        </h1>
        <div className="prose prose-zinc max-w-none font-medium text-gray-800 leading-relaxed space-y-8 uppercase text-xs tracking-wide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default InformationLayout;