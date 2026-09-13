<template>
  <div id="app">
    <header class="navbar">
      <div class="logo"><strong>ĐT-12 Tourism</strong></div>
      <nav>
        <router-link to="/dashboard">Dashboard</router-link>
        <router-link to="/danh-sach-danh-gia">Danh sách đánh giá</router-link>
        <router-link to="/diem-den/3">Chi tiết điểm đến</router-link>
        <router-link to="/phieu-cua-toi">Phiếu của tôi</router-link>
        <router-link v-if="coQuyenQuanTri" to="/quan-tri/diem-den" class="link-quan-tri">
          Quản trị
        </router-link>
      </nav>
      <div class="user-box">
        <span v-if="hoTen">Xin chào, <strong>{{ hoTen }}</strong> ({{ vaiTro }})</span>
        <button v-if="hoTen" @click="dangXuat">Đăng xuất</button>
        <router-link v-else to="/dang-nhap">Đăng nhập</router-link>
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
.navbar { display: flex; justify-content: space-between; padding: 12px 20px; background: #2c3e50; color: white; align-items: center; }
.navbar a { color: white; margin-right: 15px; text-decoration: none; }
.link-quan-tri { background: #e74c3c; padding: 4px 8px; border-radius: 4px; }
.user-box { display: flex; gap: 10px; align-items: center; }
button { cursor: pointer; padding: 6px 12px; }
</style>