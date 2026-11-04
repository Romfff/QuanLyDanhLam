import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
})

// Tự động gắn Token vào mọi Request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Tự động đẩy về trang Đăng nhập nếu Lỗi 401 (Token hết hạn/hủy)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('vai_tro')
      window.location.href = '/dang-nhap'
    }
    return Promise.reject(error)
  }
)

export default api