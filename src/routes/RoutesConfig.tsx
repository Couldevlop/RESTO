import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import WelcomeScreen from "../components/WelcomeScreen";
import RegistrationChoice from "../components/RegistrationChoice";
import RegistrationForm from "../components/RegistrationForm";
import Categories from "../components/Categories";
import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

const RoutesConfig: React.FC = () => {
  const navigate = useNavigate(); // Hook pour la navigation programmatique

  return (
    <Routes>
      {/* Route pour l'écran de bienvenue */}
      <Route
        path="/"
        element={<WelcomeScreen onComplete={() => navigate("/choice")} />}
      />

      {/* Route pour choisir le rôle */}
      <Route path="/choice" element={<RegistrationChoice />} />

      {/* Route pour le formulaire d'enregistrement (client) */}
      <Route
        path="/registration"
        element={
          <RegistrationForm
            onNavigateToCategories={() => navigate("/categories")}
          />
        }
      />

      {/* Route pour la page des catégories */}
      <Route path="/categories" element={<Categories />} />

      {/* Route pour la page de connexion Admin */}
      <Route
        path="/admin-login"
        element={<AdminLogin onLogin={() => navigate("/admin-dashboard")} />}
      />

      {/* Route pour le tableau de bord Admin */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesConfig;
