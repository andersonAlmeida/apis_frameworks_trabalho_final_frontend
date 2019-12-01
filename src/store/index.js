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
    fbObject: null,
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
    setFbObj: (state, payload) => {
      state.fbObject = payload;
    },
    addToCart: (state, product) => {
      state.cart.push(product);
      localStorage.setItem('api_cart', JSON.stringify(state.cart));
    },
    updateCartItem: (state, payload) => {
      const { idx, qnt, price } = payload;

      state.cart[idx].qnt = qnt;
      state.cart[idx].price = price;

      localStorage.setItem('api_cart', JSON.stringify(state.cart));
    },
    addStorageCartItems: (state, items) => {
      state.cart = JSON.parse(items);
    },
    removeFromCart(state, cartItems) {
      state.cart = cartItems;
      localStorage.setItem('api_cart', JSON.stringify(state.cart));
    },
    clearCart(state) {
      state.cart = [];
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
    removeFromCart(context, id) {
      const idx = context.state.cart.findIndex(p => p.id === id);

      if (idx > -1) {
        context.state.cart.splice(idx, 1);
        // context.commit('removeFromCart', cartUpdated);
        localStorage.setItem('api_cart', JSON.stringify(context.state.cart));
      }
    },
    clearCart(context) {
      context.commit('clearCart');
    },
    setFbUserData(context, fbObj) {
      context.commit('setUserName', fbObj.first_name);
      context.commit('setUserLastName', fbObj.last_name);
      context.commit('setUserEmail', fbObj.email);
      context.commit('setFbObj', fbObj);
    },
    updateUserData(context, data) {
      context.commit('setUserName', data.nome);
      context.commit('setUserLastName', data.sobrenome);
      context.commit('setUserEmail', data.email);
    },
    getStorageCartItems(context) {
      const cartItems = localStorage.getItem('api_cart');

      if (cartItems) {
        context.commit('addStorageCartItems', cartItems);
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
    getCartTotalValue: state => state.cart.reduce((total, current) => total + current.price, 0),
  },
  modules: {
  },
});
