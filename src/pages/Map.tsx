import React, { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  ArrowLeft,
  Search,
  MapPin,
  Shield,
  Sword,
  Landmark,
  Castle,
  X,
  Route,
  Heart,
  Star,
  BookOpen
} from 'lucide-react';

type LocationType = 'thanh-co' | 'tran-chien' | 'danh-tuong' | 'di-tich';

type NearbyItem = {
  name: string;
  distance: string;
  status: string;
  type: 'location' | 'npc' | 'enemy';
};

type LocationData = {
  id: string;
  name: string;
  subName: string;
  province: string;
  year: string;
  lat: number;
  lng: number;
  type: LocationType;
  image: string;
  mapImage?: string;
  description: string;
  highlight: string;
  historicalNote: string;
  exploration: string;
  anecdote: string;
  history: string;
  x?: number;
  y?: number;
  card: {
    name: string;
    image: string;
    rarity: string;
    stats: string;
    route: string;
  };
  nearby: NearbyItem[];
};

const locations: LocationData[] = [
  {
    id: 'thang-long',
    name: 'Hoàng Thành Thăng Long',
    subName: 'Thăng Long',
    province: 'Hà Nội',
    year: 'Từ năm 1010',
    lat: 21.0367,
    lng: 105.8398,
    type: 'thanh-co',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Năm 1010, Lý Thái Tổ dời đô về Đại La, đổi tên thành Thăng Long (Rồng bay lên). Nơi đây trở thành trái tim của Đại Việt, chứng kiến bao thăng trầm và những quyết định lịch sử định đoạt vận mệnh dân tộc như Hội nghị Diên Hồng.',
    highlight: 'Trái tim của Đại Việt, nơi rồng thiêng bay lên, hội tụ linh khí đất trời.',
    historicalNote: 'Di sản này gắn với nhiều lớp kiến trúc cung đình và dấu tích của các triều đại Lý, Trần, Lê.',
    exploration: 'Hành trình xuyên không qua các tầng địa chất lịch sử, từ nền móng cung điện thời Lý đến các lầu gác thời Lê. Du khách có thể chiêm ngưỡng Đoan Môn, Điện Kính Thiên và khu khảo cổ 18 Hoàng Diệu để thấy sự tiếp nối văn hóa ngàn năm.',
    anecdote: 'Tương truyền khi vua Lý Thái Tổ dời đô từ Hoa Lư về thành Đại La, lúc thuyền vừa cập bến, ngài thấy rồng vàng bay lên từ sông Hồng. Coi đó là điềm lành, ngài đổi tên thành Thăng Long, mở ra kỷ nguyên rực rỡ cho dân tộc.',
    history: 'Được xây dựng vào thế kỷ 11, Hoàng Thành Thăng Long là trung tâm quyền lực chính trị của Đại Việt trong suốt 13 thế kỷ. Đây là nơi diễn ra các sự kiện trọng đại như Hội nghị Diên Hồng, nơi ý chí toàn dân được tập hợp để chống giặc ngoại xâm.',
    card: {
      name: 'Chiếu Dời Đô',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Chiến Thuật',
      stats: 'Phòng thủ +50, Sĩ khí +100',
      route: '/cards/chieu-doi-do',
    },
    nearby: [
      { name: 'Điện Kính Thiên', distance: '1 km', status: 'Đang mở cửa', type: 'location' },
      { name: 'Sứ Giả Nhà Nguyên', distance: '5 km', status: 'Đang khiêu khích', type: 'enemy' },
    ],
  },
  {
    id: 'nhu-nguyet',
    name: 'Sông Như Nguyệt',
    subName: 'Phòng Tuyến',
    province: 'Bắc Ninh',
    year: '1077',
    lat: 21.2158,
    lng: 106.0592,
    type: 'tran-chien',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Năm 1077, Lý Thường Kiệt lập phòng tuyến thép chặn đứng 30 vạn quân Tống. Nơi đây đã vang lên bài thơ thần "Nam Quốc Sơn Hà" - bản Tuyên ngôn Độc lập đầu tiên, đập tan ý chí kẻ thù.',
    highlight: 'Nơi vang lên bài thơ thần Nam Quốc Sơn Hà, đập tan 30 vạn quân Tống.',
    historicalNote: 'Địa danh này rất phù hợp để đưa vào game vì dễ gợi cảm giác vừa học lịch sử vừa khám phá bản đồ.',
    exploration: 'Dọc theo bờ sông Cầu, du khách có thể tham quan Đền Xà, nơi thờ thánh Tam Giang. Cảnh quan sông nước hữu tình che giấu một trận địa phòng thủ kiên cố với hệ thống cọc tre và chiến lũy đất vững chãi của quân dân nhà Lý.',
    anecdote: 'Trong đêm tối tĩnh mịch, từ ngôi đền bên sông bỗng vang lên giọng đọc hào hùng bài thơ "Nam Quốc Sơn Hà". Quân Tống nghe thấy, ngỡ là tiếng thần linh quở trách kẻ xâm lược, khiến tinh thần hoang mang, rệu rã trước khi bị quân ta tổng tấn công.',
    history: 'Trận Như Nguyệt là đỉnh cao của nghệ thuật quân sự "tiên phát chế nhân" và phòng ngự chủ động. Lý Thường Kiệt đã khéo léo kết hợp giữa tâm lý chiến và thực chiến để bảo vệ vững chắc biên cương phía Bắc trước tham vọng của nhà Tống.',
    card: {
      name: 'Lý Thường Kiệt',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 95, Trí tuệ 98',
      route: '/cards/ly-thuong-kiet',
    },
    nearby: [
      { name: 'Đền Xà', distance: '2 km', status: 'Nơi đọc thơ thần', type: 'location' },
      { name: 'Quân Tống', distance: 'Bờ Bắc', status: 'Đang hạ trại', type: 'enemy' },
    ],
  },
  {
    id: 'van-kiep',
    name: 'Vạn Kiếp',
    subName: 'Đại Bản Doanh',
    province: 'Hải Dương',
    year: 'Thế kỷ 13',
    lat: 21.1219,
    lng: 106.3533,
    type: 'thanh-co',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Vùng đất đắc địa Lục Đầu Giang được Hưng Đạo Đại Vương Trần Quốc Tuấn chọn làm căn cứ quân sự. Từ đây, ngài đã hội quân, huấn luyện binh sĩ và chỉ huy đánh tan giặc Nguyên Mông hùng mạnh.',
    highlight: 'Đại bản doanh của Hưng Đạo Vương, nơi hội tụ 20 vạn thủy bộ binh.',
    historicalNote: 'Đây là điểm đến quen thuộc khi nhắc đến các dấu ấn quân sự thời Trần và tinh thần đoàn kết toàn dân.',
    exploration: 'Nằm tại ngã sáu Lục Đầu Giang, Vạn Kiếp là một pháo đài tự nhiên khổng lồ. Du khách có thể thăm Đền Kiếp Bạc, nơi thờ Hưng Đạo Vương, và tìm hiểu về các bãi tập trận, xưởng đóng tàu chiến quy mô lớn của quân đội nhà Trần.',
    anecdote: 'Tương truyền, trước trận quyết chiến, Hưng Đạo Vương đã cho khắc hai chữ "Sát Thát" lên cánh tay các binh sĩ tại Vạn Kiếp. Lời thề quyết tử cho tổ quốc quyết sinh đã tạo nên một sức mạnh tinh thần vô song, khiến quân Nguyên Mông phải khiếp sợ.',
    history: 'Vạn Kiếp không chỉ là căn cứ quân sự mà còn là biểu tượng của "Hào khí Đông A". Nơi đây đã chứng kiến sự ra đời của "Hịch Tướng Sĩ", một áng thiên cổ hùng văn khích lệ lòng yêu nước và ý chí chiến đấu của toàn quân, toàn dân.',
    card: {
      name: 'Trần Hưng Đạo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 100, Trí tuệ 100',
      route: '/cards/tran-hung-dao',
    },
    nearby: [
      { name: 'Bến Bình Than', distance: '15 km', status: 'Hội nghị Diên Hồng', type: 'location' },
      { name: 'Yết Kiêu', distance: 'Tại bến', status: 'Đang huấn luyện', type: 'npc' },
    ],
  },
  {
    id: 'bach-dang',
    name: 'Bạch Đằng',
    subName: 'Cửa Sông',
    province: 'Hải Phòng - Quảng Ninh',
    year: '938, 981, 1288',
    lat: 20.8390,
    lng: 106.7745,
    type: 'tran-chien',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Dòng sông huyền thoại chứng kiến 3 lần đại thắng thủy quân Nam Hán (938), Tiền Lê (981) và Nguyên Mông (1288). Nghệ thuật cắm cọc gỗ ngầm lợi dụng thủy triều là đỉnh cao quân sự Việt Nam.',
    highlight: 'Mồ chôn quân xâm lược với trận địa cọc gỗ ngầm huyền thoại.',
    historicalNote: 'Nơi đây có quần thể đền, bãi cọc và không gian tưởng niệm các chiến thắng trên sông Bạch Đằng.',
    exploration: 'Du khách có thể đi thuyền trên sông Bạch Đằng để cảm nhận sự hùng vĩ của dòng sông lịch sử. Các bãi cọc gỗ được phục dựng giúp hình dung rõ nét về trận địa mai phục độc đáo đã ba lần nhấn chìm chiến thuyền quân phương Bắc.',
    anecdote: 'Ngô Quyền đã lợi dụng thủy triều lên xuống để nhử địch vào trận địa cọc gỗ bịt sắt. Khi triều rút, thuyền địch mắc cạn và bị phá tan tành. Đây là minh chứng cho trí tuệ quân sự tuyệt vời của cha ông ta.',
    history: 'Bạch Đằng là dòng sông của những chiến thắng lẫy lừng: Ngô Quyền đánh tan quân Nam Hán (938), Lê Hoàn phá quân Tống (981) và Trần Hưng Đạo tiêu diệt quân Nguyên Mông (1288), khẳng định bản lĩnh Việt.',
    card: {
      name: 'Cọc Bạch Đằng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Vũ Khí',
      stats: 'Sát thương thủy chiến +200',
      route: '/cards/coc-bach-dang',
    },
    nearby: [
      { name: 'Trận địa cọc', distance: 'Dưới lòng sông', status: 'Đang mai phục', type: 'location' },
      { name: 'Chiến thuyền Ô Mã Nhi', distance: 'Đang tiến vào', status: 'Sắp mắc cạn', type: 'enemy' },
    ],
  },
  {
    id: 'con-dao',
    name: 'Côn Đảo',
    subName: 'Vùng Đất Thiêng',
    province: 'Bà Rịa - Vũng Tàu',
    year: 'Từ cuối thế kỷ 19',
    lat: 8.6821,
    lng: 106.6055,
    type: 'di-tich',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Từng được mệnh danh là "địa ngục trần gian", Côn Đảo nay là minh chứng lịch sử hào hùng cho ý chí kiên cường, tinh thần bất khuất của những người anh hùng yêu nước Việt Nam.',
    highlight: 'Biểu tượng của ý chí kiên cường và tinh thần bất khuất.',
    historicalNote: 'Quần thể di tích nhà tù, nghĩa trang và các điểm tưởng niệm giúp Côn Đảo trở thành nơi giáo dục lịch sử rất giàu cảm xúc.',
    exploration: 'Ghé thăm nhà tù Côn Đảo, nơi được mệnh danh là "Địa ngục trần gian". Du khách sẽ thấy được sự tàn khốc của chiến tranh qua các khu chuồng cọp, hầm xay lúa, nhưng cũng thấy được ý chí sắt đá của các chiến sĩ cách mạng.',
    anecdote: 'Câu chuyện về chị Võ Thị Sáu, người con gái Đất Đỏ kiên cường, vẫn hát vang bài ca yêu nước trước họng súng quân thù. Hình ảnh hoa lê-ki-ma nở rộ đã trở thành biểu tượng cho tâm hồn bất khuất của người phụ nữ Việt Nam.',
    history: 'Côn Đảo từng là nơi giam giữ những nhà yêu nước, chiến sĩ cách mạng kiên trung nhất. Ngày nay, nơi đây là "Bàn thờ Tổ quốc", nhắc nhở thế hệ mai sau về cái giá của độc lập, tự do và lòng biết ơn vô hạn.',
    card: {
      name: 'Tinh Thần Bất Khuất',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Phép Thuật',
      stats: 'Kháng mọi sát thương 1 lượt',
      route: '/cards/tinh-than-bat-khuat',
    },
    nearby: [
      { name: 'Nghĩa trang Hàng Dương', distance: 'Trung tâm', status: 'Tưởng niệm', type: 'location' },
      { name: 'Nhà tù Phú Hải', distance: '2 km', status: 'Di tích', type: 'location' },
    ],
  },
  {
    id: 'tay-son',
    name: 'Tây Sơn',
    subName: 'Đất Võ',
    province: 'Bình Định',
    year: '1771',
    lat: 13.9333,
    lng: 108.9333,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Nơi phát tích của phong trào Tây Sơn, gắn liền với tên tuổi của ba anh em Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ. Từ vùng đất võ này, nghĩa quân đã tiến lên đánh đổ các tập đoàn phong kiến Trịnh - Nguyễn và đánh tan quân xâm lược Xiêm, Thanh.',
    highlight: 'Căn cứ địa của phong trào nông dân Tây Sơn và Hoàng đế Quang Trung.',
    historicalNote: 'Bảo tàng Quang Trung tại đây lưu giữ nhiều hiện vật quý và cây me, giếng nước cổ từ thời Tây Sơn.',
    exploration: 'Khám phá vùng đất võ Bình Định, quê hương của anh em nhà Tây Sơn. Tham quan Bảo tàng Quang Trung, xem biểu diễn võ thuật và trống trận Tây Sơn hào hùng, cảm nhận khí thế hừng hực của nghĩa quân năm xưa.',
    anecdote: 'Tương truyền về cây me và giếng nước cổ trong vườn nhà ba anh em Tây Sơn, nơi hun đúc chí khí và sức mạnh cho nghĩa quân. Nước giếng mát lành như tiếp thêm nghị lực cho những người con áo vải cờ đào.',
    history: 'Nơi phát tích của phong trào nông dân Tây Sơn thế kỷ 18. Dưới sự lãnh đạo của Quang Trung - Nguyễn Huệ, nghĩa quân đã thống nhất đất nước, dẹp tan thù trong giặc ngoài, lập nên những chiến công hiển hách.',
    card: {
      name: 'Quang Trung Nguyễn Huệ',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 100, Tốc độ 100',
      route: '/cards/quang-trung',
    },
    nearby: [
      { name: 'Bảo tàng Quang Trung', distance: 'Trung tâm', status: 'Tham quan', type: 'location' },
      { name: 'Đài Kính Thiên', distance: '5 km', status: 'Tế trời đất', type: 'location' },
    ],
  },
  {
    id: 'dong-da',
    name: 'Gò Đống Đa',
    subName: 'Trận Ngọc Hồi',
    province: 'Hà Nội',
    year: '1789',
    lat: 21.0122,
    lng: 105.8256,
    type: 'tran-chien',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Mùa xuân năm Kỷ Dậu 1789, vua Quang Trung chỉ huy đạo quân Tây Sơn thần tốc tiến ra Bắc, đánh tan 29 vạn quân Thanh. Gò Đống Đa là minh chứng hùng hồn cho chiến thắng oanh liệt này.',
    highlight: 'Chiến thắng thần tốc đại phá 29 vạn quân Thanh.',
    historicalNote: 'Lễ hội Gò Đống Đa diễn ra vào mùng 5 Tết âm lịch hàng năm để tưởng nhớ công ơn vua Quang Trung.',
    exploration: 'Di tích lịch sử nằm giữa lòng Hà Nội, nơi lưu giữ dấu tích của trận đánh Ngọc Hồi - Đống Đa oanh liệt. Du khách có thể thắp hương tại đền thờ và chiêm ngưỡng bức phù điêu tái hiện khí thế tiến quân thần tốc.',
    anecdote: 'Vua Quang Trung dùng kế lấy những tấm ván bện rơm ướt che cho binh sĩ tiến công, phá tan trận địa hỏa lực của quân Thanh. Hình ảnh nhà vua cưỡi voi chiến, áo bào sạm đen khói súng đã trở thành huyền thoại.',
    history: 'Chiến thắng Đống Đa xuân Kỷ Dậu 1789 là một trong những trận đánh thần tốc nhất lịch sử, giải phóng kinh thành Thăng Long khỏi 29 vạn quân Thanh xâm lược chỉ trong vòng 5 ngày.',
    card: {
      name: 'Hỏa Hổ Tây Sơn',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Vũ Khí',
      stats: 'Sát thương diện rộng +150',
      route: '/cards/hoa-ho',
    },
    nearby: [
      { name: 'Đồn Ngọc Hồi', distance: '10 km', status: 'Đã bị hạ', type: 'location' },
      { name: 'Tôn Sĩ Nghị', distance: 'Chạy trốn', status: 'Hoảng sợ', type: 'enemy' },
    ],
  },
  {
    id: 'lam-kinh',
    name: 'Lam Kinh',
    subName: 'Khởi nghĩa Lam Sơn',
    province: 'Thanh Hóa',
    year: '1418',
    lat: 19.9319,
    lng: 105.4667,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Nơi Lê Lợi dựng cờ khởi nghĩa chống quân Minh xâm lược. Trải qua 10 năm nếm mật nằm gai, nghĩa quân Lam Sơn đã giành lại độc lập cho đất nước, mở ra triều đại Hậu Lê kéo dài hơn 300 năm.',
    highlight: 'Căn cứ địa của cuộc khởi nghĩa Lam Sơn và Thái tổ Lê Lợi.',
    historicalNote: 'Khu di tích Lam Kinh hiện còn lưu giữ nhiều lăng mộ và bia đá cổ của các vị vua triều Lê.',
    exploration: 'Khám phá kinh đô cổ của nhà Lê Sơ với các lăng mộ vua chúa uy nghiêm. Du khách có thể chiêm ngưỡng kiến trúc cung điện bằng gỗ lim quý hiếm và tìm hiểu về nghệ thuật tạc bia đá tinh xảo thời bấy giờ.',
    anecdote: 'Tương truyền về sự tích "Lê Lợi trả gươm thần" sau khi đánh tan quân Minh xâm lược. Thanh gươm Thuận Thiên đã giúp ngài thống nhất giang sơn, nay được trả lại cho Rùa thần tại Hồ Hoàn Kiếm, nhưng linh khí vẫn còn mãi ở Lam Kinh.',
    history: 'Lam Kinh là quê hương và cũng là nơi an nghỉ cuối cùng của các vị vua nhà Lê. Đây là biểu tượng của cuộc khởi nghĩa Lam Sơn thắng lợi, mở ra một thời kỳ độc lập tự chủ lâu dài cho dân tộc.',
    card: {
      name: 'Lê Lợi',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 90, Lãnh đạo 100',
      route: '/cards/le-loi',
    },
    nearby: [
      { name: 'Nguyễn Trãi', distance: 'Tại trướng', status: 'Đang hiến kế', type: 'npc' },
      { name: 'Lê Lai', distance: 'Cứu chúa', status: 'Hy sinh', type: 'npc' },
    ],
  },
  {
    id: 'me-linh',
    name: 'Mê Linh',
    subName: 'Đền Hai Bà Trưng',
    province: 'Hà Nội',
    year: 'Năm 40',
    lat: 21.1833,
    lng: 105.7167,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Quê hương của Trưng Trắc, Trưng Nhị. Năm 40, Hai Bà đã phất cờ khởi nghĩa, đánh đuổi thái thú Tô Định, lập nên một quốc gia độc lập ngắn ngủi nhưng để lại tiếng thơm muôn đời về tinh thần quật cường của phụ nữ Việt Nam.',
    highlight: 'Nơi khởi nguồn cuộc khởi nghĩa Hai Bà Trưng chống quân Đông Hán.',
    historicalNote: 'Đền thờ Hai Bà Trưng tại Mê Linh là nơi linh thiêng, thu hút đông đảo người dân đến tưởng nhớ.',
    exploration: 'Ghé thăm đền thờ Hai Bà Trưng tại Mê Linh để tìm hiểu về cuộc khởi nghĩa đầu tiên của phụ nữ Việt Nam. Không gian đền thờ thanh tịnh với những bức phù điêu tái hiện cảnh Hai Bà cưỡi voi ra trận.',
    anecdote: 'Lời thề của Hai Bà Trưng trước khi xuất quân: "Một xin rửa sạch quốc thù / Hai xin đem lại nghiệp xưa họ Hùng". Tiếng trống đồng Mê Linh đã vang vọng khắp nơi, kêu gọi nhân dân đứng lên giành độc lập.',
    history: 'Cuộc khởi nghĩa Hai Bà Trưng năm 40 sau Công nguyên là minh chứng cho tinh thần quật cường của phụ nữ Việt Nam. Dù chỉ giữ được độc lập trong 3 năm, nhưng nó đã mở đường cho ý chí tự chủ của dân tộc.',
    card: {
      name: 'Hai Bà Trưng',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 85, Sĩ khí 100',
      route: '/cards/hai-ba-trung',
    },
    nearby: [
      { name: 'Voi chiến', distance: 'Sẵn sàng', status: 'Xung trận', type: 'npc' },
      { name: 'Tô Định', distance: 'Chạy trốn', status: 'Cắt tóc cạo râu', type: 'enemy' },
    ],
  },
  {
    id: 'hoa-lu',
    name: 'Hoa Lư',
    subName: 'Kinh Đô Đá',
    province: 'Ninh Bình',
    year: '968',
    lat: 20.2861,
    lng: 105.9069,
    type: 'thanh-co',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Kinh đô đầu tiên của nhà nước phong kiến tập quyền Việt Nam (Đại Cồ Việt). Nơi Đinh Tiên Hoàng đế (Đinh Bộ Lĩnh) dẹp loạn 12 sứ quân, thống nhất giang sơn, khẳng định nền độc lập tự chủ.',
    highlight: 'Kinh đô Đại Cồ Việt, gắn liền với Đinh Tiên Hoàng và Lê Đại Hành.',
    historicalNote: 'Với địa thế núi non hiểm trở, Hoa Lư là một pháo đài quân sự tự nhiên vững chắc.',
    exploration: 'Khám phá kinh đô đầu tiên của nhà nước phong kiến trung ương tập quyền Việt Nam. Du khách có thể tham quan đền thờ vua Đinh, vua Lê và chiêm ngưỡng cảnh quan núi non hùng vĩ bao quanh kinh thành cổ.',
    anecdote: 'Sự tích Đinh Bộ Lĩnh dẹp loạn 12 sứ quân, thống nhất giang sơn và lên ngôi hoàng đế, đặt tên nước là Đại Cồ Việt. Hình ảnh cậu bé chăn trâu dùng bông lau làm cờ tập trận đã trở thành biểu tượng của ý chí vươn lên.',
    history: 'Hoa Lư là kinh đô của ba triều đại: Đinh, Tiền Lê và khởi đầu nhà Lý. Địa thế núi non hiểm trở đã giúp nơi đây trở thành một pháo đài quân sự vững chắc, bảo vệ nền độc lập non trẻ của đất nước.',
    card: {
      name: 'Đinh Bộ Lĩnh',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 90, Thống soái 95',
      route: '/cards/dinh-bo-linh',
    },
    nearby: [
      { name: 'Đền vua Đinh', distance: 'Trung tâm', status: 'Tham quan', type: 'location' },
      { name: 'Đền vua Lê', distance: 'Gần kề', status: 'Tham quan', type: 'location' },
    ],
  },
  {
    id: 'duong-lam',
    name: 'Đường Lâm',
    subName: 'Đất Hai Vua',
    province: 'Hà Nội',
    year: 'Thế kỷ 8 & 10',
    lat: 21.1333,
    lng: 105.4833,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Ngôi làng cổ kính duy nhất ở Việt Nam sinh ra hai vị vua: Phùng Hưng (Bố Cái Đại Vương) và Ngô Quyền. Nơi đây hun đúc tinh thần thượng võ và ý chí quật cường chống lại ách đô hộ phương Bắc.',
    highlight: 'Quê hương của Phùng Hưng và Ngô Quyền.',
    historicalNote: 'Làng cổ Đường Lâm vẫn giữ được nét kiến trúc đá ong đặc trưng của vùng đồng bằng Bắc Bộ.',
    exploration: 'Tham quan làng cổ Đường Lâm với những ngôi nhà đá ong độc đáo và cổng làng cổ kính. Du khách có thể tìm hiểu về cuộc đời của hai vị vua Ngô Quyền và Phùng Hưng tại đền thờ và lăng mộ của các ngài.',
    anecdote: 'Đường Lâm được mệnh danh là "Đất hai vua" vì là nơi sinh ra Ngô Quyền và Phùng Hưng. Những câu chuyện về lòng dũng cảm và tài thao lược của các ngài vẫn được người dân kể lại bên những gốc đa cổ thụ.',
    history: 'Đường Lâm là biểu tượng của làng quê Việt Nam truyền thống và là mảnh đất địa linh nhân kiệt. Nơi đây đã đóng góp hai vị anh hùng dân tộc vĩ đại, góp phần quan trọng vào công cuộc dựng nước và giữ nước.',
    card: {
      name: 'Ngô Quyền',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 95, Trí tuệ 90',
      route: '/cards/ngo-quyen',
    },
    nearby: [
      { name: 'Đền Phùng Hưng', distance: 'Trong làng', status: 'Di tích', type: 'location' },
      { name: 'Lăng Ngô Quyền', distance: 'Trong làng', status: 'Di tích', type: 'location' },
    ],
  },
  {
    id: 'yen-tu',
    name: 'Yên Tử',
    subName: 'Non Thiêng',
    province: 'Quảng Ninh',
    year: 'Thế kỷ 13',
    lat: 21.1500,
    lng: 106.7000,
    type: 'di-tich',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Sau khi lãnh đạo quân dân Đại Việt hai lần đánh thắng giặc Nguyên Mông, vua Trần Nhân Tông đã nhường ngôi, lên núi Yên Tử tu hành và sáng lập ra Thiền phái Trúc Lâm mang đậm bản sắc Việt.',
    highlight: 'Nơi Phật hoàng Trần Nhân Tông tu hành, lập Thiền phái Trúc Lâm.',
    historicalNote: 'Đỉnh thiêng Yên Tử với Chùa Đồng là điểm hành hương quan trọng của Phật giáo Việt Nam.',
    exploration: 'Hành trình khám phá đỉnh thiêng Yên Tử với hệ thống chùa chiền, am tháp ẩn mình trong mây ngàn. Chinh phục Chùa Đồng ở độ cao 1068m để cảm nhận sự thanh tịnh và hùng vĩ của thiên nhiên.',
    anecdote: 'Vua Trần Nhân Tông sau khi dẹp giặc xong đã từ bỏ ngai vàng, lên núi tu hành, tìm thấy sự an lạc trong tâm hồn và sáng lập ra dòng thiền Trúc Lâm Yên Tử, đề cao tinh thần tự lực tự cường.',
    history: 'Trung tâm Phật giáo của Đại Việt thời Trần. Thiền phái Trúc Lâm không chỉ là tôn giáo mà còn là hệ tư tưởng gắn kết dân tộc, đề cao tinh thần nhập thế, yêu nước và bảo vệ giang sơn.',
    card: {
      name: 'Trần Nhân Tông',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Trí tuệ 100, Tâm linh 100',
      route: '/cards/tran-nhan-tong',
    },
    nearby: [
      { name: 'Chùa Đồng', distance: 'Đỉnh núi', status: 'Hành hương', type: 'location' },
      { name: 'Suối Giải Oan', distance: 'Chân núi', status: 'Di tích', type: 'location' },
    ],
  },
  {
    id: 'dien-bien-phu',
    name: 'Điện Biên Phủ',
    subName: 'Chấn Động Địa Cầu',
    province: 'Điện Biên',
    year: '1954',
    lat: 21.3833,
    lng: 103.0167,
    type: 'tran-chien',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Trận quyết chiến chiến lược dưới sự chỉ huy của Đại tướng Võ Nguyên Giáp, làm nên chiến thắng "lừng lẫy năm châu, chấn động địa cầu", kết thúc 9 năm kháng chiến chống Pháp.',
    highlight: 'Chiến thắng vĩ đại chấm dứt ách thống trị của thực dân Pháp.',
    historicalNote: 'Tập đoàn cứ điểm Điện Biên Phủ từng được Pháp coi là "pháo đài bất khả xâm phạm".',
    exploration: 'Khám phá chiến trường xưa với đồi A1, hầm De Castries, cầu Mường Thanh và Bảo tàng Chiến thắng. Du khách sẽ được tận mắt thấy những hố bộc phá và hệ thống hầm hào kiên cố của quân ta.',
    anecdote: 'Hình ảnh những đoàn dân công hỏa tuyến thồ hàng bằng xe đạp thồ vượt đèo lội suối, tạo nên kỳ tích hậu cần. Mỗi chiếc xe thồ là một "pháo đài" di động góp phần làm nên chiến thắng vĩ đại.',
    history: 'Chiến thắng Điện Biên Phủ năm 1954 là mốc son chói lọi, kết thúc 9 năm kháng chiến chống Pháp gian khổ. Đây là chiến thắng của lòng yêu nước, trí tuệ và sự đoàn kết vô song của dân tộc.',
    card: {
      name: 'Võ Nguyên Giáp',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Trí tuệ 100, Chiến thuật 100',
      route: '/cards/vo-nguyen-giap',
    },
    nearby: [
      { name: 'Đồi A1', distance: 'Trung tâm', status: 'Di tích', type: 'location' },
      { name: 'Hầm De Castries', distance: '1 km', status: 'Đã đầu hàng', type: 'enemy' },
    ],
  },
  {
    id: 'rach-gam',
    name: 'Rạch Gầm - Xoài Mút',
    subName: 'Thủy Chiến',
    province: 'Tiền Giang',
    year: '1785',
    lat: 10.3333,
    lng: 106.2500,
    type: 'tran-chien',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Trận thủy chiến lừng lẫy trên sông Tiền, nơi Nguyễn Huệ dùng mưu mai phục, đánh tan 5 vạn quân Xiêm xâm lược chỉ trong một ngày, bảo vệ vững chắc miền Nam.',
    highlight: 'Trận thủy chiến vĩ đại đánh tan 5 vạn quân Xiêm.',
    historicalNote: 'Chiến thắng này khẳng định tài năng quân sự kiệt xuất của Nguyễn Huệ trên cả thủy chiến lẫn bộ chiến.',
    exploration: 'Khám phá vùng sông nước Tiền Giang, nơi diễn ra trận thủy chiến lừng lẫy. Du khách có thể đi thuyền trên sông Tiền, tham quan khu di tích chiến thắng với tượng đài Nguyễn Huệ uy nghi.',
    anecdote: 'Nguyễn Huệ dùng mưu nhử quân Xiêm vào đoạn sông hẹp giữa Rạch Gầm và Xoài Mút, rồi dùng hỏa công và pháo binh tiêu diệt gọn 5 vạn quân địch chỉ trong một ngày, khiến chúng khiếp đảm.',
    history: 'Chiến thắng năm 1785 là một trong những trận thủy chiến lớn nhất lịch sử Việt Nam, đập tan âm mưu xâm lược của quân Xiêm, khẳng định chủ quyền lãnh thổ và sức mạnh của nghĩa quân Tây Sơn.',
    card: {
      name: 'Chiến Thuyền Tây Sơn',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Vũ Khí',
      stats: 'Tốc độ +50, Sát thương +100',
      route: '/cards/chien-thuyen-tay-son',
    },
    nearby: [
      { name: 'Sông Tiền', distance: 'Tại chỗ', status: 'Chiến trường', type: 'location' },
      { name: 'Quân Xiêm', distance: 'Dưới sông', status: 'Bị tiêu diệt', type: 'enemy' },
    ],
  },
  {
    id: 'nui-nua',
    name: 'Núi Nưa',
    subName: 'Khởi nghĩa Bà Triệu',
    province: 'Thanh Hóa',
    year: 'Năm 248',
    lat: 19.6667,
    lng: 105.5833,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Nơi Bà Triệu (Triệu Thị Trinh) dấy binh khởi nghĩa chống quân Ngô. Câu nói nổi tiếng: "Tôi chỉ muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông... chứ không chịu khom lưng làm tì thiếp cho người" đã trở thành biểu tượng bất diệt.',
    highlight: 'Căn cứ khởi nghĩa của nữ anh hùng Triệu Thị Trinh.',
    historicalNote: 'Khu di tích Am Tiên trên đỉnh núi Nưa là một trong những huyệt đạo thiêng liêng của đất nước.',
    exploration: 'Chinh phục đỉnh Núi Nưa linh thiêng, nơi có Am Tiên - một trong những huyệt đạo quan trọng của quốc gia. Du khách có thể tận hưởng không khí trong lành và tìm hiểu về cuộc khởi nghĩa của Bà Triệu.',
    anecdote: 'Lời tuyên bố đanh thép của Bà Triệu: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở Biển Đông... chứ không chịu khom lưng làm tì thiếp cho người". Khí phách ấy vẫn vang vọng khắp núi rừng Nưa.',
    history: 'Núi Nưa là căn cứ của cuộc khởi nghĩa Bà Triệu năm 248 chống quân Ngô. Đây là biểu tượng của tinh thần độc lập và sức mạnh của phụ nữ Việt Nam trong lịch sử giữ nước.',
    card: {
      name: 'Bà Triệu',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 90, Dũng khí 100',
      route: '/cards/ba-trieu',
    },
    nearby: [
      { name: 'Đền Bà Triệu', distance: 'Dưới chân núi', status: 'Di tích', type: 'location' },
      { name: 'Quân Ngô', distance: 'Đang tiến đánh', status: 'Suy yếu', type: 'enemy' },
    ],
  },
  {
    id: 'phu-ung',
    name: 'Phù Ủng',
    subName: 'Quê hương Phạm Ngũ Lão',
    province: 'Hưng Yên',
    year: 'Thế kỷ 13',
    lat: 20.9000,
    lng: 106.0833,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Nơi sinh ra danh tướng Phạm Ngũ Lão - người ngồi đan sọt giữa đường, mải nghĩ việc nước đến mức giáo đâm thủng đùi mà không biết. Ông là cánh tay đắc lực của Trần Hưng Đạo, bách chiến bách thắng.',
    highlight: 'Quê hương của vị tướng xuất thân bình dân nhưng tài năng xuất chúng.',
    historicalNote: 'Đền Phù Ủng được lập ngay trên nền nhà cũ của Phạm Ngũ Lão để tưởng nhớ công ơn ông.',
    exploration: 'Ghé thăm làng Phù Ủng, quê hương của danh tướng Phạm Ngũ Lão. Du khách có thể tham quan đền thờ ngài và tìm hiểu về truyền thống hiếu học, thượng võ của vùng đất này.',
    anecdote: 'Câu chuyện về chàng trai làng Phù Ủng ngồi đan sọt bên đường, mải mê nghĩ việc nước đến nỗi giáo đâm vào đùi không biết. Hưng Đạo Vương thấy lạ, bèn thu nhận và ngài đã trở thành danh tướng lừng danh.',
    history: 'Phù Ủng là mảnh đất địa linh nhân kiệt, nơi sinh ra Phạm Ngũ Lão - vị tướng tài ba bậc nhất thời Trần. Ngài đã có công lớn trong hai cuộc kháng chiến chống Nguyên Mông, bảo vệ vững chắc giang sơn.',
    card: {
      name: 'Phạm Ngũ Lão',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 98, Kỷ luật 100',
      route: '/cards/pham-ngu-lao',
    },
    nearby: [
      { name: 'Đền Phù Ủng', distance: 'Trung tâm', status: 'Di tích', type: 'location' },
      { name: 'Trần Hưng Đạo', distance: 'Đang tuần du', status: 'Tuyển tướng', type: 'npc' },
    ],
  },
  {
    id: 'yen-the',
    name: 'Yên Thế',
    subName: 'Căn cứ Hùm Thiêng',
    province: 'Bắc Giang',
    year: '1884 - 1913',
    lat: 21.5167,
    lng: 106.1167,
    type: 'danh-tuong',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
    description: 'Căn cứ địa của cuộc khởi nghĩa nông dân kéo dài gần 30 năm chống thực dân Pháp do "Hùm thiêng Yên Thế" Hoàng Hoa Thám lãnh đạo. Nơi đây chứng kiến nghệ thuật chiến tranh du kích tài tình của nghĩa quân.',
    highlight: 'Đại bản doanh của nghĩa quân Yên Thế và thủ lĩnh Đề Thám.',
    historicalNote: 'Hệ thống đồn lũy Phồn Xương vẫn còn lưu giữ nhiều dấu tích của cuộc khởi nghĩa.',
    exploration: 'Khám phá vùng đất Yên Thế với hệ thống đồn lũy kiên cố của nghĩa quân Hoàng Hoa Thám. Du khách có thể tham quan khu di tích Phồn Xương và tìm hiểu về chiến thuật du kích tài tình của "Hùm xám Yên Thế".',
    anecdote: 'Hoàng Hoa Thám với biệt danh "Hùm xám Yên Thế" đã khiến quân Pháp bao phen khiếp vía. Ông đã lãnh đạo nghĩa quân chiến đấu bền bỉ suốt gần 30 năm, khẳng định tinh thần yêu nước quật cường của nông dân Việt Nam.',
    history: 'Cuộc khởi nghĩa Yên Thế (1884-1913) là cuộc khởi nghĩa vũ trang lớn nhất, kéo dài nhất của nông dân Việt Nam chống lại thực dân Pháp, để lại những bài học quý báu về nghệ thuật quân sự du kích.',
    card: {
      name: 'Hoàng Hoa Thám',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Danh Tướng',
      stats: 'Sức mạnh 90, Du kích 100',
      route: '/cards/hoang-hoa-tham',
    },
    nearby: [
      { name: 'Đồn Phồn Xương', distance: 'Trung tâm', status: 'Căn cứ', type: 'location' },
      { name: 'Quân Pháp', distance: 'Bao vây', status: 'Bị phục kích', type: 'enemy' },
    ],
  },
  {
    id: 'con-son',
    name: 'Côn Sơn',
    subName: 'Nơi ở ẩn của Nguyễn Trãi',
    province: 'Hải Dương',
    year: 'Thế kỷ 15',
    lat: 21.1333,
    lng: 106.3833,
    type: 'di-tich',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw',
    description: 'Vùng đất phong thủy hữu tình, nơi danh nhân văn hóa thế giới Nguyễn Trãi lui về ở ẩn. Nơi đây gắn liền với những áng thơ văn kiệt xuất và tâm hồn thanh cao của vị khai quốc công thần triều Lê.',
    highlight: 'Chốn ẩn cư thanh bình của đại thi hào, quân sư Nguyễn Trãi.',
    historicalNote: 'Côn Sơn cùng với Kiếp Bạc tạo thành quần thể di tích quốc gia đặc biệt quan trọng.',
    exploration: 'Tham quan khu di tích Côn Sơn với chùa Tư Phúc, đền thờ Nguyễn Trãi và am Bạch Vân. Du khách có thể leo núi Côn Sơn, ngắm nhìn cảnh quan thiên nhiên thơ mộng đã từng đi vào thơ ca của các bậc vĩ nhân.',
    anecdote: 'Nguyễn Trãi đã chọn Côn Sơn làm nơi ở ẩn, sống hòa mình với thiên nhiên "Côn Sơn suối chảy rì rầm / Ta nghe như tiếng đàn cầm bên tai". Nơi đây đã nuôi dưỡng tâm hồn và trí tuệ của người anh hùng dân tộc.',
    history: 'Côn Sơn là trung tâm văn hóa, tôn giáo quan trọng thời Trần và Lê Sơ. Đây là nơi gắn liền với cuộc đời của nhiều danh nhân văn hóa như Trần Nguyên Đán, Huyền Quang và đặc biệt là Nguyễn Trãi.',
    card: {
      name: 'Bình Ngô Đại Cáo',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A',
      rarity: 'Chiến Thuật',
      stats: 'Sĩ khí +200, Trí tuệ +100',
      route: '/cards/binh-ngo-dai-cao',
    },
    nearby: [
      { name: 'Chùa Côn Sơn', distance: 'Gần kề', status: 'Thanh tịnh', type: 'location' },
      { name: 'Suối Côn Sơn', distance: 'Chân núi', status: 'Róc rách', type: 'location' },
    ],
  },
];

const filters: { label: string; value: 'all' | LocationType }[] = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Thành cổ', value: 'thanh-co' },
  { label: 'Trận chiến', value: 'tran-chien' },
  { label: 'Danh tướng', value: 'danh-tuong' },
  { label: 'Di tích', value: 'di-tich' },
];

const createCustomIcon = (location: LocationData, isActive: boolean) => {
  return L.divIcon({
    className: 'bg-transparent border-0',
    html: `
      <div class="flex flex-col items-center w-16 -ml-8 -mt-10">
        ${isActive ? '<div class="absolute inset-0 bg-[#C19A5B] rounded-full animate-ping opacity-40 scale-150"></div>' : ''}
        <div class="relative w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#C19A5B] shadow-[0_0_15px_rgba(193,154,91,0.5)] overflow-hidden bg-[#F4E8D1] z-10 ${isActive ? 'ring-4 ring-[#C19A5B]/50' : ''}">
          <img src="${location.image}" alt="${location.name}" class="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
        </div>
        <div class="relative mt-1 border border-[#C19A5B] px-2 py-0.5 rounded shadow-md z-10 ${isActive ? 'bg-[#7A1215]' : 'bg-[#4A3525]'} whitespace-nowrap">
          <span class="text-[10px] font-bold tracking-wide ${isActive ? 'text-[#C19A5B]' : 'text-white'}">
            ${location.name}
          </span>
        </div>
      </div>
    `,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

const userIcon = L.divIcon({
  className: 'bg-transparent border-0',
  html: `
    <div class="flex flex-col items-center w-12 -ml-6 -mt-6">
      <div class="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40 scale-150"></div>
      <div class="relative w-8 h-8 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.8)] bg-blue-500 z-10 flex items-center justify-center">
        <div class="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  `,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
});

function MapUpdater({ selectedLocation, gpsLocation }: { selectedLocation: LocationData | null, gpsLocation: [number, number] | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 13, { duration: 1.5 });
    }
  }, [selectedLocation, map]);

  useEffect(() => {
    if (gpsLocation) {
      map.flyTo(gpsLocation, 14, { duration: 1.5 });
    }
  }, [gpsLocation, map]);

  return null;
}

export default function Map() {
  const [activeFilter, setActiveFilter] = useState<'all' | LocationType>('all');
  const [search, setSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [activeTab, setActiveTab] = useState<'Khám phá' | 'Điển tích' | 'Sử ký'>('Điển tích');
  const [gpsLocation, setGpsLocation] = useState<[number, number] | null>(null);

  const handleResetMap = () => {
    setGpsLocation(null);
    setSelectedLocation(null);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Không thể lấy vị trí của bạn. Vui lòng kiểm tra quyền truy cập vị trí.");
        }
      );
    } else {
      alert("Trình duyệt của bạn không hỗ trợ định vị GPS.");
    }
  };

  const filteredLocations = useMemo(() => {
    const q = search.trim().toLowerCase();
    return locations.filter((item) => {
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.subName.toLowerCase().includes(q) ||
        item.province.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, search]);

  const handleSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  return (
    <main className="relative h-[calc(100vh-4rem)] lg:h-screen w-full overflow-hidden bg-[#4A3525] font-sans text-[#4A3525] selection:bg-[#7A1215] selection:text-[#F4E8D1]">
      {/* Map Layer (Draggable & Zoomable) */}
      <div className="absolute inset-0 z-0 map-container-custom">
        <MapContainer 
          center={[16.047079, 108.206230]} // Center of Vietnam
          zoom={6} 
          zoomControl={false}
          style={{ width: '100%', height: '100%', background: '#4A3525' }}
        >
          {/* Google Maps Tile Layer with Sepia Filter for Vintage Look */}
          <TileLayer
            url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
            attribution="&copy; Google Maps"
            className="map-tiles-vintage"
          />
          
          <MapUpdater selectedLocation={selectedLocation} gpsLocation={gpsLocation} />

          {gpsLocation && (
            <Marker position={gpsLocation} icon={userIcon} />
          )}

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={createCustomIcon(location, selectedLocation?.id === location.id)}
              eventHandlers={{
                click: () => handleSelect(location),
              }}
            />
          ))}
        </MapContainer>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(74,53,37,0.4)_100%)] pointer-events-none z-[400]" />
      </div>

      <style>{`
        .map-tiles-vintage {
          filter: sepia(0.4) hue-rotate(-15deg) contrast(1.1) brightness(0.9);
        }
        .leaflet-container {
          background: #4A3525 !important;
        }
      `}</style>

      {/* Layer 3: Top Navigation & UI Controls */}
      <header className="absolute top-0 left-0 w-full z-20 bg-[#7A1215] border-b-2 border-[#C19A5B] shadow-lg px-4 py-3 flex items-center justify-between">
        <button className="w-10 h-10 rounded-full border border-[#C19A5B] bg-[#4A3525] text-[#C19A5B] flex items-center justify-center hover:bg-opacity-80 transition-colors shadow-inner">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="text-center flex-1">
          <h1 className="font-headline text-[#C19A5B] text-xl md:text-2xl font-black tracking-widest drop-shadow-md">Bản Đồ Liên Kết Thẻ Bài</h1>
          <p className="text-[10px] text-[#C19A5B] opacity-80 tracking-[0.3em]">HÀO KHÍ ĐẠI VIỆT</p>
        </div>
        <div className="w-10 h-10"></div>
      </header>

      {/* Search & Filters */}
      <div className="absolute top-20 left-0 w-full z-20 flex flex-col items-center gap-3 pointer-events-none px-4">
        <div className="relative w-full max-w-md pointer-events-auto shadow-lg rounded-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7A1215] h-5 w-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm kiếm địa danh, nhân vật..."
            className="w-full bg-[#F4E8D1] border-2 border-[#C19A5B] rounded-full py-2.5 pl-11 pr-4 text-[#4A3525] font-semibold placeholder-[#4A3525]/60 focus:outline-none shadow-inner"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 pointer-events-auto">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-4 py-1.5 rounded-full border-2 border-[#C19A5B] text-xs font-bold shadow-md transition-all ${
                activeFilter === filter.value
                  ? 'bg-[#7A1215] text-[#C19A5B]'
                  : 'bg-[#4A3525] text-[#F4E8D1] hover:bg-opacity-90'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Right Action Menu */}
      <div className="absolute top-24 right-4 z-[500] hidden md:flex flex-col gap-3 pointer-events-auto">
        <button onClick={handleGetLocation} className="bg-[#4A3525] border-2 border-[#C19A5B] text-[#C19A5B] font-bold text-xs py-2 px-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" /> Vị trí hiện tại
        </button>
        <button onClick={handleResetMap} className="bg-[#4A3525] border-2 border-[#C19A5B] text-[#C19A5B] font-bold text-xs py-2 px-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
          <Landmark className="h-4 w-4" /> Toàn cảnh
        </button>
        <button className="bg-[#4A3525] border-2 border-[#C19A5B] text-[#C19A5B] font-bold text-xs py-2 px-4 rounded-full shadow-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 mt-2">
          <BookOpen className="h-4 w-4" /> Sử Ký
        </button>
      </div>

      {/* Layer 4: The Open Tooltip/Popup (Desktop only) */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute hidden lg:flex z-30 bg-[#F4E8D1] border-2 border-[#C19A5B] rounded-xl shadow-[inset_0_0_20px_rgba(74,53,37,0.15),0_10px_25px_rgba(0,0,0,0.5)] p-4 gap-4 w-[360px] pointer-events-auto"
            style={{
              left: `calc(${selectedLocation.x}% + 3rem)`,
              top: `calc(${selectedLocation.y}% - 4rem)`
            }}
          >
            {/* Connecting Arrow */}
            <div className="absolute top-1/2 -left-[11px] -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-r-[12px] border-r-[#C19A5B] border-b-[10px] border-b-transparent"></div>
            <div className="absolute top-1/2 -left-[8px] -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-r-[10px] border-r-[#F4E8D1] border-b-[8px] border-b-transparent"></div>

            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-headline text-[#7A1215] text-lg font-black border-b border-[#C19A5B]/30 pb-1 mb-2">{selectedLocation.name}</h3>
              <p className="text-xs text-[#4A3525] italic leading-relaxed line-clamp-4">{selectedLocation.description}</p>
            </div>

            <div className="w-20 bg-[#4A3525] border border-[#C19A5B] p-1 rounded flex flex-col items-center shrink-0 shadow-inner">
              <div className="w-full aspect-[2/3] border border-[#C19A5B] rounded-sm overflow-hidden bg-[#7A1215] relative">
                <img src={selectedLocation.card.image} alt="Card" className="w-full h-full object-cover object-top opacity-90" referrerPolicy="no-referrer" />
              </div>
              <p className="text-[#C19A5B] text-[8px] font-bold text-center mt-1 leading-tight">Thẻ Bài:<br/>{selectedLocation.card.name}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer 5: The Bottom Details Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full md:w-[90%] max-w-5xl z-40 pointer-events-auto flex flex-col"
          >
            {/* Tabs */}
            <div className="flex gap-2 px-4 md:px-8 -mb-[2px] relative z-10 overflow-x-auto scrollbar-hide">
              {['Khám phá', 'Điển tích', 'Sử ký'].map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-6 py-2 border-t-2 border-l-2 border-r-2 border-[#C19A5B] rounded-t-lg font-bold text-sm shadow-lg transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#7A1215] text-[#C19A5B] z-20 transform -translate-y-1 pb-3'
                        : 'bg-[#4A3525] text-[#C19A5B] hover:bg-opacity-90 mt-2'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
              
              <div className="flex-1"></div>
              <button 
                onClick={() => setSelectedLocation(null)}
                className="mt-2 mb-1 w-8 h-8 bg-[#7A1215] border-2 border-[#C19A5B] rounded-full flex items-center justify-center text-[#C19A5B] hover:scale-110 transition-transform shadow-md shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Main Panel Content */}
            <div className="bg-[#F4E8D1] border-t-2 border-[#C19A5B] rounded-t-xl shadow-[inset_0_0_20px_rgba(74,53,37,0.15),0_-10px_25px_rgba(0,0,0,0.5)] p-4 md:p-6 flex flex-col md:flex-row gap-6 h-[50vh] md:h-[35vh] min-h-[250px] relative md:border-l-[16px] md:border-r-[16px] md:border-l-[#4A3525] md:border-r-[#4A3525]">
              
              {/* Left Column: Info & Item */}
              <div className="w-full md:w-1/3 md:border-r-2 border-[#C19A5B]/30 md:pr-6 flex flex-col shrink-0">
                <h2 className="font-headline text-[#7A1215] text-xl md:text-2xl font-black mb-2">{activeTab}: {selectedLocation.name}</h2>
                <div className="text-xs text-[#4A3525] leading-relaxed mb-4 flex-1 overflow-y-auto pr-2">
                  {activeTab === 'Khám phá' && (
                    <p>{selectedLocation.exploration}</p>
                  )}
                  {activeTab === 'Điển tích' && (
                    <p>{selectedLocation.anecdote}</p>
                  )}
                  {activeTab === 'Sử ký' && (
                    <p>{selectedLocation.history}</p>
                  )}
                </div>
                
                {/* Item Card */}
                <div className="flex items-center gap-3 bg-[#E8D5AA] border border-[#C19A5B] p-2 rounded shadow-sm">
                  <div className="w-12 h-12 bg-[#7A1215] border border-[#C19A5B] rounded flex items-center justify-center overflow-hidden shrink-0">
                    <img src={selectedLocation.card.image} alt="Item" className="w-full h-full object-cover object-top opacity-90" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-[#7A1215] font-bold text-sm">{selectedLocation.card.name}</h4>
                    <p className="text-[10px] text-[#4A3525] font-semibold">{selectedLocation.card.rarity} • {selectedLocation.card.stats}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Scrollable List */}
              <div className="w-full md:w-2/3 overflow-y-auto pr-2 flex flex-col gap-3 pb-4 md:pb-0">
                {selectedLocation.nearby.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#E8D5AA] border border-[#C19A5B]/50 p-3 rounded shadow-sm gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded border border-[#C19A5B] bg-[#4A3525] flex items-center justify-center overflow-hidden shrink-0 text-[#C19A5B]">
                        {item.type === 'enemy' ? <Sword className="h-6 w-6" /> : item.type === 'npc' ? <Shield className="h-6 w-6" /> : <Castle className="h-6 w-6" />}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#7A1215] text-sm">{item.name}</h4>
                        <p className="text-[10px] text-[#4A3525] flex items-center gap-1"><Route className="h-3 w-3" /> {item.distance}</p>
                        <p className={`text-[10px] font-bold ${item.type === 'enemy' ? 'text-red-700' : 'text-green-700'}`}>{item.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-[#C19A5B]/30 pt-2 sm:pt-0">
                      <div className="text-left sm:text-right">
                        <p className="text-[10px] text-[#4A3525] font-bold flex items-center sm:justify-end gap-1">
                          {item.type === 'enemy' ? <Heart className="h-3 w-3 text-[#7A1215] fill-current" /> : <Star className="h-3 w-3 text-[#C19A5B] fill-current" />}
                          {item.type === 'enemy' ? 'Chỉ Số Địch 85' : 'Điểm Khám Phá'}
                        </p>
                      </div>
                      <button className={`px-4 py-1.5 rounded-full text-xs font-bold shadow transition-all whitespace-nowrap border border-[#C19A5B] ${
                        item.type === 'enemy' 
                          ? 'bg-[#7A1215] text-[#C19A5B] hover:brightness-110' 
                          : 'bg-[#4A3525] text-[#C19A5B] hover:bg-opacity-90'
                      }`}>
                        {item.type === 'enemy' ? 'Thách Đấu' : 'Đường đi'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
