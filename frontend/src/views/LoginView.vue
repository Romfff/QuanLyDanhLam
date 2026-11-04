<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h2>Đăng Nhập Hệ Thống</h2>
        <p class="subtitle">Hệ thống phân tích ý kiến du khách và giám sát danh tiếng điểm đến (ĐT-12)</p>
      </div>

      <div v-if="thongBaoLoi" class="alert-error">
        {{ thongBaoLoi }}
      </div>

      <form @submit.prevent="dangNhap" class="login-form">
        <div class="form-group">
          <label for="email">Địa chỉ Email:</label>
          <input 
            id="email" 
            type="email" 
            v-model="email" 
            placeholder="admin@demo.test" 
            required 
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="mat_khau">Mật khẩu:</label>
          <input 
            id="mat_khau" 
            type="password" 
            v-model="matKhau" 
            placeholder="••••••••" 
            required 
            class="form-control"
          />
        </div>

        <button type="submit" :disabled="dangXuLy" class="btn-submit">
          {{ dangXuLy ? 'Đang xác thực...' : 'Đăng Nhập' }}
        </button>
      </form>

      <div class="quick-accounts">
        <div class="quick-title">Tài khoản kiểm thử nhanh (6 vai trò):</div>
        <div class="quick-buttons">
          <button type="button" class="btn-quick" @click="dienTaiKhoan('admin@demo.test', 'Admin@123456')">
            👑 Quản trị viên (Admin)
          </button>
          <button type="button" class="btn-quick" @click="dienTaiKhoan('analyst@demo.test', 'Analyst@123456')">
            📊 Phân tích (Analyst)
          </button>
          <button type="button" class="btn-quick" @click="dienTaiKhoan('partner@demo.test', 'Partner@123456')">
            🏨 Đối tác (Partner)
          </button>
          <button type="button" class="btn-quick" @click="dienTaiKhoan('moderator@demo.test', 'Mod@123456')">
            🛡️ Kiểm duyệt (Mod)
          </button>
          <button type="button" class="btn-quick" @click="dienTaiKhoan('tourist@demo.test', 'User@123456')">
            🧳 Du khách (Tourist)
          </button>
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
const dangXuLy = ref(false)
const thongBaoLoi = ref('')

function dienTaiKhoan(mail, pass) {
  email.value = mail
  matKhau.value = pass
  thongBaoLoi.value = ''
}

async function dangNhap() {
  dangXuLy.value = true
  thongBaoLoi.value = ''
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      mat_khau: matKhau.value
    })
    
    if (res.data?.data?.token) {
      localStorage.setItem('token', res.data.data.token)
      localStorage.setItem('vai_tro', res.data.data.nguoi_dung?.vai_tro || 'du_khach')
      localStorage.setItem('user_info', JSON.stringify(res.data.data.nguoi_dung))
      router.push('/dashboard')
    } else {
      thongBaoLoi.value = 'Phản hồi đăng nhập không hợp lệ'
    }
  } catch (err) {
    thongBaoLoi.value = err.response?.data?.message || 'Email hoặc mật khẩu không chính xác'
  } finally {
    dangXuLy.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 480px;
  background: var(--mau-nen-phu, #ffffff);
  border: 1px solid var(--duong-vien, #e2e8f0);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.login-header h2 {
  font-size: 22px;
  color: var(--mau-chu, #1e293b);
  margin-bottom: 8px;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
}

.alert-error {
  background: #fee2e2;
  color: #b91c1c;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--mau-chu, #334155);
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background: var(--mau-nhan, #0284c7);
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-submit:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quick-accounts {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px dashed #e2e8f0;
}

.quick-title {
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}

.quick-buttons {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.btn-quick {
  text-align: left;
  padding: 6px 10px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 13px;
  color: #334155;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-quick:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
}
</style>
