<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Đăng nhập Hệ thống</h2>
      <p class="subtitle">Nhóm ĐT-12 - Hệ thống Du lịch</p>

      <form @submit.prevent="dangNhap">
        <div class="form-group">
          <label>Email đăng nhập</label>
          <input 
            v-model="email" 
            type="email" 
            placeholder="admin@test.com" 
            required 
          />
        </div>

        <div class="form-group">
          <label>Mật khẩu</label>
          <input 
            v-model="matKhau" 
            type="password" 
            placeholder="••••••••" 
            required 
          />
        </div>

        <p v-if="loi" class="error-message">{{ loi }}</p>

        <button type="submit" :disabled="dangXuLy" class="btn-submit">
          {{ dangXuLy ? 'Đang xác thực...' : 'Đăng nhập' }}
        </button>
      </form>

      <div class="test-accounts">
        <p><strong>Tài khoản kiểm thử nhanh:</strong></p>
        <ul>
          <li><strong>Admin:</strong> admin@test.com | 12345678</li>
          <li><strong>Quản lý:</strong> qldd@test.com | 12345678</li>
          <li><strong>Du khách:</strong> khach@test.com | 12345678</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const email = ref('')
const matKhau = ref('')
const loi = ref('')
const dangXuLy = ref(false)

async function dangNhap() {
  loi.value = ''
  dangXuLy.value = true
  try {
    const res = await api.post('/auth/login', {
      email: email.value,
      mat_khau: matKhau.value,
    })

    localStorage.setItem('token', res.data.data.token)
    localStorage.setItem('vai_tro', res.data.data.nguoi_dung.vai_tro)
    localStorage.setItem('ho_ten', res.data.data.nguoi_dung.ho_ten)

    window.location.href = '/dashboard'
  } catch (e) {
    loi.value = e.response?.data?.message || 'Đăng nhập thất bại. Kiểm tra lại email/mật khẩu!'
  } finally {
    dangXuLy.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f6f9;
  min-height: calc(100vh - 120px);
}

.login-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
  color: #34495e;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-bottom: 12px;
  text-align: center;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #2980b9;
}

.test-accounts {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #ccc;
  font-size: 13px;
  color: #555;
}

.test-accounts ul {
  padding-left: 18px;
  margin-top: 5px;
}
</style>