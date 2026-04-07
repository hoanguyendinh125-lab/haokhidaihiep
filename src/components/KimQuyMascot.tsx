import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { generateGoldenTurtleImage } from '../services/imageGenerationService';
import { removeWhiteBackground } from '../services/imageProcessingService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function KimQuyMascot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Bản thần là Kim Quy. Tráng sĩ cần hỏi về binh pháp Hào Khí Đại Việt hay muốn đàm đạo về lịch sử nước Nam?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mascotImg, setMascotImg] = useState('/img/thanrua.png');
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadCustomImage = async () => {
      const cached = localStorage.getItem('customKimQuyImage');
      if (cached) {
        setMascotImg(cached);
        return;
      }

      setIsGeneratingImg(true);
      try {
        const base64Img = await generateGoldenTurtleImage();
        if (base64Img) {
          const transparentImg = await removeWhiteBackground(base64Img, 80);
          setMascotImg(transparentImg);
          try {
            localStorage.setItem('customKimQuyImage', transparentImg);
          } catch (e) {
            console.warn('Could not save to localStorage', e);
          }
        } else {
          // Fallback: If Gemini fails, remove background from default image
          const transparentDefault = await removeWhiteBackground('/img/thanrua.png', 80);
          setMascotImg(transparentDefault);
        }
      } catch (error) {
        console.error('Failed to generate custom turtle image', error);
        // Fallback: remove background from default image
        try {
          const transparentDefault = await removeWhiteBackground('/img/thanrua.png', 80);
          setMascotImg(transparentDefault);
        } catch (e) {
          console.error('Failed to process default image', e);
        }
      } finally {
        setIsGeneratingImg(false);
      }
    };

    loadCustomImage();
  }, []);

  useEffect(() => {
    const initAI = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        chatRef.current = ai.chats.create({
          model: "gemini-3-flash-preview",
          config: {
            systemInstruction: `Bạn là Thần Kim Quy, vị thần rùa vàng linh thiêng trong truyền thuyết Việt Nam. Bạn đóng vai trò là Game Master cho board game 'Hào Khí Đại Việt'.

Nhiệm vụ quan trọng: Giải thích luật chơi một cách CỰC KỲ DỄ HIỂU, ngắn gọn, súc tích nhưng vẫn giữ phong thái uy nghiêm.

Cách giải thích luật chơi (Dễ hiểu nhất):
1. Mục tiêu: Đưa máu (HP) của đối thủ về 0.
2. Cách đánh: [Chi tiết về trừ Công/Thủ]
3. Lượt chơi: Rút bài -> Đặt quân -> Tấn công -> Kết thúc.

Phong cách xưng hô: Tự xưng 'Bản thần', gọi người chơi là 'Tráng sĩ'. Giọng văn cổ phong, oai nghiêm, trình bày dấu câu rõ ràng, ngắt dòng hợp lý để dễ đọc.

Logic Hành động:
- Nếu người chơi hỏi về luật, hãy bám sát 3 bước trên.
- Nếu người chơi hỏi về lịch sử, hãy trả lời ngắn gọn, hào hùng.`,
          }
        });
      } catch (error) {
        console.error("Failed to initialize AI:", error);
      }
    };
    initAI();
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Thiên cơ bất khả lộ... (Có lỗi kết nối, vui lòng thử lại sau)' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      animate={isDragging ? {
        rotate: [0, -2, 2, -2, 2, 0],
        x: [0, -1, 1, -1, 1, 0],
        y: [0, 1, -1, 1, -1, 0],
        scale: 1.1
      } : {
        rotate: 0,
        x: 0,
        y: 0,
        scale: 1
      }}
      transition={isDragging ? {
        rotate: { repeat: Infinity, duration: 0.2 },
        x: { repeat: Infinity, duration: 0.1 },
        y: { repeat: Infinity, duration: 0.1 },
        scale: { duration: 0.2 }
      } : {
        duration: 0.3
      }}
      className="fixed bottom-20 right-4 md:bottom-10 md:right-10 z-[100] flex flex-col items-end gap-4"
      style={{ touchAction: 'none' }}
    >
      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, originY: 1, originX: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-[#131313] border border-[#D4AF37]/50 rounded-xl w-[320px] md:w-[380px] h-[450px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden cursor-default"
            onPointerDownCapture={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#8B0000] p-3 flex justify-between items-center border-b border-[#D4AF37]/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#D4AF37]">auto_awesome</span>
                <span className="text-[#D4AF37] font-headline font-bold text-sm uppercase tracking-widest">Thần Kim Quy</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsChatOpen(false)} className="text-[#D4AF37] hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#131313] relative custom-scrollbar">
              <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#8B0000_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="relative z-10 space-y-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-lg text-sm font-body leading-relaxed shadow-md whitespace-pre-wrap ${msg.role === 'user'
                        ? 'bg-[#D4AF37] text-[#131313] rounded-br-none font-medium'
                        : 'bg-[#1C1B1B] text-[#E5E2E1] border border-[#D4AF37]/30 rounded-bl-none italic'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1C1B1B] text-[#D4AF37] border border-[#D4AF37]/30 p-3 rounded-lg rounded-bl-none text-sm italic flex gap-1 shadow-md">
                      <span className="animate-bounce">.</span><span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span><span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#D4AF37]/30 bg-[#131313] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Hỏi Thần Kim Quy..."
                className="flex-1 bg-[#1C1B1B] border border-[#D4AF37]/30 text-[#E5E2E1] rounded px-3 py-2 text-sm focus:outline-none focus:border-[#D4AF37] placeholder:text-[#E5E2E1]/30"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#8B0000] text-[#D4AF37] px-3 py-2 rounded border border-[#D4AF37]/50 hover:bg-[#A00000] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Button */}
      <div
        id="kim-quy-mascot-btn"
        className="w-28 h-28 md:w-36 md:h-36 relative group flex items-center justify-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
      >
        {isGeneratingImg ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <img
            src={mascotImg}
            alt="Thần Kim Quy"
            className="w-full h-full object-contain p-2 hover:scale-110 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-pointer"
          aria-label="Chat with Kim Quy"
        />
        <div className="absolute -top-2 -right-2 bg-[#8B0000] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce pointer-events-none border border-[#D4AF37]">
          Hỏi đáp
        </div>
      </div>
    </motion.div>
  );
}
