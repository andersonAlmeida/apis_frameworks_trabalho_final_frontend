import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout.vue';
import Home from '@/views/Home.vue';
import Login from '@/components/login/Login.vue';
import RecoverPassword from '@/components/login/RecoverPassword.vue';
import FormSubscribe from '@/components/subscription/FormSubscribe.vue';
import Cart from '@/components/cart/Cart.vue';
import Checkout from '@/components/checkout/Checkout.vue';
import UserDetails from '@/components/user/UserDetails.vue';
import Orders from '@/components/user/orders/Orders.vue';
import AddressList from '@/components/user/address/AddressList.vue';
import AddressForm from '@/components/user/address/FormAddress.vue';
import AddressUpdateForm from '@/components/user/address/FormUpdateAddress.vue';


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
      {
        path: '/carrinho',
        name: 'cart',
        component: Cart,
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: Checkout,
      },
      {
        path: '/area-do-cliente',
        name: 'user-details',
        component: UserDetails,
      },
      {
        path: '/area-do-cliente/enderecos',
        name: 'address',
        component: AddressList,
      },
      {
        path: '/area-do-cliente/pedidos',
        name: 'orders',
        component: Orders,
      },
      {
        path: '/area-do-cliente/enderecos/novo',
        name: 'address-form',
        component: AddressForm,
      },
      {
        path: '/area-do-cliente/enderecos/editar/:userid/:id',
        name: 'address-update-form',
        component: AddressUpdateForm,
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
