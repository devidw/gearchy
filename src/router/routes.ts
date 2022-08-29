import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/GoggleList.vue') },
      {
        path: 'goggle/:id',
        component: () => import('pages/GoggleSingle.vue'),
      },
      {
        path: 'goggle/:id/edit',
        component: () => import('pages/GoggleEdit.vue'),
      },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
