
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Mail, 
  MessageCircle,
  Package,
  Stethoscope,
  Moon,
  Sun,
  Snowflake,
  AlertTriangle,
  Flame,
  Camera,
  Target
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import CryptoCard from './components/CryptoCard.tsx';
import ImpactChart from './components/ImpactChart.tsx';
import AIChat from './components/AIChat.tsx';
import { CRYPTO_ADDRESSES, MOCK_DONORS, IMPACT_REPORTS, NAV_LINKS, CAMPAIGN_TARGET, CURRENT_RAISED } from './constants.ts';
import { CRISIS_GALLERY } from './galleryData.ts';

type Tab = 'home' | 'about' | 'where' | 'impact' | 'donors' | 'contact';

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
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} isDarkMode={isDarkMode} />;
      case 'about':
        return <AboutView />;
      case 'where':
        return <WhereView />;
      case 'impact':
        return <ImpactView />;
      case 'donors':
        return <DonorsView />;
      case 'contact':
        return <ContactView />;
      default:
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`} dir="rtl">
      <Navbar onNavClick={handleNavClick} activeTab={activeTab} />
      
      <main className="pt-16 sm:pt-20">
        {renderContent()}
      </main>

      <AIChat />

      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} pt-16 pb-8 border-t mt-12`}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2 text-xl font-black mb-4">
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                <span>غوث حلب</span>
              </div>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                منصة إنسانية تهدف لإيصال المساعدات مباشرة لأهالي حي الشيخ مقصود عبر العملات الرقمية لضمان الشفافية.
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
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">تواصل مباشر</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-slate-500">
                  <Mail className="w-4 h-4 text-rose-500" />
                  support@halab-aid.org
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-500">
                  <MessageCircle className="w-4 h-4 text-rose-500" />
                  قناة التليجرام
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">تنبيه</h4>
              <p className="text-xs text-slate-400 leading-relaxed italic">
                نقبل التبرعات بالعملات الرقمية فقط. تأكد دائماً من صحة العنوان والشبكة قبل التحويل.
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
        <div className="fixed bottom-6 left-6 right-20 z-40 animate-fade-in-up md:hidden">
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
      {/* Hero Section */}
      <section className="relative h-[85vh] sm:h-[90vh] flex items-center overflow-hidden">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-rose-600 text-white rounded-full font-bold text-xs mb-6">
            <Flame className="w-3.5 h-3.5 fill-white animate-pulse" />
            استغاثة: شتاء حلب القارس
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.2] mb-4 drop-shadow-lg">
            أغيثوا أهالي حلب – <br />
            <span className="text-rose-500">الشيخ مقصود</span>
          </h1>
          
          <p className="text-base sm:text-xl text-slate-100 max-w-2xl mx-auto mb-8 font-medium px-4">
            برد الشتاء لا يرحم. تبرعك بالعملات الرقمية هو أسرع وسيلة لإيصال الدفء والغذاء للعائلات المحاصرة.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 px-4">
            <button 
              onClick={onDonateClick}
              className="px-8 py-4 bg-rose-600 text-white rounded-xl text-lg font-black hover:bg-rose-700 transition-all shadow-xl flex items-center justify-center gap-2"
            >
              تبرع الآن
              <Heart className="w-5 h-5 fill-white" />
            </button>
            <button 
              onClick={onGalleryClick}
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl text-lg font-bold border border-white/20 hover:bg-white/20 transition-all"
            >
              شاهد الواقع الميداني
            </button>
          </div>

          {/* Mini Stats Card */}
          <div className={`${isDarkMode ? 'bg-slate-800/80' : 'bg-white/95'} max-w-sm mx-auto p-5 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10`}>
             <div className="flex justify-between items-end mb-3">
                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase mb-1">تم جمع</span>
                  <span className="text-2xl font-black text-rose-600">${CURRENT_RAISED.toLocaleString()}</span>
                </div>
                <div className="text-left">
                  <span className="block text-[10px] text-slate-500 font-bold mb-1 uppercase text-left">الهدف</span>
                  <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>${CAMPAIGN_TARGET.toLocaleString()}</span>
                </div>
             </div>
             <div className="relative h-3 bg-slate-200/50 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 right-0 h-full bg-rose-600 transition-all duration-1000 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
             </div>
             <p className="mt-3 text-[11px] text-rose-600 font-black">وصلنا إلى {progressPercent}% من هدف الطوارئ</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">واقع يدمي القلوب</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm font-medium">صور حقيقية توثق معاناة أهالينا في حي الشيخ مقصود ومخيمات النزوح.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CRISIS_GALLERY.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group border border-slate-100">
                <img 
                  src={img.url} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  alt={img.title}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <p className="text-white text-xs font-bold leading-tight">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
               <div className="grid grid-cols-2 gap-4">
                  <img src="/detail-1.jpg" className="rounded-2xl shadow-xl aspect-video object-cover border-4 border-white" alt="Field 1" />
                  <img src="/detail-2.jpg" className="rounded-2xl shadow-xl aspect-video object-cover mt-8 border-4 border-white" alt="Field 2" />
               </div>
            </div>
            <div className="w-full lg:w-1/2 text-right">
              <h2 className="text-3xl font-black mb-6 leading-tight">بين الصقيع والركام..<br /><span className="text-rose-600">أنت أملهم الوحيد</span></h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium">
                بسبب الحصار، المساعدات التقليدية تتأخر. العملات الرقمية تتيح لنا شراء الاحتياجات فوراً من الداخل وتوزيعها على العائلات الأكثر تضرراً.
              </p>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <Snowflake className="w-6 h-6 text-blue-500" />
                    <span className="font-bold text-sm">تأمين وقود التدفئة والحطب</span>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    <span className="font-bold text-sm">توزيع وجبات ساخنة وسلال غذائية</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Cards */}
      <section id="donate" className="py-20 bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">تبرع بالكريبتو</h2>
          <p className="text-slate-400 mb-12 max-w-md mx-auto text-sm font-medium">اختر العملة المناسبة لك وانسخ العنوان للتحويل.</p>
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
      <h1 className="text-3xl font-black mb-8">عن منصة غوث حلب</h1>
      <div className="rounded-3xl overflow-hidden mb-8 shadow-xl relative aspect-video">
        <img 
          src="/about-main.jpg" 
          className="w-full h-full object-cover brightness-50" 
          alt="About" 
          onError={(e) => { e.currentTarget.src = '/gallery-2.jpg'; }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-6">
           <p className="text-white font-bold leading-relaxed text-sm sm:text-base text-right">
             نحن فريق من المتطوعين المستقلين نهدف لتسهيل وصول المساعدات لسكان حي الشيخ مقصود. نستخدم التكنولوجيا لخدمة الإنسانية وتجاوز العوائق المالية التقليدية.
           </p>
        </div>
      </div>
    </div>
  </div>
);

const WhereView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 text-center animate-fade-in-up">
    <h1 className="text-3xl font-black mb-8">شفافية توزيع التبرعات</h1>
    <div className="max-w-lg mx-auto bg-white p-6 rounded-3xl shadow-lg border border-slate-100 mb-12">
      <ImpactChart />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
       <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
          <Package className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
          <h3 className="font-black text-lg mb-2 text-slate-800">غذاء</h3>
          <p className="text-xs text-slate-600 font-bold">تأمين سلال غذائية متكاملة للأسر.</p>
       </div>
       <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
          <Stethoscope className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <h3 className="font-black text-lg mb-2 text-slate-800">صحة</h3>
          <p className="text-xs text-slate-600 font-bold">تغطية تكاليف الأدوية والحالات الطارئة.</p>
       </div>
       <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
          <Flame className="w-10 h-10 text-amber-600 mx-auto mb-4" />
          <h3 className="font-black text-lg mb-2 text-slate-800">دفء</h3>
          <p className="text-xs text-slate-600 font-bold">توفير مواد التدفئة في الشتاء.</p>
       </div>
    </div>
  </div>
);

const ImpactView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 animate-fade-in-up">
    <h1 className="text-3xl font-black mb-10 text-center">آخر النشاطات</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {IMPACT_REPORTS.map(report => (
        <div key={report.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group">
          <img src={report.imageUrl} className="w-full h-48 object-cover" alt={report.title} />
          <div className="p-6 text-right">
            <h3 className="text-xl font-black mb-3 text-slate-900">{report.title}</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed font-bold">{report.description}</p>
            <div className="flex justify-between items-center pt-4 border-t border-slate-50 text-[10px] font-black uppercase text-rose-600">
              <span>{report.date}</span>
              <span className="bg-rose-50 px-2 py-1 rounded">{report.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DonorsView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 text-center animate-fade-in-up">
    <h1 className="text-3xl font-black mb-10">فاعلو الخير</h1>
    <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
      {MOCK_DONORS.map(donor => (
        <div key={donor.id} className="bg-white px-6 py-4 rounded-xl shadow-sm border border-slate-100 font-bold text-sm flex items-center gap-3 text-slate-700">
           <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
           {donor.name}
        </div>
      ))}
    </div>
  </div>
);

const ContactView: React.FC = () => (
  <div className="container mx-auto px-6 py-12 text-center animate-fade-in-up">
    <h1 className="text-3xl font-black mb-8">تواصل معنا</h1>
    <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
       <p className="text-sm text-slate-600 mb-8 font-bold leading-relaxed">للاستفسارات المباشرة أو التطوع:</p>
       <a href="mailto:support@halab-aid.org" className="text-xl font-black text-rose-600 block hover:underline">
          support@halab-aid.org
       </a>
    </div>
  </div>
);

export default App;
