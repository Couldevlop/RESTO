const API_BASE_URL = "http://localhost:4000/resto/api";

export const fetchOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) throw new Error("Erreur lors du chargement des commandes.");
  return await response.json();
};

export const updateOrderStatus = async (orderId: number, status: string) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Erreur lors de la mise à jour.");
  return await response.json();
};

export const deleteOrder = async (orderId: number) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erreur lors de la suppression.");
  return response.ok;
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) throw new Error("Erreur lors du chargement des catégories.");
  return await response.json();
};

export const fetchDishesByCategory = async (categoryId: number) => {
  const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/dishes`);
  if (!response.ok) throw new Error("Erreur lors du chargement des plats.");
  return await response.json();
};


export {}