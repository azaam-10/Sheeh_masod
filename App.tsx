
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
                <li className="flex items-center gap-3 text-slate-500">
                  <Mail className="w-5 h-5 text-rose-500" />
                  support@halab-aid.org
                </li>
                <li className="flex items-center gap-3 text-slate-500">
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
                 {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
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
            src="./hero-bg.jpg" 
            alt="Hero Syrian Child" 
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-slate-900' : 'bg-gradient-to-b from-black/50 via-black/20 to-slate-50/20'}`}></div>
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-600/90 text-white rounded-full font-bold text-sm mb-6 shadow-xl border border-white/20 backdrop-blur-md">
            <Flame className="w-4 h-4 fill-white animate-pulse" />
            نداء استغاثة: شتاء حلب القارس
          </div>
          
          <h1 className="text-4xl md:text-8xl font-black text-white leading-tight mb-6 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            ساعد أهالي حلب – <br />
            <span className="text-rose-500">الشيخ مقصود اليوم</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-white max-w-4xl mx-auto mb-10 leading-relaxed font-black drop-shadow-md">
            تبرعك المباشر بالعملات الرقمية هو أسرع وسيلة لإيصال الدفء والغذاء لأطفال يواجهون الموت من البرد.
          </p>

          <div className={`${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'} max-w-xl mx-auto mb-12 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20 shadow-2xl`}>
             <div className="flex justify-between items-end mb-4">
                <div className="text-right">
                  <span className="block text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider">تم جمع</span>
                  <span className="text-4xl font-black text-rose-600">${CURRENT_RAISED.toLocaleString()}</span>
                </div>
                <div className="text-left">
                  <span className="block text-xs text-slate-500 font-bold mb-1 uppercase tracking-wider text-left">الهدف الكلي</span>
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>${CAMPAIGN_TARGET.toLocaleString()}</span>
                </div>
             </div>
             <div className="relative h-5 bg-slate-200/40 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 right-0 h-full bg-gradient-to-l from-rose-600 to-rose-400 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[progress-bar-stripes_1s_linear_infinite]"></div>
                </div>
             </div>
             <div className="mt-4 flex items-center justify-center gap-2 text-rose-600 font-black text-sm uppercase">
                <Target className="w-5 h-5" />
                <span>وصلنا إلى {progressPercent}% من هدف الطوارئ</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onDonateClick}
              className="px-12 py-6 bg-rose-600 text-white rounded-2xl text-2xl font-black hover:bg-rose-700 transition-all shadow-2xl flex items-center gap-4 group hover:scale-105 active:scale-95"
            >
              تبرع الآن وأنقذ حياة
              <Heart className="w-6 h-6 fill-white" />
            </button>
            <button 
              onClick={onGalleryClick}
              className="bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-2xl text-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all inline-flex items-center gap-3 shadow-lg"
            >
              شاهد الواقع الميداني
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className={`py-32 ${isDarkMode ? 'bg-slate-950' : 'bg-white'} overflow-hidden`}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-black mb-6">واقع يدمي القلوب</h2>
          <p className="text-slate-500 mb-16 max-w-3xl mx-auto text-xl leading-relaxed font-bold">صور حقيقية من حي الشيخ مقصود ومخيمات النزوح، حيث يصارع الآلاف من أجل البقاء.</p>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {CRISIS_GALLERY.map((img, i) => (
              <div key={i} className="relative group overflow-hidden rounded-[2rem] shadow-2xl break-inside-avoid border-4 border-white/10">
                <img 
                  src={img.url} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-500" 
                  alt={img.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 text-right">
                   <p className="text-white text-lg font-black leading-tight w-full">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-32 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-100'} relative overflow-hidden`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/2 relative">
               <div className="grid grid-cols-2 gap-6">
                  <img src="./detail-1.jpg" className="rounded-[2.5rem] shadow-2xl h-80 w-full object-cover border-8 border-white" alt="Field 1" />
                  <img src="./detail-2.jpg" className="rounded-[2.5rem] shadow-2xl mt-12 h-80 w-full object-cover border-8 border-white" alt="Field 2" />
               </div>
               <div className="absolute -bottom-6 -left-6 bg-rose-600 text-white p-6 rounded-3xl shadow-2xl font-black text-2xl animate-bounce">
                 رسالة من الميدان
               </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-black mb-8 leading-tight">بين صقيع الشتاء <br />وركـام المـنازل.. <br /><span className="text-rose-600 underline">أنت أملهم الوحيد</span></h2>
              <p className="text-2xl text-slate-500 leading-relaxed mb-10 font-black">
                حي الشيخ مقصود يعاني من حصار يمنع وصول أبسط المساعدات التقليدية. العملات الرقمية هي وسيلتنا الوحيدة لكسر القيود وإيصال الغذاء والتدفئة للأطفال.
              </p>
              <div className="flex flex-wrap gap-6">
                 <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} flex items-center gap-3 px-6 py-4 rounded-2xl font-black shadow-xl border border-slate-200/10`}>
                    <Snowflake className="w-6 h-6 text-blue-500" />
                    برد ينهش العظام
                 </div>
                 <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'} flex items-center gap-3 px-6 py-4 rounded-2xl font-black shadow-xl border border-slate-200/10`}>
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    خطر المجاعة
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="donate" className="py-32 bg-slate-950 relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600 rounded-full blur-[150px]"></div>
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">تبرع الآن بالكريبتو</h2>
          <p className="text-slate-400 mb-20 max-w-2xl mx-auto text-2xl font-black">وسيلة تبرع آمنة وسريعة تصل مباشرة لمن يحتاجها في حلب.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
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
  <div className="container mx-auto px-4 py-24 animate-fade-in-up">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-5xl font-black mb-12">عن حملة الشيخ مقصود</h1>
      <div className="relative mb-16 group">
        <img 
          src="./about-main.jpg" 
          className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl filter brightness-75 group-hover:brightness-90 transition-all" 
          alt="About" 
        />
        <div className="absolute inset-0 flex items-center justify-center p-12">
           <div className="bg-black/60 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 max-w-3xl">
              <p className="text-2xl text-white font-black leading-relaxed text-right">
                هذه المنصة مبادرة إنسانية تهدف لتأمين الاحتياجات الأساسية لسكان حي الشيخ مقصود في حلب. نعتمد العملات الرقمية لضمان سرعة التحويل وتجاوز العقبات البنكية، لضمان وصول كل دولار لفاعله الحقيقي.
              </p>
           </div>
        </div>
      </div>
    </div>
  </div>
);

const WhereView: React.FC = () => (
  <div className="container mx-auto px-4 py-24 text-center animate-fade-in-up">
    <h1 className="text-5xl font-black mb-16">أين تذهب تبرعاتك؟</h1>
    <div className="max-w-3xl mx-auto bg-white p-16 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 mb-16">
      <ImpactChart />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
       <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 shadow-xl">
          <Package className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h3 className="font-black text-2xl mb-4 text-slate-800">سلال غذائية</h3>
          <p className="text-slate-600 text-lg font-bold">تأمين الغذاء للأطفال والأرامل.</p>
       </div>
       <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 shadow-xl">
          <Stethoscope className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h3 className="font-black text-2xl mb-4 text-slate-800">مستلزمات طبية</h3>
          <p className="text-slate-600 text-lg font-bold">أدوية وحالات طارئة لسكان الحي.</p>
       </div>
       <div className="p-10 bg-amber-50 rounded-[3rem] border border-amber-100 shadow-xl">
          <Flame className="w-16 h-16 text-amber-600 mx-auto mb-6" />
          <h3 className="font-black text-2xl mb-4 text-slate-800">دفء الشتاء</h3>
          <p className="text-slate-600 text-lg font-bold">الحطب والمحروقات والمدافئ للأسر.</p>
       </div>
    </div>
  </div>
);

const ImpactView: React.FC = () => (
  <div className="container mx-auto px-4 py-24 animate-fade-in-up">
    <h1 className="text-5xl font-black mb-16 text-center">تقارير الميدان</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {IMPACT_REPORTS.map(report => (
        <div key={report.id} className="bg-white rounded-[3.5rem] shadow-2xl border border-slate-100 overflow-hidden group">
          <div className="h-72 overflow-hidden">
             <img src={report.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={report.title} />
          </div>
          <div className="p-10 text-right">
            <h3 className="text-3xl font-black mb-6 text-slate-900">{report.title}</h3>
            <p className="text-slate-500 text-xl mb-8 leading-relaxed font-black">{report.description}</p>
            <div className="flex justify-between items-center pt-8 border-t border-slate-100">
              <span className="text-rose-600 font-black text-xl">{report.date}</span>
              <span className="px-5 py-2 bg-rose-50 text-rose-600 rounded-2xl text-sm font-black uppercase">{report.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DonorsView: React.FC = () => (
  <div className="container mx-auto px-4 py-24 text-center animate-fade-in-up">
    <h1 className="text-5xl font-black mb-16">جدار الإنسانية</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
      {MOCK_DONORS.map(donor => (
        <div key={donor.id} className="bg-white p-12 rounded-[3rem] shadow-xl border border-slate-100 font-black text-2xl flex items-center justify-center gap-4 hover:shadow-2xl transition-all hover:-translate-y-2 text-slate-800">
           <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
             <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
           </div>
           {donor.name}
        </div>
      ))}
    </div>
  </div>
);

const ContactView: React.FC = () => (
  <div className="container mx-auto px-4 py-24 text-center animate-fade-in-up">
    <h1 className="text-5xl font-black mb-12">تواصل معنا</h1>
    <div className="max-w-3xl mx-auto bg-white p-20 rounded-[4rem] shadow-2xl border border-slate-100">
       <p className="text-2xl text-slate-600 mb-12 font-black leading-relaxed">لأي استفسار عن حالة الأسر أو الحملة، راسلنا مباشرة:</p>
       <div className="space-y-6">
          <a href="mailto:support@halab-aid.org" className="flex items-center justify-center gap-4 text-3xl font-black text-rose-600 hover:scale-105 transition-transform">
             <Mail className="w-10 h-10" /> support@halab-aid.org
          </a>
       </div>
    </div>
  </div>
);

export default App;
