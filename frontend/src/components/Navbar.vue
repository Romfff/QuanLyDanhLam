<template>
  <header class="nevio-navbar-wrap">
    <div class="nevio-navbar-inner">
      <!-- 1. Brand Logo: TripAdvisor Intelligence -->
      <router-link to="/dashboard" class="nevio-brand">
        <div class="nevio-logo-icon tripadvisor-owl-badge">
          <span style="font-size: 20px;">🦉</span>
        </div>
        <div class="nevio-brand-text">
          <span class="nevio-brand-title">TripAdvisor <span class="tag-dt12">AI Verified</span></span>
        </div>
      </router-link>

      <!-- 2. Centered Nav Links with Dot Indicator -->
      <nav class="nevio-nav-links" aria-label="Menu điều hướng chính">
        <router-link to="/dashboard" class="nevio-link">
          <span>Khám Phá</span>
        </router-link>
        <router-link to="/diem-den" class="nevio-link">
          <span>Điểm Đến &amp; Xếp Hạng</span>
        </router-link>
        <router-link to="/absa" class="nevio-link">
          <span>Phân Tích PhoBERT</span>
        </router-link>
        <router-link to="/danh-sach-danh-gia" class="nevio-link">
          <span>Cộng Đồng Đánh Giá</span>
        </router-link>
        <router-link to="/viet-danh-gia" class="nevio-link btn-nav-write-review">
          <PenLine :size="14" />
          <span>Viết Đánh Giá</span>
        </router-link>
        <router-link v-if="vaiTroHienTai === 'admin'" to="/quan-tri" class="nevio-link admin-nav-link">
          <ShieldCheck :size="15" />
          <span>Quản Trị Hệ Thống</span>
        </router-link>
      </nav>

      <!-- 3. Right Header Actions -->
      <div class="nevio-nav-actions">
        <!-- Theme Toggle Button -->
        <button 
          @click="toggleTheme" 
          class="btn-theme-pill"
          :title="isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <!-- Auth Section: Role Badge + Logout when logged in, or Login Pill -->
        <div v-if="daDangNhap" class="user-authenticated-box">
          <div class="user-role-chip" :title="'Tài khoản: ' + tenNguoiDung">
            <component :is="iconVaiTro" :size="14" class="role-icon-svg" />
            <span class="role-text">{{ nhanVaiTro }}</span>
          </div>
          <span class="user-display-name">{{ tenNguoiDung }}</span>
          <button @click="dangXuat" class="btn-logout-circle" title="Đăng xuất khỏi hệ thống">
            <LogOut :size="14" />
          </button>
        </div>
        <router-link v-else to="/dang-nhap" class="btn-nevio-white">
          Đăng Nhập / Đăng Ký
        </router-link>

        <!-- Mobile Menu Toggle Button -->
        <button class="btn-mobile-burger" @click="moMenuMobile = !moMenuMobile" aria-label="Mở menu">
          <X v-if="moMenuMobile" :size="20" />
          <Menu v-else :size="20" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <div v-if="moMenuMobile" class="nevio-mobile-dropdown">
      <router-link to="/dashboard" class="mobile-nav-item" @click="moMenuMobile = false">
        Khám Phá
      </router-link>
      <router-link to="/diem-den" class="mobile-nav-item" @click="moMenuMobile = false">
        Điểm Đến &amp; Xếp Hạng
      </router-link>
      <router-link to="/absa" class="mobile-nav-item" @click="moMenuMobile = false">
        Phân Tích Cảm Xúc PhoBERT
      </router-link>
      <router-link to="/danh-sach-danh-gia" class="mobile-nav-item" @click="moMenuMobile = false">
        Cộng Đồng Đánh Giá TripAdvisor
      </router-link>
      <router-link to="/viet-danh-gia" class="mobile-nav-item" @click="moMenuMobile = false">
        ✍️ Viết Bài Đánh Giá Trải Nghiệm
      </router-link>
      <router-link v-if="vaiTroHienTai === 'admin'" to="/quan-tri" class="mobile-nav-item admin-mobile-item" @click="moMenuMobile = false">
        👑 Quản Trị Hệ Thống Admin
      </router-link>
      <div class="mobile-divider"></div>
      <router-link v-if="!daDangNhap" to="/dang-nhap" class="mobile-nav-item" @click="moMenuMobile = false">
        Đăng Nhập Hệ Thống
      </router-link>
      <button v-else @click="dangXuat" class="mobile-nav-item mobile-logout-btn">
        Đăng Xuất ({{ tenNguoiDung }})
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  Compass, 
  User, 
  ShieldCheck, 
  BarChart2, 
  Briefcase, 
  Sun, 
  Moon, 
  LogOut, 
  Menu, 
  PenLine,
  X 
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const moMenuMobile = ref(false)
const isDark = ref(false)

const tenNguoiDung = ref(localStorage.getItem('ho_ten') || 'Khách')
const vaiTroHienTai = ref(localStorage.getItem('vai_tro') || 'du_khach')
const daDangNhap = ref(!!localStorage.getItem('token'))

function capNhatAuth() {
  daDangNhap.value = !!localStorage.getItem('token')
  tenNguoiDung.value = localStorage.getItem('ho_ten') || 'Khách'
  vaiTroHienTai.value = localStorage.getItem('vai_tro') || 'du_khach'
}

watch(() => route.fullPath, () => {
  capNhatAuth()
  moMenuMobile.value = false
})

const iconVaiTro = computed(() => {
  return vaiTroHienTai.value === 'admin' ? ShieldCheck : Compass
})

const nhanVaiTro = computed(() => {
  return vaiTroHienTai.value === 'admin' ? 'Quản trị viên (Admin)' : 'Du khách trải nghiệm'
})

function toggleTheme() {
  isDark.value = !isDark.value
  const mode = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('dt12_theme', mode)
}

function dangXuat() {
  localStorage.removeItem('token')
  localStorage.removeItem('ho_ten')
  localStorage.removeItem('vai_tro')
  daDangNhap.value = false
  tenNguoiDung.value = 'Khách'
  vaiTroHienTai.value = 'du_khach'
  router.push('/dang-nhap')
}

onMounted(() => {
  capNhatAuth()
  window.addEventListener('storage', capNhatAuth)

  const savedTheme = localStorage.getItem('dt12_theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    isDark.value = false
    document.documentElement.setAttribute('data-theme', 'light')
  }
})
</script>

<style scoped>
/* Header trắng cố định chuẩn TripAdvisor */
.nevio-navbar-wrap {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--nevio-card-bg, #fff);
  border-bottom: 1px solid var(--nevio-border, #e0e0e0);
  padding: 10px 24px;
}

.nevio-navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 48px;
}

.nevio-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  flex-shrink: 0;
}

.nevio-logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #fddd62;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nevio-brand-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--mau-chu, #000);
  letter-spacing: -0.03em;
}

.tag-dt12 {
  font-size: 11px;
  font-weight: 800;
  background: #fddd62;
  color: #18181b;
  padding: 2px 8px;
  border-radius: 9999px;
  margin-left: 4px;
  vertical-align: middle;
}

.nevio-nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nevio-link {
  font-size: 15px;
  font-weight: 700;
  color: var(--mau-chu, #000);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 9999px;
  transition: background-color 0.15s ease;
  white-space: nowrap;
}

.nevio-link:hover {
  background: var(--nevio-light-grey, #f2f2f2);
}

.nevio-link.router-link-active {
  background: var(--nevio-light-grey, #f2f2f2);
}

.btn-nav-write-review {
  border: 1px solid var(--nevio-border, #e0e0e0);
}

.admin-nav-link {
  background: #fddd62 !important;
  color: #18181b !important;
}

.admin-mobile-item {
  font-weight: 800 !important;
}

.link-dot {
  font-size: 16px;
  color: #fddd62;
  line-height: 1;
}

.nevio-nav-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.user-authenticated-box {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--nevio-border, #e0e0e0);
  padding: 4px 6px 4px 10px;
  border-radius: 9999px;
  color: var(--mau-chu, #000);
}

.user-role-chip {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #fddd62;
  color: #18181b;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 11.5px;
  font-weight: 800;
}

.role-icon-svg {
  color: #18181b;
}

.user-display-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu, #000);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.btn-logout-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--nevio-light-grey, #f2f2f2);
  color: var(--mau-chu, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-logout-circle:hover {
  background: #ef4444;
  color: #fff;
}

.btn-theme-pill {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--nevio-border, #e0e0e0);
  color: var(--mau-chu, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-theme-pill:hover {
  background: var(--nevio-light-grey, #f2f2f2);
}

.btn-nevio-white {
  background: #18181b;
  color: #ffffff !important;
  font-size: 14px;
  font-weight: 800;
  padding: 10px 20px;
  border-radius: 9999px;
  text-decoration: none;
  white-space: nowrap;
}

.btn-nevio-white:hover {
  background: #000;
}

.btn-mobile-burger {
  display: none;
  background: transparent;
  border: 1px solid var(--nevio-border, #e0e0e0);
  color: var(--mau-chu, #000);
  padding: 7px;
  border-radius: 10px;
  cursor: pointer;
}

.nevio-mobile-dropdown {
  max-width: 1200px;
  margin: 10px auto 4px;
  background: var(--nevio-card-bg, #fff);
  border: 1px solid var(--nevio-border, #e0e0e0);
  border-radius: 14px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.mobile-nav-item {
  color: var(--mau-chu, #000);
  font-size: 15px;
  font-weight: 700;
  padding: 12px 14px;
  border-radius: 10px;
  text-decoration: none;
}

.mobile-nav-item:hover,
.mobile-nav-item.router-link-active {
  background: var(--nevio-light-grey, #f2f2f2);
}

.mobile-logout-btn {
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  color: #dc2626 !important;
  font-family: inherit;
}

.mobile-divider {
  height: 1px;
  background: var(--nevio-border, #e0e0e0);
  margin: 4px 0;
}

@media (max-width: 1100px) {
  .nevio-nav-links {
    display: none;
  }
  .btn-mobile-burger {
    display: flex;
  }
}

@media (max-width: 600px) {
  .nevio-navbar-wrap {
    padding: 8px 14px;
  }
  .tag-dt12,
  .user-display-name {
    display: none;
  }
  .btn-nevio-white {
    padding: 8px 14px;
    font-size: 13px;
  }
}
</style>
