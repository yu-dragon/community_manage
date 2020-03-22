import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcom.vue'
import UserList from '../components/UserList.vue'
import InfoList from '../components/InfoList.vue'

Vue.use(VueRouter)

const routes = [
  // 路由重定向，根目录直接跳转到登录页面
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/userList',
        component: UserList
      },
      {
        path: '/infoList',
        component: InfoList
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to要访问的路径
  // from从哪个路径跳转而来
  // next()放行，next('路径名')强制跳转
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
