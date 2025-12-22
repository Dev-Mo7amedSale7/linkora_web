
import { TabConfig } from '../types';

// Fix: Updated tab parameter to accept string | string[] to resolve the type error in Section.tsx
export const saveActivityAsJson = (clientId: string, appName: string, tab: string | string[]): void => {
  const activeTab = Array.isArray(tab) ? tab.join(', ') : tab;
  
  const logData = {
    clientId,
    appName,
    activeTab,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  const jsonString = JSON.stringify(logData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `activity_${clientId}_${Date.now()}.json`;
  
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};