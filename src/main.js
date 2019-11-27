import Vue from 'vue';
import 'bootstrap/dist/js/bootstrap.bundle';
import App from './App.vue';
import router from './router';
import store from './store';
import AxiosDefaults from './helpers/AxiosDefaults';

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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
