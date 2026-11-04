<template>
  <div class="nevio-forbidden-page">
    <div class="forbidden-card">
      <div class="forbidden-icon">🛡️</div>
      <h1 class="forbidden-code">403</h1>
      <h2 class="forbidden-title">Không Có Thẩm Quyền Truy Cập</h2>
      <p class="forbidden-desc">
        Khu vực này được bảo vệ nghiêm ngặt và chỉ dành riêng cho tài khoản có vai trò <strong>Quản trị viên (Admin)</strong> hoặc <strong>Nhà phân tích (Analyst)</strong>.
      </p>
      <div class="forbidden-actions">
        <router-link to="/dashboard" class="btn-primary">
          🏝️ Quay lại Bảng điều khiển
        </router-link>
        <router-link to="/dang-nhap" class="btn-outline">
          Đổi tài khoản khác
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nevio-forbidden-page {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.forbidden-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 24px;
  padding: 48px 36px;
  text-align: center;
  max-width: 480px;
  box-shadow: var(--bong-noi);
}

.forbidden-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.forbidden-code {
  font-size: 48px;
  font-weight: 900;
  color: #ef4444;
  line-height: 1;
  margin-bottom: 8px;
}

.forbidden-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 12px;
}

.forbidden-desc {
  font-size: 14px;
  line-height: 1.6;
  color: var(--mau-chu-phu);
  margin-bottom: 28px;
}

.forbidden-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  background: #0f172a;
  color: white;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 13.5px;
  font-weight: 700;
  text-decoration: none;
}

[data-theme="dark"] .btn-primary {
  background: #38bdf8;
  color: #0b1120;
}

.btn-outline {
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu);
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 13.5px;
  font-weight: 600;
  text-decoration: none;
}
</style>
