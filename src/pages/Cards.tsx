import { useState } from 'react';

export default function Cards() {
  const [activeTab, setActiveTab] = useState('Quân lính');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterClass, setFilterClass] = useState('Tất cả');
  const [filterCost, setFilterCost] = useState<number | '3+' | null>(null);

  const cards = [
    // --- QUÂN LÍNH (L01 - L32) ---
    // BỘ BINH (L01 - L08)
    { id: 'L01', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'DÂN BINH GIỮ LŨY', cost: 1, atk: 1, def: 2, effect: 'Hiệu ứng: Nếu đứng ở làn giữa: +1 TH.', image: '/img/Dan binh giu luy.jpg', color: '#8B0000', icon: 'shield' },
    { id: 'L02', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'KHIÊN BINH', cost: 1, atk: 1, def: 3, effect: 'Hiệu ứng: Lần đầu bị tấn công mỗi lượt, quân địch đối diện -1 CT.', image: 'https://picsum.photos/seed/infantry2/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L03', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'MÁC BINH', cost: 1, atk: 2, def: 1, effect: 'Hiệu ứng: Khi chủ động tấn công: +1 CT.', image: 'https://picsum.photos/seed/infantry3/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L04', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'TRƯỜNG THƯƠNG BINH', cost: 2, atk: 2, def: 2, effect: 'Hiệu ứng: Tấn công trước khi bị phản công bởi Kỵ binh.', image: 'https://picsum.photos/seed/infantry4/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L05', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'KIẾM VỆ CẨM QUÂN', cost: 3, atk: 3, def: 3, effect: 'Hiệu ứng: Khi tiêu diệt 1 quân địch: +1 CT vĩnh viễn.', image: 'https://picsum.photos/seed/infantry5/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L06', category: 'Quân lính', type: 'Hậu phương', class: 'BỘ BINH', name: 'NỎ THỦ THÀNH', cost: 2, atk: 2, def: 2, effect: 'Hiệu ứng: Có thể đặt ở HT; không công phá trực diện.', image: 'https://picsum.photos/seed/infantry6/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L07', category: 'Quân lính', type: 'Hậu phương', class: 'BỘ BINH', name: 'CUNG THỦ TẦM XA', cost: 2, atk: 1, def: 2, effect: 'Hiệu ứng: Có thể tấn công bất kỳ quân nào ở Tiền tuyến địch.', image: 'https://picsum.photos/seed/infantry7/400/600', color: '#8B0000', icon: 'shield' },
    { id: 'L08', category: 'Quân lính', type: 'Tiền tuyến', class: 'BỘ BINH', name: 'ĐAO PHỦ CƯỜNG BINH', cost: 3, atk: 4, def: 2, effect: 'Hiệu ứng: Khi tấn công quân có TH thấp hơn: Gây sát thương xuyên thấu.', image: 'https://picsum.photos/seed/infantry8/400/600', color: '#8B0000', icon: 'shield' },

    // KỴ BINH (L09 - L16)
    { id: 'L09', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KỴ BINH THÁM BÁO', cost: 1, atk: 1, def: 1, effect: 'Hiệu ứng: Khi vào sân: được đổi làn 1 lần.', image: '/img/ky binh tham bao.jpg', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L10', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KHINH KỴ BINH', cost: 2, atk: 2, def: 2, effect: 'Hiệu ứng: Sau khi tấn công: có thể di chuyển sang làn bên cạnh.', image: 'https://picsum.photos/seed/cavalry2/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L11', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'TRỌNG KỴ BINH', cost: 3, atk: 3, def: 4, effect: 'Hiệu ứng: Giảm 1 sát thương nhận vào từ Bộ binh.', image: 'https://picsum.photos/seed/cavalry3/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L12', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KỴ BINH CUNG', cost: 3, atk: 2, def: 2, effect: 'Hiệu ứng: Có thể tấn công từ Hậu tuyến; +1 CT khi tấn công Thủy quân.', image: 'https://picsum.photos/seed/cavalry4/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L13', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'THIẾT KỴ BINH', cost: 4, atk: 4, def: 4, effect: 'Hiệu ứng: Khi tấn công: Đẩy lùi quân địch sang làn bên cạnh nếu trống.', image: 'https://picsum.photos/seed/cavalry5/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L14', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KỴ BINH GIÁO', cost: 2, atk: 3, def: 1, effect: 'Hiệu ứng: Tăng +2 CT khi tấn công quân ở Hậu tuyến.', image: 'https://picsum.photos/seed/cavalry6/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L15', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KỴ BINH ĐAO', cost: 2, atk: 2, def: 3, effect: 'Hiệu ứng: +1 TH khi đối đầu với Bộ binh.', image: 'https://picsum.photos/seed/cavalry7/400/600', color: '#8B0000', icon: 'horse_riding' },
    { id: 'L16', category: 'Quân lính', type: 'Tiền tuyến', class: 'KỴ BINH', name: 'KỴ BINH HỘ VỆ', cost: 3, atk: 1, def: 5, effect: 'Hiệu ứng: Bảo vệ Tướng: Chịu thay sát thương cho Tướng ở cùng làn.', image: 'https://picsum.photos/seed/cavalry8/400/600', color: '#8B0000', icon: 'horse_riding' },

    // THỦY QUÂN (L17 - L24)
    { id: 'L17', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'THUYỀN NHẸ TRINH SÁT', cost: 1, atk: 1, def: 1, effect: 'Hiệu ứng: Khi vào sân: được đặt vào bất kỳ làn trống nào.', image: '/img/thuye nhe trinh sat.jpg', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L18', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'CHIẾN THUYỀN CỠ TRUNG', cost: 2, atk: 2, def: 3, effect: 'Hiệu ứng: Khi ở làn nước: +1 TH.', image: 'https://picsum.photos/seed/naval2/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L19', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'LÂU THUYỀN CHIẾN', cost: 4, atk: 4, def: 5, effect: 'Hiệu ứng: Có thể chở thêm 1 quân Bộ binh (nhận hiệu ứng của Thủy quân).', image: 'https://picsum.photos/seed/naval3/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L20', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'THUYỀN MÔNG ĐỒNG', cost: 3, atk: 3, def: 3, effect: 'Hiệu ứng: Tốc độ cao: Có thể tấn công ngay trong lượt vừa triệu hồi.', image: 'https://picsum.photos/seed/naval4/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L21', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'THUYỀN HỎA CÔNG', cost: 2, atk: 5, def: 1, effect: 'Hiệu ứng: Tự sát: Khi tấn công, tiêu diệt cả bản thân và mục tiêu.', image: 'https://picsum.photos/seed/naval5/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L22', category: 'Quân lính', type: 'Hậu phương', class: 'THỦY QUÂN', name: 'THUYỀN VẬN TẢI', cost: 1, atk: 0, def: 4, effect: 'Hiệu ứng: Mỗi lượt: Hồi 1 Hào khí cho Tướng.', image: 'https://picsum.photos/seed/naval6/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L23', category: 'Quân lính', type: 'Hậu phương', class: 'THỦY QUÂN', name: 'THUYỀN NỎ', cost: 3, atk: 3, def: 2, effect: 'Hiệu ứng: Tấn công xuyên thấu qua Tiền tuyến địch.', image: 'https://picsum.photos/seed/naval7/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },
    { id: 'L24', category: 'Quân lính', type: 'Tiền tuyến', class: 'THỦY QUÂN', name: 'THUYỀN RỒNG', cost: 5, atk: 5, def: 6, effect: 'Hiệu ứng: Uy thế: Giảm -1 CT của tất cả quân địch đối diện.', image: 'https://picsum.photos/seed/naval8/400/600', color: '#D4AF37', textColor: '#131313', icon: 'sailing' },

    // TƯỢNG BINH (L25 - L32)
    { id: 'L25', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG NÀI CHIẾN', cost: 2, atk: 2, def: 3, effect: 'Hiệu ứng: Khi công phá trực diện: gây thêm +1 sát thương.', image: '/img/tuong nai chien.jpg', color: '#8B0000', icon: 'elephant' },
    { id: 'L26', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'THIẾT GIÁP TƯỢNG', cost: 4, atk: 4, def: 6, effect: 'Hiệu ứng: Không bị đẩy lùi bởi các hiệu ứng Kế sách.', image: 'https://picsum.photos/seed/elephant2/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L27', category: 'Quân lính', type: 'Hậu phương', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH CUNG', cost: 3, atk: 3, def: 4, effect: 'Hiệu ứng: Có thể tấn công từ Hậu tuyến với tầm xa.', image: 'https://picsum.photos/seed/elephant3/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L28', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH ĐAO', cost: 3, atk: 4, def: 4, effect: 'Hiệu ứng: Gây sát thương lan sang 2 làn bên cạnh.', image: 'https://picsum.photos/seed/elephant4/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L29', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH GIÁO', cost: 3, atk: 5, def: 3, effect: 'Hiệu ứng: Xuyên thấu: Tấn công cả quân Tiền tuyến và Hậu phương địch.', image: 'https://picsum.photos/seed/elephant5/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L30', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH HỘ VỆ', cost: 4, atk: 2, def: 8, effect: 'Hiệu ứng: Khi bị tiêu diệt: Triệu hồi 1 quân Bộ binh ngẫu nhiên.', image: 'https://picsum.photos/seed/elephant6/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L31', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH THÁM BÁO', cost: 2, atk: 2, def: 2, effect: 'Hiệu ứng: Khi vào sân: Xem 2 lá bài trên cùng của bộ bài mình.', image: 'https://picsum.photos/seed/elephant7/400/600', color: '#8B0000', icon: 'elephant' },
    { id: 'L32', category: 'Quân lính', type: 'Tiền tuyến', class: 'TƯỢNG BINH', name: 'TƯỢNG BINH VƯƠNG', cost: 6, atk: 6, def: 10, effect: 'Hiệu ứng: Mỗi khi tiêu diệt địch: Hồi đầy máu cho bản thân.', image: 'https://picsum.photos/seed/elephant8/400/600', color: '#8B0000', icon: 'elephant' },

    // --- KẾ SÁCH (K01 - K15) ---
    { id: 'K01', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'KHÍCH LỆ SĨ KHÍ', cost: 1, atk: 0, def: 0, effect: 'Hiệu ứng: 1 quân đồng minh nhận +1 CT đến hết lượt.', image: '/img/khich len si khi.jpg', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K02', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'HỎA CÔNG CHIẾN', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Gây 2 sát thương lên 1 quân địch bất kỳ.', image: 'https://picsum.photos/seed/strat2/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K03', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'TRUYỀN HỊCH XUẤT QUÂN', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Rút 2 lá bài, sau đó bỏ 1 lá.', image: '/img/hieu co lenh.jpg', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K04', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'VƯỜN KHÔNG NHÀ TRỐNG', cost: 3, atk: 0, def: 0, effect: 'Hiệu ứng: Hồi 3 Hào khí cho Tướng phe bạn.', image: 'https://picsum.photos/seed/strat4/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K05', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'MAI PHỤC HIỂM ĐỊA', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Chọn 1 quân địch, quân đó không thể tấn công trong lượt sau.', image: 'https://picsum.photos/seed/strat5/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K06', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'LIÊN HOÀN KẾ', cost: 4, atk: 0, def: 0, effect: 'Hiệu ứng: Khóa 2 quân địch cạnh nhau, chúng nhận sát thương cùng lúc.', image: 'https://picsum.photos/seed/strat6/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K07', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'ĐIỆU HỔ LY SƠN', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Đẩy 1 quân địch từ Tiền tuyến về Hậu tuyến.', image: 'https://picsum.photos/seed/strat7/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K08', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'PHẢN GIÁN KẾ', cost: 3, atk: 0, def: 0, effect: 'Hiệu ứng: Đổi quyền điều khiển 1 quân lính địch có Cost <= 2.', image: 'https://picsum.photos/seed/strat8/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K09', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'MỸ NHÂN KẾ', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Làm choáng 1 quân địch trong 2 lượt.', image: 'https://picsum.photos/seed/strat9/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K10', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'KHÔNG THÀNH KẾ', cost: 3, atk: 0, def: 0, effect: 'Hiệu ứng: Tướng phe ta không nhận sát thương trong lượt này.', image: 'https://picsum.photos/seed/strat10/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K11', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'KIM THIỀN THOÁT XÁC', cost: 1, atk: 0, def: 0, effect: 'Hiệu ứng: Đưa 1 quân đồng minh từ sân về tay.', image: 'https://picsum.photos/seed/strat11/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K12', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'MAN THIÊN QUÁ HẢI', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Vô hiệu hóa 1 lá Bẫy của đối phương.', image: 'https://picsum.photos/seed/strat12/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K13', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'ÁM ĐỘ TRẦN THƯƠNG', cost: 3, atk: 0, def: 0, effect: 'Hiệu ứng: Triệu hồi 1 quân lính từ tay vào HT mà không tốn Cost.', image: 'https://picsum.photos/seed/strat13/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K14', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'TIÊN PHÁT CHẾ NHÂN', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Cho phép 1 quân lính tấn công ngay lập tức.', image: 'https://picsum.photos/seed/strat14/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },
    { id: 'K15', category: 'Kế sách', type: 'Chủ động', class: 'CHIẾN THUẬT', name: 'DĨ DẬT ĐÃI LAO', cost: 2, atk: 0, def: 0, effect: 'Hiệu ứng: Bỏ qua lượt này, lượt sau nhận gấp đôi Hào khí.', image: 'https://picsum.photos/seed/strat15/400/600', color: '#D4AF37', textColor: '#131313', icon: 'gavel' },

    // --- BẪY (B01 - B10) ---
    { id: 'B01', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BÃI CỌC NGẦM', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi địch tấn công qua làn này. Hiệu ứng: Quân địch đó bị -2 TH ngay lập tức.', image: '/img/bai coc ngam.jpg', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B02', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'HỐ CHÔNG TRE', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi quân Bộ binh địch vào làn này. Hiệu ứng: Gây 2 sát thương.', image: '/img/ham chong.jpg', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B03', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY LỬA TRÊN NÚI', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch di chuyển vào làn rừng/núi. Hiệu ứng: Gây 3 sát thương lan.', image: 'https://picsum.photos/seed/trap3/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B04', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY ĐÁ LĂN', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch tấn công ở làn núi. Hiệu ứng: Gây 4 sát thương.', image: 'https://picsum.photos/seed/trap4/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B05', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY LƯỚI SẮT', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi quân Kỵ binh địch vào làn này. Hiệu ứng: Giảm -2 CT của quân đó.', image: 'https://picsum.photos/seed/trap5/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B06', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY HỐ VÔI', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch vào làn này. Hiệu ứng: Làm mù quân địch (giảm 50% tỉ lệ trúng).', image: 'https://picsum.photos/seed/trap6/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B07', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY CUNG NỎ', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch vào làn này. Hiệu ứng: Gây 2 sát thương lên quân đó và quân phía sau.', image: 'https://picsum.photos/seed/trap7/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B08', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY HỐ BÙN', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi quân Tượng binh địch vào làn này. Hiệu ứng: Làm choáng quân đó trong 1 lượt.', image: 'https://picsum.photos/seed/trap8/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B09', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY GAI SẮT', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch di chuyển qua làn này. Hiệu ứng: Gây 1 sát thương và dừng di chuyển.', image: 'https://picsum.photos/seed/trap9/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },
    { id: 'B10', category: 'Bẫy', type: 'Phản ứng', class: 'ĐỊA HÌNH', name: 'BẪY ĐỊA LÔI', cost: 3, atk: 0, def: 0, effect: 'Điều kiện: Khi bất kỳ quân địch nào vào làn này. Hiệu ứng: Tiêu diệt ngay lập tức.', image: 'https://picsum.photos/seed/trap10/400/600', color: '#131313', textColor: '#D4AF37', icon: 'settings_input_component' },

    // --- SỰ KIỆN (S01 - S04) ---
    { id: 'S01', category: 'Sự kiện', type: 'Toàn cục', class: 'THIÊN THỜI', name: 'BẠCH ĐẰNG DẬY SÓNG', cost: 0, atk: 0, def: 0, effect: 'Hiệu ứng: Thủy binh phe bạn nhận +1 CT đến hết lượt. Sau đó đặt lá này vào Sử bộ.', image: '/img/bach dang day song.jpg', color: '#2A2A2A', icon: 'event' },
    { id: 'S02', category: 'Sự kiện', type: 'Toàn cục', class: 'THIÊN THỜI', name: 'MƯA GIÔNG GIÓ LỚN', cost: 0, atk: 0, def: 0, effect: 'Hiệu ứng: Tất cả quân Hậu phương không thể tấn công trong lượt này.', image: 'https://picsum.photos/seed/event2/400/600', color: '#2A2A2A', icon: 'event' },
    { id: 'S03', category: 'Sự kiện', type: 'Toàn cục', class: 'THIÊN THỜI', name: 'ĐẠI HỶ CHIẾN THẮNG', cost: 0, atk: 0, def: 0, effect: 'Hiệu ứng: Hồi 2 Hào khí cho cả hai người chơi.', image: 'https://picsum.photos/seed/event3/400/600', color: '#2A2A2A', icon: 'event' },
    { id: 'S04', category: 'Sự kiện', type: 'Toàn cục', class: 'THIÊN THỜI', name: 'NHẬT THỰC TOÀN PHẦN', cost: 0, atk: 0, def: 0, effect: 'Hiệu ứng: Tất cả quân lính trên sân bị giảm -1 CT trong 1 lượt.', image: 'https://picsum.photos/seed/event4/400/600', color: '#2A2A2A', icon: 'event' },

    // --- MỆNH LỆNH NHANH (Q01 - Q16) ---
    { id: 'Q01', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'PHẢN CÔNG CHỚP NHOÁNG', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi quân địch vừa tấn công. Hiệu ứng: Cho phép 1 quân ta phản công ngay lập tức.', image: 'https://picsum.photos/seed/quick1/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q02', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'RÚT QUÂN CHIẾN THUẬT', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi 1 quân ta sắp bị tiêu diệt. Hiệu ứng: Đưa quân đó về tay thay vì vào Mộ bài.', image: 'https://picsum.photos/seed/quick2/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q03', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'CỨU VIỆN KỊP THỜI', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi Tướng bị tấn công trực diện. Hiệu ứng: Triệu hồi 1 quân Bộ binh từ tay vào làn đó để đỡ đòn.', image: 'https://picsum.photos/seed/quick3/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q04', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'ĐỔI LÀN THẦN TỐC', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Trong bước Giao chiến của địch. Hiệu ứng: Di chuyển 1 quân ta sang làn bên cạnh.', image: 'https://picsum.photos/seed/quick4/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q05', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'CHẶN ĐỨNG KẾ SÁCH', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi đối phương vừa dùng 1 lá Kế sách. Hiệu ứng: Vô hiệu hóa lá Kế sách đó.', image: 'https://picsum.photos/seed/quick5/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q06', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'TĂNG CƯỜNG PHÒNG THỦ', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi 1 quân ta bị tấn công. Hiệu ứng: Quân đó nhận +2 TH đến hết lượt.', image: 'https://picsum.photos/seed/quick6/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q07', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'PHÁ BẪY TỪ XA', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi đối phương vừa đặt 1 lá Bẫy. Hiệu ứng: Tiêu diệt lá Bẫy đó ngay lập tức.', image: 'https://picsum.photos/seed/quick7/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q08', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'LỆNH TRUY KÍCH', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Sau khi 1 quân ta tiêu diệt 1 quân địch. Hiệu ứng: Quân ta đó được tấn công thêm 1 lần.', image: 'https://picsum.photos/seed/quick8/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q09', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'HỒI QUÂN CẤP TỐC', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Cuối lượt của đối phương. Hiệu ứng: Dựng lại 1 quân ta đã xoay ngang.', image: 'https://picsum.photos/seed/quick9/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q10', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'LỆNH CẤM VẬN', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi đối phương định triệu hồi quân lính có Cost >= 3. Hiệu ứng: Đối phương phải trả thêm 1 Quân lệnh.', image: 'https://picsum.photos/seed/quick10/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q11', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'PHÁ TRẬN ĐỊA', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi đối phương có 3 quân ở Tiền tuyến. Hiệu ứng: Đẩy 1 quân địch về tay.', image: 'https://picsum.photos/seed/quick11/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q12', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'LỆNH TỔNG LỰC', cost: 3, atk: 0, def: 0, effect: 'Điều kiện: Trong lượt của mình. Hiệu ứng: Tất cả quân ta nhận +1 CT nhưng bị -1 TH.', image: 'https://picsum.photos/seed/quick12/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q13', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'QUYẾT TỬ CHO TỔ QUỐC', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Khi 1 quân ta bị tiêu diệt. Hiệu ứng: Gây 2 sát thương lên quân địch vừa tiêu diệt nó.', image: 'https://picsum.photos/seed/quick13/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q14', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'LỆNH GIẢI VÂY', cost: 2, atk: 0, def: 0, effect: 'Điều kiện: Khi có quân địch ở cả 3 làn Tiền tuyến. Hiệu ứng: Làm choáng tất cả quân địch trong 1 lượt.', image: 'https://picsum.photos/seed/quick14/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q15', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'LỆNH ĐIỀU ĐỘNG', cost: 1, atk: 0, def: 0, effect: 'Điều kiện: Đầu lượt đối phương. Hiệu ứng: Xem 3 lá bài trên cùng của bộ bài mình và sắp xếp lại.', image: 'https://picsum.photos/seed/quick15/400/600', color: '#006400', icon: 'bolt' },
    { id: 'Q16', category: 'Mệnh lệnh nhanh', type: 'Phản ứng', class: 'QUÂN LỆNH', name: 'KHÍCH LỆ CUỐI CÙNG', cost: 0, atk: 0, def: 0, effect: 'Điều kiện: Khi Hào khí của bạn <= 5. Hiệu ứng: Rút 2 lá bài.', image: 'https://picsum.photos/seed/quick16/400/600', color: '#006400', icon: 'bolt' }
  ];

  const filteredCards = cards.filter(card => {
    const matchesTab = card.category === activeTab;
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = filterClass === 'Tất cả' || card.class === filterClass.toUpperCase();
    
    let matchesCost = true;
    if (filterCost !== null) {
      if (filterCost === '3+') {
        matchesCost = card.cost >= 3;
      } else {
        matchesCost = card.cost === filterCost;
      }
    }

    return matchesTab && matchesSearch && matchesClass && matchesCost;
  });

  return (
    <main className="pt-24 pb-20 px-4 md:px-10 battle-map-bg min-h-screen">
      {/* Search & Filter Section */}
      <section className="mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-end justify-between bg-surface-container/50 backdrop-blur-xl p-8 border border-[#D4AF37]/10 shadow-2xl">
          <div className="w-full lg:max-w-md space-y-2">
            <label className="block text-xs uppercase tracking-widest text-[#D4AF37]/60 font-bold">Tìm kiếm theo tên</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37]">search</span>
              <input 
                className="w-full bg-[#131313] border border-[#D4AF37]/30 text-on-surface pl-12 pr-4 py-3 focus:border-[#D4AF37] focus:ring-0 transition-all placeholder:text-[#E5E2E1]/20 outline-none" 
                placeholder="Ví dụ: Dân binh..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            {activeTab === 'Quân lính' && (
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#D4AF37]/60 font-bold">Lọc Hệ</label>
                <select 
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="bg-[#131313] border border-[#D4AF37]/30 text-on-surface px-6 py-3 focus:border-[#D4AF37] transition-all min-w-[140px] outline-none"
                >
                  <option>Tất cả</option>
                  <option>Bộ binh</option>
                  <option>Thủy quân</option>
                  <option>Kỵ binh</option>
                  <option>Tượng binh</option>
                </select>
              </div>
            )}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-[#D4AF37]/60 font-bold">Quân lương (Cost)</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFilterCost(filterCost === 1 ? null : 1)}
                  className={`w-10 h-10 border transition-all flex items-center justify-center font-bold ${filterCost === 1 ? 'bg-[#8B0000] text-[#D4AF37] border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'}`}
                >
                  1
                </button>
                <button 
                  onClick={() => setFilterCost(filterCost === 2 ? null : 2)}
                  className={`w-10 h-10 border transition-all flex items-center justify-center font-bold ${filterCost === 2 ? 'bg-[#8B0000] text-[#D4AF37] border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'}`}
                >
                  2
                </button>
                <button 
                  onClick={() => setFilterCost(filterCost === '3+' ? null : '3+')}
                  className={`w-10 h-10 border transition-all flex items-center justify-center font-bold ${filterCost === '3+' ? 'bg-[#8B0000] text-[#D4AF37] border-[#D4AF37]' : 'border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]'}`}
                >
                  3+
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <nav className="flex flex-wrap gap-2 mb-10 border-b border-[#D4AF37]/10 pb-4">
        {['Quân lính', 'Kế sách', 'Bẫy', 'Sự kiện', 'Mệnh lệnh nhanh'].map(tab => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFilterClass('Tất cả');
              setFilterCost(null);
            }}
            className={`px-8 py-3 font-bold transition-all ${activeTab === tab ? 'bg-[#8B0000] text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_15px_rgba(139,0,0,0.5)]' : 'text-[#E5E2E1]/60 hover:text-[#D4AF37] hover:bg-[#1C1B1B]'}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredCards.length > 0 ? filteredCards.map((card) => (
          <div key={card.id} className="group relative aspect-square overflow-hidden border-4 border-[#D4AF37]/40 hover:border-[#D4AF37] transition-all duration-500 shadow-2xl cursor-pointer">
            {/* Full Frame Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent opacity-90"></div>
            </div>

            {/* Card Content Overlay */}
            <div className="relative h-full z-10 flex flex-col p-4 text-white justify-between">
              {/* Top Section */}
              <div className="flex justify-between items-start">
                <div 
                  className="w-10 h-10 flex items-center justify-center font-black text-xl border-2 backdrop-blur-md"
                  style={{ backgroundColor: `${card.color}CC`, color: card.textColor || '#D4AF37', borderColor: card.color === '#D4AF37' ? '#131313' : '#D4AF37' }}
                >
                  {card.cost}
                </div>
                <div className="text-right bg-[#131313]/60 p-1.5 rounded backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] uppercase font-black tracking-tighter block text-[#D4AF37]">{card.type}</span>
                  <span className="font-sans font-extrabold text-xs text-white">{card.class}</span>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="space-y-2">
                <div className="text-center">
                  <h3 className="font-sans text-xl font-black uppercase leading-tight border-b-2 border-[#D4AF37]/30 pb-1 inline-block drop-shadow-lg">{card.name}</h3>
                </div>
                
                {/* Stats */}
                {card.category === 'Quân lính' && (
                  <div className="flex justify-center gap-6 py-1 bg-[#131313]/40 rounded backdrop-blur-sm border border-white/5">
                    <div className="text-center">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-[#D4AF37]">Công</span>
                      <span className="text-xl font-black font-sans text-white">{card.atk}</span>
                    </div>
                    <div className="w-px h-8 bg-white/20"></div>
                    <div className="text-center">
                      <span className="block text-[8px] font-black uppercase tracking-widest text-[#D4AF37]">Thủ</span>
                      <span className="text-xl font-black font-sans text-white">{card.def}</span>
                    </div>
                  </div>
                )}

                {/* Effect Box */}
                <div className="bg-[#131313]/60 p-2 rounded border border-white/10 backdrop-blur-sm min-h-[60px] flex items-center justify-center">
                  <p className="text-xs font-medium italic text-center leading-tight text-white/90">
                    {card.effect}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-[#D4AF37]/20 mb-4">search_off</span>
            <p className="text-[#D4AF37]/60 font-sans font-extrabold uppercase tracking-widest">Không tìm thấy thẻ bài phù hợp</p>
          </div>
        )}
      </div>
    </main>
  );
}
