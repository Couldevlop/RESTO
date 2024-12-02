// @ts-nocheck
import React, { createContext, useContext, useState } from "react";

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      {
        id: order.id, // On suppose que l'API renvoie l'ID de la commande
        tableNumber: order.tableNumber,
        items: order.items,
        status: order.status, // Récupère le statut de la commande
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.id !== orderId)
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrderStatus, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
