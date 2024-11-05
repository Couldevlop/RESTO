import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegistrationForm from "./components/RegistrationForm";
import Categories from "./components/Categories";
import DishList from "./components/DishList";
import OrderOptionsModal from "./components/OrderOptionsModal";

const App = () => {
  const [step, setStep] = useState("welcome"); // état pour gérer la navigation
  const [selectedCategory, setSelectedCategory] = useState(null); // pour stocker la catégorie sélectionnée
  const [selectedDish, setSelectedDish] = useState(null); // pour stocker le plat sélectionné
  const [commandCount, setCommandCount] = useState(0); // pour gérer le nombre de commandes

  const handleDishSelect = (dish) => {
    setSelectedDish(dish);
    setStep("orderOptions");
  };

  const handleOrderConfirm = () => {
    setCommandCount(commandCount + 1);
    setSelectedDish(null); // réinitialiser le plat sélectionné après la commande
    setStep("dishes"); // revenir à la liste des plats après confirmation
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeScreen onComplete={() => setStep("registration")} />;

      case "registration":
        return (
          <RegistrationForm
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
          <>
            <DishList
              category={selectedCategory}
              onDishSelect={handleDishSelect}
              onBack={() => setStep("categories")}
              commandCount={commandCount}
            />
            <OrderOptionsModal onClose={handleOrderConfirm} />
          </>
        );

      default:
        return <div>Page non trouvée</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default App;
