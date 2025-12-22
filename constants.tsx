
import React from 'react';
import { LayoutGrid, List, Sparkles, Box, User, ShoppingCart, Store, CreditCard, Layout, Smartphone, Layers, Type, Banknote, Landmark, Square, Circle, Home, ShoppingBag, Tag, Package } from 'lucide-react';
import { NextScreen, TabConfig, ProductCardStyle, NavigationBarStyle, HeaderStyle, PaymentMethod, BorderRadius, FontFamily, TabType } from './types';

export const TAB_CONFIG: Record<TabType, { label: string; icon: React.ReactNode; color: string; bgColor: string; borderColor: string }> = {
  [TabType.PROFILE]: {
    label: 'Profile',
    icon: <User className="w-4 h-4" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-600'
  },
  [TabType.CART]: {
    label: 'Cart',
    icon: <ShoppingCart className="w-4 h-4" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-600'
  },
  [TabType.STORE]: {
    label: 'Store',
    icon: <Store className="w-4 h-4" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-600'
  }
};

export const ECOM_TABS: TabConfig[] = [
  { id: "t_home", label: "Home", icon: "Home", route: NextScreen.HOME },
  { id: "t_store", label: "Store", icon: "Store", route: NextScreen.CATEGORIES },
  { id: "t_offers", label: "Offers", icon: "Tag", route: NextScreen.OFFERS },
  { id: "t_cart", label: "Cart", icon: "ShoppingCart", route: NextScreen.CART },
  { id: "t_orders", label: "My Orders", icon: "Package", route: NextScreen.ORDERS }
];

export const RADIUS_OPTIONS = [
  { id: BorderRadius.NONE, name: "Sharp", icon: <Square className="w-4 h-4" /> },
  { id: BorderRadius.SMALL, name: "Soft", icon: <Layers className="w-4 h-4" /> },
  { id: BorderRadius.MEDIUM, name: "Smooth", icon: <Layers className="w-4 h-4" /> },
  { id: BorderRadius.LARGE, name: "Extra", icon: <Circle className="w-4 h-4" /> }
];

export const FONT_OPTIONS = [
  { id: FontFamily.TAJAWAL, name: "Tajawal (Modern Ar/En)" },
  { id: FontFamily.INTER, name: "Inter (Clean Sans)" },
  { id: FontFamily.MONO, name: "Space Mono (Tech)" }
];

export const PRODUCT_CARD_OPTIONS = [
  { id: ProductCardStyle.GRID, name: "Classic Grid", icon: <LayoutGrid className="w-4 h-4" /> },
  { id: ProductCardStyle.LIST, name: "Modern List", icon: <List className="w-4 h-4" /> },
  { id: ProductCardStyle.ELEGANT, name: "Elegant Pro", icon: <Sparkles className="w-4 h-4" /> },
  { id: ProductCardStyle.GLASS, name: "Glassmorphism", icon: <Box className="w-4 h-4" /> }
];

export const NAV_BAR_OPTIONS = [
  { id: NavigationBarStyle.CLASSIC, name: "Classic Solid", icon: <Smartphone className="w-4 h-4" /> },
  { id: NavigationBarStyle.FLOATING, name: "Modern Floating", icon: <Layers className="w-4 h-4" /> },
  { id: NavigationBarStyle.GLASS, name: "Glass Blur", icon: <Box className="w-4 h-4" /> },
  { id: NavigationBarStyle.MINIMAL, name: "Minimalist", icon: <Layout className="w-4 h-4" /> }
];

export const HEADER_OPTIONS = [
  { id: HeaderStyle.CLASSIC, name: "Solid Header", icon: <Type className="w-4 h-4" /> },
  { id: HeaderStyle.MODERN, name: "Modern Round", icon: <Layers className="w-4 h-4" /> },
  { id: HeaderStyle.MINIMAL, name: "Minimal Flat", icon: <Layout className="w-4 h-4" /> },
  { id: HeaderStyle.BOLD, name: "Bold Large", icon: <Sparkles className="w-4 h-4" /> }
];

export const PAYMENT_OPTIONS = [
  { id: PaymentMethod.STRIPE, name: "Stripe", icon: <CreditCard className="w-4 h-4" />, color: "#635BFF" },
  { id: PaymentMethod.PAYPAL, name: "PayPal", icon: <Landmark className="w-4 h-4" />, color: "#003087" },
  { id: PaymentMethod.CASH, name: "Cash", icon: <Banknote className="w-4 h-4" />, color: "#22C55E" }
];

export const ECOM_PALETTES = [
  { name: "Indigo Dream", primary: "#4f46e5", secondary: "#818cf8", container: "#f8faff" },
  { name: "Forest Green", primary: "#065f46", secondary: "#10b981", container: "#f0fdfa" },
  { name: "Sunset Orange", primary: "#c2410c", secondary: "#f97316", container: "#fffaf5" },
  { name: "Midnight Gold", primary: "#171717", secondary: "#fbbf24", container: "#fafafa" },
  { name: "Soft Lavender", primary: "#7c3aed", secondary: "#c084fc", container: "#fdfaff" },
  { name: "Ocean Blue", primary: "#0369a1", secondary: "#38bdf8", container: "#f0f9ff" },
  { name: "Teal Breeze", primary: "#0d9488", secondary: "#2dd4bf", container: "#f0fdfa" },
  { name: "Rose Quartz", primary: "#e11d48", secondary: "#fb7185", container: "#fff1f2" },
  { name: "Slate Dark", primary: "#334155", secondary: "#64748b", container: "#f8fafc" },
  { name: "Amber Glow", primary: "#d97706", secondary: "#fbbf24", container: "#fffbeb" },
  { name: "Royal Purple", primary: "#6d28d9", secondary: "#a78bfa", container: "#f5f3ff" },
  { name: "Crimson Red", primary: "#991b1b", secondary: "#ef4444", container: "#fef2f2" },
  { name: "Mint Fresh", primary: "#059669", secondary: "#34d399", container: "#ecfdf5" },
  { name: "Sky Bright", primary: "#0284c7", secondary: "#7dd3fc", container: "#f0f9ff" },
  { name: "Fuchsia Pop", primary: "#c026d3", secondary: "#e879f9", container: "#fdf4ff" },
  { name: "Coffee Bean", primary: "#451a03", secondary: "#b45309", container: "#fffbeb" },
  { name: "Silver Metal", primary: "#4b5563", secondary: "#9ca3af", container: "#f3f4f6" },
  { name: "Neon Lime", primary: "#4d7c0f", secondary: "#a3e635", container: "#f7fee7" },
  { name: "Cyber Neon", primary: "#f0abfc", secondary: "#22d3ee", container: "#0f172a" },
  { name: "Autumn Clay", primary: "#9a3412", secondary: "#fbbf24", container: "#fff7ed" },
  { name: "Cool Graphite", primary: "#1e293b", secondary: "#94a3b8", container: "#f1f5f9" },
  { name: "Electric Pink", primary: "#db2777", secondary: "#f472b6", container: "#fff1f2" },
  { name: "Emerald Sea", primary: "#047857", secondary: "#34d399", container: "#ecfdf5" },
  { name: "Burnt Sienna", primary: "#a21caf", secondary: "#f0abfc", container: "#fdf4ff" },
  { name: "Nordic Frost", primary: "#0c4a6e", secondary: "#7dd3fc", container: "#f0f9ff" },
  { name: "Shadow Purple", primary: "#4c1d95", secondary: "#a78bfa", container: "#f5f3ff" },
  { name: "Safari Sand", primary: "#713f12", secondary: "#eab308", container: "#fefce8" },
  { name: "Modern Grey", primary: "#27272a", secondary: "#71717a", container: "#fafafa" },
  { name: "Violet Flame", primary: "#7e22ce", secondary: "#c084fc", container: "#faf5ff" },
  { name: "Berry Lush", primary: "#be185d", secondary: "#f472b6", container: "#fff1f7" }
];
