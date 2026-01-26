
import React from 'react';

// Base types
export interface BaseEntity {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Client (Admin) types
export interface Client extends BaseEntity {
  name: string;
  email: string;
  password?: string;
  apps?: App[];
}

// App types
export interface App extends BaseEntity {
  name: string;
  clientId: string;
  version: string;
  config: Record<string, any>;
  users?: AppUser[];
  collections?: Collection[];
}

// App User types
export interface AppUser extends BaseEntity {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  appId: string;
  orders?: Order[];
}

// Collection types
export interface Collection extends BaseEntity {
  name: string;
  appId: string;
  products?: Product[];
}

// Product types
export interface Product extends BaseEntity {
  name: string;
  description: string;
  price: number;
  collectionId: string;
  imageUrl?: string;
}

// Order types
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface Order extends BaseEntity {
  appUserId: string;
  appId: string;
  products: OrderItem[];
  totalPrice: number;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
}

// UI Configuration types
export enum ProductCardStyle {
  GRID = 'GRID',
  LIST = 'LIST',
  ELEGANT = 'ELEGANT',
  GLASS = 'GLASS'
}

export enum NavigationBarStyle {
  CLASSIC = 'CLASSIC',
  FLOATING = 'FLOATING',
  GLASS = 'GLASS',
  MINIMAL = 'MINIMAL'
}

export enum HeaderStyle {
  CLASSIC = 'CLASSIC',
  MODERN = 'MODERN',
  MINIMAL = 'MINIMAL',
  BOLD = 'BOLD'
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  CASH = 'CASH'
}

// Border radius options for theme customization
export enum BorderRadius {
  NONE = '0px',
  SMALL = '0.5rem',
  MEDIUM = '1rem',
  LARGE = '1.5rem',
  FULL = '9999px'
}

// Font family options for theme customization
export enum FontFamily {
  TAJAWAL = "'Tajawal', sans-serif",
  INTER = "'Inter', sans-serif",
  MONO = "'Space Mono', monospace"
}

// Configuration for a single navigation tab in the app simulator
export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  route: NextScreen;
}

// Product data structure for the inventory section
export interface InventoryProduct extends BaseEntity {
  name: string;
  description: string;
  price: string;
  image: string;
}

// Marketing offer/campaign data structure
export interface Offer {
  id: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  color: string;
}

// Collection of products for categorization
export interface InventoryCollection extends BaseEntity {
  name: string;
  products: InventoryProduct[];
}

// User account structure for the Auth system
export interface User extends BaseEntity {
  name: string;
  email: string;
  password?: string;
}

// Root configuration object for the generated SaaS application
export interface AppConfig {
  id: string;
  userId: string;
  name: string;
  icon: string;
  apiEndpoint: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    radius: BorderRadius;
    font: FontFamily;
  };
  layout: {
    card: ProductCardStyle;
    navigation: NavigationBarStyle;
    header: HeaderStyle;
  };
  payment: {
    methods: PaymentMethod[];
  };
  navigation: TabConfig[];
  collections: Collection[];
  offers: Offer[];
}

// Tab item definition for internal Studio sections (e.g. Inventory, Design)
export interface TabItem {
  id: string;
  label: string;
  icon: string;
  content: React.ReactNode;
}

// Section container definition for Linkora Studio UI organization
export interface SectionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tabs: TabItem[];
}

// Next screen navigation for app flow
export enum NextScreen {
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  OFFERS = 'OFFERS',
  CART = 'CART',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}
