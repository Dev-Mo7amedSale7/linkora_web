const API_BASE_URL = 'http://127.0.0.1:5001/api';

// Client Auth
export const clientSignup = async (name: string, email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/clients/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return handleResponse(response);
};

export const clientLogin = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/clients/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(response);
};

// Apps
export const createApp = async (clientId: string, name: string, version = '1.0', config = {}) => {
  const response = await fetch(`${API_BASE_URL}/clients/${clientId}/apps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, version, config })
  });
  return handleResponse(response);
};

export const getApps = async (clientId: string) => {
  const response = await fetch(`${API_BASE_URL}/clients/${clientId}/apps`);
  return handleResponse(response);
};

export const updateApp = async (appId: string, updates: { name?: string; version?: string; config?: any }) => {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return handleResponse(response);
};

// App Users
export const createAppUser = async (appId: string, name: string, email: string, password: string, role = 'user') => {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role })
  });
  return handleResponse(response);
};

export const getAppUsers = async (appId: string) => {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}/users`);
  return handleResponse(response);
};

// Collections
export const createCollection = async (appId: string, name: string) => {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}/collections`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return handleResponse(response);
};

export const getCollections = async (appId: string) => {
  const response = await fetch(`${API_BASE_URL}/apps/${appId}/collections`);
  return handleResponse(response);
};

// Products
export const createProduct = async (collectionId: string, name: string, description = '', price = 0) => {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, price })
  });
  return handleResponse(response);
};

export const getProducts = async (collectionId: string) => {
  const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/products`);
  return handleResponse(response);
};

// Orders
export const createOrder = async (userId: string, appId: string, products: Array<{ productId: string; quantity: number }>) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, appId, products })
  });
  return handleResponse(response);
};

export const getUserOrders = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
  return handleResponse(response);
};

// Helper function to handle responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data.error || 'Something went wrong';
    throw new Error(error);
  }
  return data;
};
