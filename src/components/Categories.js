import React, { useEffect, useState } from "react";

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  const categoryColors = {
    "ENTREE": "bg-green-600",
    "RESISTANCE": "bg-blue-600",
    "DESSERT": "bg-pink-600",
    "BOISSONS": "bg-purple-600"
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/resto/api/categories");
        if (!response.ok) {
          throw new Error("Une erreur s'est produite lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">NOS MENUS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category)} // Pass the whole category object
              className={`${categoryColors[category.name] || 'bg-gray-600'} text-white p-6 rounded-lg text-xl font-bold flex items-center justify-center h-32`}
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
