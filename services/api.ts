import { App, AppUser, Collection, Product, Order, OrderItem } from '../types';

const API_BASE_URL = 'http://localhost:5001/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }
  return data;
};

// Client API
export const clientApi = {
  // Get current client
  getCurrent: async (): Promise<App> => {
    const response = await fetch(`${API_BASE_URL}/clients/me`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },
};

// App API
export const appApi = {
  // Create a new app
  create: async (clientId: string, name: string, version = '1.0', config = {}): Promise<App> => {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}/apps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, version, config })
    });
    return handleResponse(response);
  },

  // Get all apps for a client
  getAll: async (clientId: string): Promise<App[]> => {
    const response = await fetch(`${API_BASE_URL}/clients/${clientId}/apps`);
    return handleResponse(response);
  },

  // Update an app
  update: async (appId: string, updates: Partial<App>): Promise<App> => {
    const response = await fetch(`${API_BASE_URL}/apps/${appId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return handleResponse(response);
  },
};

// App User API
export const userApi = {
  // Create a new app user
  create: async (appId: string, userData: Omit<AppUser, 'id' | 'appId' | 'orders'>): Promise<AppUser> => {
    const response = await fetch(`${API_BASE_URL}/apps/${appId}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(response);
  },

  // Get all users for an app
  getAll: async (appId: string): Promise<AppUser[]> => {
    const response = await fetch(`${API_BASE_URL}/apps/${appId}/users`);
    return handleResponse(response);
  },
};

// Collection API
export const collectionApi = {
  // Create a new collection
  create: async (appId: string, name: string): Promise<Collection> => {
    const response = await fetch(`${API_BASE_URL}/apps/${appId}/collections`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    return handleResponse(response);
  },

  // Get all collections for an app
  getAll: async (appId: string): Promise<Collection[]> => {
    const response = await fetch(`${API_BASE_URL}/apps/${appId}/collections`);
    return handleResponse(response);
  },
};

// Product API
export const productApi = {
  // Create a new product
  create: async (collectionId: string, productData: Omit<Product, 'id' | 'collectionId'>): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return handleResponse(response);
  },

  // Get all products in a collection
  getByCollection: async (collectionId: string): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/collections/${collectionId}/products`);
    return handleResponse(response);
  },
};

// Order API
export const orderApi = {
  // Create a new order
  create: async (orderData: {
    appUserId: string;
    appId: string;
    products: Array<{ productId: string; quantity: number }>;
  }): Promise<Order> => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: orderData.appUserId,
        appId: orderData.appId,
        products: orderData.products
      })
    });
    return handleResponse(response);
  },

  // Get all orders for a user
  getByUser: async (userId: string): Promise<Order[]> => {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/orders`);
    return handleResponse(response);
  },
};
