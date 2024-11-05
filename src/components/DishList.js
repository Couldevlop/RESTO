import React from "react";

const DishList = ({ category, onDishSelect, onBack, commandCount }) => {
  // Définir les plats pour chaque catégorie
  const dishesByCategory = {
    ENTREE: [
      {
        id: 1,
        name: "Salade César",
        description: "Délicieuse salade avec sauce César...",
        ingredients: "Laitue, Poulet, Croûtons, Parmesan",
        price: 2500,
        image: "/images/ENTREE1.jpeg",
      },
      {
        id: 2,
        name: "Bruschetta",
        description: "Pain grillé avec tomates fraîches...",
        ingredients: "Pain, Tomates, Basilic, Ail",
        price: 1500,
        image: "/images/ENTREE2.jpeg",
      },
      {
        id: 3,
        name: "Bruschetta",
        description: "Pain grillé avec tomates fraîches...",
        ingredients: "Pain, Tomates, Basilic, Ail",
        price: 1500,
        image: "/images/ENTREE3.jpeg",
      },
      {
        id: 4,
        name: "Bruschetta",
        description: "Pain grillé avec tomates fraîches...",
        ingredients: "Pain, Tomates, Basilic, Ail",
        price: 1500,
        image: "/images/ENTREE4.jpeg",
      },
    ],
    RESISTANCE: [
      {
        id: 5,
        name: "Poulet Grillé",
        description: "Poulet grillé avec légumes de saison...",
        ingredients: "Poulet, Légumes, Épices",
        price: 4000,
        image: "/images/RESISTANCE1.jpeg",
      },
      {
        id: 6,
        name: "Côte de Boeuf",
        description: "Côte de boeuf tendre et juteuse...",
        ingredients: "Boeuf, Sauce BBQ, Frites",
        price: 7000,
        image: "/images/RESISTANCE2.jpeg",
      },
    ],
    DESSERT: [
      {
        id: 9,
        name: "Fondant au Chocolat",
        description: "Gâteau fondant au chocolat noir...",
        ingredients: "Chocolat, Beurre, Œufs, Sucre",
        price: 3000,
        image: "/images/DESSERT1.jpeg",
      },
      {
        id: 10,
        name: "Crème Brûlée",
        description: "Crème douce avec caramel croquant...",
        ingredients: "Crème, Sucre, Vanille",
        price: 2500,
        image: "/images/DESSERT2.jpeg",
      },
    ],
    BOISSON: [
      {
        id: 13,
        name: "Mojito",
        description: "Cocktail rafraîchissant à la menthe...",
        ingredients: "Menthe, Citron Vert, Eau gazeuse",
        price: 2000,
        image: "/images/BOISSON1.jpeg",
      },
      {
        id: 14,
        name: "Smoothie Mangue",
        description: "Smoothie frais à la mangue...",
        ingredients: "Mangue, Banane, Lait",
        price: 1800,
        image: "/images/BOISSON2.jpeg",
      },
    ],
  };

  const dishes = dishesByCategory[category] || [];

  return (
    <div className="min-h-screen bg-amber-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onBack} className="text-blue-600 flex items-center">
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
          Plats dans la catégorie: {category}
        </h2>

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
                onClick={() => onDishSelect(dish)}
                className="mt-2 p-2 bg-amber-800 text-white rounded hover:bg-amber-900 w-full"
              >
                Choisir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DishList;
