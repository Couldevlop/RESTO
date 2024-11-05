import React from "react";

const Categories = ({ onCategorySelect }) => {
  const categories = [
    { id: 1, name: "ENTREE", color: "bg-green-600" },
    { id: 2, name: "RESISTANCE", color: "bg-blue-600" },
    { id: 3, name: "DESSERT", color: "bg-pink-600" },
    { id: 4, name: "BOISSON", color: "bg-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">Catégories de Plats</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.name)}
              className={`${category.color} text-white p-6 rounded-lg text-xl font-bold flex items-center justify-center h-32`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
