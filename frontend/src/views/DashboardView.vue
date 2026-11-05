<template>
  <div class="tripadvisor-page anim-fade-in">
    <!-- Navbar -->
    <Navbar />

    <!-- ======================================================== -->
    <!-- 1. TRIPADVISOR MEGA HERO & SEARCH SECTION                -->
    <!-- ======================================================== -->
    <section class="tripadvisor-hero">
      <div class="hero-backdrop">
        <img 
          src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1920&q=80" 
          alt="Việt Nam Tourism" 
          class="hero-bg-img"
        />
        <div class="hero-overlay-dark"></div>
      </div>

      <div class="nevio-container hero-center-content">
        <div class="ta-brand-pill">
          <span class="owl-emoji">🦉</span>
          <span>TRIPADVISOR VIỆT NAM · AI REPUTATION INTELLIGENCE</span>
        </div>

        <h1 class="ta-hero-title">
          Bạn muốn đi đâu?
        </h1>
        <p class="ta-hero-subtitle">
          Khám phá những khách sạn, di sản và trải nghiệm du lịch được đánh giá cao nhất Việt Nam — bảo chứng bởi <strong>PhoBERT AI</strong> &amp; <strong>Wilson Score 95%</strong>.
        </p>

        <!-- Category Tabs (TripAdvisor Signature) -->
        <div class="ta-category-tabs">
          <button 
            v-for="cat in danhMucTabs" 
            :key="cat.key" 
            @click="chonDanhMucTab(cat.key)" 
            :class="['ta-tab-btn', { active: danhMucHienTai === cat.key }]"
          >
            <component :is="cat.icon" :size="16" />
            <span>{{ cat.label }}</span>
          </button>
        </div>

        <!-- TripAdvisor Big Search Bar with Autocomplete Dropdown -->
        <div class="ta-search-box-wrap">
          <div class="ta-search-bar">
            <Search :size="20" class="search-lens text-muted" />
            <input 
              v-model="tuKhoaTimKiem" 
              type="text" 
              placeholder="Địa điểm, khách sạn, nhà hàng (Ví dụ: Hạ Long, Tràng An, Melia Vinpearl, Ambassador...)" 
              class="ta-search-input"
              @focus="hienSuggestions = true"
              @input="hienSuggestions = true"
            />
            <button v-if="tuKhoaTimKiem" @click="tuKhoaTimKiem = ''" class="btn-clear-kw">
              <X :size="16" />
            </button>
            <button @click="thucHienTimKiem" class="ta-search-action-btn">
              <span>Tìm Kiếm</span>
            </button>
          </div>

          <!-- Autocomplete Dropdown -->
          <div v-if="hienSuggestions && goiYDiemDen.length > 0" class="ta-search-dropdown anim-pop">
            <div 
              v-for="dest in goiYDiemDen" 
              :key="dest.id" 
              @click="chonGoiY(dest)" 
              class="ta-dropdown-item"
            >
              <img :src="dest.hinh_anh" :alt="dest.ten" class="drop-thumb" />
              <div class="drop-info">
                <div class="drop-title-row">
                  <strong class="drop-name">{{ dest.ten_rut_gon || dest.ten }}</strong>
                  <span class="drop-loc">{{ dest.tinh_thanh }}</span>
                </div>
                <div class="drop-meta-row">
                  <div class="drop-bubbles">
                    <span v-for="b in 5" :key="b" class="bubble-dot filled"></span>
                    <span class="drop-score">{{ dest.diem_danh_tieng_tb }}</span>
                  </div>
                  <span class="drop-rev-count">({{ dest.tong_luot_danh_gia }} đánh giá)</span>
                  <span v-if="dest.trang_thai_wilson === 'diem_sang'" class="drop-ta-badge">Travelers' Choice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ======================================================== -->
    <!-- 2. QUICK FILTER BAR (Địa Phương & Xếp Hạng)               -->
    <!-- ======================================================== -->
    <section class="ta-filter-ribbon">
      <div class="nevio-container ribbon-inner">
        <div class="filter-pills-scroll">
          <button 
            @click="locDiaPhuong = ''" 
            :class="['ribbon-pill', { active: locDiaPhuong === '' }]"
          >
            Tất cả Việt Nam
          </button>
          <button 
            v-for="tp in danhSachTinhThanh" 
            :key="tp" 
            @click="locDiaPhuong = tp" 
            :class="['ribbon-pill', { active: locDiaPhuong === tp }]"
          >
            <MapPin :size="12" />
            <span>{{ tp }}</span>
          </button>
        </div>

        <div class="ribbon-right-controls">
          <router-link to="/viet-danh-gia" class="ta-btn-write-review-pill">
            <PenLine :size="14" />
            <span>Viết Đánh Giá Mới</span>
          </router-link>
        </div>
      </div>
    </section>

    <div class="nevio-container main-content-wrap">
      <!-- ======================================================== -->
      <!-- 3. TRAVELERS' CHOICE BEST OF THE BEST 2026               -->
      <!-- ======================================================== -->
      <section class="ta-section-block">
        <div class="section-title-row">
          <div>
            <div class="section-eyebrow-award">
              <Award :size="15" class="text-yellow" />
              <span>TRAVELERS' CHOICE BEST OF THE BEST 2026</span>
            </div>
            <h2 class="section-h2">Điểm Đến Đạt Chuẩn Bảo Chứng Xuất Sắc Nhất</h2>
            <p class="section-sub">
              Dành riêng cho các điểm đến có <strong>chỉ số Wilson Score ≥ 0.70</strong> và tỷ lệ hài lòng vượt 90%, đã được hệ thống AI quét sạch đánh giá ảo.
            </p>
          </div>
          <router-link to="/diem-den" class="see-all-link">
            <span>Xem tất cả điểm đến</span>
            <ArrowRight :size="15" />
          </router-link>
        </div>

        <!-- Featured Carousel Grid -->
        <div class="ta-cards-grid">
          <article 
            v-for="item in danhSachTopTravelersChoice" 
            :key="item.id" 
            class="ta-dest-card anim-hover-lift"
          >
            <!-- Thumbnail & Badges -->
            <div class="card-thumb-wrap">
              <img :src="item.hinh_anh" :alt="item.ten" class="card-img" loading="lazy" />
              <button 
                @click="toggleSave(item.id)" 
                :class="['btn-save-heart', { saved: isSaved(item.id) }]"
                title="Lưu vào chuyến đi yêu thích"
              >
                <Heart :size="16" :class="{ 'fill-red': isSaved(item.id) }" />
              </button>
              <div class="badge-award-ta">
                <Award :size="12" />
                <span>Travelers' Choice</span>
              </div>
              <div class="badge-location-blur">
                <MapPin :size="11" />
                <span>{{ item.tinh_thanh }}</span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="card-body">
              <span class="card-category-lbl">{{ item.loai_hinh }}</span>
              <h3 class="card-title">
                <router-link :to="'/diem-den/' + item.id">{{ item.ten_rut_gon || item.ten }}</router-link>
              </h3>

              <!-- TripAdvisor Bubble Rating -->
              <div class="card-bubbles-row">
                <div class="bubbles-set" title="Điểm TripAdvisor 5.0">
                  <span v-for="b in 5" :key="b" class="bubble-dot filled"></span>
                </div>
                <strong class="bubble-score-num">{{ item.diem_danh_tieng_tb }}</strong>
                <span class="bubble-count-text">({{ item.tong_luot_danh_gia }} đánh giá)</span>
              </div>

              <!-- AI Aspect Chips (Our Platform USP) -->
              <div v-if="item.khia_canh" class="card-aspect-chips">
                <span class="aspect-chip-mini" title="Cảnh quan">
                  <span>Cảnh quan: <strong>{{ item.khia_canh.canh_quan?.diem }}/5</strong></span>
                </span>
                <span class="aspect-chip-mini" title="Dịch vụ">
                  <span>Dịch vụ: <strong>{{ item.khia_canh.dich_vu?.diem }}/5</strong></span>
                </span>
                <span class="aspect-chip-mini" title="Vệ sinh">
                  <span>Vệ sinh: <strong>{{ item.khia_canh.ve_sinh?.diem }}/5</strong></span>
                </span>
              </div>

              <!-- Wilson Score 95% Matrix -->
              <div class="card-wilson-bar">
                <span class="wilson-lbl"><ShieldCheck :size="13" class="text-yellow" /> Wilson 95% CI:</span>
                <strong class="wilson-num">{{ item.khoang_tin_cay_wilson }}</strong>
              </div>

              <!-- Footer Actions -->
              <div class="card-actions-row">
                <router-link :to="'/diem-den/' + item.id" class="btn-detail-link">
                  <span>Chi Tiết &amp; Đặt Chỗ</span>
                  <ArrowRight :size="14" />
                </router-link>
                <router-link :to="'/viet-danh-gia?diem_den_id=' + item.id" class="btn-write-this-card" title="Viết đánh giá cho địa điểm này">
                  <PenLine :size="14" />
                  <span>Viết Đánh Giá</span>
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- 4. TẤT CẢ ĐIỂM ĐẾN PHÙ HỢP (DYNAMIC FILTERED LIST)       -->
      <!-- ======================================================== -->
      <section class="ta-section-block">
        <div class="section-title-row">
          <div>
            <h2 class="section-h2">
              {{ locDiaPhuong ? `Điểm Đến Tại ${locDiaPhuong}` : 'Khám Phá Tất Cả Điểm Đến Nổi Bật' }}
              <span class="count-badge">({{ diemDenHienThi.length }})</span>
            </h2>
            <p class="section-sub">
              Dữ liệu nguyên bản từ TripAdvisor kết hợp công nghệ phân tích cảm xúc tiếng Việt PhoBERT.
            </p>
          </div>

          <!-- View Mode Toggle -->
          <div class="view-toggles">
            <button 
              @click="cheDoXem = 'luoi'" 
              :class="['btn-view-toggle', { active: cheDoXem === 'luoi' }]"
              title="Chế độ Lưới TripAdvisor"
            >
              <LayoutGrid :size="15" />
              <span>Lưới</span>
            </button>
            <button 
              @click="cheDoXem = 'xep_chong'" 
              :class="['btn-view-toggle', { active: cheDoXem === 'xep_chong' }]"
              title="Chế độ Xếp Chồng Leaderboard"
            >
              <Layers :size="15" />
              <span>Bảng Xếp Hạng</span>
            </button>
          </div>
        </div>

        <!-- 4A. Grid View -->
        <div v-if="cheDoXem === 'luoi' && diemDenHienThi.length > 0" class="ta-cards-grid">
          <article 
            v-for="item in diemDenHienThi" 
            :key="item.id" 
            class="ta-dest-card anim-hover-lift"
          >
            <div class="card-thumb-wrap">
              <img :src="item.hinh_anh" :alt="item.ten" class="card-img" loading="lazy" />
              <button 
                @click="toggleSave(item.id)" 
                :class="['btn-save-heart', { saved: isSaved(item.id) }]"
              >
                <Heart :size="16" :class="{ 'fill-red': isSaved(item.id) }" />
              </button>
              <div v-if="item.trang_thai_wilson === 'diem_sang'" class="badge-award-ta">
                <Award :size="12" />
                <span>Travelers' Choice</span>
              </div>
              <div class="badge-location-blur">
                <MapPin :size="11" />
                <span>{{ item.tinh_thanh }}</span>
              </div>
            </div>

            <div class="card-body">
              <span class="card-category-lbl">{{ item.loai_hinh }}</span>
              <h3 class="card-title">
                <router-link :to="'/diem-den/' + item.id">{{ item.ten_rut_gon || item.ten }}</router-link>
              </h3>

              <div class="card-bubbles-row">
                <div class="bubbles-set">
                  <span v-for="b in 5" :key="b" class="bubble-dot filled"></span>
                </div>
                <strong class="bubble-score-num">{{ item.diem_danh_tieng_tb }}</strong>
                <span class="bubble-count-text">({{ item.tong_luot_danh_gia }} đánh giá)</span>
              </div>

              <p class="card-desc-snippet">{{ item.mo_ta }}</p>

              <div class="card-actions-row">
                <router-link :to="'/diem-den/' + item.id" class="btn-detail-link">
                  <span>Chi Tiết &amp; Đặt Chỗ</span>
                  <ArrowRight :size="14" />
                </router-link>
                <router-link :to="'/viet-danh-gia?diem_den_id=' + item.id" class="btn-write-this-card">
                  <PenLine :size="14" />
                  <span>Viết Đánh Giá</span>
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- 4B. Stacked Leaderboard View -->
        <div v-else-if="cheDoXem === 'xep_chong' && diemDenHienThi.length > 0" class="ta-stacked-list">
          <article 
            v-for="(item, idx) in diemDenHienThi" 
            :key="item.id" 
            class="ta-stacked-card anim-hover-lift"
          >
            <div class="stacked-rank-box">
              <Crown v-if="idx === 0" :size="20" class="rank-crown" />
              <span class="rank-num">#{{ idx + 1 }}</span>
              <span class="rank-lbl">{{ idx === 0 ? 'Top 1 Uy Tín' : 'Hạng ' + (idx + 1) }}</span>
            </div>

            <div class="stacked-thumb-col">
              <img :src="item.hinh_anh" :alt="item.ten" class="stacked-img" />
              <div class="stacked-loc-pill"><MapPin :size="11" /> {{ item.tinh_thanh }}</div>
            </div>

            <div class="stacked-info-col">
              <div class="stacked-badge-row">
                <span class="ta-cat-pill">{{ item.loai_hinh }}</span>
                <span v-if="item.trang_thai_wilson === 'diem_sang'" class="ta-award-chip">
                  <Award :size="12" /> Travelers' Choice
                </span>
              </div>
              <h3 class="stacked-item-title">
                <router-link :to="'/diem-den/' + item.id">{{ item.ten_rut_gon || item.ten }}</router-link>
              </h3>
              <p class="stacked-item-desc">{{ item.mo_ta }}</p>

              <!-- 5 Aspects Chips -->
              <div v-if="item.khia_canh" class="stacked-aspects-chips">
                <span class="asp-chip">Cảnh quan: <strong>{{ item.khia_canh.canh_quan?.diem }}/5</strong></span>
                <span class="asp-chip">Dịch vụ: <strong>{{ item.khia_canh.dich_vu?.diem }}/5</strong></span>
                <span class="asp-chip">Ẩm thực: <strong>{{ item.khia_canh.am_thuc?.diem }}/5</strong></span>
                <span class="asp-chip">Vệ sinh: <strong>{{ item.khia_canh.ve_sinh?.diem }}/5</strong></span>
                <span class="asp-chip">Giá cả: <strong>{{ item.khia_canh.gia_ca?.diem }}/5</strong></span>
              </div>
            </div>

            <div class="stacked-action-col">
              <div class="stacked-score-box">
                <div class="bubbles-set">
                  <span v-for="b in 5" :key="b" class="bubble-dot filled"></span>
                </div>
                <span class="score-big">{{ item.diem_danh_tieng_tb }}</span>
                <span class="score-reviews-text">{{ item.tong_luot_danh_gia }} đánh giá TripAdvisor</span>
                <span class="score-wilson-tag">Wilson: <strong>{{ item.khoang_tin_cay_wilson }}</strong></span>
              </div>
              <div class="stacked-btns">
                <router-link :to="'/diem-den/' + item.id" class="btn-stacked-detail">
                  <span>Chi Tiết &amp; Đặt Chỗ</span>
                  <ArrowRight :size="14" />
                </router-link>
                <router-link :to="'/viet-danh-gia?diem_den_id=' + item.id" class="btn-stacked-write">
                  <PenLine :size="14" />
                  <span>Viết Đánh Giá</span>
                </router-link>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div v-else class="ta-empty-box">
          <Search :size="36" class="text-muted" />
          <h3>Không tìm thấy điểm đến nào phù hợp</h3>
          <p>Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc để xem lại danh mục.</p>
          <button @click="datLaiBoLoc" class="btn-reset-filters">Xem Lại Toàn Bộ Điểm Đến</button>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- 5. REAL TRAVELER REVIEWS FEED (ĐÁNH GIÁ MỚI NHẤT)       -->
      <!-- ======================================================== -->
      <section class="ta-section-block">
        <div class="section-title-row">
          <div>
            <div class="section-eyebrow-award">
              <MessageSquareQuote :size="15" class="text-yellow" />
              <span>CỘNG ĐỒNG DU KHÁCH TRIPADVISOR VIỆT NAM</span>
            </div>
            <h2 class="section-h2">Đánh Giá Chân Thực Mới Nhất</h2>
            <p class="section-sub">
              Trải nghiệm thực tế của du khách vừa ghé thăm và để lại nhận xét trên hệ thống.
            </p>
          </div>
          <router-link to="/danh-sach-danh-gia" class="see-all-link">
            <span>Tra cứu 874+ đánh giá</span>
            <ArrowRight :size="15" />
          </router-link>
        </div>

        <div class="ta-reviews-feed-grid">
          <div 
            v-for="rev in danhSachDanhGiaMoi" 
            :key="rev.id" 
            class="ta-feed-review-card"
          >
            <div class="feed-rev-head">
              <div class="feed-user-avatar">{{ (rev.nguoi_danh_gia || 'D').charAt(0) }}</div>
              <div class="feed-user-meta">
                <strong>{{ rev.nguoi_danh_gia }}</strong>
                <span class="feed-user-sub">{{ rev.quoc_gia }} · {{ rev.ngay_dang }}</span>
              </div>
              <span v-if="rev.loai_chuyen_di" class="feed-trip-type-tag">
                <Users :size="11" /> {{ rev.loai_chuyen_di }}
              </span>
            </div>

            <div class="feed-bubbles-row">
              <div class="bubbles-set">
                <span v-for="b in 5" :key="b" :class="['bubble-dot', { filled: b <= (rev.diem_so || 5) }]"></span>
              </div>
              <span class="feed-score-badge">{{ rev.diem_so || 5 }}/5 bong bóng</span>
            </div>

            <h4 class="feed-rev-title">{{ rev.tieu_de }}</h4>
            <p class="feed-rev-text">{{ rev.noi_dung }}</p>

            <div class="feed-rev-footer">
              <router-link :to="'/diem-den/' + rev.diem_den_id" class="feed-dest-link">
                📍 {{ rev.ten_diem_den }}
              </router-link>
              <button @click="voteHuuIchFeed(rev.id)" class="btn-helpful-feed">
                <ThumbsUp :size="12" />
                <span>Hữu ích ({{ laySoHuuIch(rev.id) + (rev.luot_huu_ich || 0) }})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ======================================================== -->
      <!-- 6. OUR PLATFORM AI INTEGRATION USP                        -->
      <!-- ======================================================== -->
      <section class="ta-tech-usp-banner">
        <div class="usp-left-text">
          <div class="ta-brand-pill">
            <Sparkles :size="13" class="text-yellow" />
            <span>TẠI SAO TRIPADVISOR INTELLIGENCE VƯỢT TRỘI HƠN?</span>
          </div>
          <h2 class="usp-heading">Bảo Chứng Danh Tiếng Du Lịch Bằng Trí Tuệ Nhân Tạo</h2>
          <p class="usp-desc">
            Không chỉ dựa vào số sao chung chung dễ bị thao túng bởi seeding hay review ảo, nền tảng của chúng tôi tích hợp 2 lớp bảo chứng khoa học độc quyền:
          </p>

          <div class="usp-features-list">
            <div class="usp-feat-item">
              <div class="feat-icon-box"><Cpu :size="20" class="text-yellow" /></div>
              <div>
                <strong>Mô hình ngôn ngữ tiếng Việt PhoBERT (ABSA)</strong>
                <p>Tự động bóc tách từng câu nhận xét thành 5 khía cạnh dịch vụ độc lập: Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh và Giá cả.</p>
              </div>
            </div>

            <div class="usp-feat-item">
              <div class="feat-icon-box"><ShieldCheck :size="20" class="text-yellow" /></div>
              <div>
                <strong>Thuật toán Khoảng Tin Cậy Wilson Score 95%</strong>
                <p>Loại bỏ các điểm đến có 5 sao ảo từ ít lượt đánh giá. Chỉ những điểm đến có chất lượng thật bền vững mới đạt chuẩn Travelers' Choice.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="usp-right-card">
          <div class="cta-review-box">
            <div class="cta-icon-wrap">🦉</div>
            <h3>Bạn vừa có một chuyến đi tuyệt vời?</h3>
            <p>Hãy chia sẻ cảm nghĩ của bạn để cùng bảo chứng danh tiếng cho du lịch Việt Nam.</p>
            <router-link to="/viet-danh-gia" class="btn-cta-write-now">
              <PenLine :size="16" />
              <span>Viết Bài Đánh Giá Ngay</span>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ArrowRight, 
  Heart, 
  PenLine, 
  ThumbsUp, 
  Users, 
  X, 
  Compass, 
  Hotel, 
  Ship, 
  Utensils, 
  LayoutGrid, 
  Layers, 
  Crown, 
  Cpu, 
  Sparkles, 
  MessageSquareQuote 
} from 'lucide-vue-next'
import Navbar from '../components/Navbar.vue'
import { DataService, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const router = useRouter()

const dsDiemDen = ref([])
const tuKhoaTimKiem = ref('')
const locDiaPhuong = ref('')
const danhMucHienTai = ref('all')
const cheDoXem = ref('luoi') // 'luoi' | 'xep_chong'
const hienSuggestions = ref(false)

const danhSachTinhThanh = ['Quảng Ninh', 'Ninh Bình', 'Kiên Giang']

const danhMucTabs = [
  { key: 'all', label: 'Tìm kiếm tất cả', icon: Search },
  { key: 'hotels', label: 'Khách sạn & Resort', icon: Hotel },
  { key: 'attractions', label: 'Hoạt động & Di sản', icon: Compass },
  { key: 'cruises', label: 'Du thuyền & Tour', icon: Ship },
  { key: 'restaurants', label: 'Nhà hàng & Ẩm thực', icon: Utensils }
]

const savedDestMap = ref(JSON.parse(localStorage.getItem('dt12_saved_dests') || '{}'))
const votesMap = ref(JSON.parse(localStorage.getItem('dt12_helpful_votes') || '{}'))

function isSaved(id) {
  return !!savedDestMap.value[id]
}

function toggleSave(id) {
  savedDestMap.value[id] = !savedDestMap.value[id]
  localStorage.setItem('dt12_saved_dests', JSON.stringify(savedDestMap.value))
}

function laySoHuuIch(id) {
  return votesMap.value[id] || 0
}

function voteHuuIchFeed(id) {
  const newV = DataService.tangLuotHuuIch(id)
  votesMap.value = { ...votesMap.value, [id]: newV }
}

onMounted(async () => {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
})

function chonDanhMucTab(key) {
  danhMucHienTai.value = key
}

const goiYDiemDen = computed(() => {
  if (!tuKhoaTimKiem.value.trim()) {
    return dsDiemDen.value.slice(0, 4)
  }
  const kw = tuKhoaTimKiem.value.toLowerCase()
  return dsDiemDen.value.filter(d => 
    d.ten.toLowerCase().includes(kw) || 
    (d.ten_rut_gon && d.ten_rut_gon.toLowerCase().includes(kw)) ||
    d.tinh_thanh.toLowerCase().includes(kw)
  ).slice(0, 5)
})

function chonGoiY(dest) {
  hienSuggestions.value = false
  router.push(`/diem-den/${dest.id}`)
}

function thucHienTimKiem() {
  hienSuggestions.value = false
  if (goiYDiemDen.value.length > 0) {
    router.push(`/diem-den/${goiYDiemDen.value[0].id}`)
  }
}

const danhSachTopTravelersChoice = computed(() => {
  return dsDiemDen.value.filter(d => d.trang_thai_wilson === 'diem_sang')
})

const diemDenHienThi = computed(() => {
  return dsDiemDen.value.filter(d => {
    if (locDiaPhuong.value && d.tinh_thanh !== locDiaPhuong.value) {
      return false
    }
    if (danhMucHienTai.value !== 'all' && d.danh_muc !== danhMucHienTai.value) {
      return false
    }
    if (tuKhoaTimKiem.value.trim()) {
      const kw = tuKhoaTimKiem.value.toLowerCase()
      const matchTen = d.ten.toLowerCase().includes(kw) || (d.ten_rut_gon && d.ten_rut_gon.toLowerCase().includes(kw))
      const matchLoc = d.tinh_thanh.toLowerCase().includes(kw)
      if (!matchTen && !matchLoc) return false
    }
    return true
  })
})

const danhSachDanhGiaMoi = computed(() => {
  const custom = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
  const combined = [...custom, ...DANH_SACH_DANH_GIA_TRIPADVISOR]
  return combined.slice(0, 6)
})

function datLaiBoLoc() {
  tuKhoaTimKiem.value = ''
  locDiaPhuong.value = ''
  danhMucHienTai.value = 'all'
}
</script>

<style scoped>
.tripadvisor-page {
  background-color: var(--mau-nen);
  color: var(--mau-chu);
  min-height: 100vh;
}

.nevio-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ================= HERO & SEARCH ================= */
.tripadvisor-hero {
  position: relative;
  min-height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0 80px 0;
  overflow: visible;
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}

.hero-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.hero-overlay-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(24, 24, 27, 0.7) 0%, rgba(24, 24, 27, 0.9) 100%);
}

.hero-center-content {
  position: relative;
  z-index: 2;
  text-align: center;
  width: 100%;
  max-width: 900px;
}

.ta-brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(253, 221, 98, 0.2);
  border: 1px solid #fddd62;
  color: #fddd62;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 20px;
}

.ta-hero-title {
  font-size: clamp(36px, 5.5vw, 56px);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.03em;
  margin-bottom: 14px;
  line-height: 1.15;
}

.ta-hero-subtitle {
  font-size: 16.5px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 32px;
  max-width: 760px;
  margin-left: auto;
  margin-right: auto;
}

/* Category Tabs (TripAdvisor Signature) */
.ta-category-tabs {
  display: inline-flex;
  align-items: center;
  background: rgba(24, 24, 27, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  padding: 4px;
  gap: 4px;
  margin-bottom: 24px;
  max-width: 100%;
  overflow-x: auto;
}

.ta-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.ta-tab-btn:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

.ta-tab-btn.active {
  background: #fddd62;
  color: #18181b;
  box-shadow: 0 4px 14px rgba(253, 221, 98, 0.4);
}

/* Big Search Bar */
.ta-search-box-wrap {
  position: relative;
  max-width: 820px;
  margin: 0 auto;
}

.ta-search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-radius: var(--radius-full);
  padding: 8px 10px 8px 20px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.ta-search-bar:focus-within {
  border-color: #fddd62;
}

.search-lens {
  color: #71717a;
  flex-shrink: 0;
}

.ta-search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15.5px;
  color: #18181b;
  font-family: inherit;
  background: transparent;
}

.btn-clear-kw {
  background: none;
  border: none;
  color: #a1a1aa;
  cursor: pointer;
}

.ta-search-action-btn {
  background: #fddd62;
  color: #18181b;
  border: 1px solid #e5be29;
  font-weight: 800;
  font-size: 14.5px;
  padding: 12px 28px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.ta-search-action-btn:hover {
  background: #facc15;
  transform: translateY(-1px);
}

/* Autocomplete Dropdown */
.ta-search-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.25);
  padding: 10px;
  z-index: 100;
  text-align: left;
}

.ta-dropdown-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.15s ease;
}

.ta-dropdown-item:hover {
  background: var(--nevio-light-grey);
}

.drop-thumb {
  width: 52px;
  height: 52px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.drop-info {
  flex: 1;
  overflow: hidden;
}

.drop-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.drop-name {
  font-size: 14px;
  color: var(--mau-chu);
}

.drop-loc {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.drop-meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.drop-bubbles {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.bubble-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid #d4d4d8;
}

.bubble-dot.filled {
  background: #f59e0b;
  border-color: #f59e0b;
}

.drop-score {
  font-weight: 800;
  margin-left: 4px;
  color: var(--mau-chu);
}

.drop-rev-count {
  color: var(--mau-chu-mo);
}

.drop-ta-badge {
  font-size: 10.5px;
  font-weight: 800;
  color: #b45309;
  background: #fef3c7;
  padding: 2px 6px;
  border-radius: var(--radius-full);
}

[data-theme="dark"] .drop-ta-badge {
  background: rgba(253, 221, 98, 0.15);
  color: #fddd62;
}

/* ================= FILTER RIBBON ================= */
.ta-filter-ribbon {
  background: var(--nevio-card-bg);
  border-bottom: 1px solid var(--nevio-border);
  padding: 12px 0;
  position: sticky;
  top: 70px;
  z-index: 40;
}

.ribbon-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.filter-pills-scroll {
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
}

.ribbon-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--nevio-border);
  background: var(--nevio-light-grey);
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.ribbon-pill:hover {
  border-color: #fddd62;
  color: var(--mau-chu);
}

.ribbon-pill.active {
  background: #18181b;
  color: #ffffff;
  border-color: #18181b;
}

[data-theme="dark"] .ribbon-pill.active {
  background: #fddd62;
  color: #18181b;
  border-color: #fddd62;
}

.ta-btn-write-review-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #fddd62;
  color: #18181b;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(253, 221, 98, 0.35);
  transition: all 0.2s;
}

.ta-btn-write-review-pill:hover {
  background: #facc15;
  transform: translateY(-1px);
}

/* ================= SECTION COMMON ================= */
.main-content-wrap {
  padding-top: 48px;
  padding-bottom: 80px;
}

.ta-section-block {
  margin-bottom: 60px;
}

.section-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
}

.section-eyebrow-award {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 11.5px;
  font-weight: 800;
  color: #b45309;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

[data-theme="dark"] .section-eyebrow-award {
  color: #fddd62;
}

.section-h2 {
  font-size: 26px;
  font-weight: 900;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.section-sub {
  font-size: 14px;
  color: var(--mau-chu-phu);
}

.see-all-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13.5px;
  font-weight: 800;
  color: #b45309;
  text-decoration: none;
}

[data-theme="dark"] .see-all-link {
  color: #fddd62;
}

/* ================= CARDS GRID TRIPADVISOR ================= */
.ta-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.ta-dest-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
  transition: all 0.28s ease;
}

.ta-dest-card:hover {
  border-color: #fddd62;
  box-shadow: 0 16px 36px -4px rgba(253, 221, 98, 0.15);
}

.card-thumb-wrap {
  height: 210px;
  position: relative;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.ta-dest-card:hover .card-img {
  transform: scale(1.05);
}

.btn-save-heart {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #18181b;
  transition: all 0.2s;
}

.btn-save-heart:hover {
  transform: scale(1.15);
}

.fill-red {
  fill: #e11d48;
  color: #e11d48;
}

.badge-award-ta {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #fddd62;
  color: #18181b;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.badge-location-blur {
  position: absolute;
  bottom: 10px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(24, 24, 27, 0.75);
  backdrop-filter: blur(6px);
  color: #ffffff;
  padding: 3px 10px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 700;
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-category-lbl {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--mau-chu-mo);
  margin-bottom: 6px;
}

.card-title {
  font-size: 17.5px;
  font-weight: 800;
  margin-bottom: 10px;
  line-height: 1.3;
}

.card-title a {
  color: var(--mau-chu);
  text-decoration: none;
}

.card-title a:hover {
  color: #b45309;
}

[data-theme="dark"] .card-title a:hover {
  color: #fddd62;
}

.card-bubbles-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
}

.bubbles-set {
  display: inline-flex;
  align-items: center;
  gap: 2.5px;
}

.bubble-score-num {
  font-size: 14px;
  font-weight: 800;
  color: var(--mau-chu);
}

.bubble-count-text {
  font-size: 12px;
  color: var(--mau-chu-mo);
}

.card-desc-snippet {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mau-chu-phu);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-aspect-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.aspect-chip-mini {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  padding: 2px 8px;
  font-size: 11px;
  color: var(--mau-chu-phu);
}

.card-wilson-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--nevio-light-grey);
  border-radius: var(--radius-md);
  padding: 6px 12px;
  font-size: 12px;
  margin-bottom: 16px;
}

.wilson-lbl {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: var(--mau-chu-phu);
}

.wilson-num {
  color: #b45309;
  font-weight: 800;
}

[data-theme="dark"] .wilson-num {
  color: #fddd62;
}

.card-actions-row {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.btn-detail-link {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--nevio-dark);
  color: #ffffff;
  padding: 9px 14px;
  border-radius: var(--radius-full);
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-detail-link:hover {
  background: #000000;
}

[data-theme="dark"] .btn-detail-link {
  background: #ffffff;
  color: #18181b;
}

.btn-write-this-card {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: #fddd62;
  color: #18181b;
  border: 1px solid #e5be29;
  padding: 9px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
}

.btn-write-this-card:hover {
  background: #facc15;
}

/* ================= VIEW TOGGLE ================= */
.view-toggles {
  display: inline-flex;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  padding: 3px;
  gap: 2px;
}

.btn-view-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  border: none;
  background: transparent;
  font-size: 12px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  cursor: pointer;
}

.btn-view-toggle.active {
  background: #ffffff;
  color: #18181b;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .btn-view-toggle.active {
  background: #fddd62;
  color: #18181b;
}

/* ================= STACKED LEADERBOARD ================= */
.ta-stacked-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.ta-stacked-card {
  display: grid;
  grid-template-columns: 80px 240px 1fr 220px;
  gap: 20px;
  align-items: center;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 18px;
  transition: all 0.28s;
  box-shadow: var(--shadow-subtle);
}

.ta-stacked-card:hover {
  border-color: #fddd62;
  box-shadow: 0 12px 32px rgba(253, 221, 98, 0.12);
}

.stacked-rank-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.rank-crown {
  color: #f59e0b;
}

.rank-num {
  font-size: 20px;
  font-weight: 900;
}

.rank-lbl {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--mau-chu-mo);
  text-transform: uppercase;
}

.stacked-thumb-col {
  height: 140px;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.stacked-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stacked-loc-pill {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(24, 24, 27, 0.75);
  color: #ffffff;
  padding: 3px 8px;
  border-radius: var(--radius-full);
  font-size: 10.5px;
  font-weight: 700;
}

.stacked-info-col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stacked-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ta-cat-pill {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--mau-chu-mo);
}

.ta-award-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(253, 221, 98, 0.18);
  color: #92400e;
  border: 1px solid rgba(253, 221, 98, 0.4);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 800;
}

[data-theme="dark"] .ta-award-chip {
  color: #fddd62;
  border-color: #fddd62;
}

.stacked-item-title {
  font-size: 18px;
  font-weight: 800;
}

.stacked-item-title a {
  color: var(--mau-chu);
  text-decoration: none;
}

.stacked-item-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mau-chu-phu);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.stacked-aspects-chips {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.asp-chip {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 11px;
  color: var(--mau-chu-phu);
}

.stacked-action-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-left: 1px dashed var(--nevio-border);
  padding-left: 16px;
}

.stacked-score-box {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.score-big {
  font-size: 26px;
  font-weight: 900;
  color: var(--mau-chu);
}

.score-reviews-text {
  font-size: 11px;
  color: var(--mau-chu-phu);
}

.score-wilson-tag {
  font-size: 11px;
  color: var(--mau-chu-mo);
}

.stacked-btns {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.btn-stacked-detail {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: var(--nevio-dark);
  color: #ffffff;
  padding: 8px 14px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 700;
  text-decoration: none;
}

[data-theme="dark"] .btn-stacked-detail {
  background: #ffffff;
  color: #18181b;
}

.btn-stacked-write {
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
  text-decoration: none;
}

/* ================= REVIEWS FEED ================= */
.ta-reviews-feed-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.ta-feed-review-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-subtle);
  display: flex;
  flex-direction: column;
}

.feed-rev-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.feed-user-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #fddd62;
  color: #18181b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 15px;
}

.feed-user-meta {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.feed-user-meta strong {
  font-size: 13.5px;
}

.feed-user-sub {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.feed-trip-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  background: var(--nevio-light-grey);
  padding: 3px 8px;
  border-radius: var(--radius-full);
}

.feed-bubbles-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.feed-score-badge {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
}

.feed-rev-title {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 6px;
  color: var(--mau-chu);
}

.feed-rev-text {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mau-chu-phu);
  margin-bottom: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.feed-rev-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed var(--nevio-border);
}

.feed-dest-link {
  font-size: 12px;
  font-weight: 700;
  color: #b45309;
  text-decoration: none;
}

[data-theme="dark"] .feed-dest-link {
  color: #fddd62;
}

.btn-helpful-feed {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 11.5px;
  font-weight: 700;
  color: var(--mau-chu);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-helpful-feed:hover {
  background: #fddd62;
  color: #18181b;
}

/* ================= TECH USP BANNER ================= */
.ta-tech-usp-banner {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 40px;
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 36px;
  align-items: center;
  box-shadow: var(--shadow-card);
}

.usp-heading {
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 12px;
}

.usp-desc {
  font-size: 14.5px;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
  line-height: 1.6;
}

.usp-features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.usp-feat-item {
  display: flex;
  gap: 14px;
}

.feat-icon-box {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background: rgba(253, 221, 98, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.usp-feat-item strong {
  display: block;
  font-size: 14px;
  color: var(--mau-chu);
  margin-bottom: 3px;
}

.usp-feat-item p {
  font-size: 12.5px;
  color: var(--mau-chu-mo);
  line-height: 1.5;
}

.cta-review-box {
  background: linear-gradient(145deg, #18181b 0%, #27272a 100%);
  color: #ffffff;
  border-radius: var(--radius-xl);
  padding: 32px;
  text-align: center;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.25);
}

.cta-icon-wrap {
  font-size: 38px;
  margin-bottom: 10px;
}

.cta-review-box h3 {
  font-size: 20px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 8px;
}

.cta-review-box p {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
  line-height: 1.5;
}

.btn-cta-write-now {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #fddd62;
  color: #18181b;
  border: 1px solid #e5be29;
  padding: 12px 28px;
  border-radius: var(--radius-full);
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 4px 16px rgba(253, 221, 98, 0.4);
  transition: all 0.2s;
}

.btn-cta-write-now:hover {
  background: #facc15;
  transform: translateY(-2px);
}

/* Empty State */
.ta-empty-box {
  text-align: center;
  padding: 60px 20px;
  background: var(--nevio-card-bg);
  border: 1px dashed var(--nevio-border);
  border-radius: var(--radius-xl);
}

.btn-reset-filters {
  margin-top: 14px;
  background: #fddd62;
  color: #18181b;
  border: none;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 992px) {
  .ta-tech-usp-banner {
    grid-template-columns: 1fr;
  }
  .ta-stacked-card {
    grid-template-columns: 60px 180px 1fr;
  }
  .stacked-action-col {
    grid-column: 1 / -1;
    border-left: none;
    border-top: 1px dashed var(--nevio-border);
    padding-left: 0;
    padding-top: 14px;
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .ta-stacked-card {
    grid-template-columns: 1fr;
  }
  .stacked-action-col {
    flex-direction: column;
  }
  .ta-cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
