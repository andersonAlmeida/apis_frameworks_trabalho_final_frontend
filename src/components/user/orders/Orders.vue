<template>
  <div id="Address-list" class="container internal-page">
    <div class="row">
      <div class="col-12">
        <h2>Pedidos</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Pedido</th>
              <!-- <th scope="col">Itens</th> -->
              <th scope="col">Prazo</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ped in pedidosComp" :key="ped.id">
              <th scope="row">{{ ped.id }}</th>
              <!-- <td>{{ ped.prazo }}</td> -->
              <td>{{ prazo(ped.prazo) }}</td>
              <td>{{ +ped.total | currencyFormat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      pedidos: [],
    };
  },
  computed: {
    pedidosComp() {
      return this.pedidos;
    },
  },
  methods: {
    prazo(prazo) {
      return moment(prazo).format('DD/MM/YYYY');
    },
    getOrders() {
      Axios.get(`/pedidos/${this.$store.getters.getUserId}`).then((result) => {
        if (result.data) {
          this.pedidos = result.data;
        }
      });
    },
    deleteAddress(id) {
      Axios.delete(`clientes/enderecos/${id}`).then((result) => {
        if (result.status === 200) {
          const idx = this.enderecos.findIndex(e => e.id === id);

          if (idx > -1) {
            this.enderecos.splice(idx, 1);
          }
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('api_user_data');

          this.$store.commit('setApiToken', null);
          this.$store.commit('setUserName', null);
          this.$store.commit('setUserLastName', null);
          this.$store.commit('setUserEmail', null);
          this.$store.commit('setUserId', null);
          this.$store.commit('setIsLogged', false);
          this.$router.push('/login');
        }
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
