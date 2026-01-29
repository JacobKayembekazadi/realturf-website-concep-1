
export interface Product {
  name: string;
  category: 'Landscape' | 'Sports';
  description: string;
  image: string;
  pileHeight?: string;
  faceWeight?: string;
  fiber?: string;
  apps?: string[];
  features: string[];
  url?: string;
}

export interface RealTechFeature {
  name: string;
  description: string;
}

export interface Dealer {
  name: string;
  type: 'Physical Center' | 'Partner Center';
  address?: string;
}

export interface KnowledgeArticle {
  title: string;
  content: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
