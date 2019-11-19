<template>
  <section id="products-list" class="container center">
    <div class="row">
      <div class="col-lg-12 products">
        <product v-for="i in 10" :key="i"
          :title="`Produto ${ i }`"
          image=""
          :description="`Descrição ${ i }`"
          :price="i + 10 + ',00'"
          link="https://br.vuejs.org/v2/guide/components-props.html"
        ></product>
      </div>
    </div>
  </section>
</template>

<script>
import Produtct from '@/components/ProductListItem.vue';

export default {
  name: 'products-list',
  components: {
    product: Produtct,
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
  .product {
    margin-right: calc((100% - 4 * 260px) / 3);
    &:nth-child(4n+4) {
      margin-right: 0;
    }
  }
}
</style>
