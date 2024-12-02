import React, { useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";

// Types
interface OrderItem {
  id: number;
  name: string;
  image: string;
  orderType: string;
  price: number; // Le prix de l'article
  quantity: number;
}

interface Order {
  id: number;
  tableNumber: string;
  items: OrderItem[];
  status: "En attente" | "En préparation" | "Prêt" | "Servi";
  timestamp: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [filterStatus, setFilterStatus] = useState<Order["status"] | "all">("all");
  const [totalServed, setTotalServed] = useState<number>(0); // Total des commandes servies

  // Chargement des commandes depuis le backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/resto/api/orders");
        if (!response.ok) throw new Error("Erreur au chargement des commandes");
        const data: Order[] = await response.json();
        setOrders(data);
        calculateInitialTotal(data); // Calcule le total initial à partir des commandes chargées
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  // Calculer le total des commandes servies initialement
  const calculateInitialTotal = (orders: Order[]) => {
    const total = orders.reduce((acc, order) => {
      if (order.status === "Servi") {
        return acc + order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      return acc;
    }, 0);
    setTotalServed(total);
  };

  // Gestionnaire de mise à jour du statut
  const handleUpdateStatus = async (orderId: number, newStatus: Order["status"]) => {
    try {
      const response = await fetch(`http://localhost:4000/resto/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error("Erreur lors de la mise à jour du statut");

      // Mettez à jour les commandes localement
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === orderId) {
            const updatedOrder = { ...order, status: newStatus };

            // Si le statut devient "Servi", mettez à jour le total
            if (newStatus === "Servi") {
              const orderTotal = updatedOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
              setTotalServed((prevTotal) => prevTotal + orderTotal); // Ajouter le total de cette commande
            } else {
              // Si le statut n'est plus "Servi", il faut le soustraire du total
              if (order.status === "Servi") {
                const orderTotal = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotalServed((prevTotal) => prevTotal - orderTotal);
              }
            }

            return updatedOrder;
          }
          return order;
        })
      );

      // Fermer le modal après mise à jour
      setSelectedOrder(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer une commande
  const handleDeleteOrder = async (orderId: number) => {
    try {
      const response = await fetch(`http://localhost:4000/resto/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression de la commande");
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrer les commandes par statut
  const filteredOrders = orders.filter((order) =>
    filterStatus === "all" ? true : order.status === filterStatus
  );

  // Trier les commandes par timestamp (plus récent en premier)
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-amber-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === "categories" ? "bg-amber-900" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              Gestion Menu
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-amber-900" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Commandes
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "categories" ? (
          <AdminPanel />
        ) : (
          <div className="space-y-6">
            {/* Résumé des ventes */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Résumé des ventes</h2>
              <p className="text-2xl text-amber-800">Total Servi: {totalServed.toLocaleString()} CFA</p>
            </div>

            {/* Filtres */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as Order["status"] | "all")}
                className="p-2 border rounded"
              >
                <option value="all">Tous les statuts</option>
                <option value="En attente">En attente</option>
                <option value="En préparation">En préparation</option>
                <option value="Prêt">Prêt</option>
                <option value="Servi">Servi</option>
              </select>
            </div>

            {/* Liste des commandes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold">Table #{order.tableNumber}</h3>
                      <p className="text-sm text-gray-500">{new Date(order.timestamp).toLocaleString()}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === "En attente"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "En préparation"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Prêt"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <p>{order.items.length} article(s)</p>
                    <p className="font-semibold text-amber-800">
                      {order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} CFA
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal des détails de commande */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Détails de la commande</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Table #{selectedOrder.tableNumber}</p>
              <p className="text-sm text-gray-500">{new Date(selectedOrder.timestamp).toLocaleString()}</p>
            </div>
            <div className="space-y-4 mb-6">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Type: {item.orderType}</p>
                    <p className="text-gray-600">Quantité: {item.quantity}</p>
                    <p className="text-amber-800">{item.price * item.quantity} CFA</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <select
                value={selectedOrder.status}
                onChange={(e) => handleUpdateStatus(selectedOrder.id, e.target.value as Order["status"])}
                className="p-2 border rounded"
              >
                <option value="En attente">En attente</option>
                <option value="En préparation">En préparation</option>
                <option value="Prêt">Prêt</option>
                <option value="Servi">Servi</option>
              </select>
              <button onClick={() => handleDeleteOrder(selectedOrder.id)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Supprimer la commande
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
