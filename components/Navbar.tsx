
import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';
import { NAV_LINKS } from '../constants.ts';

interface NavbarProps {
  onNavClick: (href: string) => void;
  activeTab: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <button onClick={() => onNavClick('#home')} className="flex items-center gap-2 text-2xl font-black text-slate-900">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span className="hidden sm:inline">غوث حلب</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.name}
              onClick={() => onNavClick(link.href)}
              className={`font-bold transition-all relative py-2 ${
                link.primary 
                ? 'px-6 py-2.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-lg shadow-rose-100 ml-2' 
                : (activeTab === link.href.replace('#', '') 
                    ? 'text-rose-600 after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-rose-600' 
                    : 'text-slate-600 hover:text-rose-600')
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl animate-fade-in-up">
          <div className="flex flex-col p-4 gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                   onNavClick(link.href);
                   setIsOpen(false);
                }}
                className={`text-lg font-bold p-4 rounded-2xl transition-colors text-right flex justify-between items-center ${
                  link.primary 
                  ? 'bg-rose-600 text-white' 
                  : (activeTab === link.href.replace('#', '') ? 'bg-rose-50 text-rose-600' : 'text-slate-700 hover:bg-slate-50')
                }`}
              >
                {link.name}
                <ArrowIcon active={activeTab === link.href.replace('#', '')} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const ArrowIcon = ({ active }: { active: boolean }) => (
  <svg className={`w-4 h-4 transition-transform ${active ? 'translate-x-[-4px]' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default Navbar;
