<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    // eslint-disable-next-line
    this.$store.dispatch('getStorageCartItems');
  },
};
</script>

<style lang="scss">
  @import './assets/styles/styles';
</style>
