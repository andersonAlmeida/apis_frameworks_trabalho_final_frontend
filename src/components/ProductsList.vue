<template>
  <section id="products-list" class="container center">
    <div class="row">
      <div class="col-lg-12 products">
        <product v-for="prod in productsComp" :key="prod.id"
          :title="prod.nome"
          :image="prod.imagem"
          :description="prod.descricao"
          :price="prod.preco"
          :id="prod.id"
          :item="prod"
        ></product>
      </div>
    </div>
  </section>
</template>

<script>
import Axios from 'axios';
import Produtct from '@/components/ProductListItem.vue';

export default {
  name: 'products-list',
  components: {
    product: Produtct,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      Axios.get('/produtos').then((response) => {
        if (response.data) {
          this.products = response.data;
        }
      }).catch();
    },
  },
  computed: {
    productsComp() {
      return this.products;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
#products-list {
  margin: 50px auto;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

@media screen and (min-width: 768px) {
  .products {
    .product {
      margin-right: calc((100% - 2 * 340px) / 2);
      &:nth-child(4n+4) {
        margin-right: 0;
      }
    }
  }
}

@media screen and (min-width: 1260px) {
  .products {
    .product {
      margin-right: calc((100% - 4 * 260px) / 3);
      &:nth-child(4n+4) {
        margin-right: 0;
      }
    }
  }
}
</style>
