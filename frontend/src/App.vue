<template>
  <div id="app">
    <header class="navbar">
      <div class="logo">
        <router-link to="/dashboard" class="brand-link">
          <strong>🏝️ ĐT-12 Tourism</strong>
        </router-link>
      </div>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/danh-sach-danh-gia">Danh sách đánh giá</router-link>
        <router-link to="/diem-den/1">Chi tiết điểm đến</router-link>
        <router-link to="/phieu-cua-toi">Phiếu của tôi</router-link>
        <router-link v-if="coQuyenQuanTri" to="/quan-tri/diem-den" class="link-quan-tri">
          Quản trị
        </router-link>
      </nav>
      <div class="user-box">
        <ThemeToggle />
        <span v-if="hoTen" class="user-greeting">Xin chào, <strong>{{ hoTen }}</strong> ({{ vaiTro }})</span>
        <button v-if="hoTen" class="btn-logout" @click="dangXuat">Đăng xuất</button>
        <router-link v-else to="/dang-nhap" class="btn-login">Đăng nhập</router-link>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import api from './services/api'
import ThemeToggle from './components/ThemeToggle.vue'

const router = useRouter()
const hoTen = ref(localStorage.getItem('ho_ten') || '')
const vaiTro = ref(localStorage.getItem('vai_tro') || '')

const coQuyenQuanTri = computed(() => ['admin', 'quan_ly_diem_den'].includes(vaiTro.value))

async function dangXuat() {
  try {
    await api.post('/auth/logout')
  } catch (e) {
    // Xóa LocalStorage dù API thành công hay thất bại
  } finally {
    localStorage.clear()
    hoTen.value = ''
    vaiTro.value = ''
    window.location.href = '/dang-nhap'
  }
}
</script>

<style>
.navbar { 
  display: flex; 
  justify-content: space-between; 
  padding: 12px 24px; 
  background: var(--mau-nen-phu, #1e293b); 
  color: var(--mau-chu, #f8fafc); 
  align-items: center;
  border-bottom: 1px solid var(--duong-vien, #334155);
}
.brand-link {
  color: var(--mau-nhan, #38bdf8) !important;
  font-size: 18px;
  text-decoration: none;
}
.navbar nav a { 
  color: var(--mau-chu, #cbd5e1); 
  margin-right: 18px; 
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s;
}
.navbar nav a:hover, .navbar nav a.router-link-active {
  color: var(--mau-nhan, #38bdf8);
}
.link-quan-tri { 
  background: #ef4444; 
  color: white !important; 
  padding: 4px 10px; 
  border-radius: 4px; 
}
.user-box { 
  display: flex; 
  gap: 12px; 
  align-items: center; 
}
.user-greeting {
  font-size: 13px;
}
.btn-logout, .btn-login {
  background: #334155;
  color: white;
  border: 1px solid #475569;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
}
.btn-logout:hover, .btn-login:hover {
  background: #475569;
}
</style>
