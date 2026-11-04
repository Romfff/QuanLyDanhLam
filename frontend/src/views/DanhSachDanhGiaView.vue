<template>
  <div class="nevio-reviews-page">
    <div class="nevio-container">
      <!-- 1. Header Section -->
      <div class="page-header">
        <span class="nevio-label center">CƠ SỞ DỮ LIỆU ĐÁNH GIÁ KIỂM CHỨNG</span>
        <h1 class="page-title">
          {{ tenDiemDenDangLoc ? 'Đánh Giá TripAdvisor: ' + tenDiemDenDangLoc : 'Trung Tâm Dữ Liệu 874 Đánh Giá TripAdvisor' }}
        </h1>
        <p class="page-subtitle">
          <span v-if="locDiemDenId">
            Đang hiển thị <strong>{{ tongBanGhi }}</strong> đánh giá nguyên văn từ TripAdvisor thu thập riêng cho <strong>{{ tenDiemDenDangLoc }}</strong>, được mô hình trí tuệ nhân tạo PhoBERT tự động gán nhãn 5 khía cạnh dịch vụ.
          </span>
          <span v-else>
            Toàn bộ 874 đánh giá được thu thập khách quan từ TripAdvisor tại 7 điểm đến trọng điểm, phân tách sắc thái theo 5 khía cạnh du lịch bằng mô hình trí tuệ nhân tạo <strong>PhoBERT</strong>.
          </span>
        </p>

        <!-- Active Filter Pill if filtered by Destination -->
        <div v-if="locDiemDenId" class="header-filter-active-pill">
          <span>Đang lọc riêng theo: <strong>{{ tenDiemDenDangLoc }}</strong> ({{ tongBanGhi }} đánh giá)</span>
          <button @click="datLaiDiemDen" class="btn-clear-active-dest" title="Xem tất cả 874 đánh giá toàn hệ thống">
            ✕ Xem tất cả 874 đánh giá của 7 điểm đến
          </button>
        </div>
      </div>

      <!-- 2. Nevio Filter & Search Bar -->
      <div class="reviews-filter-bar">
        <!-- Row 1: Keyword Search -->
        <div class="filter-search-box">
          <Search :size="18" class="search-icon text-muted" />
          <input 
            v-model="tuKhoa" 
            @input="thucHienLoc"
            type="text" 
            placeholder="Tìm theo nội dung đánh giá, từ khóa, người đánh giá..." 
            class="input-search-text"
          />
          <button v-if="tuKhoa" @click="tuKhoa = ''; thucHienLoc()" class="btn-clear-input">
            <X :size="16" />
          </button>
        </div>

        <!-- Row 2: Dropdowns -->
        <div class="filter-dropdowns-row">
          <!-- Destination Dropdown -->
          <div class="dropdown-group">
            <label>Điểm đến:</label>
            <select v-model="locDiemDenId" @change="thucHienLoc" class="filter-select">
              <option value="">Tất cả 7 điểm đến (874 đánh giá toàn hệ thống)</option>
              <option v-for="d in dsDiemDen" :key="d.id" :value="d.id">
                {{ d.ten_rut_gon || d.ten }} ({{ d.tong_luot_danh_gia }} đánh giá)
              </option>
            </select>
          </div>

          <!-- Aspect Dropdown -->
          <div class="dropdown-group">
            <label>Khía cạnh ABSA:</label>
            <select v-model="locKhiaCanh" @change="thucHienLoc" class="filter-select">
              <option value="">Mọi khía cạnh</option>
              <option value="Cảnh quan">Cảnh quan &amp; Không gian</option>
              <option value="Dịch vụ">Chất lượng phục vụ</option>
              <option value="Ẩm thực">Ẩm thực &amp; Đặc sản</option>
              <option value="Vệ sinh">Vệ sinh &amp; Môi trường</option>
              <option value="Giá cả">Giá cả &amp; Minh bạch</option>
            </select>
          </div>

          <!-- Star Rating Dropdown -->
          <div class="dropdown-group">
            <label>Số sao đánh giá:</label>
            <select v-model="locSao" @change="thucHienLoc" class="filter-select">
              <option value="">Tất cả số sao</option>
              <option value="5">★★★★★ 5 sao (Tuyệt vời)</option>
              <option value="4">★★★★☆ 4 sao (Rất tốt)</option>
              <option value="3">★★★☆☆ 3 sao (Hài lòng)</option>
              <option value="1">★☆☆☆☆ 1 - 2 sao (Cần cải thiện)</option>
            </select>
          </div>

          <!-- Sentiment Dropdown -->
          <div class="dropdown-group">
            <label>Sắc thái:</label>
            <select v-model="locSacThai" @change="thucHienLoc" class="filter-select">
              <option value="">Tất cả sắc thái</option>
              <option value="tich_cuc">Tích cực</option>
              <option value="trung_tinh">Trung tính</option>
              <option value="tieu_cuc">Tiêu cực</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button @click="datLaiBoLoc" class="btn-reset">
            <RotateCcw :size="14" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      <!-- 3. Stats & Filter Summary Ribbon -->
      <div class="filter-summary-ribbon">
        <div class="ribbon-count">
          <span v-if="locDiemDenId && tenDiemDenDangLoc">
            Hiển thị <strong>{{ danhSachDanhGia.length }} / {{ tongBanGhi }}</strong> đánh giá thực tế của <strong>{{ tenDiemDenDangLoc }}</strong> (Trang {{ trangHienTai }} / {{ tongTrang }})
          </span>
          <span v-else>
            Hiển thị <strong>{{ tongBanGhi }}</strong> / 874 đánh giá TripAdvisor thực tế toàn hệ thống (Trang {{ trangHienTai }} / {{ tongTrang }})
          </span>
        </div>
        <div class="ribbon-sentiment-stats">
          <span class="ribbon-pill pill-pos">● 88.5% Khen ngợi</span>
          <span class="ribbon-pill pill-neu">● 7.5% Trung gian</span>
          <span class="ribbon-pill pill-neg">● 4.0% Góp ý</span>
        </div>
      </div>

      <!-- 4. Reviews Grid -->
      <div v-if="dangTai" class="loading-state">
        <p>Đang tải dữ liệu đánh giá TripAdvisor...</p>
      </div>

      <div v-else-if="danhSachDanhGia.length > 0" class="reviews-list-grid">
        <article v-for="rev in danhSachDanhGia" :key="rev.id" class="review-nevio-card">
          <!-- Card Header: User & Rating -->
          <div class="card-head">
            <div class="reviewer-meta">
              <div class="avatar-badge">
                {{ (rev.nguoi_danh_gia || 'D').charAt(0) }}
              </div>
              <div>
                <h3 class="reviewer-name">{{ rev.nguoi_danh_gia || 'Du khách ẩn danh' }}</h3>
                <span class="reviewer-sub">
                  {{ rev.quoc_gia || 'Việt Nam' }} · {{ rev.ngay_dang || '2026' }}
                </span>
              </div>
            </div>

            <div class="rating-stars-badge-wrap">
              <div class="rating-stars-badge">
                <Star v-for="s in 5" :key="s" :size="13" :class="['star', { 'fill-yellow': s <= (rev.diem_so || 5), 'empty-star': s > (rev.diem_so || 5) }]" />
              </div>
              <span :class="['rev-score-badge', 'badge-score-' + (rev.diem_so || 5)]">
                {{ rev.diem_so || 5 }}/5 · {{ getRatingLabel(rev.diem_so || 5) }}
              </span>
            </div>
          </div>

          <!-- Destination Tag -->
          <div class="review-destination-tag">
            <router-link :to="'/diem-den/' + (rev.diem_den_id || 1)">
              <MapPin :size="12" />
              <span>{{ rev.ten_diem_den }}</span>
            </router-link>
          </div>

          <!-- Review Content -->
          <h4 class="review-title">"{{ rev.tieu_de }}"</h4>
          <p class="review-quote">{{ rev.noi_dung }}</p>

          <!-- ABSA Aspect Highlights -->
          <div class="aspect-tags-cluster">
            <span 
              v-for="(tag, tIdx) in rev.khia_canh_tags" 
              :key="tIdx"
              :class="['aspect-pill', 'aspect-' + (tag.sac_thai || 'tich_cuc')]"
            >
              <strong>{{ tag.khia_canh }}:</strong> {{ tag.chi_tiet }}
            </span>
          </div>

          <!-- Card Bottom: Verified Tag -->
          <div class="card-bottom">
            <span class="verified-tag">
              <CheckCircle2 :size="13" class="inline" /> Đã kiểm chứng TripAdvisor
            </span>
            <span :class="['sentiment-indicator', 'sent-' + (rev.sac_thai || 'tich_cuc')]">
              {{ rev.sac_thai === 'tieu_cuc' ? 'Tiêu cực' : rev.sac_thai === 'trung_tinh' ? 'Trung tính' : 'Tích cực' }}
            </span>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state-box">
        <Search :size="32" class="text-muted mb-2" />
        <h3>Không tìm thấy đánh giá nào phù hợp</h3>
        <p>Vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bớt các tiêu chí lọc.</p>
        <button @click="datLaiBoLoc" class="btn-reset">Làm mới bộ lọc</button>
      </div>

      <!-- 5. Pagination Controls -->
      <div v-if="tongTrang > 1" class="pagination-wrapper">
        <button 
          @click="chuyenTrang(trangHienTai - 1)" 
          :disabled="trangHienTai <= 1"
          class="btn-page"
        >
          ← Trang trước
        </button>

        <div class="page-numbers">
          <template v-for="(p, pIdx) in danhSachTrangHienThi" :key="pIdx">
            <span v-if="p === '...'" class="page-ellipsis">...</span>
            <button 
              v-else
              @click="chuyenTrang(p)"
              :class="['page-num', { active: p === trangHienTai }]"
            >
              {{ p }}
            </button>
          </template>
        </div>

        <button 
          @click="chuyenTrang(trangHienTai + 1)" 
          :disabled="trangHienTai >= tongTrang"
          class="btn-page"
        >
          Trang sau →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  RotateCcw, 
  X 
} from 'lucide-vue-next'
import { DataService } from '../services/dataService'

const route = useRoute()
const router = useRouter()

const dsDiemDen = ref([])
const danhSachDanhGia = ref([])
const dangTai = ref(false)

const tuKhoa = ref(route.query.tu_khoa || '')
const locDiemDenId = ref(route.query.diem_den_id || '')
const locKhiaCanh = ref(route.query.khia_canh || '')
const locSacThai = ref(route.query.sac_thai || '')
const locSao = ref(route.query.diem_so || '')

const trangHienTai = ref(Number(route.query.trang) || 1)
const tongTrang = ref(1)
const tongBanGhi = ref(874)

function getRatingLabel(score) {
  if (score >= 5) return 'Tuyệt vời'
  if (score === 4) return 'Rất tốt'
  if (score === 3) return 'Hài lòng'
  if (score === 2) return 'Cần cải thiện'
  return 'Kém / Thất vọng'
}

const tenDiemDenDangLoc = computed(() => {
  if (!locDiemDenId.value) return ''
  const d = dsDiemDen.value.find(item => item.id == locDiemDenId.value)
  return d ? (d.ten_rut_gon || d.ten) : ''
})

const danhSachTrangHienThi = computed(() => {
  const cur = trangHienTai.value
  const total = tongTrang.value
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const pages = []
  pages.push(1)
  if (cur > 3) pages.push('...')
  const start = Math.max(2, cur - 1)
  const end = Math.min(total - 1, cur + 1)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  if (cur < total - 2) pages.push('...')
  pages.push(total)
  return pages
})

async function taiDanhGia() {
  dangTai.value = true
  try {
    const boLoc = {
      tu_khoa: tuKhoa.value,
      diem_den_id: locDiemDenId.value,
      khia_canh_id: locKhiaCanh.value,
      sac_thai: locSacThai.value,
      diem_so: locSao.value
    }
    const ketQua = await DataService.layDanhSachDanhGia(boLoc, trangHienTai.value, 16)
    danhSachDanhGia.value = ketQua.danh_sach
    tongTrang.value = ketQua.meta.tong_trang || 1
    tongBanGhi.value = ketQua.meta.tong_ban_ghi || 874
  } finally {
    dangTai.value = false
  }
}

function thucHienLoc() {
  trangHienTai.value = 1
  capNhatUrl()
  taiDanhGia()
}

function datLaiDiemDen() {
  locDiemDenId.value = ''
  trangHienTai.value = 1
  capNhatUrl()
  taiDanhGia()
}

function datLaiBoLoc() {
  tuKhoa.value = ''
  locDiemDenId.value = ''
  locKhiaCanh.value = ''
  locSacThai.value = ''
  locSao.value = ''
  trangHienTai.value = 1
  capNhatUrl()
  taiDanhGia()
}

function chuyenTrang(soTrang) {
  if (soTrang < 1 || soTrang > tongTrang.value) return
  trangHienTai.value = soTrang
  capNhatUrl()
  taiDanhGia()
  window.scrollTo({ top: 250, behavior: 'smooth' })
}

function capNhatUrl() {
  const query = {}
  if (tuKhoa.value) query.tu_khoa = tuKhoa.value
  if (locDiemDenId.value) query.diem_den_id = locDiemDenId.value
  if (locKhiaCanh.value) query.khia_canh = locKhiaCanh.value
  if (locSacThai.value) query.sac_thai = locSacThai.value
  if (locSao.value) query.diem_so = locSao.value
  if (trangHienTai.value > 1) query.trang = trangHienTai.value
  router.push({ query })
}

watch(() => route.query.diem_den_id, (newVal) => {
  if (newVal !== locDiemDenId.value) {
    locDiemDenId.value = newVal || ''
    trangHienTai.value = 1
    taiDanhGia()
  }
})

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
  await taiDanhGia()
})
</script>

<style scoped>
.nevio-reviews-page {
  padding: 40px 0 80px 0;
}

.page-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 36px auto;
}

.page-title {
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 15px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
}

.header-filter-active-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #fef9c3;
  border: 1px solid #fde047;
  padding: 8px 18px;
  border-radius: var(--radius-full);
  margin-top: 16px;
  font-size: 13px;
  color: #854d0e;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.btn-clear-active-dest {
  background: #854d0e;
  color: #ffffff;
  border: none;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-clear-active-dest:hover {
  background: #713f12;
}

.reviews-filter-bar {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  box-shadow: var(--shadow-subtle);
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 8px 16px;
}

.input-search-text {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14.5px;
  color: var(--mau-chu);
  outline: none;
  font-family: inherit;
}

.btn-clear-input {
  background: transparent;
  border: none;
  color: var(--mau-chu-mo);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.filter-dropdowns-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.dropdown-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 180px;
}

.dropdown-group label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  white-space: nowrap;
}

.filter-select {
  width: 100%;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--nevio-border);
  background: var(--nevio-card-bg);
  color: var(--mau-chu);
  font-size: 13.5px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
}

.btn-reset {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu-phu);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn-reset:hover {
  background: #fee2e2;
  color: #dc2626;
}

.filter-summary-ribbon {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.ribbon-count {
  font-size: 14px;
  color: var(--mau-chu-phu);
}

.ribbon-count strong {
  color: var(--mau-chu);
  font-size: 16px;
}

.ribbon-sentiment-stats {
  display: flex;
  gap: 8px;
}

.ribbon-pill {
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.pill-pos { background: #ecfdf5; color: #047857; }
.pill-neu { background: #f5f5f4; color: #57534e; }
.pill-neg { background: #fff1f2; color: #be123c; }

.reviews-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.review-nevio-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-nevio-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card);
}

.card-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.reviewer-meta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-badge {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--nevio-dark);
  color: var(--nevio-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}

.reviewer-name {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
}

.reviewer-sub {
  font-size: 12px;
  color: var(--mau-chu-mo);
}

.rating-stars-badge-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.rating-stars-badge {
  display: flex;
  align-items: center;
  gap: 2px;
}

.rev-score-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  letter-spacing: 0.02em;
}

.badge-score-5 {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.badge-score-4 {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.badge-score-3 {
  background: #fffbeb;
  color: #d97706;
  border: 1px solid #fde68a;
}

.badge-score-2 {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.badge-score-1 {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.review-destination-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 8px;
}

.review-destination-tag a {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;
}

.review-destination-tag a:hover {
  text-decoration: underline;
}

.review-title {
  font-size: 15.5px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 8px;
  line-height: 1.3;
}

.review-quote {
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 18px;
  flex: 1;
}

.aspect-tags-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 18px;
}

.aspect-pill {
  font-size: 11.5px;
  padding: 3px 8px;
  border-radius: 4px;
}

.aspect-tich_cuc { background: #ecfdf5; color: #047857; }
.aspect-trung_tinh { background: #f5f5f4; color: #57534e; }
.aspect-tieu_cuc { background: #fff1f2; color: #be123c; }

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--nevio-border);
}

.verified-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11.5px;
  color: #059669;
  font-weight: 600;
}

.sentiment-indicator {
  font-size: 11.5px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
}

.sent-tich_cuc { background: #ecfdf5; color: #047857; }
.sent-trung_tinh { background: #f5f5f4; color: #57534e; }
.sent-tieu_cuc { background: #fff1f2; color: #be123c; }

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}

.btn-page {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu);
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.btn-page:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 6px;
}

.page-num {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  border: 1px solid var(--nevio-border);
  background: var(--nevio-card-bg);
  color: var(--mau-chu);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.page-num.active {
  background: var(--nevio-dark);
  color: var(--nevio-white);
  border-color: var(--nevio-dark);
}

.page-ellipsis {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  color: var(--mau-chu-phu);
  font-weight: 700;
}

[data-theme="dark"] .page-num.active {
  background: var(--nevio-yellow);
  color: var(--nevio-dark);
  border-color: var(--nevio-yellow);
}

.empty-state-box, .loading-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--nevio-card-bg);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--nevio-border);
  margin-top: 20px;
}

@media (max-width: 768px) {
  .filter-dropdowns-row {
    flex-direction: column;
    align-items: stretch;
  }
  .reviews-list-grid {
    grid-template-columns: 1fr;
  }
}
</style>
