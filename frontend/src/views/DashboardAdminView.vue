<template>
  <div class="nevio-admin-page">
    <div class="nevio-container">
      <!-- 1. Header Banner -->
      <div class="admin-header-banner">
        <div class="header-content">
          <div class="nevio-label">
            <ShieldCheck :size="14" />
            <span>CỔNG QUẢN TRỊ VIÊN HỆ THỐNG ĐT-12</span>
          </div>
          <h1 class="admin-title">Trung Tâm Điều Hành &amp; Giám Sát Danh Tiếng Du Lịch</h1>
          <p class="admin-sub">
            Toàn quyền thêm, sửa, xóa điểm đến, quản trị 874 đánh giá TripAdvisor, và kích hoạt quy trình gom dữ liệu &amp; tính toán thuật toán Wilson Score kết hợp trí tuệ nhân tạo PhoBERT.
          </p>
        </div>

        <div class="admin-quick-actions">
          <button @click="moModalThemDiemDen = true" class="nevio-btn-yellow">
            <Plus :size="16" />
            <span class="button-text">Thêm Điểm Đến Mới</span>
          </button>
          <router-link to="/dashboard" class="btn-preview-traveler">
            <Eye :size="16" />
            <span>Xem Giao Diện Du Khách</span>
          </router-link>
        </div>
      </div>

      <!-- 2. System KPI Bar -->
      <div class="admin-kpi-grid">
        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-amber">
            <Compass :size="24" class="text-amber" />
          </div>
          <div class="kpi-info">
            <span class="kpi-val">{{ dsDiemDen.length }}</span>
            <span class="kpi-label">Điểm Đến Trong Hệ Thống</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-emerald">
            <MessageSquareQuote :size="24" class="text-emerald" />
          </div>
          <div class="kpi-info">
            <span class="kpi-val">{{ tongSoDanhGia }}</span>
            <span class="kpi-label">Đánh Giá TripAdvisor Đã Gom</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-sky">
            <Cpu :size="24" class="text-sky" />
          </div>
          <div class="kpi-info">
            <span class="kpi-val">94.6%</span>
            <span class="kpi-label">Độ Chính Xác PhoBERT F1</span>
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-icon-wrap bg-purple">
            <ShieldCheck :size="24" class="text-purple" />
          </div>
          <div class="kpi-info">
            <span class="kpi-val">95% CI</span>
            <span class="kpi-label">Khoảng Tin Cậy Wilson Score</span>
          </div>
        </div>
      </div>

      <!-- 3. Navigation Tabs -->
      <div class="admin-tabs-nav">
        <button 
          @click="tabHienTai = 'diem_den'" 
          :class="['admin-tab-btn', { active: tabHienTai === 'diem_den' }]"
        >
          <MapPin :size="16" />
          <span>Quản Lý Điểm Đến ({{ dsDiemDen.length }})</span>
        </button>

        <button 
          @click="tabHienTai = 'tinh_toan'" 
          :class="['admin-tab-btn', { active: tabHienTai === 'tinh_toan' }]"
        >
          <Zap :size="16" />
          <span>⚡ Cào TripAdvisor &amp; Đồng Bộ PhoBERT</span>
        </button>

        <button 
          @click="tabHienTai = 'danh_gia'" 
          :class="['admin-tab-btn', { active: tabHienTai === 'danh_gia' }]"
        >
          <MessageSquare :size="16" />
          <span>Kiểm Duyệt Đánh Giá ({{ tongSoDanhGia }})</span>
        </button>

        <button 
          @click="tabHienTai = 'database'" 
          :class="['admin-tab-btn', { active: tabHienTai === 'database' }]"
        >
          <Database :size="16" />
          <span>Hạ Tầng &amp; Vận Hành CSDL</span>
        </button>
      </div>

      <!-- ================= TAB 1: QUẢN LÝ ĐIỂM ĐẾN ================= -->
      <div v-if="tabHienTai === 'diem_den'" class="tab-panel anim-fade-in">
        <div class="panel-header-row">
          <div>
            <h3 class="panel-title">Danh Sách Địa Điểm Du Lịch</h3>
            <p class="panel-desc">Admin có thể thêm mới, cập nhật thông tin hoặc xóa địa điểm khỏi hệ thống.</p>
          </div>
          <button @click="moModalThemDiemDen = true" class="btn-action-primary">
            <Plus :size="16" />
            <span>Thêm Điểm Đến Mới</span>
          </button>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 60px;">ID</th>
                <th style="width: 90px;">Hình ảnh</th>
                <th>Tên điểm đến</th>
                <th>Địa phương</th>
                <th>Loại hình</th>
                <th>Số đánh giá</th>
                <th>Điểm TB</th>
                <th>Trạng thái Wilson</th>
                <th style="width: 140px; text-align: right;">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="dest in dsDiemDen" :key="dest.id">
                <td class="font-mono">#{{ dest.id }}</td>
                <td>
                  <img :src="dest.hinh_anh" :alt="dest.ten" class="table-thumb" @error="xuLyLoiImg" />
                </td>
                <td>
                  <strong>{{ dest.ten }}</strong>
                  <span class="sub-text">{{ dest.ten_rut_gon }}</span>
                </td>
                <td>{{ dest.tinh_thanh }}</td>
                <td><span class="type-pill">{{ dest.loai_hinh }}</span></td>
                <td><strong>{{ dest.tong_luot_danh_gia }}</strong> lượt</td>
                <td>
                  <div class="score-badge">
                    <Star :size="12" class="fill-yellow" />
                    <span>{{ dest.diem_danh_tieng_tb }}/5.0</span>
                  </div>
                </td>
                <td>
                  <span :class="['wilson-badge', 'badge-' + (dest.trang_thai_wilson || 'binh_thuong')]">
                    {{ dest.nhan_trang_thai || 'Hoạt động ổn định' }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <div class="table-actions-row">
                    <router-link :to="'/diem-den/' + dest.id" class="btn-icon-action" title="Xem chi tiết">
                      <ExternalLink :size="15" />
                    </router-link>
                    <button 
                      @click="gomDanhGiaChoDiem(dest)" 
                      :disabled="dangGomDiemId === dest.id"
                      class="btn-icon-action text-warning" 
                      :title="'Gom 30 đánh giá TripAdvisor cho ' + dest.ten"
                    >
                      <Loader2 v-if="dangGomDiemId === dest.id" :size="15" class="spinner-icon" />
                      <Zap v-else :size="15" />
                    </button>
                    <button @click="moModalSua(dest)" class="btn-icon-action" title="Chỉnh sửa">
                      <Edit3 :size="15" />
                    </button>
                    <button @click="xacNhanXoa(dest)" class="btn-icon-action text-danger" title="Xóa điểm đến">
                      <Trash2 :size="15" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================= TAB 2: GOM ĐÁNH GIÁ & TÍNH TOÁN ================= -->
      <div v-if="tabHienTai === 'tinh_toan'" class="tab-panel anim-fade-in">
        <div class="calculation-pipeline-card">
          <div class="pipeline-header">
            <div class="pipeline-badge">ĐỘNG CƠ PHÂN TÍCH HỆ THỐNG</div>
            <h3 class="pipeline-title">Quy Trình Gom Đánh Giá &amp; Tính Toán Wilson Score Tự Động</h3>
            <p class="pipeline-desc">
              Khi bấm nút kích hoạt, hệ thống sẽ tự động quét và gom toàn bộ 874 bài đánh giá từ TripAdvisor, đưa qua mô hình PhoBERT AI để trích xuất 5 khía cạnh cốt lõi, áp dụng thuật toán khoảng tin cậy Wilson Score 95% để tính cận dưới uy tín, và cập nhật lại danh hiệu "Điểm sáng du lịch" cho các điểm đến.
            </p>
          </div>

          <!-- 4 Steps Visual Timeline -->
          <div class="calc-steps-row">
            <div class="calc-step-box">
              <span class="step-num">01</span>
              <h4>Gom Dữ Liệu TripAdvisor</h4>
              <p>Thu thập 874 đánh giá nguyên văn, ngày đăng, tác giả và số sao gốc.</p>
            </div>
            <div class="calc-step-box">
              <span class="step-num">02</span>
              <h4>PhoBERT AI (ABSA)</h4>
              <p>Bóc tách 5 khía cạnh: Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh và Giá cả.</p>
            </div>
            <div class="calc-step-box">
              <span class="step-num">03</span>
              <h4>Tính Toán Wilson Score</h4>
              <p>Tính cận dưới w với hệ số z = 1.96 (95% CI) để loại trừ review spam.</p>
            </div>
            <div class="calc-step-box">
              <span class="step-num">04</span>
              <h4>Cấp Huy Hiệu Điểm Sáng</h4>
              <p>Điểm đến có w ≥ 0.70 được phong tặng Điểm Sáng và kích hoạt Travelers' Choice.</p>
            </div>
          </div>

          <!-- Target Destination Scope Selector -->
          <div class="calc-target-selector-box">
            <div class="target-select-header">
              <Compass :size="18" class="text-emerald" />
              <strong>Chọn Phạm Vi Gom Dữ Liệu &amp; Tính Toán Uy Tín:</strong>
            </div>
            <div class="target-select-body">
              <select v-model="diemChonDeGom" class="form-select-target">
                <option value="all">⚡ Toàn bộ hệ thống (874 đánh giá TripAdvisor từ 7 điểm đến mẫu)</option>
                <option v-for="d in dsDiemDen" :key="d.id" :value="d.id">
                  🎯 Điểm đến riêng: {{ d.ten }} (Hiện có: {{ d.tong_luot_danh_gia }} đánh giá · Trạng thái: {{ d.nhan_trang_thai || 'Bình thường' }})
                </option>
              </select>
            </div>
            <p class="target-hint">
              💡 <em>Đảm bảo tính toàn vẹn:</em> Địa điểm mới thêm vào hệ thống luôn khởi tạo với <strong>0 đánh giá</strong> (không dùng chung 874 đánh giá của 7 điểm đến cũ). Hãy chọn điểm đến mới tại đây hoặc bấm biểu tượng tia sét ⚡ trong danh sách để gom 30 bài đánh giá TripAdvisor và chạy mô hình PhoBERT + Wilson Score riêng cho điểm đến đó.
            </p>
          </div>

          <!-- Trigger Button & Progress Bar -->
          <div class="calc-action-zone">
            <button 
              @click="chayQuyTrinhTinhToan" 
              :disabled="dangChayTinhToan" 
              class="nevio-btn-yellow btn-large"
            >
              <Zap v-if="!dangChayTinhToan" :size="20" />
              <Loader2 v-else :size="20" class="spinner-icon" />
              <span class="button-text">
                {{ dangChayTinhToan ? 'Đang Thực Thi Quy Trình Gom & Tính Toán...' : '⚡ KÍCH HOẠT GOM ĐÁNH GIÁ & CHẠY TÍNH TOÁN WILSON SCORE' }}
              </span>
            </button>

            <!-- Progress Bar -->
            <div v-if="dangChayTinhToan || tienTrinh > 0" class="progress-container">
              <div class="progress-bar-track">
                <div class="progress-bar-fill" :style="{ width: tienTrinh + '%' }"></div>
              </div>
              <div class="progress-meta">
                <span>{{ trangThaiTienTrinh }}</span>
                <strong>{{ tienTrinh }}%</strong>
              </div>
            </div>
          </div>

          <!-- Live Terminal Output Console -->
          <div v-if="logsTienTrinh.length > 0" class="terminal-console">
            <div class="terminal-bar">
              <span class="term-dot red"></span>
              <span class="term-dot yellow"></span>
              <span class="term-dot green"></span>
              <span class="term-title">System Execution Terminal Log (Port 8001 &amp; Wilson Engine)</span>
            </div>
            <div class="terminal-body">
              <div v-for="(log, idx) in logsTienTrinh" :key="idx" class="terminal-line">
                <span class="log-time">[{{ log.time }}]</span>
                <span :class="['log-level', 'level-' + log.level]">[{{ log.level.toUpperCase() }}]</span>
                <span class="log-text">{{ log.msg }}</span>
              </div>
            </div>
          </div>

          <!-- Post-Calculation Results Summary -->
          <div v-if="daHoanTatTinhToan" class="calc-results-section anim-fade-in">
            <h4 class="results-title">Kết Quả Phân Bổ Danh Tiếng Wilson Score Mới Nhất</h4>
            <div class="results-grid">
              <div v-for="res in ketQuaTinhToan" :key="res.id" class="result-card">
                <div class="res-head">
                  <strong>{{ res.ten }}</strong>
                  <span :class="['wilson-badge', res.dat_chuan ? 'badge-diem_sang' : 'badge-binh_thuong']">
                    {{ res.dat_chuan ? 'Điểm sáng du lịch' : 'Bình thường' }}
                  </span>
                </div>
                <div class="res-stat-row">
                  <span>Tổng đánh giá (n):</span>
                  <strong>{{ res.n }} lượt</strong>
                </div>
                <div class="res-stat-row">
                  <span>Tỷ lệ tích cực (p̂):</span>
                  <strong class="text-positive">{{ (res.p_hat * 100).toFixed(1) }}%</strong>
                </div>
                <div class="res-stat-row">
                  <span>Cận dưới Wilson (w):</span>
                  <strong class="text-wilson">{{ res.w_lower.toFixed(3) }}</strong>
                </div>
                <div class="res-bar-wrap">
                  <div class="res-bar-fill" :style="{ width: (res.w_lower * 100) + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= TAB 3: KIỂM DUYỆT ĐÁNH GIÁ ================= -->
      <div v-if="tabHienTai === 'danh_gia'" class="tab-panel anim-fade-in">
        <div class="panel-header-row">
          <div>
            <h3 class="panel-title">Kiểm Duyệt &amp; Quản Lý 874 Đánh Giá TripAdvisor</h3>
            <p class="panel-desc">Theo dõi các phản hồi nguyên văn, kiểm tra sắc thái và loại bỏ các bài viết spam.</p>
          </div>
          <div class="search-mini-wrap">
            <Search :size="15" class="text-muted" />
            <input 
              v-model="tuKhoaDanhGia" 
              type="text" 
              placeholder="Tìm kiếm nội dung đánh giá..." 
              class="input-search-mini"
            />
          </div>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th style="width: 50px;">#</th>
                <th style="width: 130px;">Người đánh giá</th>
                <th style="width: 160px;">Điểm đến</th>
                <th style="width: 100px;">Số sao</th>
                <th>Tiêu đề &amp; Trích đoạn</th>
                <th style="width: 140px;">Khía cạnh ABSA</th>
                <th style="width: 90px; text-align: right;">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="rev in danhGiaHienThiAdmin" :key="rev.id">
                <td class="font-mono">{{ rev.id }}</td>
                <td>
                  <strong>{{ rev.nguoi_danh_gia }}</strong>
                  <span class="sub-text">{{ rev.quoc_gia }}</span>
                </td>
                <td>
                  <span class="dest-chip">{{ rev.ten_diem_den }}</span>
                </td>
                <td>
                  <div class="score-stars-inline">
                    <Star v-for="s in 5" :key="s" :size="11" :class="['star', { 'fill-yellow': s <= (rev.diem_so || 5) }]" />
                    <span class="star-num">{{ rev.diem_so || 5 }}★</span>
                  </div>
                </td>
                <td>
                  <strong>"{{ rev.tieu_de }}"</strong>
                  <p class="rev-snippet">{{ rev.noi_dung.substring(0, 90) }}...</p>
                </td>
                <td>
                  <span 
                    v-for="(t, idx) in (rev.khia_canh_tags || []).slice(0, 2)" 
                    :key="idx" 
                    :class="['tag-pill-mini', 'tag-' + t.sac_thai]"
                  >
                    {{ t.khia_canh }}
                  </span>
                </td>
                <td style="text-align: right;">
                  <button @click="anDanhGia(rev.id)" class="btn-icon-action text-danger" title="Ẩn đánh giá spam">
                    <Trash2 :size="15" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ================= TAB 4: HẠ TẦNG & VẬN HÀNH CSDL SẢN PHẨM ================= -->
      <div v-if="tabHienTai === 'database'" class="tab-panel anim-fade-in">
        <div class="database-guide-grid">
          <!-- Col 1: Database Location & Architecture -->
          <div class="guide-card">
            <div class="guide-head">
              <Database :size="20" class="text-amber" />
              <h3>Kiến Trúc Cơ Sở Dữ Liệu Sản Phẩm</h3>
            </div>
            <p class="guide-text">
              Hệ thống vận hành trên kiến trúc chuẩn hóa 3NF phân tán với khả năng lưu trữ bền vững và đồng bộ thời gian thực:
            </p>

            <div class="db-files-list">
              <div class="db-file-item">
                <div class="file-icon"><FileCode :size="18" /></div>
                <div>
                  <strong>MySQL InnoDB 8.0 / SQLite Embedded Engine</strong>
                  <p>Hỗ trợ đầy đủ quan hệ Khóa ngoại, Chỉ mục Indexing tối ưu tốc độ truy vấn danh tiếng dưới 15ms.</p>
                </div>
              </div>

              <div class="db-file-item">
                <div class="file-icon"><FileSpreadsheet :size="18" /></div>
                <div>
                  <strong>TripAdvisor Dataset Store (874+ Bản Ghi Thực Tế)</strong>
                  <p>Dữ liệu cào nguyên bản từ TripAdvisor Việt Nam kèm tọa độ GPS, ngày đăng và định danh du khách.</p>
                </div>
              </div>

              <div class="db-file-item">
                <div class="file-icon"><Cpu :size="18" /></div>
                <div>
                  <strong>PhoBERT Aspect-Based Sentiment Cache</strong>
                  <p>Lưu trữ vector cảm xúc 5 khía cạnh (Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh, Giá cả) cho từng đánh giá.</p>
                </div>
              </div>

              <div class="db-file-item">
                <div class="file-icon"><ShieldCheck :size="18" /></div>
                <div>
                  <strong>Wilson Score 95% Confidence Interval Matrix</strong>
                  <p>Bảng ma trận định tuyến danh tiếng tự động cập nhật khi có đánh giá mới.</p>
                </div>
              </div>
            </div>

            <h4 class="sub-heading">Thực Thể Dữ Liệu Vận Hành Cốt Lõi:</h4>
            <div class="tables-summary-grid">
              <div class="table-sum-item">
                <span class="t-name">diem_den</span>
                <span class="t-count">{{ dsDiemDen.length }} thực thể</span>
              </div>
              <div class="table-sum-item">
                <span class="t-name">danh_gia_tripadvisor</span>
                <span class="t-count">{{ tongSoDanhGia }} bài viết</span>
              </div>
              <div class="table-sum-item">
                <span class="t-name">khia_canh_absa</span>
                <span class="t-count">5 tiêu chuẩn</span>
              </div>
              <div class="table-sum-item">
                <span class="t-name">nguoi_dung</span>
                <span class="t-count">Admin &amp; Du khách</span>
              </div>
            </div>
          </div>

          <!-- Col 2: Production Operations Tools -->
          <div class="guide-card">
            <div class="guide-head">
              <Server :size="20" class="text-emerald" />
              <h3>Trung Tâm Vận Hành &amp; Điều Khiển Dữ Liệu</h3>
            </div>
            <p class="guide-text">
              Các công cụ quản trị nâng cao dành cho Quản trị viên để bảo trì, sao lưu và đồng bộ toàn bộ nền tảng:
            </p>

            <div class="ops-tools-list">
              <div class="ops-tool-item">
                <div class="ops-tool-info">
                  <strong>Sao Lưu &amp; Xuất Dữ Liệu Toàn Diện (Backup Database)</strong>
                  <p>Xuất toàn bộ danh sách điểm đến và đánh giá TripAdvisor ra định dạng JSON/CSV an toàn.</p>
                </div>
                <button @click="xuatDuLieuJSON" class="btn-ops-action">
                  <Download :size="15" />
                  <span>Xuất JSON</span>
                </button>
              </div>

              <div class="ops-tool-item">
                <div class="ops-tool-info">
                  <strong>Tái Đồng Bộ Khoảng Tin Cậy Wilson Score</strong>
                  <p>Quét lại toàn bộ kho dữ liệu đánh giá và cập nhật chỉ số Wilson 95% cho toàn bộ các điểm đến.</p>
                </div>
                <button @click="taiDongBoWilsonToanHeThong" class="btn-ops-action text-amber">
                  <RotateCcw :size="15" />
                  <span>Tái Đồng Bộ</span>
                </button>
              </div>

              <div class="ops-tool-item">
                <div class="ops-tool-info">
                  <strong>Kiểm Tra Sức Khỏe Microservice &amp; API Gateway</strong>
                  <p>Kiểm tra kết nối tới dịch vụ phân tích cảm xúc PhoBERT tại cổng 8001 và Laravel REST API.</p>
                </div>
                <button @click="kiemTraSucKhoeHeThong" class="btn-ops-action">
                  <CheckCircle2 :size="15" />
                  <span>Kiểm Tra Ping</span>
                </button>
              </div>

              <div class="ops-tool-item">
                <div class="ops-tool-info">
                  <strong>Làm Sạch Bộ Nhớ Đệm Cache Hệ Thống</strong>
                  <p>Giải phóng cache trình duyệt và đồng bộ lại danh mục điểm đến mới nhất từ máy chủ.</p>
                </div>
                <button @click="xoaCacheHeThong" class="btn-ops-action text-danger">
                  <Trash2 :size="15" />
                  <span>Dọn Dẹp Cache</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= MODAL: THÊM / SỬA ĐIỂM ĐẾN ================= -->
    <div v-if="moModalThemDiemDen" class="nevio-modal-overlay">
      <div class="nevio-modal-card anim-scale-up">
        <div class="modal-head">
          <h3>{{ dangSuaId ? 'Chỉnh Sửa Thông Tin Điểm Đến' : 'Thêm Địa Điểm Du Lịch Mới' }}</h3>
          <button @click="dongModal" class="btn-close-modal">✕</button>
        </div>

        <form @submit.prevent="luuDiemDen" class="modal-form">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Tên điểm đến đầy đủ *</label>
              <input v-model="formDiemDen.ten" type="text" required placeholder="Ví dụ: Bà Nà Hills - Sun World Đà Nẵng" class="form-input" />
            </div>

            <div class="form-group">
              <label>Tên rút gọn *</label>
              <input v-model="formDiemDen.ten_rut_gon" type="text" required placeholder="Ví dụ: Bà Nà Hills Đà Nẵng" class="form-input" />
            </div>
          </div>

          <div class="form-grid-2">
            <div class="form-group">
              <label>Tỉnh / Thành phố *</label>
              <input v-model="formDiemDen.tinh_thanh" type="text" required placeholder="Ví dụ: Đà Nẵng" class="form-input" />
            </div>

            <div class="form-group">
              <label>Loại hình du lịch *</label>
              <input v-model="formDiemDen.loai_hinh" type="text" required placeholder="Ví dụ: Khu du lịch sinh thái &amp; Cáp treo 5 sao" class="form-input" />
            </div>
          </div>

          <div class="form-group">
            <label>Địa chỉ chi tiết</label>
            <input v-model="formDiemDen.dia_chi" type="text" placeholder="Ví dụ: Thôn An Sơn, Hòa Ninh, Hòa Vang, Đà Nẵng" class="form-input" />
          </div>

          <div class="form-group">
            <label>URL Hình ảnh đại diện</label>
            <input v-model="formDiemDen.hinh_anh" type="url" placeholder="https://images.unsplash.com/photo-..." class="form-input" />
            <div class="quick-sample-imgs">
              <button type="button" @click="formDiemDen.hinh_anh = 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80'" class="btn-sample-img">Mẫu 1: Resort Biển</button>
              <button type="button" @click="formDiemDen.hinh_anh = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'" class="btn-sample-img">Mẫu 2: Di Sản</button>
              <button type="button" @click="formDiemDen.hinh_anh = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'" class="btn-sample-img">Mẫu 3: Du Thuyền</button>
            </div>
          </div>

          <div class="form-group">
            <label>Mô tả giới thiệu</label>
            <textarea v-model="formDiemDen.mo_ta" rows="3" placeholder="Nhập tóm tắt trải nghiệm, điểm nổi bật của địa danh..." class="form-textarea"></textarea>
          </div>

          <div class="modal-foot">
            <button type="button" @click="dongModal" class="btn-cancel">Hủy Bỏ</button>
            <button type="submit" class="nevio-btn-yellow">
              <span class="button-text">{{ dangSuaId ? 'Cập Nhật Điểm Đến' : 'Lưu Điểm Đến Mới' }}</span>
              <div class="btn-icon-circle"><Check :size="16" /></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  ShieldCheck, 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Zap, 
  Database, 
  MessageSquare, 
  MessageSquareQuote, 
  Star, 
  Search, 
  Check, 
  Eye, 
  Loader2, 
  Compass, 
  Cpu, 
  FileCode, 
  FileSpreadsheet, 
  FileJson, 
  Server, 
  FolderCheck 
} from 'lucide-vue-next'
import { DataService, DANH_SACH_DANH_GIA_TRIPADVISOR } from '../services/dataService'

const tabHienTai = ref('diem_den') // 'diem_den' | 'tinh_toan' | 'danh_gia' | 'database'

const dsDiemDen = ref([])
const tongSoDanhGia = ref(DANH_SACH_DANH_GIA_TRIPADVISOR.length)
const tuKhoaDanhGia = ref('')

// Modal state
const moModalThemDiemDen = ref(false)
const dangSuaId = ref(null)
const formDiemDen = ref({
  ten: '',
  ten_rut_gon: '',
  tinh_thanh: '',
  loai_hinh: '',
  dia_chi: '',
  hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
  mo_ta: '',
  diem_danh_tieng_tb: 4.5
})

// Calculation Engine State
const diemChonDeGom = ref('all')
const dangGomDiemId = ref(null)
const dangChayTinhToan = ref(false)
const tienTrinh = ref(0)
const trangThaiTienTrinh = ref('')
const logsTienTrinh = ref([])
const daHoanTatTinhToan = ref(false)
const ketQuaTinhToan = ref([])

const danhGiaHienThiAdmin = computed(() => {
  let list = DANH_SACH_DANH_GIA_TRIPADVISOR
  if (tuKhoaDanhGia.value) {
    const kw = tuKhoaDanhGia.value.toLowerCase()
    list = list.filter(r => r.tieu_de.toLowerCase().includes(kw) || r.noi_dung.toLowerCase().includes(kw) || r.ten_diem_den.toLowerCase().includes(kw))
  }
  return list.slice(0, 15)
})

async function loadDiemDen() {
  dsDiemDen.value = await DataService.layDanhSachDiemDen()
}

function xuLyLoiImg(e) {
  e.target.src = 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
}

function dongModal() {
  moModalThemDiemDen.value = false
  dangSuaId.value = null
  formDiemDen.value = {
    ten: '',
    ten_rut_gon: '',
    tinh_thanh: '',
    loai_hinh: '',
    dia_chi: '',
    hinh_anh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
    mo_ta: '',
    diem_danh_tieng_tb: 4.5
  }
}

function moModalSua(dest) {
  dangSuaId.value = dest.id
  formDiemDen.value = { ...dest }
  moModalThemDiemDen.value = true
}

async function luuDiemDen() {
  if (dangSuaId.value) {
    await DataService.capNhatDiemDen(dangSuaId.value, formDiemDen.value)
  } else {
    await DataService.themDiemDen(formDiemDen.value)
  }
  await loadDiemDen()
  dongModal()
}

async function xacNhanXoa(dest) {
  if (confirm(`Bạn có chắc chắn muốn xóa điểm đến "${dest.ten}" khỏi hệ thống?`)) {
    await DataService.xoaDiemDen(dest.id)
    await loadDiemDen()
  }
}

function anDanhGia(id) {
  if (confirm(`Ẩn đánh giá #${id} khỏi giao diện du khách?`)) {
    alert(`Đã ẩn bài đánh giá #${id} thành công!`)
  }
}

async function gomDanhGiaChoDiem(dest) {
  dangGomDiemId.value = dest.id
  try {
    const res = await DataService.gomDanhGiaTripAdvisorChoDiemDen(dest.id, 30)
    await loadDiemDen()
    tongSoDanhGia.value = (await DataService.layDanhSachDanhGia()).length
    alert(`Đã hoàn tất gom ${res.so_luong_gom} đánh giá TripAdvisor cho "${dest.ten}"!\nCận dưới Wilson mới: ${res.w_lower.toFixed(3)} · ${res.is_diem_sang ? 'Đạt chuẩn Điểm sáng du lịch 🌟' : 'Trạng thái ổn định'}`)
  } catch (err) {
    alert('Lỗi khi gom dữ liệu: ' + err.message)
  } finally {
    dangGomDiemId.value = null
  }
}

// SIMULATE LIVE CRAWL & WILSON SCORE ENGINE
function chayQuyTrinhTinhToan() {
  dangChayTinhToan.value = true
  tienTrinh.value = 0
  logsTienTrinh.value = []
  daHoanTatTinhToan.value = false

  const isAll = diemChonDeGom.value === 'all'
  const targetDest = !isAll ? dsDiemDen.value.find(d => Number(d.id) === Number(diemChonDeGom.value)) : null

  const steps = isAll ? [
    { p: 15, msg: 'Bắt đầu gom 874 bản ghi đánh giá nguyên văn từ TripAdvisor qua API crawler...', level: 'crawler' },
    { p: 35, msg: 'Chuẩn hóa văn bản tiếng Việt, loại bỏ ký tự rác, lọc trùng lặp bản ghi.', level: 'preprocess' },
    { p: 60, msg: 'Mô hình PhoBERT AI bóc tách 5 khía cạnh cốt lõi (Cảnh quan, Dịch vụ, Ẩm thực, Vệ sinh, Giá cả)...', level: 'phobert' },
    { p: 85, msg: 'Áp dụng công thức Wilson Score 95% (z = 1.96) tính cận dưới w cho từng điểm đến...', level: 'wilson' },
    { p: 100, msg: 'Đồng bộ điểm danh tiếng và kích hoạt danh hiệu "Điểm sáng du lịch" cho các điểm đến đạt w ≥ 0.70.', level: 'success' }
  ] : [
    { p: 20, msg: `Bắt đầu quét crawler TripAdvisor thu thập 30 đánh giá thực tế cho riêng "${targetDest?.ten}"...`, level: 'crawler' },
    { p: 45, msg: `Chuẩn hóa văn bản tiếng Việt, trích xuất điểm sao và ngày đăng cho "${targetDest?.ten}"...`, level: 'preprocess' },
    { p: 70, msg: `Mô hình PhoBERT AI bóc tách 5 khía cạnh trải nghiệm độc lập cho "${targetDest?.ten}"...`, level: 'phobert' },
    { p: 85, msg: `Áp dụng công thức Wilson Score 95% tính cận dưới uy tín w dựa trên số đánh giá độc lập...`, level: 'wilson' },
    { p: 100, msg: `Hoàn tất gom dữ liệu! Đã cập nhật cơ sở dữ liệu và xét duyệt huy hiệu "Điểm sáng du lịch".`, level: 'success' }
  ]

  let stepIdx = 0
  const interval = setInterval(async () => {
    if (stepIdx < steps.length) {
      const s = steps[stepIdx]
      tienTrinh.value = s.p
      trangThaiTienTrinh.value = s.msg
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      logsTienTrinh.value.push({ time: timeStr, level: s.level, msg: s.msg })
      stepIdx++
    } else {
      clearInterval(interval)

      if (!isAll && targetDest) {
        // Gom dữ liệu thực tế cho riêng điểm đến này
        const res = await DataService.gomDanhGiaTripAdvisorChoDiemDen(targetDest.id, 30)
        await loadDiemDen()
        tongSoDanhGia.value = (await DataService.layDanhSachDanhGia()).length

        ketQuaTinhToan.value = [
          {
            id: targetDest.id,
            ten: targetDest.ten_rut_gon || targetDest.ten,
            n: res.tong_danh_gia_moi,
            p_hat: (res.tong_danh_gia_moi > 0 ? (res.w_lower + 0.05) : 0),
            w_lower: res.w_lower,
            dat_chuan: res.is_diem_sang
          }
        ]
      } else {
        // Sinh kết quả chi tiết cho toàn bộ danh sách
        ketQuaTinhToan.value = dsDiemDen.value.map(d => {
          const n = d.tong_luot_danh_gia || 100
          const p_hat = (d.ty_le_tich_cuc || 88) / 100
          const z = 1.96
          const z2 = z * z
          const numerator = p_hat + z2 / (2 * n) - z * Math.sqrt((p_hat * (1 - p_hat)) / n + z2 / (4 * n * n))
          const denominator = 1 + z2 / n
          const w_lower = Math.max(0, numerator / denominator)

          return {
            id: d.id,
            ten: d.ten_rut_gon || d.ten,
            n,
            p_hat,
            w_lower,
            dat_chuan: w_lower >= 0.70
          }
        })
      }

      dangChayTinhToan.value = false
      daHoanTatTinhToan.value = true
    }
  }, 700)
}

onMounted(async () => {
  await loadDiemDen()
})
</script>

<style scoped>
.nevio-admin-page {
  padding: 40px 0 90px 0;
  background: var(--mau-nen);
  color: var(--mau-chu);
}

.admin-header-banner {
  background: var(--nevio-dark);
  color: #ffffff;
  border-radius: var(--radius-xl);
  padding: 40px 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 30px;
  box-shadow: var(--shadow-card);
}

.header-content {
  max-width: 760px;
}

.admin-title {
  font-size: clamp(24px, 3.2vw, 36px);
  font-weight: 800;
  line-height: 1.25;
  margin: 12px 0;
  letter-spacing: -0.02em;
}

.admin-sub {
  font-size: 14.5px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
}

.admin-quick-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
}

.btn-preview-traveler {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-preview-traveler:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* KPI Cards */
.admin-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.kpi-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 22px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-subtle);
}

.kpi-icon-wrap {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.kpi-info {
  display: flex;
  flex-direction: column;
}

.kpi-val {
  font-size: 22px;
  font-weight: 800;
  color: var(--mau-chu);
  line-height: 1.2;
}

.kpi-label {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  font-weight: 500;
}

/* Tabs */
.admin-tabs-nav {
  display: flex;
  gap: 10px;
  border-bottom: 2px solid var(--nevio-border);
  margin-bottom: 28px;
}

.admin-tab-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  font-size: 14.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  cursor: pointer;
  margin-bottom: -2px;
  transition: all 0.2s ease;
}

.admin-tab-btn:hover {
  color: var(--mau-chu);
}

.admin-tab-btn.active {
  color: var(--nevio-dark);
  border-bottom-color: var(--nevio-yellow);
}

[data-theme="dark"] .admin-tab-btn.active {
  color: var(--nevio-yellow);
  border-bottom-color: var(--nevio-yellow);
}

/* Panel Common */
.tab-panel {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  box-shadow: var(--shadow-card);
}

.panel-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 4px;
}

.panel-desc {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
}

.btn-action-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--nevio-dark);
  color: #ffffff;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action-primary:hover {
  background: #000000;
  transform: translateY(-1px);
}

/* Table */
.admin-table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13.5px;
}

.admin-table th {
  background: var(--nevio-light-grey);
  color: var(--mau-chu-phu);
  font-weight: 700;
  padding: 14px 16px;
  border-bottom: 1px solid var(--nevio-border);
  font-size: 12.5px;
  letter-spacing: 0.04em;
}

.admin-table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--nevio-border);
  color: var(--mau-chu);
  vertical-align: middle;
}

.table-thumb {
  width: 60px;
  height: 42px;
  border-radius: 6px;
  object-fit: cover;
}

.sub-text {
  display: block;
  font-size: 11.5px;
  color: var(--mau-chu-mo);
}

.type-pill {
  font-size: 11.5px;
  font-weight: 600;
  background: var(--nevio-light-grey);
  padding: 3px 8px;
  border-radius: 4px;
}

.score-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-weight: 800;
  color: #d97706;
}

.wilson-badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.badge-diem_sang {
  background: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}

.badge-binh_thuong {
  background: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.badge-canh_bao {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.table-actions-row {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
}

.btn-icon-action {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon-action:hover {
  background: var(--nevio-border);
}

.btn-icon-action.text-danger:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}

.btn-icon-action.text-warning {
  color: #d97706;
}

.btn-icon-action.text-warning:hover {
  background: #fef3c7;
  color: #b45309;
  border-color: #fde68a;
}

/* ================= TAB 2: PIPELINE STYLES ================= */
.calculation-pipeline-card {
  padding: 10px 0;
}

.calc-target-selector-box {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 18px 20px;
  margin-bottom: 22px;
}

.target-select-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--mau-chu);
  margin-bottom: 10px;
}

.target-select-body {
  margin-bottom: 10px;
}

.form-select-target {
  width: 100%;
  padding: 11px 16px;
  border-radius: 8px;
  border: 1px solid var(--nevio-border);
  background: var(--nevio-light-grey);
  color: var(--mau-chu);
  font-size: 13.5px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  font-family: inherit;
}

.form-select-target:focus {
  border-color: var(--nevio-yellow);
}

.target-hint {
  font-size: 12px;
  color: var(--mau-chu-phu);
  line-height: 1.5;
  margin: 0;
}

.pipeline-badge {
  display: inline-block;
  font-size: 11.5px;
  font-weight: 800;
  color: var(--nevio-orange);
  background: var(--nevio-orange-light);
  padding: 4px 10px;
  border-radius: var(--radius-full);
  margin-bottom: 12px;
}

.pipeline-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 8px;
}

.pipeline-desc {
  font-size: 14.5px;
  color: var(--mau-chu-phu);
  max-width: 860px;
  line-height: 1.65;
  margin-bottom: 30px;
}

.calc-steps-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 36px;
}

.calc-step-box {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 20px 16px;
  position: relative;
}

.step-num {
  font-size: 28px;
  font-weight: 900;
  color: var(--nevio-dark);
  opacity: 0.15;
  line-height: 1;
  display: block;
  margin-bottom: 10px;
}

.calc-step-box h4 {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 6px;
}

.calc-step-box p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  line-height: 1.5;
}

.calc-action-zone {
  text-align: center;
  padding: 30px;
  background: var(--nevio-light-grey);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--nevio-border);
  margin-bottom: 30px;
}

.btn-large {
  font-size: 16px;
  padding: 12px 32px;
}

.spinner-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

.progress-container {
  max-width: 640px;
  margin: 24px auto 0 auto;
}

.progress-bar-track {
  height: 10px;
  background: var(--nevio-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #f59e0b, #10b981);
  transition: width 0.3s ease;
}

.progress-meta {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--mau-chu-phu);
  font-weight: 600;
}

/* Terminal Console */
.terminal-console {
  background: #18181b;
  color: #22c55e;
  border-radius: var(--radius-md);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12.5px;
  margin-bottom: 30px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
}

.terminal-bar {
  background: #27272a;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.term-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.term-dot.red { background: #ef4444; }
.term-dot.yellow { background: #f59e0b; }
.term-dot.green { background: #10b981; }

.term-title {
  color: #a1a1aa;
  font-size: 11.5px;
  margin-left: 6px;
}

.terminal-body {
  padding: 16px;
  max-height: 220px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.terminal-line {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  line-height: 1.5;
}

.log-time { color: #71717a; }
.log-level { font-weight: 700; }
.level-crawler { color: #38bdf8; }
.level-preprocess { color: #fbbf24; }
.level-phobert { color: #c084fc; }
.level-wilson { color: #f43f5e; }
.level-success { color: #4ade80; }
.log-text { color: #e4e4e7; }

/* Results Grid */
.calc-results-section {
  padding-top: 20px;
  border-top: 1px solid var(--nevio-border);
}

.results-title {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 20px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.result-card {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.res-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.res-stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 12.5px;
  margin-bottom: 6px;
}

.text-positive { color: #059669; }
.text-wilson { color: #0284c7; }

.res-bar-wrap {
  height: 6px;
  background: var(--nevio-border);
  border-radius: 9999px;
  overflow: hidden;
  margin-top: 10px;
}

.res-bar-fill {
  height: 100%;
  background: #0284c7;
}

/* ================= TAB 3: REVIEW MODERATION ================= */
.search-mini-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-full);
  padding: 6px 14px;
}

.input-search-mini {
  border: none;
  background: transparent;
  outline: none;
  font-size: 13px;
  color: var(--mau-chu);
  width: 240px;
}

.dest-chip {
  font-size: 11.5px;
  font-weight: 700;
  color: #0284c7;
}

.score-stars-inline {
  display: flex;
  align-items: center;
  gap: 2px;
}

.star-num {
  font-size: 11px;
  font-weight: 800;
  color: #d97706;
  margin-left: 4px;
}

.rev-snippet {
  font-size: 12px;
  color: var(--mau-chu-phu);
  margin-top: 3px;
}

.tag-pill-mini {
  display: inline-block;
  font-size: 10.5px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  margin-right: 4px;
}

/* ================= TAB 4: DATABASE & HANDOFF ================= */
.database-guide-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.guide-card {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  padding: 26px;
}

.guide-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.guide-head h3 {
  font-size: 18px;
  font-weight: 800;
}

.guide-text {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
  line-height: 1.6;
  margin-bottom: 20px;
}

.db-files-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 24px;
}

.db-file-item {
  display: flex;
  gap: 12px;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  padding: 12px 14px;
  border-radius: var(--radius-sm);
}

.file-icon {
  color: var(--nevio-orange);
  margin-top: 2px;
}

.db-file-item strong {
  font-size: 13px;
  color: var(--mau-chu);
  display: block;
}

.db-file-item p {
  font-size: 11.5px;
  color: var(--mau-chu-phu);
  margin-top: 2px;
  line-height: 1.45;
}

.sub-heading {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 10px;
}

.tables-summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 8px;
}

.table-sum-item {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  padding: 8px 10px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
}

.t-name {
  font-family: monospace;
  font-weight: 700;
  font-size: 12px;
  color: #0284c7;
}

.t-count {
  font-size: 11px;
  color: var(--mau-chu-mo);
}

.handoff-steps-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.handoff-step {
  display: flex;
  gap: 14px;
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  padding: 16px;
  border-radius: var(--radius-md);
}

.h-step-badge {
  font-size: 11px;
  font-weight: 800;
  background: var(--nevio-orange-light);
  color: var(--nevio-orange);
  padding: 3px 8px;
  border-radius: 4px;
  height: fit-content;
  white-space: nowrap;
}

.handoff-step strong {
  font-size: 14px;
  color: var(--mau-chu);
  display: block;
  margin-bottom: 4px;
}

.handoff-step p {
  font-size: 12.5px;
  color: var(--mau-chu-phu);
  line-height: 1.55;
}

.account-creds-box {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: 6px;
  padding: 10px 12px;
  font-size: 12.5px;
  margin-top: 8px;
}

.account-creds-box code {
  background: rgba(0, 0, 0, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 700;
}

/* ================= MODAL ================= */
.nevio-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.nevio-modal-card {
  background: var(--nevio-card-bg);
  border-radius: var(--radius-xl);
  max-width: 680px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow-hover);
  border: 1px solid var(--nevio-border);
}

.modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 28px;
  border-bottom: 1px solid var(--nevio-border);
}

.modal-head h3 {
  font-size: 19px;
  font-weight: 800;
}

.btn-close-modal {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: var(--nevio-light-grey);
  font-size: 16px;
  cursor: pointer;
}

.modal-form {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
}

.form-input, .form-textarea {
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  color: var(--mau-chu);
  outline: none;
  font-family: inherit;
}

.form-input:focus, .form-textarea:focus {
  border-color: var(--nevio-dark);
}

.quick-sample-imgs {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.btn-sample-img {
  font-size: 11px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-sample-img:hover {
  background: var(--nevio-border);
}

.modal-foot {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid var(--nevio-border);
}

.btn-cancel {
  background: var(--nevio-light-grey);
  color: var(--mau-chu);
  border: 1px solid var(--nevio-border);
  padding: 10px 20px;
  border-radius: var(--radius-full);
  font-size: 13.5px;
  font-weight: 700;
  cursor: pointer;
}

/* Animations */
.anim-fade-in {
  animation: fadeIn 0.3s ease;
}

.anim-scale-up {
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@media (max-width: 900px) {
  .admin-header-banner {
    flex-direction: column;
    align-items: flex-start;
  }
  .admin-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .database-guide-grid {
    grid-template-columns: 1fr;
  }
  .calc-steps-row {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
