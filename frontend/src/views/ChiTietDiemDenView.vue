<template>
  <div class="nevio-destination-detail">
    <!-- 1. Hero Cover Banner with Image & Breadcrumb -->
    <div v-if="diemDen" class="detail-hero-banner" :style="{ backgroundImage: `url(${diemDen.hinh_anh})` }">
      <div class="banner-gradient-overlay"></div>
      <div class="nevio-container banner-content">
        <nav class="detail-breadcrumbs" aria-label="Đường dẫn điều hướng">
          <router-link to="/dashboard" class="crumb-link">Khám Phá</router-link>
          <span class="sep">/</span>
          <router-link to="/diem-den" class="crumb-link">Danh Mục Điểm Đến</router-link>
          <span class="sep">/</span>
          <span class="current">{{ diemDen.ten_rut_gon || diemDen.ten }}</span>
        </nav>

        <div class="banner-meta-row">
          <span :class="['banner-status-badge', 'badge-' + (diemDen.trang_thai_wilson || 'binh_thuong')]">
            <Sparkles v-if="diemDen.trang_thai_wilson === 'diem_sang'" :size="13" />
            <AlertTriangle v-else-if="diemDen.trang_thai_wilson === 'canh_bao'" :size="13" />
            <CheckCircle2 v-else :size="13" />
            <span>{{ diemDen.trang_thai_wilson === 'diem_sang' ? 'Điểm sáng du lịch đạt chuẩn Wilson' : diemDen.trang_thai_wilson === 'canh_bao' ? 'Cần chú ý chất lượng' : 'Hoạt động ổn định' }}</span>
          </span>
          <span class="banner-category-tag">
            <MapPin :size="13" />
            <span>{{ diemDen.dia_chi || diemDen.tinh_thanh }}</span>
          </span>
        </div>

        <h1 class="banner-title">{{ diemDen.ten }}</h1>
        <p class="banner-category-sub">{{ diemDen.loai_hinh }}</p>

        <div class="banner-score-strip">
          <div class="score-pill">
            <Star :size="15" class="fill-yellow" />
            <span class="score-val">{{ diemDen.diem_danh_tieng_tb || '4.8' }}</span>
            <span class="score-max">/ 5.0</span>
          </div>
          <span class="strip-divider">·</span>
          <span class="review-total-text"><strong>{{ diemDen.tong_luot_danh_gia || 164 }}</strong> đánh giá TripAdvisor đã kiểm chứng</span>
          <span class="strip-divider">·</span>
          <span class="positive-rate-text">● {{ diemDen.ty_le_tich_cuc || 93.2 }}% Tích cực</span>
        </div>
      </div>
    </div>

    <!-- 2. Main Two-Column Layout -->
    <div class="nevio-container detail-main-layout">
      <!-- Loading State -->
      <div v-if="dangTai" class="loading-box">
        <p>Đang tải thông tin điểm đến và phân tích ABSA...</p>
      </div>

      <template v-else-if="diemDen">
        <!-- ================= LEFT COLUMN: CONTENT & ANALYTICS ================= -->
        <div class="detail-left-col">
          <!-- Overview Card -->
          <section class="detail-card">
            <h2 class="card-section-title">Giới Thiệu Điểm Đến</h2>
            <p class="destination-description-text">{{ diemDen.mo_ta }}</p>

            <!-- Gallery Strip -->
            <div v-if="diemDen.hinh_anh_phu && diemDen.hinh_anh_phu.length > 0" class="photo-gallery-strip">
              <img 
                v-for="(img, idx) in diemDen.hinh_anh_phu" 
                :key="idx" 
                :src="img" 
                :alt="diemDen.ten + ' ảnh ' + (idx + 1)"
                class="gallery-thumb"
              />
            </div>
          </section>

          <!-- ABSA 5-Aspect Scorecards with Lucide Icons -->
          <section class="detail-card">
            <div class="card-head-flex">
              <div>
                <span class="nevio-label">PHÂN TÍCH CHUYÊN SÂU</span>
                <h2 class="card-section-title">Chỉ Số Đánh Giá Theo 5 Khía Cạnh (ABSA)</h2>
              </div>
              <span class="badge-pill absa-chip">PhoBERT AI</span>
            </div>
            <p class="section-subtext">
              Hệ thống tự động phân tách ý kiến du khách thành 5 tiêu chí độc lập, tính toán tỷ lệ hài lòng theo phương pháp trích xuất sắc thái khía cạnh.
            </p>

            <div v-if="diemDen.khia_canh" class="aspects-list-container">
              <!-- Aspect 1: Cảnh quan -->
              <div class="aspect-metric-row">
                <div class="aspect-row-top">
                  <span class="aspect-title"><Trees :size="16" class="icon-inline" /> Cảnh quan &amp; Không gian</span>
                  <span class="aspect-score-text">{{ diemDen.khia_canh.canh_quan?.diem }}/5.0 ({{ diemDen.khia_canh.canh_quan?.tich_cuc }}% Tích cực)</span>
                </div>
                <div class="aspect-bar">
                  <div class="bar-pos" :style="{ width: diemDen.khia_canh.canh_quan?.tich_cuc + '%' }"></div>
                  <div class="bar-neg" :style="{ width: diemDen.khia_canh.canh_quan?.tieu_cuc + '%' }"></div>
                </div>
                <p class="aspect-comment">"{{ diemDen.khia_canh.canh_quan?.mo_ta }}"</p>
              </div>

              <!-- Aspect 2: Dịch vụ -->
              <div class="aspect-metric-row">
                <div class="aspect-row-top">
                  <span class="aspect-title"><HeartHandshake :size="16" class="icon-inline" /> Chất lượng phục vụ</span>
                  <span class="aspect-score-text">{{ diemDen.khia_canh.dich_vu?.diem }}/5.0 ({{ diemDen.khia_canh.dich_vu?.tich_cuc }}% Tích cực)</span>
                </div>
                <div class="aspect-bar">
                  <div class="bar-pos" :style="{ width: diemDen.khia_canh.dich_vu?.tich_cuc + '%' }"></div>
                  <div class="bar-neg" :style="{ width: diemDen.khia_canh.dich_vu?.tieu_cuc + '%' }"></div>
                </div>
                <p class="aspect-comment">"{{ diemDen.khia_canh.dich_vu?.mo_ta }}"</p>
              </div>

              <!-- Aspect 3: Ẩm thực -->
              <div class="aspect-metric-row">
                <div class="aspect-row-top">
                  <span class="aspect-title"><Utensils :size="16" class="icon-inline" /> Ẩm thực &amp; Đặc sản</span>
                  <span class="aspect-score-text">{{ diemDen.khia_canh.am_thuc?.diem }}/5.0 ({{ diemDen.khia_canh.am_thuc?.tich_cuc }}% Tích cực)</span>
                </div>
                <div class="aspect-bar">
                  <div class="bar-pos" :style="{ width: diemDen.khia_canh.am_thuc?.tich_cuc + '%' }"></div>
                  <div class="bar-neg" :style="{ width: diemDen.khia_canh.am_thuc?.tieu_cuc + '%' }"></div>
                </div>
                <p class="aspect-comment">"{{ diemDen.khia_canh.am_thuc?.mo_ta }}"</p>
              </div>

              <!-- Aspect 4: Vệ sinh -->
              <div class="aspect-metric-row">
                <div class="aspect-row-top">
                  <span class="aspect-title"><Sparkles :size="16" class="icon-inline" /> Vệ sinh &amp; Môi trường</span>
                  <span class="aspect-score-text">{{ diemDen.khia_canh.ve_sinh?.diem }}/5.0 ({{ diemDen.khia_canh.ve_sinh?.tich_cuc }}% Tích cực)</span>
                </div>
                <div class="aspect-bar">
                  <div class="bar-pos" :style="{ width: diemDen.khia_canh.ve_sinh?.tich_cuc + '%' }"></div>
                  <div class="bar-neg" :style="{ width: diemDen.khia_canh.ve_sinh?.tieu_cuc + '%' }"></div>
                </div>
                <p class="aspect-comment">"{{ diemDen.khia_canh.ve_sinh?.mo_ta }}"</p>
              </div>

              <!-- Aspect 5: Giá cả -->
              <div class="aspect-metric-row">
                <div class="aspect-row-top">
                  <span class="aspect-title"><DollarSign :size="16" class="icon-inline" /> Giá cả &amp; Độ minh bạch</span>
                  <span class="aspect-score-text">{{ diemDen.khia_canh.gia_ca?.diem }}/5.0 ({{ diemDen.khia_canh.gia_ca?.tich_cuc }}% Tích cực)</span>
                </div>
                <div class="aspect-bar">
                  <div class="bar-pos" :style="{ width: diemDen.khia_canh.gia_ca?.tich_cuc + '%' }"></div>
                  <div class="bar-neg" :style="{ width: diemDen.khia_canh.gia_ca?.tieu_cuc + '%' }"></div>
                </div>
                <p class="aspect-comment">"{{ diemDen.khia_canh.gia_ca?.mo_ta }}"</p>
              </div>
            </div>
          </section>

          <!-- Destination Reviews Tab -->
          <section class="detail-card">
            <div class="card-head-flex">
              <div>
                <span class="nevio-label">TRIPADVISOR VERIFIED REVIEWS</span>
                <h2 class="card-section-title">Đánh Giá Thực Tế ({{ danhGiaCuaDiemDen.length }} lượt)</h2>
                <p class="section-review-subtitle">
                  Đánh giá nguyên văn từ du khách TripAdvisor trải nghiệm tại {{ diemDen?.ten_rut_gon || diemDen?.ten }}.
                </p>
              </div>
              <router-link :to="'/danh-sach-danh-gia?diem_den_id=' + (diemDen?.id || id)" class="link-all-reviews">
                <span>Xem tất cả {{ danhGiaCuaDiemDen.length }} đánh giá của điểm đến này</span>
                <ArrowRight :size="14" />
              </router-link>
            </div>

            <!-- STAR RATING FILTER PILLS -->
            <div class="dest-star-filters-bar">
              <button 
                @click="locSaoHienTai = 0; soLuongHienThi = 6" 
                :class="['btn-star-filter', { active: locSaoHienTai === 0 }]"
                type="button"
              >
                <span>Tất cả</span>
                <span class="count-badge">{{ danhGiaCuaDiemDen.length }}</span>
              </button>

              <button 
                v-if="demSoLuongSao(5) > 0"
                @click="locSaoHienTai = 5; soLuongHienThi = 6" 
                :class="['btn-star-filter', { active: locSaoHienTai === 5 }]"
                type="button"
              >
                <div class="star-pill-icons">
                  <Star v-for="s in 5" :key="s" :size="11" class="star fill-yellow" />
                </div>
                <span>5 sao</span>
                <span class="count-badge">{{ demSoLuongSao(5) }}</span>
              </button>

              <button 
                v-if="demSoLuongSao(4) > 0"
                @click="locSaoHienTai = 4; soLuongHienThi = 6" 
                :class="['btn-star-filter', { active: locSaoHienTai === 4 }]"
                type="button"
              >
                <div class="star-pill-icons">
                  <Star v-for="s in 4" :key="s" :size="11" class="star fill-yellow" />
                  <Star :size="11" class="star" />
                </div>
                <span>4 sao</span>
                <span class="count-badge">{{ demSoLuongSao(4) }}</span>
              </button>

              <button 
                v-if="demSoLuongSao(3) > 0"
                @click="locSaoHienTai = 3; soLuongHienThi = 6" 
                :class="['btn-star-filter', { active: locSaoHienTai === 3 }]"
                type="button"
              >
                <div class="star-pill-icons">
                  <Star v-for="s in 3" :key="s" :size="11" class="star fill-yellow" />
                  <Star v-for="s in 2" :key="s" :size="11" class="star" />
                </div>
                <span>3 sao</span>
                <span class="count-badge">{{ demSoLuongSao(3) }}</span>
              </button>

              <button 
                v-if="demSoLuongSao(1) > 0"
                @click="locSaoHienTai = 1; soLuongHienThi = 6" 
                :class="['btn-star-filter', { active: locSaoHienTai === 1 }]"
                type="button"
              >
                <div class="star-pill-icons">
                  <Star :size="11" class="star fill-orange" />
                  <Star v-for="s in 4" :key="s" :size="11" class="star" />
                </div>
                <span>1-2 sao</span>
                <span class="count-badge">{{ demSoLuongSao(1) }}</span>
              </button>
            </div>

            <div class="dest-reviews-list">
              <div v-for="rev in danhGiaHienThi" :key="rev.id" class="dest-review-item">
                <div class="rev-header">
                  <div class="rev-user">
                    <span class="rev-avatar">{{ rev.nguoi_danh_gia.charAt(0) }}</span>
                    <div>
                      <strong>{{ rev.nguoi_danh_gia }}</strong>
                      <span class="rev-date">{{ rev.quoc_gia }} · {{ rev.ngay_dang }}</span>
                    </div>
                  </div>
                  <div class="rev-rating-wrap">
                    <div class="rev-rating">
                      <Star 
                        v-for="s in 5" 
                        :key="s" 
                        :size="14" 
                        :class="['star', { 'fill-yellow': s <= (rev.diem_so || 5), 'empty-star': s > (rev.diem_so || 5) }]" 
                      />
                    </div>
                    <span :class="['rev-score-badge', 'badge-score-' + (rev.diem_so || 5)]">
                      {{ rev.diem_so || 5 }}/5 · {{ getRatingLabel(rev.diem_so || 5) }}
                    </span>
                  </div>
                </div>
                <h4 class="rev-title">{{ rev.tieu_de }}</h4>
                <p class="rev-text">{{ rev.noi_dung }}</p>
                <div class="rev-tags">
                  <span 
                    v-for="(tag, tIdx) in rev.khia_canh_tags" 
                    :key="tIdx"
                    :class="['tag-pill', 'tag-' + tag.sac_thai]"
                  >
                    {{ tag.khia_canh }}: {{ tag.chi_tiet }}
                  </span>
                </div>
              </div>

              <div v-if="danhGiaHienThi.length === 0" class="no-star-reviews-alert">
                <p>Không có đánh giá {{ locSaoHienTai }} sao nào cho điểm đến này.</p>
                <button @click="locSaoHienTai = 0" class="btn-clear-star-filter" type="button">Xem tất cả đánh giá</button>
              </div>
            </div>

            <!-- Load more or view in review center -->
            <div v-if="danhGiaDaLoc.length > soLuongHienThi" class="reviews-load-more-wrap">
              <button @click="soLuongHienThi += 6" class="btn-load-more-reviews" type="button">
                Tải thêm 6 đánh giá (còn {{ danhGiaDaLoc.length - soLuongHienThi }} đánh giá)
              </button>
              <router-link :to="'/danh-sach-danh-gia?diem_den_id=' + (diemDen?.id || id)" class="btn-see-all-target-reviews">
                Tra cứu đầy đủ {{ danhGiaCuaDiemDen.length }} đánh giá tại Trung tâm dữ liệu →
              </router-link>
            </div>
          </section>
        </div>

        <!-- ================= RIGHT COLUMN: SIDEBAR ================= -->
        <aside class="detail-sidebar">
          <!-- Wilson Reputation Rating Widget -->
          <div class="sidebar-widget widget-wilson">
            <div class="widget-head">
              <ShieldCheck :size="22" class="text-emerald" />
              <div>
                <h3 class="widget-title">Định Tuyến Wilson Score</h3>
                <span class="widget-sub">Khoảng tin cậy chuẩn 95%</span>
              </div>
            </div>

            <div class="wilson-stat-box">
              <div class="wilson-score-display">
                <span class="w-val">{{ diemDen.diem_danh_tieng_tb }}</span>
                <span class="w-denom">/ 5.0</span>
              </div>
              <div class="wilson-status-label">
                <span :class="['badge-pill', 'badge-' + (diemDen.trang_thai_wilson || 'binh_thuong')]">
                  {{ diemDen.nhan_trang_thai || 'Điểm sáng du lịch' }}
                </span>
              </div>
            </div>

            <div class="wilson-details-list">
              <div class="w-detail-row">
                <span>Khoảng tin cậy Wilson:</span>
                <strong>{{ diemDen.khoang_tin_cay_wilson || '0.884 - 0.957' }}</strong>
              </div>
              <div class="w-detail-row">
                <span>Tổng đánh giá hợp lệ:</span>
                <strong>{{ diemDen.tong_luot_danh_gia }} lượt</strong>
              </div>
              <div class="w-detail-row">
                <span>Tỷ lệ tích cực quan sát:</span>
                <strong class="text-positive">{{ diemDen.ty_le_tich_cuc }}%</strong>
              </div>
            </div>

            <p class="wilson-note">
              * Điểm đến chỉ được định tuyến làm <strong>"Điểm sáng"</strong> khi cận dưới khoảng tin cậy Wilson đạt từ 0.70 trở lên, đảm bảo chất lượng thật không bị thổi phồng bởi số lượng ít.
            </p>
          </div>

          <!-- Voucher & Tour Referral Booking Box -->
          <div class="sidebar-widget widget-voucher">
            <div class="widget-head">
              <Ticket :size="22" class="text-amber" />
              <div>
                <h3 class="widget-title">Ưu Đãi Đối Tác Du Lịch</h3>
                <span class="widget-sub">Liên kết chính sách đối tác bảo chứng</span>
              </div>
            </div>

            <!-- Case A: Qualified for Voucher ("Điểm sáng") -->
            <div v-if="diemDen.trang_thai_wilson === 'diem_sang'" class="voucher-active-box">
              <div class="voucher-badge-promo">
                {{ diemDen.uu_dai?.tieu_de || 'Giảm 15% Vé Tham Quan & Dịch Vụ Tour' }}
              </div>
              <p class="voucher-limit-text">
                Hôm nay còn <strong>38/50</strong> lượt ưu đãi dành cho du khách.
              </p>

              <!-- State 1: Before Claiming -->
              <div v-if="!phieu">
                <button 
                  @click="nhanUuDai" 
                  class="btn-claim-voucher"
                  :disabled="dangXuLy"
                >
                  <Ticket :size="16" />
                  <span>{{ dangXuLy ? 'Đang tạo mã bảo mật...' : 'Nhận Phiếu Ưu Đãi Ngay' }}</span>
                </button>
              </div>

              <!-- State 2: After Claiming (Countdown Active) -->
              <div v-else class="claimed-box">
                <div class="claimed-header">
                  <span class="badge-success">✓ Đã cấp phiếu</span>
                  <div class="countdown-clock">
                    <Clock :size="13" class="inline" /> Còn lại: <strong>{{ phut }}:{{ giay }}</strong>
                  </div>
                </div>

                <div class="ticket-code-display">
                  <span class="code-lbl">MÃ THAM CHIẾU:</span>
                  <span class="code-val">{{ phieu.ma_tham_chieu }}</span>
                </div>

                <button 
                  @click="sangDoiTac" 
                  class="btn-redirect-partner"
                  :disabled="dangXuLy"
                >
                  <span>{{ dangXuLy ? 'Đang kết nối đối tác...' : 'Tiếp tục sang trang Đối tác' }}</span>
                  <ExternalLink :size="14" />
                </button>
              </div>

              <p class="partner-transparency-note">
                <strong>Minh bạch:</strong> Hệ thống có thể nhận hoa hồng giới thiệu khi du khách đặt tour thành công qua liên kết đối tác. Đánh giá danh tiếng được tính hoàn toàn độc lập với quyền lợi kinh tế.
              </p>
            </div>

            <!-- Case B: Not Qualified ("Bình thường" or "Cảnh báo") -->
            <div v-else class="voucher-locked-box">
              <div class="locked-icon">
                <ShieldCheck :size="32" class="text-muted" />
              </div>
              <h4>Chưa Mở Gói Ưu Đãi Đối Tác</h4>
              <p>
                Để bảo vệ quyền lợi du khách, hệ thống chỉ hỗ trợ kết nối ưu đãi với các điểm đến được thuật toán Wilson Score xác nhận danh hiệu <strong>"Điểm sáng du lịch"</strong> (cận dưới <strong>w ≥ 0.70</strong>).
              </p>
              <div class="locked-hint">
                Chỉ số hiện tại: {{ diemDen.diem_danh_tieng_tb }}/5.0 (Cần đạt thêm đánh giá khen ngợi để kích hoạt).
              </div>
            </div>
          </div>

          <!-- Safety Widget -->
          <div class="sidebar-widget widget-safety">
            <div class="safety-indicator safe">
              <ShieldCheck :size="24" class="text-emerald" />
              <div>
                <h4>Chỉ Số An Toàn Danh Tiếng</h4>
                <p>Không ghi nhận bất kỳ đột biến tiêu cực nào trong 30 ngày qua.</p>
              </div>
            </div>
          </div>
        </aside>
      </template>

      <!-- Error State -->
      <div v-else class="empty-state-box">
        <h3>Không tìm thấy dữ liệu điểm đến</h3>
        <router-link to="/dashboard" class="btn-back">Quay lại danh sách</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  MapPin, 
  Sparkles, 
  Star, 
  Trees, 
  HeartHandshake, 
  Utensils, 
  DollarSign, 
  Ticket, 
  Clock, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-vue-next'
import { DataService, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const diemDen = ref(null)
const dangTai = ref(true)
const dangXuLy = ref(false)
const phieu = ref(null)
const conLai = ref(900)
let timer = null

const danhGiaCuaDiemDen = ref([])
const soLuongHienThi = ref(6)
const locSaoHienTai = ref(0) // 0: Tất cả, 5: 5 sao, 4: 4 sao, 3: 3 sao, 1: 1-2 sao

function demSoLuongSao(soSao) {
  if (soSao === 1) {
    return danhGiaCuaDiemDen.value.filter(r => (r.diem_so || 5) <= 2).length
  }
  return danhGiaCuaDiemDen.value.filter(r => (r.diem_so || 5) === soSao).length
}

const danhGiaDaLoc = computed(() => {
  if (locSaoHienTai.value === 0) {
    return danhGiaCuaDiemDen.value
  }
  if (locSaoHienTai.value === 1) {
    return danhGiaCuaDiemDen.value.filter(r => (r.diem_so || 5) <= 2)
  }
  return danhGiaCuaDiemDen.value.filter(r => (r.diem_so || 5) === locSaoHienTai.value)
})

const danhGiaHienThi = computed(() => {
  return danhGiaDaLoc.value.slice(0, soLuongHienThi.value)
})

function getRatingLabel(score) {
  if (score >= 5) return 'Tuyệt vời'
  if (score === 4) return 'Rất tốt'
  if (score === 3) return 'Hài lòng'
  if (score === 2) return 'Cần cải thiện'
  return 'Kém / Thất vọng'
}

const phut = computed(() => String(Math.floor(conLai.value / 60)).padStart(2, '0'))
const giay = computed(() => String(conLai.value % 60).padStart(2, '0'))

function batDauDem() {
  clearInterval(timer)
  timer = setInterval(() => {
    conLai.value--
    if (conLai.value <= 0) {
      clearInterval(timer)
      phieu.value = null
    }
  }, 1000)
}

async function nhanUuDai() {
  dangXuLy.value = true
  try {
    const res = await DataService.nhanUuDai(id)
    phieu.value = res
    conLai.value = res.con_lai_giay || 900
    batDauDem()
  } catch (e) {
    console.error(e)
  } finally {
    dangXuLy.value = false
  }
}

async function sangDoiTac() {
  dangXuLy.value = true
  try {
    const targetUrl = diemDen.value?.uu_dai?.link_doi_tac || 'https://tripadvisor.com'
    window.open(targetUrl, '_blank')
  } finally {
    dangXuLy.value = false
  }
}

onMounted(async () => {
  dangTai.value = true
  try {
    diemDen.value = await DataService.layChiTietDiemDen(id)
    const targetId = Number(id)
    const filteredReviews = DANH_SACH_DANH_GIA_TRIPADVISOR.filter(r => r.diem_den_id === targetId)
    danhGiaCuaDiemDen.value = filteredReviews
  } finally {
    dangTai.value = false
  }
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.nevio-destination-detail {
  padding-bottom: 80px;
}

.detail-hero-banner {
  position: relative;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 50px 0;
  color: white;
}

.banner-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.4) 0%, rgba(15, 23, 42, 0.9) 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.detail-breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  color: #cbd5e1;
  margin-bottom: 16px;
}

.crumb-link {
  color: #fddd62;
  text-decoration: none;
}

.crumb-link:hover {
  text-decoration: underline;
}

.detail-breadcrumbs .sep {
  opacity: 0.5;
}

.detail-breadcrumbs .current {
  color: #ffffff;
  font-weight: 600;
}

.banner-meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.banner-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: var(--radius-full);
}

.badge-diem_sang {
  background: #059669;
}

.badge-binh_thuong {
  background: #0284c7;
}

.badge-canh_bao {
  background: #e11d48;
}

.banner-category-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.15);
  padding: 4px 12px;
  border-radius: var(--radius-full);
}

.banner-title {
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 900;
  line-height: 1.15;
  margin-bottom: 6px;
  color: #ffffff;
}

.banner-category-sub {
  font-size: 15px;
  color: #94a3b8;
  margin-bottom: 20px;
}

.banner-score-strip {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.score-pill {
  background: #fddd62;
  color: #303030;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
}

.strip-divider {
  opacity: 0.5;
}

.review-total-text {
  font-size: 14px;
  color: #e2e8f0;
}

.positive-rate-text {
  font-size: 14px;
  color: #a7f3d0;
  font-weight: 600;
}

/* Two-column layout */
.detail-main-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 36px;
  margin-top: 40px;
  align-items: flex-start;
}

.detail-left-col {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.detail-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 30px;
  box-shadow: var(--shadow-subtle);
}

.card-head-flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.card-section-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 8px;
}

.section-subtext {
  font-size: 14px;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
  line-height: 1.6;
}

.absa-chip {
  background: rgba(2, 132, 199, 0.1);
  color: #0284c7;
  font-size: 12px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.destination-description-text {
  font-size: 15px;
  line-height: 1.8;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
}

.photo-gallery-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.gallery-thumb {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid var(--nevio-border);
}

/* Aspect Progress Bars */
.aspects-list-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.aspect-metric-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.aspect-row-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.aspect-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
}

.icon-inline {
  color: var(--nevio-orange);
}

.aspect-score-text {
  font-size: 13.5px;
  font-weight: 700;
  color: #0284c7;
}

.aspect-bar {
  display: flex;
  height: 9px;
  border-radius: var(--radius-full);
  background: #e7e5e4;
  overflow: hidden;
}

.bar-pos { background: #059669; }
.bar-neg { background: #e11d48; }

.aspect-comment {
  font-size: 12.5px;
  font-style: italic;
  color: var(--mau-chu-mo);
}

/* Review List */
.link-all-reviews {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--nevio-orange);
  text-decoration: none;
}

.dest-reviews-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dest-review-item {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 18px;
}

.rev-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.rev-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rev-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--nevio-dark);
  color: var(--nevio-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
}

.rev-user strong {
  font-size: 13.5px;
  color: var(--mau-chu);
  display: block;
}

.rev-date {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.rev-rating-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
}

.rev-rating {
  display: flex;
  align-items: center;
  gap: 3px;
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

/* Star Filters Bar */
.dest-star-filters-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0 20px 0;
  padding: 10px 14px;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
}

.btn-star-filter {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  background: var(--nevio-light-grey);
  color: var(--mau-chu);
  border: 1px solid var(--nevio-border);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-star-filter:hover {
  background: #e7e5e4;
  transform: translateY(-1px);
}

.btn-star-filter.active {
  background: var(--nevio-dark);
  color: #ffffff;
  border-color: var(--nevio-dark);
  box-shadow: 0 4px 12px rgba(48, 48, 48, 0.2);
}

[data-theme="dark"] .btn-star-filter.active {
  background: var(--nevio-yellow);
  color: var(--nevio-dark);
  border-color: var(--nevio-yellow);
}

.star-pill-icons {
  display: flex;
  align-items: center;
  gap: 1px;
}

.count-badge {
  font-size: 11px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: var(--radius-full);
  background: rgba(0, 0, 0, 0.08);
}

.btn-star-filter.active .count-badge {
  background: rgba(255, 255, 255, 0.25);
  color: inherit;
}

.no-star-reviews-alert {
  padding: 24px;
  text-align: center;
  background: var(--nevio-card-bg);
  border: 1px dashed var(--nevio-border);
  border-radius: var(--radius-md);
  color: var(--mau-chu-phu);
}

.btn-clear-star-filter {
  margin-top: 10px;
  background: var(--nevio-dark);
  color: white;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.rev-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 4px;
}

.rev-text {
  font-size: 13px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 12px;
}

.rev-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-pill {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
}

.tag-tich_cuc { background: #ecfdf5; color: #047857; }
.tag-trung_tinh { background: #f5f5f4; color: #57534e; }
.tag-tieu_cuc { background: #fff1f2; color: #be123c; }

.section-review-subtitle {
  font-size: 13px;
  color: var(--mau-chu-phu);
  margin-top: 4px;
}

.reviews-load-more-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--nevio-border);
}

.btn-load-more-reviews {
  padding: 10px 24px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-load-more-reviews:hover {
  background: var(--nevio-border);
}

.btn-see-all-target-reviews {
  font-size: 13px;
  font-weight: 700;
  color: #d97706;
  text-decoration: underline;
}

/* Sidebar */
.detail-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 90px;
}

.sidebar-widget {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-subtle);
}

.widget-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.widget-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--mau-chu);
  line-height: 1.2;
}

.widget-sub {
  font-size: 12px;
  color: var(--mau-chu-mo);
}

.wilson-stat-box {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 16px;
  text-align: center;
  margin-bottom: 16px;
}

.wilson-score-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
  margin-bottom: 6px;
}

.w-val {
  font-size: 34px;
  font-weight: 800;
  color: var(--mau-chu);
}

.w-denom {
  font-size: 16px;
  color: var(--mau-chu-mo);
}

.wilson-details-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  margin-bottom: 16px;
}

.w-detail-row {
  display: flex;
  justify-content: space-between;
  color: var(--mau-chu-phu);
}

.w-detail-row strong {
  color: var(--mau-chu);
}

.wilson-note {
  font-size: 11.5px;
  line-height: 1.5;
  color: var(--mau-chu-mo);
  border-top: 1px dashed var(--nevio-border);
  padding-top: 12px;
}

/* Voucher Widget */
.voucher-badge-promo {
  background: rgba(5, 150, 105, 0.1);
  border: 1px solid rgba(5, 150, 105, 0.25);
  padding: 12px;
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 700;
  color: #059669;
  text-align: center;
  margin-bottom: 12px;
}

.voucher-limit-text {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  text-align: center;
  margin-bottom: 16px;
}

.btn-claim-voucher {
  width: 100%;
  background: #059669;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn-claim-voucher:hover {
  background: #047857;
}

.claimed-box {
  background: var(--nevio-light-grey);
  border: 1px solid #059669;
  border-radius: var(--radius-md);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.claimed-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge-success {
  font-size: 11.5px;
  font-weight: 700;
  color: #059669;
  background: #ecfdf5;
  padding: 3px 8px;
  border-radius: 4px;
}

.countdown-clock {
  font-size: 12.5px;
  color: #e11d48;
  font-weight: 600;
}

.ticket-code-display {
  background: var(--nevio-card-bg);
  border: 1px dashed var(--nevio-border);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
}

.code-lbl {
  font-size: 11px;
  color: var(--mau-chu-mo);
  display: block;
}

.code-val {
  font-size: 16px;
  font-weight: 800;
  font-family: monospace;
  color: #0284c7;
}

.btn-redirect-partner {
  width: 100%;
  background: var(--nevio-dark);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

[data-theme="dark"] .btn-redirect-partner {
  background: var(--nevio-yellow);
  color: var(--nevio-dark);
}

.partner-transparency-note {
  font-size: 11px;
  line-height: 1.5;
  color: var(--mau-chu-mo);
  margin-top: 14px;
}

.voucher-locked-box {
  text-align: center;
  padding: 16px;
  background: var(--nevio-light-grey);
  border-radius: var(--radius-md);
  border: 1px dashed var(--nevio-border);
}

.locked-icon {
  margin-bottom: 8px;
}

.voucher-locked-box h4 {
  font-size: 14px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.voucher-locked-box p {
  font-size: 12px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 10px;
}

.locked-hint {
  font-size: 11.5px;
  color: #b45309;
  font-weight: 600;
  background: #fef3c7;
  padding: 6px;
  border-radius: 6px;
}

.safety-indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.safety-indicator h4 {
  font-size: 13.5px;
  font-weight: 700;
  color: #059669;
  margin-bottom: 2px;
}

.safety-indicator p {
  font-size: 12px;
  color: var(--mau-chu-phu);
}

@media (max-width: 900px) {
  .detail-main-layout {
    grid-template-columns: 1fr;
  }
}
</style>
