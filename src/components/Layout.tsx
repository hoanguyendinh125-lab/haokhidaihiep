import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import KimQuyMascot from './KimQuyMascot';
import ScrollToTop from './ScrollToTop';
import LoginModal from './LoginModal';
import { auth, logOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navLinks = [
    { path: '/', label: 'Trang Chủ', icon: 'fort' },
    { path: '/rules', label: 'Luật Chơi', icon: 'article' },
    { path: '/generals', label: 'Danh Tướng', icon: 'swords' },
    { path: '/ar-scanner', label: 'Quét AR', icon: 'view_in_ar' },
    { path: '/cards', label: 'Kho Thẻ Bài', icon: 'style' },
    { path: '/story', label: 'Cốt Truyện', icon: 'menu_book' },
    { path: '/map', label: 'Bản Đồ', icon: 'map' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-2 bg-[#131313]/80 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="p-2 text-[#D4AF37] hover:bg-[#8B0000]/20 transition-all duration-300 scale-95 active:scale-90 lg:hidden"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link to="/" className="flex items-center py-1">
            <img src="/img/logo-removebg-preview.png" alt="Hào Khí Đại Việt Logo" className="h-14 md:h-20 object-contain drop-shadow-[0_2px_4px_rgba(139,0,0,0.8)]" />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden lg:flex gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-sans font-extrabold uppercase tracking-widest text-xs xl:text-sm transition-colors whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] pb-1'
                    : 'text-[#E5E2E1]/60 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-[#D4AF37] text-xs font-bold">{user.displayName || user.email}</p>
              </div>
              <button
                onClick={logOut}
                className="bg-[#8B0000] hover:bg-[#A00000] text-[#D4AF37] font-bold py-1.5 px-3 text-xs uppercase tracking-wider transition-colors border border-[#D4AF37]/50"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="bg-[#D4AF37] hover:bg-[#F3D55B] text-[#131313] font-bold py-1.5 px-4 text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              Đăng Nhập
            </button>
          )}
        </div>
      </header>

      {/* Sidebar Navigation (Mobile Only) */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] flex flex-col h-full w-80 bg-[#131313] border-r border-[#D4AF37]/30 shadow-[20px_0_40px_rgba(0,0,0,0.6)] transform transition-transform duration-500 lg:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 border-b border-[#D4AF37]/20 pt-24">
          <div className="py-2">
            <img src="/img/logo-removebg-preview.png" alt="Hào Khí Đại Việt Logo" className="h-28 md:h-36 object-contain drop-shadow-[0_2px_4px_rgba(139,0,0,0.8)]" />
          </div>
          {isSidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="absolute top-6 right-6 text-[#D4AF37] lg:hidden"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
        </div>
        <nav className="flex-1 py-6 overflow-y-auto">
          <div className="px-4 mb-4 text-[#D4AF37]/40 text-xs uppercase tracking-widest font-bold">Thư viện vương triều</div>
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 transition-all duration-500 font-sans font-extrabold text-lg group ${
                    location.pathname === link.path
                      ? 'bg-[#8B0000] text-[#D4AF37] font-bold border-l-4 border-[#D4AF37]'
                      : 'text-[#E5E2E1] hover:bg-[#1C1B1B] hover:pl-8'
                  }`}
                >
                  <span className="material-symbols-outlined text-[#D4AF37]">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-6 border-t border-[#D4AF37]/10 bg-surface-container-low text-center">
          <span className="text-[#D4AF37] font-bold text-sm tracking-tighter">BÌNH NGÔ ĐẠI CÁO</span>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pt-16 pb-16 lg:pb-0">
        <Outlet />
        
        {/* Footer */}
        <footer className="bg-[#131313] border-t border-[#D4AF37]/10 py-12 mt-auto relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#8B0000_1px,transparent_1px)] [background-size:20px_20px]"></div>
          </div>
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-10 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left mb-6 md:mb-0">
              <img src="/img/logo-removebg-preview.png" alt="Hào Khí Đại Việt Logo" className="h-24 md:h-32 object-contain opacity-80 hover:opacity-100 transition-opacity" />
              <div className="flex flex-col gap-1">
                <p className="font-body text-xs uppercase tracking-tighter text-[#E5E2E1]/40">© 1285 Trần Triều - Hào Khí Đông A</p>
                <p className="text-[10px] text-[#E5E2E1]/20 italic">Vững bền sơn hà - Rạng danh con cháu Lạc Hồng</p>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="font-body text-xs uppercase tracking-tighter text-[#E5E2E1]/40 hover:text-[#D4AF37] underline decoration-[#8B0000] transition-opacity">Hỗ Trợ</a>
              <a href="#" className="font-body text-xs uppercase tracking-tighter text-[#E5E2E1]/40 hover:text-[#D4AF37] underline decoration-[#8B0000] transition-opacity">Điều Khoản</a>
              <a href="#" className="font-body text-xs uppercase tracking-tighter text-[#E5E2E1]/40 hover:text-[#D4AF37] underline decoration-[#8B0000] transition-opacity">Liên Kết</a>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-[#131313] border-t border-[#D4AF37]/20 z-50 lg:hidden flex justify-around items-center pb-1">
        {[
          { path: '/', label: 'Trang Chủ', icon: 'fort' },
          { path: '/generals', label: 'Tướng', icon: 'swords' },
          { path: '/cards', label: 'Thẻ Bài', icon: 'style' },
          { path: '/story', label: 'Cốt Truyện', icon: 'menu_book' },
          { path: '/map', label: 'Bản Đồ', icon: 'map' }
        ].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex flex-col items-center p-1 pt-2 pb-1 flex-1 ${
              location.pathname === link.path ? 'text-[#D4AF37]' : 'text-[#E5E2E1]/60 hover:text-[#D4AF37]'
            }`}
          >
            <span className="material-symbols-outlined text-lg mb-0.5">{link.icon}</span>
            <span className="text-[8px] font-bold uppercase tracking-wider">{link.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mascot */}
      <KimQuyMascot />

      {/* Scroll To Top */}
      <ScrollToTop />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
}
