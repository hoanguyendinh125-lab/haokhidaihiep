import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PlayerStats {
  haoKhi: number;
  congTrang: number;
  name: string;
}

interface BattleLog {
  timestamp: string;
  message: string;
  type: 'hp' | 'point' | 'system';
}

export default function GameSupport() {
  const [mode, setMode] = useState<'1v1' | '2v2'>('1v1');
  const [logs, setLogs] = useState<BattleLog[]>([]);
  const [players, setPlayers] = useState<PlayerStats[]>(
    mode === '1v1' 
      ? [{ name: 'Chủ tướng 1', haoKhi: 30, congTrang: 0 }, { name: 'Chủ tướng 2', haoKhi: 30, congTrang: 0 }]
      : [
          { name: 'Phe Ta (P1)', haoKhi: 50, congTrang: 0 }, 
          { name: 'Phe Ta (P2)', haoKhi: 50, congTrang: 0 },
          { name: 'Phe Địch (P1)', haoKhi: 50, congTrang: 0 },
          { name: 'Phe Địch (P2)', haoKhi: 50, congTrang: 0 }
        ]
  );

  const addLog = (message: string, type: 'hp' | 'point' | 'system') => {
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    setLogs(prev => [{ timestamp, message, type }, ...prev].slice(0, 50));
  };

  const handleModeChange = (newMode: '1v1' | '2v2') => {
    setMode(newMode);
    addLog(`Đổi chế độ sang ${newMode}`, 'system');
    if (newMode === '1v1') {
      setPlayers([{ name: 'Chủ tướng 1', haoKhi: 30, congTrang: 0 }, { name: 'Chủ tướng 2', haoKhi: 30, congTrang: 0 }]);
    } else {
      setPlayers([
        { name: 'Phe Ta (P1)', haoKhi: 50, congTrang: 0 }, 
        { name: 'Phe Ta (P2)', haoKhi: 50, congTrang: 0 },
        { name: 'Phe Địch (P1)', haoKhi: 50, congTrang: 0 },
        { name: 'Phe Địch (P2)', haoKhi: 50, congTrang: 0 }
      ]);
    }
  };

  const updateStat = (index: number, stat: 'haoKhi' | 'congTrang', delta: number) => {
    const newPlayers = [...players];
    const oldValue = newPlayers[index][stat];
    newPlayers[index][stat] = Math.max(0, newPlayers[index][stat] + delta);
    const newValue = newPlayers[index][stat];
    
    if (oldValue !== newValue) {
      const statName = stat === 'haoKhi' ? 'Hào Khí' : 'Công Trạng';
      const change = delta > 0 ? `+${delta}` : `${delta}`;
      addLog(`${newPlayers[index].name}: ${statName} ${change} (${oldValue} -> ${newValue})`, stat === 'haoKhi' ? 'hp' : 'point');
    }
    
    setPlayers(newPlayers);
  };

  return (
    <main className="pt-28 pb-20 px-4 md:px-10 battle-map-bg min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <section className="mb-12 text-center">
          <h2 className="font-sans text-4xl md:text-6xl font-black text-secondary uppercase tracking-tighter mb-4 etched-text">Hỗ Trợ Tác Chiến</h2>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto italic">
            "Công cụ hỗ trợ tính điểm và sơ đồ chiến trường dành cho các chủ tướng."
          </p>
        </section>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => handleModeChange('1v1')}
            className={`px-8 py-3 font-bold transition-all border-2 ${mode === '1v1' ? 'bg-[#8B0000] text-[#D4AF37] border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37]/60 hover:border-[#D4AF37]'}`}
          >
            QUYẾT ĐẤU (1v1)
          </button>
          <button 
            onClick={() => handleModeChange('2v2')}
            className={`px-8 py-3 font-bold transition-all border-2 ${mode === '2v2' ? 'bg-[#8B0000] text-[#D4AF37] border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37]/60 hover:border-[#D4AF37]'}`}
          >
            HỢP KÍCH (2v2)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Score Counter */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-surface-container-low border border-[#D4AF37]/20 p-6 shadow-2xl">
              <h3 className="font-sans font-extrabold text-xl text-secondary mb-6 uppercase tracking-widest border-b border-[#D4AF37]/10 pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">calculate</span>
                Tính Điểm Chiến Trận
              </h3>
              
              <div className="space-y-8">
                {players.map((player, idx) => (
                  <div key={idx} className="p-4 bg-black/20 border border-[#D4AF37]/10 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-sans font-extrabold text-secondary text-sm uppercase">{player.name}</span>
                      <span className="text-[10px] text-on-surface/40 uppercase tracking-widest">ID: {idx + 1}</span>
                    </div>
                    
                    {/* Hào Khí (HP) */}
                    <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs uppercase font-bold text-primary">Hào Khí (HP)</span>
                        <span className="text-3xl font-black font-sans text-primary">{player.haoKhi}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => updateStat(idx, 'haoKhi', -5)} className="flex-1 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors">-5</button>
                        <button onClick={() => updateStat(idx, 'haoKhi', -1)} className="flex-1 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors">-1</button>
                        <button onClick={() => updateStat(idx, 'haoKhi', 1)} className="flex-1 py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors">+1</button>
                      </div>
                    </div>

                    {/* Công Trạng (Points) */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-xs uppercase font-bold text-secondary">Công Trạng</span>
                        <span className="text-3xl font-black font-sans text-secondary">{player.congTrang}</span>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => updateStat(idx, 'congTrang', -1)} className="flex-1 py-2 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 transition-colors">-1</button>
                        <button onClick={() => updateStat(idx, 'congTrang', 1)} className="flex-1 py-2 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 transition-colors">+1</button>
                        <button onClick={() => updateStat(idx, 'congTrang', 5)} className="flex-1 py-2 bg-secondary/10 border border-secondary/30 text-secondary hover:bg-secondary/20 transition-colors">+5</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  handleModeChange(mode);
                  setLogs([]);
                }}
                className="w-full mt-8 py-3 border border-[#D4AF37]/30 text-[#D4AF37]/60 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all text-xs font-bold uppercase tracking-widest"
              >
                Làm mới trận đấu
              </button>
            </div>

            {/* Battle Log Section */}
            <div className="bg-surface-container-low border border-[#D4AF37]/20 p-6 shadow-2xl">
              <h3 className="font-sans font-extrabold text-xl text-secondary mb-6 uppercase tracking-widest border-b border-[#D4AF37]/10 pb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">history_edu</span>
                  Nhật Ký Trận Đấu
                </div>
                <button 
                  onClick={() => setLogs([])}
                  className="text-[10px] text-on-surface/40 hover:text-primary transition-colors uppercase font-bold"
                >
                  Xóa
                </button>
              </h3>
              <div className="h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="text-center text-on-surface/30 italic text-sm py-10">Chưa có diễn biến nào...</p>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="text-[11px] font-mono border-b border-[#D4AF37]/5 pb-2 last:border-0">
                      <span className="text-on-surface/40 mr-2">[{log.timestamp}]</span>
                      <span className={
                        log.type === 'hp' ? 'text-primary' : 
                        log.type === 'point' ? 'text-secondary' : 
                        'text-on-surface/60'
                      }>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Battlefield Diagram */}
          <div className="lg:col-span-8">
            <div className="bg-surface-container-low border border-[#D4AF37]/20 p-8 shadow-2xl h-full">
              <h3 className="font-sans font-extrabold text-xl text-secondary mb-8 uppercase tracking-widest border-b border-[#D4AF37]/10 pb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">map</span>
                Sơ Đồ Bố Trận {mode}
              </h3>

              <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="relative aspect-video min-w-[600px] bg-black/40 border border-[#D4AF37]/20 rounded-xl overflow-hidden p-4 flex flex-col gap-4">
                  {/* Visual Diagram re-implementation for Game Support */}
                  <div className="flex-1 grid grid-rows-5 gap-2">
                  {/* Opponent Backline */}
                  <div className="grid grid-cols-5 gap-2 opacity-40">
                    <div className="border border-dashed border-[#D4AF37]/30 rounded flex items-center justify-center text-[8px] uppercase text-center">Sử bộ</div>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      <div className="bg-secondary/5 border border-[#D4AF37]/20 rounded"></div>
                      <div className="bg-secondary/5 border border-[#D4AF37]/20 rounded"></div>
                      <div className="bg-secondary/5 border border-[#D4AF37]/20 rounded"></div>
                    </div>
                    <div className="border border-dashed border-[#D4AF37]/30 rounded flex items-center justify-center text-[8px] uppercase text-center">Mộ bài</div>
                  </div>

                  {/* Opponent Frontline */}
                  <div className="grid grid-cols-5 gap-2 opacity-40">
                    <div className="border border-[#D4AF37]/40 rounded flex items-center justify-center text-[8px] font-bold text-secondary uppercase">Tướng</div>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      <div className="bg-primary/5 border border-[#D4AF37]/20 rounded"></div>
                      <div className="bg-primary/5 border border-[#D4AF37]/20 rounded"></div>
                      <div className="bg-primary/5 border border-[#D4AF37]/20 rounded"></div>
                    </div>
                    <div></div>
                  </div>

                  {/* River/No-man's land */}
                  <div className="flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay"></div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
                    <span className="relative bg-[#131313] px-4 text-[10px] uppercase tracking-[0.4em] text-secondary font-bold">Chiến Tuyến</span>
                  </div>

                  {/* Player Frontline */}
                  <div className="grid grid-cols-5 gap-2">
                    <div></div>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      <div className="bg-primary/20 border-2 border-primary/40 rounded shadow-[inset_0_0_15px_rgba(139,0,0,0.2)] flex items-center justify-center text-[10px] font-bold uppercase text-primary/60">Tiền tuyến</div>
                      <div className="bg-primary/20 border-2 border-primary/40 rounded shadow-[inset_0_0_15px_rgba(139,0,0,0.2)] flex items-center justify-center text-[10px] font-bold uppercase text-primary/60">Tiền tuyến</div>
                      <div className="bg-primary/20 border-2 border-primary/40 rounded shadow-[inset_0_0_15px_rgba(139,0,0,0.2)] flex items-center justify-center text-[10px] font-bold uppercase text-primary/60">Tiền tuyến</div>
                    </div>
                    <div className="border-2 border-secondary/60 rounded flex items-center justify-center text-[10px] font-bold text-secondary uppercase shadow-[0_0_15px_rgba(212,175,55,0.2)]">Tướng</div>
                  </div>

                  {/* Player Backline */}
                  <div className="grid grid-cols-5 gap-2">
                    <div className="border border-dashed border-[#D4AF37]/30 rounded flex items-center justify-center text-[8px] uppercase text-center">Mộ bài</div>
                    <div className="col-span-3 grid grid-cols-3 gap-2">
                      <div className="bg-secondary/10 border-2 border-secondary/30 rounded flex items-center justify-center text-[10px] font-bold uppercase text-secondary/60">Hậu tuyến</div>
                      <div className="bg-secondary/10 border-2 border-secondary/30 rounded flex items-center justify-center text-[10px] font-bold uppercase text-secondary/60">Hậu tuyến</div>
                      <div className="bg-secondary/10 border-2 border-secondary/30 rounded flex items-center justify-center text-[10px] font-bold uppercase text-secondary/60">Hậu tuyến</div>
                    </div>
                    <div className="border border-dashed border-[#D4AF37]/30 rounded flex items-center justify-center text-[8px] uppercase text-center">Sử bộ</div>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-2 text-primary">
                    <div className="w-3 h-3 bg-primary/20 border border-primary"></div>
                    <span>Quân chủ lực</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <div className="w-3 h-3 bg-secondary/20 border border-secondary"></div>
                    <span>Hỗ trợ / Bẫy</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface/60">
                    <div className="w-3 h-3 border border-dashed border-on-surface/40"></div>
                    <span>Kho bài / Loại bỏ</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary">
                    <div className="w-3 h-3 border-2 border-secondary"></div>
                    <span>Danh Tướng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-primary/5 border-l-4 border-primary">
              <h4 className="text-xs font-bold text-primary uppercase mb-2">Lưu ý Tiền Tuyến</h4>
              <p className="text-[11px] text-on-surface/70 leading-relaxed">
                Quân ở Tiền Tuyến bảo vệ Danh Tướng. Nếu Tiền Tuyến trống, đối phương có thể tấn công trực tiếp vào Danh Tướng để trừ Hào Khí.
              </p>
            </div>
            <div className="p-4 bg-secondary/5 border-l-4 border-secondary">
              <h4 className="text-xs font-bold text-secondary uppercase mb-2">Lưu ý Hậu Tuyến</h4>
              <p className="text-[11px] text-on-surface/70 leading-relaxed">
                Hậu Tuyến là nơi an toàn cho Cung thủ và các thẻ Kế Sách. Quân ở đây chỉ bị tấn công bởi các kỹ năng "Xạ Kích" hoặc khi Tiền Tuyến đã thất thủ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Thần Kim Quy Advice Section */}
        <section className="mt-12 bg-surface-container-highest border-2 border-secondary p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-32 h-32 shrink-0 bg-[#131313] border-2 border-secondary p-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <img 
                src="/img/thanrua.png" 
                alt="Thần Kim Quy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-sans font-extrabold text-2xl text-secondary mb-2 uppercase">Lời dạy của Thần Kim Quy</h4>
              <p className="text-on-surface/80 italic mb-4">
                "Hào khí là gốc rễ của chiến thắng, nhưng Công trạng mới là minh chứng cho sự vĩ đại. Hãy biết khi nào nên thủ vững, khi nào nên tiến công thần tốc."
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 bg-black/30 border border-secondary/20 rounded text-[10px] uppercase font-bold text-secondary">
                  Mẹo: Ưu tiên chiếm cứ điểm để tăng Công Trạng
                </div>
                <div className="px-4 py-2 bg-black/30 border border-secondary/20 rounded text-[10px] uppercase font-bold text-secondary">
                  Mẹo: Giữ ít nhất 1 quân ở Tiền Tuyến
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
