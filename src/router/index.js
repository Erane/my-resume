import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index';
import loading from '@/components/loading';
import process from '@/components/process';
import luck_draw from '@/components/luck_draw';
import upload from '@/components/upload';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/loading',
      name: 'loading',
      component: loading
    },
    {
      path: '/process',
      name: 'process',
      component: process
    },
    {
      path: '/luck_draw',
      name: 'luck_draw',
      component: luck_draw
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
  ]
})
