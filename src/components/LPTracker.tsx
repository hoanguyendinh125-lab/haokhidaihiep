import { useState } from 'react';

export default function LPTracker() {
  const [playerLP, setPlayerLP] = useState(8000);
  const [enemyLP, setEnemyLP] = useState(8000);
  const [calcValue, setCalcValue] = useState('');
  const [target, setTarget] = useState<'player' | 'enemy'>('enemy');

  const applyDamage = (isHeal = false) => {
    const val = parseInt(calcValue) || 0;
    if (val === 0) return;
    
    if (target === 'player') {
      setPlayerLP(prev => Math.max(0, isHeal ? prev + val : prev - val));
    } else {
      setEnemyLP(prev => Math.max(0, isHeal ? prev + val : prev - val));
    }
    setCalcValue('');
  };

  return (
    <div className="bg-[#131313] border border-[#D4AF37]/50 rounded-xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] max-w-2xl mx-auto w-full relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#8B0000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      <div className="relative z-10">
        <h3 className="text-[#D4AF37] font-bold mb-6 text-center border-b border-[#D4AF37]/30 pb-3 font-headline text-xl tracking-widest uppercase">Máy Tính Điểm Sinh Mệnh</h3>
        
        <div className="flex justify-between gap-4 mb-8">
          <div 
            className={`flex-1 p-4 rounded-lg text-center border-2 transition-all cursor-pointer ${target === 'player' ? 'border-[#4A90E2] bg-[#4A90E2]/10 shadow-[0_0_15px_rgba(74,144,226,0.3)]' : 'border-[#1C1B1B] bg-[#1C1B1B]/50 hover:border-[#D4AF37]/30'}`} 
            onClick={() => setTarget('player')}
          >
            <div className="text-[#E5E2E1]/60 text-sm mb-2 font-body uppercase tracking-wider">Người Chơi</div>
            <div className="text-4xl font-bold text-[#4A90E2] font-mono">{playerLP}</div>
          </div>
          
          <div 
            className={`flex-1 p-4 rounded-lg text-center border-2 transition-all cursor-pointer ${target === 'enemy' ? 'border-[#E24A4A] bg-[#E24A4A]/10 shadow-[0_0_15px_rgba(226,74,74,0.3)]' : 'border-[#1C1B1B] bg-[#1C1B1B]/50 hover:border-[#D4AF37]/30'}`} 
            onClick={() => setTarget('enemy')}
          >
            <div className="text-[#E5E2E1]/60 text-sm mb-2 font-body uppercase tracking-wider">Đối Thủ</div>
            <div className="text-4xl font-bold text-[#E24A4A] font-mono">{enemyLP}</div>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <input 
            type="number" 
            value={calcValue}
            onChange={(e) => setCalcValue(e.target.value)}
            placeholder="Nhập số điểm..."
            className="flex-1 bg-[#1C1B1B] border border-[#D4AF37]/30 rounded-lg px-4 py-3 text-[#E5E2E1] text-xl focus:outline-none focus:border-[#D4AF37] text-center font-mono placeholder:text-[#E5E2E1]/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <button 
            onClick={() => applyDamage(false)} 
            className="bg-[#8B0000]/80 hover:bg-[#A00000] text-[#E5E2E1] border border-[#E24A4A]/50 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">remove</span>
            TRỪ ĐIỂM
          </button>
          <button 
            onClick={() => applyDamage(true)} 
            className="bg-[#2E7D32]/80 hover:bg-[#388E3C] text-[#E5E2E1] border border-[#4CAF50]/50 py-4 rounded-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            CỘNG ĐIỂM
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-4">
          {[100, 500, 1000, 2000].map(val => (
            <button 
              key={val} 
              onClick={() => setCalcValue(val.toString())} 
              className="bg-[#1C1B1B] hover:bg-[#D4AF37]/20 text-[#D4AF37] py-3 rounded border border-[#D4AF37]/30 text-sm font-mono transition-colors"
            >
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
