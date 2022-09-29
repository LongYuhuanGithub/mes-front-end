import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'
import HomeView from '@/views/HomeView'
import WelcomeView from '@/views/WelcomeView'
import UsersView from '@/views/UsersView'
import RolesView from '@/views/RolesView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/register',
    component: RegisterView
  },
  {
    path: '/resetPwd',
    component: ResetPasswordView
  },
  {
    path: '/home',
    component: HomeView,
    redirect: '/home/welcome',
    children: [
      {
        path: 'welcome',
        component: WelcomeView
      },
      {
        path: 'users',
        component: UsersView
      },
      {
        path: 'roles',
        component: RolesView
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫，必须要登录才能访问 /login 之外的路由
router.beforeEach((to, from, next) => {
  if (to.path === '/login' ||
      to.path === '/register' ||
      to.path === '/resetPwd' ||
      to.path.includes('/api/')) return next() // 放行
  if (!sessionStorage.getItem('mes_front_end_token')) return next('/login') // 没有登录，跳转到登录页面
  next()
})

export default router
