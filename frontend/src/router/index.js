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
    component: () => import('../views/DashboardView.vue')
  },
  {
    path: '/diem-den',
    name: 'DiemDenList',
    component: () => import('../views/DiemDenListView.vue')
  },
  {
    path: '/absa',
    name: 'AbsaAnalytics',
    component: () => import('../views/AbsaAnalyticsView.vue')
  },
  {
    path: '/phieu-cua-toi',
    name: 'PhieuCuaToi',
    component: () => import('../views/PhieuCuaToiView.vue')
  },
  {
    path: '/danh-sach-danh-gia',
    name: 'DanhSachDanhGia',
    component: () => import('../views/DanhSachDanhGiaView.vue')
  },
  {
    path: '/diem-den/:id',
    name: 'ChiTietDiemDen',
    component: () => import('../views/ChiTietDiemDenView.vue')
  },
  {
    path: '/quan-tri',
    name: 'QuanTriAdmin',
    component: () => import('../views/DashboardAdminView.vue'),
    meta: { canDangNhap: true, chiQuanTri: true }
  },
  {
    path: '/quan-tri/diem-den',
    redirect: '/quan-tri'
  },
  {
    path: '/khong-co-quyen',
    name: 'KhongCoQuyen',
    component: () => import('../views/KhongCoQuyenView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return savedPosition || { top: 0 }
  }
})

// ROUTE GUARD
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const vaiTro = localStorage.getItem('vai_tro')

  if (to.meta.canDangNhap && !token) {
    return next('/dang-nhap')
  }

  if (to.meta.chiQuanTri && vaiTro !== 'admin') {
    return next('/khong-co-quyen')
  }

  next()
})

export default router
