<template>
  <div id="app-root" class="nevio-app-layout">
    <!-- 1. Header trắng cố định cho toàn bộ trang -->
    <Navbar v-if="route.path !== '/dang-nhap'" />

    <!-- 2. Main Page View -->
    <main class="nevio-main-content">
      <router-view />
    </main>

    <!-- 3. Footer chuẩn học thuật Mục 2.4 Đề thi kết thúc học phần CSE703073 -->
    <footer class="nevio-footer">
      <div class="nevio-container footer-content-wrap">
        <div class="footer-top-grid">
          <!-- Col 1: Brand & Mission (Đề tài ĐT-12) -->
          <div class="footer-brand-col">
            <div class="footer-brand-header">
              <div class="footer-logo-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L4 5.5V11.5C4 16.8 7.4 21.6 12 23C16.6 21.6 20 16.8 20 11.5V5.5L12 2Z" fill="#18181b"/>
                  <path d="M12 6.2L13.65 9.55L17.35 10.08L14.67 12.69L15.3 16.37L12 14.63L8.7 16.37L9.33 12.69L6.65 10.08L10.35 9.55L12 6.2Z" fill="#fddd62"/>
                </svg>
              </div>
              <div class="footer-brand-titles">
                <span class="footer-brand-title">DuLichSo <span class="tag-accent">ĐT-12</span></span>
                <span class="footer-brand-subtitle">Hệ thống phân tích ý kiến du khách &amp; giám sát danh tiếng điểm đến</span>
              </div>
            </div>
            <p class="footer-brand-desc">
              Nền tảng phân tích sắc thái đa khía cạnh (ABSA) ứng dụng mô hình ngôn ngữ tiếng Việt <strong>PhoBERT</strong> kết hợp khoảng tin cậy thống kê <strong>Wilson Score 95%</strong> (z = 1.96) trên tập 874 bản ghi đánh giá du lịch thực tế, hỗ trợ cơ quan quản lý và du khách ra quyết định dựa trên dữ liệu kiểm chứng.
            </p>
            <div class="footer-feature-pills">
              <span class="pill-chip">Đề tài ĐT-12</span>
              <span class="pill-chip">PhoBERT ABSA</span>
              <span class="pill-chip">Wilson Score 95% CI</span>
              <span class="pill-chip">874 Bản Ghi Thực Tế</span>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Cấu Trúc Điều Hướng</h4>
            <ul class="footer-menu-list">
              <li><router-link to="/dashboard">Trang chủ &amp; Tìm kiếm điểm đến</router-link></li>
              <li><router-link to="/diem-den">Bảng xếp hạng &amp; Danh mục điểm đến</router-link></li>
              <li><router-link to="/absa">Phân tích 5 khía cạnh dịch vụ (ABSA)</router-link></li>
              <li><router-link to="/danh-sach-danh-gia">Kho dữ liệu 874 đánh giá thực tế</router-link></li>
              <li><router-link to="/viet-danh-gia">Gửi bài đánh giá trải nghiệm mới</router-link></li>
              <li><router-link to="/dang-nhap">Cổng xác thực &amp; Phân quyền RBAC</router-link></li>
              <li><a href="/openapi.json" target="_blank" rel="noopener">Tài liệu OpenAPI 3.0 &amp; Chuẩn dữ liệu mở ↗</a></li>
              <li><a href="/destinations.geojson" target="_blank" rel="noopener">Dữ liệu không gian GeoJSON &amp; Schema.org ↗</a></li>
            </ul>
          </div>

          <!-- Col 3: Thông tin Học phần & Kiến trúc (Chuẩn Mục 2.2 & 2.4 Đề thi) -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Thông Tin Học Phần</h4>
            <ul class="footer-menu-list footer-academic-info">
              <li><strong>Đơn vị:</strong> Khoa Hệ thống thông tin – Trường CNTT, Đại học Phenikaa</li>
              <li><strong>Tên học phần:</strong> Lập trình ứng dụng web trong du lịch 2</li>
              <li><strong>Mã học phần:</strong> <code>CSE703073</code> (HK I · 2026 – 2027)</li>
              <li><strong>Tên nhóm:</strong> Nhóm 03 – <strong>DuLichSo</strong> (Đề tài <strong>ĐT-12</strong>)</li>
              <li><strong>GV hướng dẫn:</strong> TS. Nguyễn Văn Tánh</li>
              <li><strong>Kiến trúc:</strong> Vue 3 + Vite · Laravel 11 · Python FastAPI · MySQL 3NF</li>
            </ul>
          </div>

          <!-- Col 4: Danh sách Thành viên Nhóm 03 - DuLichSo -->
          <div class="footer-nav-col">
            <h4 class="footer-col-title">Thành Viên Nhóm 03 (DuLichSo)</h4>
            <p class="footer-project-meta">
              Phân công 6 vai trò chuẩn theo Mục 4.1 Đề thi kết thúc học phần:
            </p>
            <div class="footer-authors-list">
              <div class="author-row"><span>24108738</span> – Nguyễn Trung Hiếu <em>(Trưởng nhóm · V1)</em></div>
              <div class="author-row"><span>24106135</span> – Hoàng Việt Anh <em>(Kiến trúc dữ liệu · V2)</em></div>
              <div class="author-row"><span>24105686</span> – Nguyễn Việt Dũng <em>(Lập trình Back-end · V3)</em></div>
              <div class="author-row"><span>24104760</span> – Phạm Tiến Nghĩa <em>(Lập trình Front-end · V4)</em></div>
              <div class="author-row"><span>24108256</span> – Nguyễn Ngọc Lan <em>(Kiểm thử &amp; Nghiệp vụ · V5, V6)</em></div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar: Ghi chú học thuật bắt buộc theo Mục 2.4 Đề thi -->
        <div class="footer-bottom-bar">
          <div class="copyright-block">
            <div class="copyright-text">
              © 2026 <strong>Nhóm 03 – DuLichSo</strong> · Học phần: <strong>Lập trình ứng dụng web trong du lịch 2</strong> (Mã học phần: <strong>CSE703073</strong>) – Đại học Phenikaa.
            </div>
            <div class="academic-mandatory-badge">
              🎓 Sản phẩm học thuật – phục vụ mục đích đào tạo
            </div>
          </div>
          <div class="model-disclaimer">
            * Tuyên bố minh bạch mô hình (Mục IX ĐT-12): Kết quả phân loại sắc thái và chỉ số danh tiếng do mô hình tự động trích xuất kèm mức độ tin cậy thống kê (Wilson 95% CI, F1 = 94.6%), đóng vai trò chỉ báo hỗ trợ ra quyết định, không trình bày như sự thật tuyệt đối.
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
  grid-template-columns: 1.7fr 1.1fr 1.35fr 1.35fr;
  gap: 32px;
  margin-bottom: 36px;
}

.footer-brand-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.footer-logo-box {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: #fddd62;
  border: 1px solid #e5be29;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.footer-brand-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.footer-brand-title {
  font-size: 21px;
  font-weight: 900;
  color: var(--mau-chu);
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 6px;
}

.footer-brand-subtitle {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
}

.tag-accent {
  font-size: 11px;
  font-weight: 800;
  background: #fddd62;
  color: #18181b;
  padding: 2px 8px;
  border-radius: 9999px;
  border: 1px solid #e5be29;
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

.footer-academic-info li {
  font-size: 13px;
  line-height: 1.5;
  color: var(--mau-chu-phu);
}

.footer-academic-info li strong {
  color: var(--mau-chu);
}

.footer-academic-info code {
  background: #fef9c3;
  color: #854d0e;
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 800;
  font-size: 12px;
}

.author-row em {
  font-style: normal;
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.footer-bottom-bar {
  border-top: 1px solid var(--nevio-border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 12.5px;
  color: var(--mau-chu-mo);
}

.copyright-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright-text {
  color: var(--mau-chu-phu);
  font-size: 13px;
}

.academic-mandatory-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  background: #fef9c3;
  color: #18181b;
  border: 1px solid #fddd62;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 800;
}

.model-disclaimer {
  max-width: 580px;
  line-height: 1.55;
  font-size: 12px;
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
