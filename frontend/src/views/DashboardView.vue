<template>
  <div class="nevio-dashboard-page">
    <!-- ======================================================== -->
    <!-- 1. NEVIO HERO SECTION (Exact Webflow Layout)            -->
    <!-- ======================================================== -->
    <section class="section hero-section anim-fade-up">
      <!-- Background Image & Overlay -->
      <div class="hero-image-wrap">
        <img 
          src="https://cdn.prod.website-files.com/6a5f49f597e097761e089dbc/6a5f608a1795f7f89a8b565f_hero-girl.webp" 
          alt="Nevio Travel Hero" 
          class="hero-image"
          @error="xuLyLoiHeroImg"
        />
        <div class="hero-overlay"></div>
      </div>

      <!-- Giant Translucent Background Word "Discover" -->
      <div class="display-wrap">
        <div class="display hero anim-float">Discover</div>
      </div>

      <!-- Navbar Sitting Inside Top of Hero -->
      <Navbar />

      <!-- Hero Main Content (Bottom Left & Right) -->
      <div class="hero-content-wrapper">
        <div class="hero-text-col">
          <div class="nevio-eyebrow-pill">
            <span class="eyebrow-dot"></span>
            HỆ THỐNG GIÁM SÁT DANH TIẾNG &amp; CÔNG NGHỆ ABSA DU LỊCH ĐT-12
          </div>
          <h1 class="hero-heading">
            Khám Phá Kỳ Quan &amp;<br/>
            <span class="text-yellow">Giám Sát Danh Tiếng</span>
          </h1>
          <p class="hero-paragraph">
            Ứng dụng trí tuệ nhân tạo <strong>PhoBERT</strong> kết hợp thuật toán <strong>Wilson Score</strong> bóc tách 5 khía cạnh dịch vụ từ <strong>874 đánh giá TripAdvisor</strong>, lọc sạch review ảo và bảo chứng các điểm sáng du lịch hàng đầu Việt Nam.
          </p>
        </div>

        <div class="hero-action-col">
          <router-link to="/diem-den" class="nevio-btn-yellow">
            <span class="button-text">Khám Phá Điểm Đến</span>
            <div class="btn-icon-circle">
              <ArrowRight :size="18" />
            </div>
          </router-link>
        </div>
      </div>

      <!-- Torn Paper Brush Bottom Shape -->
      <div class="hero-bottom-shape-wrap">
        <img 
          src="https://cdn.prod.website-files.com/6a5f49f597e097761e089dbc/6a5f6420da257b09ca8f49f9_hero-shape.svg" 
          alt="Nevio Torn Shape" 
          class="hero-bottom-shape"
        />
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 2. SEARCH & FILTER TOOLBAR                               -->
    <!-- ======================================================== -->
    <section class="section-search-toolbar">
      <div class="nevio-container">
        <div class="floating-search-bar">
          <div class="search-field flex-grow">
            <Search :size="18" class="field-icon-svg text-muted" />
            <input 
              v-model="tuKhoaTimKiem" 
              type="text" 
              placeholder="Tìm kiếm điểm đến (Hạ Long, Tràng An, Phú Quốc...)" 
              class="field-input"
            />
          </div>

          <div class="bar-divider"></div>

          <div class="search-field">
            <MapPin :size="18" class="field-icon-svg text-muted" />
            <select v-model="locTinhThanh" class="field-select">
              <option value="">Tất cả địa phương</option>
              <option value="Quảng Ninh">Quảng Ninh (Hạ Long)</option>
              <option value="Ninh Bình">Ninh Bình (Tràng An, Hang Múa)</option>
              <option value="Kiên Giang">Kiên Giang (Phú Quốc)</option>
            </select>
          </div>

          <div class="bar-divider"></div>

          <div class="search-field">
            <ShieldCheck :size="18" class="field-icon-svg text-muted" />
            <select v-model="locTrangThai" class="field-select">
              <option value="">Tất cả trạng thái Wilson</option>
              <option value="diem_sang">Điểm sáng du lịch (>= 0.70)</option>
              <option value="binh_thuong">Hoạt động ổn định</option>
              <option value="canh_bao">Cần chú ý cải thiện</option>
            </select>
          </div>

          <button @click="datLaiBoLoc" class="btn-clear-filter" title="Làm mới bộ lọc">
            <RotateCcw :size="15" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 3. HOW IT WORKS & ONBOARDING GUIDE (HƯỚNG DẪN SỬ DỤNG)   -->
    <!-- ======================================================== -->
    <section id="how-it-works" class="section section-guide bg-light">
      <div class="nevio-container">
        <div class="common-heading-wrapper text-center">
          <span class="nevio-label center">QUY TRÌNH HỆ THỐNG &amp; HƯỚNG DẪN TRẢI NGHIỆM</span>
          <h2 class="heading-style-h2">Hệ Thống Này Dùng Để Làm Gì &amp; Sử Dụng Như Thế Nào?</h2>
          <p class="guide-subtitle">
            Hệ thống giải quyết bài toán nhức nhối trong du lịch: <strong>loại bỏ đánh giá giả mạo/thổi phồng</strong> và <strong>bóc tách chi tiết từng khía cạnh dịch vụ</strong> bằng 4 bước minh bạch:
          </p>
        </div>

        <div class="steps-grid">
          <!-- Step 1 -->
          <div class="step-card">
            <div class="step-badge">BƯỚC 1</div>
            <div class="step-icon-box bg-sky">
              <Search :size="26" class="text-sky" />
            </div>
            <h3 class="step-title">Thu Thập &amp; Tra Cứu</h3>
            <p class="step-desc">
              Tự động thu thập <strong>874 đánh giá nguyên văn</strong> từ TripAdvisor tại 7 điểm đến trọng điểm (Hạ Long, Tràng An, Phú Quốc...). Bạn có thể gõ tìm kiếm hoặc lọc theo địa phương ngay tại thanh công cụ phía trên.
            </p>
            <div class="step-hint">Du khách nhập từ khóa hoặc chọn tỉnh thành để xem dữ liệu.</div>
          </div>

          <!-- Step 2 -->
          <div class="step-card">
            <div class="step-badge">BƯỚC 2</div>
            <div class="step-icon-box bg-emerald">
              <BarChart3 :size="26" class="text-emerald" />
            </div>
            <h3 class="step-title">Phân Tích ABSA (PhoBERT)</h3>
            <p class="step-desc">
              Thay vì chỉ đọc điểm sao chung chung, mô hình AI bóc tách cảm nghĩ du khách thành <strong>5 khía cạnh độc lập</strong>: Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh và Giá cả kèm tỷ lệ hài lòng chi tiết.
            </p>
            <div class="step-hint">Xem biểu đồ sắc thái Tích cực - Trung tính - Tiêu cực từng khía cạnh.</div>
          </div>

          <!-- Step 3 -->
          <div class="step-card">
            <div class="step-badge">BƯỚC 3</div>
            <div class="step-icon-box bg-amber">
              <ShieldCheck :size="26" class="text-amber" />
            </div>
            <h3 class="step-title">Định Tuyến Wilson Score</h3>
            <p class="step-desc">
              Áp dụng công thức khoảng tin cậy nhị thức 95% để tính cận dưới điểm uy tín. Điểm đến ít review hoặc bị spam không thể giả mạo điểm số. Điểm đến đạt <strong>w ≥ 0.70</strong> được chứng nhận <strong>"Điểm sáng du lịch"</strong>.
            </p>
            <div class="step-hint">Chỉ điểm đến có huy hiệu "Điểm sáng" mới đủ tiêu chuẩn mở ưu đãi.</div>
          </div>

          <!-- Step 4 -->
          <div class="step-card">
            <div class="step-badge">BƯỚC 4</div>
            <div class="step-icon-box bg-purple">
              <Ticket :size="26" class="text-purple" />
            </div>
            <h3 class="step-title">Nhận Ưu Đãi &amp; Đặt Tour</h3>
            <p class="step-desc">
              Bấm nút <strong>"Nhận ưu đãi"</strong> tại các Điểm sáng để nhận mã voucher bảo chứng độc lập có hiệu lực 15 phút và chuyển thẳng tới trang đặt dịch vụ của đối tác một cách an tâm tuyệt đối.
            </p>
            <div class="step-hint">Voucher lưu trong "Ví phiếu của tôi" và có thể chuyển hướng đối tác ngay.</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 4. ABOUT US / SYSTEM OVERVIEW STATS                      -->
    <!-- ======================================================== -->
    <section class="section section-about">
      <div class="nevio-container">
        <div class="common-heading-wrapper text-center">
          <span class="nevio-label center">VỀ HỆ THỐNG ĐT-12</span>
          <h2 class="heading-style-h3 about-heading">
            Dữ liệu thực nghiệm kiểm chứng độc lập bảo vệ quyền lợi du khách và nâng tầm uy tín doanh nghiệp lữ hành.
          </h2>
        </div>

        <!-- 4 Stats Cards with Lucide Icons -->
        <div class="stats-grid-wrapper">
          <div class="nevio-stat-card">
            <div class="stat-icon-wrap bg-sky">
              <MessageSquareQuote :size="24" class="text-sky" />
            </div>
            <div class="stat-main-number">874</div>
            <div class="stat-title">Đánh Giá TripAdvisor</div>
            <p class="stat-caption">Dữ liệu cào thực tế từ du khách toàn cầu</p>
          </div>

          <div class="nevio-stat-card">
            <div class="stat-icon-wrap bg-emerald">
              <Compass :size="24" class="text-emerald" />
            </div>
            <div class="stat-main-number">7</div>
            <div class="stat-title">Điểm Đến Trọng Điểm</div>
            <p class="stat-caption">Quảng Ninh · Ninh Bình · Phú Quốc</p>
          </div>

          <div class="nevio-stat-card">
            <div class="stat-icon-wrap bg-amber">
              <BarChart3 :size="24" class="text-amber" />
            </div>
            <div class="stat-main-number">94.6%</div>
            <div class="stat-title">Độ Chính Xác ABSA</div>
            <p class="stat-caption">Mô hình PhoBERT F1-Score 0.89</p>
          </div>

          <div class="nevio-stat-card">
            <div class="stat-icon-wrap bg-purple">
              <ShieldCheck :size="24" class="text-purple" />
            </div>
            <div class="stat-main-number">95%</div>
            <div class="stat-title">Khoảng Tin Cậy Wilson</div>
            <p class="stat-caption">Định tuyến nhị thức công tâm, minh bạch</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 5. CURATED DESTINATIONS (Nevio Packages Cards Layout)    -->
    <!-- ======================================================== -->
    <section id="destinations-section" class="section section-destinations">
      <div class="nevio-container">
        <div class="destinations-header-row">
          <div>
            <span class="nevio-label">ĐIỂM ĐẾN DU LỊCH NỔI BẬT</span>
            <h2 class="heading-style-h2">Khám Phá Danh Tiếng 7 Điểm Đến</h2>
            <p class="destinations-desc">
              Nhấp vào từng điểm đến để xem chi tiết 5 khía cạnh dịch vụ và nhận voucher đặt tour nếu đạt chuẩn Điểm sáng.
            </p>
          </div>

          <!-- Quick Filter Pills -->
          <div class="category-pills">
            <button 
              @click="locNhanh('')" 
              :class="['cat-pill', { active: locTinhThanh === '' && locTrangThai === '' }]"
            >
              Tất cả ({{ dsDiemDen.length }})
            </button>
            <button 
              @click="locNhanhTrangThai('diem_sang')" 
              :class="['cat-pill', { active: locTrangThai === 'diem_sang' }]"
            >
              <Sparkles :size="13" />
              <span>Điểm sáng ({{ demDiemSang }})</span>
            </button>
            <button 
              @click="locNhanhTinh('Quảng Ninh')" 
              :class="['cat-pill', { active: locTinhThanh === 'Quảng Ninh' }]"
            >
              Quảng Ninh
            </button>
            <button 
              @click="locNhanhTinh('Ninh Bình')" 
              :class="['cat-pill', { active: locTinhThanh === 'Ninh Bình' }]"
            >
              Ninh Bình
            </button>
            <button 
              @click="locNhanhTinh('Kiên Giang')" 
              :class="['cat-pill', { active: locTinhThanh === 'Kiên Giang' }]"
            >
              Phú Quốc
            </button>
          </div>
        </div>

        <!-- Cards Grid -->
        <div v-if="diemDenHienThi.length > 0" class="destinations-cards-grid">
          <article v-for="dest in diemDenHienThi" :key="dest.id" class="nevio-destination-card">
            <!-- Card Image Wrap with Overlays -->
            <div class="dest-image-wrap">
              <img :src="dest.hinh_anh" :alt="dest.ten" class="dest-card-img" loading="lazy" @error="xuLyLoiImg" />
              <div class="card-img-gradient"></div>

              <!-- Top Left: Location Tag with Lucide MapPin -->
              <div class="tag-location-pill">
                <MapPin :size="13" />
                <span>{{ dest.tinh_thanh }}</span>
              </div>

              <!-- Top Right: Wilson Status Badge with Lucide Icon -->
              <div :class="['tag-status-badge', 'status-' + (dest.trang_thai_wilson || 'binh_thuong'), { 'pulse-badge': dest.trang_thai_wilson === 'diem_sang' }]">
                <Sparkles v-if="dest.trang_thai_wilson === 'diem_sang'" :size="13" />
                <AlertTriangle v-else-if="dest.trang_thai_wilson === 'canh_bao'" :size="13" />
                <CheckCircle2 v-else :size="13" />
                <span>{{ dest.trang_thai_wilson === 'diem_sang' ? 'Điểm sáng du lịch' : dest.trang_thai_wilson === 'canh_bao' ? 'Cần chú ý' : 'Ổn định' }}</span>
              </div>

              <!-- Bottom Right: Rating & Review Count -->
              <div class="tag-rating-pill">
                <Star :size="14" class="fill-yellow" />
                <span class="rating-num">{{ dest.diem_danh_tieng_tb }}</span>
                <span class="rating-count">({{ dest.tong_luot_danh_gia }} reviews)</span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="dest-card-body">
              <span class="dest-type-category">{{ dest.loai_hinh }}</span>
              <h3 class="dest-card-title">
                <router-link :to="'/diem-den/' + dest.id">
                  {{ dest.ten }}
                </router-link>
              </h3>
              <p class="dest-card-summary">{{ dest.mo_ta }}</p>

              <!-- 5 ABSA Micro-Score Chips with Lucide Icons -->
              <div v-if="dest.khia_canh" class="aspect-micro-chips">
                <span class="micro-chip" title="Cảnh quan & Không gian">
                  <Trees :size="13" />
                  <span>Cảnh quan: {{ dest.khia_canh.canh_quan?.diem }}/5</span>
                </span>
                <span class="micro-chip" title="Chất lượng phục vụ">
                  <HeartHandshake :size="13" />
                  <span>Dịch vụ: {{ dest.khia_canh.dich_vu?.diem }}/5</span>
                </span>
                <span class="micro-chip" title="Ẩm thực & Đặc sản">
                  <Utensils :size="13" />
                  <span>Ẩm thực: {{ dest.khia_canh.am_thuc?.diem }}/5</span>
                </span>
                <span class="micro-chip" title="Vệ sinh & Môi trường">
                  <Sparkles :size="13" />
                  <span>Vệ sinh: {{ dest.khia_canh.ve_sinh?.diem }}/5</span>
                </span>
                <span class="micro-chip" title="Giá cả & Minh bạch">
                  <DollarSign :size="13" />
                  <span>Giá cả: {{ dest.khia_canh.gia_ca?.diem }}/5</span>
                </span>
              </div>

              <!-- Action Row -->
              <div class="dest-card-footer">
                <router-link :to="'/diem-den/' + dest.id" class="link-detail-action">
                  <span>Chi tiết &amp; Khía cạnh ABSA</span>
                  <ArrowRight :size="14" />
                </router-link>

                <button 
                  v-if="dest.trang_thai_wilson === 'diem_sang'"
                  @click="nhanUuDaiNhanh(dest)"
                  class="btn-claim-pill"
                  title="Nhận mã voucher giảm giá 15% sử dụng trong 15 phút"
                >
                  <Ticket :size="14" />
                  <span>Nhận ưu đãi 15%</span>
                </button>
                <span v-else class="locked-voucher-text" title="Chỉ mở ưu đãi khi điểm đến đạt chỉ số Wilson >= 0.70">
                  Chưa mở ưu đãi
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state-card">
          <Search :size="36" class="text-muted mb-2" />
          <h3>Không tìm thấy điểm đến nào phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút bên dưới để xem lại toàn bộ 7 điểm đến.</p>
          <button @click="datLaiBoLoc" class="btn-reset-dark">Làm mới bộ lọc</button>
        </div>

        <div class="section-more-action">
          <router-link to="/diem-den" class="btn-nevio-dark-cta">
            <span>Khám phá toàn bộ 7 điểm đến &amp; bảng đối soát Wilson 95%</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 6. ABSA 5-ASPECT DEEP DIVE ANALYTICS SECTION            -->
    <!-- ======================================================== -->
    <section id="absa-section" class="section section-absa bg-light">
      <div class="nevio-container">
        <div class="common-heading-wrapper text-center">
          <span class="nevio-label center">CÔNG NGHỆ TRÍ TUỆ NHÂN TẠO ABSA</span>
          <h2 class="heading-style-h2">Báo Cáo Sắc Thái 5 Khía Cạnh Cốt Lõi</h2>
          <p class="absa-subheading">
            Mô hình PhoBERT-base tự động phân định 3 sắc thái độc lập (Tích cực · Trung tính · Tiêu cực) cho từng khía cạnh dịch vụ du lịch.
          </p>
        </div>

        <div class="absa-cards-grid">
          <div v-for="item in danhSachKhiaCanh" :key="item.id" class="absa-analysis-card">
            <div class="absa-card-top">
              <div class="absa-title-group">
                <component :is="layIconKhiaCanh(item.id)" :size="20" class="absa-icon-svg" />
                <div>
                  <h4 class="absa-aspect-name">{{ item.ten }}</h4>
                  <span class="absa-aspect-count">{{ item.so_luot }} lượt trích xuất</span>
                </div>
              </div>
              <div class="absa-aspect-rating">
                <span class="rate-val">{{ item.diem }}</span>
                <span class="rate-max">/5.0</span>
              </div>
            </div>

            <!-- Sentiment Breakdown Progress Bar -->
            <div class="sentiment-bar-track">
              <div class="seg-positive" :style="{ width: item.tich_cuc + '%' }" :title="'Tích cực: ' + item.tich_cuc + '%'"></div>
              <div class="seg-neutral" :style="{ width: item.trung_tinh + '%' }" :title="'Trung tính: ' + item.trung_tinh + '%'"></div>
              <div class="seg-negative" :style="{ width: item.tieu_cuc + '%' }" :title="'Tiêu cực: ' + item.tieu_cuc + '%'"></div>
            </div>

            <div class="sentiment-legend-row">
              <span class="leg-item text-positive">● {{ item.tich_cuc }}% Tích cực</span>
              <span class="leg-item text-neutral">● {{ item.trung_tinh }}% Trung tính</span>
              <span class="leg-item text-negative">● {{ item.tieu_cuc }}% Tiêu cực</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 7. CRISIS MONITOR & WILSON FORMULA                      -->
    <!-- ======================================================== -->
    <section class="section section-monitor">
      <div class="nevio-container">
        <div class="monitor-split-card">
          <div class="monitor-col-info">
            <div class="safe-indicator-badge">
              <span class="status-pulse-dot"></span>
              <span>TRẠNG THÁI HỆ THỐNG: AN TOÀN &amp; ỔN ĐỊNH</span>
            </div>
            <h3 class="monitor-heading">Giám Sát Cảnh Báo Sớm Khủng Hoảng Danh Tiếng</h3>
            <p class="monitor-paragraph">
              Thuật toán tự động quét biến động tỷ lệ tiêu cực trong 874 đánh giá TripAdvisor theo cửa sổ trượt 30 ngày. Không ghi nhận bất kỳ đột biến tiêu cực nào vượt ngưỡng cảnh báo 20%, đảm bảo danh tiếng điểm đến được phản ánh chân thực.
            </p>
            <div class="monitor-features-list">
              <div class="m-feature-row">
                <ShieldCheck :size="20" class="text-emerald" />
                <div>
                  <strong>Chống gian lận &amp; đánh giá ảo (Spam Reviews)</strong>
                  <p>Khoảng tin cậy Wilson trừng phạt các điểm đến có ít đánh giá hoặc đánh giá tập trung bất thường.</p>
                </div>
              </div>
              <div class="m-feature-row">
                <Award :size="20" class="text-amber" />
                <div>
                  <strong>Định tuyến Điểm sáng du lịch khách quan</strong>
                  <p>Chỉ khi cận dưới của khoảng tin cậy 95% đạt từ 0.70 trở lên thì hệ thống mới cấp huy hiệu Điểm sáng và mở quyền nhận voucher.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="monitor-col-formula">
            <div class="trust-shield-card">
              <div class="trust-shield-header">
                <span class="formula-tag">BẢO CHỨNG DU KHÁCH</span>
                <h4 class="trust-title">3 Lớp Bảo Vệ &amp; Minh Bạch Dữ Liệu</h4>
                <p class="trust-sub">Hệ thống áp dụng thuật toán thống kê Wilson Score 95% nhằm giải quyết nỗi lo lớn nhất của du khách: đánh giá bị thổi phồng hoặc đánh giá ảo.</p>
              </div>

              <div class="trust-features-grid">
                <div class="trust-item">
                  <div class="trust-item-icon">
                    <CheckCircle2 :size="18" class="text-emerald" />
                  </div>
                  <div>
                    <strong>100% Đánh giá thực tế từ TripAdvisor</strong>
                    <p>Dữ liệu được thu thập nguyên văn, minh bạch và phân bổ độc lập cho từng điểm đến riêng biệt.</p>
                  </div>
                </div>

                <div class="trust-item">
                  <div class="trust-item-icon">
                    <CheckCircle2 :size="18" class="text-emerald" />
                  </div>
                  <div>
                    <strong>Chống review ảo &amp; dìm hàng đối thủ</strong>
                    <p>Điểm đến có ít lượt đánh giá sẽ không thể đạt điểm tuyệt đối ảo, bảo vệ bạn khỏi cơ sở tự "bơm điểm".</p>
                  </div>
                </div>

                <div class="trust-item">
                  <div class="trust-item-icon">
                    <CheckCircle2 :size="18" class="text-emerald" />
                  </div>
                  <div>
                    <strong>Chỉ tặng voucher cho Điểm Sáng thực thụ</strong>
                    <p>Chỉ cơ sở đạt mức tín nhiệm cao bền vững mới được cấp mã ưu đãi 15%, đảm bảo chất lượng kỳ nghỉ của bạn.</p>
                  </div>
                </div>
              </div>

              <!-- Technical toggle for teachers/analysts -->
              <div class="trust-footer-toggle">
                <button @click="hienThiCongThuc = !hienThiCongThuc" class="btn-toggle-math" type="button">
                  <Calculator :size="14" />
                  <span>{{ hienThiCongThuc ? 'Ẩn công thức toán học' : 'Dành cho Hội đồng chấm điểm: Xem công thức Wilson Score' }}</span>
                  <ChevronUp v-if="hienThiCongThuc" :size="14" />
                  <ChevronDown v-else :size="14" />
                </button>

                <div v-if="hienThiCongThuc" class="clean-math-display anim-fade-in">
                  <div class="math-title-bar">Công thức Cận Dưới Khoảng Tin Cậy Wilson (95% CI):</div>
                  <div class="math-fraction-wrap">
                    <div class="math-formula-box">
                      w = [ p̂ + z²/(2n) - z · √( p̂(1-p̂)/n + z²/(4n²) ) ] / [ 1 + z²/n ]
                    </div>
                  </div>
                  <div class="math-notes">
                    <div>• <strong>p̂</strong>: Tỷ lệ đánh giá tích cực quan sát</div>
                    <div>• <strong>n</strong>: Tổng số đánh giá TripAdvisor hợp lệ</div>
                    <div>• <strong>z = 1.96</strong>: Hệ số phân phối chuẩn tương ứng độ tin cậy 95%</div>
                    <div>• <strong>w ≥ 0.70</strong>: Đạt chuẩn vinh danh "Điểm sáng du lịch"</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section-more-action">
          <router-link to="/absa" class="btn-nevio-dark-cta">
            <span>Xem chi tiết báo cáo chuyên sâu 5 khía cạnh ABSA &amp; mô hình PhoBERT</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 8. TRAVELER TESTIMONIALS (874 TripAdvisor Reviews)      -->
    <!-- ======================================================== -->
    <section class="section section-testimonials bg-light">
      <div class="nevio-container">
        <div class="destinations-header-row">
          <div>
            <span class="nevio-label">ĐÁNH GIÁ CHÂN THỰC TỪ TRIPADVISOR</span>
            <h2 class="heading-style-h2">Tiếng Nói Du Khách Thực Tế</h2>
            <p class="destinations-desc">
              Phản hồi gốc từ du khách trong và ngoài nước kèm trích xuất nhãn khía cạnh ABSA tự động.
            </p>
          </div>
          <router-link to="/danh-sach-danh-gia" class="btn-nevio-dark">
            <span>Xem tất cả 874 đánh giá</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>

        <div class="testimonials-grid">
          <div v-for="rev in danhGiaTieuBieu" :key="rev.id" class="testimonial-card">
            <div class="test-card-top">
              <div class="reviewer-badge-wrap">
                <div class="reviewer-initials-box">
                  {{ rev.nguoi_danh_gia.charAt(0) }}
                </div>
                <div>
                  <h4 class="reviewer-fullname">{{ rev.nguoi_danh_gia }}</h4>
                  <span class="reviewer-country">{{ rev.quoc_gia }} · {{ rev.ngay_dang }}</span>
                </div>
              </div>
              <div class="review-star-rating">
                <Star v-for="s in 5" :key="s" :size="14" :class="['star-icon', { 'fill-yellow': s <= rev.diem_so }]" />
              </div>
            </div>

            <div class="dest-tag-link">
              <MapPin :size="12" />
              <span>{{ rev.ten_diem_den }}</span>
            </div>

            <h5 class="review-card-title">"{{ rev.tieu_de }}"</h5>
            <p class="review-card-body">{{ rev.noi_dung }}</p>

            <div class="aspect-labels-cluster">
              <span 
                v-for="(tag, idx) in rev.khia_canh_tags" 
                :key="idx" 
                :class="['sentiment-chip', 'sent-' + tag.sac_thai]"
              >
                {{ tag.khia_canh }}: {{ tag.chi_tiet }}
              </span>
            </div>
          </div>
        </div>

        <div class="section-more-action">
          <router-link to="/absa" class="btn-nevio-dark-cta">
            <span>Xem chi tiết báo cáo chuyên sâu 5 khía cạnh ABSA &amp; mô hình PhoBERT</span>
            <ArrowRight :size="16" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- Floating Voucher Toast Notification -->
    <div v-if="thongBaoVoucher" class="nevio-toast" role="alert">
      <div class="toast-inner">
        <Ticket :size="22" class="text-emerald" />
        <div>
          <h4>Đã cấp phiếu ưu đãi đối tác!</h4>
          <p>{{ thongBaoVoucher }}</p>
        </div>
      </div>
      <router-link to="/phieu-cua-toi" class="toast-action-link">Xem ví phiếu →</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '../components/Navbar.vue'
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  MessageSquareQuote, 
  Compass, 
  BarChart3, 
  Sparkles, 
  Trees, 
  HeartHandshake, 
  Utensils, 
  DollarSign, 
  Star, 
  Ticket, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Award,
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-vue-next'
import { DataService, DANH_SACH_DIEM_DEN_FALLBACK, KHIA_CANH_ABSA, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const dsDiemDen = ref([])
const danhSachKhiaCanh = ref(KHIA_CANH_ABSA)
const danhGiaTieuBieu = ref([])

const tuKhoaTimKiem = ref('')
const locTinhThanh = ref('')
const locTrangThai = ref('')
const thongBaoVoucher = ref('')
const hienThiCongThuc = ref(false)

function layIconKhiaCanh(id) {
  switch (id) {
    case 1: return Trees
    case 2: return HeartHandshake
    case 3: return Utensils
    case 4: return Sparkles
    default: return DollarSign
  }
}

const diemDenHienThi = computed(() => {
  return dsDiemDen.value.filter(dest => {
    const kw = tuKhoaTimKiem.value.trim().toLowerCase()
    const matchKw = !kw || 
      dest.ten.toLowerCase().includes(kw) || 
      dest.tinh_thanh.toLowerCase().includes(kw) ||
      (dest.mo_ta && dest.mo_ta.toLowerCase().includes(kw))

    const matchTinh = !locTinhThanh.value || dest.tinh_thanh.includes(locTinhThanh.value)
    const matchTrangThai = !locTrangThai.value || dest.trang_thai_wilson === locTrangThai.value

    return matchKw && matchTinh && matchTrangThai
  })
})

const demDiemSang = computed(() => {
  return dsDiemDen.value.filter(d => d.trang_thai_wilson === 'diem_sang').length
})

function locNhanh(tinh) {
  locTinhThanh.value = tinh
  locTrangThai.value = ''
}

function locNhanhTinh(tinh) {
  locTinhThanh.value = tinh
}

function locNhanhTrangThai(tt) {
  locTrangThai.value = tt
}

function datLaiBoLoc() {
  tuKhoaTimKiem.value = ''
  locTinhThanh.value = ''
  locTrangThai.value = ''
}

async function nhanUuDaiNhanh(dest) {
  const phieu = await DataService.nhanUuDai(dest.id)
  thongBaoVoucher.value = `Mã: ${phieu.ma_tham_chieu} cho ${dest.ten}. Hiệu lực trong 15 phút!`
  setTimeout(() => {
    thongBaoVoucher.value = ''
  }, 6000)
}

function xuLyLoiHeroImg(event) {
  event.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80'
}

function xuLyLoiImg(event) {
  event.target.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
}

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
  danhGiaTieuBieu.value = DANH_SACH_DANH_GIA_TRIPADVISOR.slice(0, 6)
})
</script>

<style scoped>
.nevio-dashboard-page {
  display: flex;
  flex-direction: column;
}

/* =================================================== */
/* 1. HERO SECTION                                     */
/* =================================================== */
.section.hero-section {
  position: relative;
  margin: 16px 16px 0 16px;
  border-radius: var(--radius-hero);
  height: calc(100vh - 40px);
  min-height: 640px;
  max-height: 900px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 70px;
}

.hero-image-wrap {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 60%;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.8) 100%);
  z-index: 2;
}

/* Giant Translucent Display Word "Discover" */
.display-wrap {
  position: absolute;
  top: 15%;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 2;
  pointer-events: none;
}

.display.hero {
  font-size: clamp(80px, 16vw, 220px);
  font-weight: 900;
  color: rgba(255, 255, 255, 0.08);
  letter-spacing: -0.04em;
  text-transform: capitalize;
  user-select: none;
  line-height: 1;
}

.hero-content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
}

.hero-text-col {
  max-width: 760px;
}

.nevio-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 0.06em;
  margin-bottom: 20px;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fddd62;
  box-shadow: 0 0 8px #fddd62;
}

.hero-heading {
  font-size: clamp(40px, 5.5vw, 76px);
  font-weight: 900;
  line-height: 1.08;
  color: #ffffff;
  letter-spacing: -0.03em;
  margin-bottom: 20px;
}

.hero-paragraph {
  font-size: 16.5px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.88);
  max-width: 620px;
}

.hero-action-col {
  flex-shrink: 0;
  margin-bottom: 10px;
}

/* Torn Paper Brush Bottom Shape */
.hero-bottom-shape-wrap {
  position: absolute;
  inset: auto 0% -2px;
  width: 100%;
  z-index: 12;
  pointer-events: none;
}

.hero-bottom-shape {
  width: 100%;
  height: auto;
  display: block;
}

/* =================================================== */
/* 2. SEARCH TOOLBAR                                   */
/* =================================================== */
.section-search-toolbar {
  position: relative;
  z-index: 20;
  margin-top: -30px;
  padding: 0 20px 40px 20px;
}

.floating-search-bar {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  padding: 8px 16px;
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 980px;
  margin: 0 auto;
  transition: all 0.25s ease;
}

.search-field {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-field.flex-grow {
  flex: 1;
}

.field-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14.5px;
  color: var(--mau-chu);
  outline: none;
  font-family: inherit;
}

.field-select {
  border: none;
  background: transparent;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--mau-chu);
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.field-select option {
  background: var(--nevio-card-bg);
  color: var(--mau-chu);
}

.bar-divider {
  width: 1px;
  height: 24px;
  background: var(--nevio-border);
}

.btn-clear-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--nevio-light-grey);
  color: var(--mau-chu-phu);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-clear-filter:hover {
  background: #fee2e2;
  color: #dc2626;
}

/* =================================================== */
/* 3. STEP-BY-STEP GUIDE (HOW IT WORKS)                */
/* =================================================== */
.section-guide {
  padding: 70px 0;
  border-top: 1px solid var(--nevio-border);
  border-bottom: 1px solid var(--nevio-border);
}

.guide-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
  max-width: 780px;
  margin: 0 auto 50px auto;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.step-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 30px 24px;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.step-badge {
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 11px;
  font-weight: 800;
  color: var(--nevio-orange);
  background: var(--nevio-orange-light);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.05em;
}

.step-icon-box {
  width: 54px;
  height: 54px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.step-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 10px;
  line-height: 1.3;
}

.step-desc {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--mau-chu-phu);
  margin-bottom: 16px;
  flex: 1;
}

.step-hint {
  font-size: 12px;
  font-weight: 600;
  color: var(--nevio-dark);
  background: var(--nevio-light-grey);
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border-left: 3px solid var(--nevio-orange);
}

[data-theme="dark"] .step-hint {
  color: var(--nevio-yellow);
}

/* =================================================== */
/* 4. ABOUT & STATS SECTION                            */
/* =================================================== */
.section {
  padding: 60px 0;
}

.section-about {
  padding-top: 50px;
}

.about-heading {
  max-width: 880px;
  margin: 0 auto 50px auto;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  line-height: 1.35;
  color: var(--mau-chu);
}

.stats-grid-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.nevio-stat-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  box-shadow: var(--shadow-subtle);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.nevio-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.stat-icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.bg-sky { background: rgba(2, 132, 199, 0.1); }
.text-sky { color: #0284c7; }

.bg-emerald { background: rgba(5, 150, 105, 0.1); }
.text-emerald { color: #059669; }

.bg-amber { background: rgba(217, 119, 6, 0.1); }
.text-amber { color: #d97706; }

.bg-purple { background: rgba(147, 51, 234, 0.1); }
.text-purple { color: #9333ea; }

.stat-main-number {
  font-size: 36px;
  font-weight: 900;
  line-height: 1;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.stat-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 4px;
}

.stat-caption {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
}

/* =================================================== */
/* 5. CURATED DESTINATIONS                             */
/* =================================================== */
.destinations-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 20px;
}

.heading-style-h2 {
  font-size: clamp(28px, 3.5vw, 42px);
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 6px;
  line-height: 1.2;
}

.destinations-desc {
  font-size: 15px;
  color: var(--mau-chu-phu);
  max-width: 600px;
}

.category-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.cat-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu-phu);
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 13.5px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cat-pill:hover, .cat-pill.active {
  background: var(--nevio-dark);
  color: var(--nevio-white);
  border-color: var(--nevio-dark);
}

[data-theme="dark"] .cat-pill:hover, [data-theme="dark"] .cat-pill.active {
  background: var(--nevio-yellow);
  color: var(--nevio-dark);
  border-color: var(--nevio-yellow);
}

.destinations-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}

.nevio-destination-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.nevio-destination-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
}

.dest-image-wrap {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: #2a2a2a;
}

.dest-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.nevio-destination-card:hover .dest-card-img {
  transform: scale(1.06);
}

.card-img-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.65) 100%);
}

.tag-location-pill {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(48, 48, 48, 0.75);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.tag-status-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  color: #ffffff;
}

.status-diem_sang {
  background: #059669;
}

.status-binh_thuong {
  background: #0284c7;
}

.status-canh_bao {
  background: #e11d48;
}

.tag-rating-pill {
  position: absolute;
  bottom: 12px;
  right: 14px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  color: #ffffff;
}

.fill-yellow {
  color: #fddd62;
  fill: #fddd62;
}

.rating-num {
  font-weight: 800;
  font-size: 13.5px;
  color: #fddd62;
}

.rating-count {
  font-size: 11.5px;
  color: #d6d3d1;
}

.dest-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.dest-type-category {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--nevio-orange);
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.dest-card-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 8px;
  line-height: 1.3;
}

.dest-card-title a {
  transition: color 0.2s;
}

.dest-card-title a:hover {
  color: var(--nevio-orange);
}

.dest-card-summary {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.aspect-micro-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.micro-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  font-size: 11.5px;
  font-weight: 600;
  color: var(--mau-chu-phu);
}

.dest-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid var(--nevio-border);
  margin-top: auto;
}

.link-detail-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--nevio-dark);
  transition: transform 0.2s;
}

[data-theme="dark"] .link-detail-action {
  color: var(--nevio-yellow);
}

.link-detail-action:hover {
  transform: translateX(4px);
}

.btn-claim-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #059669;
  color: #ffffff;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 12.5px;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(5, 150, 105, 0.3);
  transition: all 0.2s;
}

.btn-claim-pill:hover {
  background: #047857;
  transform: translateY(-1px);
}

.locked-voucher-text {
  font-size: 12px;
  color: var(--mau-chu-mo);
  font-weight: 500;
}

/* =================================================== */
/* 6. ABSA 5-ASPECT DEEP DIVE                          */
/* =================================================== */
.section-absa {
  border-top: 1px solid var(--nevio-border);
  border-bottom: 1px solid var(--nevio-border);
}

.bg-light {
  background: var(--nevio-light-grey);
}

.absa-subheading {
  font-size: 15px;
  color: var(--mau-chu-phu);
  max-width: 680px;
  margin: 0 auto;
}

.absa-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.absa-analysis-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 22px;
  box-shadow: var(--shadow-subtle);
}

.absa-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.absa-title-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-icon-svg {
  color: var(--nevio-orange);
}

.absa-aspect-name {
  font-size: 15.5px;
  font-weight: 800;
  color: var(--mau-chu);
}

.absa-aspect-count {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.absa-aspect-rating {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: baseline;
}

.rate-val {
  font-size: 17px;
  font-weight: 800;
  color: var(--mau-chu);
}

.rate-max {
  font-size: 11px;
  color: var(--mau-chu-mo);
}

.sentiment-bar-track {
  display: flex;
  height: 9px;
  border-radius: var(--radius-full);
  overflow: hidden;
  background: #e7e5e4;
  margin-bottom: 10px;
}

.seg-positive { background: #059669; }
.seg-neutral { background: #a8a29e; }
.seg-negative { background: #e11d48; }

.sentiment-legend-row {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 600;
}

.text-positive { color: #059669; }
.text-neutral { color: #78716c; }
.text-negative { color: #e11d48; }

/* =================================================== */
/* 7. CRISIS MONITOR & WILSON                          */
/* =================================================== */
.monitor-split-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 40px;
  box-shadow: var(--shadow-card);
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 40px;
  align-items: center;
}

.safe-indicator-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #059669;
  font-size: 11.5px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.status-pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #059669;
}

.monitor-heading {
  font-size: 26px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 14px;
  line-height: 1.3;
}

.monitor-paragraph {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
}

.monitor-features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.m-feature-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.m-feature-row strong {
  font-size: 14px;
  color: var(--mau-chu);
}

.m-feature-row p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  margin: 2px 0 0 0;
}

.trust-shield-card {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.trust-title {
  font-size: 18px;
  font-weight: 800;
  color: var(--mau-chu);
  margin: 4px 0 6px 0;
}

.trust-sub {
  font-size: 13px;
  color: var(--mau-chu-phu);
  line-height: 1.5;
}

.trust-features-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.trust-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  padding: 12px 14px;
  border-radius: var(--radius-md);
}

.trust-item strong {
  font-size: 13.5px;
  color: var(--mau-chu);
  display: block;
  margin-bottom: 2px;
}

.trust-item p {
  font-size: 12px;
  color: var(--mau-chu-phu);
  line-height: 1.4;
  margin: 0;
}

.btn-toggle-math {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: 1px dashed var(--nevio-border);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  font-size: 12px;
  font-weight: 600;
  color: var(--mau-chu);
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;
  justify-content: center;
}

.btn-toggle-math:hover {
  background: rgba(0, 0, 0, 0.04);
}

.clean-math-display {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-top: 10px;
}

.math-title-bar {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--nevio-orange);
  text-transform: uppercase;
  margin-bottom: 8px;
}

.math-formula-box {
  background: var(--nevio-light-grey);
  padding: 10px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 12px;
  font-weight: 700;
  color: var(--mau-chu);
  text-align: center;
  word-break: break-all;
  border: 1px solid var(--nevio-border);
  margin-bottom: 10px;
}

.math-notes {
  font-size: 11.5px;
  color: var(--mau-chu-phu);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.formula-tag {
  font-size: 11px;
  font-weight: 800;
  color: var(--nevio-orange);
  letter-spacing: 0.05em;
  display: block;
  margin-bottom: 4px;
}

/* =================================================== */
/* 8. TESTIMONIALS                                     */
/* =================================================== */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  margin-top: 36px;
}

.testimonial-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease;
}

.testimonial-card:hover {
  transform: translateY(-4px);
}

.test-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.reviewer-badge-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.reviewer-initials-box {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--nevio-dark);
  color: var(--nevio-yellow);
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.reviewer-fullname {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
}

.reviewer-country {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.review-star-rating {
  display: flex;
  gap: 2px;
}

.star-icon {
  color: #d6d3d1;
}

.dest-tag-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 8px;
}

.review-card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.review-card-body {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 16px;
  flex: 1;
}

.aspect-labels-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sentiment-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
}

.sent-tich_cuc { background: #ecfdf5; color: #047857; }
.sent-trung_tinh { background: #f5f5f4; color: #57534e; }
.sent-tieu_cuc { background: #fff1f2; color: #be123c; }

/* Toast */
.nevio-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: var(--nevio-card-bg);
  border: 1px solid #059669;
  border-radius: var(--radius-md);
  padding: 16px 20px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  gap: 16px;
  animation: slide-toast 0.3s ease;
}

@keyframes slide-toast {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.toast-inner {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-inner h4 {
  font-size: 13.5px;
  font-weight: 800;
  color: #059669;
}

.toast-inner p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
}

.toast-action-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--nevio-dark);
  text-decoration: underline;
  white-space: nowrap;
}

.empty-state-card {
  text-align: center;
  padding: 60px 20px;
  background: var(--nevio-card-bg);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--nevio-border);
}

.btn-reset-dark {
  background: var(--nevio-dark);
  color: var(--nevio-white);
  padding: 8px 18px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 600;
  margin-top: 14px;
}

.section-more-action {
  display: flex;
  justify-content: center;
  margin-top: 36px;
}

.btn-nevio-dark-cta {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--nevio-dark);
  color: #ffffff !important;
  padding: 14px 28px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
}

.btn-nevio-dark-cta:hover {
  background: #000000;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  color: #fddd62 !important;
}

[data-theme="dark"] .btn-nevio-dark-cta {
  background: #fddd62;
  color: #303030 !important;
}

[data-theme="dark"] .btn-nevio-dark-cta:hover {
  background: #fcd34d;
  color: #000000 !important;
}

@media (max-width: 1024px) {
  .hero-content-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .steps-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .stats-grid-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  .monitor-split-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .section.hero-section {
    margin: 8px 8px 0 8px;
    height: auto;
    min-height: 580px;
    padding-bottom: 50px;
  }
  .floating-search-bar {
    flex-direction: column;
    border-radius: 20px;
  }
  .bar-divider {
    display: none;
  }
  .steps-grid {
    grid-template-columns: 1fr;
  }
  .stats-grid-wrapper {
    grid-template-columns: 1fr;
  }
  .destinations-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
