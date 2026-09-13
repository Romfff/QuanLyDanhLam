<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const trangThai = ref(null)
const route = useRoute()
const router = useRouter()
const id = route.params.id

const diemDen = ref(null)
const dieuKien = ref(null)
const phieu = ref(null)
const conLai = ref(0)
const loi = ref('')
const dangXuLy = ref(false)
let timer = null

const phut = computed(() => String(Math.floor(conLai.value / 60)).padStart(2, '0'))
const giay = computed(() => String(conLai.value % 60).padStart(2, '0'))

onMounted(async () => {
  try {
    diemDen.value = (await api.get(`/diem-den/${id}`)).data.data
    dieuKien.value = (await api.get(`/diem-den/${id}/du-dieu-kien-gioi-thieu`)).data.data
    trangThai.value = (await api.get(`/diem-den/${id}/trang-thai`)).data.data
  } catch (e) {
    loi.value = e.response?.data?.message || 'Không tải được thông tin điểm đến'
  }
})

onUnmounted(() => clearInterval(timer))

function batDauDem() {
  clearInterval(timer)
  timer = setInterval(() => {
    conLai.value--
    if (conLai.value <= 0) { 
      clearInterval(timer)
      phieu.value = null
      loi.value = 'Phiếu ưu đãi đã hết hạn, hãy nhận lại.' 
    }
  }, 1000)
}

async function nhanUuDai() {
  loi.value = ''
  if (!localStorage.getItem('token')) { 
    router.push('/dang-nhap')
    return 
  }
  dangXuLy.value = true
  try {
    const res = await api.post(`/diem-den/${id}/gioi-thieu-tour`)
    phieu.value = res.data.data
    conLai.value = phieu.value.con_lai_giay
    batDauDem()
    dieuKien.value = (await api.get(`/diem-den/${id}/du-dieu-kien-gioi-thieu`)).data.data
  } catch (e) {
    loi.value = e.response?.data?.message || 'Không nhận được ưu đãi'
  } finally { 
    dangXuLy.value = false 
  }
}

async function sangDoiTac() {
  if (dangXuLy.value) return
  dangXuLy.value = true
  loi.value = ''
  try {
    const res = await api.post(`/phieu-gioi-thieu/${phieu.value.ma_tham_chieu}/chuyen-huong`)
    window.location.href = res.data.data.url
  } catch (e) {
    loi.value = e.response?.data?.message || 'Không chuyển hướng được'
    dangXuLy.value = false
  }
}
</script>

<template>
  <div class="trang">
    <p v-if="!diemDen && !loi">Đang tải thông tin...</p>

    <div v-if="diemDen" class="bo-cuc-chi-tiet">
      <!-- KHỐI THÔNG TIN ĐIỂM ĐẾN -->
      <section class="khoi khoi--thong-tin">
        <h1>{{ diemDen.ten }}</h1>
        <p class="the__phu">{{ diemDen.tinh_thanh }} · {{ diemDen.loai_hinh }}</p>
        <p>Điểm danh tiếng: <strong>{{ diemDen.diem_danh_tieng_tb ?? '—' }} / 5.0</strong>
           ({{ diemDen.tong_luot_danh_gia }} đánh giá)</p>
        <p>{{ diemDen.mo_ta }}</p>
      </section>

      <!-- BANNER CẢNH BÁO DANH TIẾNG (HIỆN KHI CÓ CẢNH BÁO) -->
      <section v-if="trangThai?.hien_canh_bao" class="khoi canh-bao-danh-tieng" role="alert">
        <h2>Cảnh báo danh tiếng</h2>
        <p>{{ trangThai.ly_do }}</p>
        <p class="the__phu">{{ trangThai.ghi_chu }}</p>
      </section>

      <!-- KHỐI GIỚI THIỆU TOUR & ƯU ĐÃI ĐỐI TÁC (ẨN KHI CÓ CẢNH BÁO) -->
      <section v-if="dieuKien && !trangThai?.hien_canh_bao" class="khoi khoi-gioi-thieu" aria-labelledby="tieu-de-gioi-thieu">
        <template v-if="dieuKien.du_dieu_kien && dieuKien.uu_dai">
          <h2 id="tieu-de-gioi-thieu">{{ dieuKien.uu_dai.ten }}</h2>
          <p>Hôm nay còn <strong>{{ dieuKien.uu_dai.con_lai_hom_nay }}</strong> lượt ưu đãi.</p>

          <button 
            v-if="!phieu" 
            type="button" 
            class="nut nut--chinh"
            :disabled="dangXuLy" 
            @click="nhanUuDai"
          >
            {{ dangXuLy ? 'Đang xử lý...' : 'Hỗ trợ đặt tour' }}
          </button>

          <div v-else>
            <p>Ưu đãi được giữ trong
              <strong class="dem-nguoc" role="timer" aria-live="off">{{ phut }}:{{ giay }}</strong>
            </p>
            <button 
              type="button" 
              class="nut nut--chinh"
              :disabled="dangXuLy" 
              @click="sangDoiTac"
            >
              {{ dangXuLy ? 'Đang chuyển hướng...' : 'Tiếp tục sang đối tác' }}
            </button>
          </div>

          <p class="the__phu">Liên kết đối tác: nhóm có thể nhận hoa hồng khi bạn mua tour. Điểm danh tiếng được tính độc lập với việc điểm đến có đối tác hay không.</p>
        </template>

        <template v-else>
          <h2 id="tieu-de-gioi-thieu">Hỗ trợ đặt tour</h2>
          <p v-if="dieuKien.ly_do && dieuKien.ly_do.length">Chưa hỗ trợ đặt tour: {{ dieuKien.ly_do.join('; ') }}</p>
          <p v-else>Điểm đến này chưa có ưu đãi đối tác.</p>
        </template>
      </section>
    </div>

    <!-- THÔNG BÁO LỖI -->
    <p v-if="loi" class="field-error" role="alert" style="margin-top: 15px;">{{ loi }}</p>
  </div>
</template>