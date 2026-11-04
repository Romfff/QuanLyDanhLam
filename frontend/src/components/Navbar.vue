<template>
  <header class="nevio-header">
    <div class="header-container">
      <!-- 1. Brand Logo -->
      <router-link to="/dashboard" class="brand-block">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#brand-grad)" stroke="#059669" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <defs>
              <linearGradient id="brand-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stop-color="#10b981"/>
                <stop offset="1" stop-color="#0284c7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title"><strong>ĐT-12</strong> TourSentiment</span>
          <span class="brand-tag">ABSA & Wilson Intelligence</span>
        </div>
      </router-link>

      <!-- 2. Desktop Navigation Menu -->
      <nav class="nav-links" aria-label="Menu chính">
        <router-link to="/dashboard" class="nav-item">
          <span>🏝️ Khám Phá Điểm Đến</span>
        </router-link>
        <a href="/dashboard#absa-analytics" class="nav-item">
          <span>📊 Phân Tích ABSA</span>
        </a>
        <router-link to="/danh-sach-danh-gia" class="nav-item">
          <span>📝 874 Đánh Giá TripAdvisor</span>
        </router-link>
        <router-link to="/phieu-cua-toi" class="nav-item nav-item--voucher">
          <span>🎟️ Phiếu Của Tôi</span>
          <span v-if="soPhieu > 0" class="voucher-count">{{ soPhieu }}</span>
        </router-link>
      </nav>

      <!-- 3. Actions: Role Switcher + Theme Toggle + Auth -->
      <div class="header-actions">
        <!-- Bộ chọn vai trò kiểm thử nhanh (1-click) -->
        <div class="role-selector-pill" :title="'Vai trò hiện tại: ' + vaiTroHienTai">
          <span class="role-icon">{{ roleIcon }}</span>
          <select v-model="vaiTroHienTai" @change="doiVaiTro" class="role-select">
            <option value="du_khach">Du khách (Tourist)</option>
            <option value="admin">Quản trị viên (Admin)</option>
            <option value="nha_phan_tich">Nhà phân tích (Analyst)</option>
            <option value="doi_tac">Đối tác du lịch (Partner)</option>
            <option value="kiem_duyet">Kiểm duyệt viên (Mod)</option>
          </select>
        </div>

        <ThemeToggle />

        <!-- User Profile / Auth Button -->
        <div v-if="daDangNhap" class="user-profile">
          <div class="avatar-circle" :title="tenNguoiDung">
            {{ tenNguoiDung.charAt(0).toUpperCase() }}
          </div>
          <button @click="dangXuat" class="btn-ghost-logout" title="Đăng xuất khỏi hệ thống">
            Đăng xuất
          </button>
        </div>
        <router-link v-else to="/dang-nhap" class="btn-nevio-login">
          Đăng nhập
        </router-link>

        <!-- Mobile Hamburger Toggle -->
        <button class="mobile-menu-btn" @click="moMenuMobile = !moMenuMobile" aria-label="Mở menu điều hướng">
          <span v-if="!moMenuMobile">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Navigation -->
    <div v-if="moMenuMobile" class="mobile-drawer" @click.self="moMenuMobile = false">
      <div class="drawer-content">
        <router-link to="/dashboard" class="drawer-item" @click="moMenuMobile = false">
          🏝️ Khám Phá Điểm Đến
        </router-link>
        <a href="/dashboard#absa-analytics" class="drawer-item" @click="moMenuMobile = false">
          📊 Phân Tích Khía Cạnh ABSA
        </a>
        <router-link to="/danh-sach-danh-gia" class="drawer-item" @click="moMenuMobile = false">
          📝 874 Đánh Giá TripAdvisor
        </router-link>
        <router-link to="/phieu-cua-toi" class="drawer-item" @click="moMenuMobile = false">
          🎟️ Phiếu Của Tôi
        </router-link>
        <div class="drawer-divider"></div>
        <div class="drawer-role">
          <label>Chuyển vai trò hệ thống:</label>
          <select v-model="vaiTroHienTai" @change="doiVaiTro" class="role-select-mobile">
            <option value="du_khach">Du khách</option>
            <option value="admin">Quản trị viên</option>
            <option value="nha_phan_tich">Nhà phân tích</option>
            <option value="doi_tac">Đối tác du lịch</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const router = useRouter()
const moMenuMobile = ref(false)
const soPhieu = ref(2)

const tenNguoiDung = ref(localStorage.getItem('ho_ten') || 'Khách trải nghiệm')
const vaiTroHienTai = ref(localStorage.getItem('vai_tro') || 'du_khach')
const daDangNhap = ref(!!localStorage.getItem('token'))

const roleIcon = computed(() => {
  switch (vaiTroHienTai.value) {
    case 'admin': return '👑'
    case 'nha_phan_tich': return '📊'
    case 'doi_tac': return '🏨'
    case 'kiem_duyet': return '🛡️'
    default: return '🧳'
  }
})

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
  tenNguoiDung.value = 'Khách trải nghiệm'
  vaiTroHienTai.value = 'du_khach'
  router.push('/dang-nhap')
}

onMounted(() => {
  const localTickets = localStorage.getItem('dt12_my_tickets')
  if (localTickets) {
    try {
      soPhieu.value = JSON.parse(localTickets).length
    } catch (e) {}
  }
})
</script>

<style scoped>
.nevio-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--mau-header, rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--duong-vien, #e2e8f0);
  transition: all 0.25s ease;
}

.header-container {
  max-width: var(--max-rong, 1280px);
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* Brand */
.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.brand-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(2, 132, 199, 0.15));
  border: 1px solid rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.15);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--mau-chu, #0f172a);
  line-height: 1.2;
}

.brand-title strong {
  color: #059669;
}

.brand-tag {
  font-size: 11px;
  color: var(--mau-chu-phu, #64748b);
  letter-spacing: 0.04em;
}

/* Nav Links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item {
  padding: 8px 14px;
  border-radius: 9999px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--mau-chu-phu, #475569);
  text-decoration: none;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-item:hover, .nav-item.router-link-active {
  color: #0284c7;
  background: var(--mau-nhan-sang, rgba(2, 132, 199, 0.08));
}

.nav-item--voucher {
  position: relative;
}

.voucher-count {
  background: #10b981;
  color: white;
  font-size: 11px;
  font-weight: 700;
  padding: 1px 7px;
  border-radius: 9999px;
  margin-left: 2px;
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-selector-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--mau-nen-the, #ffffff);
  border: 1px solid var(--duong-vien, #e2e8f0);
  padding: 4px 10px;
  border-radius: 9999px;
  box-shadow: var(--bong-nhe);
}

.role-icon {
  font-size: 14px;
}

.role-select {
  border: none;
  background: transparent;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--mau-chu, #0f172a);
  cursor: pointer;
  outline: none;
  font-family: inherit;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981, #0284c7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.3);
}

.btn-ghost-logout {
  background: transparent;
  border: 1px solid var(--duong-vien, #e2e8f0);
  border-radius: 9999px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--mau-chu-phu, #64748b);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-ghost-logout:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

.btn-nevio-login {
  background: #0f172a;
  color: #ffffff !important;
  padding: 8px 18px;
  border-radius: 9999px;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.2);
}

[data-theme="dark"] .btn-nevio-login {
  background: #38bdf8;
  color: #0b1120 !important;
}

.btn-nevio-login:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
}

.mobile-menu-btn {
  display: none;
  background: transparent;
  border: 1px solid var(--duong-vien, #cbd5e1);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 18px;
  color: var(--mau-chu, #0f172a);
  cursor: pointer;
}

/* Mobile Drawer */
.mobile-drawer {
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 99;
}

.drawer-content {
  background: var(--mau-nen-phu, #ffffff);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-bottom: 1px solid var(--duong-vien);
  box-shadow: var(--bong-the);
}

.drawer-item {
  font-size: 15px;
  font-weight: 600;
  padding: 10px 14px;
  border-radius: 10px;
  color: var(--mau-chu);
}

.drawer-item:hover {
  background: var(--mau-nhan-sang);
  color: var(--mau-nhan);
}

.drawer-divider {
  height: 1px;
  background: var(--duong-vien);
  margin: 6px 0;
}

.drawer-role {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--mau-chu-phu);
}

.role-select-mobile {
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid var(--duong-vien);
  background: var(--mau-nen);
  color: var(--mau-chu);
  font-size: 14px;
}

@media (max-width: 900px) {
  .nav-links {
    display: none;
  }
  .role-selector-pill {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
}
</style>
