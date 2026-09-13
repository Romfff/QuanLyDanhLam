import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dang-nhap',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { canDangNhap: true }
  },

  {
  path: '/phieu-cua-toi',
  name: 'PhieuCuaToi',
  component: () => import('../views/PhieuCuaToiView.vue'),
  meta: { canDangNhap: true }
},

  {
    path: '/danh-sach-danh-gia',
    name: 'DanhSachDanhGia',
    component: () => import('../views/DanhSachDanhGiaView.vue')
  },
  {
    path: '/diem-den/:id', // ✅ ĐÃ SỬA: Khớp đúng với đường dẫn /diem-den/3
    name: 'ChiTietDiemDen',
    component: () => import('../views/ChiTietDiemDenView.vue')
  },
  {
    path: '/quan-tri/diem-den',
    name: 'QuanTriDiemDen',
    component: () => import('../views/DashboardView.vue'), // Trỏ tạm về Dashboard cho Admin/Quản lý
    meta: { canDangNhap: true, chiQuanTri: true }
  },
  {
    path: '/khong-co-quyen',
    name: 'KhongCoQuyen',
    component: () => import('../views/KhongCoQuyenView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ROUTE GUARD: Kiểm tra quyền truy cập ở Client
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const vaiTro = localStorage.getItem('vai_tro')

  if (to.meta.canDangNhap && !token) {
    return next('/dang-nhap')
  }

  if (to.meta.chiQuanTri && !['admin', 'quan_ly_diem_den'].includes(vaiTro)) {
    return next('/khong-co-quyen')
  }

  next()
})

export default router