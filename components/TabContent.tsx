
import React, { useState, useEffect } from 'react';
import { TabType } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';
import { generateTabAdvice } from '../services/genaiService';

interface TabContentProps {
  type: TabType;
  sectionTitle: string;
  isActive: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({ type, sectionTitle, isActive }) => {
  const [aiContent, setAiContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    setAiContent('');
    setHasGenerated(false);
  }, [type]);

  const handleGenerateAi = async () => {
    setLoading(true);
    try {
      const content = await generateTabAdvice(type, sectionTitle);
      setAiContent(content);
      setHasGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  if (!isActive) return null;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm min-h-[150px] animate-fadeIn border border-slate-100">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
          {type === TabType.PROFILE ? 'Profile' : type === TabType.CART ? 'Shopping Cart' : 'Digital Store'} Content
        </h3>
      </div>

      <div className="prose prose-slate max-w-none mb-6 text-slate-600">
        <p className="text-sm">
          You are currently viewing the <strong>{sectionTitle}</strong> module. 
          {type === TabType.PROFILE ? ' User account' : type === TabType.CART ? ' Purchase' : ' Inventory'} data has been synced successfully.
        </p>
      </div>

      {/* AI Assistant Section */}
      <div className="mt-6 border border-indigo-100 rounded-xl p-4 bg-indigo-50/50">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h4 className="font-semibold text-indigo-900 uppercase text-xs tracking-widest">Gemini Assistant</h4>
        </div>
        
        {!hasGenerated ? (
          <button
            onClick={handleGenerateAi}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-black uppercase tracking-widest transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Analyzing Section...' : 'Generate Smart Advice'}
          </button>
        ) : (
          <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm text-slate-700 text-sm leading-relaxed whitespace-pre-wrap italic">
            "{aiContent}"
          </div>
        )}
      </div>
    </div>
  );
};
