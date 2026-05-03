import React from 'react';
import InformationLayout from '../components/InformationLayout';

const SizeGuide = () => (
  <InformationLayout title="Size Guide">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-4 border border-gray-200">EU Size</th>
            <th className="p-4 border border-gray-200">UK Size</th>
            <th className="p-4 border border-gray-200">US Men</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr><td className="p-4 border border-gray-200">40</td><td className="p-4 border border-gray-200">6</td><td className="p-4 border border-gray-200">7</td></tr>
          <tr><td className="p-4 border border-gray-200">41</td><td className="p-4 border border-gray-200">7</td><td className="p-4 border border-gray-200">8</td></tr>
          <tr><td className="p-4 border border-gray-200">42</td><td className="p-4 border border-gray-200">8</td><td className="p-4 border border-gray-200">9</td></tr>
          <tr><td className="p-4 border border-gray-200">43</td><td className="p-4 border border-gray-200">9</td><td className="p-4 border border-gray-200">10</td></tr>
          <tr><td className="p-4 border border-gray-200">44</td><td className="p-4 border border-gray-200">10</td><td className="p-4 border border-gray-200">11</td></tr>
        </tbody>
      </table>
    </div>
  </InformationLayout>
);

export default SizeGuide;