import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nome: null,
    sobrenome: null,
    email: null,
    token: null,
    codigo: null,
    cart: [],
    isLogged: null,
  },
  mutations: {
    setApiToken: (state, payload) => {
      state.token = payload;
    },
    setUserName: (state, payload) => {
      state.nome = payload;
    },
    setUserLastName: (state, payload) => {
      state.sobrenome = payload;
    },
    setUserEmail: (state, payload) => {
      state.email = payload;
    },
    setUserId: (state, payload) => {
      state.codigo = payload;
    },
    setIsLogged: (state, payload) => {
      state.isLogged = payload;
    },
    addToCart: (state, product) => {
      state.cart.push(product);
    },
    updateCartItem: (state, payload) => {
      const { idx, qnt, price } = payload;

      state.cart[idx].qnt = qnt;
      state.cart[idx].price = price;
    },
  },
  actions: {
    addToCart: (context, product) => {
      const vx = context;

      if (vx.state.cart.length === 0) {
        vx.commit('addToCart', product);
      } else {
        // procura se o produto já está no carrinho
        const idx = vx.state.cart.findIndex(p => p.id === product.id);

        // se sim incrementa a quantidade
        if (idx > -1) {
          const update = {
            idx,
            qnt: +vx.state.cart[idx].qnt + 1,
            price: +vx.state.cart[idx].price + product.price,
          };
          vx.commit('updateCartItem', update);
        } else {
          vx.commit('addToCart', product);
        }
      }
    },
  },
  getters: {
    getApiToken: state => state.token,
    getUserName: state => state.nome,
    getUserLastName: state => state.sobrenome,
    getUserEmail: state => state.email,
    getUserId: state => state.codigo,
    getIsLogged: state => state.isLogged,
    getCartItems: state => state.cart,
    getCartTotalItems: state => state.cart.reduce((total, current) => total + current.qnt, 0),
  },
  modules: {
  },
});
