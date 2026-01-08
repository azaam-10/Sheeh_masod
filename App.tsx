
import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  Share2, 
  Mail, 
  MessageCircle,
  TrendingUp,
  History,
  Info,
  Package,
  Stethoscope,
  Home as HomeIcon,
  GraduationCap,
  Copy,
  Check,
  Moon,
  Sun,
  MapPin,
  FileText,
  HeartHandshake,
  Snowflake,
  AlertTriangle,
  Flame,
  Camera,
  Target
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import CryptoCard from './components/CryptoCard.tsx';
import AnimatedCounter from './components/AnimatedCounter.tsx';
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
      setShowStickyDonate(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const tabName = href.replace('#', '');
    if (tabName === 'donate') {
      setActiveTab('home');
      setTimeout(() => {
        document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
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
        return <AboutView isDarkMode={isDarkMode} />;
      case 'where':
        return <WhereView isDarkMode={isDarkMode} />;
      case 'impact':
        return <ImpactView isDarkMode={isDarkMode} />;
      case 'donors':
        return <DonorsView isDarkMode={isDarkMode} />;
      case 'contact':
        return <ContactView isDarkMode={isDarkMode} />;
      default:
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar onNavClick={handleNavClick} activeTab={activeTab} />
      
      <main className="pt-20">
        {renderContent()}
      </main>

      <AIChat />

      <footer className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} pt-24 pb-12 border-t mt-20`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 text-2xl font-black mb-6">
                <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                <span>غوث حلب</span>
              </div>
              <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-500'} leading-relaxed`}>
                منصة إنسانية مستقلة تهدف لإيصال المساعدات مباشرة لأهالي حي الشيخ مقصود في حلب عبر تقنية العملات الرقمية لضمان السرعة والشفافية.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <button 
                      onClick={() => handleNavClick(link.href)}
                      className={`${isDarkMode ? 'text-slate-400 hover:text-rose-400' : 'text-slate-500 hover:text-rose-600'} font-medium transition-colors`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">تواصل معنا</h4>
              <ul className="space-y-4">
                <li className={`flex items-center gap-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <Mail className="w-5 h-5 text-rose-500" />
                  support@halab-aid.org
                </li>
                <li className={`flex items-center gap-3 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  <MessageCircle className="w-5 h-5 text-rose-500" />
                  قناة التليجرام الرسمية
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6">تنبيه قانوني</h4>
              <p className="text-sm text-slate-400 leading-relaxed italic">
                هذه المنصة لا تقبل العملات الورقية التقليدية. يرجى التأكد من شبكة التحويل. جميع التبرعات نهائية وتستخدم للأغراض الإنسانية المذكورة.
              </p>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 text-center text-slate-400 text-sm">
            <div className="flex justify-center gap-4 mb-6">
               <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors">
                 {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5" />}
               </button>
            </div>
            &copy; {new Date().getFullYear()} منصة غوث حلب - الشيخ مقصود. جميع الحقوق محفوظة لأعمال الخير.
          </div>
        </div>
      </footer>

      {showStickyDonate && activeTab === 'home' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:hidden animate-fade-in-up">
          <button 
            onClick={() => handleNavClick('#donate')}
            className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-center shadow-2xl shadow-rose-200 flex items-center justify-center gap-3"
          >
            تبرع الآن وكن سببًا في إنقاذ حياة
            <Heart className="w-5 h-5 fill-white" />
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
      <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="hero-bg.jpg" 
            alt="Hero" 
            className="w-full h-full object-cover opacity-60 blur-[1px]"
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900' : 'bg-gradient-to-b from-slate-50/20 via-slate-50/70 to-slate-50'}`}></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 text-rose-600 rounded-full font-bold text-sm mb-6 shadow-sm">
            <Flame className="w-4 h-4 fill-rose-600 animate-pulse" />
            نداء إنساني عاجل: أنقذوهم من البرد والجوع
          </div>
          
          <h1 className={`text-4xl md:text-7xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-tight mb-6`}>
            ساعد أهالي حلب – <br />
            <span className="text-rose-600">الشيخ مقصود اليوم</span>
          </h1>
          
          <p className={`text-xl md:text-2xl ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} max-w-4xl mx-auto mb-10 leading-relaxed font-semibold`}>
            تبرعك اليوم قد يكون سبباً في إنقاذ أسرة، توفير دواء، أو إطعام طفل يرتجف من البرد. نحن نوصل مساعدتك مباشرة.
          </p>

          <div className={`${isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white/60 border-white'} max-w-xl mx-auto mb-12 backdrop-blur-md p-6 rounded-3xl border shadow-xl`}>
             <div className="flex justify-between items-end mb-3">
                <div className="text-right">
                  <span className="block text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">تم جمع</span>
                  <span className="text-3xl font-black text-rose-600">${CURRENT_RAISED.toLocaleString()}</span>
                </div>
                <div className="text-left">
                  <span className="block text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider text-left">الهدف الكلي</span>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>${CAMPAIGN_TARGET.toLocaleString()}</span>
                </div>
             </div>
             <div className="relative h-4 bg-slate-200/30 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 right-0 h-full bg-gradient-to-l from-rose-500 to-rose-400 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
                </div>
             </div>
             <div className="mt-3 flex items-center justify-center gap-2 text-rose-600 font-bold text-sm">
                <Target className="w-4 h-4" />
                <span>وصلنا إلى {progressPercent}% من هدف الشتاء</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onDonateClick}
              className="px-12 py-6 bg-rose-600 text-white rounded-2xl text-2xl font-black hover:bg-rose-700 transition-all shadow-2xl flex items-center gap-4 group hover:scale-105"
            >
              تبرع الآن وكن سببًا في إنقاذ حياة
              <Heart className="w-6 h-6 fill-white" />
            </button>
            <button 
              onClick={onGalleryClick}
              className={`${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-700 border-slate-200'} px-10 py-5 rounded-2xl text-xl font-bold border-2 hover:bg-opacity-80 transition-all inline-flex items-center gap-3`}
            >
              شاهد الواقع الميداني
              <Camera className="w-5 h-5" />
            </button>
          </div>

          <div className={`${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-white'} grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto p-8 backdrop-blur-md rounded-[3rem] shadow-2xl border`}>
            {[
              { label: 'أثر التبرعات بالدولار', end: CURRENT_RAISED, prefix: '$' },
              { label: 'أسرة تم إغاثتها', end: 450, suffix: '+' },
              { label: 'وجبة دافئة تم تقديمها', end: 2800 },
              { label: 'ثقة وشفافية مطلقة', end: 100, suffix: '%' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-rose-600 mb-1">
                  <AnimatedCounter end={stat.end} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-24 ${isDarkMode ? 'bg-slate-900' : 'bg-white'} overflow-hidden`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>معرض الألم والأمل</h2>
          <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-lg">مشاهد من واقع حي الشيخ مقصود الذي يصارع البقاء وسط أنقاض الدمار وبرد الشتاء.</p>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {CRISIS_GALLERY.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-2xl shadow-lg break-inside-avoid">
                <img 
                  src={img.url} 
                  className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                  alt={img.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <p className="text-white text-sm font-bold text-right w-full">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-24 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src="detail-1.jpg" className="rounded-2xl shadow-lg h-64 w-full object-cover" alt="Detail 1" />
                  <img src="detail-2.jpg" className="rounded-2xl shadow-lg mt-8 h-64 w-full object-cover" alt="Detail 2" />
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className={`text-4xl font-black mb-8 leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>بين البرد القارس والركام.. <br /><span className="text-rose-600">هناك من ينتظرك</span></h2>
              <p className={`text-lg leading-relaxed mb-8 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                المعاناة هنا ليست مجرد أرقام، بل هي قصص حية لأسر فقدت بيوتها، وتعيش الآن في ظروف قاسية لا تقيهم برد الشتاء. نحن نسابق الزمن لتأمين التدفئة والغذاء.
              </p>
              <div className="flex flex-wrap gap-4">
                 <div className={`${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-700 border-slate-100'} flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow-sm border`}>
                    <Snowflake className="w-5 h-5 text-blue-500" />
                    برد الشتاء القارس
                 </div>
                 <div className={`${isDarkMode ? 'bg-slate-700 text-white border-slate-600' : 'bg-white text-slate-700 border-slate-100'} flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow-sm border`}>
                    <Package className="w-5 h-5 text-emerald-500" />
                    نقص حاد في الغذاء
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="donate" className="py-24 bg-slate-900 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">ساهم في إنقاذهم الآن</h2>
          <p className="text-slate-400 mb-16 max-w-xl mx-auto">اختر العملة الرقمية المناسبة لك وقم بالتحويل مباشرة لدعم العائلات المحتاجة.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {CRYPTO_ADDRESSES.map((crypto, i) => (
              <CryptoCard key={i} crypto={crypto} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const AboutView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className={`text-4xl font-black mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>عن حي الشيخ مقصود</h1>
      <img 
        src="about-main.jpg" 
        className="w-full h-[450px] object-cover rounded-[3rem] shadow-2xl mb-12" 
        alt="Aleppo About" 
      />
      <div className={`prose prose-lg max-w-none leading-loose mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
        <p className="text-xl">
          يعاني حي الشيخ مقصود في مدينة حلب من ظروف إنسانية بالغة الصعوبة نتيجة سنوات من الحصار ونقص الخدمات الأساسية. هذه المنصة أُنشئت لتكون وسيلة آمنة وسريعة لتقديم الدعم المباشر للعائلات المحتاجة.
        </p>
      </div>
    </div>
  </div>
);

const WhereView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
    <h1 className={`text-4xl font-black mb-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>أين تذهب التبرعات؟</h1>
    <div className={`${isDarkMode ? 'bg-slate-800' : 'bg-white'} max-w-2xl mx-auto p-10 rounded-[3rem] shadow-xl border border-slate-100/10 mb-12`}>
      <ImpactChart />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
       <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-emerald-50 border-emerald-100'} p-8 rounded-3xl border`}>
          <Package className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
          <h3 className={`font-bold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>الغذاء</h3>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>توفير سلال غذائية متكاملة للأسر</p>
       </div>
       <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-blue-50 border-blue-100'} p-8 rounded-3xl border`}>
          <Stethoscope className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className={`font-bold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>الدواء</h3>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>تأمين الأدوية والمستلزمات الطبية</p>
       </div>
       <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-amber-50 border-amber-100'} p-8 rounded-3xl border`}>
          <Flame className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className={`font-bold text-xl mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>التدفئة</h3>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>تأمين الحطب والوقود للشتاء</p>
       </div>
    </div>
  </div>
);

const ImpactView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <h1 className={`text-4xl font-black mb-12 text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>الأثر والتقارير الميدانية</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {IMPACT_REPORTS.map(report => (
        <div key={report.id} className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} p-8 rounded-3xl shadow-lg border overflow-hidden`}>
          <div className="h-48 mb-6 overflow-hidden rounded-2xl">
             <img src={report.imageUrl} className="w-full h-full object-cover" alt={report.title} />
          </div>
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{report.title}</h3>
          <p className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-lg mb-4`}>{report.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-rose-600 font-bold">{report.date}</span>
            <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase">{report.category}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DonorsView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
    <h1 className={`text-4xl font-black mb-12 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>لوحة فاعلي الخير</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {MOCK_DONORS.map(donor => (
        <div key={donor.id} className={`${isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-800'} p-8 rounded-3xl shadow-md border font-bold text-xl flex items-center justify-center gap-3 hover:shadow-lg transition-shadow`}>
           <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> {donor.name}
        </div>
      ))}
    </div>
  </div>
);

const ContactView: React.FC<{ isDarkMode: boolean }> = ({ isDarkMode }) => (
  <div className="container mx-auto px-4 py-16 text-center animate-fade-in-up">
    <h1 className={`text-4xl font-black mb-8 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>تواصل معنا</h1>
    <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'} max-w-2xl mx-auto p-12 rounded-[3rem] shadow-xl border`}>
       <p className={`text-xl mb-8 font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>لأية استفسارات حول الحملة أو آلية التبرع، يرجى مراسلتنا:</p>
       <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 text-2xl font-bold text-rose-600">
             <Mail className="w-6 h-6" /> support@halab-aid.org
          </div>
          <p className="text-slate-400 italic mt-6">سيتم الرد عليكم في أقرب وقت ممكن من قبل الفريق الميداني.</p>
       </div>
    </div>
  </div>
);

export default App;
