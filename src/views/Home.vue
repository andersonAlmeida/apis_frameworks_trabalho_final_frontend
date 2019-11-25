<template>
  <div id="home" class="">
    <section id="banner" class="row">
      <figure class="banner_item col-lg-12">
        <img class="banner_item-img" src="@/assets/img/banner-bf.jpg" alt="Banner">
      </figure>
    </section>
    <product-list></product-list>
  </div>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'home',
  components: {
    'product-list': ProductsList,
  },
};
</script>

<style lang="scss" scoped>
.banner_item {
  width: 100%;
  height: 100%;
}
.banner_item-img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}
</style>
