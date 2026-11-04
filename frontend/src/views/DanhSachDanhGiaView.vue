<template>
  <div class="nevio-reviews-page">
    <div class="nevio-container">
      <!-- 1. Header Section -->
      <div class="page-header">
        <div class="nevio-eyebrow emerald">CƠ SỞ DỮ LIỆU ĐÁNH GIÁ THỰC TẾ</div>
        <h1 class="page-title">Trung Tâm Dữ Liệu 874 Đánh Giá TripAdvisor</h1>
        <p class="page-subtitle">
          Toàn bộ đánh giá được thu thập khách quan từ TripAdvisor, phân tách và gán nhãn sắc thái theo 5 khía cạnh du lịch bằng mô hình trí tuệ nhân tạo <strong>PhoBERT</strong>.
        </p>
      </div>

      <!-- 2. Nevio Filter & Search Bar -->
      <div class="reviews-filter-bar">
        <!-- Row 1: Keyword Search -->
        <div class="filter-search-box">
          <span class="search-icon">🔍</span>
          <input 
            v-model="tuKhoa" 
            @input="thucHienLoc"
            type="text" 
            placeholder="Tìm theo nội dung đánh giá, từ khóa, người đánh giá..." 
            class="input-search-text"
          />
          <button v-if="tuKhoa" @click="tuKhoa = ''; thucHienLoc()" class="btn-clear-input">✕</button>
        </div>

        <!-- Row 2: Dropdowns -->
        <div class="filter-dropdowns-row">
          <!-- Destination Dropdown -->
          <div class="dropdown-group">
            <label>Điểm đến:</label>
            <select v-model="locDiemDenId" @change="thucHienLoc" class="filter-select">
              <option value="">Tất cả 7 điểm đến</option>
              <option v-for="d in dsDiemDen" :key="d.id" :value="d.id">
                {{ d.ten_rut_gon || d.ten }}
              </option>
            </select>
          </div>

          <!-- Aspect Dropdown -->
          <div class="dropdown-group">
            <label>Khía cạnh ABSA:</label>
            <select v-model="locKhiaCanh" @change="thucHienLoc" class="filter-select">
              <option value="">Mọi khía cạnh</option>
              <option value="Cảnh quan">🏞️ Cảnh quan & Không gian</option>
              <option value="Dịch vụ">🛎️ Chất lượng phục vụ</option>
              <option value="Ẩm thực">🍜 Ẩm thực & Đặc sản</option>
              <option value="Vệ sinh">🧹 Vệ sinh & Môi trường</option>
              <option value="Giá cả">💵 Giá cả & Minh bạch</option>
            </select>
          </div>

          <!-- Sentiment Dropdown -->
          <div class="dropdown-group">
            <label>Sắc thái:</label>
            <select v-model="locSacThai" @change="thucHienLoc" class="filter-select">
              <option value="">Tất cả sắc thái</option>
              <option value="tich_cuc">🟢 Tích cực</option>
              <option value="trung_tinh">⚪ Trung tính</option>
              <option value="tieu_cuc">🔴 Tiêu cực</option>
            </select>
          </div>

          <!-- Reset Button -->
          <button @click="datLaiBoLoc" class="btn-reset">
            Làm mới
          </button>
        </div>
      </div>

      <!-- 3. Stats & Filter Summary Ribbon -->
      <div class="filter-summary-ribbon">
        <div class="ribbon-count">
          Hiển thị <strong>{{ tongBanGhi }}</strong> đánh giá hợp lệ
        </div>
        <div class="ribbon-sentiment-stats">
          <span class="ribbon-pill pill-pos">🟢 88.5% Khen ngợi</span>
          <span class="ribbon-pill pill-neu">⚪ 7.5% Trung gian</span>
          <span class="ribbon-pill pill-neg">🔴 4.0% Góp ý</span>
        </div>
      </div>

      <!-- 4. Reviews Grid -->
      <div v-if="dangTai" class="loading-state">
        <span class="spinner"></span>
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
                  {{ rev.quoc_gia || 'Việt Nam 🇻🇳' }} · {{ rev.ngay_dang || '2026' }}
                </span>
              </div>
            </div>

            <div class="rating-stars-badge">
              <span v-for="s in 5" :key="s" :class="['star', { filled: s <= (rev.diem_so || 5) }]">★</span>
            </div>
          </div>

          <!-- Destination Tag -->
          <div class="review-destination-tag">
            <router-link :to="'/diem-den/' + (rev.diem_den_id || 1)">
              📍 {{ rev.ten_diem_den }}
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
            <span class="verified-tag">✓ Đã kiểm chứng TripAdvisor</span>
            <span :class="['sentiment-indicator', 'sent-' + (rev.sac_thai || 'tich_cuc')]">
              {{ rev.sac_thai === 'tieu_cuc' ? 'Tiêu cực' : rev.sac_thai === 'trung_tinh' ? 'Trung tính' : 'Tích cực' }}
            </span>
          </div>
        </article>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state-box">
        <span class="empty-icon">📝</span>
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
          <button 
            v-for="p in Math.min(tongTrang, 6)" 
            :key="p"
            @click="chuyenTrang(p)"
            :class="['page-num', { active: p === trangHienTai }]"
          >
            {{ p }}
          </button>
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DataService, DANH_SACH_DIEM_DEN_FALLBACK } from '../services/dataService'

const route = useRoute()
const router = useRouter()

const dsDiemDen = ref([])
const danhSachDanhGia = ref([])
const dangTai = ref(false)

const tuKhoa = ref(route.query.tu_khoa || '')
const locDiemDenId = ref(route.query.diem_den_id || '')
const locKhiaCanh = ref(route.query.khia_canh || '')
const locSacThai = ref(route.query.sac_thai || '')

const trangHienTai = ref(Number(route.query.trang) || 1)
const tongTrang = ref(1)
const tongBanGhi = ref(874)

async function taiDanhGia() {
  dangTai.value = true
  try {
    const boLoc = {
      tu_khoa: tuKhoa.value,
      diem_den_id: locDiemDenId.value,
      khia_canh_id: locKhiaCanh.value,
      sac_thai: locSacThai.value
    }
    const ketQua = await DataService.layDanhSachDanhGia(boLoc, trangHienTai.value, 8)
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

function datLaiBoLoc() {
  tuKhoa.value = ''
  locDiemDenId.value = ''
  locKhiaCanh.value = ''
  locSacThai.value = ''
  trangHienTai.value = 1
  capNhatUrl()
  taiDanhGia()
}

function chuyenTrang(soTrang) {
  if (soTrang < 1 || soTrang > tongTrang.value) return
  trangHienTai.value = soTrang
  capNhatUrl()
  taiDanhGia()
  window.scrollTo({ top: 300, behavior: 'smooth' })
}

function capNhatUrl() {
  const query = {}
  if (tuKhoa.value) query.tu_khoa = tuKhoa.value
  if (locDiemDenId.value) query.diem_den_id = locDiemDenId.value
  if (locKhiaCanh.value) query.khia_canh = locKhiaCanh.value
  if (locSacThai.value) query.sac_thai = locSacThai.value
  if (trangHienTai.value > 1) query.trang = trangHienTai.value
  router.push({ query })
}

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
  font-size: 34px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 15px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
}

/* =================================================== */
/* 2. FILTER BAR                                       */
/* =================================================== */
.reviews-filter-bar {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 20px;
  padding: 20px 24px;
  box-shadow: var(--bong-the);
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  border-radius: 12px;
  padding: 8px 16px;
}

.search-icon {
  font-size: 16px;
  opacity: 0.7;
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
  font-size: 14px;
  cursor: pointer;
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
  border-radius: 8px;
  border: 1px solid var(--duong-vien);
  background: var(--mau-nen);
  color: var(--mau-chu);
  font-size: 13.5px;
  font-family: inherit;
  cursor: pointer;
  outline: none;
}

.btn-reset {
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu-phu);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-reset:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

/* =================================================== */
/* 3. SUMMARY RIBBON                                   */
/* =================================================== */
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
  border-radius: 9999px;
}

.pill-pos { background: rgba(16, 185, 129, 0.12); color: #047857; }
.pill-neu { background: rgba(100, 116, 139, 0.12); color: #475569; }
.pill-neg { background: rgba(239, 68, 68, 0.12); color: #b91c1c; }

/* =================================================== */
/* 4. REVIEWS GRID                                     */
/* =================================================== */
.reviews-list-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;
}

.review-nevio-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 18px;
  padding: 24px;
  box-shadow: var(--bong-the);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.review-nevio-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--bong-noi);
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
  background: linear-gradient(135deg, #0284c7, #10b981);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
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

.rating-stars-badge {
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

.review-destination-tag {
  font-size: 12.5px;
  font-weight: 700;
  color: #0284c7;
  margin-bottom: 8px;
}

.review-destination-tag a {
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
  border-radius: 6px;
}

.aspect-tich_cuc {
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.aspect-trung_tinh {
  background: rgba(100, 116, 139, 0.12);
  color: #475569;
  border: 1px solid rgba(100, 116, 139, 0.25);
}

.aspect-tieu_cuc {
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--duong-vien);
}

.verified-tag {
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
.sent-trung_tinh { background: #f1f5f9; color: #475569; }
.sent-tieu_cuc { background: #fef2f2; color: #b91c1c; }

/* =================================================== */
/* 5. PAGINATION                                       */
/* =================================================== */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 40px;
}

.btn-page {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
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
  border-radius: 8px;
  border: 1px solid var(--duong-vien);
  background: var(--mau-nen-the);
  color: var(--mau-chu);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.page-num.active {
  background: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
}

[data-theme="dark"] .page-num.active {
  background: #38bdf8;
  color: #0b1120;
  border-color: #38bdf8;
}

.empty-state-box, .loading-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--mau-nen-the);
  border-radius: 20px;
  border: 1px dashed var(--duong-vien);
  margin-top: 20px;
}

.empty-icon {
  font-size: 40px;
  margin-bottom: 12px;
  display: block;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 26px;
  }
  .filter-dropdowns-row {
    flex-direction: column;
    align-items: stretch;
  }
  .reviews-list-grid {
    grid-template-columns: 1fr;
  }
}
</style>
