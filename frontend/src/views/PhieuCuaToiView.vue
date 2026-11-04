<template>
  <div class="nevio-vouchers-page">
    <div class="nevio-container">
      <!-- 1. Header Section -->
      <div class="page-header">
        <div class="nevio-eyebrow emerald">VÍ PHIẾU BẢO HÀNH DANH TIẾNG</div>
        <h1 class="page-title">Phiếu Ưu Đãi &amp; Đặt Tour Của Tôi</h1>
        <p class="page-subtitle">
          Danh sách phiếu giảm giá và hỗ trợ đặt dịch vụ tour được hệ thống kích hoạt tự động cho các điểm đến đạt chuẩn <strong>"Điểm sáng du lịch"</strong> theo công thức Wilson Score.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="dangTai" class="loading-state">
        <span class="spinner"></span>
        <p>Đang tải ví phiếu ưu đãi của bạn...</p>
      </div>

      <!-- 2. Vouchers List (Boarding Pass / Luxury Ticket Style) -->
      <div v-else-if="danhSachPhieu.length > 0" class="vouchers-list">
        <div 
          v-for="phieu in danhSachPhieu" 
          :key="phieu.ma_tham_chieu" 
          class="voucher-ticket-card"
        >
          <!-- Left Badge Strip -->
          <div class="ticket-left-stub">
            <div class="discount-badge">
              <span class="disc-num">15%</span>
              <span class="disc-unit">GIẢM</span>
            </div>
            <div class="ticket-type">VOUCHER</div>
          </div>

          <!-- Main Ticket Body -->
          <div class="ticket-body">
            <div class="ticket-top">
              <span class="dest-location-pill">📍 {{ phieu.tinh_thanh || 'Việt Nam' }}</span>
              <span class="status-verified-pill">✓ Bảo chứng Wilson Score</span>
            </div>

            <h3 class="ticket-dest-name">{{ phieu.diem_den }}</h3>
            <p class="ticket-promo-text">{{ phieu.uu_dai_chi_tiet || 'Phiếu ưu đãi trải nghiệm dịch vụ du lịch cao cấp' }}</p>

            <div class="ticket-meta-grid">
              <div class="meta-item">
                <span class="meta-label">MÃ THAM CHIẾU:</span>
                <div class="code-copy-wrap">
                  <span class="meta-code">{{ phieu.ma_tham_chieu }}</span>
                  <button @click="saoChepMa(phieu.ma_tham_chieu)" class="btn-copy" title="Sao chép mã">
                    {{ daSaoChep === phieu.ma_tham_chieu ? '✓ Đã chép' : '📋 Chép' }}
                  </button>
                </div>
              </div>

              <div class="meta-item">
                <span class="meta-label">NGÀY CẤP:</span>
                <span class="meta-val">{{ phieu.ngay_tao || '2026-03-12' }}</span>
              </div>

              <div class="meta-item">
                <span class="meta-label">HIỆU LỰC:</span>
                <span class="meta-val highlight-green">Đang khả dụng</span>
              </div>
            </div>

            <p class="ticket-policy-note">
              {{ phieu.thong_bao || 'Phiếu hợp lệ được đối soát trực tiếp với nhà cung cấp dịch vụ du lịch đối tác.' }}
            </p>
          </div>

          <!-- Right Action Stub (QR/Barcode Visual + CTA) -->
          <div class="ticket-right-stub">
            <div class="barcode-visual">
              <div class="bar-lines"></div>
              <span class="bar-text">{{ phieu.ma_tham_chieu }}</span>
            </div>

            <button 
              @click="chuyenSangDoiTac(phieu)" 
              class="btn-use-ticket"
              title="Mở trang đối tác để áp dụng mã"
            >
              🚀 Sử Dụng Phiếu →
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state-box">
        <span class="empty-icon">🎟️</span>
        <h3>Ví phiếu của bạn hiện đang trống</h3>
        <p>
          Hãy khám phá các điểm đến được vinh danh <strong>"Điểm sáng du lịch"</strong> để nhận phiếu ưu đãi tour độc quyền!
        </p>
        <router-link to="/dashboard" class="btn-explore">
          Khám phá Điểm sáng du lịch ngay →
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { DataService } from '../services/dataService'

const danhSachPhieu = ref([])
const dangTai = ref(true)
const daSaoChep = ref('')

async function taiPhieu() {
  dangTai.value = true
  try {
    danhSachPhieu.value = await DataService.layPhieuCuaToi()
  } finally {
    dangTai.value = false
  }
}

function saoChepMa(ma) {
  navigator.clipboard.writeText(ma)
  daSaoChep.value = ma
  setTimeout(() => {
    daSaoChep.value = ''
  }, 3000)
}

function chuyenSangDoiTac(phieu) {
  const url = phieu.url_doi_tac || 'https://tripadvisor.com'
  window.open(url, '_blank')
}

onMounted(() => {
  taiPhieu()
})
</script>

<style scoped>
.nevio-vouchers-page {
  padding: 40px 0 80px 0;
}

.page-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 36px auto;
}

.page-title {
  font-size: 34px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 15px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
}

/* =================================================== */
/* BOARDING PASS / TICKET CARDS                        */
/* =================================================== */
.vouchers-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
}

.voucher-ticket-card {
  display: flex;
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: var(--bong-the);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
}

.voucher-ticket-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--bong-noi);
}

/* Left Stub */
.ticket-left-stub {
  background: linear-gradient(180deg, #059669 0%, #0284c7 100%);
  color: white;
  padding: 24px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 120px;
  text-align: center;
  border-right: 2px dashed rgba(255, 255, 255, 0.4);
}

.discount-badge {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.disc-num {
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.disc-unit {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  opacity: 0.9;
}

.ticket-type {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  opacity: 0.7;
}

/* Ticket Body */
.ticket-body {
  padding: 24px 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.ticket-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.dest-location-pill {
  font-size: 12px;
  font-weight: 600;
  color: #0284c7;
  background: rgba(2, 132, 199, 0.1);
  padding: 3px 10px;
  border-radius: 9999px;
}

.status-verified-pill {
  font-size: 11.5px;
  font-weight: 700;
  color: #059669;
  background: #ecfdf5;
  padding: 3px 10px;
  border-radius: 9999px;
}

.ticket-dest-name {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.ticket-promo-text {
  font-size: 14px;
  color: var(--mau-chu-phu);
  margin-bottom: 18px;
  line-height: 1.5;
}

.ticket-meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 14px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.meta-label {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--mau-chu-mo);
  letter-spacing: 0.05em;
}

.code-copy-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-code {
  font-family: monospace;
  font-size: 13.5px;
  font-weight: 800;
  color: #0284c7;
}

.btn-copy {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: var(--mau-chu);
}

.btn-copy:hover {
  background: #0284c7;
  color: white;
}

.meta-val {
  font-size: 13px;
  font-weight: 600;
  color: var(--mau-chu);
}

.highlight-green {
  color: #059669;
}

.ticket-policy-note {
  font-size: 11.5px;
  color: var(--mau-chu-mo);
  line-height: 1.4;
}

/* Right Stub */
.ticket-right-stub {
  background: var(--mau-nen);
  border-left: 2px dashed var(--duong-vien);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-width: 170px;
}

.barcode-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.bar-lines {
  width: 90px;
  height: 40px;
  background: repeating-linear-gradient(
    90deg,
    var(--mau-chu) 0px,
    var(--mau-chu) 2px,
    transparent 2px,
    transparent 4px,
    var(--mau-chu) 4px,
    var(--mau-chu) 7px,
    transparent 7px,
    transparent 9px
  );
  opacity: 0.6;
}

.bar-text {
  font-size: 9.5px;
  font-family: monospace;
  color: var(--mau-chu-mo);
}

.btn-use-ticket {
  background: #0f172a;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 9999px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(15, 23, 42, 0.2);
  white-space: nowrap;
}

[data-theme="dark"] .btn-use-ticket {
  background: #38bdf8;
  color: #0b1120;
}

.btn-use-ticket:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.3);
}

/* Empty State */
.empty-state-box, .loading-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--mau-nen-the);
  border-radius: 20px;
  border: 1px dashed var(--duong-vien);
  max-width: 600px;
  margin: 0 auto;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 14px;
  display: block;
}

.empty-state-box h3 {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 8px;
}

.empty-state-box p {
  font-size: 14px;
  color: var(--mau-chu-phu);
  margin-bottom: 24px;
  line-height: 1.6;
}

.btn-explore {
  background: linear-gradient(135deg, #059669, #0284c7);
  color: white;
  padding: 12px 24px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
  display: inline-block;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
}

@media (max-width: 768px) {
  .voucher-ticket-card {
    flex-direction: column;
  }
  .ticket-left-stub {
    border-right: none;
    border-bottom: 2px dashed rgba(255, 255, 255, 0.4);
    min-width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .ticket-meta-grid {
    grid-template-columns: 1fr;
  }
  .ticket-right-stub {
    border-left: none;
    border-top: 2px dashed var(--duong-vien);
    min-width: 100%;
  }
}
</style>
