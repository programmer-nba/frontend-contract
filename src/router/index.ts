import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type NavigationGuardNext
} from 'vue-router'
import { jwtDecode } from 'jwt-decode'

const authGuard: () => Promise<boolean> = async () => {
  const token: any = localStorage.getItem('token')
  if (token) {
    try {
      const decodedToken = jwtDecode(token)
      console.log(decodedToken)
      return true
    } catch (error: unknown) {
      console.error('Error decoding token:', error)
      return false
    }
  } else {
    return false
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/auth',
      beforeEnter: async (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
      ) => {
        const isAuthenticated = await authGuard()
        if (isAuthenticated) {
          next('/admin')
        } else {
          next('/auth')
        }
      }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../layouts/auth.vue'),
      redirect: () => '/auth/login',
      children: [
        {
          path: '/auth/login',
          name: 'login',
          component: () => import('@/views/LoginView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../layouts/admin.vue'),
      redirect: () => '/admin/home',
      children: [
        {
          path: '/admin/home',
          name: 'home',
          component: () => import('../views/HomeView.vue')
        },
        {
          path: '/admin/new-contract',
          name: 'new-contract',
          component: () => import('../views/NewContractView.vue')
        },
        {
          path: '/admin/edit-contract/:id',
          name: 'edit-contract',
          component: () => import('../views/EditContractView.vue')
        },
        {
          path: '/admin/partner',
          name: 'partner',
          component: () => import('../views/PartnerView.vue')
        },
        {
          path: '/admin/new-partner-contract',
          name: 'new-partner-contract',
          component: () => import('../views/NewPartnerContractView.vue')
        },
        {
          path: '/admin/edit-partner-contract/:id',
          name: 'edit-partner-contract',
          component: () => import('../views/EditPartnerContractView.vue')
        }
      ]
    }
  ]
})

export default router
