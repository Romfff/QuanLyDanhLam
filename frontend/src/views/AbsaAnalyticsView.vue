<template>
  <div class="nevio-absa-page anim-fade-in">
    <div class="nevio-container">
      <!-- 1. Page Header -->
      <div class="page-header">
        <div class="nevio-eyebrow-pill">
          <span class="eyebrow-dot"></span>
          CÔNG NGHỆ BÓC TÁCH Ý KIẾN BẰNG PHOBERT AI &amp; WILSON SCORE
        </div>
        <h1 class="page-title">Báo Cáo Phân Tích 5 Khía Cạnh ABSA</h1>
        <p class="page-subtitle">
          Khảo sát sâu sắc 874 đánh giá TripAdvisor qua 5 trụ cột chất lượng du lịch: Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh và Giá cả. Thuật toán tự động phát hiện sớm điểm nghẽn trải nghiệm của du khách.
        </p>
      </div>

      <!-- 2. The 5 Core Aspects KPI Row -->
      <div class="aspect-kpi-grid">
        <div 
          v-for="kc in danhSachKhiaCanh" 
          :key="kc.id" 
          :class="['aspect-kpi-card', { 'active-card': khiaCanhDangChon === kc.ten }]"
          @click="khiaCanhDangChon = kc.ten"
        >
          <div class="kpi-top">
            <span class="aspect-icon-badge">
              <component :is="layIconKhiaCanh(kc.id)" :size="20" class="text-charcoal" />
            </span>
            <span class="kpi-score">{{ kc.diem }}/5.0</span>
          </div>

          <h3 class="kpi-title">{{ kc.ten }}</h3>

          <div class="sentiment-bar-multi">
            <div class="bar-seg pos" :style="{ width: kc.tich_cuc + '%' }" :title="'Tích cực: ' + kc.tich_cuc + '%'"></div>
            <div class="bar-seg neu" :style="{ width: kc.trung_tinh + '%' }" :title="'Trung tính: ' + kc.trung_tinh + '%'"></div>
            <div class="bar-seg neg" :style="{ width: kc.tieu_cuc + '%' }" :title="'Tiêu cực: ' + kc.tieu_cuc + '%'"></div>
          </div>

          <div class="kpi-meta">
            <span class="text-emerald">● {{ kc.tich_cuc }}% Khen ngợi</span>
            <span class="text-muted">{{ kc.so_luot }} lượt nhắc</span>
          </div>
        </div>
      </div>

      <!-- 3. Interactive Destination ABSA Deep Dive -->
      <section class="section-deep-dive">
        <div class="deep-dive-card">
          <div class="deep-dive-head">
            <div>
              <span class="nevio-label">ĐIỀU HƯỚNG TỪNG ĐIỂM ĐẾN</span>
              <h2 class="head-title">Bóc Tách Khía Cạnh Chi Tiết</h2>
            </div>

            <!-- Destination Switcher -->
            <div class="dest-selector-box">
              <label for="dest-select" class="selector-label">Chọn điểm đến:</label>
              <select id="dest-select" v-model="diemDenDangChonId" class="dest-select">
                <option v-for="d in dsDiemDen" :key="d.id" :value="d.id">
                  {{ d.ten_rut_gon || d.ten }} ({{ d.tinh_thanh }})
                </option>
              </select>
            </div>
          </div>

          <div v-if="diemDenHienTai" class="deep-dive-body">
            <!-- Left: Destination Spotlight Card -->
            <div class="dest-spotlight-col">
              <div class="spotlight-image-wrap">
                <img 
                  :src="diemDenHienTai.hinh_anh" 
                  :alt="diemDenHienTai.ten" 
                  class="spotlight-img"
                  @error="xuLyLoiAnh"
                />
                <div class="spotlight-badge">{{ diemDenHienTai.tinh_thanh }}</div>
              </div>

              <h3 class="spotlight-title">{{ diemDenHienTai.ten_rut_gon || diemDenHienTai.ten }}</h3>
              <p class="spotlight-desc">{{ diemDenHienTai.mo_ta }}</p>

              <div class="spotlight-wilson-box">
                <div class="wilson-stat-line">
                  <span>Khoảng tin cậy Wilson 95%:</span>
                  <strong>{{ diemDenHienTai.khoang_tin_cay_wilson }}</strong>
                </div>
                <div class="wilson-stat-line">
                  <span>Tổng đánh giá TripAdvisor:</span>
                  <strong>{{ diemDenHienTai.tong_luot_danh_gia }} lượt</strong>
                </div>
                <div class="wilson-stat-line">
                  <span>Định danh hệ thống:</span>
                  <code>{{ diemDenHienTai.ma_dinh_danh }}</code>
                </div>
              </div>

              <router-link :to="'/diem-den/' + diemDenHienTai.id" class="btn-spotlight-view">
                <span>Xem Hồ Sơ Điểm Đến Đầy Đủ</span>
                <ArrowRight :size="15" />
              </router-link>
            </div>

            <!-- Right: 5 Aspects Detailed Breakdown -->
            <div class="dest-aspects-col">
              <div 
                v-for="(info, key) in diemDenHienTai.khia_canh" 
                :key="key" 
                class="aspect-detail-row"
              >
                <div class="aspect-header-line">
                  <div class="aspect-name-wrap">
                    <span class="bullet-dot"></span>
                    <strong class="aspect-name">{{ layTenKhiaCanh(key) }}</strong>
                  </div>
                  <div class="aspect-score-badge">
                    {{ info.diem }}/5.0
                  </div>
                </div>

                <!-- Percent Bars -->
                <div class="aspect-percent-bar">
                  <div class="bar-fill pos" :style="{ width: info.tich_cuc + '%' }"></div>
                  <div class="bar-fill neu" :style="{ width: info.trung_tinh + '%' }"></div>
                  <div class="bar-fill neg" :style="{ width: info.tieu_cuc + '%' }"></div>
                </div>

                <div class="aspect-labels-row">
                  <span class="label-item text-emerald">Tích cực: {{ info.tich_cuc }}%</span>
                  <span class="label-item text-muted">Trung tính: {{ info.trung_tinh }}%</span>
                  <span class="label-item text-ruby">Tiêu cực: {{ info.tieu_cuc }}%</span>
                </div>

                <p class="aspect-quote-insight">
                  <em>"{{ info.mo_ta }}"</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Crisis Radar & Risk Prevention Guide -->
      <section class="section-crisis-monitor">
        <div class="crisis-card">
          <div class="crisis-icon-circle">
            <AlertTriangle :size="24" class="text-charcoal" />
          </div>
          <div class="crisis-content">
            <span class="nevio-label">HỆ THỐNG CẢNH BÁO SỚM DANH TIẾNG</span>
            <h3 class="crisis-title">Cơ Chế Giám Sát Khủng Hoảng Truyền Thông</h3>
            <p class="crisis-desc">
              Hệ thống theo dõi liên tục tỷ lệ sắc thái tiêu cực trên từng khía cạnh độc lập. Khi một khía cạnh (như Vệ sinh hoặc Giá cả) xuất hiện tỷ lệ phàn nàn vượt ngưỡng 15% trong vòng 7 ngày, thuật toán tự động gắn cờ cảnh báo rủi ro danh tiếng cho nhà quản lý và tạm hoãn cấp voucher ưu đãi.
            </p>
            <div class="crisis-actions">
              <router-link to="/danh-sach-danh-gia" class="btn-inspect-reviews">
                <Search :size="15" />
                <span>Tra Cứu 874 Đánh Giá TripAdvisor Chi Tiết</span>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Mountain, 
  Smile, 
  Utensils, 
  Sparkles, 
  DollarSign, 
  ArrowRight, 
  AlertTriangle, 
  Search 
} from 'lucide-vue-next'
import { DataService, KHIA_CANH_ABSA } from '../services/dataService'

const dsDiemDen = ref([])
const danhSachKhiaCanh = ref(KHIA_CANH_ABSA)
const khiaCanhDangChon = ref('Cảnh quan & Không gian')
const diemDenDangChonId = ref(1)

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80'

function xuLyLoiAnh(event) {
  event.target.src = FALLBACK_IMAGE
}

const diemDenHienTai = computed(() => {
  return dsDiemDen.value.find(d => d.id == diemDenDangChonId.value) || dsDiemDen.value[0]
})

function layIconKhiaCanh(id) {
  switch (id) {
    case 1: return Mountain
    case 2: return Smile
    case 3: return Utensils
    case 4: return Sparkles
    case 5: return DollarSign
    default: return Mountain
  }
}

function layTenKhiaCanh(key) {
  const map = {
    canh_quan: 'Cảnh quan & Vị trí',
    dich_vu: 'Chất lượng phục vụ & Đội ngũ',
    am_thuc: 'Ẩm thực & Nhà hàng',
    ve_sinh: 'Vệ sinh & Tiện nghi buồng phòng',
    gia_ca: 'Giá cả & Độ tương xứng chi phí'
  }
  return map[key] || key
}

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
})
</script>

<style scoped>
.nevio-absa-page {
  padding: 40px 0 80px 0;
  background-color: var(--mau-nen);
}

.nevio-container {
  max-width: var(--max-rong);
  margin: 0 auto;
  padding: 0 24px;
}

/* Page Header */
.page-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 40px auto;
}

.nevio-eyebrow-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(48, 48, 48, 0.06);
  border: 1px solid var(--nevio-border);
  padding: 5px 14px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--mau-chu);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 14px;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #059669;
}

.page-title {
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 800;
  color: var(--mau-chu);
  letter-spacing: -0.02em;
  margin-bottom: 14px;
}

.page-subtitle {
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
}

/* 5 Aspects KPI Grid */
.aspect-kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
  margin-bottom: 40px;
}

.aspect-kpi-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-subtle);
}

.aspect-kpi-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-hover);
}

.aspect-kpi-card.active-card {
  border-color: #fddd62;
  background: #fefdf8;
}

.kpi-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.aspect-icon-badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fddd62;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kpi-score {
  font-size: 16px;
  font-weight: 800;
  color: var(--mau-chu);
}

.kpi-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.sentiment-bar-multi {
  height: 8px;
  border-radius: 9999px;
  display: flex;
  overflow: hidden;
  margin-bottom: 10px;
  background: rgba(0,0,0,0.06);
}

.bar-seg.pos { background: #10b981; }
.bar-seg.neu { background: #d1d5db; }
.bar-seg.neg { background: #ef4444; }

.kpi-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 600;
}

.text-emerald { color: #059669; }
.text-ruby { color: #dc2626; }
.text-muted { color: var(--mau-chu-phu); }

/* Section Deep Dive */
.section-deep-dive {
  margin-bottom: 40px;
}

.deep-dive-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-card);
}

.deep-dive-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--nevio-border);
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 16px;
}

.nevio-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--nevio-orange);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 4px;
}

.head-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--mau-chu);
}

.dest-selector-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.selector-label {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--mau-chu);
}

.dest-select {
  padding: 8px 16px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--mau-chu);
  outline: none;
  cursor: pointer;
}

.deep-dive-body {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 36px;
}

/* Left Spotlight */
.dest-spotlight-col {
  display: flex;
  flex-direction: column;
}

.spotlight-image-wrap {
  position: relative;
  height: 220px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 18px;
}

.spotlight-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.spotlight-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 600;
}

.spotlight-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 8px;
}

.spotlight-desc {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
  line-height: 1.6;
  margin-bottom: 18px;
}

.spotlight-wilson-box {
  background: var(--nevio-light-grey);
  border-radius: var(--radius-md);
  padding: 14px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 12.5px;
}

.wilson-stat-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wilson-stat-line code {
  font-family: monospace;
  background: rgba(0,0,0,0.06);
  padding: 2px 6px;
  border-radius: 4px;
}

.btn-spotlight-view {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: #fddd62;
  color: #303030;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 13.5px;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-spotlight-view:hover {
  background: #fcd34d;
}

/* Right Aspects Breakdown */
.dest-aspects-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.aspect-detail-row {
  background: var(--nevio-light-grey);
  border-radius: var(--radius-md);
  padding: 16px;
}

.aspect-header-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.aspect-name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bullet-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d97706;
}

.aspect-name {
  font-size: 14.5px;
  color: var(--mau-chu);
}

.aspect-score-badge {
  font-size: 13px;
  font-weight: 800;
  background: var(--nevio-card-bg);
  padding: 3px 10px;
  border-radius: var(--radius-full);
  border: 1px solid var(--nevio-border);
}

.aspect-percent-bar {
  height: 7px;
  border-radius: 9999px;
  display: flex;
  overflow: hidden;
  margin-bottom: 8px;
  background: rgba(0,0,0,0.06);
}

.bar-fill.pos { background: #10b981; }
.bar-fill.neu { background: #d1d5db; }
.bar-fill.neg { background: #ef4444; }

.aspect-labels-row {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 11.5px;
  font-weight: 600;
  margin-bottom: 8px;
}

.aspect-quote-insight {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  line-height: 1.5;
}

/* Crisis Monitor Card */
.crisis-card {
  background: #fffbeb;
  border: 1px solid #fef3c7;
  border-radius: var(--radius-xl);
  padding: 28px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.crisis-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fddd62;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.crisis-title {
  font-size: 18px;
  font-weight: 800;
  color: #78350f;
  margin: 4px 0 8px 0;
}

.crisis-desc {
  font-size: 14px;
  line-height: 1.6;
  color: #92400e;
  margin-bottom: 16px;
}

.btn-inspect-reviews {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: #303030;
  color: #ffffff;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-inspect-reviews:hover {
  background: #000000;
}

@media (max-width: 900px) {
  .deep-dive-body {
    grid-template-columns: 1fr;
  }
}
</style>
