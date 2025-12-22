
import React from 'react';

// Tab types used for the Linkora Studio configuration UI
export enum TabType {
  PROFILE = 'PROFILE',
  CART = 'CART',
  STORE = 'STORE'
}

// Navigation screens for the SaaS app preview simulator
export enum NextScreen {
  HOME = 'HOME',
  CATEGORIES = 'CATEGORIES',
  OFFERS = 'OFFERS',
  CART = 'CART',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE'
}

// Layout styles for product cards in the app simulator
export enum ProductCardStyle {
  GRID = 'GRID',
  LIST = 'LIST',
  ELEGANT = 'ELEGANT',
  GLASS = 'GLASS'
}

// Navigation bar styles for the app simulator
export enum NavigationBarStyle {
  CLASSIC = 'CLASSIC',
  FLOATING = 'FLOATING',
  GLASS = 'GLASS',
  MINIMAL = 'MINIMAL'
}

// Header styles for the app simulator
export enum HeaderStyle {
  CLASSIC = 'CLASSIC',
  MODERN = 'MODERN',
  MINIMAL = 'MINIMAL',
  BOLD = 'BOLD'
}

// Supported payment method options
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
  LARGE = '2rem'
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
export interface Product {
  id: string;
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
export interface Collection {
  id: string;
  name: string;
  products: Product[];
}

// User account structure for the Auth system
export interface User {
  id: string;
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
