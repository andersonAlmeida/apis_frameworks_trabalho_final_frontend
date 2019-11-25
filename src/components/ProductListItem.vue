<template>
  <div class="card product">
    <img class="card-img-top" :src="image" alt="Imagem de capa do card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <p class="price">
        R$ <strong>{{ price }}</strong>
      </p>
      <button @click="addToCart" class="btn btn-block btn-primary">Comprar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'product',
  props: {
    title: {
      type: String,
      default: '',
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    price: {
      type: String,
      default: '',
      required: true,
    },
    id: {
      type: Number,
      default: null,
      required: true,
    },
  },
  methods: {
    addToCart() {
      const prod = {
        id: this.id,
        name: this.title,
        price: +this.price,
        image: this.image,
        qnt: 1,
      };

      this.$store.dispatch('addToCart', prod);
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  margin-bottom: 30px;
  max-width: 260px;
  width: 100%;
}

.price {
  strong {
    font-size: 22px;
  }
}
</style>
