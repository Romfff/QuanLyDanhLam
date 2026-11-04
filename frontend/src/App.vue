<template>
  <div id="app-root" class="nevio-app-layout">
    <!-- 1. Nevio Sticky Glass Header -->
    <Navbar />

    <!-- 2. Main Page View -->
    <main class="nevio-main-content">
      <router-view />
    </main>

    <!-- 3. Nevio Luxury Travel Footer -->
    <footer class="nevio-footer">
      <div class="nevio-container">
        <div class="footer-grid">
          <!-- Col 1: Brand & Mission -->
          <div class="footer-col brand-col">
            <div class="footer-brand">
              <span class="footer-logo-icon">🧭</span>
              <span class="footer-brand-name"><strong>ĐT-12</strong> TourSentiment</span>
            </div>
            <p class="footer-mission">
              Nền tảng trí tuệ nhân tạo giám sát danh tiếng điểm đến du lịch Việt Nam. Tự động trích xuất ý kiến du khách từ 874 đánh giá TripAdvisor, phân loại 5 khía cạnh cốt lõi bằng PhoBERT kết hợp công thức khoảng tin cậy Wilson Score công tâm.
            </p>
            <div class="footer-badges">
              <span class="f-badge">⚡ PhoBERT AI</span>
              <span class="f-badge">🛡️ Wilson Score 95%</span>
              <span class="f-badge">📊 TripAdvisor 874 reviews</span>
            </div>
          </div>

          <!-- Col 2: Navigation Links -->
          <div class="footer-col">
            <h4 class="footer-heading">Khám Phá Nhanh</h4>
            <ul class="footer-links">
              <li><router-link to="/dashboard">🏝️ Điểm đến nổi bật</router-link></li>
              <li><a href="/dashboard#absa-analytics">📊 Báo cáo phân tích ABSA</a></li>
              <li><router-link to="/danh-sach-danh-gia">📝 874 Đánh giá du khách</router-link></li>
              <li><router-link to="/phieu-cua-toi">🎟️ Ví phiếu ưu đãi của tôi</router-link></li>
              <li><router-link to="/dang-nhap">🔐 Cổng xác thực 5 vai trò</router-link></li>
            </ul>
          </div>

          <!-- Col 3: Technology Stack -->
          <div class="footer-col">
            <h4 class="footer-heading">Công Nghệ Đồ Án</h4>
            <ul class="footer-links">
              <li><span>🐍 Python FastAPI Microservice (Port 8001)</span></li>
              <li><span>🐘 Laravel 11.57 RESTful API (Port 8000)</span></li>
              <li><span>⚡ Vue 3 Composition API & Vite SPA</span></li>
              <li><span>🐬 MySQL 15 Tables (Chuẩn 3NF)</span></li>
              <li><span>📐 Thuật toán Wilson Score định tuyến</span></li>
            </ul>
          </div>

          <!-- Col 4: Project & Authors (Rubric Standard) -->
          <div class="footer-col">
            <h4 class="footer-heading">Học Phần CSE703073</h4>
            <p class="footer-rubric-info">
              <strong>Đồ án Cuối kỳ - Nhóm 03</strong><br/>
              Đề tài: Hệ thống phân tích đánh giá điểm đến du lịch (ĐT-12)
            </p>
            <div class="team-list">
              <div class="team-member"><span>24108738</span> - Nguyễn Trung Hiếu (SV1)</div>
              <div class="team-member"><span>24106135</span> - Hoàng Việt Anh (SV2)</div>
              <div class="team-member"><span>24105686</span> - Nguyễn Việt Dũng (SV3)</div>
              <div class="team-member"><span>24104760</span> - Phạm Tiến Nghĩa (SV4)</div>
              <div class="team-member"><span>24108256</span> - Nguyễn Ngọc Lan (SV5)</div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-copy">
            © 2026 Nhóm 03 - ĐT12 TourSentiment. Tất cả quyền được bảo lưu.
          </div>
          <div class="footer-disclaimer">
            * Kết quả danh tiếng và khía cạnh do mô hình PhoBERT AI tự động ước lượng. Du khách có thể đối soát nguyên văn đánh giá gốc để kiểm chứng.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
.nevio-app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--mau-nen);
  color: var(--mau-chu);
}

.nevio-main-content {
  flex: 1 0 auto;
}

/* Footer Styling */
.nevio-footer {
  flex-shrink: 0;
  background: var(--mau-nen-phu, #ffffff);
  border-top: 1px solid var(--duong-vien, #e2e8f0);
  padding: 60px 0 30px 0;
  margin-top: 60px;
  transition: all 0.25s ease;
}

[data-theme="dark"] .nevio-footer {
  background: #0f1523;
  border-color: #1e293b;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.2fr 1.4fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-logo-icon {
  font-size: 24px;
}

.footer-brand-name {
  font-size: 19px;
  font-weight: 700;
  color: var(--mau-chu);
}

.footer-brand-name strong {
  color: #059669;
}

.footer-mission {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--mau-chu-phu, #64748b);
  margin-bottom: 20px;
}

.footer-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.f-badge {
  font-size: 11px;
  font-weight: 600;
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  padding: 4px 10px;
  border-radius: 9999px;
  color: var(--mau-chu-phu);
}

.footer-heading {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 18px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-links li a, .footer-links li span {
  font-size: 13.5px;
  color: var(--mau-chu-phu, #64748b);
  transition: color 0.2s;
  text-decoration: none;
}

.footer-links li a:hover {
  color: var(--mau-nhan, #0284c7);
  padding-left: 4px;
}

.footer-rubric-info {
  font-size: 13px;
  color: var(--mau-chu-phu);
  margin-bottom: 12px;
  line-height: 1.5;
}

.team-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.team-member {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
}

.team-member span {
  font-family: monospace;
  font-weight: 600;
  color: var(--mau-chu);
}

.footer-bottom {
  border-top: 1px solid var(--duong-vien, #e2e8f0);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12.5px;
  color: var(--mau-chu-mo, #94a3b8);
}

.footer-disclaimer {
  max-width: 600px;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 640px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
