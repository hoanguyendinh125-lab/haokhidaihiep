export default function Story() {
  return (
    <main className="relative overflow-hidden pt-16 bg-surface">
      {/* Hero Section: The Call of Destiny */}
      <section className="relative h-[90vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40 contrast-125 scale-110"
            alt="Epic wide shot of a misty ancient Vietnamese river valley"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUHZornarMeIVu5ctpaacVFL4dg1qNt5U-a1MZNcFnu1uomDoCFGuevuq2zog2FUypJOKCvza7gstDFyQ8frs4yxcIARLLOfHM0YhHvrJtZ2Lh6aai_5Psjm1tQ7_FjYuA1pjPX6R8YE69NCjnK3qcT9vgYczgzbw2fndpaL9x0pikSrGufn2qjaeL02vezzmWEff2BOI1mINY_MXNbIAIaot5lVe_RNaE6bI6QRcvUGcnJxkthjtVfHl9Wx6mLXyokTm8gJS9iQ"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/80 to-surface"></div>
          <div className="absolute inset-0 ancient-texture opacity-10"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl space-y-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-secondary/30 bg-secondary/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            <span className="text-secondary font-label text-[10px] uppercase tracking-[0.4em]">Nhiệm vụ: Khôi phục Hào Khí</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-sans font-black text-on-surface uppercase tracking-tighter leading-[0.85] italic">
            KỶ NGUYÊN <br /> <span className="text-secondary text-glow not-italic">KIM QUY</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-body text-on-surface-variant max-w-3xl mx-auto leading-relaxed font-light">
            "Khi sương mù lãng quên bao phủ nhân gian, những mảnh ký ức ngàn năm dần tan biến. Bạn - Sử Gia Thời Không - là hy vọng duy nhất để thắp lại ngọn lửa Hào Khí Đại Việt."
          </p>
          
          <div className="flex flex-col items-center gap-6 pt-12">
            <div className="w-px h-24 bg-gradient-to-b from-secondary to-transparent"></div>
            <p className="text-secondary font-label text-xs uppercase tracking-widest animate-pulse">Cuộn để bắt đầu hành trình</p>
          </div>
        </div>
      </section>

      {/* Prologue: The Encounter */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 bg-primary-container/20 text-primary-fixed text-[10px] font-bold uppercase tracking-widest rounded">Khởi đầu</div>
            <h2 className="text-5xl font-headline font-black text-on-surface leading-tight">
              Lời Gọi Từ <br /><span className="text-secondary">Cõi Hư Vô</span>
            </h2>
            <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed font-body font-light">
              <p>
                Trong một thư viện cổ bị lãng quên, bạn tìm thấy một bộ thẻ bài kỳ lạ mang tên <span className="text-secondary font-bold">"Hào Khí Đại Việt"</span>. Ngay khi chạm vào, không gian bỗng rạn nứt. Thần Kim Quy xuất hiện, không phải trong hình hài một pho tượng đá vô tri, mà là một linh hồn rực rỡ ánh hoàng kim.
              </p>
              <p className="italic border-l-2 border-secondary/30 pl-6 py-2">
                "Tráng sĩ, sương mù lãng quên đang xóa nhòa lịch sử. Nếu không có ký ức, dân tộc sẽ không có tương lai. Hãy dùng Nhãn Thần (AR) để tìm lại những mảnh linh hồn của các vị anh hùng."
              </p>
            </div>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden group">
            <img
              className="w-full h-full object-cover brightness-50 transition-transform duration-1000 group-hover:scale-105"
              alt="Golden Turtle emerging from mystical waters"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3vB6hDuJBut16MXHi0FqknbmurfIRzZq6x8UKyrwEBrEYnbtvQ9oO6bSuEYjZOPFwzIvspPDfZMWh60C4ixWP3CDgdlp_d9x7zl8P8Jc30L5-RmiHM0N1e_LZGcelxF0kwAJudSPmI7lXAuYCpMKTsU9TNKyvNERBMAgnU4R6jvyn2lv9xGPWAvMA6fx2i6NWyFfbrkkp8vq-WU89tkXLHunrXi6EBj2bvJt1FSTRMGC0BPwduis2TKRdP6FDFqIeNLDt3ok2Aw"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-surface/80 backdrop-blur-md border border-secondary/20">
              <p className="text-xs text-secondary uppercase tracking-widest font-bold mb-2">Vật phẩm nhận được</p>
              <h4 className="text-xl font-headline font-bold text-on-surface">Nhãn Thần (AR Lens)</h4>
              <p className="text-sm text-on-surface-variant mt-1">Công cụ nhìn thấu thời gian, mở khóa các mảnh ký ức ẩn giấu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 1: The Vow of Autonomy */}
      <section className="relative py-32 bg-surface-container-lowest overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1XVnknDECsADa6aII_xOox9NBT8c33a7t8_otJPMcsxucRCgFGr4innYxd54NgBMz9qpM-nrLrKg1IWhlM0uZhxGQYTGaDbAam5X5i9awr3eLN5B_oAe9Ua8nt7Y5ZQDYAGSOaZxhwlWNhPh6nC-9ZX_fx5z5Qp7iUg7B01Cgl_i0icSvPijwIeAOoruamLP1T_7JQEQ_Ob2g2PWeSix4VxxT4_aKtOKx6nXXimjYG_6Lp3yuzL0VGVdw43ud6xqKuFsSsE9SMw" className="w-full h-full object-cover" alt="Ancient scroll" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-8 mb-20">
            <span className="text-secondary font-sans font-black text-6xl opacity-10">01</span>
            <h3 className="text-6xl font-headline font-black text-on-surface uppercase tracking-tighter">Huyết Mạch <br /> <span className="text-secondary">Rồng Tiên</span></h3>
            <p className="max-w-2xl text-lg text-on-surface-variant font-body font-light">
              Mảnh ký ức đầu tiên đưa bạn về thế kỷ XI. Bên dòng sông Như Nguyệt, một bài thơ thần vang lên, khẳng định chủ quyền dân tộc trước muôn vàn sóng gió.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Lý Thường Kiệt", desc: "Vị tướng với tầm nhìn chiến lược, người viết nên bản tuyên ngôn độc lập đầu tiên.", icon: "shield" },
              { title: "Nam Quốc Sơn Hà", desc: "Lời thề sắt son về chủ quyền, vang vọng khắp núi sông Đại Việt.", icon: "menu_book" },
              { title: "Phòng Tuyến Như Nguyệt", desc: "Bức tường thành kiên cố ngăn chặn vó ngựa xâm lăng phương Bắc.", icon: "fort" }
            ].map((item, i) => (
              <div key={i} className="p-10 bg-surface border border-secondary/10 hover:border-secondary/40 transition-all duration-500 group">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</span>
                <h4 className="text-2xl font-headline font-bold text-on-surface mb-4">{item.title}</h4>
                <p className="text-on-surface-variant font-body text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 2: The Spirit of Dong A */}
      <section className="relative py-48 px-6 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="flex-1 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 border border-secondary/20 rounded-xl"></div>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6DQMc19iSLrb1p9-YE4lroCUcdUAQD1DsukYabk8SBT03T5sFHfb4ZWL-TWfP-1kCZcirBzx-6EEr85l76LJTVwN2sYU0zjOJdhwPED22lyERF_nJViehhOCDz_pzZihfyA5k8lmp2AQe2pmXZ46fqFWjIg1alkBWNS6zkXX41iLyuxgVgQZynDaZOU9ngMpqIFIRjHqubKUZbq8GvAkWAQvXqR7Zy94eK4Xx61u4qHHKBpVqBKC85nHoR7WMW7yf52fcQ1Pg2A" 
                alt="General Tran Hung Dao" 
                className="w-full rounded-lg contrast-125 object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden lg:block">
                <div className="bg-secondary text-on-secondary p-6 rounded-full shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined text-4xl">history_edu</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 lg:order-2 space-y-8">
            <span className="text-secondary font-sans font-black text-6xl opacity-10">02</span>
            <h3 className="text-6xl font-headline font-black text-on-surface leading-none">SÁT THÁT: <br /><span className="text-secondary">HÀO KHÍ ĐÔNG A</span></h3>
            <p className="text-xl text-on-surface-variant font-body font-light leading-relaxed">
              Thế kỷ XIII, vó ngựa Nguyên Mông quét sạch từ Á sang Âu, nhưng phải dừng bước trước tinh thần đoàn kết của quân dân nhà Trần. Bạn sẽ chứng kiến hội nghị Diên Hồng, nơi ý chí của toàn dân tộc hòa làm một.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-surface-container-low border-l-4 border-secondary">
                <p className="italic text-on-surface font-body">"Bệ hạ chém đầu tôi trước rồi hãy hàng!"</p>
              </div>
              <p className="text-sm text-secondary font-bold uppercase tracking-widest">— Hưng Đạo Đại Vương Trần Quốc Tuấn</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Decisive Tide */}
      <section className="relative py-48 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCqCjRg6jUeprzRui8oI6FEocHPR_okvHfh2kVypF_ahRYalp5eh40ojwUNdfM6hORZ4PUZBB9n3wFzHYEvySJn3M631PBlZMqmrljlUXqiZldYUEWt3CAJiXfc0Dm3r-6gJOCoZcnLLeuYvT-p_XrAflcPaDqpQQS62Stc-NHXT1s3aUjswNbfYLaAJTo3oDWdniN7saCJ5uwQQd7bmkKz3A60o3JYVlDHD-VnZEDQaK6Q3yVA8swQvCHAvBjb9S0Z32DHm2jj5Q')" }}>
        <div className="absolute inset-0 bg-primary-container/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-12">
          <span className="text-secondary font-sans font-black text-6xl opacity-20">03</span>
          <h3 className="text-7xl md:text-9xl font-headline font-black text-on-surface uppercase leading-none italic">BẠCH ĐẰNG <br /> <span className="not-italic text-glow">DẬY SÓNG</span></h3>
          <p className="text-2xl text-on-surface font-body font-light leading-relaxed max-w-3xl mx-auto">
            Trận chiến cuối cùng để khôi phục hoàn toàn Hào Khí. Cọc gỗ vươn mình, thủy triều rút xuống, và hạm đội địch chìm trong lửa đỏ. Đây là lúc bạn sử dụng mọi kỹ năng chiến thuật đã học được từ Kim Quy.
          </p>
          <div className="flex justify-center pt-8">
            <button className="group relative px-16 py-6 bg-secondary text-on-secondary font-headline font-black text-2xl uppercase tracking-widest overflow-hidden transition-all hover:pr-20">
              <span className="relative z-10">Xung Trận Ngay</span>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Epilogue: The Legacy */}
      <section className="py-32 px-6 bg-surface">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10 border border-secondary/30 mb-8">
            <span className="material-symbols-outlined text-secondary text-5xl">workspace_premium</span>
          </div>
          <h3 className="text-5xl font-headline font-black text-on-surface">Hào Khí Truyền Đời</h3>
          <p className="text-xl text-on-surface-variant leading-loose font-body font-light">
            Sương mù lãng quên tan biến. Bạn trở về hiện tại, nhưng ngọn lửa Hào Khí Đại Việt giờ đây đã rực cháy trong tim. Lịch sử không chỉ là những trang sách cũ, nó là sức mạnh để chúng ta viết tiếp tương lai.
          </p>
          <div className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border border-secondary/10 bg-surface-container-low text-left">
              <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">Thành tựu mở khóa</p>
              <h5 className="text-lg font-headline font-bold text-on-surface">Sử Gia Đại Việt</h5>
            </div>
            <div className="p-6 border border-secondary/10 bg-surface-container-low text-left">
              <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-2">Vật phẩm vĩnh cửu</p>
              <h5 className="text-lg font-headline font-bold text-on-surface">Ngọn Lửa Đông A</h5>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-secondary/10 text-center flex flex-col items-center gap-6">
        <p className="text-on-surface-variant font-body text-sm uppercase tracking-[0.5em]">Bạn đã sẵn sàng viết tiếp lịch sử?</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="/ar-scanner" className="px-8 py-3 bg-secondary text-on-secondary font-headline font-bold hover:bg-white transition-colors uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="material-symbols-outlined">view_in_ar</span>
            Quét Thẻ Bài
          </a>
          <a href="/map" className="px-8 py-3 border border-secondary text-secondary font-headline font-bold hover:bg-secondary/10 transition-colors uppercase tracking-widest text-sm flex items-center gap-2">
            <span className="material-symbols-outlined">map</span>
            Khám Phá Bản Đồ
          </a>
        </div>
      </section>
    </main>
  );
}
