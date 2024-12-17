import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchOrders, updateOrderStatus, deleteOrder } from "../api/orderApi";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  tableNumber: string;
  items: OrderItem[];
  status: string;
  timestamp: string;
}

interface OrderContextType {
  orders: Order[];
  fetchOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => Promise<void>;
  deleteOrder: (orderId: number) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateOrderStatus = async (orderId: number, status: string) => {
    await updateOrderStatus(orderId, status);
    loadOrders();
  };

  const handleDeleteOrder = async (orderId: number) => {
    await deleteOrder(orderId);
    loadOrders();
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        fetchOrders: loadOrders,
        updateOrderStatus: handleUpdateOrderStatus,
        deleteOrder: handleDeleteOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};

export{};