<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const boLoc = reactive({ tu_khoa: '', diem_den_id: '', khia_canh_id: '', sac_thai: '',
                         tu_ngay: '', den_ngay: '', sap_xep: 'moi_nhat' })
const ds = ref([]); const meta = ref({}); const loi = ref(''); const dangTai = ref(false)
const dsDiemDen = ref([]); const dsKhiaCanh = ref([])
const moBoLoc = ref(false)

const NHAN_SAC_THAI = { tich_cuc: 'Tích cực', tieu_cuc: 'Tiêu cực', trung_tinh: 'Trung tính' }
const nhan = (v) => NHAN_SAC_THAI[v] ?? 'Chưa phân tích'
const lop = (v) => 'sac-thai sac-thai--' + (v ?? 'chua')

function docTuUrl() {
  for (const k in boLoc) boLoc[k] = route.query[k] ?? (k === 'sap_xep' ? 'moi_nhat' : '')
}

async function tai() {
  dangTai.value = true; loi.value = ''
  const params = { so_dong: 20, trang: route.query.trang || 1 }
  for (const k in boLoc) if (boLoc[k]) params[k] = boLoc[k]
  try {
    const res = await api.get('/danh-gia', { params })
    ds.value = res.data.data; meta.value = res.data.meta
  } catch (e) {
    loi.value = e.response?.data?.message || 'Không tải được dữ liệu'
  } finally { dangTai.value = false }
}

function loc() {
  const q = {}
  for (const k in boLoc) if (boLoc[k]) q[k] = boLoc[k]
  q.trang = 1
  router.push({ query: q })
  moBoLoc.value = false
}
function xoaLoc() { router.push({ query: {} }); moBoLoc.value = false }
function chuyenTrang(t) { router.push({ query: { ...route.query, trang: t } }) }

watch(() => route.query, () => { docTuUrl(); tai() }, { immediate: true })
watch(moBoLoc, (v) => { document.body.style.overflow = v ? 'hidden' : '' })
onUnmounted(() => { document.body.style.overflow = '' })
onMounted(async () => {
  dsDiemDen.value = (await api.get('/diem-den', { params: { so_dong: 100 } })).data.data
  dsKhiaCanh.value = (await api.get('/khia-canh')).data.data
})
</script>

<template>
  <div class="trang">
    <h1>Danh sách đánh giá</h1>

    <button type="button" class="nut nut-mo-loc" aria-controls="bo-loc"
            :aria-expanded="moBoLoc" @click="moBoLoc = true">Bộ lọc</button>

    <div class="bo-cuc-danh-sach">
      <div v-if="moBoLoc" class="nen-toi-ngan" @click="moBoLoc = false"></div>

      <aside id="bo-loc" class="bo-loc-khung" :class="{ mo: moBoLoc }"
             aria-label="Bộ lọc đánh giá" @keydown.esc="moBoLoc = false">
        <div class="bo-loc-dau">
          <h2>Bộ lọc</h2>
          <button type="button" class="nut nut-dong-loc" @click="moBoLoc = false">Đóng</button>
        </div>

        <form class="bo-loc" @submit.prevent="loc">
          <div class="truong">
            <label for="f-tu-khoa">Từ khóa</label>
            <input id="f-tu-khoa" v-model="boLoc.tu_khoa" maxlength="100" />
          </div>
          <div class="truong">
            <label for="f-diem-den">Điểm đến</label>
            <select id="f-diem-den" v-model="boLoc.diem_den_id">
              <option value="">Tất cả điểm đến</option>
              <option v-for="d in dsDiemDen" :key="d.id" :value="d.id">{{ d.ten }}</option>
            </select>
          </div>
          <div class="truong">
            <label for="f-khia-canh">Khía cạnh</label>
            <select id="f-khia-canh" v-model="boLoc.khia_canh_id">
              <option value="">Mọi khía cạnh</option>
              <option v-for="k in dsKhiaCanh" :key="k.id" :value="k.ten_khia_canh">{{ k.ten_khia_canh }}</option>
            </select>
          </div>
          <div class="truong">
            <label for="f-sac-thai">Sắc thái</label>
            <select id="f-sac-thai" v-model="boLoc.sac_thai">
              <option value="">Mọi sắc thái</option>
              <option value="tich_cuc">Tích cực</option>
              <option value="trung_tinh">Trung tính</option>
              <option value="tieu_cuc">Tiêu cực</option>
            </select>
          </div>
          <div class="hai-cot">
            <div class="truong">
              <label for="f-tu-ngay">Từ ngày</label>
              <input id="f-tu-ngay" type="date" v-model="boLoc.tu_ngay" />
            </div>
            <div class="truong">
              <label for="f-den-ngay">Đến ngày</label>
              <input id="f-den-ngay" type="date" v-model="boLoc.den_ngay" />
            </div>
          </div>
          <div class="truong">
            <label for="f-sap-xep">Sắp xếp</label>
            <select id="f-sap-xep" v-model="boLoc.sap_xep">
              <option value="moi_nhat">Mới nhất</option>
              <option value="diem_cao">Điểm cao trước</option>
              <option value="diem_thap">Điểm thấp trước</option>
            </select>
          </div>
          <div class="hang-nut">
            <button type="submit" class="nut nut--chinh">Lọc</button>
            <button type="button" class="nut" @click="xoaLoc">Xóa lọc</button>
          </div>
        </form>
      </aside>

      <section aria-live="polite">
        <p v-if="loi" class="field-error" role="alert">{{ loi }}</p>
        <p v-if="dangTai">Đang tải...</p>
        <p v-else-if="!ds.length && !loi">Không có đánh giá phù hợp.</p>

        <template v-else-if="ds.length">
          <!-- Điện thoại và máy tính bảng: dạng thẻ -->
          <div class="danh-sach-the">
            <article v-for="dg in ds" :key="dg.id" class="the">
              <div class="the__dau">
                <h3 class="the__tieu-de">{{ dg.diem_den.ten }}</h3>
                <span :class="lop(dg.sac_thai_tong)">{{ nhan(dg.sac_thai_tong) }}</span>
              </div>
              <p class="the__phu">{{ dg.diem_so }}/5 điểm · {{ dg.ngay_dang }}</p>
              <p class="the__noi-dung">{{ dg.noi_dung }}</p>
            </article>
          </div>

          <!-- Máy tính: bảng rộng -->
          <div class="bang-rong">
            <div class="cuon-ngang">
              <table>
                <caption class="chi-doc-man-hinh">Danh sách đánh giá</caption>
                <thead>
                  <tr>
                    <th scope="col">Điểm đến</th><th scope="col">Điểm</th>
                    <th scope="col">Nội dung</th><th scope="col">Sắc thái</th><th scope="col">Ngày đăng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dg in ds" :key="dg.id">
                    <td>{{ dg.diem_den.ten }}</td>
                    <td>{{ dg.diem_so }}</td>
                    <td class="noi-dung">{{ dg.noi_dung }}</td>
                    <td><span :class="lop(dg.sac_thai_tong)">{{ nhan(dg.sac_thai_tong) }}</span></td>
                    <td>{{ dg.ngay_dang }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>

        <nav v-if="meta.tong_trang > 1" class="phan-trang" aria-label="Phân trang">
          <button type="button" class="nut" :disabled="meta.trang <= 1" @click="chuyenTrang(meta.trang - 1)">Trước</button>
          <span>Trang {{ meta.trang }} / {{ meta.tong_trang }} ({{ meta.tong_ban_ghi }} đánh giá)</span>
          <button type="button" class="nut" :disabled="meta.trang >= meta.tong_trang" @click="chuyenTrang(meta.trang + 1)">Sau</button>
        </nav>
      </section>
    </div>
  </div>
</template>