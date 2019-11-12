<template>
  <div class="card product">
    <img class="card-img-top" src="https://www.placecage.com/100/80" alt="Imagem de capa do card">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <p class="price">
        R$ <strong>{{ price }}</strong>
      </p>
      <a :href="link" class="btn btn-block btn-primary">Ver detalhes</a>
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
    imagem: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    link: {
      type: String,
      default: '',
      required: true,
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
