<template>
  <div class="card product">
    <figure class="product-img">
      <img class="card-img-top" :src="imagem" alt="Imagem de capa do card">
    </figure>
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        {{ description }}
      </p>
      <p class="price">
        <strong>{{ +price | currencyFormat }}</strong>
      </p>
      <button v-if="item.estoque > 0" @click="addToCart" class="btn btn-block btn-primary">Comprar</button>
      <button v-else class="btn btn-block btn-primary" type="button" disabled>Esgotado</button>
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
      type: Array,
      default: () => [],
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
    item: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    imagem() {
      if (this.image.length > 0) {
        return this.image[0].imagem;
      }

      return 'https://www.placecage.com/200/120';
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

      this.item.estoque -= 1;

      this.$store.dispatch('addToCart', prod);
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  margin-bottom: 30px;
  width: 100%;
}

.price {
  strong {
    font-size: 22px;
  }
}

.product-img {
  overflow: hidden;
}

.card-img-top {
  max-height: 200px;
  width: auto;
  object-fit: cover;
  margin: 0 auto;
  display: block;
}

@media screen and (min-width: 768px) {
  .product {
    margin-bottom: 30px;
    max-width: 340px;
    width: 100%;
  }

  .price {
    strong {
      font-size: 22px;
    }
  }
}

@media screen and (min-width: 1260px) {
  .product {
    max-width: 260px;
  }
}
</style>
