import React, { useState } from 'react';
import { auth, signInWithGoogle, signInWithFacebook } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email hoặc mật khẩu không chính xác.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng.');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu (ít nhất 6 ký tự).');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Tính năng đăng nhập bằng Email chưa được bật. Vui lòng bật trong Firebase Console.');
      } else {
        setError('Có lỗi xảy ra: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) onClose();
    } catch (err: any) {
      setError('Lỗi đăng nhập Google.');
    }
  };

  const handleFacebook = async () => {
    try {
      const user = await signInWithFacebook();
      if (user) onClose();
    } catch (err: any) {
      setError('Lỗi đăng nhập Facebook. Vui lòng kiểm tra cấu hình Firebase.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#131313] border border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)] w-full max-w-md p-8 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#E5E2E1]/60 hover:text-[#D4AF37] transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        <h2 className="text-2xl font-sans font-extrabold text-[#D4AF37] uppercase tracking-widest text-center mb-6">
          {isRegister ? 'Đăng Ký' : 'Đăng Nhập'}
        </h2>

        {error && (
          <div className="bg-[#8B0000]/20 border border-[#8B0000] text-[#ff6b6b] p-3 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#E5E2E1]/60 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#1C1B1B] border border-[#D4AF37]/30 text-[#E5E2E1] p-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="nhap@email.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#E5E2E1]/60 mb-2">Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#1C1B1B] border border-[#D4AF37]/30 text-[#E5E2E1] p-3 focus:outline-none focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#8B0000] hover:bg-[#A00000] text-[#D4AF37] font-bold py-3 uppercase tracking-widest transition-colors border border-[#D4AF37]/30 mt-2 disabled:opacity-50"
          >
            {loading ? 'Đang xử lý...' : (isRegister ? 'Tạo Tài Khoản' : 'Đăng Nhập')}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button 
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-sm text-[#E5E2E1]/60 hover:text-[#D4AF37] transition-colors"
          >
            {isRegister ? 'Đã có tài khoản? Đăng nhập ngay' : 'Chưa có tài khoản? Đăng ký ngay'}
          </button>
        </div>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
          <span className="text-xs uppercase tracking-widest text-[#E5E2E1]/40">Hoặc</span>
          <div className="flex-1 h-px bg-[#D4AF37]/20"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleGoogle}
            className="w-full bg-white hover:bg-gray-100 text-black font-bold py-2.5 px-4 flex items-center justify-center gap-3 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Đăng nhập bằng Google
          </button>
          <button 
            onClick={handleFacebook}
            className="w-full bg-[#1877F2] hover:bg-[#166FE5] text-white font-bold py-2.5 px-4 flex items-center justify-center gap-3 transition-colors"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg" alt="Facebook" className="w-5 h-5" />
            Đăng nhập bằng Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
