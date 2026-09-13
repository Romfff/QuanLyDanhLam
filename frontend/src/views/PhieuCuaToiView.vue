<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const ds = ref([])
const loi = ref('')
const dangTai = ref(true)

onMounted(async () => {
  try {
    ds.value = (await api.get('/phieu-gioi-thieu/cua-toi')).data.data
  } catch (e) {
    loi.value = e.response?.data?.message || 'Không tải được danh sách phiếu giới thiệu'
  } finally {
    dangTai.value = false
  }
})
</script>

<template>
  <div class="trang">
    <h1>Phiếu giới thiệu của tôi</h1>
    <p v-if="loi" class="field-error" role="alert">{{ loi }}</p>
    <p v-if="dangTai">Đang tải danh sách phiếu...</p>
    <p v-else-if="!ds.length && !loi">Bạn chưa có phiếu giới thiệu nào.</p>
    
    <div v-else class="danh-sach-the" style="display: grid; gap: 16px; margin-top: 20px;">
      <article v-for="p in ds" :key="p.ma_tham_chieu" class="khoi" style="border: 1px solid #ccc; padding: 16px; border-radius: 8px;">
        <h3 class="the__tieu-de" style="margin-top: 0;">{{ p.diem_den || 'Điểm đến du lịch' }}</h3>
        <p class="the__phu">Mã tham chiếu: <strong>{{ p.ma_tham_chieu }}</strong></p>
        <p>Trạng thái: <strong>{{ p.trang_thai }}</strong></p>
        <p role="status" style="color: #2e7d32; font-weight: 500;">
          {{ p.thong_bao || 'Phiếu đang hoạt động theo đúng chính sách.' }}
        </p>
      </article>
    </div>
  </div>
</template>