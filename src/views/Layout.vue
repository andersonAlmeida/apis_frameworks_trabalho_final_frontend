<template>
  <div class="app-layout">
    <header id="main-header">
      <header-menu></header-menu>
    </header>
    <main>
      <router-view />
    </main>
    <footer id="main-footer">
      <main-footer></main-footer>
    </footer>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'layout',
  components: {
    'header-menu': HeaderMenu,
    'main-footer': MainFooter,
  },
};
</script>

<style lang="stylus" scoped>

</style>
