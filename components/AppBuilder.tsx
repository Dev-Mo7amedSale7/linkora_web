
import React, { useState, useEffect, useRef } from 'react';
import { AppConfig, TabConfig, ProductCardStyle, NextScreen, NavigationBarStyle, HeaderStyle, PaymentMethod, BorderRadius, FontFamily, Product, Offer, User, Collection } from '../types';
import { ECOM_TABS, ECOM_PALETTES, PRODUCT_CARD_OPTIONS, NAV_BAR_OPTIONS, HEADER_OPTIONS, RADIUS_OPTIONS, FONT_OPTIONS, PAYMENT_OPTIONS } from '../constants';
import { IconRenderer } from './IconRenderer';
import { 
  Palette, Layers, Plus, Trash2, Sparkles, X, Folder, ArrowLeft, Paintbrush, LayoutTemplate, Box, Download, Cpu, Terminal, 
  Wallet, CloudUpload, Loader2, Edit3, AlignLeft, CheckCircle2, Megaphone, Settings, Activity, HardDrive, Share2,
  Smartphone, CreditCard, Layout, MousePointer2, Tag
} from 'lucide-react';
import { SaaSSection } from './SaaSSection';

interface AppBuilderProps {
  user: User;
  onLogout: () => void;
}

const API_BASE_URL = 'http://localhost:5001/api';

export const AppBuilder: React.FC<AppBuilderProps> = ({ user }) => {
  const currentAppId = user.id;

  const [appName, setAppName] = useState("Premium Store");
  const [selectedPalette, setSelectedPalette] = useState(ECOM_PALETTES[0]);
  const [cardStyle, setCardStyle] = useState<ProductCardStyle>(ProductCardStyle.GRID);
  const [navStyle, setNavStyle] = useState<NavigationBarStyle>(NavigationBarStyle.CLASSIC);
  const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(HeaderStyle.CLASSIC);
  const [radius, setRadius] = useState<BorderRadius>(BorderRadius.MEDIUM);
  const [font, setFont] = useState<FontFamily>(FontFamily.INTER);
  const [selectedTabs, setSelectedTabs] = useState<TabConfig[]>(ECOM_TABS.slice(0, 4));
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([PaymentMethod.STRIPE, PaymentMethod.CASH]);
  
  const [collections, setCollections] = useState<Collection[]>([
    { id: 'c1', name: "Featured", products: [{ id: 'p1', name: "Luxe Watch", description: "Premium design.", price: "$299", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300" }] }
  ]);
  const [offers, setOffers] = useState<Offer[]>([
    { id: 'o1', title: 'Grand Opening', discount: '20% OFF', code: 'HELLO20', description: 'Limited time deal.', color: selectedPalette.primary }
  ]);

  const [activeSection, setActiveSection] = useState<'design' | 'inventory' | 'marketing' | 'config'>('design');
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [previewScreen, setPreviewScreen] = useState<NextScreen | undefined>(undefined);
  
  const [showExportModal, setShowExportModal] = useState(false);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Form States
  const [showCollForm, setShowCollForm] = useState(false);
  const [newCollName, setNewCollName] = useState("");
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);

  const [showProdForm, setShowProdForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProd, setNewProd] = useState({ name: '', price: '', image: '', description: '' });

  const [showOfferForm, setShowOfferForm] = useState(false);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [newOffer, setNewOffer] = useState({ title: '', discount: '', code: '', description: '' });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/config/${currentAppId}`);
        const data = await response.json();
        if (data) {
          setAppName(data.name);
          setSelectedPalette(ECOM_PALETTES.find(p => p.primary === data.theme.primary) || ECOM_PALETTES[0]);
          setCardStyle(data.layout.card);
          setNavStyle(data.layout.navigation);
          setHeaderStyle(data.layout.header);
          setRadius(data.theme.radius);
          setFont(data.theme.font);
          setSelectedTabs(data.navigation);
          setCollections(data.collections || []);
          setOffers(data.offers || []);
          setPaymentMethods(data.payment?.methods || [PaymentMethod.STRIPE, PaymentMethod.CASH]);
        }
      } catch (err) {
        console.warn("Initial load: No config found for this user.");
      }
    };
    fetchConfig();
  }, [currentAppId]);

  const currentConfig: AppConfig = {
    id: `LK_${user.id.substring(0, 4).toUpperCase()}`,
    userId: user.id,
    name: appName,
    icon: "🛍️",
    apiEndpoint: "https://api.linkora.io/v1",
    theme: { primary: selectedPalette.primary, secondary: selectedPalette.secondary, background: selectedPalette.container, text: "#1e293b", radius, font },
    layout: { card: cardStyle, navigation: navStyle, header: headerStyle },
    payment: { methods: paymentMethods },
    navigation: selectedTabs,
    collections,
    offers
  };


const handlePublish = async () => {
  setIsPublishing(true);
  try {
    const response = await fetch(`${API_BASE_URL}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, config: currentConfig }),
    });

    if (response.ok) {
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    } else {
      const errorData = await response.json();
      console.error("Publish error:", errorData);
      alert("Publish failed.");
    }
  } catch (err) {
    console.error(err);
    alert("Publish failed.");
  } finally {
    setIsPublishing(false);
  }
};



  const handleCreateCollection = async () => {
    if (!newCollName) return;

    if (editingCollectionId) {
      setCollections(collections.map(c => c.id === editingCollectionId ? { ...c, name: newCollName } : c));
      setEditingCollectionId(null);
      setNewCollName("");
      setShowCollForm(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/collections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appId: currentAppId, name: newCollName }),
      });
      const data = await response.json();
      setCollections([...collections, { id: data.id, name: newCollName, products: [] }]);
      setNewCollName("");
      setShowCollForm(false);
    } catch (err) {
      alert("Error saving collection.");
    }
  };

  const handleDeleteCollection = (id: string) => {
    if (window.confirm("Are you sure you want to delete this collection and all its products?")) {
      setCollections(collections.filter(c => c.id !== id));
    }
  };

  const handleEditCollection = (coll: Collection) => {
    setNewCollName(coll.name);
    setEditingCollectionId(coll.id);
    setShowCollForm(true);
  };

  const handleSaveProduct = async () => {
    if (!activeCollectionId) return;
    const numericPrice = parseFloat(newProd.price.replace(/[^0-9.]/g, '')) || 0;
    
    if (editingProductId) {
      const updated = collections.map(c => {
        if (c.id === activeCollectionId) {
          return {
            ...c,
            products: c.products.map(p => p.id === editingProductId ? {
              ...p,
              name: newProd.name,
              price: `$${numericPrice}`,
              image: newProd.image,
              description: newProd.description
            } : p)
          };
        }
        return c;
      });
      setCollections(updated);
      setEditingProductId(null);
      setNewProd({ name: '', price: '', image: '', description: '' });
      setShowProdForm(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          collectionId: activeCollectionId, 
          name: newProd.name,
          description: newProd.description,
          price: numericPrice,
          image: newProd.image
        }),
      });
      const data = await response.json();
      
      const productData: Product = {
        id: data.id,
        name: newProd.name,
        price: `$${numericPrice}`,
        image: newProd.image,
        description: newProd.description
      };

      const updated = collections.map(c => {
        if (c.id === activeCollectionId) {
          return { ...c, products: [...c.products, productData] };
        }
        return c;
      });

      setCollections(updated);
      setNewProd({ name: '', price: '', image: '', description: '' });
      setShowProdForm(false);
    } catch (err) {
      alert("Error saving product.");
    }
  };

  const handleDeleteProduct = (prodId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = collections.map(c => {
        if (c.id === activeCollectionId) {
          return { ...c, products: c.products.filter(p => p.id !== prodId) };
        }
        return c;
      });
      setCollections(updated);
    }
  };

  const handleEditProduct = (prod: Product) => {
    setNewProd({
      name: prod.name,
      price: prod.price,
      image: prod.image,
      description: prod.description
    });
    setEditingProductId(prod.id);
    setShowProdForm(true);
  };

  const handleSaveOffer = () => {
    if (!newOffer.title || !newOffer.discount || !newOffer.code) return;

    if (editingOfferId) {
      setOffers(offers.map(o => o.id === editingOfferId ? {
        ...o,
        title: newOffer.title,
        discount: newOffer.discount,
        code: newOffer.code,
        description: newOffer.description,
        color: selectedPalette.primary
      } : o));
      setEditingOfferId(null);
    } else {
      const offerData: Offer = {
        id: `o_${Date.now()}`,
        title: newOffer.title,
        discount: newOffer.discount,
        code: newOffer.code,
        description: newOffer.description,
        color: selectedPalette.primary
      };
      setOffers([...offers, offerData]);
    }

    setNewOffer({ title: '', discount: '', code: '', description: '' });
    setShowOfferForm(false);
  };

  const handleDeleteOffer = (id: string) => {
    if (window.confirm("Delete this campaign?")) {
      setOffers(offers.filter(o => o.id !== id));
    }
  };

  const handleEditOffer = (offer: Offer) => {
    setNewOffer({
      title: offer.title,
      discount: offer.discount,
      code: offer.code,
      description: offer.description
    });
    setEditingOfferId(offer.id);
    setShowOfferForm(true);
  };

  const toggleTabSelection = (tab: TabConfig) => {
    if (selectedTabs.some(t => t.id === tab.id)) {
      if (selectedTabs.length > 2) {
        setSelectedTabs(selectedTabs.filter(t => t.id !== tab.id));
      }
    } else {
      setSelectedTabs([...selectedTabs, tab]);
    }
  };

  const togglePaymentMethod = (method: PaymentMethod) => {
    if (paymentMethods.includes(method)) {
      if (paymentMethods.length > 1) {
        setPaymentMethods(paymentMethods.filter(m => m !== method));
      }
    } else {
      setPaymentMethods([...paymentMethods, method]);
    }
  };

  const handleStartBuild = () => {
    setIsBuilding(true);
    setBuildComplete(false);
    setBuildLogs([]);
    setExportProgress(0);

    const logs = [
      "Initializing Linkora Build Engine...",
      "Validating Project Integrity...",
      `Theme: ${selectedPalette.name}`,
      `Financial Gateways: ${paymentMethods.join(', ')}`,
      `SKU Count: ${collections.reduce((acc, c) => acc + c.products.length, 0)}`,
      "Compiling Relational Data Maps...",
      "Deployment Bundle Ready."
    ];

    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < logs.length) {
        setBuildLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[currentLog]}`]);
        setExportProgress(prev => Math.min(prev + 15, 100));
        currentLog++;
      } else {
        clearInterval(interval);
        finalizeDownload();
      }
    }, 400);
  };

  const finalizeDownload = () => {
    const jsonStr = JSON.stringify(currentConfig, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${appName.toLowerCase().replace(/\s+/g, '_')}_config.json`;
    link.click();
    setIsBuilding(false);
    setBuildComplete(true);
    setExportProgress(100);
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-10 pb-20 animate-fadeIn">
      {/* EXPORT MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 w-full max-w-4xl rounded-[3.5rem] shadow-3xl overflow-hidden animate-slideUp border border-white/5 flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 bg-white/[0.02] p-10 border-r border-white/5 space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl"><Cpu className="w-6 h-6" /></div>
                <h3 className="text-white font-black text-xl">Deployment</h3>
              </div>
              <div className="pt-6">
                 {!isBuilding && !buildComplete ? (
                    <button onClick={handleStartBuild} className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest transition-all">Start Project Build</button>
                 ) : buildComplete ? (
                    <div className="space-y-3">
                       <div className="w-full py-5 bg-emerald-500 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"><CheckCircle2 className="w-4 h-4" /> Ready</div>
                       <button onClick={() => setShowExportModal(false)} className="w-full py-4 text-slate-500 font-black uppercase text-[9px] tracking-widest hover:text-white transition-colors">Close</button>
                    </div>
                 ) : (
                    <div className="w-full h-12 bg-white/5 rounded-full overflow-hidden relative">
                       <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${exportProgress}%` }}></div>
                       <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">{exportProgress}%</span>
                    </div>
                 )}
              </div>
            </div>
            <div className="flex-1 p-10 bg-black/40 flex flex-col min-h-[400px]">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                     <Terminal className="w-4 h-4 text-indigo-400" />
                     <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Build Engine Console</span>
                  </div>
               </div>
               <div className="flex-1 font-mono text-[11px] space-y-2 overflow-y-auto scrollbar-hide">
                  {buildLogs.map((log, i) => (
                    <p key={i} className="text-slate-300 animate-fadeIn"><span className="text-indigo-500 mr-2">➜</span> {log}</p>
                  ))}
                  {isBuilding && <div className="w-2 h-4 bg-indigo-500 animate-pulse inline-block"></div>}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* TOP CONTROL BAR */}
      <div className="bg-slate-900 rounded-[3rem] p-8 shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3"><Sparkles className="w-8 h-8" /></div>
           <div>
              <p className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Relational Engine v4.0</p>
              <div className="flex items-center gap-3 mt-1">
                <h2 className="text-2xl font-black text-white">PROJECT: {appName}</h2>
                <span className="px-3 py-1 bg-white/10 rounded-full text-[9px] font-black text-slate-400 border border-white/5 uppercase tracking-widest">ID: {currentConfig.id}</span>
              </div>
           </div>
        </div>
        <div className="flex bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
           {['design', 'inventory', 'marketing', 'config'].map(id => (
             <button 
                key={id} 
                onClick={() => {setActiveSection(id as any); setActiveCollectionId(null);}}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === id ? 'bg-indigo-600 text-white shadow-2xl scale-105' : 'text-slate-500 hover:text-white'}`}
             >
                {id === 'design' ? <Palette className="w-4 h-4" /> : id === 'inventory' ? <Layers className="w-4 h-4" /> : id === 'marketing' ? <Megaphone className="w-4 h-4" /> : <LayoutTemplate className="w-4 h-4" />}
                {id === 'config' ? 'Structure' : id.charAt(0).toUpperCase() + id.slice(1)}
             </button>
           ))}
        </div>
        <div className="flex items-center gap-4">
           <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all flex items-center gap-3 ${publishSuccess ? 'bg-emerald-500 text-white' : 'bg-indigo-600 text-white'} disabled:opacity-50`}
           >
              {isPublishing ? <Loader2 className="w-4 h-4 animate-spin" /> : publishSuccess ? <CheckCircle2 className="w-4 h-4" /> : <CloudUpload className="w-4 h-4" />}
              <span>{isPublishing ? 'Publishing...' : publishSuccess ? 'Tables Synced' : 'Sync Tables'}</span>
           </button>
           <button onClick={() => setShowExportModal(true)} className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl transition-all flex items-center gap-3">
              <Download className="w-4 h-4" /> Bundle
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
        <div className="xl:col-span-7 space-y-8">
          {activeSection === 'design' && (
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl space-y-12 animate-slideUp">
               <div className="space-y-8">
                  <h3 className="text-xl font-black flex items-center gap-3 border-b border-slate-50 pb-4 text-slate-800"><Paintbrush className="w-6 h-6 text-indigo-600" /> Identity & Theme</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Store Name</label>
                        <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-600 outline-none font-bold text-slate-900" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400">Typography</label>
                        <select value={font} onChange={(e) => setFont(e.target.value as FontFamily)} className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent outline-none font-bold text-slate-900">
                          {FONT_OPTIONS.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                        </select>
                     </div>
                  </div>
                  <div className="space-y-4 pt-4">
                     <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Color Spectrum</label>
                     <div className="grid grid-cols-6 md:grid-cols-10 gap-4">
                        {ECOM_PALETTES.map(p => (
                          <button key={p.name} onClick={() => setSelectedPalette(p)} className={`w-full aspect-square rounded-xl border-4 transition-all ${selectedPalette.primary === p.primary ? 'border-slate-900 scale-110 shadow-lg' : 'border-transparent'}`} style={{ backgroundColor: p.primary }} />
                        ))}
                     </div>
                  </div>
               </div>

               <div className="space-y-10 pt-10 border-t border-slate-50">
                  <h3 className="text-xl font-black flex items-center gap-3 text-slate-800"><LayoutTemplate className="w-6 h-6 text-indigo-600" /> UI Components</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Card Layout</p>
                        <div className="grid grid-cols-2 gap-3">
                           {PRODUCT_CARD_OPTIONS.map(opt => (
                             <button key={opt.id} onClick={() => setCardStyle(opt.id)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${cardStyle === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-200'}`}>
                                {opt.icon} <span className="text-[8px] font-black uppercase">{opt.name}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Navigation Style</p>
                        <div className="grid grid-cols-2 gap-3">
                           {NAV_BAR_OPTIONS.map(opt => (
                             <button key={opt.id} onClick={() => setNavStyle(opt.id)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${navStyle === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-200'}`}>
                                {opt.icon} <span className="text-[8px] font-black uppercase">{opt.name}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Header Style</p>
                        <div className="grid grid-cols-2 gap-3">
                           {HEADER_OPTIONS.map(opt => (
                             <button key={opt.id} onClick={() => setHeaderStyle(opt.id)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${headerStyle === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-200'}`}>
                                {opt.icon} <span className="text-[8px] font-black uppercase">{opt.name}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Border Radius</p>
                        <div className="grid grid-cols-2 gap-3">
                           {RADIUS_OPTIONS.map(opt => (
                             <button key={opt.id} onClick={() => setRadius(opt.id as any)} className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${radius === opt.id ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg shadow-indigo-100' : 'border-slate-50 bg-slate-50 text-slate-300 hover:border-slate-200'}`}>
                                {opt.icon} <span className="text-[8px] font-black uppercase">{opt.name}</span>
                             </button>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeSection === 'inventory' && (
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl space-y-10 animate-slideUp">
               {!activeCollectionId ? (
                 <div className="space-y-8">
                   <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm"><Box className="w-6 h-6" /></div>
                        <h3 className="text-2xl font-black text-slate-800">Content Tables</h3>
                      </div>
                      <button onClick={() => { setShowCollForm(!showCollForm); setEditingCollectionId(null); setNewCollName(""); }} className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">
                        {showCollForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} Collection
                      </button>
                   </div>
                   {showCollForm && (
                     <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-200 flex gap-4 animate-slideDown">
                        <input placeholder="Table Title" className="flex-1 px-6 py-4 rounded-xl outline-none border-2 border-transparent focus:border-indigo-600 font-bold text-slate-900" value={newCollName} onChange={e => setNewCollName(e.target.value)} />
                        <button onClick={handleCreateCollection} className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-black uppercase text-[10px]">
                          {editingCollectionId ? 'Update Table' : 'Save to DB'}
                        </button>
                     </div>
                   )}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {collections.map(coll => (
                        <div key={coll.id} className="p-8 bg-slate-50 rounded-[2.5rem] border-2 border-transparent hover:border-indigo-500 transition-all group shadow-sm relative">
                           <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-400 shadow-md group-hover:bg-indigo-600 group-hover:text-white transition-all"><Folder className="w-6 h-6" /></div>
                                 <h4 className="text-lg font-black text-slate-800">{coll.name}</h4>
                              </div>
                              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEditCollection(coll)} className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm border border-slate-100"><Edit3 className="w-4 h-4" /></button>
                                <button onClick={() => handleDeleteCollection(coll.id)} className="p-2 bg-white text-slate-400 hover:text-rose-500 rounded-lg shadow-sm border border-slate-100"><Trash2 className="w-4 h-4" /></button>
                              </div>
                           </div>
                           <button onClick={() => setActiveCollectionId(coll.id)} className="w-full py-4 bg-white rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-3 border border-slate-100 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">Manage ({coll.products.length} Items)</button>
                        </div>
                      ))}
                   </div>
                 </div>
               ) : (
                 <div className="space-y-8 animate-fadeIn">
                    <button onClick={() => { setActiveCollectionId(null); setEditingProductId(null); setShowProdForm(false); }} className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:-translate-x-2 transition-transform"><ArrowLeft className="w-4 h-4" /> Back to Tables</button>
                    <div className="flex items-center justify-between border-b border-slate-50 pb-6">
                       <h3 className="text-2xl font-black text-slate-800">Products in: <span className="text-indigo-600">{collections.find(c => c.id === activeCollectionId)?.name}</span></h3>
                       <button onClick={() => { setShowProdForm(!showProdForm); setEditingProductId(null); setNewProd({ name: '', price: '', image: '', description: '' }); }} className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest">
                         {showProdForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} Item
                       </button>
                    </div>
                    {showProdForm && (
                      <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-200 space-y-6 animate-slideDown shadow-inner">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input placeholder="Name" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newProd.name} onChange={e => setNewProd({...newProd, name: e.target.value})} />
                            <input placeholder="Price (e.g. 299.99)" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newProd.price} onChange={e => setNewProd({...newProd, price: e.target.value})} />
                         </div>
                         <input placeholder="Image URL" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newProd.image} onChange={e => setNewProd({...newProd, image: e.target.value})} />
                         <textarea placeholder="Description" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900 min-h-[100px]" value={newProd.description} onChange={e => setNewProd({...newProd, description: e.target.value})} />
                         <button onClick={handleSaveProduct} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[11px] shadow-2xl transition-all">
                           {editingProductId ? 'Update Item' : 'Save to Table'}
                         </button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {collections.find(c => c.id === activeCollectionId)?.products.map(p => (
                         <div key={p.id} className="p-5 bg-slate-50 rounded-2xl flex items-center justify-between border border-transparent shadow-sm hover:border-indigo-100 transition-all group">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                               <div className="w-16 h-16 bg-white rounded-2xl overflow-hidden shadow-sm border-2 border-white flex-shrink-0"><img src={p.image} className="w-full h-full object-cover" /></div>
                               <div className="min-w-0">
                                  <p className="text-[11px] font-black uppercase tracking-tight text-slate-900 truncate">{p.name}</p>
                                  <p className="text-[10px] font-bold text-indigo-600">{p.price}</p>
                               </div>
                            </div>
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                               <button onClick={() => handleEditProduct(p)} className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm border border-slate-100"><Edit3 className="w-4 h-4" /></button>
                               <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-white text-slate-400 hover:text-rose-500 rounded-lg shadow-sm border border-slate-100"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
            </div>
          )}

          {activeSection === 'marketing' && (
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl space-y-10 animate-slideUp">
               <div className="flex items-center justify-between border-b border-slate-50 pb-8">
                  <h3 className="text-2xl font-black flex items-center gap-4 text-slate-800"><Megaphone className="w-6 h-6 text-indigo-600" /> Campaigns</h3>
                  <button onClick={() => { setShowOfferForm(!showOfferForm); setEditingOfferId(null); setNewOffer({ title: '', discount: '', code: '', description: '' }); }} className="flex items-center gap-3 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">
                    {showOfferForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} Add Offer
                  </button>
               </div>

               {showOfferForm && (
                 <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-200 space-y-6 animate-slideDown shadow-inner">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <input placeholder="Campaign Title" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} />
                       <input placeholder="Discount (e.g. 20% OFF)" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newOffer.discount} onChange={e => setNewOffer({...newOffer, discount: e.target.value})} />
                    </div>
                    <input placeholder="Promo Code" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900" value={newOffer.code} onChange={e => setNewOffer({...newOffer, code: e.target.value})} />
                    <textarea placeholder="Terms & Conditions" className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-transparent outline-none focus:border-indigo-600 font-bold text-slate-900 min-h-[100px]" value={newOffer.description} onChange={e => setNewOffer({...newOffer, description: e.target.value})} />
                    <button onClick={handleSaveOffer} className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase text-[11px] shadow-2xl transition-all">
                      {editingOfferId ? 'Update Campaign' : 'Launch Campaign'}
                    </button>
                 </div>
               )}

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {offers.map(o => (
                    <div key={o.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col h-full relative group shadow-sm transition-all hover:shadow-xl">
                       <div className="flex items-center justify-between mb-6">
                          <div className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-md" style={{ backgroundColor: o.color || selectedPalette.primary }}>{o.discount}</div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button onClick={() => handleEditOffer(o)} className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm border border-slate-100"><Edit3 className="w-4 h-4" /></button>
                             <button onClick={() => handleDeleteOffer(o.id)} className="p-2 bg-white text-slate-400 hover:text-rose-500 rounded-lg shadow-sm border border-slate-100"><Trash2 className="w-4 h-4" /></button>
                          </div>
                       </div>
                       <h4 className="font-black text-slate-900 text-lg mb-2">{o.title}</h4>
                       <div className="flex items-center gap-2 mb-4">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Code: <span className="text-slate-900">{o.code}</span></p>
                       </div>
                       {o.description && <p className="text-xs text-slate-500 leading-relaxed mt-2 italic border-t border-slate-200 pt-4">"{o.description}"</p>}
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeSection === 'config' && (
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-xl space-y-12 animate-slideUp">
               <div className="space-y-8">
                  <h3 className="text-xl font-black flex items-center gap-3 border-b border-slate-50 pb-4 text-slate-800"><Layout className="w-6 h-6 text-indigo-600" /> App Navigation</h3>
                  <p className="text-xs font-medium text-slate-400">Select which sections appear in your app's main navigation menu.</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                     {ECOM_TABS.map(tab => {
                       const isSelected = selectedTabs.some(t => t.id === tab.id);
                       return (
                         <button 
                            key={tab.id} 
                            onClick={() => toggleTabSelection(tab)}
                            className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${isSelected ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-lg' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                         >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-slate-300'}`}>
                               <IconRenderer iconName={tab.icon} className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200'}`}>
                               {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                         </button>
                       );
                     })}
                  </div>
               </div>

               <div className="space-y-8 pt-10 border-t border-slate-50">
                  <h3 className="text-xl font-black flex items-center gap-3 border-b border-slate-50 pb-4 text-slate-800"><CreditCard className="w-6 h-6 text-indigo-600" /> Checkout & Payments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {PAYMENT_OPTIONS.map(opt => {
                       const isSelected = paymentMethods.includes(opt.id);
                       return (
                         <button 
                            key={opt.id} 
                            onClick={() => togglePaymentMethod(opt.id)}
                            className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between ${isSelected ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                         >
                            <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${isSelected ? 'bg-emerald-500 text-white' : 'bg-white'}`} style={{ color: !isSelected ? opt.color : 'white' }}>
                                  {opt.icon}
                               </div>
                               <span className="text-xs font-black uppercase tracking-widest">{opt.name}</span>
                            </div>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSelected ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'}`}>
                               {isSelected && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                         </button>
                       );
                     })}
                  </div>
               </div>
            </div>
          )}
        </div>
        
        <div className="xl:col-span-5 sticky top-10 flex flex-col items-center">
           <SaaSSection config={currentConfig} forcedScreen={previewScreen} />
           <div className="mt-12 flex items-center gap-4 px-10 py-5 bg-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border border-slate-100 shadow-2xl backdrop-blur-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              Relational DB Linkora Active
           </div>
        </div>
      </div>
    </div>
  );
};
