<template>
  <div id="app-root" class="nevio-app-layout">
    <!-- 1. Sticky Navbar for non-hero pages -->
    <div v-if="route.path !== '/dashboard' && route.path !== '/'" class="subpage-navbar-wrapper">
      <Navbar />
    </div>

    <!-- 2. Main Page View -->
    <main class="nevio-main-content">
      <router-view />
    </main>

    <!-- 3. Nevio Luxury Footer with Wave Top Shape -->
    <footer class="nevio-footer">
      <div class="footer-wave-wrap">
        <img 
          src="https://cdn.prod.website-files.com/6a5f49f597e097761e089dbc/6a61b42bcc08fce1801ad250_footer-wave.svg" 
          alt="Footer wave shape" 
          class="footer-wave-shape"
        />
      </div>

      <div class="nevio-container footer-content-wrap">
        <div class="footer-top-grid">
          <!-- Col 1: Brand & Mission -->
          <div class="footer-brand-col">
            <div class="footer-brand-header">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="7" fill="#303030"/>
                <path d="M12 4.5L14.5 9.5L20 10.3L16 14.2L16.9 19.7L12 17.1L7.1 19.7L8 14.2L4 10.3L9.5 9.5L12 4.5Z" fill="#fddd62"/>
              </svg>
              <span class="footer-brand-title">Nevio <span class="tag-accent">ĐT-12</span></span>
            </div>
            <p class="footer-brand-desc">
              Hệ thống trí tuệ nhân tạo giám sát danh tiếng điểm đến du lịch Việt Nam. Tự động trích xuất ý kiến từ 874 đánh giá TripAdvisor, phân loại 5 khía cạnh cốt lõi bằng PhoBERT kết hợp công thức khoảng tin cậy Wilson Score 95% công tâm, minh bạch.
            </p>
            <div class="footer-feature-pills">
              <span class="pill-chip">PhoBERT AI</span>
              <span class="pill-chip">Wilson Score 95%</span>
              <span class="pill-chip">TripAdvisor 874</span>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Khám Phá Nhanh</h4>
            <ul class="footer-menu-list">
              <li><router-link to="/dashboard">Kỳ quan &amp; Điểm đến nổi bật</router-link></li>
              <li><a href="/dashboard#absa-section">Báo cáo phân tích 5 khía cạnh ABSA</a></li>
              <li><router-link to="/danh-sach-danh-gia">Trung tâm 874 đánh giá TripAdvisor</router-link></li>
              <li><router-link to="/phieu-cua-toi">Ví phiếu ưu đãi &amp; voucher của tôi</router-link></li>
              <li><router-link to="/dang-nhap">Cổng xác thực 5 vai trò hệ thống</router-link></li>
            </ul>
          </div>

          <!-- Col 3: Tech Stack -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Kiến Trúc Công Nghệ</h4>
            <ul class="footer-menu-list">
              <li><span>Python FastAPI Microservice (Port 8001)</span></li>
              <li><span>Laravel 11.57 RESTful API (Port 8000)</span></li>
              <li><span>Vue 3 Composition API &amp; Vite SPA</span></li>
              <li><span>MySQL 15 Tables (Chuẩn hóa 3NF)</span></li>
              <li><span>Thuật toán Wilson Score định tuyến</span></li>
            </ul>
          </div>

          <!-- Col 4: Project Info & Authors -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Đồ Án CSE703073</h4>
            <p class="footer-project-meta">
              <strong>Học phần Phát Triển Ứng Dụng Web</strong><br/>
              Nhóm 03 · Đề tài ĐT-12
            </p>
            <div class="footer-authors-list">
              <div class="author-row"><span>24108738</span> - Nguyễn Trung Hiếu (SV1)</div>
              <div class="author-row"><span>24106135</span> - Hoàng Việt Anh (SV2)</div>
              <div class="author-row"><span>24105686</span> - Nguyễn Việt Dũng (SV3)</div>
              <div class="author-row"><span>24104760</span> - Phạm Tiến Nghĩa (SV4)</div>
              <div class="author-row"><span>24108256</span> - Nguyễn Ngọc Lan (SV5)</div>
            </div>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <div class="copyright-text">
            © 2026 Nhóm 03 - ĐT12 TourSentiment. Phong cách thiết kế chuẩn hóa theo Nevio Webflow Template.
          </div>
          <div class="model-disclaimer">
            * Kết quả danh tiếng do mô hình PhoBERT AI tự động trích xuất. Du khách có thể đối soát nguyên văn đánh giá TripAdvisor để kiểm chứng.
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const route = useRoute()
</script>

<style scoped>
.nevio-app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--mau-nen);
  color: var(--mau-chu);
}

.subpage-navbar-wrapper {
  position: relative;
  background: var(--nevio-dark);
  padding-bottom: 75px;
}

.nevio-main-content {
  flex: 1 0 auto;
}

/* =================================================== */
/* NEVIO FOOTER                                        */
/* =================================================== */
.nevio-footer {
  position: relative;
  background: var(--nevio-card-bg);
  border-top: 1px solid var(--nevio-border);
  padding: 60px 0 30px 0;
  margin-top: 60px;
}

.footer-wave-wrap {
  position: absolute;
  top: -24px;
  left: 0;
  right: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
}

.footer-wave-shape {
  width: 100%;
  height: 24px;
  object-fit: cover;
  opacity: 0.15;
}

.footer-top-grid {
  display: grid;
  grid-template-columns: 2fr 1.1fr 1.2fr 1.4fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.footer-brand-title {
  font-size: 22px;
  font-weight: 800;
  color: var(--mau-chu);
}

.tag-accent {
  font-size: 13px;
  font-weight: 700;
  color: var(--nevio-orange);
}

.footer-brand-desc {
  font-size: 13.5px;
  line-height: 1.7;
  color: var(--mau-chu-phu);
  margin-bottom: 20px;
}

.footer-feature-pills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.pill-chip {
  font-size: 11px;
  font-weight: 700;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  color: var(--mau-chu);
}

.footer-col-title {
  font-size: 14px;
  font-weight: 800;
  color: var(--mau-chu);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 18px;
}

.footer-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-menu-list li a, .footer-menu-list li span {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-menu-list li a:hover {
  color: var(--nevio-orange);
}

.footer-project-meta {
  font-size: 13px;
  color: var(--mau-chu-phu);
  margin-bottom: 12px;
  line-height: 1.5;
}

.footer-authors-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.author-row {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
}

.author-row span {
  font-family: monospace;
  font-weight: 700;
  color: var(--mau-chu);
}

.footer-bottom-bar {
  border-top: 1px solid var(--nevio-border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12.5px;
  color: var(--mau-chu-mo);
}

.model-disclaimer {
  max-width: 600px;
  line-height: 1.5;
}

@media (max-width: 1024px) {
  .footer-top-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
}

@media (max-width: 640px) {
  .footer-top-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
