
import React, { useState, useEffect } from 'react';
import { AppConfig, NextScreen, ProductCardStyle, NavigationBarStyle, HeaderStyle, Product, Offer } from '../types';
import { IconRenderer } from './IconRenderer';
import { 
  Menu, ShoppingBag, Search, ChevronRight, Heart, 
  User, ShoppingCart, LayoutGrid, CheckCircle2,
  Tag, Package, Wallet, Settings,
  ArrowLeft, Gift, Trash2, Sparkles, Smartphone,
  Wifi, Signal, Battery, Circle, Filter, LogOut, Clock, MapPin, CreditCard,
  Plus
} from 'lucide-react';
import { PAYMENT_OPTIONS } from '../constants';

interface SaaSSectionProps {
  config: AppConfig;
  forcedScreen?: NextScreen;
}

export const SaaSSection: React.FC<SaaSSectionProps> = ({ config, forcedScreen }) => {
  const [currentScreen, setCurrentScreen] = useState<NextScreen>(NextScreen.HOME);
  const [cartCount, setCartCount] = useState(0);
  const theme = config.theme;

  useEffect(() => {
    if (forcedScreen) setCurrentScreen(forcedScreen);
  }, [forcedScreen]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  const renderHeader = () => {
    const style = config.layout.header;
    const cartIcon = (
      <div className="relative cursor-pointer" onClick={() => setCurrentScreen(NextScreen.CART)}>
        <ShoppingCart className="w-5 h-5 text-slate-800" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose-500 text-white text-[8px] font-black rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </div>
    );
    
    switch (style) {
      case HeaderStyle.MODERN:
        return (
          <header className="px-6 py-4 flex items-center justify-between animate-fadeIn">
             <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg"><Menu className="w-5 h-5" /></div>
             <div className="flex flex-col items-center">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Store</span>
                <span className="font-black text-[10px] uppercase tracking-tighter">{config.name}</span>
             </div>
             <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-800">{cartIcon}</div>
          </header>
        );
      case HeaderStyle.MINIMAL:
        return (
          <header className="px-6 py-6 flex items-center justify-between border-b border-slate-50 animate-fadeIn">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                <span className="font-bold text-[11px] uppercase tracking-widest text-slate-900">{config.name}</span>
             </div>
             <div className="flex items-center gap-4">
                <Search className="w-4 h-4 text-slate-300" />
                {cartIcon}
             </div>
          </header>
        );
      case HeaderStyle.BOLD:
        return (
          <header className="px-6 pt-10 pb-6 space-y-4 animate-fadeIn">
             <div className="flex items-center justify-between text-slate-400">
                <Menu className="w-6 h-6" />
                <div className="flex gap-3 items-center">
                  <Search className="w-5 h-5" />
                  {cartIcon}
                </div>
             </div>
             <h2 className="text-3xl font-black leading-tight" style={{ color: theme.text }}>{config.name}</h2>
          </header>
        );
      default: // CLASSIC
        return (
          <header className="px-5 py-5 flex items-center justify-between border-b border-slate-100 bg-white animate-fadeIn">
             <Menu className="w-5 h-5 text-slate-800" />
             <span className="font-black text-[11px] uppercase tracking-[0.25em] text-slate-900">{config.name}</span>
             {cartIcon}
          </header>
        );
    }
  };

  const renderProductCard = (p: Product) => {
    const isList = config.layout.card === ProductCardStyle.LIST;
    const isElegant = config.layout.card === ProductCardStyle.ELEGANT;
    const isGlass = config.layout.card === ProductCardStyle.GLASS;
    
    return (
      <div 
        key={p.id} 
        className={`bg-white group overflow-hidden transition-all active:scale-95 cursor-pointer ${
          isList ? 'flex items-center gap-4 p-4 border-b border-slate-50' : 
          isElegant ? 'p-0 shadow-xl mb-2' : 
          isGlass ? 'p-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm' :
          'p-3 border border-slate-50 shadow-sm'
        }`} 
        style={{ borderRadius: isElegant ? '0px' : theme.radius }}
      >
        <div className={`${isList ? 'w-20 h-20' : 'aspect-square mb-3'} bg-slate-100 relative overflow-hidden flex-shrink-0`} style={{ borderRadius: `calc(${theme.radius} / 1.5)` }}>
           {p.image ? <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /> : <Smartphone className="w-6 h-6 text-slate-300 m-auto absolute inset-0" />}
           {!isList && (
             <button 
              onClick={handleAddToCart}
              className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur shadow-sm rounded-full flex items-center justify-center text-slate-900 hover:bg-indigo-600 hover:text-white transition-all active:scale-90"
             >
                <Plus className="w-4 h-4" />
             </button>
           )}
        </div>
        <div className="flex-1 min-w-0 px-1 pb-1">
           <h5 className="text-[10px] font-black text-slate-800 truncate mb-1 uppercase tracking-tight">{p.name}</h5>
           <div className="flex items-center justify-between">
              <p className="text-[10px] font-black" style={{ color: theme.primary }}>{p.price}</p>
              {isList && <button onClick={handleAddToCart} className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 hover:bg-indigo-600 hover:text-white transition-all"><Plus className="w-4 h-4" /></button>}
           </div>
        </div>
      </div>
    );
  };

  const renderScreenContent = () => {
    const isList = config.layout.card === ProductCardStyle.LIST;

    switch (currentScreen) {
      case NextScreen.CATEGORIES:
        return (
          <div className="p-6 space-y-8 animate-fadeIn">
             <div className="flex items-center justify-between">
                <h3 className="text-xl font-black">All Items</h3>
                <Filter className="w-4 h-4 text-slate-400" />
             </div>
             {config.collections.map(coll => (
               <div key={coll.id} className="space-y-4 border-b border-slate-50 pb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{coll.name}</h4>
                  <div className={`grid ${isList ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                     {coll.products.map(p => renderProductCard(p))}
                  </div>
               </div>
             ))}
          </div>
        );

      case NextScreen.OFFERS:
        return (
          <div className="p-6 space-y-4 animate-fadeIn">
             <h3 className="text-xl font-black mb-6">Promotions</h3>
             {config.offers.map(o => (
               <div key={o.id} className="p-6 text-white relative overflow-hidden shadow-2xl transition-all" style={{ backgroundColor: o.color || theme.primary, borderRadius: theme.radius }}>
                  <Sparkles className="absolute -right-4 -top-4 w-24 h-24 opacity-20" />
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[8px] font-black uppercase tracking-widest">{o.discount}</span>
                  <h4 className="text-lg font-black mt-4">{o.title}</h4>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                     <div className="flex flex-col">
                        <span className="text-[7px] font-bold opacity-60 uppercase">Use Code:</span>
                        <span className="text-[11px] font-black tracking-widest">{o.code}</span>
                     </div>
                     <button className="px-5 py-2 bg-white text-slate-900 rounded-lg text-[9px] font-black uppercase shadow-lg active:scale-95 transition-transform">Copy</button>
                  </div>
               </div>
             ))}
          </div>
        );

      case NextScreen.CART:
        return (
          <div className="p-6 space-y-8 animate-fadeIn">
             <h3 className="text-xl font-black">Your Order</h3>
             <div className="space-y-4">
                {cartCount > 0 ? (
                  <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl shadow-sm">
                      <div className="w-16 h-16 bg-white rounded-xl overflow-hidden shadow-md flex-shrink-0">
                        <img src={config.collections[0]?.products[0]?.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <p className="text-[10px] font-black uppercase">{config.collections[0]?.products[0]?.name}</p>
                         <p className="text-[11px] font-bold mt-1" style={{ color: theme.primary }}>{config.collections[0]?.products[0]?.price}</p>
                         <p className="text-[8px] text-slate-400 font-bold mt-1">Quantity: {cartCount}</p>
                      </div>
                      <Trash2 onClick={() => setCartCount(0)} className="w-4 h-4 text-slate-300 mt-1 hover:text-rose-500 cursor-pointer" />
                   </div>
                ) : (
                  <div className="py-12 text-center space-y-4 opacity-30">
                    <ShoppingBag className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Cart is empty</p>
                  </div>
                )}
             </div>
             
             <div className="pt-6 border-t border-slate-100">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-4">Payment Selection</p>
                <div className="grid grid-cols-1 gap-3">
                   {config.payment.methods.map(pm => {
                     const opt = PAYMENT_OPTIONS.find(o => o.id === pm);
                     return (
                       <div key={pm} className="p-4 bg-white border-2 border-slate-50 rounded-2xl flex items-center justify-between shadow-sm hover:border-indigo-100 transition-colors cursor-pointer group">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all" style={{ color: opt?.color }}>{opt?.icon}</div>
                             <span className="text-[10px] font-black uppercase">{opt?.name}</span>
                          </div>
                          <Circle className="w-4 h-4 text-slate-200 group-hover:text-indigo-600" />
                       </div>
                     );
                   })}
                </div>
             </div>
             <button disabled={cartCount === 0} className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest shadow-2xl active:scale-95 transition-all disabled:opacity-20">Confirm Checkout</button>
          </div>
        );

      case NextScreen.ORDERS:
        return (
          <div className="p-6 space-y-6 animate-fadeIn">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-black">My Orders</h3>
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400"><Filter className="w-4 h-4" /></div>
             </div>
             {[
               { id: '9021', date: 'Today, 11:40 AM', total: '$345.00', status: 'In Transit', color: 'indigo' },
               { id: '8910', date: 'Oct 24, 2025', total: '$120.50', status: 'Delivered', color: 'emerald' }
             ].map((order, idx) => (
               <div key={idx} className="p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm space-y-6 group hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-2xl bg-${order.color}-50 flex items-center justify-center text-${order.color}-600`}><Package className="w-5 h-5" /></div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-tight">Order #{order.id}</p>
                           <p className="text-[8px] font-bold text-slate-400 mt-0.5">{order.date}</p>
                        </div>
                     </div>
                     <span className={`px-3 py-1 bg-${order.color}-50 text-${order.color}-600 rounded-full text-[8px] font-black uppercase tracking-widest`}>{order.status}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                     <div className="w-10 h-10 bg-white rounded-lg border border-slate-100 overflow-hidden"><img src={config.collections[0]?.products[0]?.image} className="w-full h-full object-cover" /></div>
                     <div className="flex-1">
                        <p className="text-[9px] font-black uppercase text-slate-800">Luxe Watch Pro</p>
                        <p className="text-[8px] font-bold text-slate-400 mt-0.5">Quantity: 1</p>
                     </div>
                     <p className="text-[10px] font-black" style={{ color: theme.primary }}>{order.total}</p>
                  </div>
                  <button className="w-full py-3 border-2 border-slate-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:border-slate-900 group-hover:text-slate-900 transition-all">Track Shipment</button>
               </div>
             ))}
          </div>
        );

      case NextScreen.PROFILE:
        return (
          <div className="p-8 space-y-10 animate-fadeIn text-center">
             <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl relative">
                   <User className="w-10 h-10 text-slate-300" />
                   <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white border-4 border-white"><CheckCircle2 className="w-4 h-4" /></div>
                </div>
                <div>
                   <h4 className="text-lg font-black tracking-tight">Account Holder</h4>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Merchant</p>
                </div>
             </div>
             <div className="space-y-3 text-left">
                {[
                  { icon: <Package className="w-4 h-4" />, label: 'Order History', route: NextScreen.ORDERS },
                  { icon: <Wallet className="w-4 h-4" />, label: 'My Wallet' },
                  { icon: <Settings className="w-4 h-4" />, label: 'Preferences' },
                  { icon: <LogOut className="w-4 h-4 text-rose-500" />, label: 'Exit Session' }
                ].map((item, idx) => (
                  <button key={idx} onClick={() => item.route && setCurrentScreen(item.route)} className="w-full p-5 bg-slate-50 rounded-2xl flex items-center justify-between group transition-all active:scale-90 shadow-sm">
                     <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">{item.icon}</div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{item.label}</span>
                     </div>
                     <ChevronRight className="w-4 h-4 text-slate-200 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
             </div>
          </div>
        );

      default: // HOME
        return (
          <div className="p-6 space-y-10 animate-fadeIn">
             <div className="relative p-8 rounded-[2.5rem] overflow-hidden shadow-2xl text-white" style={{ backgroundColor: theme.primary }}>
                <Sparkles className="absolute -right-4 -top-4 w-32 h-32 opacity-20" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black leading-tight mb-2">Winter<br/>New Arrival</h3>
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-6">Explore the full gallery</p>
                  <button onClick={() => setCurrentScreen(NextScreen.CATEGORIES)} className="px-8 py-3 bg-white text-slate-900 rounded-xl text-[9px] font-black uppercase shadow-xl hover:scale-105 transition-transform active:scale-95">Shop Gallery</button>
                </div>
             </div>
             {config.collections.slice(0, 1).map(coll => (
               <div key={coll.id} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-800">{coll.name}</h4>
                    <span onClick={() => setCurrentScreen(NextScreen.CATEGORIES)} className="text-[9px] font-bold text-slate-400 border-b border-slate-100 cursor-pointer">Explore</span>
                  </div>
                  {/* DYNAMIC GRID: Adjust cols based on selected style */}
                  <div className={`grid ${isList ? 'grid-cols-1' : 'grid-cols-2'} gap-5`}>
                    {coll.products.slice(0, 4).map(p => renderProductCard(p))}
                  </div>
               </div>
             ))}
          </div>
        );
    }
  };

  const renderNav = () => {
    const navStyle = config.layout.navigation;
    const isFloating = navStyle === NavigationBarStyle.FLOATING;
    const isGlass = navStyle === NavigationBarStyle.GLASS;
    const isMinimal = navStyle === NavigationBarStyle.MINIMAL;

    return (
      <nav className={`transition-all duration-500 flex justify-around items-center px-4 ${
        isFloating ? 'm-6 rounded-[2.5rem] shadow-2xl py-5 bg-white' : 
        isGlass ? 'bg-white/70 backdrop-blur-xl py-5 border-t border-white/40' :
        isMinimal ? 'bg-white py-4 border-t border-slate-50' :
        'bg-white border-t border-slate-100 py-5 pb-8'
      }`}>
         {config.navigation.map(tab => (
           <button key={tab.id} onClick={() => setCurrentScreen(tab.route)} className="flex flex-col items-center gap-1.5 relative group active:scale-90 transition-transform">
              <div className={`transition-all duration-300 ${currentScreen === tab.route ? 'scale-125' : 'scale-100 opacity-30 hover:opacity-100'}`} style={{ color: currentScreen === tab.route ? theme.primary : '#94a3b8' }}>
                 <IconRenderer iconName={tab.icon} className="w-5 h-5" />
              </div>
              {!isMinimal && <span className={`text-[7px] font-black uppercase tracking-widest transition-colors ${currentScreen === tab.route ? 'text-slate-900' : 'text-slate-300'}`}>{tab.label}</span>}
              {currentScreen === tab.route && <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-slate-900"></div>}
           </button>
         ))}
      </nav>
    );
  };

  return (
    <div className="relative w-[340px] h-[720px] bg-slate-900 rounded-[4.5rem] border-[14px] border-slate-800 shadow-3xl overflow-hidden scale-90 lg:scale-100 group transition-all">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-8 w-40 bg-slate-800 rounded-b-[2rem] z-50 flex items-center justify-center gap-4">
         <div className="w-12 h-1.5 bg-slate-700 rounded-full"></div>
         <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
      </div>
      <div className="w-full h-full bg-white relative flex flex-col" style={{ fontFamily: theme.font }}>
        <div className="h-10 w-full flex items-center justify-between px-10 pt-4 opacity-40">
           <span className="text-[10px] font-black">9:41</span>
           <div className="flex gap-2"><Signal className="w-3 h-3" /><Wifi className="w-3 h-3" /><Battery className="w-3 h-3" /></div>
        </div>
        {renderHeader()}
        <main className="flex-1 overflow-y-auto scrollbar-hide" style={{ backgroundColor: theme.background }}>
           {renderScreenContent()}
        </main>
        {renderNav()}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};
