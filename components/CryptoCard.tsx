
import React, { useState } from 'react';
import { Copy, Check, QrCode } from 'lucide-react';
import { CryptoAddress } from '../types.ts';

interface CryptoCardProps {
  crypto: CryptoAddress;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(crypto.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${crypto.address}`;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-2 h-full ${crypto.color}`}></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">{crypto.label}</h3>
          <p className="text-sm text-slate-500 mt-1">{crypto.network}</p>
        </div>
        <button 
          onClick={() => setShowQR(!showQR)}
          className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          title="عرض رمز QR"
        >
          <QrCode className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <div className="bg-slate-50 p-3 rounded-xl break-all font-mono text-sm text-slate-700 mb-4 border border-slate-100 select-all">
        {crypto.address}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'تم النسخ' : 'نسخ العنوان'}
        </button>
      </div>

      {showQR && (
        <div className="mt-4 flex flex-col items-center animate-fade-in-up">
          <img src={qrUrl} alt="QR Code" className="w-32 h-32 mb-2 p-2 bg-white border rounded-lg" />
          <p className="text-xs text-slate-400">امسح الكود للتبرع مباشرة</p>
        </div>
      )}

      <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
        <p className="text-[11px] text-amber-700 leading-relaxed">
          <strong>تنبيه:</strong> يرجى إرسال {crypto.symbol} فقط عبر شبكة {crypto.network}. إرسال أي عملة أخرى قد يؤدي لفقدانها.
        </p>
      </div>
    </div>
  );
};

export default CryptoCard;
