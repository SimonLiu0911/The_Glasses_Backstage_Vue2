import Vue from 'vue';
import VueRouter from 'vue-router';
import lazyLoadView from '@/router/lazyload-view';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => lazyLoadView(import('@/views/Login/Index'))
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: () => lazyLoadView(import('@/views/ProductList/Index'))
  },
  {
    path: '/order-list',
    name: 'OrderList',
    component: () => lazyLoadView(import('@/views/OrderList/Index'))
  },
  {
    path: '/coupon-list',
    name: 'CouponList',
    component: () => lazyLoadView(import('@/views/CouponList/Index'))
  }
];

const router = new VueRouter({
  routes
});

export default router;
