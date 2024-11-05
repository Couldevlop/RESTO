import React from "react";

const RegistrationForm = ({ onNavigateToCategories }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigateToCategories();
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="h-20 w-20 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="text-2xl font-bold text-white">DC</span>
      </div>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        <input
          type="tel"
          placeholder="Téléphone"
          className="w-full p-3 rounded border"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border"
          required
        />
        <input
          type="number"
          placeholder="N° table"
          className="w-full p-3 rounded border"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-amber-800 text-white rounded hover:bg-amber-900"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
