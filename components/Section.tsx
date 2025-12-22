
import React, { useState } from 'react';
import { SectionItem } from '../types';
import * as LucideIcons from 'lucide-react';

interface SectionProps {
  data: SectionItem;
}

export const Section: React.FC<SectionProps> = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(data.tabs[0]?.id);

  const activeTab = data.tabs.find(t => t.id === activeTabId);

  const renderIcon = (name: string, className: string) => {
    // @ts-ignore
    const Icon = LucideIcons[name] || LucideIcons.HelpCircle;
    return <Icon className={className} />;
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden animate-slideUp transition-all hover:shadow-2xl">
      <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg rotate-3">
            {renderIcon(data.icon, "w-6 h-6")}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{data.title}</h3>
            <p className="text-slate-400 text-sm font-medium">{data.description}</p>
          </div>
        </div>
        <LucideIcons.ChevronLeft className="w-5 h-5 text-slate-200" />
      </div>

      <div className="p-8">
        <div className="flex flex-wrap gap-3 mb-8 bg-slate-100/50 p-2 rounded-2xl w-fit border border-slate-100">
          {data.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
                ${activeTabId === tab.id 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' 
                  : 'text-slate-500 hover:bg-white hover:text-indigo-600'}
              `}
            >
              {renderIcon(tab.icon, "w-4 h-4")}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-h-[180px] transition-all duration-300">
          {activeTab && (
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-inner bg-gradient-to-br from-white to-slate-50/50 animate-fadeIn">
              {activeTab.content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
