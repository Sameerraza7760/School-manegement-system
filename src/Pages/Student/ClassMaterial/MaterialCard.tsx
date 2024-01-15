
import React from 'react';

interface Material {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="bg-white border p-6 rounded-lg mb-6 transition-shadow duration-300 hover:shadow-xl">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-blue-700">{material.title}</h2>
        <p className="text-gray-600">{material.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <a
          href={material.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          View Material
        </a>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 focus:outline-none">
          Download
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;