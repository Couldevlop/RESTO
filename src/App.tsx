import React, { useState } from "react";
import { OrderProvider } from "./contexts/OrderContext";
import WelcomeScreen from "./components/WelcomeScreen";
import RegistrationChoice from "./components/RegistrationChoice";
import RegistrationForm from "./components/RegistrationForm";
import Categories from "./components/Categories";
import DishList from "./components/DishList";
import OrderOptionsModal from "./components/OrderOptionsModal";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// Define types
type Step =
  | "welcome"
  | "choice"
  | "registration"
  | "adminLogin"
  | "adminDashboard"
  | "categories"
  | "dishes"
  | "orderOptions";

type RegistrationType = "client" | "personnel";
type Category = { id: number; name: string }; // Define this based on your category structure
type Dish = { id: number; name: string; price: number }; // Define this based on your dish structure
type UserInfo = { name: string; email: string }; // Define based on user data structure
type OrderDetails = { dishId: number; quantity: number }; // Define as per your order structure

const App = () => {
  const [step, setStep] = useState<Step>("welcome");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [commandCount, setCommandCount] = useState(0);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // Handle registration type
  const handleRegistrationType = (type: RegistrationType) => {
    setStep(type === "client" ? "registration" : "adminLogin");
  };

  // Handle registration info
  const handleRegistration = (info: UserInfo) => {
    setUserInfo(info);
    setStep("categories");
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case "welcome":
        return <WelcomeScreen onComplete={() => setStep("choice")} />;
      case "choice":
        return <RegistrationChoice onSelectType={handleRegistrationType} />;
      case "registration":
        return <RegistrationForm onNavigateToCategories={handleRegistration} />;
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
            userInfo={userInfo}
            onClose={() => setStep("dishes")}
            onConfirm={(orderDetails: OrderDetails) => {
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

  return (
    <OrderProvider>
      <div>{renderStep()}</div>
    </OrderProvider>
  );
};

export default App;
