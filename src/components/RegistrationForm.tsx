import React, { useState, FormEvent } from "react";

// Définition des types pour les props et l'état
interface RegistrationFormProps {
  onNavigateToCategories: (userInfo: UserInfo) => void;
}

interface UserInfo {
  phone: string;
  email: string;
  tableNumber: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onNavigateToCategories,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    phone: "",
    email: "",
    tableNumber: "",
  }); // <- Point-virgule ici

  // Fonction générique pour gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission du formulaire
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onNavigateToCategories(userInfo); // Transmet les informations
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6 flex flex-col justify-center">
      {/* Logo central */}
      <div className="h-20 w-20 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-8">
        <span className="text-2xl font-bold text-white">DC</span>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-2">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Téléphone"
            value={userInfo.phone}
            onChange={handleChange}
            className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-800"
            required
            aria-label="Numéro de téléphone"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-800"
            required
            aria-label="Adresse email"
          />
        </div>

        <div>
          <label htmlFor="tableNumber" className="block text-gray-700 mb-2">
            N° Table
          </label>
          <input
            id="tableNumber"
            name="tableNumber"
            type="number"
            placeholder="N° table"
            value={userInfo.tableNumber}
            onChange={handleChange}
            className="w-full p-3 rounded border focus:ring-2 focus:ring-amber-800"
            required
            aria-label="Numéro de table"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-amber-800 text-white font-bold rounded hover:bg-amber-900 transition-all duration-300"
        >
          Valider
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
