
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Package, 
  Stethoscope, 
  Moon, 
  Sun, 
  Snowflake, 
  AlertTriangle, 
  Flame, 
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import CryptoCard from './components/CryptoCard.tsx';
import ImpactChart from './components/ImpactChart.tsx';
import AIChat from './components/AIChat.tsx';
import Gallery3D from './components/Gallery3D.tsx';
import { CRYPTO_ADDRESSES, MOCK_DONORS, NAV_LINKS, CAMPAIGN_TARGET, CURRENT_RAISED } from './constants.ts';

type Tab = 'home' | 'about' | 'where' | 'donors';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showStickyDonate, setShowStickyDonate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyDonate(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const tabName = href.replace('#', '');
    if (tabName === 'donate') {
      setActiveTab('home');
      setTimeout(() => {
        const el = document.getElementById('donate');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setActiveTab(tabName as Tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => {
          const el = document.getElementById('gallery');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} isDarkMode={isDarkMode} />;
      case 'about':
        return <AboutView />;
      case 'where':
        return <WhereView />;
      case 'donors':
        return <DonorsView />;
      default:
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => {}} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      <Navbar onNavClick={handleNavClick} activeTab={activeTab} />
      
      <main className="pt-28 sm:pt-32">
        {renderContent()}
      </main>

      <AIChat />

      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} pt-16 pb-8 border-t mt-12`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xl font-black mb-4">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <span>غوث حلب</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                منصة إنسانية مستقلة تهدف لتأمين الاحتياجات الأساسية لسكان حي الشيخ مقصود عبر العملات الرقمية لضمان كسر الحصار.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">روابط سريعة</h4>
              <ul className="space-y-3">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <button 
                      onClick={() => handleNavClick(link.href)}
                      className={`text-sm ${isDarkMode ? 'text-slate-400 hover:text-rose-400' : 'text-slate-500 hover:text-rose-600'} transition-colors`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">تنبيه قانوني</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                نقبل التبرعات بالعملات الرقمية فقط. تبرعك يساهم في تأمين الغذاء والدفء بشكل مباشر للأسر الأكثر تضرراً.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <p className="text-[10px] text-slate-400 font-bold">
              &copy; {new Date().getFullYear()} غوث حلب - حي الشيخ مقصود
            </p>
          </div>
        </div>
      </footer>

      {showStickyDonate && activeTab === 'home' && (
        <div className="fixed bottom-6 left-6 right-24 z-40 animate-fade-in-up md:hidden">
          <button 
            onClick={() => handleNavClick('#donate')}
            className="w-full py-3 bg-rose-600 text-white rounded-xl font-black text-sm shadow-xl flex items-center justify-center gap-2"
          >
            تبرع الآن وأنقذ حياة
            <Heart className="w-4 h-4 fill-white" />
          </button>
        </div>
      )}
    </div>
  );
};

const HomeView: React.FC<{ onDonateClick: () => void, onGalleryClick: () => void, isDarkMode: boolean }> = ({ onDonateClick, onGalleryClick, isDarkMode }) => {
  const progressPercent = Math.round((CURRENT_RAISED / CAMPAIGN_TARGET) * 100);

  return (
    <div className="animate-fade-in-up">
      <section className="relative h-[75vh] sm:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-bg.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover object-center"
            onError={(e) => { e.currentTarget.src = '/gallery-1.jpg'; }}
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-black/40'}`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-600 text-white rounded-full font-bold text-[10px] sm:text-xs mb-6">
            <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
            استغاثة: شتاء حلب القارس
          </div>
          
          <h1 className="text-2xl sm:text-5xl md:text-7xl font-black text-white leading-[1.2] mb-4 drop-shadow-lg">
            أغيثوا أهالي حلب – <br />
            <span className="text-rose-500">الشيخ مقصود</span>
          </h1>
          
          <p className="text-sm sm:text-xl text-slate-100 max-w-2xl mx-auto mb-8 font-medium px-4">
            برد الشتاء لا يرحم. تبرعك بالعملات الرقمية هو أسرع وسيلة لإيصال الدفء والغذاء للعائلات المحاصرة.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 px-4">
            <button 
              onClick={onDonateClick}
              className="px-8 py-3.5 bg-rose-600 text-white rounded-xl text-base font-black hover:bg-rose-700 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              تبرع الآن
              <Heart className="w-5 h-5 fill-white" />
            </button>
            <button 
              onClick={onGalleryClick}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-3.5 rounded-xl text-base font-bold border border-white/20 hover:bg-white/20 transition-all"
            >
              شاهد الواقع الميداني
            </button>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800/80' : 'bg-white/95'} max-w-sm mx-auto p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10`}>
             <div className="flex justify-between items-end mb-2">
                <div className="text-right">
                  <span className="block text-[8px] text-slate-500 font-bold uppercase mb-1">تم جمع</span>
                  <span className="text-xl font-black text-rose-600">${CURRENT_RAISED.toLocaleString()}</span>
                </div>
                <div className="text-left">
                  <span className="block text-[8px] text-slate-500 font-bold mb-1 uppercase text-left">الهدف</span>
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>${CAMPAIGN_TARGET.toLocaleString()}</span>
                </div>
             </div>
             <div className="relative h-2.5 bg-slate-200/50 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 right-0 h-full bg-rose-600 transition-all duration-1000 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
             <p className="mt-2 text-[10px] text-rose-600 font-black">وصلنا إلى {progressPercent}% من هدف الطوارئ</p>
          </div>
        </div>
      </section>

      {/* Gallery Section with New 3D Component */}
      <section id="gallery" className="bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6 pt-16">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-black mb-3 text-white">واقع يدمي القلوب</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-xs font-medium leading-relaxed italic">صور حقيقية توثق معاناة أهالينا وصمودهم رغم الحصار.</p>
          </div>
        </div>
        <Gallery3D />
      </section>

      <section className={`py-12 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-2xl font-black mb-6 leading-tight">بين الصقيع والركام..<br /><span className="text-rose-600">أنت أملهم الوحيد</span></h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium">
              بسبب الحصار، المساعدات التقليدية تواجه عوائق كبيرة. العملات الرقمية تتيح لنا تأمين الاحتياجات بشكل أسرع وأكثر أماناً.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-right">
               <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <Snowflake className="w-5 h-5 text-blue-500" />
                  <span className="font-bold text-xs">مواجهة صقيع الشتاء القارس</span>
               </div>
               <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span className="font-bold text-xs">تأمين الغذاء والدواء الضروري</span>
               </div>
            </div>
        </div>
      </section>

      <section id="donate" className="py-16 bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">تبرع بالكريبتو</h2>
          <p className="text-slate-400 mb-10 max-w-md mx-auto text-xs font-medium">اختر العملة المناسبة لك وانسخ العنوان للتحويل المباشر.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {CRYPTO_ADDRESSES.map((crypto, i) => (
              <CryptoCard key={i} crypto={crypto} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 animate-fade-in-up">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-2xl font-black mb-6">عن منصة غوث حلب</h1>
      <div className="rounded-2xl overflow-hidden mb-8 shadow-xl relative aspect-video">
        <img 
          src="/about-main.jpg" 
          className="w-full h-full object-cover brightness-50" 
          alt="About" 
          onError={(e) => { e.currentTarget.src = '/gallery-2.jpg'; }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
           <p className="text-white font-bold leading-relaxed text-xs sm:text-base">
             هذه المنصة مبادرة إنسانية تهدف لتسهيل وصول المساعدات لسكان حي الشيخ مقصود. نعتمد التكنولوجيا لخدمة الإنسانية وضمان وصول كل تبرع لمستحقيه.
           </p>
        </div>
      </div>
    </div>
  </div>
);

const WhereView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 text-center animate-fade-in-up">
    <h1 className="text-2xl font-black mb-6">كيف نوزع التبرعات؟</h1>
    <div className="max-w-xs mx-auto bg-white p-4 rounded-3xl shadow-lg border border-slate-100 mb-10">
      <ImpactChart />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-right">
       <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <Package className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="font-black text-sm mb-1 text-slate-800">الغذاء</h3>
          <p className="text-[10px] text-slate-600 font-bold">تأمين المواد الغذائية الأساسية.</p>
       </div>
       <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
          <Stethoscope className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="font-black text-sm mb-1 text-slate-800">الصحة</h3>
          <p className="text-[10px] text-slate-600 font-bold">تغطية تكاليف الأدوية والاحتياجات الطبية.</p>
       </div>
       <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <Flame className="w-8 h-8 text-amber-600 mb-3" />
          <h3 className="font-black text-sm mb-1 text-slate-800">التدفئة</h3>
          <p className="text-[10px] text-slate-600 font-bold">توفير مواد التدفئة في الشتاء.</p>
       </div>
    </div>
  </div>
);

const DonorsView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 text-center animate-fade-in-up">
    <h1 className="text-2xl font-black mb-8">فاعلو الخير</h1>
    <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
      {MOCK_DONORS.map(donor => (
        <div key={donor.id} className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-slate-100 font-bold text-[10px] flex items-center gap-2 text-slate-700">
           <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
           {donor.name}
        </div>
      ))}
    </div>
  </div>
);

export default App;
