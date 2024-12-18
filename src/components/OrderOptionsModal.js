import React, { useState } from "react";
import { useOrders } from "../contexts/OrderContext";

// Types pour les props
interface Dish {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

interface UserInfo {
  tableNumber: string;
}

interface OrderOptionsModalProps {
  onClose: () => void;
  onConfirm: (orderDetails: {
    option: string;
    onSiteCount: number;
    toGoCount: number;
  }) => void;
  selectedDish: Dish | null;
  userInfo: UserInfo | null;
}

const OrderOptionsModal: React.FC<OrderOptionsModalProps> = ({
  onClose,
  onConfirm,
  selectedDish,
  userInfo,
}) => {
  const [option, setOption] = useState("");
  const [onSiteCount, setOnSiteCount] = useState(0);
  const [toGoCount, setToGoCount] = useState(0);
  const { addOrder } = useOrders(); // Assurez-vous que `addOrder` est une fonction de votre contexte
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirm = async () => {
    // Calculer la quantité totale en fonction de l'option
    const quantity =
      option === "Surplace" ? onSiteCount :
      option === "Emporter" ? toGoCount :
      option === "Surplace/Emporter" ? onSiteCount + toGoCount : 0;

    setLoading(true);
    setError(null);

    try {
      // Étape 1 : Enregistrer l'item
      const itemResponse = await fetch(
        "http://localhost:4000/resto/api/orderitems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedDish?.id,
            name: selectedDish?.name,
            image: selectedDish?.image,
            orderType: option,
            price: selectedDish?.price,
            quantity: quantity, // Utilise la quantité calculée
          }),
        }
      );

      if (!itemResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement de l'item.");
      }

      const itemData = await itemResponse.json();

      // Étape 2 : Créer l'objet de commande
      const order = {
        tableNumber: userInfo?.tableNumber,
        items: [
          {
            id: itemData.id, // Utilisez l'ID de l'item enregistré
            name: selectedDish?.name,
            image: selectedDish?.image,
            orderType: option, // Sur place, Emporter, etc.
            price: selectedDish?.price,
            quantity: quantity,
          },
        ],
        status: "EN_ATTENTE", // Statut par défaut
      };

      // Étape 3 : Enregistrer la commande
      const orderResponse = await fetch(
        "http://localhost:4000/resto/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement de la commande.");
      }

      const orderData = await orderResponse.json();

      // Ajouter la commande au contexte
      addOrder(orderData);

      // Appeler les callbacks
      onConfirm({ option, onSiteCount, toGoCount });
      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        {selectedDish && (
          <div className="mb-4">
            <img
              src={selectedDish.image}
              alt={selectedDish.name}
              className="w-full h-40 object-cover rounded"
            />
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4">Options de consommation</h2>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Emporter"
            checked={option === "Emporter"}
            onChange={() => setOption("Emporter")}
          />
          <span>Emporter</span>
        </label>
        {option === "Emporter" && (
          <div className="mt-2">
            <input
              type="number"
              placeholder="Quantité (Emporter)"
              value={toGoCount}
              onChange={(e) => setToGoCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Surplace"
            checked={option === "Surplace"}
            onChange={() => setOption("Surplace")}
          />
          <span>Sur place</span>
        </label>
        {option === "Surplace" && (
          <div className="mt-2">
            <input
              type="number"
              placeholder="Quantité (Sur place)"
              value={onSiteCount}
              onChange={(e) => setOnSiteCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        )}

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="Surplace/Emporter"
            checked={option === "Surplace/Emporter"}
            onChange={() => setOption("Surplace/Emporter")}
          />
          <span>Sur place/Emporter</span>
        </label>

        {option === "Surplace/Emporter" && (
          <div className="mt-4 space-y-2">
            <input
              type="number"
              placeholder="Sur place (quantité)"
              value={onSiteCount}
              onChange={(e) => setOnSiteCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
            />
            <input
              type="number"
              placeholder="Emporter (quantité)"
              value={toGoCount}
              onChange={(e) => setToGoCount(Number(e.target.value))}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        )}

        {loading && <p>Traitement de votre commande...</p>}
        {error && <p className="text-red-600">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="mt-4 w-full p-2 bg-amber-800 text-white rounded hover:bg-amber-900"
        >
          OK
        </button>
        <button
          onClick={onClose}
          className="mt-2 w-full p-2 text-gray-600 rounded hover:bg-gray-100"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default OrderOptionsModal;
