import React, { useState, FormEvent } from "react";

// Typage des props pour AdminLogin
interface AdminLoginProps {
  onLogin: () => void; // Fonction appelée après une connexion réussie
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  // État pour les identifiants
  const [credentials, setCredentials] = useState<{
    login: string;
    password: string;
  }>({
    login: "",
    password: "",
  });

  // État pour gérer les erreurs
  const [error, setError] = useState<string>("");

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validation des identifiants
    if (credentials.login === "ADMIN" && credentials.password === "@ADMIN") {
      setError(""); // Efface les erreurs précédentes
      onLogin(); // Redirige après une connexion réussie
    } else {
      setError("Login ou mot de passe invalide."); // Définit une erreur si les identifiants sont incorrects
    }
  };

  // Fonction générique pour mettre à jour les champs de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setError(""); // Supprime l'erreur lorsque l'utilisateur modifie les champs
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Connexion Administration
        </h2>

        {/* Affichage des erreurs */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Formulaire de connexion */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Login */}
          <div>
            <label htmlFor="login" className="block text-gray-700 mb-2">
              Login
            </label>
            <input
              id="login"
              name="login"
              type="text"
              value={credentials.login}
              onChange={handleChange}
              placeholder="Entrez votre login"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-amber-800"
              required
              aria-label="Login Admin"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              className="w-full p-3 border rounded focus:ring-2 focus:ring-amber-800"
              required
              aria-label="Mot de passe Admin"
            />
          </div>

          {/* Bouton Se connecter */}
          <button
            type="submit"
            className="w-full p-3 bg-amber-800 text-white font-bold rounded hover:bg-amber-900 transition-all duration-300"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
