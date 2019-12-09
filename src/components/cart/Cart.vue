<template>
  <div class="container internal-page" id="cart-page">
    <div class="row">
      <h2 class="col-12">Carrinho de compras</h2>
    </div>
    <div class="row">
      <div class="col-12 table-wrapper">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col" class="d-none d-md-block">#</th>
              <th scope="col">Produto</th>
              <th scope="col">Qtd</th>
              <th scope="col">Valor</th>
              <th scope="col">Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in getCartItems" :key="item.id">
              <th scope="row" class="d-none d-md-block">{{ i + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.qnt }}</td>
              <td>{{ item.price | currencyFormat }}</td>
              <td><button class="btn btn-danger" @click.stop.prevent="removeFromCart(item.id)">Remover</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Subtotal -->
      <div class="col-12 d-flex justify-content-end">
        <p>
          Subtotal: <strong>{{ getCartTotalValue | currencyFormat}}</strong>
        </p>
      </div>
      <!-- Frete -->
      <div class="col-12">
        <div class="row">
          <div class="col-md-6">
            <form class="form-inline">
              <div class="input-group  mt-2 mb-2">
                <div class="custom-file">
                  <label class="label mr-2" for="frete"><strong>Frete: </strong></label>
                  <input type="text" class="custom-input col-lg-12" id="frete" v-model="cep">
                </div>
                <div class="input-group-append">
                  <button class="btn btn-info" type="button" @click="calcFrete">Calcular</button>
                </div>
            </div>
            </form>
          </div>

          <div class="col-md-6 d-flex justify-content-end flex-wrap">
            <p class="frete-info" v-if="getFrete">frete: <strong>{{ frete | currencyFormat}}</strong></p>
            <p class="frete-info" v-if="getPrazo">{{ prazo }} dias a contar da data de débito.</p>
          </div>
        </div>
      </div>

      <!-- Total -->
      <div class="col-12 d-flex justify-content-end">
        <p class="total">
          Total:
          <strong class="value">{{ getTotal | currencyFormat}}</strong>
        </p>
      </div>

      <!-- Botões -->
      <div class="col-12 d-flex justify-content-between mt-4">
        <router-link to="/" class="btn btn-primary">Continuar comprando</router-link>
        <button @click="goToCheckout" class="btn btn-success">Ir para o checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Correios from 'node-correios';
import Inputmask from 'inputmask';

export default {
  name: 'cart',
  data() {
    return {
      cep: '',
      frete: null,
      prazo: null,
    };
  },
  computed: {
    ...mapGetters(['getCartItems', 'getCartTotalValue', 'getCartTotalItems', 'getIsLogged']),
    getPrazo() {
      return this.prazo != null;
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
    calcFrete() {
      const correios = new Correios();

      correios.calcPrecoPrazo({
        nCdServico: '04510',
        sCepOrigem: '90010350', // cep do senac
        sCepDestino: this.cep,
        nVlPeso: `${this.getCartTotalItems * 0.8}`, // peso fixo
        nCdFormato: 1,
        nVlComprimento: 15.5,
        nVlAltura: 10.0,
        nVlLargura: 20.0,
        nVlDiametro: 15.0,
      }).then((response) => {
        console.log(response);
        this.frete = response[0].Valor;
        this.prazo = response[0].PrazoEntrega;
      });
    },
    goToCheckout() {
      if (this.getCartTotalItems < 1) return false;

      if (!this.getIsLogged) {
        this.$router.push('/login');
      } else {
        this.$router.push('/checkout');
      }
      return true;
    },
  },
  mounted() {
    Inputmask({ mask: '99999-999' }).mask(document.querySelector('#frete'));
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
