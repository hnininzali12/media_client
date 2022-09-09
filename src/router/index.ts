import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeViewPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
    {
    path: '/',
    name: 'homePage',
    component: ()=>import('../views/HomeViewPage.vue')
  },
  {
    path: '/loginPage',
    name: 'loginPage',
    component:()=>import('../views/LoginPage.vue')
  },
   {
    path: '/registerPage',
    name: 'registerPage',
    component:()=>import('../views/RegisterPage.vue')
  },
  {
    path: '/newsDetail',
    name: 'newsDetail',
    component: ()=>import('../views/DetailPage.vue')
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
