
import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconRendererProps {
  iconName: string;
  className?: string;
  // Fix: Added style prop to resolve "Property 'style' does not exist on type 'IconRendererProps'"
  style?: React.CSSProperties;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ iconName, className, style }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className={className} style={style} />;
};
