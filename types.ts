
export interface CryptoAddress {
  label: string;
  network: string;
  address: string;
  symbol: string;
  color: string;
}

export interface Donor {
  id: string;
  name: string;
  country?: string;
  amount?: string;
  date: string;
}

export interface ImpactReport {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'food' | 'medicine' | 'shelter' | 'education' | 'emergency';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
