/*import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderContext";
import RoutesConfig from "./routes/RoutesConfig";

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
type Category = { id: number; name: string };
type Dish = {
  id: number;
  name: string;
  description: string;
  ingredients: string;
  image: string;
  price: number;
};
type UserInfo = { name: string; email: string; tableNumber: string };
type OrderDetails = { option: string; onSiteCount: number; toGoCount: number };

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

  // Handle order confirmation
  const handleOrderConfirm = (orderDetails: OrderDetails) => {
    setCommandCount(commandCount + 1);
    setSelectedDish(null);
    setStep("dishes");
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
            categoryId={selectedCategory ? selectedCategory.id : null}
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
            onConfirm={handleOrderConfirm}
          />
        );
      default:
        return <div>Page non trouvée</div>;
    }
  };

  return (
    <OrderProvider>
      <Router>
        <RoutesConfig />
      </Router>
    </OrderProvider>
  );
};

export default App;*/


import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { OrderProvider } from "./contexts/OrderContext";
import RoutesConfig from "./routes/RoutesConfig";

const App = () => {
  return (
    <OrderProvider>
      <Router>
        <RoutesConfig />
      </Router>
    </OrderProvider>
  );
};

export default App;

