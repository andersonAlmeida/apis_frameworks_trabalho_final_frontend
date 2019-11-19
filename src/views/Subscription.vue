<template>
  <div class="app-layout">
    <header id="main-header">
      <header-no-menu></header-no-menu>
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
import HeaderNoMenu from '@/components/HeaderNoMenu.vue';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'layout',
  components: {
    'header-no-menu': HeaderNoMenu,
    'main-footer': MainFooter,
  },
};
</script>

<style lang="stylus" scoped>

</style>
