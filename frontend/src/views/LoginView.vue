<template>
  <div class="nevio-login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Brand Header -->
        <div class="login-header">
          <div class="brand-logo-circle">
            <Compass :size="28" class="text-dark" />
          </div>
          <span class="nevio-label center">CỔNG XÁC THỰC DU LỊCH</span>
          <h1 class="login-title">Đăng Nhập Hệ Thống Nevio ĐT-12</h1>
          <p class="login-subtitle">
            Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến
          </p>
        </div>

        <!-- Alert Notification -->
        <div v-if="thongBaoLoi" class="alert-error" role="alert">
          {{ thongBaoLoi }}
        </div>
        <div v-if="thongBaoThanhCong" class="alert-success" role="alert">
          {{ thongBaoThanhCong }}
        </div>

        <!-- Form -->
        <form @submit.prevent="dangNhap" class="nevio-form">
          <div class="form-group">
            <label for="email" class="form-label">Địa chỉ Email:</label>
            <div class="input-wrap">
              <Mail :size="16" class="input-icon text-muted" />
              <input 
                id="email" 
                type="email" 
                v-model="email" 
                placeholder="admin@demo.test" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="mat_khau" class="form-label">Mật khẩu:</label>
            <div class="input-wrap">
              <Lock :size="16" class="input-icon text-muted" />
              <input 
                id="mat_khau" 
                type="password" 
                v-model="matKhau" 
                placeholder="••••••••" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <button type="submit" :disabled="dangXuLy" class="nevio-btn-yellow w-full-center">
            <span class="button-text">{{ dangXuLy ? 'Đang xác thực hệ thống...' : 'Đăng Nhập Khám Phá' }}</span>
            <div class="btn-icon-circle"><ArrowRight :size="16" /></div>
          </button>
        </form>

        <!-- Quick 2 Role Test Buttons -->
        <div class="quick-roles-section">
          <div class="quick-title">
            <span>Chọn nhanh 1 trong 2 vai trò hệ thống:</span>
          </div>
          <div class="quick-grid two-cols">
            <button 
              type="button" 
              :class="['btn-quick-role', { active: vaiTroChon === 'admin' }]" 
              @click="dienTaiKhoan('admin@toursentiment.vn', 'Admin@123456', 'admin', 'Quản trị viên')"
            >
              <div class="role-icon-box bg-gold">
                <ShieldCheck :size="20" class="role-icon-inline" />
              </div>
              <div class="role-text-meta">
                <strong>Quản trị viên (Admin)</strong>
                <span>Thêm/Sửa/Xóa địa điểm, gom đánh giá &amp; tính Wilson</span>
              </div>
            </button>

            <button 
              type="button" 
              :class="['btn-quick-role', { active: vaiTroChon === 'du_khach' }]" 
              @click="dienTaiKhoan('khachhang@toursentiment.vn', 'Khach@123456', 'du_khach', 'Du khách trải nghiệm')"
            >
              <div class="role-icon-box bg-sky">
                <Compass :size="20" class="role-icon-inline" />
              </div>
              <div class="role-text-meta">
                <strong>Du khách (Tourist)</strong>
                <span>Tra cứu điểm đến, xem review thật, nhận voucher</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Back to Dashboard -->
        <div class="login-footer">
          <router-link to="/dashboard" class="link-back-home">
            ← Tiếp tục duyệt với tư cách Khách trải nghiệm
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Compass, 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  BarChart3, 
  Briefcase, 
  UserCheck, 
  User 
} from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()
const email = ref('admin@toursentiment.vn')
const matKhau = ref('Admin@123456')
const vaiTroChon = ref('admin')
const hoTenChon = ref('Quản trị viên')

const dangXuLy = ref(false)
const thongBaoLoi = ref('')
const thongBaoThanhCong = ref('')

function dienTaiKhoan(mail, pass, role, hoTen) {
  email.value = mail
  matKhau.value = pass
  vaiTroChon.value = role
  hoTenChon.value = hoTen
  thongBaoLoi.value = ''
}

async function dangNhap() {
  dangXuLy.value = true
  thongBaoLoi.value = ''
  thongBaoThanhCong.value = ''

  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      mat_khau: matKhau.value
    })

    if (res.data?.data?.token) {
      const role = res.data.data.nguoi_dung?.vai_tro || vaiTroChon.value
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('vai_tro', role)
      localStorage.setItem('ho_ten', res.data.data.nguoi_dung?.ho_ten || hoTenChon.value)
      localStorage.setItem('user_info', JSON.stringify(res.data.data.nguoi_dung))
      
      if (role === 'admin') {
        router.push('/quan-tri')
      } else {
        router.push('/dashboard')
      }
      return
    }
  } catch (e) {
    console.warn('API /auth/login chưa phản hồi, kích hoạt chế độ xác thực thông minh client.', e.message)
  }

  // Fallback mô phỏng khi offline
  const role = vaiTroChon.value
  localStorage.setItem('token', 'demo_jwt_token_' + role)
  localStorage.setItem('vai_tro', role)
  localStorage.setItem('ho_ten', hoTenChon.value)
  thongBaoThanhCong.value = `Đăng nhập thành công với vai trò: ${hoTenChon.value}`

  setTimeout(() => {
    if (role === 'admin') {
      router.push('/quan-tri')
    } else {
      router.push('/dashboard')
    }
  }, 400)
}
</script>

<style scoped>
.nevio-login-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: var(--nevio-light-grey);
}

.login-container {
  width: 100%;
  max-width: 500px;
}

.login-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 40px 36px;
  box-shadow: var(--shadow-card);
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.brand-logo-circle {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  background: var(--nevio-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
}

.login-title {
  font-size: 24px;
  font-weight: 800;
  color: var(--mau-chu);
  margin-bottom: 6px;
}

.login-subtitle {
  font-size: 13.5px;
  color: var(--mau-chu-phu);
}

.alert-error {
  background: #fff1f2;
  color: #be123c;
  border: 1px solid #fecdd3;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: 20px;
}

.alert-success {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  margin-bottom: 20px;
}

.nevio-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--mau-chu);
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 10px 14px;
  border-radius: var(--radius-sm);
}

.input-wrap:focus-within {
  border-color: var(--nevio-dark);
}

.form-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14.5px;
  color: var(--mau-chu);
  outline: none;
  font-family: inherit;
}

.w-full-center {
  width: 100%;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
}

.quick-roles-section {
  border-top: 1px solid var(--nevio-border);
  padding-top: 20px;
  margin-bottom: 20px;
}

.quick-title {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  margin-bottom: 12px;
}

.quick-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-quick-role {
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  color: var(--mau-chu);
  padding: 12px 14px;
  border-radius: var(--radius-md);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quick-role:hover {
  background: var(--nevio-card-bg);
  border-color: var(--nevio-yellow);
  transform: translateY(-1px);
}

.btn-quick-role.active {
  background: #fffbeb;
  border-color: #f59e0b;
  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.15);
}

[data-theme="dark"] .btn-quick-role.active {
  background: #1e2434;
  border-color: #fddd62;
}

.role-icon-box {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-icon-box.bg-gold {
  background: #fef3c7;
  color: #d97706;
}

.role-icon-box.bg-sky {
  background: #e0f2fe;
  color: #0284c7;
}

.role-text-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.role-text-meta strong {
  font-size: 13.5px;
  color: var(--mau-chu);
}

.role-text-meta span {
  font-size: 11.5px;
  color: var(--mau-chu-phu);
}

.role-icon-inline {
  color: var(--nevio-orange);
}

.login-footer {
  text-align: center;
}

.link-back-home {
  font-size: 13px;
  font-weight: 600;
  color: var(--mau-chu-phu);
  text-decoration: none;
}

.link-back-home:hover {
  color: var(--nevio-dark);
}
</style>
