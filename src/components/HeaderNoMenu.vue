<template>
  <div class="container">
    <div class="col-lg-12">
      <a class="navbar-brand" href="#">
        <figure class="logo"><img src="https://www.placecage.com/120/50" alt=""></figure>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#main-menu {
  // display: inline-block;

  ul {
    display: flex;
    align-items: center;

    li {
      & + li {
        margin-left: 20px;
      }
    }
  }
}
</style>
