import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout.vue';
import Home from '@/views/Home.vue';
import Login from '@/components/login/Login.vue';
import RecoverPassword from '@/components/login/RecoverPassword.vue';
import FormSubscribe from '@/components/subscription/FormSubscribe.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home,
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
      },
      {
        path: '/login/recuperar-senha',
        name: 'password-recovery',
        component: RecoverPassword,
      },
    ],
  },
  {
    path: '/cadastro',
    name: 'subscription',
    // route level code-splitting
    // this generates a separate chunk (subscription.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "subscription" */ '../views/Subscription.vue'),
    children: [
      {
        path: '/cadastro',
        name: 'form-subscribe',
        component: FormSubscribe,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
