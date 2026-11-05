<template>
  <div class="nevio-write-review-page anim-fade-in">
    <div class="nevio-container">
      <!-- 1. Header Banner -->
      <div class="write-header">
        <div class="tripadvisor-badge-pill">
          <span>🛡️ DULICHSO (ĐT-12) · CỘNG ĐỒNG ĐÁNH GIÁ CHÂN THỰC</span>
        </div>
        <h1 class="write-title">Viết Bài Đánh Giá Trải Nghiệm</h1>
        <p class="write-subtitle">
          Chia sẻ cảm nghĩ chân thực của bạn để giúp hàng triệu du khách khác tìm được điểm đến hoàn hảo. Mọi đánh giá đều được phân tích cảm xúc qua mô hình <strong>PhoBERT AI</strong> và tích hợp vào khoảng tin cậy <strong>Wilson Score 95%</strong>.
        </p>
      </div>

      <!-- 2. Main Write Review Form Card -->
      <div class="write-form-card">
        <form @submit.prevent="nopDanhGia" class="review-main-form">
          <!-- Step 1: Chọn Điểm Đến -->
          <div class="form-section">
            <div class="section-label-row">
              <span class="step-badge">1</span>
              <div>
                <h3>Bạn muốn đánh giá địa điểm nào?</h3>
                <p>Chọn điểm đến bạn vừa trải nghiệm trong danh mục du lịch kiểm chứng</p>
              </div>
            </div>

            <div class="destination-select-grid">
              <div 
                v-for="d in dsDiemDen" 
                :key="d.id" 
                @click="diemDenChon = d" 
                :class="['dest-choice-card', { selected: diemDenChon?.id === d.id }]"
              >
                <img :src="d.hinh_anh" :alt="d.ten" class="dest-choice-img" />
                <div class="dest-choice-info">
                  <span class="dest-choice-tag">{{ d.tinh_thanh }}</span>
                  <strong class="dest-choice-name">{{ d.ten_rut_gon || d.ten }}</strong>
                  <span class="dest-choice-cat">{{ d.loai_hinh }}</span>
                </div>
                <div v-if="diemDenChon?.id === d.id" class="choice-check-icon">
                  <Check :size="16" />
                </div>
              </div>
            </div>

            <div v-if="!diemDenChon" class="warning-select-dest">
              <AlertCircle :size="15" />
              <span>Vui lòng click chọn 1 địa điểm phía trên trước khi tiếp tục.</span>
            </div>
          </div>

          <!-- Step 2: Chấm Điểm Bong Bóng TripAdvisor (Overall Bubble Rating) -->
          <div class="form-section">
            <div class="section-label-row">
              <span class="step-badge">2</span>
              <div>
                <h3>Xếp hạng tổng thể trải nghiệm của bạn *</h3>
                <p>Click vào các bong bóng tròn để chấm điểm từ 1 đến 5 sao</p>
              </div>
            </div>

            <div class="bubble-rating-container">
              <div class="bubble-rating-row" @mouseleave="hoverRating = 0">
                <button 
                  v-for="b in 5" 
                  :key="b" 
                  type="button" 
                  @mouseenter="hoverRating = b" 
                  @click="diemSo = b" 
                  :class="['bubble-circle-btn', { 
                    'filled': b <= (hoverRating || diemSo),
                    'active-rating': b <= diemSo 
                  }]"
                >
                  <span class="bubble-inner-dot"></span>
                </button>
              </div>
              <div class="bubble-rating-label">
                <strong :class="'score-label-' + (hoverRating || diemSo)">
                  {{ getRatingText(hoverRating || diemSo) }}
                </strong>
                <span class="score-points">({{ hoverRating || diemSo }}/5 bong bóng TripAdvisor)</span>
              </div>
            </div>
          </div>

          <!-- Step 3: Đánh Giá 5 Khía Cạnh Du Lịch (PhoBERT ABSA) -->
          <div class="form-section">
            <div class="section-label-row">
              <span class="step-badge">3</span>
              <div>
                <h3>Đánh giá chi tiết 5 khía cạnh cốt lõi (Tùy chọn)</h3>
                <p>Hệ thống AI sẽ bóc tách và phân tích các khía cạnh độc lập này</p>
              </div>
            </div>

            <div class="aspects-rating-grid">
              <!-- Aspect 1: Cảnh quan -->
              <div class="aspect-rating-item">
                <span class="asp-name">🏞️ Cảnh quan &amp; Không gian</span>
                <div class="mini-star-row">
                  <button 
                    v-for="s in 5" 
                    :key="s" 
                    type="button" 
                    @click="khiaCanh.canh_quan = s" 
                    :class="['mini-star-btn', { active: s <= khiaCanh.canh_quan }]"
                  >
                    <Star :size="15" :class="{ 'fill-yellow': s <= khiaCanh.canh_quan }" />
                  </button>
                  <span class="asp-score-num">{{ khiaCanh.canh_quan }}/5</span>
                </div>
              </div>

              <!-- Aspect 2: Dịch vụ -->
              <div class="aspect-rating-item">
                <span class="asp-name">🛎️ Chất lượng phục vụ</span>
                <div class="mini-star-row">
                  <button 
                    v-for="s in 5" 
                    :key="s" 
                    type="button" 
                    @click="khiaCanh.dich_vu = s" 
                    :class="['mini-star-btn', { active: s <= khiaCanh.dich_vu }]"
                  >
                    <Star :size="15" :class="{ 'fill-yellow': s <= khiaCanh.dich_vu }" />
                  </button>
                  <span class="asp-score-num">{{ khiaCanh.dich_vu }}/5</span>
                </div>
              </div>

              <!-- Aspect 3: Ẩm thực -->
              <div class="aspect-rating-item">
                <span class="asp-name">🍜 Ẩm thực &amp; Món ăn</span>
                <div class="mini-star-row">
                  <button 
                    v-for="s in 5" 
                    :key="s" 
                    type="button" 
                    @click="khiaCanh.am_thuc = s" 
                    :class="['mini-star-btn', { active: s <= khiaCanh.am_thuc }]"
                  >
                    <Star :size="15" :class="{ 'fill-yellow': s <= khiaCanh.am_thuc }" />
                  </button>
                  <span class="asp-score-num">{{ khiaCanh.am_thuc }}/5</span>
                </div>
              </div>

              <!-- Aspect 4: Vệ sinh -->
              <div class="aspect-rating-item">
                <span class="asp-name">🧹 Vệ sinh &amp; Môi trường</span>
                <div class="mini-star-row">
                  <button 
                    v-for="s in 5" 
                    :key="s" 
                    type="button" 
                    @click="khiaCanh.ve_sinh = s" 
                    :class="['mini-star-btn', { active: s <= khiaCanh.ve_sinh }]"
                  >
                    <Star :size="15" :class="{ 'fill-yellow': s <= khiaCanh.ve_sinh }" />
                  </button>
                  <span class="asp-score-num">{{ khiaCanh.ve_sinh }}/5</span>
                </div>
              </div>

              <!-- Aspect 5: Giá cả -->
              <div class="aspect-rating-item">
                <span class="asp-name">💵 Giá cả &amp; Minh bạch</span>
                <div class="mini-star-row">
                  <button 
                    v-for="s in 5" 
                    :key="s" 
                    type="button" 
                    @click="khiaCanh.gia_ca = s" 
                    :class="['mini-star-btn', { active: s <= khiaCanh.gia_ca }]"
                  >
                    <Star :size="15" :class="{ 'fill-yellow': s <= khiaCanh.gia_ca }" />
                  </button>
                  <span class="asp-score-num">{{ khiaCanh.gia_ca }}/5</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 4: Thông Tin Chuyến Đi -->
          <div class="form-section">
            <div class="section-label-row">
              <span class="step-badge">4</span>
              <div>
                <h3>Thông tin chuyến đi của bạn</h3>
                <p>Giúp người đọc hiểu rõ hơn bối cảnh trải nghiệm</p>
              </div>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="input-lbl">Bạn đã đi cùng ai? *</label>
                <div class="trip-type-options">
                  <button 
                    v-for="t in ['Cặp đôi', 'Gia đình', 'Bạn bè', 'Một mình', 'Công tác']" 
                    :key="t" 
                    type="button" 
                    @click="loaiChuyenDi = t" 
                    :class="['btn-trip-type', { active: loaiChuyenDi === t }]"
                  >
                    {{ t }}
                  </button>
                </div>
              </div>

              <div class="form-group">
                <label class="input-lbl">Thời gian bạn trải nghiệm *</label>
                <select v-model="thoiGianDi" class="form-select">
                  <option value="Tháng 11/2026">Tháng 11/2026 (Mới đây)</option>
                  <option value="Tháng 10/2026">Tháng 10/2026</option>
                  <option value="Tháng 09/2026">Tháng 09/2026</option>
                  <option value="Mùa hè 2026">Mùa hè 2026</option>
                  <option value="Đầu năm 2026">Đầu năm 2026</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Step 5: Nội Dung Nhận Xét Chi Tiết -->
          <div class="form-section">
            <div class="section-label-row">
              <span class="step-badge">5</span>
              <div>
                <h3>Nhận xét chi tiết của bạn *</h3>
                <p>Hãy chia sẻ trung thực về những điểm bạn thích và những điều cần cải thiện</p>
              </div>
            </div>

            <div class="form-group mb-16">
              <label class="input-lbl">Tiêu đề đánh giá *</label>
              <input 
                v-model="tieuDe" 
                type="text" 
                required 
                placeholder="Tóm tắt trải nghiệm của bạn (Ví dụ: Du thuyền tuyệt đẹp, dịch vụ vượt xa mong đợi!)" 
                class="form-input text-bold"
              />
            </div>

            <div class="form-group mb-16">
              <div class="textarea-header">
                <label class="input-lbl">Nội dung nhận xét chi tiết *</label>
                <span :class="['char-counter', { 'char-valid': noiDung.length >= 50 }]">
                  {{ noiDung.length }} / 50 ký tự tối thiểu
                </span>
              </div>
              <textarea 
                v-model="noiDung" 
                rows="6" 
                required 
                placeholder="Hãy kể chi tiết về chuyến đi của bạn: Không gian thế nào? Nhân viên đón tiếp ra sao? Món ăn có ngon không? Mẹo nhỏ bạn muốn chia sẻ với những du khách sắp tới..."
                class="form-textarea"
              ></textarea>
            </div>

            <div class="form-grid-2">
              <div class="form-group">
                <label class="input-lbl">Họ và tên hiển thị *</label>
                <input 
                  v-model="hoTen" 
                  type="text" 
                  required 
                  placeholder="Ví dụ: Nguyễn Văn An" 
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label class="input-lbl">Đến từ (Tỉnh thành / Quốc gia)</label>
                <input 
                  v-model="diaPhuong" 
                  type="text" 
                  placeholder="Ví dụ: Hà Nội, Việt Nam" 
                  class="form-input"
                />
              </div>
            </div>

            <div class="checkbox-confirm-row">
              <input type="checkbox" id="check-confirm" v-model="xacNhan" required />
              <label for="check-confirm">
                Tôi xác nhận rằng đánh giá này dựa trên trải nghiệm thực tế của chính tôi và tôi không có mối quan hệ tư lợi cá nhân nào với địa điểm này.
              </label>
            </div>
          </div>

          <!-- Action Foot -->
          <div class="form-submit-foot">
            <button 
              type="submit" 
              :disabled="dangGui || !diemDenChon || noiDung.length < 50 || !xacNhan" 
              class="btn-submit-review"
            >
              <Send v-if="!dangGui" :size="18" />
              <Loader2 v-else :size="18" class="spinner-icon" />
              <span>{{ dangGui ? 'Đang phân tích AI & Đăng bài...' : 'Gửi Đánh Giá Của Bạn Ngay' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  Check, 
  AlertCircle, 
  Star, 
  Send, 
  Loader2 
} from 'lucide-vue-next'
import { DataService } from '../services/dataService'

const router = useRouter()
const route = useRoute()

const dsDiemDen = ref([])
const diemDenChon = ref(null)

const diemSo = ref(5)
const hoverRating = ref(0)
const loaiChuyenDi = ref('Cặp đôi')
const thoiGianDi = ref('Tháng 11/2026')

const khiaCanh = ref({
  canh_quan: 5,
  dich_vu: 5,
  am_thuc: 5,
  ve_sinh: 5,
  gia_ca: 4
})

const tieuDe = ref('')
const noiDung = ref('')
const hoTen = ref(localStorage.getItem('ho_ten') || localStorage.getItem('ten_nguoi_dung') || '')
const diaPhuong = ref('Việt Nam')
const xacNhan = ref(true)
const dangGui = ref(false)

function getRatingText(score) {
  switch (score) {
    case 5: return 'Xuất sắc'
    case 4: return 'Rất tốt'
    case 3: return 'Trung bình'
    case 2: return 'Kém'
    case 1: return 'Kinh khủng'
    default: return 'Xuất sắc'
  }
}

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
  
  // Kiểm tra nếu có query diem_den_id truyền vào từ trang chi tiết
  if (route.query.diem_den_id) {
    const target = dsDiemDen.value.find(d => Number(d.id) === Number(route.query.diem_den_id))
    if (target) diemDenChon.value = target
  } else if (dsDiemDen.value.length > 0) {
    diemDenChon.value = dsDiemDen.value[0]
  }
})

async function nopDanhGia() {
  if (!diemDenChon.value) {
    alert('Vui lòng chọn 1 địa điểm bạn muốn đánh giá.')
    return
  }
  if (noiDung.value.length < 50) {
    alert('Nội dung nhận xét cần đạt tối thiểu 50 ký tự.')
    return
  }

  dangGui.value = true
  try {
    await DataService.guiDanhGiaNguoiDung({
      diem_den_id: diemDenChon.value.id,
      ho_ten: hoTen.value || 'Du khách TripAdvisor',
      dia_phuong: diaPhuong.value,
      diem_so: diemSo.value,
      loai_chuyen_di: loaiChuyenDi.value,
      thoi_gian_trai_nghiem: thoiGianDi.value,
      tieu_de: tieuDe.value,
      noi_dung: noiDung.value,
      khia_canh_canh_quan: khiaCanh.value.canh_quan,
      khia_canh_dich_vu: khiaCanh.value.dich_vu
    })

    alert('Cảm ơn bạn! Đánh giá của bạn đã được đăng thành công và bảo chứng vào bảng xếp hạng danh tiếng TripAdvisor.')
    router.push(`/diem-den/${diemDenChon.value.id}`)
  } catch (err) {
    alert('Lỗi: ' + err.message)
  } finally {
    dangGui.value = false
  }
}
</script>

<style scoped>
.nevio-write-review-page {
  padding: 40px 0 80px 0;
  background-color: var(--mau-nen);
}

.nevio-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.write-header {
  text-align: center;
  margin-bottom: 32px;
}

.tripadvisor-badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(253, 221, 98, 0.15);
  border: 1px solid rgba(253, 221, 98, 0.4);
  color: #92400e;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 800;
  margin-bottom: 14px;
  letter-spacing: 0.05em;
}

[data-theme="dark"] .tripadvisor-badge-pill {
  color: #fddd62;
  border-color: #fddd62;
}

.write-title {
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.write-subtitle {
  font-size: 15px;
  color: var(--mau-chu-phu);
  line-height: 1.6;
}

/* Main Form Card */
.write-form-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-card);
}

.form-section {
  padding-bottom: 28px;
  margin-bottom: 28px;
  border-bottom: 1px dashed var(--nevio-border);
}

.section-label-row {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 20px;
}

.step-badge {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fddd62;
  color: #18181b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 14px;
  flex-shrink: 0;
}

.section-label-row h3 {
  font-size: 17px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 4px;
}

.section-label-row p {
  font-size: 13px;
  color: var(--mau-chu-mo);
}

/* Destination Selector Grid */
.destination-select-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  max-height: 280px;
  overflow-y: auto;
  padding: 4px;
}

.dest-choice-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--nevio-light-grey);
  border: 2px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.dest-choice-card:hover {
  border-color: #fddd62;
}

.dest-choice-card.selected {
  border-color: #f59e0b;
  background: #fef3c7;
}

[data-theme="dark"] .dest-choice-card.selected {
  background: rgba(253, 221, 98, 0.15);
  border-color: #fddd62;
}

.dest-choice-img {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.dest-choice-info {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dest-choice-tag {
  font-size: 10px;
  font-weight: 700;
  color: #b45309;
}

[data-theme="dark"] .dest-choice-tag {
  color: #fddd62;
}

.dest-choice-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dest-choice-cat {
  font-size: 11px;
  color: var(--mau-chu-mo);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.choice-check-icon {
  margin-left: auto;
  color: #b45309;
}

[data-theme="dark"] .choice-check-icon {
  color: #fddd62;
}

.warning-select-dest {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #e11d48;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
}

/* Bubble Rating TripAdvisor */
.bubble-rating-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
}

.bubble-rating-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.bubble-circle-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #d4d4d8;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.bubble-inner-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: transparent;
  transition: all 0.15s ease;
}

.bubble-circle-btn.filled {
  border-color: #f59e0b;
  background: #fef3c7;
}

.bubble-circle-btn.filled .bubble-inner-dot {
  background: #f59e0b;
}

.bubble-circle-btn.active-rating {
  border-color: #f59e0b;
  background: #fddd62;
}

.bubble-circle-btn.active-rating .bubble-inner-dot {
  background: #18181b;
}

.bubble-rating-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
}

.score-label-5 { color: #b45309; }
.score-label-4 { color: #d97706; }
.score-label-3 { color: #f59e0b; }
.score-label-2 { color: #ea580c; }
.score-label-1 { color: #e11d48; }

.score-points {
  font-size: 13px;
  color: var(--mau-chu-mo);
}

/* 5 Aspects Rating Grid */
.aspects-rating-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.aspect-rating-item {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
}

.asp-name {
  display: block;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu);
  margin-bottom: 8px;
}

.mini-star-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mini-star-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: #d4d4d8;
  transition: transform 0.1s;
}

.mini-star-btn:hover {
  transform: scale(1.15);
}

.mini-star-btn.active {
  color: #f59e0b;
}

.fill-yellow {
  fill: #fddd62;
  color: #fddd62;
}

.asp-score-num {
  font-size: 12px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  margin-left: 6px;
}

/* Form Controls */
.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mb-16 {
  margin-bottom: 16px;
}

.input-lbl {
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
}

.form-input, .form-select, .form-textarea {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 10px 14px;
  font-family: inherit;
  font-size: 14px;
  color: var(--mau-chu);
  outline: none;
  transition: border-color 0.2s;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: #fddd62;
}

.text-bold {
  font-weight: 700;
}

.trip-type-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn-trip-type {
  padding: 6px 12px;
  border-radius: var(--radius-full);
  border: 1px solid var(--nevio-border);
  background: var(--nevio-light-grey);
  font-size: 12.5px;
  font-weight: 600;
  color: var(--mau-chu-phu);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-trip-type.active {
  background: #fddd62;
  color: #18181b;
  border-color: #e5be29;
  font-weight: 700;
}

.textarea-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.char-counter {
  font-size: 11.5px;
  color: #e11d48;
}

.char-counter.char-valid {
  color: #059669;
  font-weight: 700;
}

.checkbox-confirm-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  line-height: 1.5;
}

.checkbox-confirm-row input {
  margin-top: 3px;
}

/* Submit Footer */
.form-submit-foot {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.btn-submit-review {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: #fddd62;
  color: #18181b;
  border: 1px solid #e5be29;
  padding: 14px 36px;
  border-radius: var(--radius-full);
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 18px rgba(253, 221, 98, 0.4);
}

.btn-submit-review:hover:not(:disabled) {
  background: #facc15;
  transform: translateY(-2px);
}

.btn-submit-review:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-grid-2 {
    grid-template-columns: 1fr;
  }
  .write-form-card {
    padding: 20px;
  }
}
</style>
