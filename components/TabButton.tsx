import React from 'react';
import { TabType } from '../types';
import { TAB_CONFIG } from '../constants';

interface TabButtonProps {
  type: TabType;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ type, isActive, onClick }) => {
  const config = TAB_CONFIG[type];

  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300
        rounded-t-lg border-b-2 
        ${isActive 
          ? `${config.color} ${config.bgColor} ${config.borderColor}` 
          : 'text-slate-500 hover:text-slate-700 border-transparent hover:bg-slate-100'}
      `}
    >
      {config.icon}
      <span>{config.label}</span>
    </button>
  );
};