import { Link } from 'react-router-dom';
import LPTracker from '../components/LPTracker';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-24 md:py-32">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover scale-105"
            alt="epic cinematic wide shot of an ancient Vietnamese battlefield"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDc-9gANK-U9PGYP0RwjTnctTzUbLspqGkwbVUw8x9KuyICoFqbddwd9anrcE_ZmLcl_4r6QBJWPD-YODPo0ly_xi5ooUsP7bVhIXuet8MSkfZ5CbR2ZOLX4G_3sAsxe7WVn_IOT00ukrSxiL3NPb3ATEIzT8AdS8o2vtsTq8JdiZKqNocoZKJmHTtO9afWvwWPHZB-Q0cS83a7WwLb2ZOoWX2SWYBb6vMreIsuKoQKN466wc69P1s85N7auA8siLmgQLgSzaCrw"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="absolute inset-0 grainy-bg"></div>
        </div>
        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 border border-[#D4AF37]/40 bg-[#8B0000]/20 px-4 py-1 backdrop-blur-sm">
            <span className="font-sans font-extrabold text-[#D4AF37] tracking-[0.3em] text-xs">KHỞI ĐẦU HUYỀN THOẠI</span>
          </div>
          <h1 className="font-sans text-6xl md:text-8xl lg:text-9xl font-black mb-6 text-shimmer drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] leading-[1.2] py-6">
            HÀO KHÍ<br />ĐẠI VIỆT
          </h1>
          <p className="font-sans font-extrabold text-xl md:text-3xl text-on-surface mb-12 max-w-2xl mx-auto italic tracking-wide">
            Chiến thuật – Lịch sử – Danh tướng
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/game-support" className="w-full md:w-auto px-10 py-5 bg-primary-container text-tertiary-fixed font-sans font-extrabold text-lg border border-secondary shadow-[0_0_20px_rgba(139,0,0,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 group block text-center">
              <span className="flex items-center justify-center gap-2">
                BẮT ĐẦU CHƠI
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">swords</span>
              </span>
            </Link>
            <Link to="/rules" className="w-full md:w-auto px-10 py-5 bg-transparent border border-secondary/50 text-secondary font-sans font-extrabold text-lg hover:bg-secondary/10 active:scale-95 transition-all duration-300 block text-center">
              XEM LUẬT CHƠI
            </Link>
            <Link to="/generals" className="w-full md:w-auto px-10 py-5 bg-transparent border border-secondary/50 text-secondary font-sans font-extrabold text-lg hover:bg-secondary/10 active:scale-95 transition-all duration-300 block text-center">
              KHÁM PHÁ DANH TƯỚNG
            </Link>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        {/* Lac Bird Motif */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-30">
          <span className="material-symbols-outlined text-[#D4AF37] text-6xl">expand_more</span>
        </div>
      </section>

      {/* LP Tracker Section */}
      <section className="py-12 px-6 container mx-auto relative z-20 -mt-24">
        <LPTracker />
      </section>

      {/* Bento Grid: Features */}
      <section className="py-12 px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
          {/* Main Card: Lore */}
          <Link to="/story" className="md:col-span-8 bg-surface-container-low border border-[#D4AF37]/10 p-10 flex flex-col justify-end relative overflow-hidden group cursor-pointer">
            <img
              className="absolute inset-0 w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:scale-110"
              alt="ancient parchment scroll"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAL48uqWnfNWYUNzobjmu-G_bIbxKbVdmVX5ZJTd_EBWppjXbTClMw_5meAp1EZikPNWJhUy9OU9UsebiRTu1DCe0l2tflaeI9WN1xKk8ph-LeBaD0TNJRtgAakz7kOrKHLOqCln7Wyhk48Dy9RPXuAkb00eZ269QINzNkb1FaGYsIImz_ZghLsTHuHS_UIlgM1phOxw47fRyOnxMl8eqYvUAomqn0_me0mcoonb6dWiCN7qvOsdCpWppWCczYxL8NAfbd5QjJPw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
            <div className="relative z-10">
              <h3 className="font-sans font-extrabold text-3xl text-secondary mb-4">CỐT TRUYỆN ĐẠI VIỆT</h3>
              <p className="text-on-surface/80 max-w-lg">Sống lại những giây phút hào hùng của lịch sử ngàn năm. Mỗi quân bài là một chiến công, mỗi nước đi là một định mệnh cho giang sơn.</p>
            </div>
          </Link>

          {/* Right Column Stack */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* AI Mascot Card */}
            <div 
              onClick={() => {
                const mascotBtn = document.getElementById('kim-quy-mascot-btn');
                if (mascotBtn) mascotBtn.click();
              }}
              className="flex-1 bg-[#8B0000]/10 border border-[#D4AF37]/30 p-8 flex flex-col justify-center items-center text-center group hover:bg-[#8B0000]/20 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:10px_10px]"></div>
              </div>
              <span className="material-symbols-outlined text-5xl text-[#D4AF37] mb-4 group-hover:scale-110 transition-transform">auto_awesome</span>
              <h4 className="font-sans font-extrabold text-xl text-secondary mb-2">THẦN KIM QUY (AI)</h4>
              <p className="text-xs text-on-surface/60">Đàm đạo binh pháp và lịch sử cùng linh vật huyền thoại.</p>
            </div>

            <Link to="/generals" className="bg-surface-container-high border border-[#D4AF37]/10 p-6 flex items-center justify-between group hover:border-primary-container transition-colors">
              <div>
                <h4 className="font-sans font-extrabold text-lg text-secondary mb-1">DANH TƯỚNG</h4>
                <p className="text-[10px] text-on-surface/60 uppercase tracking-widest">16 Vị Anh Hùng</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">military_tech</span>
            </Link>

            <Link to="/ar-scanner" className="bg-surface-container-high border border-[#D4AF37]/10 p-6 flex items-center justify-between group hover:border-primary-container transition-colors">
              <div>
                <h4 className="font-sans font-extrabold text-lg text-secondary mb-1">QUÉT AR</h4>
                <p className="text-[10px] text-on-surface/60 uppercase tracking-widest">Thực tế tăng cường</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">view_in_ar</span>
            </Link>

            <Link to="/map" className="bg-surface-container-high border border-[#D4AF37]/10 p-6 flex items-center justify-between group hover:border-primary-container transition-colors">
              <div>
                <h4 className="font-sans font-extrabold text-lg text-secondary mb-1">BẢN ĐỒ</h4>
                <p className="text-[10px] text-on-surface/60 uppercase tracking-widest">Khám phá lịch sử</p>
              </div>
              <span className="material-symbols-outlined text-3xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">map</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
