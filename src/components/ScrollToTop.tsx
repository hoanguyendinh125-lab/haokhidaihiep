import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 md:bottom-10 md:left-10 z-[90] w-12 h-12 bg-[#8B0000] border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(139,0,0,0.5)] hover:bg-[#A00000] transition-colors group"
          aria-label="Cuộn về đầu trang"
        >
          <span className="material-symbols-outlined group-hover:-translate-y-1 transition-transform">keyboard_double_arrow_up</span>
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-[#D4AF37]"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-[#D4AF37]"></div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
