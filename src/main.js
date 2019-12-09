import Vue from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosDefaults from './helpers/AxiosDefaults';
import loginHeper from './helpers/loginHelper';

// seta as configurações default do axios
AxiosDefaults();

// formata a moeda para R$
const currencyFormat = (value) => {
  if (!value) return '';

  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// filtro para formatar números
Vue.filter('currencyFormat', currencyFormat);

Vue.config.productionTip = false;

// verifica se o usuário está logado senão direciona para a página de login
router.beforeEach((to, from, next) => {
  const authPages = /^\/area-do-cliente((\/)?.*)|\/checkout(\/)?/g;
  const authRequired = authPages.test(to.path);
  const loggedIn = store.getters.getIsLogged;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  return next();
});

new Vue({
  router,
  store,
  loginHeper,
  render: h => h(App),
}).$mount('#app');
