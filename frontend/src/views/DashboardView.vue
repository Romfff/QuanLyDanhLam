<template>
  <div class="ta-home">

    <!-- ================= 1. HERO TÌM KIẾM (chuẩn TripAdvisor) ================= -->
    <section class="ta-hero">
      <div class="ta-wrap">
        <h1 class="ta-hero-title">Bạn muốn đi đâu?</h1>

        <!-- Tabs danh mục: icon trên, nhãn dưới, gạch chân khi chọn -->
        <div class="ta-tabs" role="tablist">
          <button
            v-for="cat in danhMucTabs"
            :key="cat.key"
            role="tab"
            :aria-selected="danhMucHienTai === cat.key"
            :class="['ta-tab', { active: danhMucHienTai === cat.key }]"
            @click="chonDanhMucTab(cat.key)"
          >
            <component :is="cat.icon" :size="22" />
            <span>{{ cat.label }}</span>
          </button>
        </div>

        <!-- Ô tìm kiếm + gợi ý -->
        <div ref="searchBoxRef" class="ta-search">
          <div :class="['ta-search-bar', { focused: hienSuggestions }]">
            <Search :size="20" class="ta-search-icon" />
            <input
              v-model="tuKhoaTimKiem"
              type="text"
              :placeholder="placeholderTimKiem"
              class="ta-search-input"
              @focus="hienSuggestions = true"
              @keydown.enter="thucHienTimKiem"
              @keydown.esc="hienSuggestions = false"
            />
            <button v-if="tuKhoaTimKiem" class="ta-search-clear" @click="tuKhoaTimKiem = ''" aria-label="Xóa">
              <X :size="16" />
            </button>
            <button class="ta-search-btn" @click="thucHienTimKiem">Tìm kiếm</button>
          </div>

          <div v-if="hienSuggestions" class="ta-suggest">
            <p class="ta-suggest-head">
              {{ tuKhoaTimKiem.trim() ? 'Kết quả phù hợp' : 'Điểm đến được tìm nhiều nhất' }}
            </p>
            <template v-if="goiYDiemDen.length">
              <button
                v-for="dest in goiYDiemDen"
                :key="dest.id"
                class="ta-suggest-item"
                @mousedown.prevent="chonGoiY(dest)"
              >
                <img :src="dest.hinh_anh" :alt="dest.ten" />
                <div class="ta-suggest-info">
                  <strong>{{ dest.ten_rut_gon || dest.ten }}</strong>
                  <span>{{ dest.loai_hinh }} · {{ dest.tinh_thanh }}</span>
                </div>
                <div class="ta-suggest-rate">
                  <span class="ta-bubbles sm">
                    <i v-for="b in 5" :key="b" :class="bubbleClass(dest.diem_danh_tieng_tb, b)"></i>
                  </span>
                </div>
              </button>
            </template>
            <p v-else class="ta-suggest-empty">Không tìm thấy “{{ tuKhoaTimKiem }}”. Thử “Hạ Long”, “Ninh Bình”…</p>
          </div>
        </div>
      </div>
    </section>

    <main class="ta-wrap ta-main">
      <!-- ================= 2. BANNER NỔI BẬT ================= -->
      <section v-if="banner" class="ta-banner">
        <img :src="banner.hinh_anh" :alt="banner.ten" class="ta-banner-img" />
        <div class="ta-banner-overlay"></div>
        <div class="ta-banner-content">
          <span class="ta-badge-yellow"><Award :size="14" /> Travelers' Choice 2026</span>
          <h2>{{ banner.ten_rut_gon || banner.ten }}</h2>
          <p>{{ banner.mo_ta }}</p>
          <router-link :to="'/diem-den/' + banner.id" class="ta-btn-white">Khám phá ngay</router-link>
        </div>
      </section>

      <!-- ================= 3. CAROUSEL THEO DANH MỤC ================= -->
      <section v-for="nhom in nhomCarousel" :key="nhom.key" class="ta-section">
        <div class="ta-section-head">
          <div>
            <h2 class="ta-h2">{{ nhom.tieuDe }}</h2>
            <p class="ta-sub">{{ nhom.moTa }}</p>
          </div>
          <div class="ta-arrows">
            <button @click="cuon(nhom.key, -1)" aria-label="Trước"><ChevronLeft :size="18" /></button>
            <button @click="cuon(nhom.key, 1)" aria-label="Sau"><ChevronRight :size="18" /></button>
          </div>
        </div>

        <div :ref="el => (carouselRefs[nhom.key] = el)" class="ta-carousel">
          <article v-for="item in nhom.items" :key="item.id" class="ta-card">
            <router-link :to="'/diem-den/' + item.id" class="ta-card-media">
              <img :src="item.hinh_anh" :alt="item.ten" loading="lazy" />
              <span v-if="item.trang_thai_wilson === 'diem_sang'" class="ta-card-award">
                <Award :size="12" /> Travelers' Choice
              </span>
            </router-link>
            <button
              :class="['ta-heart', { saved: isSaved(item.id) }]"
              :aria-label="isSaved(item.id) ? 'Bỏ lưu' : 'Lưu'"
              @click="toggleSave(item.id)"
            >
              <Heart :size="16" />
            </button>
            <router-link :to="'/diem-den/' + item.id" class="ta-card-title">
              {{ item.ten_rut_gon || item.ten }}
            </router-link>
            <div class="ta-rating-row">
              <span class="ta-bubbles">
                <i v-for="b in 5" :key="b" :class="bubbleClass(item.diem_danh_tieng_tb, b)"></i>
              </span>
              <span class="ta-count">{{ formatSo(item.tong_luot_danh_gia) }}</span>
            </div>
            <span class="ta-card-meta">{{ item.loai_hinh }}</span>
            <span class="ta-card-meta"><MapPin :size="12" /> {{ item.tinh_thanh }}</span>
          </article>
        </div>
      </section>

      <!-- ================= 4. KHÁM PHÁ THEO TỈNH ================= -->
      <section class="ta-section">
        <h2 class="ta-h2">Khám phá theo điểm đến</h2>
        <p class="ta-sub">Chọn một tỉnh thành để xem bảng xếp hạng bên dưới.</p>
        <div class="ta-province-grid">
          <button
            v-for="tp in tinhThanhTiles"
            :key="tp.ten"
            :class="['ta-province', { active: locDiaPhuong === tp.ten }]"
            @click="chonTinh(tp.ten)"
          >
            <img :src="tp.anh" :alt="tp.ten" loading="lazy" />
            <span class="ta-province-name">{{ tp.ten }}</span>
            <span class="ta-province-count">{{ tp.soLuong }} điểm đến</span>
          </button>
        </div>
      </section>

      <!-- ================= 5. BẢNG XẾP HẠNG (dạng danh sách TripAdvisor) ================= -->
      <section ref="ketQuaRef" class="ta-section">
        <div class="ta-section-head">
          <div>
            <h2 class="ta-h2">
              {{ locDiaPhuong ? `Điểm đến hàng đầu tại ${locDiaPhuong}` : 'Bảng xếp hạng điểm đến Việt Nam' }}
            </h2>
            <p class="ta-sub">Xếp hạng theo cận dưới Wilson Score 95% từ đánh giá thực của du khách.</p>
          </div>
        </div>

        <div class="ta-chips">
          <button :class="['ta-chip', { active: !locDiaPhuong }]" @click="locDiaPhuong = ''">Tất cả</button>
          <button
            v-for="tp in danhSachTinhThanh"
            :key="tp"
            :class="['ta-chip', { active: locDiaPhuong === tp }]"
            @click="locDiaPhuong = tp"
          >{{ tp }}</button>
          <span class="ta-chip-sep"></span>
          <button
            v-for="cat in danhMucTabs.slice(1)"
            :key="cat.key"
            :class="['ta-chip', { active: danhMucHienTai === cat.key }]"
            @click="danhMucHienTai = danhMucHienTai === cat.key ? 'all' : cat.key"
          >{{ cat.label }}</button>
        </div>

        <div v-if="diemDenHienThi.length" class="ta-list">
          <article v-for="(item, idx) in diemDenHienThi" :key="item.id" class="ta-row">
            <router-link :to="'/diem-den/' + item.id" class="ta-row-media">
              <img :src="item.hinh_anh" :alt="item.ten" loading="lazy" />
            </router-link>
            <div class="ta-row-body">
              <router-link :to="'/diem-den/' + item.id" class="ta-row-title">
                {{ idx + 1 }}. {{ item.ten_rut_gon || item.ten }}
              </router-link>
              <div class="ta-rating-row">
                <span class="ta-bubbles">
                  <i v-for="b in 5" :key="b" :class="bubbleClass(item.diem_danh_tieng_tb, b)"></i>
                </span>
                <span class="ta-count">{{ formatSo(item.tong_luot_danh_gia) }} đánh giá</span>
              </div>
              <span class="ta-card-meta">{{ item.loai_hinh }} · {{ item.tinh_thanh }}</span>
              <p class="ta-row-desc">{{ item.mo_ta }}</p>
              <div v-if="item.khia_canh" class="ta-aspects">
                <span v-for="kc in KHIA_CANH_HIEN_THI" :key="kc.key">
                  {{ kc.label }} <strong>{{ item.khia_canh[kc.key]?.diem ?? '–' }}</strong>
                </span>
              </div>
            </div>
            <div class="ta-row-side">
              <span v-if="item.trang_thai_wilson === 'diem_sang'" class="ta-badge-yellow sm">
                <Award :size="12" /> Travelers' Choice
              </span>
              <span class="ta-wilson">Wilson 95%: <strong>{{ item.khoang_tin_cay_wilson }}</strong></span>
              <router-link :to="'/diem-den/' + item.id" class="ta-btn-dark">Xem chi tiết</router-link>
              <router-link :to="'/viet-danh-gia?diem_den_id=' + item.id" class="ta-btn-outline">
                <PenLine :size="14" /> Viết đánh giá
              </router-link>
            </div>
          </article>
        </div>
        <div v-else class="ta-empty">
          <p>Không có điểm đến phù hợp bộ lọc hiện tại.</p>
          <button class="ta-btn-dark" @click="datLaiBoLoc">Xóa bộ lọc</button>
        </div>
      </section>

      <!-- ================= 6. ĐÁNH GIÁ MỚI NHẤT ================= -->
      <section class="ta-section">
        <div class="ta-section-head">
          <div>
            <h2 class="ta-h2">Du khách đang nói gì</h2>
            <p class="ta-sub">Đánh giá mới nhất từ cộng đồng du khách.</p>
          </div>
          <router-link to="/danh-sach-danh-gia" class="ta-link">Xem tất cả đánh giá</router-link>
        </div>
        <div class="ta-review-grid">
          <article v-for="rev in danhSachDanhGiaMoi" :key="rev.id" class="ta-review">
            <div class="ta-review-user">
              <span class="ta-avatar">{{ (rev.nguoi_danh_gia || 'D').charAt(0) }}</span>
              <div>
                <strong>{{ rev.nguoi_danh_gia }}</strong>
                <span>{{ rev.ngay_dang }}</span>
              </div>
            </div>
            <span class="ta-bubbles">
              <i v-for="b in 5" :key="b" :class="bubbleClass(rev.diem_so || 5, b)"></i>
            </span>
            <h3 class="ta-review-title">{{ rev.tieu_de }}</h3>
            <p class="ta-review-text">{{ rev.noi_dung }}</p>
            <div class="ta-review-foot">
              <router-link :to="'/diem-den/' + rev.diem_den_id" class="ta-link sm">{{ rev.ten_diem_den }}</router-link>
              <button class="ta-helpful" @click="voteHuuIchFeed(rev.id)">
                <ThumbsUp :size="13" /> {{ laySoHuuIch(rev.id) }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= 7. CTA VIẾT ĐÁNH GIÁ ================= -->
      <section class="ta-cta">
        <div>
          <h2>Bạn vừa có một chuyến đi?</h2>
          <p>Chia sẻ trải nghiệm để giúp hàng nghìn du khách khác lựa chọn đúng điểm đến.</p>
        </div>
        <router-link to="/viet-danh-gia" class="ta-btn-dark lg"><PenLine :size="16" /> Viết đánh giá</router-link>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import {
  Search, MapPin, Award, Heart, PenLine, ThumbsUp, X,
  Compass, Hotel, Ship, Utensils, ChevronLeft, ChevronRight
} from 'lucide-vue-next'
import { DataService, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const router = useRouter()

const dsDiemDen = ref([])
const tuKhoaTimKiem = ref('')
const locDiaPhuong = ref('')
const danhMucHienTai = ref('all')
const hienSuggestions = ref(false)
const searchBoxRef = ref(null)
const ketQuaRef = ref(null)
const carouselRefs = {}

const danhSachTinhThanh = ['Quảng Ninh', 'Ninh Bình', 'Kiên Giang']

const danhMucTabs = [
  { key: 'all', label: 'Tìm kiếm tất cả', icon: Search, ph: 'Địa điểm, hoạt động, khách sạn…' },
  { key: 'hotels', label: 'Khách sạn', icon: Hotel, ph: 'Tên khách sạn hoặc điểm đến' },
  { key: 'attractions', label: 'Hoạt động', icon: Compass, ph: 'Điểm tham quan, di sản…' },
  { key: 'cruises', label: 'Du thuyền', icon: Ship, ph: 'Du thuyền, tour vịnh…' },
  { key: 'restaurants', label: 'Nhà hàng', icon: Utensils, ph: 'Nhà hàng, ẩm thực…' }
]

const KHIA_CANH_HIEN_THI = [
  { key: 'canh_quan', label: 'Cảnh quan' },
  { key: 'dich_vu', label: 'Dịch vụ' },
  { key: 'am_thuc', label: 'Ẩm thực' },
  { key: 've_sinh', label: 'Vệ sinh' },
  { key: 'gia_ca', label: 'Giá cả' }
]

const placeholderTimKiem = computed(
  () => danhMucTabs.find(t => t.key === danhMucHienTai.value)?.ph || danhMucTabs[0].ph
)

// ---- Lưu yêu thích & hữu ích ----
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
async function voteHuuIchFeed(id) {
  const newV = await DataService.tangLuotHuuIch(id)
  votesMap.value = { ...votesMap.value, [id]: newV }
}

// ---- Bubble rating chuẩn TripAdvisor (hỗ trợ nửa bong bóng) ----
function bubbleClass(rating, i) {
  const r = Math.round(Number(rating || 0) * 2) / 2
  if (r >= i) return 'full'
  if (r >= i - 0.5) return 'half'
  return 'empty'
}
function formatSo(n) {
  return Number(n || 0).toLocaleString('vi-VN')
}

// ---- Đóng gợi ý khi bấm ra ngoài ----
function xuLyClickNgoai(e) {
  if (searchBoxRef.value && !searchBoxRef.value.contains(e.target)) {
    hienSuggestions.value = false
  }
}

onMounted(async () => {
  document.addEventListener('mousedown', xuLyClickNgoai)
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
})
onBeforeUnmount(() => document.removeEventListener('mousedown', xuLyClickNgoai))

function chonDanhMucTab(key) {
  danhMucHienTai.value = key
}

const goiYDiemDen = computed(() => {
  const theoDanhMuc = dsDiemDen.value.filter(
    d => danhMucHienTai.value === 'all' || d.danh_muc === danhMucHienTai.value
  )
  const kw = tuKhoaTimKiem.value.trim().toLowerCase()
  if (!kw) return theoDanhMuc.slice(0, 5)
  return theoDanhMuc
    .filter(d =>
      d.ten.toLowerCase().includes(kw) ||
      (d.ten_rut_gon && d.ten_rut_gon.toLowerCase().includes(kw)) ||
      d.tinh_thanh.toLowerCase().includes(kw)
    )
    .slice(0, 6)
})

function chonGoiY(dest) {
  hienSuggestions.value = false
  router.push(`/diem-den/${dest.id}`)
}

async function thucHienTimKiem() {
  hienSuggestions.value = false
  const kw = tuKhoaTimKiem.value.trim().toLowerCase()
  // Trùng đúng 1 điểm đến -> vào thẳng trang chi tiết
  if (kw && goiYDiemDen.value.length === 1) {
    router.push(`/diem-den/${goiYDiemDen.value[0].id}`)
    return
  }
  await nextTick()
  ketQuaRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function chonTinh(ten) {
  locDiaPhuong.value = locDiaPhuong.value === ten ? '' : ten
  nextTick(() => ketQuaRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function cuon(key, huong) {
  const el = carouselRefs[key]
  if (el) el.scrollBy({ left: huong * el.clientWidth * 0.8, behavior: 'smooth' })
}

// ---- Dữ liệu hiển thị ----
const sapXepTheoUyTin = computed(() =>
  [...dsDiemDen.value].sort((a, b) => {
    const wa = parseFloat(String(a.khoang_tin_cay_wilson || '0').split('-')[0])
    const wb = parseFloat(String(b.khoang_tin_cay_wilson || '0').split('-')[0])
    return wb - wa
  })
)

const banner = computed(() => sapXepTheoUyTin.value.find(d => d.danh_muc === 'attractions') || sapXepTheoUyTin.value[0])

const nhomCarousel = computed(() => {
  const all = sapXepTheoUyTin.value
  const nhom = [
    {
      key: 'top',
      tieuDe: 'Điểm đến được yêu thích nhất',
      moTa: "Những nơi đạt chuẩn Travelers' Choice theo đánh giá của du khách.",
      items: all.filter(d => d.trang_thai_wilson === 'diem_sang')
    },
    {
      key: 'attractions',
      tieuDe: 'Hoạt động & di sản không thể bỏ lỡ',
      moTa: 'Danh thắng, hang động và trải nghiệm thiên nhiên nổi bật.',
      items: all.filter(d => d.danh_muc === 'attractions')
    },
    {
      key: 'stay',
      tieuDe: 'Nơi lưu trú & du thuyền hàng đầu',
      moTa: 'Khu nghỉ dưỡng và du thuyền được đánh giá cao nhất.',
      items: all.filter(d => d.danh_muc === 'hotels' || d.danh_muc === 'cruises')
    }
  ]
  return nhom.filter(n => n.items.length > 0)
})

const tinhThanhTiles = computed(() =>
  danhSachTinhThanh.map(ten => {
    const ds = dsDiemDen.value.filter(d => d.tinh_thanh === ten)
    return { ten, soLuong: ds.length, anh: ds[0]?.hinh_anh || '' }
  })
)

const diemDenHienThi = computed(() =>
  sapXepTheoUyTin.value.filter(d => {
    if (locDiaPhuong.value && d.tinh_thanh !== locDiaPhuong.value) return false
    if (danhMucHienTai.value !== 'all' && d.danh_muc !== danhMucHienTai.value) return false
    const kw = tuKhoaTimKiem.value.trim().toLowerCase()
    if (kw) {
      const match =
        d.ten.toLowerCase().includes(kw) ||
        (d.ten_rut_gon && d.ten_rut_gon.toLowerCase().includes(kw)) ||
        d.tinh_thanh.toLowerCase().includes(kw)
      if (!match) return false
    }
    return true
  })
)

const danhSachDanhGiaMoi = computed(() => {
  const custom = JSON.parse(localStorage.getItem('dt12_custom_reviews') || '[]')
  return [...custom, ...(DANH_SACH_DANH_GIA_TRIPADVISOR || [])]
    .filter(r => (r.noi_dung || '').length > 40)
    .slice(0, 6)
})

function datLaiBoLoc() {
  tuKhoaTimKiem.value = ''
  locDiaPhuong.value = ''
  danhMucHienTai.value = 'all'
}
</script>

<style scoped>
.ta-home {
  --ta-text: var(--mau-chu, #000);
  --ta-muted: var(--mau-chu-phu, #555);
  --ta-line: var(--nevio-border, #e0e0e0);
  --ta-card: var(--nevio-card-bg, #fff);
  --ta-soft: var(--nevio-light-grey, #f2f2f2);
  --ta-yellow: #fddd62;
  --ta-yellow-dark: #e5be29;
  --ta-dark: #18181b;
  background: var(--mau-nen, #fff);
  color: var(--ta-text);
  min-height: 100vh;
}

.ta-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---------- HERO ---------- */
.ta-hero {
  position: relative;
  z-index: 30; /* luôn nằm trên nội dung bên dưới để dropdown không bị che */
  padding: 48px 0 32px;
  text-align: center;
}
.ta-hero-title {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin: 0 0 28px;
}
.ta-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: none;
}
.ta-tabs::-webkit-scrollbar { display: none; }
.ta-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px 16px 10px;
  border: none;
  background: none;
  color: var(--ta-text);
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  transition: border-color 0.15s;
}
.ta-tab:hover { border-bottom-color: var(--ta-line); }
.ta-tab.active { border-bottom-color: var(--ta-text); }

.ta-search {
  position: relative;
  max-width: 760px;
  margin: 0 auto;
}
.ta-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--ta-card);
  border: 1px solid var(--ta-line);
  border-radius: 999px;
  padding: 6px 6px 6px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.15s, border-color 0.15s;
}
.ta-search-bar.focused {
  border-color: var(--ta-text);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.16);
}
.ta-search-icon { color: var(--ta-text); flex-shrink: 0; }
.ta-search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  font-family: inherit;
  color: var(--ta-text);
  padding: 10px 0;
}
.ta-search-clear {
  border: none;
  background: none;
  color: var(--ta-muted);
  cursor: pointer;
  display: flex;
}
.ta-search-btn {
  background: var(--ta-yellow);
  color: var(--ta-dark);
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
}
.ta-search-btn:hover { background: var(--ta-yellow-dark); }

.ta-suggest {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--ta-card);
  border: 1px solid var(--ta-line);
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.18);
  padding: 8px;
  text-align: left;
  max-height: 420px;
  overflow-y: auto;
}
.ta-suggest-head {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ta-muted);
  padding: 8px 12px;
  margin: 0;
}
.ta-suggest-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: left;
  color: var(--ta-text);
  font-family: inherit;
}
.ta-suggest-item:hover { background: var(--ta-soft); }
.ta-suggest-item img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}
.ta-suggest-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.ta-suggest-info strong { font-size: 15px; }
.ta-suggest-info span {
  font-size: 13px;
  color: var(--ta-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ta-suggest-empty { padding: 16px 12px; color: var(--ta-muted); margin: 0; }

/* ---------- BUBBLES ---------- */
.ta-bubbles { display: inline-flex; gap: 3px; align-items: center; }
.ta-bubbles i {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #f5b400;
  box-sizing: border-box;
}
.ta-bubbles i.full { background: #f5b400; }
.ta-bubbles i.half { background: linear-gradient(90deg, #f5b400 50%, transparent 50%); }
.ta-bubbles.sm i { width: 10px; height: 10px; }

/* ---------- MAIN ---------- */
.ta-main { position: relative; z-index: 1; padding-bottom: 64px; }
.ta-section { margin-top: 48px; }
.ta-section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}
.ta-h2 { font-size: 24px; font-weight: 900; margin: 0 0 4px; letter-spacing: -0.02em; }
.ta-sub { font-size: 14px; color: var(--ta-muted); margin: 0; }
.ta-link { font-weight: 800; color: var(--ta-text); text-decoration: underline; white-space: nowrap; font-size: 14px; }
.ta-link.sm { font-size: 13px; }

/* Banner */
.ta-banner {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 380px;
  margin-top: 8px;
}
.ta-banner-img { width: 100%; height: 100%; object-fit: cover; }
.ta-banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.2) 65%, transparent 100%);
}
.ta-banner-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding: 40px;
  max-width: 560px;
  color: #fff;
}
.ta-banner-content h2 { font-size: 36px; font-weight: 900; margin: 0; line-height: 1.15; }
.ta-banner-content p {
  margin: 0;
  font-size: 15px;
  line-height: 1.55;
  opacity: 0.92;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ta-badge-yellow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--ta-yellow);
  color: var(--ta-dark);
  font-size: 12px;
  font-weight: 800;
  padding: 5px 12px;
  border-radius: 999px;
}
.ta-badge-yellow.sm { font-size: 11px; padding: 4px 10px; }
.ta-btn-white {
  background: #fff;
  color: #000;
  font-weight: 800;
  padding: 12px 22px;
  border-radius: 999px;
  text-decoration: none;
  font-size: 14px;
}

/* Carousel */
.ta-arrows { display: flex; gap: 8px; }
.ta-arrows button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid var(--ta-line);
  background: var(--ta-card);
  color: var(--ta-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.ta-arrows button:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15); }
.ta-carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc((100% - 3 * 16px) / 4);
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-bottom: 4px;
}
.ta-carousel::-webkit-scrollbar { display: none; }
.ta-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scroll-snap-align: start;
}
.ta-card-media {
  position: relative;
  display: block;
  aspect-ratio: 1 / 1;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
  background: var(--ta-soft);
}
.ta-card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}
.ta-card:hover .ta-card-media img { transform: scale(1.05); }
.ta-card-award {
  position: absolute;
  left: 10px;
  top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: var(--ta-yellow);
  color: var(--ta-dark);
  font-size: 11px;
  font-weight: 800;
  padding: 4px 8px;
  border-radius: 6px;
}
.ta-heart {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
.ta-heart.saved { background: var(--ta-yellow); }
.ta-heart.saved :deep(svg) { fill: currentColor; }
.ta-card-title {
  font-size: 16px;
  font-weight: 800;
  color: var(--ta-text);
  text-decoration: none;
  line-height: 1.3;
}
.ta-card-title:hover { text-decoration: underline; }
.ta-rating-row { display: flex; align-items: center; gap: 6px; }
.ta-count { font-size: 13px; color: var(--ta-muted); }
.ta-card-meta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--ta-muted);
}

/* Province tiles */
.ta-province-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 16px;
}
.ta-province {
  position: relative;
  height: 200px;
  border-radius: 14px;
  overflow: hidden;
  border: 3px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--ta-soft);
  text-align: left;
}
.ta-province.active { border-color: var(--ta-yellow); }
.ta-province img { width: 100%; height: 100%; object-fit: cover; }
.ta-province::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.65), transparent 60%);
}
.ta-province-name,
.ta-province-count {
  position: absolute;
  left: 16px;
  z-index: 1;
  color: #fff;
}
.ta-province-name { bottom: 34px; font-size: 22px; font-weight: 900; }
.ta-province-count { bottom: 14px; font-size: 13px; opacity: 0.9; }

/* Chips */
.ta-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 20px;
}
.ta-chip {
  border: 1px solid var(--ta-line);
  background: var(--ta-card);
  color: var(--ta-text);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
.ta-chip:hover { border-color: var(--ta-text); }
.ta-chip.active { background: var(--ta-yellow); border-color: var(--ta-yellow-dark); color: var(--ta-dark); }
.ta-chip-sep { width: 1px; height: 24px; background: var(--ta-line); margin: 0 4px; }

/* List rows */
.ta-list { display: flex; flex-direction: column; }
.ta-row {
  display: grid;
  grid-template-columns: 240px 1fr 200px;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--ta-line);
}
.ta-row:last-child { border-bottom: 1px solid var(--ta-line); }
.ta-row-media {
  display: block;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}
.ta-row-media img { width: 100%; height: 100%; object-fit: cover; }
.ta-row-body { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.ta-row-title {
  font-size: 19px;
  font-weight: 900;
  color: var(--ta-text);
  text-decoration: none;
}
.ta-row-title:hover { text-decoration: underline; }
.ta-row-desc {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ta-muted);
  margin: 4px 0 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ta-aspects { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 13px; color: var(--ta-muted); margin-top: 4px; }
.ta-aspects strong { color: var(--ta-text); }
.ta-row-side {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  justify-content: center;
}
.ta-row-side .ta-badge-yellow { align-self: flex-start; }
.ta-wilson { font-size: 12.5px; color: var(--ta-muted); }
.ta-wilson strong { color: var(--ta-text); }
.ta-btn-dark,
.ta-btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid var(--ta-dark);
}
.ta-btn-dark { background: var(--ta-dark); color: #fff; }
.ta-btn-dark:hover { background: #000; }
.ta-btn-dark.lg { padding: 14px 26px; font-size: 15px; }
.ta-btn-outline { background: transparent; color: var(--ta-text); border-color: var(--ta-line); }
.ta-btn-outline:hover { border-color: var(--ta-text); }
.ta-empty { text-align: center; padding: 40px; border: 1px dashed var(--ta-line); border-radius: 14px; color: var(--ta-muted); }

/* Reviews */
.ta-review-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.ta-review {
  border: 1px solid var(--ta-line);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--ta-card);
}
.ta-review-user { display: flex; align-items: center; gap: 10px; }
.ta-review-user div { display: flex; flex-direction: column; }
.ta-review-user strong { font-size: 14px; }
.ta-review-user span { font-size: 12px; color: var(--ta-muted); }
.ta-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--ta-yellow);
  color: var(--ta-dark);
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ta-review-title { font-size: 15px; font-weight: 800; margin: 0; }
.ta-review-text {
  font-size: 14px;
  line-height: 1.5;
  color: var(--ta-muted);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.ta-review-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
}
.ta-helpful {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 1px solid var(--ta-line);
  background: none;
  color: var(--ta-text);
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
}
.ta-helpful:hover { background: var(--ta-yellow); border-color: var(--ta-yellow); color: var(--ta-dark); }

/* CTA */
.ta-cta {
  margin-top: 56px;
  background: var(--ta-yellow);
  color: var(--ta-dark);
  border-radius: 20px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.ta-cta h2 { margin: 0 0 6px; font-size: 26px; font-weight: 900; }
.ta-cta p { margin: 0; font-size: 15px; }

/* ---------- RESPONSIVE ---------- */
@media (max-width: 1024px) {
  .ta-carousel { grid-auto-columns: calc((100% - 2 * 16px) / 3); }
  .ta-row { grid-template-columns: 200px 1fr; }
  .ta-row-side { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: flex-start; }
  .ta-review-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .ta-wrap { padding: 0 16px; }
  .ta-hero { padding: 28px 0 20px; }
  .ta-hero-title { margin-bottom: 18px; }
  .ta-tabs { justify-content: flex-start; }
  .ta-tab { font-size: 13px; padding: 6px 10px 8px; }
  .ta-search-bar { padding-left: 14px; }
  .ta-search-btn { padding: 10px 16px; font-size: 14px; }
  .ta-banner { height: 300px; }
  .ta-banner-content { padding: 24px; }
  .ta-banner-content h2 { font-size: 26px; }
  .ta-carousel { grid-auto-columns: 70%; }
  .ta-arrows { display: none; }
  .ta-province-grid { grid-template-columns: 1fr; }
  .ta-province { height: 140px; }
  .ta-row { grid-template-columns: 110px 1fr; gap: 12px; }
  .ta-row-title { font-size: 16px; }
  .ta-row-desc, .ta-aspects { display: none; }
  .ta-review-grid { grid-template-columns: 1fr; }
  .ta-cta { flex-direction: column; align-items: flex-start; padding: 24px; }
}
@media (max-width: 480px) {
  .ta-search-btn span, .ta-search-btn { font-size: 0; padding: 10px; width: 40px; height: 40px; }
  .ta-search-btn::before { content: '→'; font-size: 18px; }
}
</style>
