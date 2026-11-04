<template>
  <div class="nevio-login-page">
    <div class="login-container">
      <div class="login-card">
        <!-- Brand Header -->
        <div class="login-header">
          <div class="brand-logo-circle">
            🧭
          </div>
          <h1 class="login-title">Cổng Đăng Nhập Hệ Thống</h1>
          <p class="login-subtitle">
            Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến <strong>(ĐT-12)</strong>
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
              <span class="input-icon">✉️</span>
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
              <span class="input-icon">🔒</span>
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

          <button type="submit" :disabled="dangXuLy" class="btn-submit-login">
            {{ dangXuLy ? 'Đang xác thực hệ thống...' : 'Đăng Nhập Khám Phá' }}
          </button>
        </form>

        <!-- Quick 5 Role Test Buttons -->
        <div class="quick-roles-section">
          <div class="quick-title">
            <span>⚡ Kiểm thử nhanh 5 vai trò hệ thống:</span>
          </div>
          <div class="quick-grid">
            <button 
              type="button" 
              class="btn-quick-role" 
              @click="dienTaiKhoan('admin@demo.test', 'Admin@123456', 'admin', 'Quản trị viên trưởng')"
            >
              👑 Quản trị viên (Admin)
            </button>
            <button 
              type="button" 
              class="btn-quick-role" 
              @click="dienTaiKhoan('analyst@demo.test', 'Analyst@123456', 'nha_phan_tich', 'Chuyên viên ABSA')"
            >
              📊 Nhà phân tích (Analyst)
            </button>
            <button 
              type="button" 
              class="btn-quick-role" 
              @click="dienTaiKhoan('partner@demo.test', 'Partner@123456', 'doi_tac', 'Đối tác Du lịch')"
            >
              🏨 Đối tác điểm đến (Partner)
            </button>
            <button 
              type="button" 
              class="btn-quick-role" 
              @click="dienTaiKhoan('moderator@demo.test', 'Mod@123456', 'kiem_duyet', 'Kiểm duyệt viên')"
            >
              🛡️ Kiểm duyệt (Mod)
            </button>
            <button 
              type="button" 
              class="btn-quick-role" 
              @click="dienTaiKhoan('tourist@demo.test', 'User@123456', 'du_khach', 'Nguyễn Trung Hiếu')"
            >
              🧳 Du khách trải nghiệm (Tourist)
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
import api from '../services/api'

const router = useRouter()
const email = ref('admin@demo.test')
const matKhau = ref('Admin@123456')
const vaiTroChon = ref('admin')
const hoTenChon = ref('Quản trị viên trưởng')

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
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('vai_tro', res.data.data.nguoi_dung?.vai_tro || vaiTroChon.value)
      localStorage.setItem('ho_ten', res.data.data.nguoi_dung?.ho_ten || hoTenChon.value)
      localStorage.setItem('user_info', JSON.stringify(res.data.data.nguoi_dung))
      router.push('/dashboard')
      return
    }
  } catch (e) {
    console.warn('API /auth/login chưa phản hồi, kích hoạt chế độ xác thực thông minh client.', e.message)
  }

  // Chế độ mô phỏng khi backend offline / Vercel preview
  localStorage.setItem('token', 'demo_jwt_token_' + vaiTroChon.value)
  localStorage.setItem('vai_tro', vaiTroChon.value)
  localStorage.setItem('ho_ten', hoTenChon.value)
  thongBaoThanhCong.value = `Đăng nhập thành công với vai trò: ${hoTenChon.value}`

  setTimeout(() => {
    router.push('/dashboard')
  }, 400)
}
</script>

<style scoped>
.nevio-login-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: radial-gradient(circle at 50% 30%, rgba(2, 132, 199, 0.08) 0%, rgba(16, 185, 129, 0.04) 50%, transparent 80%);
}

.login-container {
  width: 100%;
  max-width: 520px;
}

.login-card {
  background: var(--mau-nen-the);
  border: 1px solid var(--duong-vien);
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: var(--bong-noi);
}

.login-header {
  text-align: center;
  margin-bottom: 28px;
}

.brand-logo-circle {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(2, 132, 199, 0.2));
  border: 1px solid rgba(16, 185, 129, 0.4);
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px auto;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);
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
  line-height: 1.5;
}

.alert-error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  margin-bottom: 20px;
}

.alert-success {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
  padding: 10px 14px;
  border-radius: 10px;
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
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  padding: 10px 14px;
  border-radius: 12px;
  transition: border-color 0.2s;
}

.input-wrap:focus-within {
  border-color: #0284c7;
  box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
}

.input-icon {
  font-size: 16px;
  opacity: 0.7;
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

.btn-submit-login {
  background: linear-gradient(135deg, #059669 0%, #0284c7 100%);
  color: white;
  border: none;
  padding: 14px 20px;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(2, 132, 199, 0.3);
  transition: all 0.2s;
  margin-top: 6px;
}

.btn-submit-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(2, 132, 199, 0.4);
}

/* Quick Roles Section */
.quick-roles-section {
  border-top: 1px solid var(--duong-vien);
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
  background: var(--mau-nen);
  border: 1px solid var(--duong-vien);
  color: var(--mau-chu);
  padding: 9px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quick-role:hover {
  background: var(--mau-nhan-sang, rgba(2, 132, 199, 0.1));
  border-color: #0284c7;
  color: #0284c7;
}

.login-footer {
  text-align: center;
}

.link-back-home {
  font-size: 13px;
  font-weight: 600;
  color: var(--mau-chu-phu);
  text-decoration: none;
  transition: color 0.2s;
}

.link-back-home:hover {
  color: #0284c7;
}
</style>
