import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'goggle-list' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'goggle',
        children: [
          {
            name: 'goggle-list',
            path: '',
            component: () => import('pages/goggle/list/GoggleListPage.vue'),
          },
          {
            name: 'goggle-detail',
            path: ':host/:id',
            component: () => import('pages/goggle/detail/GoggleDetailPage.vue'),
          },
          {
            name: 'goggle-edit',
            path: ':host/:id/:action?/:index?/edit',
            component: () => import('pages/goggle/edit/GoggleEditPage.vue'),
          },
        ],
      },
      {
        name: 'settings',
        path: 'settings',
        component: () => import('pages/settings/SettingsPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/SetupLayout.vue'),
    children: [
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
      },
    ],
  },
]

export default routes
