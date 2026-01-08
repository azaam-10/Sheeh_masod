
import { CryptoAddress, Donor, ImpactReport } from './types.ts';

export const CAMPAIGN_TARGET = 50000;
export const CURRENT_RAISED = 12500;

export const CRYPTO_ADDRESSES: CryptoAddress[] = [
  {
    label: "USDT (BEP20)",
    network: "Binance Smart Chain (BEP20)",
    address: "0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d",
    symbol: "USDT",
    color: "bg-[#26A17B]"
  },
  {
    label: "USDT (TRC20)",
    network: "TRON (TRC20)",
    address: "TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai",
    symbol: "USDT",
    color: "bg-[#26A17B]"
  },
  {
    label: "TRON (TRC20)",
    network: "TRON (TRC20)",
    address: "TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai",
    symbol: "TRX",
    color: "bg-[#FF0013]"
  },
  {
    label: "BITCOIN (BTC)",
    network: "Bitcoin Network",
    address: "3L4CWutLN8PRi6cMNBYVKgmtQTm9V1TQAa",
    symbol: "BTC",
    color: "bg-[#F7931A]"
  }
];

export const MOCK_DONORS: Donor[] = [
  { id: '1', name: 'فاعل خير من الكويت', date: 'منذ ساعتين' },
  { id: '2', name: 'Anonymous Donor', country: 'Germany', date: 'منذ 5 ساعات' },
  { id: '3', name: 'Samer A.', country: 'UAE', date: 'يوم أمس' },
  { id: '4', name: 'فاعل خير', date: 'يوم أمس' },
  { id: '5', name: 'Syrian Diaspora Group', country: 'USA', date: 'منذ يومين' },
  { id: '6', name: 'Laila K.', country: 'Lebanon', date: 'منذ 3 أيام' },
];

// تمت إزالة بيانات التقارير الميدانية
export const IMPACT_REPORTS: ImpactReport[] = [];

export const NAV_LINKS = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'عن الحملة', href: '#about' },
  { name: 'أين تذهب التبرعات؟', href: '#where' },
  { name: 'فاعلو الخير', href: '#donors' },
  { name: 'تبرع الآن', href: '#donate', primary: true },
];

export const AI_SYSTEM_INSTRUCTION = `
You are a compassionate, professional, and transparent AI assistant for the "Ghaouth Halab" (Aleppo Relief) humanitarian platform. 
Your goal is to answer donor questions about the campaign for the Sheikh Maqsoud neighborhood in Aleppo, Syria.
Current amount raised: $12,500. Target: $50,000. Focus: Winter Relief.
Respond in Arabic.
`;
