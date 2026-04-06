export default function Rules() {
  return (
    <main className="pt-28 pb-20 px-6 md:px-12 max-w-6xl mx-auto ancient-scroll-bg min-h-screen">
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h2 className="font-headline text-5xl md:text-7xl font-black text-secondary uppercase tracking-tighter mb-4 etched-text">HÀO KHÍ ĐẠI VIỆT</h2>
        <p className="font-sans font-bold text-secondary text-xl uppercase tracking-widest">Tổng hợp luật chơi v5</p>
        <div className="mt-8 flex justify-center items-center">
          <div className="h-1 w-24 bg-secondary"></div>
          <div className="mx-4 text-secondary"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span></div>
          <div className="h-1 w-24 bg-secondary"></div>
        </div>
      </section>

      {/* Rules Sections */}
      <div className="grid grid-cols-1 gap-8">

        {/* 0. Tổng quan và Cốt truyện */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">history_edu</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">0. Tổng quan và Cốt truyện</h3>
          </div>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>
              <strong>Hào khí Đại Việt</strong> là trò chơi thẻ bài chiến thuật (Trading Card Game) lấy cảm hứng từ những trang sử hào hùng của dân tộc Việt Nam. Trong game, bạn sẽ nhập vai một vị chủ tướng, triệu hồi các danh tướng kiệt xuất và quân binh tinh nhuệ từ khắp các triều đại để bảo vệ bờ cõi hoặc mở mang bờ cõi.
            </p>
            <p>
              Cốt truyện xoay quanh dòng chảy của <strong>Hào Khí</strong> - một nguồn năng lượng tâm linh kết nối quá khứ và hiện tại. Khi giang sơn lâm nguy, Hào Khí sẽ hội tụ, cho phép các anh hùng từ nhiều thời đại cùng sát cánh chiến đấu chống lại thế lực ngoại xâm và khẳng định chủ quyền dân tộc.
            </p>
          </div>
        </section>
        
        {/* 1. Thành phần và khái niệm cốt lõi */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">inventory_2</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">1. Thành phần và khái niệm cốt lõi</h3>
          </div>
          <div className="space-y-4 text-on-surface-variant leading-relaxed">
            <p>
              Bộ bài đầy đủ gồm 93 lá: 16 Danh tướng, 32 Quân lính, 15 Kế sách, 10 Bẫy, 4 Sự kiện và 16 Mệnh lệnh nhanh. App là công cụ hỗ trợ trải nghiệm AR, nghe thuyết minh và tra cứu dữ liệu.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>16 Danh tướng</strong>: Là linh hồn của bộ bài, mỗi tướng có kỹ năng đặc biệt riêng.</li>
              <li><strong>Bộ Tướng</strong>: Chứa 16 lá Danh tướng, dùng để chọn tướng khởi đầu.</li>
              <li><strong>Bộ Chiến trận</strong>: Gồm 77 lá còn lại (Quân lính, Kế sách, Bẫy, Sự kiện, Mệnh lệnh nhanh).</li>
              <li><strong>Hào khí</strong>: Chỉ số sinh mệnh của người chơi (mặc định 20 trong 1v1, 30 trong 2v2).</li>
              <li><strong>Quân lệnh</strong>: Tài nguyên tiêu tốn để sử dụng các lá bài từ tay.</li>
            </ul>
          </div>
        </section>

        {/* 2. Điều kiện thắng */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">trophy</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">2. Điều kiện thắng</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-surface-container-high border-l-4 border-primary">
              <h5 className="font-bold text-primary uppercase mb-2">Thắng chính (Tiêu diệt Tướng)</h5>
              <p className="text-sm">Đưa Hào khí của đối phương hoặc phe đối phương về 0 thông qua tấn công trực diện hoặc hiệu ứng bài.</p>
            </div>
            <div className="p-5 bg-surface-container-high border-l-4 border-secondary">
              <h5 className="font-bold text-secondary uppercase mb-2">Thắng phụ (Thiên mệnh)</h5>
              <p className="text-sm">Thu thập đủ 4 lá Sự kiện khác tên vào <strong>Sử bộ</strong> của mình. Chiến thắng sẽ được tính vào đầu lượt kế tiếp của bạn.</p>
            </div>
          </div>
        </section>

        {/* 3. Bàn chơi */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">grid_view</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">3. Bàn chơi</h3>
          </div>
          
          <div className="space-y-12">
            {/* 3.1. Bàn chơi 1v1 */}
            <div>
              <h4 className="font-bold text-secondary uppercase mb-4">3.1. Bàn chơi 1v1</h4>
              <p className="text-sm mb-6">Mỗi người có 1 ô Tướng, 3 ô Tiền tuyến và 2 ô Hậu tuyến. Tiền tuyến là nơi giao chiến chính. Hậu tuyến dùng để đặt bẫy úp hoặc lính hỗ trợ có ghi rõ được đứng sau.</p>
              
              <div className="bg-black/40 p-6 rounded-xl border border-secondary/20 overflow-x-auto">
                <div className="min-w-[600px] flex flex-col gap-2 text-center text-[10px] uppercase font-bold">
                  <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Ô Tướng đối thủ</div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến trái</div>
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến phải</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến trái</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến giữa</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến phải</div>
                  </div>
                  <div className="h-4 flex items-center justify-center my-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
                    <span className="absolute px-4 bg-surface text-[8px] tracking-[0.3em] text-secondary">Vách giao tranh</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến trái</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến giữa</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến phải</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến trái</div>
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến phải</div>
                  </div>
                  <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Ô Tướng của bạn</div>
                </div>
              </div>
            </div>

            {/* 3.2. Bàn chơi 2v2 */}
            <div>
              <h4 className="font-bold text-secondary uppercase mb-4">3.2. Bàn chơi 2v2</h4>
              <p className="text-sm mb-6">Mỗi phe có 2 Tướng, 4 ô Tiền tuyến và 2 ô Hậu tuyến. Hai người cùng phe ngồi cạnh nhau. Mỗi người điều khiển 1 Tướng, 2 ô Tiền tuyến ở phần sân của mình và 1 ô Hậu tuyến sau lưng phần sân đó.</p>
              
              <div className="bg-black/40 p-6 rounded-xl border border-secondary/20 overflow-x-auto">
                <div className="min-w-[700px] flex flex-col gap-2 text-center text-[10px] uppercase font-bold">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Tướng người trái</div>
                    <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Tướng người phải</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến trái</div>
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến phải</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 1</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 2</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 3</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 4</div>
                  </div>
                  <div className="h-4 flex items-center justify-center my-2">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 1</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 2</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 3</div>
                    <div className="p-2 bg-primary/10 border border-primary/30">Tiền tuyến 4</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến trái</div>
                    <div className="p-2 bg-secondary/5 border border-secondary/20">Hậu tuyến phải</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Tướng người trái</div>
                    <div className="p-2 bg-secondary/10 border border-secondary/30 text-secondary">Tướng người phải</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Chuẩn bị ván đấu */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">settings</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">4. Chuẩn bị ván đấu</h3>
          </div>
          <div className="space-y-6">
            <div>
              <h5 className="font-bold text-secondary uppercase mb-2 text-sm">4.1. Chuẩn bị chung</h5>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Tách riêng Bộ Tướng và Bộ Chiến trận.</li>
                <li>Xào Bộ Tướng. Xào Bộ Chiến trận.</li>
                <li>Đặt Mộ bài và Sử bộ ở vị trí cả hai bên đều nhìn thấy.</li>
                <li>Người đi trước được xác định ngẫu nhiên.</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-surface-container-high rounded border border-outline-variant/20">
                <h5 className="font-bold text-primary uppercase mb-2 text-xs">4.2. Chế độ 1v1</h5>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>Mỗi người bắt đầu với 20 Hào khí.</li>
                  <li>Mỗi người bốc ngẫu nhiên 2 lá từ Bộ Tướng, chọn 1 lá làm Tướng khởi đầu, lá còn lại trả xuống đáy Bộ Tướng.</li>
                  <li>Mỗi người rút 5 lá từ Bộ Chiến trận.</li>
                  <li>Mỗi người được đổi bài mở đầu 1 lần: bỏ tối đa số lá tùy ý vào đáy Bộ Chiến trận, rồi rút lại đúng số lá đó.</li>
                  <li>Người đi trước không rút bài ở lượt đầu tiên của mình.</li>
                </ul>
              </div>
              <div className="p-4 bg-surface-container-high rounded border border-outline-variant/20">
                <h5 className="font-bold text-secondary uppercase mb-2 text-xs">4.3. Chế độ 2v2</h5>
                <ul className="list-disc pl-4 text-xs space-y-1">
                  <li>Mỗi phe bắt đầu với 30 Hào khí chung.</li>
                  <li>Mỗi người trong phe bốc ngẫu nhiên 2 lá từ Bộ Tướng, chọn 1 lá làm Tướng của mình, lá còn lại trả xuống đáy Bộ Tướng. Như vậy mỗi phe có 2 Tướng.</li>
                  <li>Mỗi người rút 4 lá từ Bộ Chiến trận.</li>
                  <li>Mỗi người được đổi bài mở đầu 1 lần tương tự 1v1.</li>
                  <li>2v2 dùng lượt theo phe: Phe A hành động xong mới đến Phe B. Không chia thành hai lượt riêng liên tiếp trong cùng một phe.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Quân lệnh */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">token</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">5. Quân lệnh</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className="font-bold text-secondary uppercase mb-3 text-sm">5.1. 1v1</h5>
              <ul className="space-y-2 text-sm">
                <li>Lượt 1: 2 Quân lệnh.</li>
                <li>Lượt 2: 3 Quân lệnh.</li>
                <li>Lượt 3: 4 Quân lệnh.</li>
                <li>Lượt 4 trở đi: 5 Quân lệnh tối đa.</li>
              </ul>
              <p className="text-xs italic mt-4 text-on-surface-variant">Quân lệnh của 1v1 là quỹ riêng của từng người. Quân lệnh không dùng hết sẽ mất ở cuối lượt, không cộng dồn sang lượt sau.</p>
            </div>
            <div>
              <h5 className="font-bold text-secondary uppercase mb-3 text-sm">5.2. 2v2</h5>
              <ul className="space-y-2 text-sm">
                <li>Lượt phe 1: 3 Quân lệnh chung.</li>
                <li>Lượt phe 2: 4 Quân lệnh chung.</li>
                <li>Lượt phe 3: 5 Quân lệnh chung.</li>
                <li>Lượt phe 4 trở đi: 6 Quân lệnh chung tối đa.</li>
              </ul>
              <p className="text-xs italic mt-4 text-on-surface-variant">Quân lệnh 2v2 là quỹ chung của cả phe. Hai người trong phe bàn với nhau để tiêu quỹ này trong một lượt phe. Cả phe chỉ có đúng một quỹ chung theo mốc trên.</p>
            </div>
          </div>
        </section>

        {/* 6. Trạng thái lá bài trên bàn */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">visibility</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">6. Trạng thái lá bài trên bàn</h3>
          </div>
          <ul className="list-disc pl-6 text-sm space-y-2 text-on-surface-variant">
            <li>Danh tướng và Quân lính được đặt ngửa, dựng dọc khi mới ra bàn.</li>
            <li>Quân lính đã tấn công hoặc đã hành động trong lượt sẽ xoay ngang để đánh dấu.</li>
            <li>Đầu lượt của mình hoặc đầu lượt phe mình, các Quân lính của bên đó dựng lại.</li>
            <li>Bẫy được đặt úp ở Hậu tuyến. Khi kích hoạt thì lật lên, giải quyết hiệu ứng rồi đưa vào Mộ bài.</li>
            <li>Kế sách và Mệnh lệnh nhanh không nằm lại trên bàn; dùng xong vào Mộ bài.</li>
            <li>Sự kiện được lật ngay khi rút trúng và đưa vào Sử bộ sau khi giải quyết hiệu ứng.</li>
            <li>Mộ bài và Sử bộ đều để ngửa, ai cũng được xem.</li>
          </ul>
        </section>

        {/* 7. Trình tự lượt chơi */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">reorder</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">7. Trình tự lượt chơi</h3>
          </div>
          <div className="space-y-8">
            <div>
              <h5 className="font-bold text-secondary uppercase mb-4 text-sm">7.1. Trình tự một lượt trong 1v1</h5>
              <div className="space-y-2">
                {["Nạp Quân lệnh theo mốc lượt của mình.", "Rút 1 lá từ Bộ Chiến trận. Người đi trước bỏ qua bước này ở lượt đầu.", "Dàn quân. Có thể triển khai lính, đặt bẫy, dùng kế sách, dùng mệnh lệnh nhanh nếu đúng thời điểm.", "Giao chiến.", "Cuối lượt. Bỏ bài trên tay xuống tối đa 7 lá và xóa Quân lệnh dư."].map((step, i) => (
                  <div key={i} className="flex gap-4 p-3 bg-surface-container-high rounded items-center">
                    <span className="font-headline text-secondary text-lg">0{i+1}</span>
                    <p className="text-xs">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-bold text-secondary uppercase mb-4 text-sm">7.2. Trình tự một lượt phe trong 2v2</h5>
              <div className="space-y-2">
                {["Dựng lại toàn bộ Quân lính của cả phe.", "Nhận Quân lệnh chung theo mốc lượt phe.", "Mỗi người trong phe rút 1 lá. Riêng phe đi trước bỏ qua toàn bộ bước rút ở lượt phe đầu tiên.", "Hai đồng đội luân phiên thực hiện hành động và cùng tiêu quỹ Quân lệnh chung. Tổng số lính triển khai mới trong một lượt phe tối đa 3 lá.", "Giao chiến của cả phe.", "Cuối lượt phe. Mỗi người giữ tối đa 7 lá trên tay, quỹ Quân lệnh chung còn dư bị xóa."].map((step, i) => (
                  <div key={i} className="flex gap-4 p-3 bg-surface-container-high rounded items-center">
                    <span className="font-headline text-secondary text-lg">0{i+1}</span>
                    <p className="text-xs">{step}</p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] italic mt-4 text-on-surface-variant">Trong 2v2, đồng đội có thể bàn bạc tự do. Tuy nhiên một hành động phải được công bố rõ ràng và giải quyết xong rồi mới đến hành động tiếp theo.</p>
            </div>
          </div>
        </section>

        {/* 8. Triển khai lá bài */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">style</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">8. Triển khai lá bài</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-surface-container-high rounded border-t-2 border-primary">
              <h5 className="font-bold text-primary uppercase mb-2 text-xs">8.1. Quân lính</h5>
              <ul className="text-[11px] space-y-1 list-disc pl-4">
                <li>Chơi từ tay bằng cách trả đúng chi phí Quân lệnh.</li>
                <li>Thường đặt ở Tiền tuyến. Chỉ các lá ghi rõ mới được đặt ở Hậu tuyến.</li>
                <li>1v1: tối đa 2 lính mới/lượt.</li>
                <li>2v2: cả phe tối đa 3 lính mới/lượt phe.</li>
              </ul>
            </div>
            <div className="p-4 bg-surface-container-high rounded border-t-2 border-secondary">
              <h5 className="font-bold text-secondary uppercase mb-2 text-xs">8.2. Bẫy</h5>
              <ul className="text-[11px] space-y-1 list-disc pl-4">
                <li>Phải được đặt úp ở Hậu tuyến.</li>
                <li>Mỗi ô Hậu tuyến chỉ chứa tối đa 1 lá đang nằm trên bàn.</li>
                <li>Khi điều kiện đáp ứng, lật lên, giải quyết rồi vào Mộ bài.</li>
              </ul>
            </div>
            <div className="p-4 bg-surface-container-high rounded border-t-2 border-tertiary">
              <h5 className="font-bold text-tertiary uppercase mb-2 text-xs">8.3. Kế sách & ML nhanh</h5>
              <ul className="text-[11px] space-y-1 list-disc pl-4">
                <li>Kế sách: dùng trong lượt mình/phe mình (trừ khi ghi khác).</li>
                <li>Mệnh lệnh nhanh: lá phản ứng, dùng đúng thời điểm cho phép.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 9. Cơ chế giao tranh */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">swords</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">9. Cơ chế giao tranh</h3>
          </div>
          <div className="space-y-6">
            <p className="text-sm italic text-on-surface-variant">Game dùng cơ chế rất gọn: so Công của bên tấn công với Thủ của bên bị tấn công. Không có tràn sát thương mặc định và không tự động gây sát thương ngược lại, trừ khi lá bài ghi khác.</p>
            <ul className="list-disc pl-6 text-sm space-y-2">
              <li>Mỗi Quân lính ở Tiền tuyến có thể tấn công 1 lần trong bước Giao chiến.</li>
              <li>Mục tiêu mặc định là lá địch ở cùng làn đối diện trước mặt.</li>
              <li>Nếu <strong>Công &lt; Thủ</strong>: mục tiêu sống sót.</li>
              <li>Nếu <strong>Công &ge; Thủ</strong>: mục tiêu bị hạ và đưa vào Mộ bài.</li>
              <li>Nếu trước mặt không có lá địch, Quân lính được công phá trực diện và gây <strong>1 Hào khí</strong> lên đối thủ hoặc phe đối thủ.</li>
              <li>Danh tướng không trực tiếp giao chiến như lính và không bị chọn làm mục tiêu thông thường.</li>
            </ul>
            
            <div className="mt-6">
              <h5 className="font-bold text-secondary uppercase mb-4 text-xs">9.1. Ví dụ ngắn</h5>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left border-collapse">
                  <thead>
                    <tr className="bg-secondary/10 text-secondary uppercase">
                      <th className="p-2 border border-secondary/20">Tình huống</th>
                      <th className="p-2 border border-secondary/20">Công</th>
                      <th className="p-2 border border-secondary/20">Thủ</th>
                      <th className="p-2 border border-secondary/20">Kết quả</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-secondary/10">Lính A đánh lính B</td>
                      <td className="p-2 border border-secondary/10">2</td>
                      <td className="p-2 border border-secondary/10">3</td>
                      <td className="p-2 border border-secondary/10">B không bị hạ</td>
                    </tr>
                    <tr className="bg-white/5">
                      <td className="p-2 border border-secondary/10">Lính A đánh lính B</td>
                      <td className="p-2 border border-secondary/10">3</td>
                      <td className="p-2 border border-secondary/10">3</td>
                      <td className="p-2 border border-secondary/10 text-primary">B bị hạ, vào Mộ bài</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-secondary/10">Không có địch trước mặt</td>
                      <td className="p-2 border border-secondary/10">4</td>
                      <td className="p-2 border border-secondary/10">—</td>
                      <td className="p-2 border border-secondary/10 text-secondary">Đối thủ mất 1 Hào khí</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Sự kiện và Thiên mệnh */}
        <section className="bg-surface-container-low border border-outline-variant/30 p-8 rounded-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className="material-symbols-outlined text-secondary text-3xl font-bold">flare</span>
            <h3 className="font-sans font-extrabold text-2xl uppercase tracking-widest text-on-surface">10. Sự kiện và Thiên mệnh</h3>
          </div>
          <ul className="list-disc pl-6 text-sm space-y-3 text-on-surface-variant">
            <li>Khi rút trúng lá Sự kiện, phải lật ngay, giải quyết hiệu ứng ngay, rồi đặt vào Sử bộ của bên vừa rút trúng.</li>
            <li>Sự kiện không nằm trên tay, không được giữ lại để chơi sau.</li>
            <li>Nếu vào đầu lượt của mình hoặc đầu lượt phe mình, Sử bộ của bên đó có đủ <strong>4 lá Sự kiện khác tên</strong>, bên đó thắng theo <strong>Thiên mệnh</strong>.</li>
            <li>Một số lá bài có thể bảo vệ Sử bộ hoặc phá Sử bộ. Nếu bị phá, điều kiện Thiên mệnh chưa hoàn thành.</li>
          </ul>
        </section>

      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center text-[10px] text-on-surface/40 uppercase tracking-widest italic">
        Hào khí Đại Việt | Luật tổng hợp v5
      </div>
    </main>
  );
}
