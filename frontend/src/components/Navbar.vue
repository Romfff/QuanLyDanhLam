<template>
  <header class="nevio-navbar-wrap">
    <div class="nevio-navbar-inner">
      <!-- 1. Brand Logo -->
      <router-link to="/dashboard" class="nevio-brand">
        <div class="nevio-logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="7" fill="white"/>
            <path d="M12 4.5L14.5 9.5L20 10.3L16 14.2L16.9 19.7L12 17.1L7.1 19.7L8 14.2L4 10.3L9.5 9.5L12 4.5Z" fill="#303030"/>
          </svg>
        </div>
        <div class="nevio-brand-text">
          <span class="nevio-brand-title">Nevio <span class="tag-dt12">ĐT-12</span></span>
        </div>
      </router-link>

      <!-- 2. Centered Nav Links with Dot Indicator -->
      <nav class="nevio-nav-links" aria-label="Menu điều hướng chính">
        <router-link to="/dashboard" class="nevio-link">
          <span class="link-dot">•</span>
          <span>Khám Phá</span>
        </router-link>
        <a href="/dashboard#destinations-section" class="nevio-link">
          <span>Điểm Đến</span>
        </a>
        <a href="/dashboard#absa-section" class="nevio-link">
          <span>Phân Tích ABSA</span>
        </a>
        <router-link to="/danh-sach-danh-gia" class="nevio-link">
          <span>874 Đánh Giá TripAdvisor</span>
        </router-link>
        <router-link to="/phieu-cua-toi" class="nevio-link">
          <span>Ví Phiếu Của Tôi</span>
        </router-link>
      </nav>

      <!-- 3. Right Header Actions -->
      <div class="nevio-nav-actions">
        <!-- Quick Role Switcher Pill with Lucide Icon -->
        <div class="role-pill-select" :title="'Vai trò kiểm thử: ' + vaiTroHienTai">
          <component :is="iconVaiTro" :size="15" class="role-icon-svg" />
          <select v-model="vaiTroHienTai" @change="doiVaiTro" class="role-select-box">
            <option value="du_khach">Du khách</option>
            <option value="admin">Admin</option>
            <option value="nha_phan_tich">Analyst</option>
            <option value="doi_tac">Partner</option>
          </select>
        </div>

        <!-- Theme Toggle Button -->
        <button 
          @click="toggleTheme" 
          class="btn-theme-pill"
          :title="isDark ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'"
        >
          <Sun v-if="isDark" :size="16" />
          <Moon v-else :size="16" />
        </button>

        <!-- Auth Button (Nevio White Pill Style) -->
        <div v-if="daDangNhap" class="user-pill-wrap">
          <span class="user-avatar-char">{{ tenNguoiDung.charAt(0).toUpperCase() }}</span>
          <button @click="dangXuat" class="btn-logout-text" title="Đăng xuất">
            <LogOut :size="14" />
          </button>
        </div>
        <router-link v-else to="/dang-nhap" class="btn-nevio-white">
          Đăng Nhập
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
        Khám Phá Điểm Đến
      </router-link>
      <a href="/dashboard#destinations-section" class="mobile-nav-item" @click="moMenuMobile = false">
        Danh Sách 7 Điểm Đến
      </a>
      <a href="/dashboard#absa-section" class="mobile-nav-item" @click="moMenuMobile = false">
        Phân Tích 5 Khía Cạnh ABSA
      </a>
      <router-link to="/danh-sach-danh-gia" class="mobile-nav-item" @click="moMenuMobile = false">
        874 Đánh Giá TripAdvisor
      </router-link>
      <router-link to="/phieu-cua-toi" class="mobile-nav-item" @click="moMenuMobile = false">
        Ví Phiếu Của Tôi
      </router-link>
      <div class="mobile-divider"></div>
      <router-link to="/dang-nhap" class="mobile-nav-item" @click="moMenuMobile = false">
        Cổng Xác Thực 5 Vai Trò
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
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
  X 
} from 'lucide-vue-next'

const router = useRouter()
const moMenuMobile = ref(false)
const isDark = ref(false)

const tenNguoiDung = ref(localStorage.getItem('ho_ten') || 'Khách')
const vaiTroHienTai = ref(localStorage.getItem('vai_tro') || 'du_khach')
const daDangNhap = ref(!!localStorage.getItem('token'))

const iconVaiTro = computed(() => {
  switch (vaiTroHienTai.value) {
    case 'admin': return ShieldCheck
    case 'nha_phan_tich': return BarChart2
    case 'doi_tac': return Briefcase
    default: return User
  }
})

function toggleTheme() {
  isDark.value = !isDark.value
  const mode = isDark.value ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', mode)
  localStorage.setItem('dt12_theme', mode)
}

function doiVaiTro() {
  localStorage.setItem('vai_tro', vaiTroHienTai.value)
  if (!localStorage.getItem('token')) {
    localStorage.setItem('token', 'demo_token_' + vaiTroHienTai.value)
    daDangNhap.value = true
  }
  window.dispatchEvent(new Event('role-changed'))
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
.nevio-navbar-wrap {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 24px 36px;
}

.nevio-navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

/* Brand */
.nevio-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.nevio-logo-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nevio-brand-title {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.02em;
}

.tag-dt12 {
  font-size: 13px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 9999px;
  margin-left: 4px;
  vertical-align: middle;
}

/* Nav Links */
.nevio-nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 8px 24px;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.nevio-link {
  font-size: 14.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s ease;
}

.nevio-link:hover, .nevio-link.router-link-active {
  color: #fddd62;
}

.link-dot {
  font-size: 16px;
  color: #fddd62;
  line-height: 1;
}

/* Right Actions */
.nevio-nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-pill-select {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 5px 12px;
  border-radius: 9999px;
  color: #ffffff;
}

.role-icon-svg {
  color: #fddd62;
}

.role-select-box {
  border: none;
  background: transparent;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  font-family: inherit;
}

.role-select-box option {
  background: #303030;
  color: #ffffff;
}

.btn-theme-pill {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-theme-pill:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-nevio-white {
  background: #ffffff;
  color: #303030 !important;
  font-size: 14px;
  font-weight: 700;
  padding: 8px 22px;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-nevio-white:hover {
  background: #fddd62;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.user-pill-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 9999px;
}

.user-avatar-char {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fddd62;
  color: #303030;
  font-weight: 800;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-logout-text {
  background: transparent;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.btn-mobile-burger {
  display: none;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
}

.nevio-mobile-dropdown {
  background: #1e2434;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 16px;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

.mobile-nav-item {
  color: #ffffff;
  font-size: 14.5px;
  font-weight: 600;
  padding: 6px 0;
  text-decoration: none;
}

.mobile-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 4px 0;
}

@media (max-width: 1024px) {
  .nevio-nav-links {
    display: none;
  }
  .btn-mobile-burger {
    display: flex;
  }
}
</style>
