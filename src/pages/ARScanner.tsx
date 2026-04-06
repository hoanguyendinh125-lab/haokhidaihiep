import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'motion/react';

const generals = [
  {
    id: 'tran-hung-dao',
    name: 'Trần Hưng Đạo',
    title: 'Hưng Đạo Đại Vương',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwGxoZVw89Q71iffxf6OqzyuzFE9l_dfb9eAtN7xYiaBUOZH2aMOUCzMvgfB-SmVZe4xdOhCWq-NFveO3OvMF2ktBlueJqAtGolPS0RZGcuhXx1ozPemDF5Pmhulvm6KPXHgv2o4TYD9Gked1yTyZ_jwPpi3K62nI7_Y-TlKX5GZjrRK5wxD55gwMhHRxzcbg7rAdmIMmvP96jUoazn_TiV7nYemCn7RwPhJ4WpZs0tTFKu8tepwXUk2GJZ_RKXlZCuAr7TIRFOg',
    quote: 'Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt...'
  },
  {
    id: 'ly-thuong-kiet',
    name: 'Lý Thường Kiệt',
    title: 'Thái Úy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzVcU_q92Ci0HXs4pzq5qwzSSXIFuxlXPjen9j4yfiKwuSeZb8kg25iVGJdMt6SwsRUtGBySd0l8iF-rP5PHGKpb7DC-mYP09YT3aG1TdYtgAQPREbQMn2VQ_K0MnqqFjS5u2viDooWR_O4nHHLrUFjzwBDCj7RFq63OXtniiGHTgHQXBfAl_XIJOno9ieMuv7QtPAW9t-KAneQlXh1XRR4Zcn2Y-kwf02snENuNGZFdJAyGbkxbyGsWhAJTBZM2IlQQVWBkrgEw',
    quote: 'Nam quốc sơn hà Nam đế cư...'
  },
  {
    id: 'ngo-quyen',
    name: 'Ngô Quyền',
    title: 'Tiền Ngô Vương',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfSwlSYvzQxTIyPSfUmdY5ca5XKuYVMgf7b-AvVh_DvzJaU8lk-e4Ltbu06ajm2UY7vhnSEihQpOCak30GE18mk94EQZhq59Y5h67zmxYjkeBHCxs9fc5rfVZPWAUHVq7yjcyeVxPcGL8OfXfTQRgBV3SfqBxNRGkPsVlok4uHkQ21luhEun3MRsuyf_4U6uryEh5xf9AF15U17I-f1g0KpK369uGimUoLvoOFlals1G-JC1sv9H5_mcscnl9KJY2SVyW6HRAndQ',
    quote: 'Vị tổ trung hưng của nước Việt...'
  },
  {
    id: 'quang-trung',
    name: 'Quang Trung',
    title: 'Bắc Bình Vương',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANOvmEIL7GNVjey_1ltlxn24tgsFEJH5zuZrAqBE-fou5X6OsdjE7JrE12yHCX6_SmaYbMm6qTCRIJOeNppduAC6HeINxOdnPly8_UmzTV9Q83WyVXHyQyIc9iHV9lH8hgs0uDPL4MjvKcu9BIcwLyeaIDC7JtfKgmC9y_nWU793h5tvvU7XrPs-EoZQq-aYLevARjJk0PVhdkGHebXOFxivePFH5ApCDIjuaoh20o_QOhBocTUFqqvZ9icOP85sxX08jgS2mVuw',
    quote: 'Đánh cho để dài tóc, đánh cho để đen răng...'
  },
  {
    id: 'ba-trieu',
    name: 'Bà Triệu',
    title: 'Nhuỵ Kiều Tướng Quân',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPqEQHDIHag4xOcneC-bfm_wPsXpTn0pwKlXhR3ZNtSeBKkonufl5LaVo509HLwEygXb_N-McUQekEtSBJf77fKAsVEAR44Pg9gBOEi3hWHqYriKVRxvD34vPtjkueV9Y1cR8V2dN2maxBIq-6e5aV8Xk48_FvCf01oV0SfwNEWcq-ZVHeXS1ffM__lNS11DLzv8z9-Y4_k2FcGtbaQ5lhcGRx7VFshxbUzzk3CBFsRz7KgdVG1dK752vZghpatKwvaM9gLZ8VBg',
    quote: 'Ta muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ...'
  }
];

export default function ARScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedGeneral, setDetectedGeneral] = useState<typeof generals[0] | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const startScan = () => {
    setIsScanning(true);
    setDetectedGeneral(null);
    
    // Simulate scanning process
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * generals.length);
      setDetectedGeneral(generals[randomIndex]);
      setIsScanning(false);
    }, 3000);
  };

  const resetScanner = () => {
    setDetectedGeneral(null);
    setIsScanning(false);
  };

  return (
    <main className="pt-24 pb-12 px-6 min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center">
      <header className="text-center mb-8">
        <h2 className="text-4xl font-headline font-black text-secondary mb-2 uppercase tracking-widest">Quét AR</h2>
        <p className="text-on-surface-variant text-sm max-w-md mx-auto">
          Hướng camera vào thẻ bài hoặc không gian trống để triệu hồi các vị danh tướng Đại Việt.
        </p>
      </header>

      <div className="relative w-full max-w-2xl aspect-[3/4] md:aspect-video bg-surface-container-low border-2 border-secondary/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]">
        {/* Camera Feed */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          onUserMediaError={() => setCameraError("Không thể truy cập camera. Vui lòng cấp quyền.")}
          videoConstraints={{
            facingMode: "environment"
          }}
          disablePictureInPicture={false}
          forceScreenshotSourceSize={false}
          imageSmoothing={true}
          mirrored={false}
          onUserMedia={() => {}}
          screenshotQuality={0.92}
        />

        {/* Scanning Overlay */}
        <AnimatePresence>
          {isScanning && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]"
            >
              <div className="relative w-64 h-64 border-2 border-secondary/50 rounded-lg">
                <motion.div 
                  animate={{ top: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-secondary shadow-[0_0_15px_#D4AF37]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-6xl animate-pulse">qr_code_scanner</span>
                </div>
              </div>
              <p className="mt-6 font-headline font-bold text-secondary tracking-widest animate-pulse">ĐANG QUÉT...</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detected General Overlay */}
        <AnimatePresence>
          {detectedGeneral && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-black/80 via-transparent to-transparent"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-secondary blur-3xl opacity-30 animate-pulse"></div>
                <motion.img 
                  initial={{ y: 20 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  src={detectedGeneral.image} 
                  alt={detectedGeneral.name}
                  className="w-64 md:w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                />
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center bg-black/60 backdrop-blur-md p-6 border border-secondary/30 rounded-xl max-w-sm"
              >
                <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{detectedGeneral.title}</p>
                <h3 className="text-2xl font-black text-white uppercase mb-2">{detectedGeneral.name}</h3>
                <p className="text-xs italic text-on-surface-variant line-clamp-2">"{detectedGeneral.quote}"</p>
                
                <button 
                  onClick={resetScanner}
                  className="mt-4 px-6 py-2 bg-secondary text-black font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Tiếp tục quét
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Camera UI Elements */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] font-mono text-white/60">LIVE FEED</span>
        </div>
        
        <div className="absolute top-4 right-4 z-10">
          <span className="material-symbols-outlined text-white/40 text-xl">settings_overscan</span>
        </div>

        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-secondary/50 m-4"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-secondary/50 m-4"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-secondary/50 m-4"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-secondary/50 m-4"></div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-md">
        {cameraError ? (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-400 text-sm text-center w-full">
            <span className="material-symbols-outlined mb-2 block">error</span>
            {cameraError}
          </div>
        ) : (
          <button 
            onClick={startScan}
            disabled={isScanning || !!detectedGeneral}
            className={`w-full py-5 rounded-full font-headline font-black text-lg tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-3 shadow-xl ${
              isScanning || detectedGeneral 
                ? 'bg-surface-container-highest text-on-surface/30 cursor-not-allowed' 
                : 'bg-primary-container text-tertiary-fixed border-2 border-secondary hover:scale-105 active:scale-95'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {isScanning ? 'sync' : 'center_focus_strong'}
            </span>
            {isScanning ? 'ĐANG TÌM KIẾM...' : 'BẮT ĐẦU QUÉT'}
          </button>
        )}

        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-2">history</span>
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Lịch sử</span>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-2">collections</span>
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Bộ sưu tập</span>
          </div>
          <div className="bg-surface-container-low border border-outline-variant/20 p-4 rounded-xl flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary mb-2">help</span>
            <span className="text-[10px] font-bold uppercase text-on-surface-variant">Hướng dẫn</span>
          </div>
        </div>
      </div>
    </main>
  );
}
