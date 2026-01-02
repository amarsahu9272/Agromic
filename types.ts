
import React from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  benefits: string[];
}

export interface StatItem {
  label: string;
  value: string;
  description: string;
  // Fix: Use React namespace after importing it
  icon: React.ReactNode;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
