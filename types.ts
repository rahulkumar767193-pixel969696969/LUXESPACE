
export type RoomType = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office' | 'Bathroom';
export type StyleType = 'Modern' | 'Minimal' | 'Luxury' | 'Scandinavian' | 'Industrial' | 'Bohemian';
export type BudgetLevel = 'Economy' | 'Mid-Range' | 'Premium' | 'Ultra-Luxury';
export type ColorPalette = 'Monochromatic' | 'Earth Tones' | 'Vibrant' | 'Pastel' | 'Dark & Moody' | 'Warm & Cozy';
export type LightingAmbiance = 'Natural' | 'Warm' | 'Cool' | 'Dramatic' | 'Soft' | 'Bright';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface DesignHistoryItem {
  id: string;
  userId: string;
  roomType: RoomType;
  styleType: StyleType;
  beforeImage: string;
  afterImage: string;
  timestamp: string;
  explanation: DesignExplanation;
}

export interface DesignExplanation {
  palette: string[];
  furniture: string[];
  lighting: string;
  summary: string;
}

export interface LoadingStep {
  label: string;
  sub: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  name: string;
  email: string;
  category: string;
  description: string;
  status: 'Open' | 'Closed';
  createdAt: string;
}

export interface GeneratedAsset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  modelUrl?: string; // Placeholder for future 3D model file
  timestamp: string;
}
