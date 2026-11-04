<template>
  <div class="dashboard-page">
    <div class="dashboard-header">
      <div>
        <h1 class="page-title">Bảng Điều Khiển Giám Sát Danh Tiếng Du Lịch</h1>
        <p class="page-desc">Theo dõi ý kiến du khách, phân tích khía cạnh tự động (ABSA) và cảnh báo suy giảm</p>
      </div>
      <div class="header-actions">
        <router-link to="/danh-sach-danh-gia" class="btn btn-outline">
          📝 Danh sách đánh giá
        </router-link>
        <router-link to="/phieu-cua-toi" class="btn btn-primary">
          🎟️ Phiếu ưu đãi của tôi
        </router-link>
      </div>
    </div>

    <!-- KPI Summary Cards -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Tổng lượt đánh giá</div>
        <div class="kpi-value">350</div>
        <div class="kpi-sub positive">↑ +14.2% so với tháng trước</div>
      </div>
      <div class="kpi-card card-positive">
        <div class="kpi-label">Sắc thái Tích cực</div>
        <div class="kpi-value text-positive">78.5%</div>
        <div class="kpi-sub">275 đánh giá khen ngợi</div>
      </div>
      <div class="kpi-card card-neutral">
        <div class="kpi-label">Sắc thái Trung tính</div>
        <div class="kpi-value text-neutral">12.5%</div>
        <div class="kpi-sub">44 phản hồi trung gian</div>
      </div>
      <div class="kpi-card card-negative">
        <div class="kpi-label">Sắc thái Tiêu cực</div>
        <div class="kpi-value text-negative">9.0%</div>
        <div class="kpi-sub negative">31 góp ý cần cải thiện</div>
      </div>
    </div>

    <!-- Phân tích 5 Khía cạnh du lịch (ABSA) -->
    <div class="content-grid">
      <div class="panel">
        <div class="panel-header">
          <h3>Phân tích theo 5 Khía Cạnh Du Lịch (ABSA)</h3>
          <span class="badge">PhoBERT + Lexicon</span>
        </div>
        <div class="aspect-list">
          <div v-for="item in khiaCanhData" :key="item.ten" class="aspect-row">
            <div class="aspect-info">
              <span class="aspect-name">{{ item.icon }} {{ item.ten }}</span>
              <span class="aspect-score">{{ item.diem }}/5.0 ({{ item.tich_cuc }}% tích cực)</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill positive-fill" :style="{ width: item.tich_cuc + '%' }"></div>
              <div class="progress-fill negative-fill" :style="{ width: (100 - item.tich_cuc) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-header">
          <h3>Giám sát Khủng hoảng & Cảnh báo Danh tiếng</h3>
          <span class="badge badge-safe">Bình thường</span>
        </div>
        <div class="alert-box-safe">
          <div class="alert-icon">🛡️</div>
          <div class="alert-content">
            <h4>Không phát hiện bất thường</h4>
            <p>Hệ thống không ghi nhận đột biến tiêu cực nào vượt ngưỡng cảnh báo 20% trong 30 ngày qua.</p>
          </div>
        </div>
        <div class="mini-metrics">
          <div class="metric-item">
            <span class="metric-num">0</span>
            <span class="metric-lbl">Nghi ngờ giả mạo</span>
          </div>
          <div class="metric-item">
            <span class="metric-num">95%</span>
            <span class="metric-lbl">Khoảng tin cậy Wilson</span>
          </div>
          <div class="metric-item">
            <span class="metric-num">0.89</span>
            <span class="metric-lbl">Độ chính xác F1-Score</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Danh sách Điểm đến Nổi bật -->
    <div class="panel destinations-panel">
      <div class="panel-header">
        <h3>Điểm Đến Du Lịch Nổi Bật</h3>
        <span class="panel-sub">Dữ liệu thực tế giám sát danh tiếng</span>
      </div>

      <div class="dest-grid">
        <div v-for="dest in dsDiemDen" :key="dest.id" class="dest-card">
          <div class="dest-card-header">
            <h4>{{ dest.ten }}</h4>
            <span class="dest-location">📍 {{ dest.tinh_thanh }}</span>
          </div>
          <p class="dest-desc">{{ dest.mo_ta }}</p>
          <div class="dest-footer">
            <div class="dest-rating">⭐ {{ dest.diem_danh_tieng_trung_binh || '4.5' }} / 5.0</div>
            <router-link :to="'/diem-den/' + dest.id" class="btn btn-sm">
              Xem chi tiết →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const dsDiemDen = ref([
  { id: 1, ten: 'Bà Nà Hills', tinh_thanh: 'Đà Nẵng', mo_ta: 'Khu du lịch trên núi với Cầu Vàng nổi tiếng thế giới', diem_danh_tieng_trung_binh: 4.8 },
  { id: 2, ten: 'Phố Cổ Hội An', tinh_thanh: 'Quảng Nam', mo_ta: 'Di sản văn hóa thế giới với kiến trúc cổ kính và ẩm thực độc đáo', diem_danh_tieng_trung_binh: 4.7 },
  { id: 3, ten: 'Vịnh Hạ Long', tinh_thanh: 'Quảng Ninh', mo_ta: 'Kỳ quan thiên nhiên thế giới với hàng nghìn đảo đá vôi', diem_danh_tieng_trung_binh: 4.9 },
  { id: 4, ten: 'Đỉnh Fansipan Sapa', tinh_thanh: 'Lào Cai', mo_ta: 'Nóc nhà Đông Dương với tuyến cáp treo hiện đại và biển mây', diem_danh_tieng_trung_binh: 4.6 },
  { id: 5, ten: 'Đảo Ngọc Phú Quốc', tinh_thanh: 'Kiên Giang', mo_ta: 'Thiên đường nghỉ dưỡng biển đảo với nhiều bãi biển hoang sơ', diem_danh_tieng_trung_binh: 4.7 },
  { id: 6, ten: 'Quần thể Tràng An', tinh_thanh: 'Ninh Bình', mo_ta: 'Di sản hỗn hợp văn hóa và thiên nhiên của nhân loại', diem_danh_tieng_trung_binh: 4.8 }
])

const khiaCanhData = ref([
  { ten: 'Cảnh quan & Không gian', icon: '🏞️', diem: 4.9, tich_cuc: 92 },
  { ten: 'Ẩm thực & Đặc sản', icon: '🍜', diem: 4.7, tich_cuc: 86 },
  { ten: 'Chất lượng phục vụ', icon: '🛎️', diem: 4.5, tich_cuc: 79 },
  { ten: 'Vệ sinh môi trường', icon: '🧹', diem: 4.3, tich_cuc: 74 },
  { ten: 'Giá cả & Độ minh bạch', icon: '💵', diem: 4.2, tich_cuc: 71 }
])

onMounted(async () => {
  try {
    const res = await api.get('/diem-den', { params: { so_dong: 6 } })
    if (res.data?.data && res.data.data.length > 0) {
      dsDiemDen.value = res.data.data
    }
  } catch (e) {
    // Giữ dữ liệu demo nếu backend chưa bật
  }
})
</script>

<style scoped>
.dashboard-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  font-size: 26px;
  font-weight: 700;
  color: var(--mau-chu, #1e293b);
  margin-bottom: 4px;
}

.page-desc {
  font-size: 14px;
  color: #64748b;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: var(--mau-nhan, #0284c7);
  color: white;
  border: 1px solid var(--mau-nhan, #0284c7);
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-outline {
  background: transparent;
  color: var(--mau-nhan, #0284c7);
  border: 1px solid var(--mau-nhan, #0284c7);
}

.btn-outline:hover {
  background: rgba(2, 132, 199, 0.08);
}

.btn-sm {
  padding: 6px 12px;
  font-size: 13px;
  background: #f1f5f9;
  color: #0284c7;
  border: 1px solid #e2e8f0;
}

.btn-sm:hover {
  background: #e2e8f0;
}

/* KPI Cards */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card {
  background: var(--mau-nen-phu, #ffffff);
  border: 1px solid var(--duong-vien, #e2e8f0);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.kpi-card.card-positive { border-left: 4px solid #10b981; }
.kpi-card.card-neutral { border-left: 4px solid #f59e0b; }
.kpi-card.card-negative { border-left: 4px solid #ef4444; }

.kpi-label {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.kpi-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--mau-chu, #1e293b);
  margin-bottom: 4px;
}

.text-positive { color: #10b981; }
.text-neutral { color: #f59e0b; }
.text-negative { color: #ef4444; }

.kpi-sub {
  font-size: 12px;
  color: #94a3b8;
}

.kpi-sub.positive { color: #10b981; font-weight: 500; }
.kpi-sub.negative { color: #ef4444; font-weight: 500; }

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--mau-nen-phu, #ffffff);
  border: 1px solid var(--duong-vien, #e2e8f0);
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panel-header h3 {
  font-size: 18px;
  font-weight: 600;
  color: var(--mau-chu, #1e293b);
}

.badge {
  font-size: 11px;
  padding: 4px 8px;
  background: #e0f2fe;
  color: #0369a1;
  border-radius: 12px;
  font-weight: 600;
}

.badge-safe {
  background: #d1fae5;
  color: #065f46;
}

.aspect-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.aspect-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.aspect-info {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.aspect-name {
  font-weight: 500;
  color: var(--mau-chu, #334155);
}

.aspect-score {
  font-size: 13px;
  color: #64748b;
}

.progress-bar {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
}

.progress-fill.positive-fill {
  background: #10b981;
}

.progress-fill.negative-fill {
  background: #ef4444;
}

.alert-box-safe {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-icon {
  font-size: 28px;
}

.alert-content h4 {
  margin: 0 0 4px 0;
  color: #065f46;
  font-size: 15px;
}

.alert-content p {
  margin: 0;
  font-size: 13px;
  color: #047857;
  line-height: 1.4;
}

.mini-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  text-align: center;
}

.metric-item {
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
}

.metric-num {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: var(--mau-chu, #1e293b);
}

.metric-lbl {
  font-size: 11px;
  color: #64748b;
}

/* Destination Cards */
.destinations-panel {
  margin-top: 24px;
}

.panel-sub {
  font-size: 13px;
  color: #64748b;
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.dest-card {
  padding: 16px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.dest-card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}

.dest-card-header h4 {
  font-size: 16px;
  margin: 0;
  color: var(--mau-chu, #1e293b);
}

.dest-location {
  font-size: 12px;
  color: #64748b;
}

.dest-desc {
  font-size: 13px;
  color: #475569;
  line-height: 1.4;
  margin-bottom: 14px;
}

.dest-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;
}

.dest-rating {
  font-size: 13px;
  font-weight: 600;
  color: #d97706;
}
</style>
