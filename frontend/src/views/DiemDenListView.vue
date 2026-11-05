<template>
  <div class="nevio-destinations-page anim-fade-in">
    <div class="nevio-container">
      <!-- 1. Header Section -->
      <div class="page-header">
        <div class="nevio-eyebrow-pill">
          <span class="eyebrow-dot"></span>
          BẢO CHỨNG BỞI WILSON SCORE 95% &amp; PHOBERT AI
        </div>
        <h1 class="page-title">7 Kỳ Quan &amp; Điểm Đến Trọng Điểm</h1>
        <p class="page-subtitle">
          Danh mục định vị danh tiếng du lịch minh bạch. Mỗi điểm đến được đánh giá dựa trên khoảng tin cậy Wilson Score dưới chuẩn 95%, loại trừ hoàn toàn các đánh giá ảo để du khách an tâm lựa chọn.
        </p>

        <!-- Admin Quick Notice Bar -->
        <div v-if="laAdmin" class="admin-notice-bar">
          <ShieldCheck :size="16" class="text-amber" />
          <span>Bạn đang đăng nhập với quyền <strong>Quản trị viên (Admin)</strong>.</span>
          <router-link to="/quan-tri" class="link-admin-panel">Vào trang Quản trị để Thêm / Sửa / Xóa địa điểm &amp; Chạy tính toán →</router-link>
        </div>
      </div>

      <!-- 2. Search & Filter Bar -->
      <div class="filter-toolbar">
        <div class="search-input-wrap">
          <Search :size="18" class="search-icon text-muted" />
          <input 
            v-model="tuKhoa" 
            type="text" 
            placeholder="Tìm kiếm điểm đến (Hạ Long, Tràng An, Melia Vinpearl...)" 
            class="input-search"
          />
          <button v-if="tuKhoa" @click="tuKhoa = ''" class="btn-clear">
            <X :size="15" />
          </button>
        </div>

        <div class="filters-row">
          <div class="select-field">
            <MapPin :size="15" class="text-muted" />
            <select v-model="locTinhThanh" class="filter-select">
              <option value="">Tất cả địa phương</option>
              <option value="Quảng Ninh">Quảng Ninh (3 điểm)</option>
              <option value="Ninh Bình">Ninh Bình (3 điểm)</option>
              <option value="Kiên Giang">Kiên Giang / Phú Quốc (1 điểm)</option>
            </select>
          </div>

          <div class="select-field">
            <Award :size="15" class="text-muted" />
            <select v-model="locTrangThai" class="filter-select">
              <option value="">Tất cả trạng thái Wilson</option>
              <option value="diem_sang">Điểm sáng du lịch (Wilson cao)</option>
              <option value="binh_thuong">Ổn định</option>
              <option value="canh_bao">Cần cải thiện chất lượng</option>
            </select>
          </div>

          <button @click="datLaiBoLoc" class="btn-reset">
            <RotateCcw :size="14" />
            <span>Làm mới</span>
          </button>
        </div>
      </div>

      <!-- 3. Result Meta Summary Ribbon & View Mode Toggle -->
      <div class="result-summary-bar">
        <span>Hiển thị <strong>{{ danhSachLoc.length }} / {{ dsDiemDen.length }}</strong> điểm đến được kiểm chứng</span>
        <div class="summary-right-actions">
          <div class="status-legend">
            <span class="legend-pill pill-bright"><Sparkles :size="12" /> Điểm sáng du lịch</span>
            <span class="legend-pill pill-stable">● Ổn định</span>
          </div>

          <!-- View Mode Toggle (Stacked List vs Grid) -->
          <div class="view-mode-toggles">
            <button 
              @click="cheDoHienThi = 'xep_chong'" 
              :class="['btn-toggle-mode', { active: cheDoHienThi === 'xep_chong' }]"
              title="Chế độ Xếp Chồng UX Danh Tiếng (Mặc định)"
            >
              <Layers :size="14" />
              <span>Xếp chồng</span>
            </button>
            <button 
              @click="cheDoHienThi = 'luoi'" 
              :class="['btn-toggle-mode', { active: cheDoHienThi === 'luoi' }]"
              title="Chế độ Lưới truyền thống"
            >
              <LayoutGrid :size="14" />
              <span>Lưới</span>
            </button>
          </div>
        </div>
      </div>

            <!-- ================= 4A. DANH SÁCH XẾP CHỒNG (STACKED LEADERBOARD UX MẶC ĐỊNH) ================= -->
      <div v-if="danhSachLoc.length > 0 && cheDoHienThi === 'xep_chong'" class="destinations-stacked-list">
        <article 
          v-for="(dest, index) in danhSachLoc" 
          :key="dest.id" 
          class="stacked-dest-card anim-hover-lift"
        >
          <!-- 1. Rank & Medal Column -->
          <div class="stacked-rank-col">
            <div :class="['rank-badge-box', { 'rank-gold': index === 0, 'rank-silver': index === 1, 'rank-bronze': index === 2 }]">
              <Crown v-if="index === 0" :size="18" class="rank-crown-icon" />
              <span class="rank-digits">{{ (index + 1) < 10 ? '0' + (index + 1) : (index + 1) }}</span>
            </div>
            <span class="rank-caption">{{ index === 0 ? 'Top 1 Uy Tín' : 'Hạng ' + (index + 1) }}</span>
          </div>

          <!-- 2. Thumbnail Column -->
          <div class="stacked-image-wrap">
            <img :src="dest.hinh_anh" :alt="dest.ten" class="stacked-dest-img" loading="lazy" @error="xuLyLoiAnh($event, dest.id)" />
            <div class="stacked-img-overlay"></div>
            <div class="stacked-location-pill">
              <MapPin :size="12" />
              <span>{{ dest.tinh_thanh }}</span>
            </div>
          </div>

          <!-- 3. Main Info & 5 Aspect Ratings -->
          <div class="stacked-info-col">
            <div class="stacked-top-meta">
              <span class="stacked-category-pill">{{ dest.loai_hinh }}</span>
              <span :class="['stacked-wilson-pill', 'status-' + (dest.trang_thai_wilson || 'binh_thuong')]">
                <Sparkles v-if="dest.trang_thai_wilson === 'diem_sang'" :size="12" />
                <span>{{ dest.trang_thai_wilson === 'diem_sang' ? 'Điểm Sáng Du Lịch' : 'Hoạt Động Ổn Định' }}</span>
              </span>
            </div>

            <h3 class="stacked-title">
              <router-link :to="'/diem-den/' + dest.id">
                {{ dest.ten }}
              </router-link>
            </h3>
            <p class="stacked-desc">{{ dest.mo_ta }}</p>

            <!-- 5 Aspect Chips (Vàng & Trắng) -->
            <div v-if="dest.khia_canh" class="stacked-aspects-grid">
              <div class="aspect-chip" title="Cảnh quan & Không gian">
                <span class="asp-lbl">Cảnh quan</span>
                <span class="asp-val"><Star :size="11" class="fill-yellow" /> {{ dest.khia_canh.canh_quan?.diem || 4.8 }}/5</span>
              </div>
              <div class="aspect-chip" title="Chất lượng phục vụ">
                <span class="asp-lbl">Dịch vụ</span>
                <span class="asp-val"><Star :size="11" class="fill-yellow" /> {{ dest.khia_canh.dich_vu?.diem || 4.7 }}/5</span>
              </div>
              <div class="aspect-chip" title="Ẩm thực & Đặc sản">
                <span class="asp-lbl">Ẩm thực</span>
                <span class="asp-val"><Star :size="11" class="fill-yellow" /> {{ dest.khia_canh.am_thuc?.diem || 4.6 }}/5</span>
              </div>
              <div class="aspect-chip" title="Vệ sinh & Môi trường">
                <span class="asp-lbl">Vệ sinh</span>
                <span class="asp-val"><Star :size="11" class="fill-yellow" /> {{ dest.khia_canh.ve_sinh?.diem || 4.9 }}/5</span>
              </div>
              <div class="aspect-chip" title="Giá cả & Minh bạch">
                <span class="asp-lbl">Giá cả</span>
                <span class="asp-val"><Star :size="11" class="fill-yellow" /> {{ dest.khia_canh.gia_ca?.diem || 4.5 }}/5</span>
              </div>
            </div>
          </div>

          <!-- 4. Rating & Actions Column -->
          <div class="stacked-action-col">
            <div class="stacked-rating-card">
              <div class="score-display-row">
                <span class="score-big">{{ dest.diem_danh_tieng_tb }}</span>
                <span class="score-max">/ 5.0</span>
              </div>
              <div class="score-stars">
                <Star v-for="s in 5" :key="s" :size="13" class="fill-yellow" />
              </div>
              <div class="score-subtext">
                <router-link :to="'/danh-sach-danh-gia?diem_den_id=' + dest.id" class="stacked-rev-link" :title="'Xem riêng ' + dest.tong_luot_danh_gia + ' đánh giá TripAdvisor'">
                  <strong>{{ dest.tong_luot_danh_gia }}</strong> đánh giá TripAdvisor
                </router-link>
              </div>
              <div class="wilson-stat-tag">
                <span>Wilson: <strong>{{ dest.khoang_tin_cay_wilson || '0.884 - 0.957' }}</strong></span>
              </div>
            </div>

            <div class="stacked-buttons-wrap">
              <router-link :to="'/diem-den/' + dest.id" class="stacked-btn-primary">
                <span>Chi Tiết</span>
                <ArrowRight :size="15" />
              </router-link>
              <button 
                v-if="dest.trang_thai_wilson === 'diem_sang'"
                @click="nhanVoucher(dest)"
                class="stacked-btn-voucher"
                title="Nhận mã voucher giảm giá 15% sử dụng trong 15 phút"
              >
                <Gift :size="14" />
                <span>Nhận ưu đãi 15%</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- 4B. Destinations Cards Grid (KHI CHỌN LƯỚI) -->
      <div v-if="danhSachLoc.length > 0 && cheDoHienThi === 'luoi'" class="destinations-grid">
        <article 
          v-for="d in danhSachLoc" 
          :key="d.id" 
          class="nevio-destination-card anim-hover-lift"
        >
          <!-- Card Image & Floating Badges -->
          <div class="card-image-wrap">
            <img 
              :src="d.hinh_anh" 
              :alt="d.ten" 
              class="card-img" 
              loading="lazy"
              @error="xuLyLoiAnh($event, d.id)"
            />
            <div class="card-image-gradient"></div>

            <div class="badge-region">
              <MapPin :size="12" />
              <span>{{ d.tinh_thanh }}</span>
            </div>

            <div :class="['badge-wilson-status', 'badge-' + d.trang_thai_wilson]">
              <Sparkles v-if="d.trang_thai_wilson === 'diem_sang'" :size="13" />
              <ShieldCheck v-else :size="13" />
              <span>{{ d.nhan_trang_thai }}</span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="card-body">
            <div class="card-category">{{ d.loai_hinh }}</div>
            <h2 class="card-title">
              <router-link :to="'/diem-den/' + d.id">{{ d.ten_rut_gon || d.ten }}</router-link>
            </h2>
            <p class="card-description">{{ d.mo_ta }}</p>

            <!-- 5 ABSA Aspects Miniature Bars -->
            <div class="aspects-breakdown">
              <div class="aspect-row">
                <span class="aspect-label">Cảnh quan</span>
                <div class="progress-bar-bg">
                  <div class="progress-fill bar-landscape" :style="{ width: (d.khia_canh?.canh_quan?.tich_cuc || 95) + '%' }"></div>
                </div>
                <span class="aspect-val">{{ d.khia_canh?.canh_quan?.diem || 4.9 }}/5</span>
              </div>
              <div class="aspect-row">
                <span class="aspect-label">Dịch vụ</span>
                <div class="progress-bar-bg">
                  <div class="progress-fill bar-service" :style="{ width: (d.khia_canh?.dich_vu?.tich_cuc || 90) + '%' }"></div>
                </div>
                <span class="aspect-val">{{ d.khia_canh?.dich_vu?.diem || 4.7 }}/5</span>
              </div>
              <div class="aspect-row">
                <span class="aspect-label">Vệ sinh</span>
                <div class="progress-bar-bg">
                  <div class="progress-fill bar-clean" :style="{ width: (d.khia_canh?.ve_sinh?.tich_cuc || 92) + '%' }"></div>
                </div>
                <span class="aspect-val">{{ d.khia_canh?.ve_sinh?.diem || 4.8 }}/5</span>
              </div>
            </div>

            <!-- Wilson Score & TripAdvisor Stats -->
            <div class="card-stats-box">
              <div class="stat-item">
                <span class="stat-lbl">Khoảng tin cậy Wilson</span>
                <strong class="stat-num text-yellow">{{ d.khoang_tin_cay_wilson || '0.850 - 0.940' }}</strong>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-lbl">Đánh giá TripAdvisor</span>
                <router-link :to="'/danh-sach-danh-gia?diem_den_id=' + d.id" class="stat-num-link" :title="'Xem riêng ' + d.tong_luot_danh_gia + ' đánh giá của ' + (d.ten_rut_gon || d.ten)">
                  <strong class="stat-num text-underline">{{ d.tong_luot_danh_gia }} lượt</strong>
                </router-link>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-lbl">Tỷ lệ hài lòng</span>
                <strong class="stat-num text-yellow">{{ d.ty_le_tich_cuc }}%</strong>
              </div>
            </div>

            <!-- Card Actions -->
            <div class="card-actions-row">
              <router-link :to="'/diem-den/' + d.id" class="btn-card-outline">
                <span>Chi tiết &amp; Đánh giá</span>
                <ArrowRight :size="15" />
              </router-link>

              <button 
                @click="nhanVoucher(d)" 
                :disabled="d.trang_thai_wilson !== 'diem_sang'"
                :class="['btn-card-action', { 'btn-yellow': d.trang_thai_wilson === 'diem_sang', 'btn-disabled': d.trang_thai_wilson !== 'diem_sang' }]"
                :title="d.trang_thai_wilson === 'diem_sang' ? 'Nhận mã ưu đãi bảo chứng' : 'Chỉ mở ưu đãi cho Điểm sáng du lịch'"
              >
                <Gift :size="15" />
                <span>{{ d.trang_thai_wilson === 'diem_sang' ? 'Nhận Ưu Đãi' : 'Chưa Mở Khóa' }}</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- 5. Wilson Score Comparison Table -->
      <section class="section-comparison">
        <div class="section-header">
          <span class="nevio-label">ĐỐI SOÁT MINH BẠCH</span>
          <h2 class="section-title">Bảng Đối Soát Chỉ Số Wilson Score 95%</h2>
          <p class="section-desc">
            Toán học phân bổ nhị thức khách quan: Xếp hạng được căn cứ vào cận dưới khoảng tin cậy Wilson để không bị thao túng bởi số lượng review ít.
          </p>
        </div>

        <div class="comparison-table-wrapper">
          <table class="nevio-table">
            <thead>
              <tr>
                <th>Hạng</th>
                <th>Điểm đến</th>
                <th>Địa phương</th>
                <th>TripAdvisor Review</th>
                <th>Tỷ lệ khen</th>
                <th>Wilson 95% Cận dưới</th>
                <th>Phân loại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in dsDiemDen" :key="item.id">
                <td>
                  <span :class="['rank-badge', { 'rank-top': idx < 3 }]">#{{ idx + 1 }}</span>
                </td>
                <td>
                  <strong>{{ item.ten_rut_gon || item.ten }}</strong>
                  <div class="text-xs text-muted">{{ item.loai_hinh }}</div>
                </td>
                <td>{{ item.tinh_thanh }}</td>
                <td>
                  <router-link :to="'/danh-sach-danh-gia?diem_den_id=' + item.id" class="table-link text-underline" :title="'Xem riêng ' + item.tong_luot_danh_gia + ' đánh giá của ' + (item.ten_rut_gon || item.ten)">
                    {{ item.tong_luot_danh_gia }} review
                  </router-link>
                </td>
                <td><strong class="text-yellow">{{ item.ty_le_tich_cuc }}%</strong></td>
                <td><code class="code-wilson">{{ item.khoang_tin_cay_wilson }}</code></td>
                <td>
                  <span :class="['table-status-pill', 'pill-' + item.trang_thai_wilson]">
                    {{ item.nhan_trang_thai }}
                  </span>
                </td>
                <td>
                  <router-link :to="'/diem-den/' + item.id" class="table-link">
                    Xem ABSA →
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <!-- Voucher Success Toast Modal -->
    <div v-if="voucherToast" class="voucher-modal-overlay" @click.self="voucherToast = null">
      <div class="voucher-modal-card anim-pop">
        <div class="modal-icon-wrap">
          <Sparkles :size="28" class="text-yellow" />
        </div>
        <h3 class="modal-title">Nhận Ưu Đãi Thành Công!</h3>
        <p class="modal-dest">{{ voucherToast.diem_den }}</p>
        <p class="modal-desc">{{ voucherToast.uu_dai_chi_tiet }}</p>
        <div class="modal-code-box">
          <span class="code-lbl">MÃ ƯU ĐÃI:</span>
          <code class="code-val">{{ voucherToast.ma_tham_chieu }}</code>
        </div>
        <p class="modal-meta">Mã đã được lưu vào <strong>Ví Phiếu Của Tôi</strong>. Hiệu lực trong 15 phút.</p>
        <div class="modal-actions">
          <router-link to="/phieu-cua-toi" class="btn-goto-wallet">
            Xem Ví Phiếu Của Tôi
          </router-link>
          <button @click="voucherToast = null" class="btn-close-modal">
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Crown, 
  Layers, 
  LayoutGrid, 
  Star, 
  Search, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Gift, 
  RotateCcw, 
  X, 
  Award 
} from 'lucide-vue-next'
import { DataService } from '../services/dataService'

const dsDiemDen = ref([])
const cheDoHienThi = ref('xep_chong')
const tuKhoa = ref('')
const locTinhThanh = ref('')
const locTrangThai = ref('')
const voucherToast = ref(null)
const laAdmin = computed(() => localStorage.getItem('vai_tro') === 'admin')

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80'

function xuLyLoiAnh(event, diemDenId) {
  event.target.src = FALLBACK_IMAGE
}

const danhSachLoc = computed(() => {
  return dsDiemDen.value.filter(d => {
    if (tuKhoa.value) {
      const kw = tuKhoa.value.toLowerCase()
      const matchTen = d.ten.toLowerCase().includes(kw) || (d.ten_rut_gon && d.ten_rut_gon.toLowerCase().includes(kw))
      const matchDiaChi = d.dia_chi && d.dia_chi.toLowerCase().includes(kw)
      if (!matchTen && !matchDiaChi) return false
    }
    if (locTinhThanh.value && d.tinh_thanh !== locTinhThanh.value) {
      return false
    }
    if (locTrangThai.value && d.trang_thai_wilson !== locTrangThai.value) {
      return false
    }
    return true
  })
})

function datLaiBoLoc() {
  tuKhoa.value = ''
  locTinhThanh.value = ''
  locTrangThai.value = ''
}

async function nhanVoucher(diemDen) {
  if (diemDen.trang_thai_wilson !== 'diem_sang') return
  const phieu = await DataService.nhanUuDai(diemDen.id)
  voucherToast.value = phieu
}

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
})
</script>

<style scoped>
.nevio-destinations-page {
  padding: 40px 0 80px 0;
  background-color: var(--mau-nen);
}

.nevio-container {
  max-width: var(--max-rong);
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.page-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 36px auto;
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

.admin-notice-bar {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  color: #92400e;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 13px;
  margin-top: 14px;
}

[data-theme="dark"] .admin-notice-bar {
  background: #1e2434;
  border-color: #fddd62;
  color: #fddd62;
}

.link-admin-panel {
  font-weight: 700;
  text-decoration: underline;
  color: #b45309;
}

[data-theme="dark"] .link-admin-panel {
  color: #fddd62;
}

/* Filter Toolbar */
.filter-toolbar {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-subtle);
}

.search-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 10px 16px;
}

.input-search {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  font-size: 14.5px;
  color: var(--mau-chu);
}

.btn-clear {
  background: none;
  border: none;
  color: var(--mau-chu-mo);
  cursor: pointer;
}

.filters-row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.select-field {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 8px 14px;
  flex: 1;
  min-width: 200px;
}

.filter-select {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: inherit;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--mau-chu);
  cursor: pointer;
}

.btn-reset {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 9px 16px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 600;
  color: var(--mau-chu);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-reset:hover {
  background: var(--nevio-border);
}

/* Result summary bar */
.result-summary-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--mau-chu-phu);
}

.status-legend {
  display: flex;
  gap: 12px;
}

.legend-pill {
  font-size: 12px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.legend-pill.pill-bright {
  background: #fef9c3;
  color: #854d0e;
  display: flex;
  align-items: center;
  gap: 5px;
}

.legend-pill.pill-stable {
  background: var(--nevio-light-grey);
  color: var(--mau-chu-phu);
}

/* Destinations Grid */
.destinations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 28px;
  margin-bottom: 60px;
}

.nevio-destination-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.nevio-destination-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.card-image-wrap {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.nevio-destination-card:hover .card-img {
  transform: scale(1.05);
}

.card-image-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
}

.badge-region {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(8px);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px;
}

.badge-wilson-status {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 5px;
}

.badge-diem_sang {
  background: #fddd62;
  color: #303030;
}

.badge-binh_thuong {
  background: rgba(255, 255, 255, 0.9);
  color: #303030;
}

.card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-category {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--nevio-orange);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.card-title {
  font-size: 19px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 8px;
  line-height: 1.3;
}

.card-title a {
  color: inherit;
  text-decoration: none;
}

.card-title a:hover {
  color: #d97706;
}

.card-description {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Aspects miniature */
.aspects-breakdown {
  background: var(--nevio-light-grey);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aspect-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
}

.aspect-label {
  width: 65px;
  font-weight: 600;
  color: var(--mau-chu);
}

.progress-bar-bg {
  flex: 1;
  height: 6px;
  background: rgba(0,0,0,0.06);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 9999px;
}

.bar-landscape { background: #10b981; }
.bar-service { background: #f59e0b; }
.bar-clean { background: #06b6d4; }

.aspect-val {
  font-weight: 700;
  color: var(--mau-chu-phu);
  font-size: 11px;
}

/* Stats box */
.card-stats-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-top: 1px solid var(--nevio-border);
  border-bottom: 1px solid var(--nevio-border);
  margin-bottom: 18px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-lbl {
  font-size: 10.5px;
  color: var(--mau-chu-phu);
  text-transform: uppercase;
}

.stat-num {
  font-size: 13px;
  font-weight: 800;
  color: var(--mau-chu);
}

.stat-divider {
  width: 1px;
  height: 24px;
  background: var(--nevio-border);
}

.text-yellow { color: #b45309; }
.text-emerald { color: #b45309; } [data-theme="dark"] .text-emerald { color: #fddd62; }

.stat-num-link {
  text-decoration: none;
  color: inherit;
}

.text-underline {
  text-decoration: underline;
  text-decoration-color: #d97706;
}

/* Card Actions */
.card-actions-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
}

.btn-card-outline {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 14px;
  background: transparent;
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
  text-decoration: none;
  transition: all 0.2s;
}

.btn-card-outline:hover {
  background: var(--nevio-light-grey);
}

.btn-card-action {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-yellow {
  background: #fddd62;
  color: #303030;
}

.btn-yellow:hover {
  background: #fcd34d;
  transform: translateY(-1px);
}

.btn-disabled {
  background: var(--nevio-light-grey);
  color: var(--mau-chu-mo);
  cursor: not-allowed;
  border: 1px solid var(--nevio-border);
}

/* Comparison Section */
.section-comparison {
  margin-top: 60px;
}

.section-header {
  text-align: center;
  max-width: 750px;
  margin: 0 auto 30px auto;
}

.nevio-label {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--nevio-orange);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title {
  font-size: clamp(24px, 3.5vw, 32px);
  font-weight: 800;
  color: var(--mau-chu);
  margin: 6px 0 12px 0;
}

.section-desc {
  font-size: 14.5px;
  color: var(--mau-chu-phu);
  line-height: 1.6;
}

.comparison-table-wrapper {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  box-shadow: var(--shadow-card);
}

.nevio-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.nevio-table th {
  background: var(--nevio-light-grey);
  padding: 14px 18px;
  font-weight: 700;
  color: var(--mau-chu);
  border-bottom: 1px solid var(--nevio-border);
  white-space: nowrap;
}

.nevio-table td {
  padding: 14px 18px;
  border-bottom: 1px solid var(--nevio-border);
  color: var(--mau-chu);
  vertical-align: middle;
}

.nevio-table tbody tr:hover {
  background: rgba(0, 0, 0, 0.02);
}

.rank-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--nevio-light-grey);
  font-weight: 800;
  font-size: 12px;
}

.rank-top {
  background: #fddd62;
  color: #303030;
}

.code-wilson {
  font-family: monospace;
  font-size: 12px;
  background: var(--nevio-light-grey);
  padding: 3px 8px;
  border-radius: 4px;
}

.table-status-pill {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.pill-diem_sang {
  background: #ecfdf5;
  color: #047857;
}

.pill-binh_thuong {
  background: var(--nevio-light-grey);
  color: var(--mau-chu-phu);
}

.table-link {
  color: var(--mau-chu);
  font-weight: 700;
  text-decoration: none;
  font-size: 12.5px;
}

.table-link:hover {
  color: #d97706;
}

.text-xs { font-size: 11.5px; }

/* Voucher modal */
.voucher-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.voucher-modal-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 36px 30px;
  max-width: 460px;
  width: 100%;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #303030;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
}

.modal-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.modal-dest {
  font-size: 15px;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 8px;
}

.modal-desc {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
  margin-bottom: 20px;
  line-height: 1.5;
}

.modal-code-box {
  background: var(--nevio-light-grey);
  border: 1px dashed var(--nevio-border);
  padding: 12px;
  border-radius: var(--radius-md);
  margin-bottom: 14px;
}

.code-lbl {
  font-size: 11px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  display: block;
  margin-bottom: 4px;
}

.code-val {
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #d97706;
  font-family: monospace;
}

.modal-meta {
  font-size: 12px;
  color: var(--mau-chu-mo);
  margin-bottom: 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
}

.btn-goto-wallet {
  flex: 1;
  background: #fddd62;
  color: #303030;
  padding: 12px;
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 13.5px;
  text-decoration: none;
}

.btn-close-modal {
  padding: 12px 20px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 13.5px;
  color: var(--mau-chu);
  cursor: pointer;
}
</style>

/* ================= STACKED LEADERBOARD UX STYLES ================= */
.summary-right-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.view-mode-toggles {
  display: inline-flex;
  align-items: center;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  padding: 3px;
  gap: 2px;
}

.btn-toggle-mode {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-toggle-mode:hover {
  color: var(--mau-chu);
}

.btn-toggle-mode.active {
  background: #ffffff;
  color: #18181b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .btn-toggle-mode.active {
  background: #fddd62;
  color: #18181b;
}

.destinations-stacked-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.stacked-dest-card {
  display: grid;
  grid-template-columns: 80px 240px 1fr 220px;
  gap: 20px;
  align-items: center;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 16px 20px;
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: var(--shadow-subtle);
}

.stacked-dest-card:hover {
  border-color: #fddd62;
  box-shadow: 0 12px 32px -4px rgba(253, 221, 98, 0.12), 0 8px 16px -2px rgba(0, 0, 0, 0.04);
}

.stacked-rank-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.rank-badge-box {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu-phu);
  position: relative;
  transition: all 0.2s ease;
}

.rank-digits {
  font-size: 18px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.rank-crown-icon {
  color: #f59e0b;
  margin-bottom: -2px;
}

.rank-badge-box.rank-gold {
  background: #fef3c7;
  border-color: #fde68a;
  color: #b45309;
}

[data-theme="dark"] .rank-badge-box.rank-gold {
  background: rgba(253, 221, 98, 0.15);
  border-color: #fddd62;
  color: #fddd62;
}

.rank-caption {
  font-size: 11px;
  font-weight: 700;
  color: var(--mau-chu-mo);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.stacked-image-wrap {
  width: 100%;
  height: 140px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  position: relative;
}

.stacked-dest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.stacked-dest-card:hover .stacked-dest-img {
  transform: scale(1.05);
}

.stacked-location-pill {
  position: absolute;
  top: 10px;
  left: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(24, 24, 27, 0.75);
  backdrop-filter: blur(6px);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
}

.stacked-info-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stacked-top-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.stacked-category-pill {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--mau-chu-mo);
}

.stacked-wilson-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: var(--radius-full);
}

.stacked-wilson-pill.status-diem_sang {
  background: rgba(253, 221, 98, 0.18);
  color: #92400e;
  border: 1px solid rgba(253, 221, 98, 0.4);
}

[data-theme="dark"] .stacked-wilson-pill.status-diem_sang {
  color: #fddd62;
  border-color: #fddd62;
}

.stacked-wilson-pill.status-binh_thuong {
  background: rgba(24, 24, 27, 0.06);
  color: var(--mau-chu-phu);
}

.stacked-title {
  font-size: 18px;
  font-weight: 800;
  line-height: 1.3;
}

.stacked-title a {
  color: var(--mau-chu);
  text-decoration: none;
  transition: color 0.2s ease;
}

.stacked-title a:hover {
  color: #b45309;
}

[data-theme="dark"] .stacked-title a:hover {
  color: #fddd62;
}

.stacked-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mau-chu-phu);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stacked-aspects-grid {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
}

.aspect-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  color: var(--mau-chu);
}

.asp-lbl {
  color: var(--mau-chu-mo);
}

.asp-val {
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.fill-yellow {
  fill: #fddd62;
  color: #fddd62;
}

.stacked-action-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-left: 12px;
  border-left: 1px dashed var(--nevio-border);
}

.stacked-rating-card {
  text-align: center;
}

.score-display-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}

.score-big {
  font-size: 26px;
  font-weight: 900;
  color: var(--mau-chu);
}

.score-max {
  font-size: 12px;
  color: var(--mau-chu-mo);
}

.score-stars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  margin: 2px 0 4px 0;
}

.score-subtext {
  font-size: 11px;
  color: var(--mau-chu-phu);
}

.stacked-rev-link {
  color: inherit;
  text-decoration: underline;
}

.wilson-stat-tag {
  margin-top: 4px;
  font-size: 11px;
  color: var(--mau-chu-mo);
}

.stacked-buttons-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.stacked-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--nevio-dark);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.stacked-btn-primary:hover {
  background: #000000;
  transform: translateY(-1px);
}

[data-theme="dark"] .stacked-btn-primary {
  background: #ffffff;
  color: #18181b;
}

.stacked-btn-voucher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #fddd62;
  color: #18181b;
  border: 1px solid #e5be29;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.stacked-btn-voucher:hover {
  background: #facc15;
  transform: translateY(-1px);
}

/* Responsive Stacked List for Mobile */
@media (max-width: 992px) {
  .stacked-dest-card {
    grid-template-columns: 60px 180px 1fr;
  }
  .stacked-action-col {
    grid-column: 1 / -1;
    border-left: none;
    border-top: 1px dashed var(--nevio-border);
    padding-left: 0;
    padding-top: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .stacked-buttons-wrap {
    flex-direction: row;
  }
}

@media (max-width: 768px) {
  .stacked-dest-card {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .stacked-rank-col {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .stacked-image-wrap {
    height: 180px;
  }
  .stacked-action-col {
    flex-direction: column;
    align-items: stretch;
  }
  .stacked-buttons-wrap {
    flex-direction: column;
  }
}
