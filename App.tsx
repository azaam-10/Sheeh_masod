
import React, { useState, useEffect } from 'react';
import { 
  Heart, ShieldCheck, ArrowRight, Mail, MessageCircle, Package, 
  Stethoscope, Home as HomeIcon, GraduationCap, Moon, Sun, MapPin, 
  FileText, HeartHandshake, Snowflake, AlertTriangle, Flame, Camera 
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import CryptoCard from './components/CryptoCard.tsx';
import AnimatedCounter from './components/AnimatedCounter.tsx';
import ImpactChart from './components/ImpactChart.tsx';
import { CRYPTO_ADDRESSES, MOCK_DONORS, IMPACT_REPORTS, NAV_LINKS } from './constants.ts';
import { CRISIS_GALLERY } from './galleryData.ts';

type Tab = 'home' | 'about' | 'where' | 'impact' | 'donors' | 'contact';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showStickyDonate, setShowStickyDonate] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowStickyDonate(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fix: Handle navigation by checking the raw string before casting to Tab type to avoid type mismatch error
  const handleNavClick = (href: string) => {
    const tabName = href.replace('#', '');
    if (tabName === 'donate') {
      setActiveTab('home');
      setTimeout(() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      setActiveTab(tabName as Tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} />;
      case 'about': return <AboutView />;
      case 'where': return <WhereView />;
      case 'impact': return <ImpactView />;
      case 'donors': return <DonorsView />;
      case 'contact': return <ContactView />;
      default: return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar onNavClick={handleNavClick} activeTab={activeTab} />
      <main className="pt-20">{renderContent()}</main>
      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} pt-24 pb-12 border-t mt-20`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 text-2xl font-black mb-6">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <span>غوث حلب</span>
              </div>
              <p className="text-slate-500 leading-relaxed">منصة إنسانية تهدف لإيصال المساعدات مباشرة لأهالي حي الشيخ مقصود عبر العملات الرقمية.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <button onClick={() => handleNavClick(link.href)} className="text-slate-500 hover:text-rose-600 font-medium transition-colors">{link.name}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4 text-slate-500">
                <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-rose-500" /> support@halab-aid.org</li>
                <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-rose-500" /> تليجرام: @HalabAid</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">تنبيه</h4>
              <p className="text-sm text-slate-400 italic">المنصة تقبل العملات الرقمية فقط لضمان كسر الحصار المالي وإيصال المعونات بسرعة.</p>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 text-center text-slate-400 text-sm">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full border mb-6 hover:bg-slate-100 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <p>&copy; {new Date().getFullYear()} منصة غوث حلب. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
      {showStickyDonate && activeTab === 'home' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:hidden animate-fade-in-up">
          <button onClick={() => handleNavClick('#donate')} className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black shadow-2xl flex items-center justify-center gap-3">
            تبرع الآن <Heart className="w-5 h-5 fill-white" />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Views ---

const HomeView: React.FC<{ onDonateClick: () => void, onGalleryClick: () => void }> = ({ onDonateClick, onGalleryClick }) => (
  <div className="animate-fade-in-up">
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="تنزيل (2).jpeg" className="w-full h-full object-cover opacity-40 blur-[1px]" alt="Hero" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1540333063872-a415b2b5331f?q=80&w=2070&auto=format&fit=crop" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-slate-50/70 to-slate-50"></div>
      </div>
      <div className="container mx-auto px-4 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 text-rose-600 rounded-full font-bold text-sm mb-6 shadow-sm">
          <Flame className="w-4 h-4 fill-rose-600 animate-pulse" /> نداء عاجل: الشتاء لا يرحم أطفالنا
        </div>
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-6">ساعد أهالي حلب – <br /><span className="text-rose-600">الشيخ مقصود اليوم</span></h1>
        <p className="text-xl md:text-2xl text-slate-800 max-w-4xl mx-auto mb-10 font-semibold">تبرعك اليوم قد يكون سبباً في إنقاذ أسرة، توفير دواء، أو إطعام طفل يرتجف من البرد.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onDonateClick} className="px-12 py-6 bg-rose-600 text-white rounded-2xl text-2xl font-black hover:bg-rose-700 transition-all shadow-xl flex items-center gap-4">تبرع الآن <Heart className="w-6 h-6 fill-white" /></button>
          <button onClick={onGalleryClick} className="px-10 py-5 bg-white text-slate-700 rounded-2xl text-xl font-bold border-2 hover:bg-slate-50 transition-all flex items-center gap-3">شاهد الواقع الميداني <Camera className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl">
          <div className="text-center"><div className="text-3xl font-black text-rose-600"><AnimatedCounter end={12500} prefix="$" /></div><div className="text-sm font-bold text-slate-500">أثر التبرعات</div></div>
          <div className="text-center"><div className="text-3xl font-black text-rose-600"><AnimatedCounter end={450} suffix="+" /></div><div className="text-sm font-bold text-slate-500">أسرة تم إغاثتها</div></div>
          <div className="text-center"><div className="text-3xl font-black text-rose-600"><AnimatedCounter end={2800} /></div><div className="text-sm font-bold text-slate-500">وجبة دافئة</div></div>
          <div className="text-center"><div className="text-3xl font-black text-rose-600"><AnimatedCounter end={100} suffix="%" /></div><div className="text-sm font-bold text-slate-500">شفافية مطلقة</div></div>
        </div>
      </div>
    </section>
    {/* Grid of photos */}
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-black mb-12">معرض الألم والأمل</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CRISIS_GALLERY.slice(0, 15).map((img, i) => (
            <div key={i} className="rounded-2xl overflow-hidden aspect-square shadow-md group">
              <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt={img.title} onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${i}/400/400` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
    <section id="donate" className="py-24 bg-slate-900 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-black mb-6">ساهم في إنقاذهم الآن</h2>
        <p className="text-xl text-slate-300 mb-16">عبر العملات الرقمية، نضمن وصول 100% من تبرعك مباشرة للميدان.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CRYPTO_ADDRESSES.map((crypto, i) => <CryptoCard key={i} crypto={crypto} />)}
        </div>
      </div>
    </section>
  </div>
);

const AboutView = () => <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up"><h1 className="text-4xl font-black mb-8">عن حي الشيخ مقصود</h1><img src="تنزيل (11).jpeg" className="w-full max-w-4xl mx-auto rounded-[3rem] shadow-2xl mb-12" alt="Aleppo" /><p className="text-xl text-slate-600 leading-loose max-w-3xl mx-auto">حي الشيخ مقصود في حلب يعاني من حصار قاسي وظروف إنسانية صعبة جداً. نهدف من خلال هذه المنصة إلى كسر الحصار المالي وإيصال المساعدات بشكل مباشر وسريع.</p></div>;
const WhereView = () => <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up"><h1 className="text-4xl font-black mb-12">أين تذهب التبرعات؟</h1><div className="max-w-2xl mx-auto bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100"><ImpactChart /></div></div>;
const ImpactView = () => <div className="container mx-auto px-4 py-16 animate-fade-in-up"><h1 className="text-4xl font-black mb-12 text-center">الأثر والتقارير</h1><div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">{IMPACT_REPORTS.map(report => <div key={report.id} className="bg-white p-8 rounded-3xl shadow-lg border"> <h3 className="text-2xl font-bold mb-4">{report.title}</h3><p className="text-slate-600">{report.description}</p><span className="mt-4 block text-rose-600 font-bold">{report.date}</span></div>)}</div></div>;
const DonorsView = () => <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up"><h1 className="text-4xl font-black mb-12">لوحة فاعلي الخير</h1><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">{MOCK_DONORS.map(donor => <div key={donor.id} className="bg-white p-8 rounded-3xl shadow-md border font-bold text-xl">{donor.name}</div>)}</div></div>;
const ContactView = () => <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up"><h1 className="text-4xl font-black mb-8">تواصل معنا</h1><p className="text-xl text-slate-500 mb-8">لأية استفسارات أو لتأكيد التبرع، راسلنا على: support@halab-aid.org</p></div>;

export default App;
