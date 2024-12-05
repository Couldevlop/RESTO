import React, { useEffect, useState } from "react";

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    ingredients: "",
    price: 0,
    image: "",
    category: "",
  });

  useEffect(() => {
    const fetchCategoriesAndDishes = async () => {
      try {
        const categoriesResponse = await fetch("http://localhost:4000/resto/api/categories");
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const dishesResponse = await fetch("http://localhost:4000/resto/api/dishes");
        const dishesData = await dishesResponse.json();
        setDishes(dishesData);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      }
    };

    fetchCategoriesAndDishes();
  }, []);

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        const response = await fetch("http://localhost:4000/resto/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de la catégorie");
        const addedCategory = await response.json();
        setCategories([...categories, addedCategory]);
        setNewCategory("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddDish = async () => {
    if (
      newDish.name.trim() !== "" &&
      newDish.description.trim() !== "" &&
      newDish.ingredients.trim() !== "" &&
      newDish.price > 0 &&
      newDish.image.trim() !== "" &&
      newDish.category.trim() !== ""
    ) {
      try {
        const response = await fetch("http://localhost:4000/resto/api/dishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newDish),
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout du plat");
        const addedDish = await response.json();
        setDishes([...dishes, addedDish]);
        setNewDish({
          name: "",
          description: "",
          ingredients: "",
          price: 0,
          image: "",
          category: "",
        });
      } catch (error) {
        console.error(error);
      }
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
              key={category._id}
              className="bg-gray-600 text-white p-4 rounded-lg text-center"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Gestion des plats</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Nom du plat"
              value={newDish.name}
              onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
              className="p-2 border rounded w-full"
            />
            <textarea
              placeholder="Description"
              value={newDish.description}
              onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
              className="p-2 border rounded w-full h-32 resize-y"
            />
            <textarea
              placeholder="Ingrédients"
              value={newDish.ingredients}
              onChange={(e) => setNewDish({ ...newDish, ingredients: e.target.value })}
              className="p-2 border rounded w-full h-32 resize-y"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Montant (€)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newDish.price}
                  onChange={(e) => setNewDish({ ...newDish, price: Number(e.target.value) })}
                  className="p-2 border rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">Catégorie</label>
                <select
                  value={newDish.category}
                  onChange={(e) => setNewDish({ ...newDish, category: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium">URL de l'image</label>
                <input
                  type="text"
                  placeholder="URL de l'image"
                  value={newDish.image}
                  onChange={(e) => setNewDish({ ...newDish, image: e.target.value })}
                  className="p-2 border rounded"
                />
              </div>
            </div>
            <button
              onClick={handleAddDish}
              className="p-2 bg-amber-800 text-white rounded hover:bg-amber-900 w-full"
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