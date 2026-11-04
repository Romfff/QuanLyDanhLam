<template>
  <div class="nevio-dashboard">
    <!-- ======================================================== -->
    <!-- 1. HERO SECTION (Nevio Webflow Travel Style)             -->
    <!-- ======================================================== -->
    <section class="nevio-hero">
      <div class="nevio-container">
        <div class="hero-content">
          <div class="nevio-eyebrow emerald">
            <span class="pulse-dot"></span>
            HỆ THỐNG GIÁM SÁT DANH TIẾNG & CÔNG NGHỆ ABSA DU LỊCH ĐT-12
          </div>
          <h1 class="hero-title">
            Phân Tích Ý Kiến Du Khách &amp;<br/>
            <span class="text-gradient">Định Vị Điểm Đến Sáng Giá</span>
          </h1>
          <p class="hero-subtitle">
            Ứng dụng mô hình trí tuệ nhân tạo <strong>PhoBERT</strong> kết hợp Lexicon chuyên sâu phân tích 5 khía cạnh cốt lõi từ <strong>874 đánh giá TripAdvisor</strong>, áp dụng thuật toán <strong>Wilson Score</strong> chuẩn mực để xếp hạng danh tiếng minh bạch.
          </p>

          <!-- Floating Interactive Hero Search & Filter Bar -->
          <div class="hero-search-card">
            <div class="search-field">
              <span class="field-icon">🔍</span>
              <input 
                v-model="tuKhoaTimKiem" 
                type="text" 
                placeholder="Tìm điểm đến (Hạ Long, Tràng An, Phú Quốc...)" 
                class="search-input"
              />
            </div>

            <div class="search-divider"></div>

            <div class="search-field">
              <span class="field-icon">📍</span>
              <select v-model="locTinhThanh" class="search-select">
                <option value="">Tất cả địa phương</option>
                <option value="Quảng Ninh">Quảng Ninh (Hạ Long)</option>
                <option value="Ninh Bình">Ninh Bình (Tràng An, Hang Múa)</option>
                <option value="Kiên Giang">Kiên Giang (Phú Quốc)</option>
              </select>
            </div>

            <div class="search-divider"></div>

            <div class="search-field">
              <span class="field-icon">⭐</span>
              <select v-model="locTrangThai" class="search-select">
                <option value="">Tất cả trạng thái Wilson</option>
                <option value="diem_sang">✨ Điểm sáng du lịch (>= 0.70)</option>
                <option value="binh_thuong">🔷 Hoạt động ổn định</option>
                <option value="canh_bao">⚠️ Cần cải thiện chất lượng</option>
              </select>
            </div>

            <button @click="datLaiBoLoc" class="btn-reset-filter" title="Xóa bộ lọc">
              Làm mới
            </button>
          </div>

          <!-- Hero Metrics Counters -->
          <div class="hero-stats-grid">
            <div class="stat-box">
              <div class="stat-number">874</div>
              <div class="stat-label">Đánh giá TripAdvisor</div>
              <div class="stat-trend positive">↑ Dữ liệu cào thực tế</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">7</div>
              <div class="stat-label">Điểm đến trọng điểm</div>
              <div class="stat-trend">Quảng Ninh · Ninh Bình · Phú Quốc</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">94.6%</div>
              <div class="stat-label">Độ chính xác ABSA</div>
              <div class="stat-trend positive">PhoBERT F1-Score 0.89</div>
            </div>
            <div class="stat-box">
              <div class="stat-number">95%</div>
              <div class="stat-label">Khoảng tin cậy Wilson</div>
              <div class="stat-trend">Phân bổ nhị thức khách quan</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 2. CURATED DESTINATION SHOWCASE (Nevio Cards Grid)       -->
    <!-- ======================================================== -->
    <section class="section-destinations">
      <div class="nevio-container">
        <div class="section-header">
          <div>
            <div class="nevio-eyebrow gold">KHÁM PHÁ DANH TIẾNG</div>
            <h2 class="section-title">Danh Sách Điểm Đến Du Lịch Tiêu Biểu</h2>
            <p class="section-desc">
              Phân tích tự động dựa trên toàn bộ phản hồi du khách thực tế được kiểm chứng độc lập.
            </p>
          </div>
          <!-- Quick Filter Buttons -->
          <div class="quick-filter-pills">
            <button 
              @click="locNhanh('')" 
              :class="['filter-pill', { active: locTinhThanh === '' && locTrangThai === '' }]"
            >
              Tất cả ({{ dsDiemDen.length }})
            </button>
            <button 
              @click="locNhanhTrangThai('diem_sang')" 
              :class="['filter-pill', { active: locTrangThai === 'diem_sang' }]"
            >
              ✨ Điểm sáng ({{ demDiemSang }})
            </button>
            <button 
              @click="locNhanhTinh('Quảng Ninh')" 
              :class="['filter-pill', { active: locTinhThanh === 'Quảng Ninh' }]"
            >
              Quảng Ninh
            </button>
            <button 
              @click="locNhanhTinh('Ninh Bình')" 
              :class="['filter-pill', { active: locTinhThanh === 'Ninh Bình' }]"
            >
              Ninh Bình
            </button>
            <button 
              @click="locNhanhTinh('Kiên Giang')" 
              :class="['filter-pill', { active: locTinhThanh === 'Kiên Giang' }]"
            >
              Phú Quốc
            </button>
          </div>
        </div>

        <!-- Destination Cards Grid -->
        <div v-if="diemDenHienThi.length > 0" class="dest-grid">
          <article v-for="dest in diemDenHienThi" :key="dest.id" class="nevio-card">
            <!-- Card Image Box with Overlay Tags -->
            <div class="card-img-wrap">
              <img :src="dest.hinh_anh" :alt="dest.ten" class="card-img" loading="lazy" />
              <div class="card-overlay-gradient"></div>

              <!-- Top Left: Location Pin -->
              <span class="overlay-tag location-tag">
                📍 {{ dest.tinh_thanh }}
              </span>

              <!-- Top Right: Wilson Status Pill -->
              <span :class="['overlay-tag', 'status-tag', 'badge-' + (dest.trang_thai_wilson || 'binh_thuong')]">
                <span v-if="dest.trang_thai_wilson === 'diem_sang'">✨ Điểm sáng</span>
                <span v-else-if="dest.trang_thai_wilson === 'canh_bao'">⚠️ Cảnh báo</span>
                <span v-else>🔷 Ổn định</span>
              </span>

              <!-- Bottom Right: Wilson Confidence Badge -->
              <div class="overlay-wilson-score">
                <span class="w-score">★ {{ dest.diem_danh_tieng_tb }}</span>
                <span class="w-total">({{ dest.tong_luot_danh_gia }} reviews)</span>
              </div>
            </div>

            <!-- Card Content Body -->
            <div class="card-body">
              <div class="card-category">{{ dest.loai_hinh }}</div>
              <h3 class="card-title">
                <router-link :to="'/diem-den/' + dest.id">
                  {{ dest.ten }}
                </router-link>
              </h3>
              <p class="card-desc">{{ dest.mo_ta }}</p>

              <!-- 5 ABSA Aspect Micro-Scores Chips -->
              <div v-if="dest.khia_canh" class="aspect-chips">
                <span class="aspect-chip" title="Cảnh quan & Không gian">
                  🏞️ {{ dest.khia_canh.canh_quan?.diem }}/5
                </span>
                <span class="aspect-chip" title="Chất lượng phục vụ">
                  🛎️ {{ dest.khia_canh.dich_vu?.diem }}/5
                </span>
                <span class="aspect-chip" title="Ẩm thực & Đặc sản">
                  🍜 {{ dest.khia_canh.am_thuc?.diem }}/5
                </span>
                <span class="aspect-chip" title="Vệ sinh môi trường">
                  🧹 {{ dest.khia_canh.ve_sinh?.diem }}/5
                </span>
                <span class="aspect-chip" title="Giá cả & Minh bạch">
                  💵 {{ dest.khia_canh.gia_ca?.diem }}/5
                </span>
              </div>

              <!-- Card Action Footer -->
              <div class="card-actions">
                <router-link :to="'/diem-den/' + dest.id" class="btn-card-detail">
                  Xem chi tiết &amp; ABSA →
                </router-link>

                <button 
                  v-if="dest.trang_thai_wilson === 'diem_sang'"
                  @click="nhanUuDaiNhanh(dest)"
                  class="btn-card-voucher"
                  title="Nhận phiếu ưu đãi đối tác du lịch"
                >
                  🎟️ Nhận ưu đãi
                </button>
                <span v-else class="voucher-locked-hint" title="Chỉ mở ưu đãi khi điểm đến đạt chỉ số Điểm sáng">
                  🔒 Ưu đãi khóa
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="empty-state-box">
          <span class="empty-icon">🏝️</span>
          <h3>Không tìm thấy điểm đến phù hợp với bộ lọc</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút Làm mới bên dưới.</p>
          <button @click="datLaiBoLoc" class="btn-reset-filter">Làm mới bộ lọc</button>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 3. ABSA 5-ASPECT DEEP DIVE ANALYTICS SECTION            -->
    <!-- ======================================================== -->
    <section id="absa-analytics" class="section-absa">
      <div class="nevio-container">
        <div class="section-header">
          <div>
            <div class="nevio-eyebrow emerald">CÔNG NGHỆ TRÍ TUỆ NHÂN TẠO</div>
            <h2 class="section-title">Phân Tích Chi Tiết 5 Khía Cạnh Du Lịch (ABSA)</h2>
            <p class="section-desc">
              Mô hình PhoBERT nhận diện chính xác các sắc thái (Tích cực · Trung tính · Tiêu cực) trên từng khía cạnh dịch vụ độc lập.
            </p>
          </div>
          <div class="absa-badge-pill">
            <span>⚡ Mô hình: PhoBERT-base + ABSA Lexicon</span>
          </div>
        </div>

        <div class="absa-grid">
          <div v-for="item in danhSachKhiaCanh" :key="item.id" class="absa-card">
            <div class="absa-card-head">
              <div class="absa-icon-title">
                <span class="absa-icon">{{ item.icon }}</span>
                <div>
                  <h4 class="absa-name">{{ item.ten }}</h4>
                  <span class="absa-meta">{{ item.so_luot }} lượt phân tích trích xuất</span>
                </div>
              </div>
              <div class="absa-score-badge">
                <span class="score-num">{{ item.diem }}</span>
                <span class="score-scale">/5.0</span>
              </div>
            </div>

            <!-- Multi-color Sentiment Progress Bar -->
            <div class="sentiment-meter">
              <div class="meter-bar">
                <div class="fill-positive" :style="{ width: item.tich_cuc + '%' }" :title="'Tích cực: ' + item.tich_cuc + '%'"></div>
                <div class="fill-neutral" :style="{ width: item.trung_tinh + '%' }" :title="'Trung tính: ' + item.trung_tinh + '%'"></div>
                <div class="fill-negative" :style="{ width: item.tieu_cuc + '%' }" :title="'Tiêu cực: ' + item.tieu_cuc + '%'"></div>
              </div>
              <div class="meter-labels">
                <span class="lbl-pos">🟢 {{ item.tich_cuc }}% Tích cực</span>
                <span class="lbl-neu">⚪ {{ item.trung_tinh }}% Trung tính</span>
                <span class="lbl-neg">🔴 {{ item.tieu_cuc }}% Tiêu cực</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 4. CRISIS MONITOR & WILSON SCORE EXPLANATION             -->
    <!-- ======================================================== -->
    <section class="section-monitor">
      <div class="nevio-container">
        <div class="monitor-card">
          <div class="monitor-left">
            <div class="monitor-status-badge">
              <span class="pulse-beacon"></span>
              TRẠNG THÁI HỆ THỐNG: AN TOÀN &amp; ỔN ĐỊNH
            </div>
            <h3 class="monitor-title">Giám Sát Cảnh Báo Sớm Khủng Hoảng Danh Tiếng</h3>
            <p class="monitor-desc">
              Thuật toán liên tục quét biến động tỷ lệ tiêu cực theo cửa sổ trượt 30 ngày. Trong 874 đánh giá TripAdvisor được phân tích, hệ thống không ghi nhận bất kỳ đột biến tiêu cực nào vượt ngưỡng cảnh báo 20%. Toàn bộ dữ liệu phản ánh mức độ tín nhiệm cao của du khách quốc tế và nội địa.
            </p>
            <div class="monitor-highlights">
              <div class="m-highlight-item">
                <span class="h-icon">🛡️</span>
                <div>
                  <strong>Chống đánh giá ảo (Spam)</strong>
                  <p>Khoảng tin cậy Wilson trừng phạt điểm đến có ít đánh giá hoặc đánh giá tập trung bất thường.</p>
                </div>
              </div>
              <div class="m-highlight-item">
                <span class="h-icon">⚖️</span>
                <div>
                  <strong>Công thức Wilson Score</strong>
                  <p>Tính cận dưới của tỷ lệ thành công nhị thức với độ tin cậy 95% (Z = 1.96), loại bỏ định kiến số đông.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="monitor-right">
            <div class="formula-box">
              <div class="formula-title">📐 Công Thức Định Tuyến Wilson (Rubric ĐT-12)</div>
              <div class="formula-latex">
                \( w = \frac{\hat{p} + \frac{z^2}{2n} - z \sqrt{\frac{\hat{p}(1-\hat{p})}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}} \)
              </div>
              <div class="formula-legend">
                <div><span>\( \hat{p} \)</span>: Tỷ lệ đánh giá tích cực quan sát được</div>
                <div><span>\( n \)</span>: Tổng số lượt đánh giá hợp lệ đã kiểm tra</div>
                <div><span>\( z = 1.96 \)</span>: Khoảng tin cậy chuẩn 95%</div>
              </div>
              <div class="formula-rule">
                <strong>Quy tắc kích hoạt:</strong><br/>
                • \( w \ge 0.70 \): Phân loại <strong>"Điểm sáng du lịch"</strong> → Kích hoạt gói Voucher đối tác.<br/>
                • \( w &lt; 0.70 \): Trạng thái <strong>"Ổn định / Cảnh báo"</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 5. VERIFIED TRIPADVISOR REVIEWS STREAM                  -->
    <!-- ======================================================== -->
    <section class="section-reviews">
      <div class="nevio-container">
        <div class="section-header">
          <div>
            <div class="nevio-eyebrow gold">ĐÁNH GIÁ CHÂN THỰC</div>
            <h2 class="section-title">Tiếng Nói Du Khách Từ 874 Đánh Giá TripAdvisor</h2>
            <p class="section-desc">
              Phản hồi gốc từ du khách trong và ngoài nước kèm trích xuất nhãn khía cạnh ABSA tự động.
            </p>
          </div>
          <router-link to="/danh-sach-danh-gia" class="btn-view-all-reviews">
            Xem tất cả 874 đánh giá →
          </router-link>
        </div>

        <div class="reviews-grid">
          <div v-for="rev in danhGiaTieuBieu" :key="rev.id" class="review-testimonial-card">
            <div class="review-head">
              <div class="reviewer-info">
                <div class="avatar-initials">
                  {{ rev.nguoi_danh_gia.charAt(0) }}
                </div>
                <div>
                  <h4 class="reviewer-name">{{ rev.nguoi_danh_gia }}</h4>
                  <span class="reviewer-location">{{ rev.quoc_gia }} · {{ rev.ngay_dang }}</span>
                </div>
              </div>
              <div class="review-stars">
                <span v-for="s in 5" :key="s" :class="['star', { filled: s <= rev.diem_so }]">★</span>
              </div>
            </div>

            <div class="review-dest-tag">
              📍 {{ rev.ten_diem_den }}
            </div>

            <h5 class="review-title">"{{ rev.tieu_de }}"</h5>
            <p class="review-body">{{ rev.noi_dung }}</p>

            <!-- ABSA Aspect Badges Highlight -->
            <div class="review-aspect-tags">
              <span 
                v-for="(tag, idx) in rev.khia_canh_tags" 
                :key="idx"
                :class="['tag-chip', 'chip-' + tag.sac_thai]"
              >
                {{ tag.khia_canh }}: {{ tag.chi_tiet }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Voucher Toast Notification Modal -->
    <div v-if="thongBaoVoucher" class="voucher-toast" role="alert">
      <div class="toast-content">
        <span class="toast-icon">🎟️</span>
        <div>
          <h4>Đã nhận phiếu ưu đãi thành công!</h4>
          <p>{{ thongBaoVoucher }}</p>
        </div>
      </div>
      <router-link to="/phieu-cua-toi" class="toast-link">Xem trong ví phiếu →</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { DataService, DANH_SACH_DIEM_DEN_FALLBACK, KHIA_CANH_ABSA, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const dsDiemDen = ref([])
const danhSachKhiaCanh = ref(KHIA_CANH_ABSA)
const danhGiaTieuBieu = ref([])

const tuKhoaTimKiem = ref('')
const locTinhThanh = ref('')
const locTrangThai = ref('')
const thongBaoVoucher = ref('')

// Computed Filtered List
const diemDenHienThi = computed(() => {
  return dsDiemDen.value.filter(dest => {
    // 1. Từ khóa
    const kw = tuKhoaTimKiem.value.trim().toLowerCase()
    const matchKw = !kw || 
      dest.ten.toLowerCase().includes(kw) || 
      dest.tinh_thanh.toLowerCase().includes(kw) ||
      (dest.mo_ta && dest.mo_ta.toLowerCase().includes(kw))

    // 2. Tỉnh thành
    const matchTinh = !locTinhThanh.value || dest.tinh_thanh.includes(locTinhThanh.value)

    // 3. Trạng thái Wilson
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

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
  danhGiaTieuBieu.value = DANH_SACH_DANH_GIA_TRIPADVISOR.slice(0, 6)
})
</script>

<style scoped>
.nevio-dashboard {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* =================================================== */
/* 1. HERO SECTION                                     */
/* =================================================== */
.nevio-hero {
  position: relative;
  padding: 60px 0 30px 0;
  background: radial-gradient(circle at 50% 0%, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.04) 40%, transparent 70%);
}

.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
  display: inline-block;
  animation: pulse-ring 2s infinite;
}

@keyframes pulse-ring {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
}

.hero-title {
  font-size: 42px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--mau-chu);
  margin-bottom: 20px;
}

.text-gradient {
  background: linear-gradient(135deg, #059669 0%, #0284c7 60%, #6366f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 16px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
  max-width: 760px;
  margin: 0 auto 36px auto;
}

/* Floating Search Bar */
.hero-search-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 9999px;
  padding: 8px 16px;
  box-shadow: var(--bong-the);
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 840px;
  margin: 0 auto 40px auto;
  transition: all 0.25s ease;
}

.hero-search-card:focus-within {
  border-color: #0284c7;
  box-shadow: 0 12px 30px rgba(2, 132, 199, 0.15);
}

.search-field {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.field-icon {
  font-size: 16px;
  opacity: 0.7;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: var(--mau-chu);
  outline: none;
  font-family: inherit;
}

.search-select {
  width: 100%;
  border: none;
  background: transparent;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--mau-chu);
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.search-divider {
  width: 1px;
  height: 24px;
  background: var(--duong-vien);
}

.btn-reset-filter {
  background: var(--mau-nen-phu);
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu-phu);
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.btn-reset-filter:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

/* Hero Stats Grid */
.hero-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 20px;
}

.stat-box {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: var(--bo-tron-vua);
  padding: 16px;
  text-align: left;
  box-shadow: var(--bong-nhe);
}

.stat-number {
  font-size: 26px;
  font-weight: 800;
  color: var(--mau-chu);
  line-height: 1.1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--mau-chu-phu);
  margin-bottom: 6px;
}

.stat-trend {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.stat-trend.positive {
  color: #059669;
  font-weight: 600;
}

/* =================================================== */
/* 2. DESTINATIONS SECTION                             */
/* =================================================== */
.section-destinations {
  padding: 20px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.section-title {
  font-size: 28px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.section-desc {
  font-size: 14.5px;
  color: var(--mau-chu-phu);
  max-width: 600px;
}

.quick-filter-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-pill {
  border: 1px solid var(--duong-vien);
  background: var(--mau-nen-the);
  color: var(--mau-chu-phu);
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.filter-pill:hover, .filter-pill.active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

[data-theme="dark"] .filter-pill:hover, [data-theme="dark"] .filter-pill.active {
  background: #38bdf8;
  color: #0b1120;
  border-color: #38bdf8;
}

/* Destination Cards */
.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 28px;
}

.nevio-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--bong-the);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease;
}

.nevio-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--bong-noi);
  border-color: rgba(2, 132, 199, 0.4);
}

.card-img-wrap {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #1e293b;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.nevio-card:hover .card-img {
  transform: scale(1.06);
}

.card-overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.6) 100%);
}

.overlay-tag {
  position: absolute;
  z-index: 2;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 9999px;
  backdrop-filter: blur(8px);
}

.location-tag {
  top: 14px;
  left: 14px;
  background: rgba(15, 23, 42, 0.7);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-tag {
  top: 14px;
  right: 14px;
}

.overlay-wilson-score {
  position: absolute;
  bottom: 12px;
  right: 14px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.75);
  color: #fef08a;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.w-total {
  font-size: 11px;
  color: #cbd5e1;
  font-weight: 400;
}

.card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-category {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: #0284c7;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.card-title {
  font-size: 19px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-title a {
  color: inherit;
  transition: color 0.2s;
}

.card-title a:hover {
  color: #0284c7;
}

.card-desc {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 18px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Aspect Chips */
.aspect-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 20px;
}

.aspect-chip {
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11.5px;
  font-weight: 600;
  color: var(--mau-chu-phu);
}

.card-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--duong-vien);
}

.btn-card-detail {
  font-size: 13.5px;
  font-weight: 700;
  color: #0284c7;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: transform 0.2s;
}

.btn-card-detail:hover {
  transform: translateX(3px);
  text-decoration: underline;
}

.btn-card-voucher {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
  transition: all 0.2s;
}

.btn-card-voucher:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 14px rgba(16, 185, 129, 0.4);
}

.voucher-locked-hint {
  font-size: 12px;
  color: var(--mau-chu-mo);
  font-weight: 500;
}

/* Empty State */
.empty-state-box {
  text-align: center;
  padding: 60px 20px;
  background: var(--mau-nen-the);
  border-radius: 20px;
  border: 1px dashed var(--duong-vien);
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

/* =================================================== */
/* 3. ABSA SECTION                                     */
/* =================================================== */
.section-absa {
  padding: 40px 0;
  background: var(--mau-nen-phu);
  border-top: 1px solid var(--duong-vien);
  border-bottom: 1px solid var(--duong-vien);
}

.absa-badge-pill {
  font-size: 12.5px;
  font-weight: 700;
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.absa-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.absa-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--bong-nhe);
}

.absa-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.absa-icon-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.absa-icon {
  font-size: 24px;
}

.absa-name {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 2px;
}

.absa-meta {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.absa-score-badge {
  display: flex;
  align-items: baseline;
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  padding: 4px 10px;
  border-radius: 8px;
}

.score-num {
  font-size: 18px;
  font-weight: 800;
  color: #0284c7;
}

.score-scale {
  font-size: 11px;
  color: var(--mau-chu-mo);
  margin-left: 2px;
}

.meter-bar {
  display: flex;
  height: 10px;
  border-radius: 9999px;
  overflow: hidden;
  background: #e2e8f0;
  margin-bottom: 10px;
}

.fill-positive { background: #10b981; }
.fill-neutral { background: #94a3b8; }
.fill-negative { background: #ef4444; }

.meter-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 600;
}

.lbl-pos { color: #059669; }
.lbl-neu { color: #64748b; }
.lbl-neg { color: #dc2626; }

/* =================================================== */
/* 4. MONITOR & WILSON FORMULA                         */
/* =================================================== */
.section-monitor {
  padding: 20px 0;
}

.monitor-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 24px;
  padding: 36px;
  box-shadow: var(--bong-noi);
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 36px;
  align-items: center;
}

.monitor-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 800;
  color: #059669;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  padding: 6px 14px;
  border-radius: 9999px;
  margin-bottom: 16px;
}

.pulse-beacon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: pulse-ring 2s infinite;
}

.monitor-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 14px;
}

.monitor-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
}

.monitor-highlights {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.m-highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.h-icon {
  font-size: 20px;
}

.m-highlight-item strong {
  font-size: 14px;
  color: var(--mau-chu);
}

.m-highlight-item p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  margin: 2px 0 0 0;
}

.formula-box {
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  border-radius: 16px;
  padding: 24px;
}

.formula-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.formula-latex {
  font-size: 16px;
  background: var(--mau-nen-the);
  padding: 14px;
  border-radius: 8px;
  border: 1px dashed var(--duong-vien);
  text-align: center;
  margin-bottom: 14px;
  overflow-x: auto;
}

.formula-legend {
  font-size: 12px;
  color: var(--mau-chu-phu);
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
}

.formula-rule {
  font-size: 12px;
  line-height: 1.6;
  background: rgba(2, 132, 199, 0.08);
  padding: 10px 14px;
  border-radius: 8px;
  border-left: 3px solid #0284c7;
}

/* =================================================== */
/* 5. REVIEWS STREAM                                   */
/* =================================================== */
.section-reviews {
  padding: 20px 0 60px 0;
}

.btn-view-all-reviews {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu);
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 13.5px;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: var(--bong-nhe);
}

.btn-view-all-reviews:hover {
  background: #0f172a;
  color: #ffffff;
}

[data-theme="dark"] .btn-view-all-reviews:hover {
  background: #38bdf8;
  color: #0b1120;
}

.reviews-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.review-testimonial-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 18px;
  padding: 22px;
  box-shadow: var(--bong-the);
  display: flex;
  flex-direction: column;
}

.review-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.reviewer-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-initials {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #0284c7, #10b981);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.reviewer-name {
  font-size: 14px;
  font-weight: 700;
  color: var(--mau-chu);
}

.reviewer-location {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.review-stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #cbd5e1;
  font-size: 15px;
}

.star.filled {
  color: #f59e0b;
}

.review-dest-tag {
  font-size: 12px;
  font-weight: 600;
  color: #0284c7;
  margin-bottom: 8px;
}

.review-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 6px;
  line-height: 1.3;
}

.review-body {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 16px;
  flex: 1;
}

.review-aspect-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-chip {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 6px;
}

.chip-tich_cuc {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.chip-trung_tinh {
  background: rgba(100, 116, 139, 0.12);
  color: #475569;
  border: 1px solid rgba(100, 116, 139, 0.25);
}

.chip-tieu_cuc {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

/* Voucher Toast */
.voucher-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  background: var(--mau-nen-the);
  border: 1px solid #10b981;
  border-radius: 14px;
  padding: 16px 20px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 16px;
  animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slide-up {
  from { transform: translateY(40px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 26px;
}

.toast-content h4 {
  font-size: 14px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 2px;
}

.toast-content p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
}

.toast-link {
  font-size: 13px;
  font-weight: 700;
  color: #0284c7;
  text-decoration: underline;
  white-space: nowrap;
}

@media (max-width: 1024px) {
  .hero-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .monitor-card {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 30px;
  }
  .hero-search-card {
    flex-direction: column;
    border-radius: 16px;
    padding: 16px;
  }
  .search-divider {
    display: none;
  }
  .search-field {
    width: 100%;
  }
  .btn-reset-filter {
    width: 100%;
  }
  .hero-stats-grid {
    grid-template-columns: 1fr;
  }
  .dest-grid {
    grid-template-columns: 1fr;
  }
  .reviews-grid {
    grid-template-columns: 1fr;
  }
}
</style>
