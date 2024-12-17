import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Typage des props
interface Category {
  id: number;
  name: string;
}

interface CategoriesProps {
  onCategorySelect?: (category: Category) => void; // Prop optionnelle
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/resto/api/categories");
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des catégories.");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Impossible de charger les catégories.");
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    } else {
      navigate(`/dishes/${category.id}`); // Redirection par défaut
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h2 className="text-3xl font-bold mb-8">NOS MENUS</h2>
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="bg-blue-600 text-white p-6 rounded-lg text-xl font-bold"
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
