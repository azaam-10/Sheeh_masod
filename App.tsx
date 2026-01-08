
import React, { useState, useEffect, useMemo } from 'react';
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
  Camera
} from 'lucide-react';
import Navbar from './components/Navbar';
import CryptoCard from './components/CryptoCard';
import AnimatedCounter from './components/AnimatedCounter';
import ImpactChart from './components/ImpactChart';
import { CRYPTO_ADDRESSES, MOCK_DONORS, IMPACT_REPORTS, NAV_LINKS } from './constants';
import { CRISIS_GALLERY } from './galleryData';

type Tab = 'home' | 'about' | 'where' | 'impact' | 'donors' | 'contact' | 'donate';

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
    const tab = href.replace('#', '') as Tab;
    setActiveTab(tab === 'donate' ? 'home' : tab);
    if (tab === 'donate') {
       setTimeout(() => {
         document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    } else {
       window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} />;
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
        return <HomeView onDonateClick={() => handleNavClick('#donate')} onGalleryClick={() => handleNavClick('#impact')} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-['Cairo'] ${isDarkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Navbar onNavClick={handleNavClick} activeTab={activeTab} />
      
      <main className="pt-20">
        {renderContent()}
      </main>

      {/* Footer */}
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

      {/* Sticky Mobile Donate Button */}
      {showStickyDonate && activeTab === 'home' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full px-6 md:hidden animate-fade-in-up">
          <a 
            href="#donate" 
            className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black text-center shadow-2xl shadow-rose-200 flex items-center justify-center gap-3"
          >
            تبرع الآن وكن سببًا في إنقاذ حياة
            <Heart className="w-5 h-5 fill-white" />
          </a>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); }
        }
      `}</style>
    </div>
  );
};

// --- Sub-Views for SPA Tabs ---

const HomeView: React.FC<{ onDonateClick: () => void, onGalleryClick: () => void }> = ({ onDonateClick, onGalleryClick }) => (
  <div className="animate-fade-in-up">
    {/* Hero */}
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="تنزيل (2).jpeg" 
          alt="Refugee children warming hands" 
          className="w-full h-full object-cover opacity-40 blur-[1px]"
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1540333063872-a415b2b5331f?q=80&w=2070&auto=format&fit=crop" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-slate-50/70 to-slate-50"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-rose-100 text-rose-600 rounded-full font-bold text-sm mb-6 animate-fade-in-up shadow-sm">
          <Flame className="w-4 h-4 fill-rose-600 animate-pulse" />
          نداء إنساني عاجل: أنقذوهم من البرد والجوع
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 leading-tight mb-6 animate-fade-in-up">
          ساعد أهالي حلب – <br />
          <span className="text-rose-600">الشيخ مقصود اليوم</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-800 max-w-4xl mx-auto mb-10 leading-relaxed font-semibold">
          بينما تنعم بالدفيء، هناك أطفال في الشيخ مقصود يرتجفون من البرد تحت أسقف متهالكة. تبرعك الآن هو حطبهم، طعامهم، وأملهم الوحيد للبقاء.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onDonateClick}
            className="px-12 py-6 bg-rose-600 text-white rounded-2xl text-2xl font-black hover:bg-rose-700 transition-all shadow-2xl shadow-rose-300 inline-flex items-center gap-4 group hover:scale-105"
          >
            تبرع الآن وكن سببًا في إنقاذ حياة
            <Heart className="w-6 h-6 fill-white" />
          </button>
          <button 
            onClick={onGalleryClick}
            className="px-10 py-5 bg-white text-slate-700 rounded-2xl text-xl font-bold border-2 border-slate-200 hover:bg-slate-50 transition-all inline-flex items-center gap-3"
          >
            شاهد الواقع الميداني
            <Camera className="w-5 h-5" />
          </button>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-5xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl shadow-slate-200 border border-white">
          {[
            { label: 'أثر التبرعات بالدولار', end: 12500, prefix: '$' },
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

    {/* Photo Grid Section */}
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">معرض الألم والأمل</h2>
          <p className="text-xl text-slate-500">مشاهد حقيقية من داخل حي الشيخ مقصود</p>
          <div className="h-1 w-32 bg-rose-600 mx-auto rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CRISIS_GALLERY.slice(0, 10).map((img, i) => (
            <div key={i} className="relative group overflow-hidden rounded-2xl shadow-lg aspect-square">
              <img 
                src={img.url} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" 
                alt={img.title}
                onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${i}/400/400` }}
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white text-xs font-bold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
           <button onClick={onGalleryClick} className="text-rose-600 font-black text-lg hover:underline flex items-center gap-2 mx-auto">
             عرض معرض الصور الكامل (15 صورة)
             <ArrowRight className="w-5 h-5" />
           </button>
        </div>
      </div>
    </section>

    {/* Crisis Context Section */}
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-4">
                <img src="تنزيل (5).jpeg" className="rounded-2xl shadow-lg h-64 w-full object-cover" alt="Crying child" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1505155485767-d422a3bd3d3d?q=80&w=2070&auto=format&fit=crop" }} />
                <img src="تنزيل (6).jpeg" className="rounded-2xl shadow-lg mt-8 h-64 w-full object-cover" alt="Ruined building" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1473615695634-d284ec918736?q=80&w=2069&auto=format&fit=crop" }} />
                <img src="تنزيل (8).jpeg" className="rounded-2xl shadow-lg h-64 w-full object-cover -mt-8" alt="Winter cold" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1416812832007-8e6f1400e9ca?q=80&w=2070&auto=format&fit=crop" }} />
                <img src="images (21).jpeg" className="rounded-2xl shadow-lg h-64 w-full object-cover" alt="Despair" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1547051401-4433104e767f?q=80&w=2070&auto=format&fit=crop" }} />
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 text-white p-6 rounded-3xl shadow-2xl border-4 border-white animate-pulse">
                <AlertTriangle className="w-12 h-12 mb-2 mx-auto" />
                <p className="font-bold text-center">كارثة إنسانية</p>
             </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">بين البرد القارس والركام.. <br /><span className="text-rose-600">هناك من ينتظرك</span></h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6 italic border-r-4 border-rose-500 pr-6">
              "في كل زاوية من حي الشيخ مقصود، هناك دمعة طفل يرتجف من البرد، وأمٌّ لا تجد ما تطعمه لصغارها سوى القليل من الخبز اليابس. الحصار لم يترك لنا شيئاً سوى إيماننا بالله وبقلوب أهل الخير."
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 font-medium">
              المعاناة هنا ليست مجرد أرقام، بل هي قصص حية لأسر فقدت بيوتها تحت القصف، وتعيش الآن في خيام مهترئة أو بيوت متصدعة لا تقيهم برد الشتاء القاسي. نحن نسابق الزمن لتأمين التدفئة والغذاء.
            </p>
            <div className="flex flex-wrap gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl font-bold text-slate-700 shadow-sm border border-slate-100">
                  <Snowflake className="w-5 h-5 text-blue-500" />
                  برد الشتاء القارس
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl font-bold text-slate-700 shadow-sm border border-slate-100">
                  <Package className="w-5 h-5 text-emerald-500" />
                  نقص حاد في الغذاء
               </div>
               <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl font-bold text-slate-700 shadow-sm border border-slate-100">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  أبنية مهددة بالانهيار
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Donation Section */}
    <section id="donate" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <img src="https://images.unsplash.com/photo-1473186578172-c141e6798ee4?q=80&w=1973&auto=format&fit=crop" className="w-full h-full object-cover opacity-10" alt="Sombre background" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">ساهم في إنقاذهم الآن</h2>
          <p className="text-xl text-slate-300">
            عبر العملات الرقمية، نضمن وصول 100% من تبرعك مباشرة للميدان لتأمين الحطب والغذاء والدواء.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CRYPTO_ADDRESSES.map((crypto, i) => (
            <CryptoCard key={i} crypto={crypto} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const AboutView: React.FC = () => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shadow-sm"><Info className="w-8 h-8" /></div>
        <h1 className="text-4xl font-black">أهوال حي الشيخ مقصود</h1>
      </div>
      
      <div className="mb-12 relative">
        <img 
          src="تنزيل (11).jpeg" 
          className="w-full h-[450px] object-cover rounded-[3rem] shadow-2xl brightness-50" 
          alt="War-torn buildings in Aleppo" 
          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=2070&auto=format&fit=crop" }}
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
           <p className="text-white text-3xl font-black text-center leading-tight drop-shadow-lg">
             "بين الركام والبرد.. تبدأ حكاية صمود لا مثيل لها."
           </p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none text-slate-700 leading-loose space-y-12">
        <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
            <MapPin className="text-rose-600" /> قلب المأساة
          </h2>
          <p className="text-lg">
            حي الشيخ مقصود ليس مجرد منطقة جغرافية، بل هو شاهد حي على سنوات من الحصار والقصف الذي لم يترك حجراً فوق حجر. العائلات هنا تعيش في غرف شبه مكشوفة، حيث البرد يدخل من الثقوب التي تركها القصف. المدارس تحولت إلى ملاجئ، والملاعب أصبحت ذكريات تحت الركام.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
           <div>
              <img src="تنزيل (10).jpeg" className="rounded-3xl shadow-xl h-80 w-full object-cover" alt="Winter suffering" onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1416812832007-8e6f1400e9ca?q=80&w=2070&auto=format&fit=crop" }} />
           </div>
           <div>
              <h2 className="text-3xl font-black text-slate-900 mb-6">لماذا نتحرك الآن؟</h2>
              <p className="text-lg">
                الشتاء في حلب لا يرحم. ومع انقطاع الكهرباء والوقود، تصبح البطانية هي الدفاع الوحيد ضد الموت برداً. تبرعك بالعملات الرقمية يكسر الحصار المالي ويوصل المساعدة في ساعات قليلة، مما يعني وجبة دافئة لطفل يرتجف الليلة.
              </p>
           </div>
        </section>

        <section className="bg-rose-600 p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
            <Heart className="fill-white" /> عهدنا أمام الله وأمامكم
          </h2>
          <p className="text-xl text-rose-50 font-medium leading-relaxed italic">
            "لا تضيع قطرة واحدة من تبرعك. نحن نعدكم بالشفافية المطلقة، وبأن تصل المساعدة مباشرة لأيدي الأطفال والنساء والشيوخ الذين يواجهون هذه الأهوال بصدور عارية."
          </p>
        </section>
      </div>
    </div>
  </div>
);

const WhereView: React.FC = () => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black mb-4">خارطة توزيع المساعدات الإنسانية</h1>
        <p className="text-xl text-slate-500">نحن نستهدف الاحتياجات الأكثر إلحاحاً لإنقاذ الأرواح.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
          <ImpactChart />
        </div>
        <div className="space-y-6">
          {[
            { label: 'سلال غذائية ووجبات دافئة', val: '40%', icon: <Package />, color: 'emerald' },
            { label: 'أدوية وأدوات طبية عاجلة', val: '25%', icon: <Stethoscope />, color: 'blue' },
            { label: 'وقود تدفئة وحطب للشتاء', val: '15%', icon: <Flame />, color: 'amber' },
            { label: 'دعم تعليمي للأيتام والمنكوبين', val: '10%', icon: <GraduationCap />, color: 'violet' },
            { label: 'ترميم عاجل للبيوت المهدومة', val: '10%', icon: <HomeIcon />, color: 'rose' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`p-3 bg-${item.color}-100 text-${item.color}-600 rounded-xl`}>{item.icon}</div>
                <span className="font-bold text-slate-800 text-lg">{item.label}</span>
              </div>
              <span className="text-2xl font-black text-slate-900">{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3rem] p-12 text-white text-center shadow-2xl">
        <div className="flex justify-center mb-8"><ShieldCheck className="w-16 h-16 text-rose-500" /></div>
        <h2 className="text-3xl font-bold mb-8">التزام كامل بالشفافية والتوثيق الميداني</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-rose-500">توثيق بالصورة والكلمة</h3>
            <p className="text-slate-400">كل وجبة يتم توزيعها، وكل غطاء يصل لعائلة، يتم توثيقه لضمان وصول الأمانة لأهلها.</p>
          </div>
          <div className="space-y-4 border-x border-white/10 px-8">
            <h3 className="text-xl font-bold text-rose-500">تتبع مالي عام</h3>
            <p className="text-slate-400">عناوين محافظنا متاحة للجميع لتتبع التحويلات عبر البلوكشين بكل وضوح.</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-rose-500">لجان رقابة محلية</h3>
            <p className="text-slate-400">فريقنا مكون من أشخاص موثوقين من أبناء الحي يشرفون على وصول الدعم للأكثر حاجة.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ImpactView: React.FC = () => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <div className="max-w-5xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl font-black mb-4">تقارير الميدان: معرض الألم والأمل</h1>
        <p className="text-xl text-slate-500">لأن الأرقام لا تكفي لوصف الألم، نضعكم في قلب الواقع عبر 15 صورة توثيقية.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
        {CRISIS_GALLERY.map((img, i) => (
          <div key={i} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl transition-all">
            <div className="h-64 overflow-hidden">
               <img 
                 src={img.url} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                 alt={img.title}
                 onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/${i + 20}/600/400` }}
               />
            </div>
            <div className="p-6">
               <h4 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition-colors">{img.title}</h4>
               <p className="text-sm text-slate-500 mt-2">توثيق ميداني - حي الشيخ مقصود</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-16">
        <h2 className="text-3xl font-black text-slate-900 border-r-8 border-rose-600 pr-6">التقارير المكتوبة</h2>
        {IMPACT_REPORTS.map((report, i) => (
          <div key={report.id} className="flex flex-col lg:flex-row gap-12 bg-white p-10 rounded-[3rem] shadow-lg border border-slate-100 group hover:shadow-2xl transition-all">
            <div className="lg:w-2/5 overflow-hidden rounded-3xl">
              <img 
                src={report.imageUrl} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[300px]" 
                alt={report.title} 
              />
            </div>
            <div className="lg:w-3/5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-5 py-2 bg-rose-100 text-rose-600 rounded-full text-sm font-black">{report.date}</span>
                <span className="text-slate-400 flex items-center gap-2 text-sm font-bold"><FileText className="w-5 h-5" /> تقرير ميداني موثق</span>
              </div>
              <h3 className="text-3xl font-black mb-6 text-slate-900 group-hover:text-rose-600 transition-colors">{report.title}</h3>
              <p className="text-slate-600 text-xl leading-relaxed mb-8">{report.description}</p>
              <button className="flex items-center gap-3 text-rose-600 font-black text-lg hover:gap-6 transition-all group-hover:underline">
                شاهد الصور والتقرير الكامل (PDF)
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DonorsView: React.FC = () => (
  <div className="container mx-auto px-4 py-16 animate-fade-in-up">
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-4xl font-black mb-6">لوحة الإنسانية: فاعلو الخير</h1>
      <p className="text-xl text-slate-500 mb-16 italic">"ما نقص مال من صدقة، وما مسح إنسان على رأس يتيم إلا كان له أجر."</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_DONORS.map((donor) => (
          <div key={donor.id} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 border-4 border-rose-100 shadow-inner">
               <HeartHandshake className="w-12 h-12 text-rose-500" />
            </div>
            <h3 className="text-2xl font-black mb-2 text-slate-900">{donor.name}</h3>
            {donor.country && <span className="text-slate-400 mb-2 font-bold">{donor.country}</span>}
            <span className="text-sm text-slate-300 font-bold uppercase tracking-wider">{donor.date}</span>
            <div className="mt-8 pt-6 border-t border-slate-50 w-full text-center">
              <span className="text-rose-600 font-black flex items-center justify-center gap-2">
                 <Heart className="w-4 h-4 fill-rose-600" /> بطل للإنسانية
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-16 bg-slate-900 rounded-[4rem] border-2 border-dashed border-rose-500 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-6">كن أنت شمعة الأمل القادمة</h2>
        <p className="text-slate-300 text-xl mb-12 max-w-2xl mx-auto">
          كل تبرع، مهما كان صغيراً، هو بمثابة حياة جديدة لعائلة في الشيخ مقصود. تواصل معنا بعد تبرعك لإظهار اسمك هنا كعربون وفاء لموقفك النبيل.
        </p>
        <button className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black text-xl hover:bg-rose-700 transition-all shadow-xl shadow-rose-900 inline-flex items-center gap-4">
           تأكيد التبرع وإرسال الاسم
           <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
);

const ContactView: React.FC = () => {
  const [sent, setSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-16 animate-fade-in-up">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black mb-4">نحن هنا لخدمة أهلنا</h1>
          <p className="text-xl text-slate-500">تواصل معنا لأي استفسار حول آلية التبرع أو تقارير الميدان.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-4 text-slate-900">
                <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shadow-sm"><Mail className="w-6 h-6" /></div>
                قنوات الاتصال المباشرة
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col border-b border-slate-50 pb-4">
                  <span className="text-slate-400 text-sm font-bold mb-1">البريد الإلكتروني الرسمي:</span>
                  <span className="font-black text-xl text-slate-800">support@halab-aid.org</span>
                </div>
                <div className="flex flex-col border-b border-slate-50 pb-4">
                  <span className="text-slate-400 text-sm font-bold mb-1">دعم التليجرام:</span>
                  <span className="font-black text-xl text-slate-800">@HalabAid_Support</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400 text-sm font-bold mb-1">المكتب الميداني:</span>
                  <span className="font-black text-xl text-slate-800">حلب، حي الشيخ مقصود - بجانب المركز الطبي</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-10 rounded-[3rem] border border-amber-200 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 w-2 h-full bg-amber-400"></div>
              <h4 className="font-black text-amber-900 text-xl mb-4 flex items-center gap-3">
                 <AlertTriangle className="w-6 h-6 text-amber-600" /> تنبيه هام جداً
              </h4>
              <p className="text-amber-800 leading-relaxed font-bold text-lg">
                بسبب الظروف الأمنية وانقطاع الاتصالات المتكرر في حي الشيخ مقصود، قد يتأخر الرد لعدة أيام. نرجو منكم الصبر، ففريقنا يعمل في ظروف استثنائية لإيصال تبرعاتكم.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-8">
            <div>
              <label className="block text-sm font-black text-slate-700 mb-3">الاسم الذي تود التواصل به</label>
              <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all text-lg" placeholder="أدخل اسمك هنا" required />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 mb-3">بريدك الإلكتروني للمتابعة</label>
              <input type="email" className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all text-lg" placeholder="example@mail.com" required />
            </div>
            <div>
              <label className="block text-sm font-black text-slate-700 mb-3">رسالتك أو استفسارك</label>
              <textarea rows={5} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-50 outline-none transition-all text-lg" placeholder="كيف يمكننا مساعدتك اليوم؟" required></textarea>
            </div>
            <button 
              type="submit" 
              className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${sent ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-300'}`}
            >
              {sent ? <><Check className="w-6 h-6" /> تم إرسال رسالتك بنجاح</> : 'إرسال الرسالة للمكتب الميداني'}
            </button>
            <p className="text-xs text-slate-400 text-center italic">نلتزم بالسرية التامة لبيانات المتبرعين والمتواصلين.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
