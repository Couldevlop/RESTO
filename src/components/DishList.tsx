import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Dish {
  id: number;
  name: string;
  description: string;
  image: string;
  ingredients: string;
  price: number;
}

interface DishListProps {
  onDishSelect?: (dish: Dish) => void;
  commandCount?: number;
}

const DishList: React.FC<DishListProps> = ({ onDishSelect, commandCount = 0 }) => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchDishes = async () => {
      if (!categoryId) return;
      
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:4000/resto/api/categories/${categoryId}/with-dishes`);
        if (!response.ok) {
          throw new Error("Erreur réseau lors de la récupération des plats.");
        }
        const data = await response.json();
        setDishes(data.dishes);
        setCategoryName(data.name);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [categoryId]);

  return (
    <div className="min-h-screen bg-amber-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => navigate('/categories')} className="text-blue-600 flex items-center">
            <img
              src="/images/back_icon.png"
              alt="Retour"
              className="h-5 w-5 mr-2"
            />
            Retour
          </button>
          {commandCount > 0 && (
            <div className="flex items-center">
              <img
                src="/images/panier_icon.png"
                alt="Panier"
                className="h-6 w-6"
              />
              <span className="ml-2 text-amber-800 font-bold">
                {commandCount}
              </span>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Plats du menu: {categoryName}
        </h2>

        {loading ? (
          <p>Chargement des plats...</p>
        ) : error ? (
          <p className="text-red-600">Erreur: {error}</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="border p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <div className="w-full h-40 aspect-video mb-4">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <p className="text-gray-600">{dish.description}</p>
                <p className="text-gray-500">Ingrédients: {dish.ingredients}</p>
                <p className="text-amber-800 font-bold">{dish.price} CFA</p>
                <button
                  onClick={() => onDishSelect && onDishSelect(dish)}
                  className="mt-2 p-2 bg-amber-800 text-white rounded hover:bg-amber-900 w-full"
                >
                  Choisir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DishList;