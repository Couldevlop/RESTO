import React, { useState } from "react";

const AdminPanel = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "ENTREE", color: "bg-green-600" },
    { id: 2, name: "RESISTANCE", color: "bg-blue-600" },
    { id: 3, name: "DESSERT", color: "bg-pink-600" },
    { id: 4, name: "BOISSON", color: "bg-purple-600" },
  ]);

  const [dishes, setDishes] = useState([
    {
      id: 1,
      name: "Salade César",
      description: "Délicieuse salade avec sauce César...",
      ingredients: "Laitue, Poulet, Croûtons, Parmesan",
      price: 2500,
      image: "/images/ENTREE1.jpeg",
      category: "ENTREE",
    },
    {
      id: 2,
      name: "Bruschetta",
      description: "Pain grillé avec tomates fraîches...",
      ingredients: "Pain, Tomates, Basilic, Ail",
      price: 1500,
      image: "/images/ENTREE2.jpeg",
      category: "ENTREE",
    },
    // Ajoutez d'autres plats ici
  ]);

  const [newCategory, setNewCategory] = useState("");
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: 0,
    image: "",
    category: "",
  });

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([
        ...categories,
        { id: categories.length + 1, name: newCategory, color: "bg-gray-600" },
      ]);
      setNewCategory("");
    }
  };

  const handleAddDish = () => {
    if (
      newDish.name.trim() !== "" &&
      newDish.description.trim() !== "" &&
      newDish.ingredients.trim() !== "" &&
      newDish.price > 0 &&
      newDish.image.trim() !== "" &&
      newDish.category.trim() !== ""
    ) {
      setDishes([
        ...dishes,
        {
          id: dishes.length + 1,
          ...newDish,
        },
      ]);
      setNewDish({
        name: "",
        description: "",
        ingredients: "",
        price: 0,
        image: "",
        category: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Panneau d'administration</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Gestion des catégories</h2>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Nouvelle catégorie"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddCategory}
            className="p-2 bg-amber-800 text-white rounded hover:bg-amber-900"
          >
            Ajouter
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} text-white p-4 rounded-lg text-center`}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Gestion des plats</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nom du plat"
              value={newDish.name}
              onChange={(e) =>
                setNewDish({ ...newDish, name: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={newDish.description}
              onChange={(e) =>
                setNewDish({ ...newDish, description: e.target.value })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Ingrédients"
              value={newDish.ingredients}
              onChange={(e) =>
                setNewDish({ ...newDish, ingredients: e.target.value })
              }
              className="p-2 border rounded"
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Prix"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: Number(e.target.value) })
              }
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="URL de l'image"
              value={newDish.image}
              onChange={(e) =>
                setNewDish({ ...newDish, image: e.target.value })
              }
              className="p-2 border rounded"
            />
            <select
              value={newDish.category}
              onChange={(e) =>
                setNewDish({ ...newDish, category: e.target.value })
              }
              className="p-2 border rounded"
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleAddDish}
              className="p-2 bg-amber-800 text-white rounded hover:bg-amber-900"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;