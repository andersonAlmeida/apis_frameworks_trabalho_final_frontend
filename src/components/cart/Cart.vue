<template>
  <div class="container internal-page" id="cart-page">
    <div class="row">
      <h2 class="col-12">Carrinho de compras</h2>
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
              <th scope="col">Remover</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in getCartItems" :key="item.id">
              <th scope="row">{{ i + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.qnt }}</td>
              <td>R$ {{ item.price }}</td>
              <td><button class="btn btn-danger" @click.stop.prevent="removeFromCart(item.id)">Remover</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-12 d-flex justify-content-end">
        <p>
          <strong>Total: </strong> R$ {{ getCartTotalValue }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'cart',
  computed: {
    ...mapGetters(['getCartItems', 'getCartTotalValue']),
  },
  methods: {
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id);
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  td, th {
    vertical-align: middle;
  }
}
</style>
