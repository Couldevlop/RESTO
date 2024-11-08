import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegistrationForm from "./components/RegistrationForm";
import Categories from "./components/Categories";
import DishList from "./components/DishList";
import OrderOptionsModal from "./components/OrderOptionsModal";
import AdminPanel from "./components/AdminPanel";

const App = () => {
  const [step, setStep] = useState("welcome"); // état pour gérer la navigation
  const [selectedCategory, setSelectedCategory] = useState(null); // pour stocker la catégorie sélectionnée
  const [selectedDish, setSelectedDish] = useState(null); // pour stocker le plat sélectionné
  const [commandCount, setCommandCount] = useState(0); // pour gérer le nombre de commandes
  const [isAdmin, setIsAdmin] = useState(false); // pour gérer l'accès à l'admin

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
    setStep("orderOptions");
  };

  const handleOrderConfirm = (order) => {
    setCommandCount(commandCount + 1);
    setSelectedDish(null); // réinitialiser le plat sélectionné après la commande
    setStep("dishes"); // revenir à la liste des plats après confirmation
  };

  const handleRegistration = (phone, email, tableNumber) => {
    // Vérifier si c'est un administrateur
    if (phone === "00" && email === "admin@admin.com" && tableNumber === 0) {
      setIsAdmin(true);
      setStep("admin");
    } else {
      setStep("categories");
    }
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeScreen onComplete={() => setStep("registration")} />;

      case "registration":
        return (
          <RegistrationForm
            onRegistration={handleRegistration}
            onNavigateToCategories={() => setStep("categories")}
          />
        );

      case "categories":
        return (
          <Categories
            onCategorySelect={(category) => {
              setSelectedCategory(category);
              setStep("dishes");
            }}
          />
        );
        case "admin":
        return isAdmin ? <AdminPanel /> : <div>Page non trouvée</div>;

      case "dishes":
        return (
          <DishList
            category={selectedCategory}
            onDishSelect={handleDishSelect}
            onBack={() => setStep("categories")}
            commandCount={commandCount}
          />
        );

      case "orderOptions":
        return (
          <OrderOptionsModal
            onClose={() => setStep("dishes")}
            onConfirm={handleOrderConfirm}
            selectedDish={selectedDish}
          />
        );


      default:
        return <div>Page non trouvée</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default App;