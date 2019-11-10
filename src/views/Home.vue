<template>
  <div id="home" class="">
    <section id="banner" class="row">
      <figure class="banner_item col-lg-12">
        <img class="banner_item-img" src="https://www.placecage.com/1024/768" alt="Banner">
      </figure>
    </section>
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>

<style lang="scss" scoped>
.banner_item {
  width: 100%;
  height: 640px;
}
.banner_item-img {
  width: 100%;
  height: 640px;
  object-fit: cover;
}
</style>
