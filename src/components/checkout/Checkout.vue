<template>
  <div class="container internal-page" id="checkout-page">
    <div class="row">
      <h2 class="col-12">Checkout</h2>
    </div>
    <div class="row mb-4">
      <div class="col-3">
        <label for="endereco">Endereco de entrega</label>
        <select name="endereco" id="endereco" class="form-control" v-model="enderecoSelecionado" @change="calcFrete">
          <option v-for="end in enderecos" :key="end.id" :value="end.id">{{ end.nome }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Produto</th>
              <th scope="col">Qtd</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in getCartItems" :key="item.id">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.qnt }}</td>
              <td>{{ item.price | currencyFormat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Frete -->
      <div class="col-12">
        <p class="frete-info" v-if="getFrete">frete: <strong>{{ frete | currencyFormat}}</strong></p>
        <p class="frete-info" v-if="getPrazo">Entrega até {{ formatPrazo }}</p>
      </div>

      <!-- Total -->
      <div class="col-12 d-flex justify-content-end">
        <p class="total">
          Total:
          <strong class="value">{{ getTotal | currencyFormat}}</strong>
        </p>
      </div>

      <!-- Botões -->
      <div class="col-12 d-flex justify-content-end mt-4">
        <button @click="saveShop" class="btn btn-success">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Correios from 'node-correios';
import Axios from 'axios';
import moment from 'moment';

export default {
  name: 'checkout',
  data() {
    return {
      cep: '',
      frete: null,
      prazo: null,
      enderecoSelecionado: '',
      enderecos: [],
      produtos: [],
    };
  },
  computed: {
    ...mapGetters(['getCartItems', 'getCartTotalValue', 'getCartTotalItems', 'getIsLogged', 'getUserId']),
    getPrazo() {
      return this.prazo != null;
    },
    formatPrazo() {
      return moment(this.prazo).format('DD/MM/YYYY');
    },
    getFrete() {
      return this.frete != null;
    },
    getTotal() {
      if (this.frete) {
        return parseFloat(this.getCartTotalValue) + parseFloat(this.frete);
      }

      return this.getCartTotalValue;
    },
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },
    calcFrete(evt) {
      const correios = new Correios();
      const end = this.enderecos.find(e => e.id === +evt.currentTarget.value);

      correios.calcPrecoPrazo({
        nCdServico: '04510',
        sCepOrigem: '90010350', // cep do senac
        sCepDestino: end.cep,
        nVlPeso: `${this.getCartTotalItems * 0.8}`, // peso fixo
        nCdFormato: 1,
        nVlComprimento: 15.5,
        nVlAltura: 10.0,
        nVlLargura: 20.0,
        nVlDiametro: 15.0,
      }).then((response) => {
        this.frete = response[0].Valor;
        this.prazo = moment().add(response[0].PrazoEntrega, 'days').format('YYYY-MM-DD');
      });
    },
    getAddress() {
      Axios.get(`clientes/enderecos/${this.$store.getters.getUserId}`).then((result) => {
        if (result.data) {
          this.enderecos = result.data;
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
    saveShop() {
      if (!this.prazo) return;

      Axios.post('pedidos', {
        total: this.getTotal,
        prazo: this.prazo,
        id_cliente: this.getUserId,
        codigo_rastreamento: '',
        produtos: this.produtos,
      }).then((result) => {
        if (result.status === 201) {
          // limpa o carrinho no local storage
          localStorage.removeItem('api_cart');

          // limpa o carrinho da store
          this.$store.dispatch('clearCart');

          this.$router.push('/area-do-cliente/pedidos');
        }
      });
    },
  },
  created() {
    this.getAddress();

    this.produtos = this.getCartItems.map(p => (
      {
        id: p.id,
        quantidade: p.qnt,
      }
    ));
  },
};
</script>

<style lang="scss" scoped>
.total {
  font-size: 28px;
}

.table {
  td, th {
    vertical-align: middle;
  }
}

.custom-input {
  height: 100%;
  border-radius: 3px 0 0 3px;
  border: 1px solid var(--gray);
  padding: 0 10px;
}

.frete-info {
  width: 100%;
  text-align: right;
}
</style>
