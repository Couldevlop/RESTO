import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import WelcomeScreen from "../components/WelcomeScreen";
import RegistrationForm from "../components/RegistrationForm";
import Categories from "../components/Categories";
import DishList from "../components/DishList";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

interface Category {
  id: number;
  name: string;
}

const RoutesConfig = () => {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen onComplete={() => navigate("/categories")} />} />
      <Route path="/admin-login" element={<AdminLogin onLogin={() => {}} />} />
      <Route path="/registration" element={<RegistrationForm onNavigateToCategories={() => {}} />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/dishes/:categoryId" element={<DishList />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesConfig;