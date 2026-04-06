import { useState } from 'react';
import { generateSpeech, playAudio } from '../services/ttsService';

export default function Generals() {
  const [selectedGeneral, setSelectedGeneral] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Tất Cả');

  const generals = [
    {
      id: 'ly-thuong-kiet',
      name: 'Lý Thường Kiệt',
      type: 'Bộ Binh',
      dynasty: 'NHÀ LÝ',
      title: 'T01 - PHẢN CÔNG',
      image: '/img/ly thuong kiet.jpg',
      tags: ['GIỮ TUYẾN', 'PHẢN ĐÒN', 'TÍCH UY DANH'],
      voice: 'Puck',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, 1 Bộ binh phe bạn nhận +1 TH đến hết lượt.', icon: 'shield' },
        { name: 'Nội tại', desc: 'Mỗi lượt, lần đầu Bộ binh phe bạn sống sót sau giao chiến: nhận 1 Uy danh.', icon: 'military_tech' }
      ],
      quote: 'Nam quốc sơn hà Nam đế cư, Tiệt nhiên định phận tại thiên thư. Như hà nghịch lỗ lai xâm phạm, Nhữ đẳng hành khan thủ bại hư.'
    },
    {
      id: 'tran-quoc-toan',
      name: 'Trần Quốc Toản',
      type: 'Bộ Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T02 - SĨ KHÍ XUNG TRẬN',
      image: '/img/tran quoc toan.jpg',
      tags: ['ĐẨY NHỊP SỚM', 'ĐÔNG QUÂN'],
      voice: 'Puck',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, được triển khai miễn phí 1 Bộ binh chi phí 1 từ tay.', icon: 'group_add' },
        { name: 'Nội tại', desc: 'Bộ binh đầu tiên tấn công trong lượt của bạn được +1 CT.', icon: 'swords' }
      ],
      quote: 'Phá cường địch, báo hoàng ân.'
    },
    {
      id: 'dinh-bo-linh',
      name: 'Đinh Bộ Lĩnh',
      type: 'Bộ Binh',
      dynasty: 'NHÀ ĐINH',
      title: 'T03 - ỔN ĐỊNH ĐỘI HÌNH',
      image: '/img/dinh bo linh.jpg',
      tags: ['ĐÁNH LÌ', 'HỒI TÀI NGUYÊN', 'ĐƯỜNG DÀI'],
      voice: 'Zephyr',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, hồi 1 Hào khí và lấy 1 Bộ binh từ Mộ bài về tay.', icon: 'recycling' },
        { name: 'Nội tại', desc: 'Lần đầu mỗi lượt bạn triển khai lá Bộ binh thứ hai, lá đó nhận +1 TH.', icon: 'security' }
      ],
      quote: 'Đại Cồ Việt ta nay đã độc lập, xưng đế một phương, há phải chịu luồn cúi kẻ khác!'
    },
    {
      id: 'nguyen-tri-phuong',
      name: 'Nguyễn Tri Phương',
      type: 'Bộ Binh',
      dynasty: 'NHÀ NGUYỄN',
      title: 'T04 - THỦ TRẬN TRUNG QUÂN',
      image: '/img/nguyen tri phuong.jpg',
      tags: ['THỦ BÀN GIỮA', 'GIỮ ĐỘI HÌNH'],
      voice: 'Charon',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Chọn 1 làn. Quân địch ở làn đó bị -1 CT đến hết lượt.', icon: 'trending_down' },
        { name: 'Nội tại', desc: 'Bộ binh của bạn ở làn giữa nhận +1 TH.', icon: 'fort' }
      ],
      quote: 'Thành mất thì chết theo thành, đó là đạo lý của kẻ làm tướng.'
    },
    {
      id: 'quang-trung',
      name: 'Quang Trung',
      type: 'Kỵ Binh',
      dynasty: 'NHÀ TÂY SƠN',
      title: 'T05 - ĐỘT PHÁ',
      image: '/img/quang trung.jpg',
      tags: ['ĐÁNH NHANH', 'KẾT VÁN GỌN'],
      voice: 'Fenrir',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, 1 Kỵ binh phe bạn được phép tấn công ngay trong lượt này.', icon: 'bolt' },
        { name: 'Nội tại', desc: 'Kỵ binh của bạn công phá trực diện gây thêm +1 sát thương.', icon: 'local_fire_department' }
      ],
      quote: 'Đánh cho để dài tóc, đánh cho để đen răng, đánh cho nó chích luân bất phản, đánh cho nó phiến giáp bất hoàn, đánh cho sử tri Nam quốc anh hùng chi hữu chủ.'
    },
    {
      id: 'pham-ngu-lao',
      name: 'Phạm Ngũ Lão',
      type: 'Kỵ Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T06 - TRUY KÍCH',
      image: '/img/Pham ngu lao.jpg',
      tags: ['ÁP LỰC NHIỀU LÀN', 'BÓP ĐIỂM HỞ'],
      voice: 'Fenrir',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, di chuyển 1 Kỵ binh phe bạn sang làn khác.', icon: 'swap_horiz' },
        { name: 'Nội tại', desc: 'Sau khi hạ địch, 1 Kỵ binh phe bạn được đổi làn 1 lần.', icon: 'directions_run' }
      ],
      quote: 'Múa giáo non sông trải mấy thu, Ba quân khí mạnh át sao Ngưu. Công danh duyên nợ vẫn vương vấn, Luống thẹn tai nghe chuyện Vũ hầu.'
    },
    {
      id: 'le-loi',
      name: 'Lê Lợi',
      type: 'Kỵ Binh',
      dynasty: 'NHÀ HẬU LÊ',
      title: 'T07 - CHI VIỆN KỴ QUÂN',
      image: '/img/le loi.jpg',
      tags: ['LỌC TAY', 'GIỮ NHỊP MID GAME'],
      voice: 'Zephyr',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, lá Kỵ binh đầu tiên bạn chơi trong lượt này giảm 1 Chi phí.', icon: 'savings' },
        { name: 'Nội tại', desc: 'Mỗi lượt, lần đầu bạn triển khai Kỵ binh: rút 1 rồi bỏ 1.', icon: 'find_replace' }
      ],
      quote: 'Ta đây: Núi Lam Sơn dấy nghĩa, Chốn hoang dã nương mình. Ngẫm thù lớn há đội trời chung, Căm giặc nước thề không cùng sống.'
    },
    {
      id: 'le-lai',
      name: 'Lê Lai',
      type: 'Kỵ Binh',
      dynasty: 'NHÀ HẬU LÊ',
      title: 'T08 - ĐÁNH CHỚP NHOÁNG',
      image: '/img/le lai.jpg',
      tags: ['CƠ ĐỘNG', 'TẠO GÓC ĐÁNH BẤT NGỜ'],
      voice: 'Charon',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Chọn 1 Kỵ binh phe bạn. Lá đó được +1 CT đến hết lượt.', icon: 'keyboard_double_arrow_up' },
        { name: 'Nội tại', desc: 'Kỵ binh phe bạn khi đổi làn nhận +1 TH đến hết lượt.', icon: 'shield' }
      ],
      quote: 'Chúa công hãy thay áo cho thần, thần nguyện chết thay chúa công để cứu lấy đại cục!'
    },
    {
      id: 'ngo-quyen',
      name: 'Ngô Quyền',
      type: 'Thủy Binh',
      dynasty: 'NHÀ NGÔ',
      title: 'T09 - BẪY PHẢN CÔNG',
      image: '/img/ngo quen.jpg',
      tags: ['PHẢN ĐÒN', 'CÀI THẾ', 'HỢP BẪY'],
      voice: 'Charon',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, được đặt miễn phí 1 Bẫy từ tay xuống HT.', icon: 'grid_view' },
        { name: 'Nội tại', desc: 'Mỗi lượt, lần đầu Bẫy hoặc Thủy binh phe bạn hạ địch: nhận 1 Uy danh.', icon: 'military_tech' }
      ],
      quote: 'Hoằng Tháo là đứa trẻ dại, đem quân từ xa đến mỏi mệt... Ta lấy quân mới rảnh rang đợi quân mỏi mệt, tất phá được.'
    },
    {
      id: 'tran-hung-dao',
      name: 'Trần Hưng Đạo',
      type: 'Thủy Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T10 - ĐIỀU QUÂN THỦY TRẬN',
      image: '/img/tran hung dao.jpg',
      tags: ['ĐÁNH LINH HOẠT', 'GIỮ NHỊP CHẮC'],
      voice: 'Zephyr',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, 1 Thủy binh phe bạn được +1 CT và đổi làn 1 lần.', icon: 'sailing' },
        { name: 'Nội tại', desc: 'Thủy binh đầu tiên của bạn mỗi lượt có thể đổi làn trước giao chiến.', icon: 'waves' }
      ],
      quote: 'Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa... Chỉ căm tức chưa xả thịt lột da, nuốt gan uống máu quân thù.'
    },
    {
      id: 'yet-kieu',
      name: 'Yết Kiêu',
      type: 'Thủy Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T11 - ĐỘT KÍCH HẬU TUYẾN',
      image: '/img/yet kieu.jpg',
      tags: ['PHÁ HỖ TRỢ', 'CẮT HẬU PHƯƠNG'],
      voice: 'Charon',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, chọn 1 quân HT của đối thủ, trả lá đó về tay chủ sở hữu.', icon: 'undo' },
        { name: 'Nội tại', desc: 'Nếu trước mặt trống, 1 Thủy binh phe bạn có thể tấn công vào HT đối diện thay vì công phá trực diện.', icon: 'my_location' }
      ],
      quote: 'Tôi tuy tài hèn sức mọn, nhưng cũng nguyện đem thân mình đền nợ nước. Quân Nguyên Mông dù mạnh đến đâu, tôi cũng sẽ đục thủng thuyền chúng cho chúng làm mồi cho cá.'
    },
    {
      id: 'tran-khanh-du',
      name: 'Trần Khánh Dư',
      type: 'Thủy Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T12 - CẮT HẬU CẦN',
      image: '/img/tran khanh du.jpg',
      tags: ['BÓP TAY', 'ÉP NHỊP', 'KHÓ CHỊU'],
      voice: 'Puck',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Nếu bạn đang có Thủy binh trên sân, đối thủ bỏ ngẫu nhiên 1 lá.', icon: 'delete_sweep' },
        { name: 'Nội tại', desc: 'Khi Thủy binh phe bạn hạ địch, đối thủ không thể đặt Bẫy trong lượt kế tiếp của họ.', icon: 'block' }
      ],
      quote: 'Tướng là chim ưng, dân lính là vịt, dùng vịt để nuôi chim ưng thì có gì là lạ?'
    },
    {
      id: 'bui-thi-xuan',
      name: 'Bùi Thị Xuân',
      type: 'Tượng Binh',
      dynasty: 'NHÀ TÂY SƠN',
      title: 'T13 - CÔNG PHÁ',
      image: '/img/bui thi xuan.jpg',
      tags: ['CHUYÊN PHÁ TUYẾN', 'CHỐT ĐIỂM'],
      voice: 'Kore',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Khi xuất trận, 1 Tượng binh phe bạn nhận +1 CT đến hết lượt.', icon: 'swords' },
        { name: 'Nội tại', desc: 'Tượng binh phe bạn công phá trực diện gây thêm +1 sát thương.', icon: 'local_fire_department' }
      ],
      quote: 'Con nhà võ, chết ở chiến trường là chuyện thường. Chỉ tiếc là chưa quét sạch được quân thù, chưa thấy được cảnh thái bình.'
    },
    {
      id: 'ba-trieu',
      name: 'Bà Triệu',
      type: 'Tượng Binh',
      dynasty: 'HẬU HÁN',
      title: 'T14 - CHẤN ÁP',
      image: '/img/ba trieu.jpg',
      tags: ['ÉP GIAO TRANH CÓ LỢI'],
      voice: 'Kore',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Chọn 1 quân địch TT. Lá đó bị -1 CT đến hết lượt.', icon: 'trending_down' },
        { name: 'Nội tại', desc: 'Mỗi khi bạn triển khai Tượng binh, quân địch đối diện với lá đó bị -1 CT đến hết lượt.', icon: 'warning' }
      ],
      quote: 'Ta muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở Biển Đông, đánh đuổi quân Ngô, giành lại giang sơn, cởi ách nô lệ, chứ không chịu khom lưng làm tì thiếp cho người!'
    },
    {
      id: 'le-hoan',
      name: 'Lê Hoàn',
      type: 'Tượng Binh',
      dynasty: 'TIỀN LÊ',
      title: 'T15 - DỒN ĐỘI HÌNH',
      image: '/img/le hoan.jpg',
      tags: ['GIỮ ÁP LỰC LÀN', 'RẤT KHÓ GỠ'],
      voice: 'Zephyr',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Di chuyển 1 Tượng binh phe bạn sang làn trống; nếu làn mới có địch, địch đó bị -1 TH đến hết lượt.', icon: 'compress' },
        { name: 'Nội tại', desc: 'Tượng binh đầu tiên bạn triển khai mỗi lượt nhận +1 TH.', icon: 'shield' }
      ],
      quote: 'Ta không nhận áo bào này, thì lấy ai làm chủ thiên hạ?'
    },
    {
      id: 'da-tuong',
      name: 'Dã Tượng',
      type: 'Tượng Binh',
      dynasty: 'NHÀ TRẦN',
      title: 'T16 - HỘ TRẬN',
      image: '/img/Da tuong.png',
      tags: ['ĐÁNH BỀN', 'TRỤ TRÂU'],
      voice: 'Fenrir',
      skills: [
        { name: 'Hiệu ứng xuất trận', desc: 'Lấy 1 Tượng binh từ Mộ bài về tay.', icon: 'front_hand' },
        { name: 'Nội tại', desc: 'Nếu Tượng binh phe bạn sống sót sau giao chiến, hồi 1 Hào khí (tối đa 1 lần mỗi lượt).', icon: 'health_and_safety' }
      ],
      quote: 'Chúa công đi đâu, thần xin theo đó. Dù phải xông pha tên mũi đạn, thần cũng không nề hà.'
    }
  ];

  const handleVoiceOver = async (quote: string, voice: string) => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const base64 = await generateSpeech(quote, voice as any);
      if (base64) {
        playAudio(base64);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPlaying(false);
    }
  };

  const filteredGenerals = generals.filter(general => {
    const matchesSearch = general.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         general.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'Tất Cả' || general.type === filterType;
    return matchesSearch && matchesType;
  });

  const selectedGeneralData = generals.find(g => g.id === selectedGeneral);

  return (
    <main className="pt-28 pb-12 px-6 md:px-12 grain-overlay min-h-screen">
      {/* Hero Header */}
      <header className="mb-12 relative">
        <div className="max-w-4xl">
          <p className="text-secondary font-headline uppercase tracking-[0.3em] text-sm mb-4">Thư Viện Anh Hùng</p>
          <h2 className="text-5xl md:text-7xl font-headline font-black text-on-surface mb-6 drop-shadow-md">DANH TƯỚNG ĐẠI VIỆT</h2>
          <div className="h-1 w-24 bg-primary-container mb-6"></div>
          <p className="text-on-surface-variant max-w-2xl text-lg font-light leading-relaxed">
            Hội tụ những bậc kỳ tài mưu lược, những vị anh hùng đã dựng xây và bảo vệ giang sơn gấm vóc qua nghìn năm văn hiến.
          </p>
        </div>
        <div className="absolute top-0 right-0 opacity-10 hidden xl:block">
          <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'wght' 100" }}>swords</span>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-10 items-center justify-between border-b border-outline-variant/30 pb-6">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {['Tất Cả', 'Bộ Binh', 'Thủy Binh', 'Kỵ Binh', 'Tượng Binh'].map((type) => (
            <button 
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-6 py-2 font-headline uppercase text-xs tracking-wider border transition-all whitespace-nowrap ${
                filterType === type 
                  ? 'bg-primary-container text-tertiary-fixed border-secondary/20 shadow-lg' 
                  : 'bg-surface-container-high text-on-surface-variant border-transparent hover:bg-surface-container-highest'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 border border-outline-variant/20 shrink-0">
          <span className="material-symbols-outlined text-outline">search</span>
          <input 
            className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface outline-none" 
            placeholder="Tìm kiếm anh hùng..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Generals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredGenerals.length > 0 ? filteredGenerals.map(general => (
          <div 
            key={general.id}
            className="group relative aspect-[3/4] bg-surface-container-high border-t-4 border-[#D4AF37] shadow-2xl transition-transform hover:-translate-y-2 cursor-pointer overflow-hidden"
            onClick={() => setSelectedGeneral(general.id)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/50 via-transparent to-transparent z-10"></div>
            <div className="w-full h-full bg-[#131313]/20 flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                alt={general.name}
                src={general.image}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-6 z-20">
              <span className="text-secondary text-[10px] font-sans font-extrabold uppercase tracking-[0.2em] mb-1 block">{general.type}</span>
              <h3 className="text-2xl font-sans font-black text-on-surface group-hover:text-secondary transition-colors uppercase">{general.name}</h3>
              {general.tags.length > 0 && (
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                  {general.tags.map(tag => (
                    <span key={tag} className={`text-[10px] px-2 py-1 font-bold ${tag === 'LEGENDARY' || tag === 'LEADER' ? 'bg-primary-container text-tertiary-fixed' : 'bg-secondary-container text-on-secondary-container'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-secondary/40 opacity-50"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-secondary/40 opacity-50"></div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-secondary/20 mb-4">person_search</span>
            <p className="text-secondary/60 font-headline uppercase tracking-widest">Không tìm thấy anh hùng phù hợp</p>
          </div>
        )}
      </div>

      {/* Modal Popup (Details) */}
      {selectedGeneral && selectedGeneralData && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="relative w-full max-w-5xl h-[707px] bg-surface overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(139,0,0,0.5)] border border-secondary/20">
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-[#131313]/40 flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-top"
                alt="General Portrait"
                src={selectedGeneralData.image}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/40"></div>
            </div>
            {/* Right Side: Content (Parchment Style) */}
            <div className="flex-1 bg-tertiary-fixed text-on-tertiary-fixed p-10 parchment-texture overflow-y-auto relative">
              <button 
                className="absolute top-6 right-6 text-on-tertiary-fixed/40 hover:text-primary-container transition-colors"
                onClick={() => setSelectedGeneral(null)}
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="mb-8">
                <h2 className="text-4xl font-sans font-black uppercase text-primary-container mb-2">{selectedGeneralData.name}</h2>
                <p className="font-sans tracking-widest text-xs font-extrabold text-on-tertiary-fixed-variant">
                  {selectedGeneralData.title} • {selectedGeneralData.dynasty}
                </p>
              </div>
              <div className="space-y-8">
                {/* Skills Section */}
                <div>
                  <h4 className="font-headline text-sm font-bold border-b border-primary-container/20 pb-2 mb-4">KỸ NĂNG ĐẶC BIỆT</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {selectedGeneralData.skills?.map((skill, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
                          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{skill.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{skill.name}</p>
                          <p className="text-xs opacity-80">{skill.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Quote Section */}
                <div>
                  <h4 className="font-headline text-sm font-bold border-b border-primary-container/20 pb-2 mb-4">LỜI NÓI TIÊU BIỂU</h4>
                  <p className="text-sm italic leading-relaxed">
                    "{selectedGeneralData.quote}"
                  </p>
                </div>
                {/* Action Bar */}
                <div className="flex gap-4 pt-6">
                  <button 
                    disabled={isPlaying}
                    onClick={() => handleVoiceOver(selectedGeneralData.quote, selectedGeneralData.voice)}
                    className={`flex-1 bg-primary-container text-tertiary-fixed px-6 py-4 font-headline uppercase text-xs tracking-[0.2em] font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 ${isPlaying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span className="material-symbols-outlined">{isPlaying ? 'hourglass_empty' : 'volume_up'}</span> 
                    {isPlaying ? 'Đang tạo giọng nói...' : 'Nghe Giọng Nói'}
                  </button>
                  <button className="w-16 h-16 border-2 border-primary-container flex items-center justify-center text-primary-container hover:bg-primary-container hover:text-tertiary-fixed transition-all">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
