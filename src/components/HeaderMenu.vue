<template>
  <div class="container">
    <div class="col-lg-12">
      <nav id="main-menu" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <figure class="logo"><img src="https://www.placecage.com/120/50" alt=""></figure>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado"
          aria-expanded="false" aria-label="Alterna navegação">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mr-4" id="conteudoNavbarSuportado">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item dropdown">
              <a v-if="isLogged" class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Olá {{ userName }}
              </a>
              <a v-else class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Entrar
              </a>

              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/login" class="dropdown-item" v-if="!isLogged">Login</router-link>
                <router-link to="/area-do-cliente" class="dropdown-item" v-if="isLogged">Meus Dados</router-link>
                <router-link to="/area-do-cliente/pedidos" class="dropdown-item" v-if="isLogged">Meus Pedidos</router-link>
                <router-link to="/area-do-cliente/enderecos" class="dropdown-item" v-if="isLogged">Endereços</router-link>
                <button class="dropdown-item" @click.prevent="logout" v-if="isLogged">Sair</button>
              </div>
            </li>
            <li class="nav-item">
              <router-link to="/carrinho">Carrinho {{ cartTotalItems }}</router-link>
            </li>
          </ul>
          <!-- <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search"
              placeholder="Pesquisar" aria-label="Pesquisar">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Pesquisar</button>
          </form> -->
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'header-menu',
  computed: mapGetters({
    userName: 'getUserName',
    isLogged: 'getIsLogged',
    cartTotalItems: 'getCartTotalItems',
  }),
  methods: {
    logout() {
      localStorage.removeItem('api_user_data');

      this.$store.commit('setApiToken', null);
      this.$store.commit('setUserName', null);
      this.$store.commit('setUserLastName', null);
      this.$store.commit('setUserEmail', null);
      this.$store.commit('setUserId', null);
      this.$store.commit('setIsLogged', false);

      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-menu {
  // display: inline-block;

  ul {
    display: flex;
    align-items: center;

    li {
      & + li {
        margin-left: 20px;
      }
    }
  }
}
</style>
