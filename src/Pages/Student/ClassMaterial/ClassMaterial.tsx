// ClassMaterials.js

import MaterialCard from "./MaterialCard";

const ClassMaterials = () => {
  // Hard-coded example materials
  const materials = [
    {
      id: 1,
      title: "Day 1",
      description: "Introduction to the course",
      link: "https://example.com/day1-material",
    },
    {
      id: 2,
      title: "Day 2",
      description: "Topic: React Basics",
      link: "https://example.com/day2-material",
    },
    {
      id: 3,
      title: "Day 3",
      description: "Topic: State and Props",
      link: "https://example.com/day3-material",
    },
    // Add more materials as needed
  ];

  return (
    <div className="container mx-auto mt-10 cursor-pointer">
      <h1 className="ml-2 text-2xl sm:text-4xl font-extrabold text-blue-600 mb-8 text-center">
        Explore Class Materials
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 w-[90%] mx-auto">
        {materials.map((material) => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>
    </div>
  );
};

export default ClassMaterials;
