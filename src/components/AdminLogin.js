import React, { useState } from "react";

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.login === "ADMIN" && credentials.password === "@ADMIN") {
      onLogin();
    } else {
      setError("Identifiants invalides");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Connexion Administration
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Login</label>
            <input
              type="text"
              value={credentials.login}
              onChange={(e) =>
                setCredentials({ ...credentials, login: e.target.value })
              }
              className="w-full p-3 border rounded focus:ring-2 focus:ring-amber-800"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border rounded focus:ring-2 focus:ring-amber-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-amber-800 text-white rounded hover:bg-amber-900"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminLogin;
