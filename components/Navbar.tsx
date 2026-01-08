
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { NAV_LINKS } from '../constants.ts';

interface NavbarProps {
  onNavClick: (href: string) => void;
  activeTab: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeTab }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // نضاعف الروابط مرتين لضمان حلقة تكرار لا نهائية سلسة
  const doubledLinks = [...NAV_LINKS, ...NAV_LINKS];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-4 overflow-hidden">
        {/* Logo Section */}
        <div className="flex justify-center mb-3">
          <button 
            onClick={() => onNavClick('#home')} 
            className="flex items-center gap-2 text-xl font-black text-slate-900 group"
          >
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform" />
            <span>غوث حلب</span>
          </button>
        </div>

        {/* Infinite Marquee Strip */}
        <div className="relative w-full overflow-hidden py-2 group-marquee">
          {/* Fading Mask for smooth entry/exit */}
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          
          <div className="marquee-track flex items-center gap-4 w-max hover:pause-marquee">
            {doubledLinks.map((link, index) => (
              <button
                key={`${link.name}-${index}`}
                onClick={() => onNavClick(link.href)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-black transition-all whitespace-nowrap border-2 ${
                  link.primary 
                  ? 'bg-rose-600 text-white border-rose-600 shadow-lg shadow-rose-100' 
                  : (activeTab === link.href.replace('#', '') 
                      ? 'bg-rose-50 text-rose-600 border-rose-200' 
                      : 'bg-slate-50 text-slate-600 border-slate-100 hover:border-rose-300 hover:text-rose-600')
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%); /* نتحرك بمقدار النصف لأن القائمة مكررة */
          }
        }

        .marquee-track {
          display: flex;
          animation: marquee 20s linear infinite;
        }

        /* توقف الحركة عند الوقوف بالفأرة لسهولة الضغط */
        .hover:pause-marquee:hover {
          animation-play-state: paused;
        }

        /* لضمان الاتجاه الصحيح للغة العربية (RTL) */
        [dir="rtl"] .marquee-track {
          animation: marquee-rtl 25s linear infinite;
        }

        @keyframes marquee-rtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }
          
        /* إخفاء شريط التمرير الافتراضي */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
