import type { App } from 'vue'

import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory
} from 'vue-router'

const openTokenKey = 'DATAVIS_OPEN_TOKEN'

// token
const getOpenTokenData = () => {
  return window.localStorage.getItem(openTokenKey)
}

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'website',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/common/login/index.vue')
  },
  {
    path: '/home',
    meta: {
      requiredAuth: true
    },
    name: 'home',
    redirect: '/workspace',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '/workspace',
        name: 'workspace',
        redirect: '/workspace/market',
        component: () => import('@/views/workspace/layout/index.vue'),
        meta: {
          title: '管理界面'
        },
        children: [
          {
            path: '/workspace/screen',
            name: 'workspace.screen',
            component: () => import('@/views/workspace/screen/index.vue'),
            meta: {
              title: '大屏管理'
            }
          },
          {
            path: '/workspace/module',
            name: 'workspace.module',
            component: () => import('@/views/workspace/module/index.vue'),
            meta: {
              title: '模块管理'
            }
          },
          {
            path: '/workspace/resource',
            name: 'workspace.resource',
            component: () => import('@/views/workspace/resource/index.vue'),
            meta: {
              title: '资源管理'
            }
          },
          {
            path: '/workspace/market',
            name: 'workspace.market',
            component: () => import('@/views/workspace/market/index.vue'),
            meta: {
              title: '模板市场'
            }
          },
          {
            path: '/workspace/theme',
            name: 'workspace.theme',
            component: () => import('@/views/workspace/theme/index.vue'),
            meta: {
              title: '主题管理'
            }
          }
        ]
      },
      {
        path: '/frame/:id',
        name: 'frame',
        component: () => import('@/views/design/studio/community/index.vue'),
        meta: {
          title: '大屏编辑'
        }
      },
      {
        path: '/view',
        name: 'prview',
        component: () => import('@/views/design/view/index.vue'),
        meta: {
          title: '大屏查看'
        } 
      },
      {
        path: '/view/:id',
        name: 'view',
        component: () => import('@/views/design/view/index.vue'),
        meta: {
          title: '大屏查看'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

// 路由拦截
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (getOpenTokenData()) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})

export default router

export const registerRouter = (app: App<Element>) => {
  app.use(router)
}
