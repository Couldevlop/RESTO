// RegistrationChoice.tsx
import React from "react";

type RegistrationChoiceProps = {
  onSelectType: (type: "client" | "personnel") => void;
};

const RegistrationChoice = ({ onSelectType }: RegistrationChoiceProps) => {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="h-20 w-20 bg-amber-800 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-2xl font-bold text-white">
            <div className="flex items-center">
              <img src="/images/dc.jpg" alt="Panier" />
            </div>
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onSelectType("client")}
            className="p-8 bg-amber-800 text-white rounded-lg shadow-lg hover:bg-amber-900 transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">CLIENTS</h2>
            <p className="text-sm opacity-80">
              Accédez à notre menu et passez votre commande
            </p>
          </button>
          <button
            onClick={() => onSelectType("personnel")}
            className="p-8 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all"
          >
            <h2 className="text-2xl font-bold mb-2">PERSONNEL</h2>
            <p className="text-sm opacity-80">
              Accès réservé au personnel autorisé
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationChoice;
