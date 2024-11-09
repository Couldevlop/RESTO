import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import RegistrationChoice from "./components/RegistrationChoice";
import RegistrationForm from "./components/RegistrationForm";
import Categories from "./components/Categories";
import DishList from "./components/DishList";
import OrderOptionsModal from "./components/OrderOptionsModal";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// Types
type Step =
  | "welcome"
  | "choice"
  | "registration"
  | "adminLogin"
  | "adminDashboard"
  | "categories"
  | "dishes"
  | "orderOptions";

interface Category {
  id: number;
  name: string;
}

interface Dish {
  id: number;
  name: string;
  price: number;
}

interface Order {
  dishId: number;
  quantity: number;
}

// Main App Component
const App = () => {
  const [step, setStep] = useState<Step>("welcome");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [commandCount, setCommandCount] = useState(0);

  const handleRegistrationType = (type: "client" | "personnel") => {
    setStep(type === "client" ? "registration" : "adminLogin");
  };

  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeScreen onComplete={() => setStep("choice")} />;
      case "choice":
        return <RegistrationChoice onSelectType={handleRegistrationType} />;
      case "registration":
        return (
          <RegistrationForm
            onNavigateToCategories={() => setStep("categories")}
          />
        );
      case "adminLogin":
        return <AdminLogin onLogin={() => setStep("adminDashboard")} />;
      case "adminDashboard":
        return <AdminDashboard />;
      case "categories":
        return (
          <Categories
            onCategorySelect={(category: Category) => {
              setSelectedCategory(category);
              setStep("dishes");
            }}
          />
        );
      case "dishes":
        return (
          <DishList
            category={selectedCategory}
            onDishSelect={(dish: Dish) => {
              setSelectedDish(dish);
              setStep("orderOptions");
            }}
            onBack={() => setStep("categories")}
            commandCount={commandCount}
          />
        );
      case "orderOptions":
        return (
          <OrderOptionsModal
            selectedDish={selectedDish}
            onClose={() => setStep("dishes")}
            onConfirm={(order: Order) => {
              setCommandCount(commandCount + 1);
              setSelectedDish(null);
              setStep("dishes");
            }}
          />
        );
      default:
        return <div>Page non trouvée</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default App;
