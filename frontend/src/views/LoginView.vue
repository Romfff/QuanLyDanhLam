<template>
  <div class="nevio-login-page">
    <div class="login-container">
      <div class="login-card anim-fade-up">
        <!-- Brand Header -->
        <div class="login-header">
          <div class="brand-logo-circle">
            <Compass :size="28" class="text-dark" />
          </div>
          <span class="nevio-label center">CỔNG XÁC THỰC DU LỊCH ĐT-12</span>
          <h1 class="login-title">
            {{ cheDoAuth === 'dang_nhap' ? 'Đăng Nhập Khám Phá' : 'Đăng Ký Tài Khoản Mới' }}
          </h1>
          <p class="login-subtitle">
            Hệ thống phân tích ý kiến du khách &amp; bảo chứng danh tiếng điểm đến TripAdvisor
          </p>
        </div>

        <!-- Auth Mode Switcher Tabs (Đăng Nhập / Đăng Ký) -->
        <div class="auth-tabs-bar">
          <button 
            type="button" 
            :class="['auth-tab-btn', { active: cheDoAuth === 'dang_nhap' }]"
            @click="chuyenTab('dang_nhap')"
          >
            <LogIn :size="15" />
            <span>Đăng Nhập</span>
          </button>
          <button 
            type="button" 
            :class="['auth-tab-btn', { active: cheDoAuth === 'dang_ky' }]"
            @click="chuyenTab('dang_ky')"
          >
            <UserPlus :size="15" />
            <span>Đăng Ký Du Khách</span>
          </button>
        </div>

        <!-- Alert Notification -->
        <div v-if="thongBaoLoi" class="alert-error" role="alert">
          <AlertCircle :size="16" />
          <span>{{ thongBaoLoi }}</span>
        </div>
        <div v-if="thongBaoThanhCong" class="alert-success" role="alert">
          <CheckCircle2 :size="16" />
          <span>{{ thongBaoThanhCong }}</span>
        </div>

        <!-- ================= TAB 1: FORM ĐĂNG NHẬP ================= -->
        <form v-if="cheDoAuth === 'dang_nhap'" @submit.prevent="dangNhap" class="nevio-form">
          <div class="form-group">
            <label for="email" class="form-label">Địa chỉ Email:</label>
            <div class="input-wrap">
              <Mail :size="16" class="input-icon text-muted" />
              <input 
                id="email" 
                type="email" 
                v-model="email" 
                placeholder="admin@toursentiment.vn" 
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
                :type="hienMatKhau ? 'text' : 'password'" 
                v-model="matKhau" 
                placeholder="•••••••••" 
                required 
                class="form-input"
              />
              <button type="button" @click="hienMatKhau = !hienMatKhau" class="btn-toggle-pw" tabindex="-1">
                <EyeOff v-if="hienMatKhau" :size="16" />
                <Eye v-else :size="16" />
              </button>
            </div>
          </div>

          <button type="submit" :disabled="dangXuLy" class="nevio-btn-yellow w-full-center">
            <span class="button-text">{{ dangXuLy ? 'Đang xác thực hệ thống...' : 'Đăng Nhập Khám Phá' }}</span>
            <div class="btn-icon-circle"><ArrowRight :size="16" /></div>
          </button>
        </form>

        <!-- ================= TAB 2: FORM ĐĂNG KÝ TÀI KHOẢN ================= -->
        <form v-else @submit.prevent="dangKy" class="nevio-form">
          <div class="form-group">
            <label for="reg_name" class="form-label">Họ và tên của bạn:</label>
            <div class="input-wrap">
              <User :size="16" class="input-icon text-muted" />
              <input 
                id="reg_name" 
                type="text" 
                v-model="formDangKy.ho_ten" 
                placeholder="Ví dụ: Nguyễn Văn An" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="reg_email" class="form-label">Địa chỉ Email:</label>
            <div class="input-wrap">
              <Mail :size="16" class="input-icon text-muted" />
              <input 
                id="reg_email" 
                type="email" 
                v-model="formDangKy.email" 
                placeholder="dukhach@email.com" 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="reg_pw" class="form-label">Mật khẩu (Tối thiểu 6 ký tự):</label>
            <div class="input-wrap">
              <Lock :size="16" class="input-icon text-muted" />
              <input 
                id="reg_pw" 
                :type="hienMatKhau ? 'text' : 'password'" 
                v-model="formDangKy.mat_khau" 
                placeholder="Nhập mật khẩu..." 
                required 
                minlength="6"
                class="form-input"
              />
              <button type="button" @click="hienMatKhau = !hienMatKhau" class="btn-toggle-pw" tabindex="-1">
                <EyeOff v-if="hienMatKhau" :size="16" />
                <Eye v-else :size="16" />
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="reg_confirm_pw" class="form-label">Xác nhận mật khẩu:</label>
            <div class="input-wrap">
              <Lock :size="16" class="input-icon text-muted" />
              <input 
                id="reg_confirm_pw" 
                :type="hienMatKhau ? 'text' : 'password'" 
                v-model="formDangKy.xac_nhan_mat_khau" 
                placeholder="Nhập lại mật khẩu..." 
                required 
                class="form-input"
              />
            </div>
          </div>

          <div class="form-terms-row">
            <input type="checkbox" id="terms" v-model="formDangKy.dong_y" required />
            <label for="terms" class="terms-label">
              Tôi đồng ý với chính sách bảo mật và điều khoản sử dụng hệ thống ĐT-12.
            </label>
          </div>

          <button type="submit" :disabled="dangXuLy" class="nevio-btn-yellow w-full-center">
            <span class="button-text">{{ dangXuLy ? 'Đang tạo tài khoản...' : 'Hoàn Tất Đăng Ký & Khám Phá' }}</span>
            <div class="btn-icon-circle"><Sparkles :size="16" /></div>
          </button>
        </form>

        <!-- Quick 2 Role Test Buttons (Chỉ hiển thị khi ở tab Đăng Nhập) -->
        <div v-if="cheDoAuth === 'dang_nhap'" class="quick-roles-section">
          <div class="quick-title">
            <span>Chọn nhanh 1 trong 2 vai trò chuẩn để kiểm thử:</span>
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
                <span>Thêm/Sửa/Xóa điểm đến, gom đánh giá &amp; tính Wilson</span>
              </div>
            </button>

            <button 
              type="button" 
              :class="['btn-quick-role', { active: vaiTroChon === 'du_khach' }]" 
              @click="dienTaiKhoan('khachhang@toursentiment.vn', 'Khach@123456', 'du_khach', 'Du khách trải nghiệm')"
            >
              <div class="role-icon-box bg-white">
                <Compass :size="20" class="role-icon-inline" />
              </div>
              <div class="role-text-meta">
                <strong>Du khách (Tourist)</strong>
                <span>Tra cứu điểm đến, xem review thật, viết bài đánh giá</span>
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
  User,
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  LogIn,
  UserPlus
} from 'lucide-vue-next'
import api from '../services/api'

const router = useRouter()
const cheDoAuth = ref('dang_nhap') // 'dang_nhap' | 'dang_ky'
const hienMatKhau = ref(false)

// Form Đăng Nhập
const email = ref('admin@toursentiment.vn')
const matKhau = ref('Admin@123456')
const vaiTroChon = ref('admin')
const hoTenChon = ref('Quản trị viên')

// Form Đăng Ký
const formDangKy = ref({
  ho_ten: '',
  email: '',
  mat_khau: '',
  xac_nhan_mat_khau: '',
  dong_y: true
})

const dangXuLy = ref(false)
const thongBaoLoi = ref('')
const thongBaoThanhCong = ref('')

function chuyenTab(tab) {
  cheDoAuth.value = tab
  thongBaoLoi.value = ''
  thongBaoThanhCong.value = ''
}

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

  const inputEmail = email.value.trim().toLowerCase()
  const inputPassword = matKhau.value

  // 1. Kiểm tra API thật nếu có
  try {
    const res = await api.post('/auth/login', {
      email: inputEmail,
      mat_khau: inputPassword
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
    // API backend chưa bật, chuyển qua kiểm tra tài khoản client logic
  }

  // 2. Logic xác thực tài khoản nội bộ
  const dsNguoiDung = JSON.parse(localStorage.getItem('dt12_users') || '[]')
  const userTimThay = dsNguoiDung.find(u => u.email === inputEmail)

  let roleHopLe = null
  let hoTenHopLe = ''

  if (inputEmail === 'admin@toursentiment.vn') {
    if (inputPassword === 'Admin@123456') {
      roleHopLe = 'admin'
      hoTenHopLe = 'Quản trị viên (Admin)'
    } else {
      dangXuLy.value = false
      thongBaoLoi.value = 'Mật khẩu quản trị viên không chính xác. Mặc định: Admin@123456'
      return
    }
  } else if (inputEmail === 'khachhang@toursentiment.vn') {
    if (inputPassword === 'Khach@123456') {
      roleHopLe = 'du_khach'
      hoTenHopLe = 'Du khách trải nghiệm'
    } else {
      dangXuLy.value = false
      thongBaoLoi.value = 'Mật khẩu du khách mẫu không chính xác. Mặc định: Khach@123456'
      return
    }
  } else if (userTimThay) {
    if (userTimThay.mat_khau === inputPassword) {
      roleHopLe = userTimThay.vai_tro || 'du_khach'
      hoTenHopLe = userTimThay.ho_ten
    } else {
      dangXuLy.value = false
      thongBaoLoi.value = 'Mật khẩu tài khoản không chính xác. Vui lòng kiểm tra lại!'
      return
    }
  } else {
    dangXuLy.value = false
    thongBaoLoi.value = 'Email chưa được đăng ký trong hệ thống. Bạn có thể bấm tab "Đăng Ký Du Khách" bên trên!'
    return
  }

  // Lưu phiên đăng nhập
  localStorage.setItem('token', 'jwt_' + roleHopLe + '_' + Date.now())
  localStorage.setItem('vai_tro', roleHopLe)
  localStorage.setItem('ho_ten', hoTenHopLe)
  thongBaoThanhCong.value = `Đăng nhập thành công! Xin chào, ${hoTenHopLe}.`

  setTimeout(() => {
    if (roleHopLe === 'admin') {
      router.push('/quan-tri')
    } else {
      router.push('/dashboard')
    }
  }, 400)
}

async function dangKy() {
  thongBaoLoi.value = ''
  thongBaoThanhCong.value = ''

  if (formDangKy.value.mat_khau.length < 6) {
    thongBaoLoi.value = 'Mật khẩu phải chứa ít nhất 6 ký tự để bảo đảm an toàn!'
    return
  }

  if (formDangKy.value.mat_khau !== formDangKy.value.xac_nhan_mat_khau) {
    thongBaoLoi.value = 'Mật khẩu xác nhận không khớp với mật khẩu đã nhập!'
    return
  }

  const emailMoi = formDangKy.value.email.trim().toLowerCase()
  const dsNguoiDung = JSON.parse(localStorage.getItem('dt12_users') || '[]')

  if (emailMoi === 'admin@toursentiment.vn' || emailMoi === 'khachhang@toursentiment.vn' || dsNguoiDung.some(u => u.email === emailMoi)) {
    thongBaoLoi.value = 'Địa chỉ email này đã tồn tại trong hệ thống. Vui lòng đăng nhập hoặc dùng email khác!'
    return
  }

  dangXuLy.value = true

  // Tạo tài khoản mới
  const userMoi = {
    id: Date.now(),
    ho_ten: formDangKy.value.ho_ten.trim(),
    email: emailMoi,
    mat_khau: formDangKy.value.mat_khau,
    vai_tro: 'du_khach',
    ngay_tao: new Date().toISOString()
  }

  try {
    await api.post('/auth/register', userMoi)
  } catch (e) {
    // Lưu local
  }

  dsNguoiDung.push(userMoi)
  localStorage.setItem('dt12_users', JSON.stringify(dsNguoiDung))

  dangXuLy.value = false
  thongBaoThanhCong.value = 'Đăng ký tài khoản thành công! Tự động đăng nhập vào hệ thống...'

  // Đăng nhập tự động
  localStorage.setItem('token', 'jwt_du_khach_' + Date.now())
  localStorage.setItem('vai_tro', 'du_khach')
  localStorage.setItem('ho_ten', userMoi.ho_ten)

  setTimeout(() => {
    router.push('/dashboard')
  }, 600)
}
</script>

<style scoped>
.nevio-login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: var(--nevio-bg);
  background-image: 
    radial-gradient(at 0% 0%, rgba(253, 221, 98, 0.08) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(24, 24, 27, 0.04) 0px, transparent 50%);
}

.login-container {
  width: 100%;
  max-width: 520px;
  box-sizing: border-box;
}

.login-card {
  background: var(--nevio-card-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-xl);
  padding: 36px 32px;
  box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.brand-logo-circle {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background-color: #fddd62;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px auto;
  box-shadow: 0 4px 14px rgba(253, 221, 98, 0.4);
}

.nevio-label.center {
  display: block;
  text-align: center;
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--mau-chu-mo);
}

.login-title {
  font-size: 22px;
  font-weight: 900;
  color: var(--mau-chu);
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.login-subtitle {
  font-size: 13px;
  color: var(--mau-chu-phu);
  line-height: 1.45;
}

/* Tabs Bar */
.auth-tabs-bar {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  padding: 4px;
  border-radius: var(--radius-lg);
  gap: 4px;
  margin-bottom: 22px;
}

.auth-tab-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: var(--radius-md);
  border: none;
  background: transparent;
  color: var(--mau-chu-phu);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.auth-tab-btn:hover {
  color: var(--mau-chu);
}

.auth-tab-btn.active {
  background: #ffffff;
  color: #18181b;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

[data-theme="dark"] .auth-tab-btn.active {
  background: #fddd62;
  color: #18181b;
}

/* Alerts */
.alert-error {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 12.5px;
  margin-bottom: 18px;
}

.alert-success {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #15803d;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  font-size: 12.5px;
  margin-bottom: 18px;
}

/* Form */
.nevio-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu);
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  pointer-events: none;
}

.form-input {
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 11px 40px 11px 36px;
  background: var(--nevio-input-bg);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-md);
  font-size: 13.5px;
  color: var(--mau-chu);
  outline: none;
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus {
  border-color: #fddd62;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(253, 221, 98, 0.25);
}

[data-theme="dark"] .form-input:focus {
  background: #27272a;
}

.btn-toggle-pw {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--mau-chu-mo);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.form-terms-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: var(--mau-chu-phu);
  line-height: 1.4;
}

.terms-label {
  cursor: pointer;
}

.w-full-center {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 800;
  margin-top: 6px;
}

/* Quick Roles */
.quick-roles-section {
  border-top: 1px dashed var(--nevio-border);
  padding-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
}

.quick-title {
  font-size: 12px;
  font-weight: 800;
  color: var(--mau-chu-phu);
  margin-bottom: 10px;
  text-align: center;
}

.quick-grid.two-cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
}

.btn-quick-role {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--nevio-light-grey);
  border: 1px solid var(--nevio-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
}

.btn-quick-role:hover {
  border-color: #fddd62;
  transform: translateY(-1px);
}

.btn-quick-role.active {
  background: #ffffff;
  border-color: #e5be29;
  box-shadow: 0 4px 12px rgba(253, 221, 98, 0.25);
}

[data-theme="dark"] .btn-quick-role.active {
  background: #27272a;
}

.role-icon-box {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.role-icon-box.bg-gold {
  background: #fddd62;
  color: #18181b;
}

.role-icon-box.bg-white {
  background: #18181b;
  color: #ffffff;
}

[data-theme="dark"] .role-icon-box.bg-white {
  background: #3f3f46;
}

.role-text-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
  overflow: hidden;
}

.role-text-meta strong {
  font-size: 12px;
  color: var(--mau-chu);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.role-text-meta span {
  font-size: 10.5px;
  color: var(--mau-chu-mo);
  white-space: normal;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.login-footer {
  text-align: center;
  border-top: 1px solid var(--nevio-border);
  padding-top: 16px;
}

.link-back-home {
  font-size: 12.5px;
  font-weight: 700;
  color: var(--mau-chu-phu);
  text-decoration: none;
  transition: color 0.15s;
}

.link-back-home:hover {
  color: var(--mau-chu);
}

@media (max-width: 540px) {
  .login-card {
    padding: 24px 18px;
  }
  .quick-grid.two-cols {
    grid-template-columns: 1fr;
  }
}
</style>
