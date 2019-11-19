<template>
  <div class="container">
    <div class="col-lg-12">
      <nav id="main-menu" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <figure class="logo"><img src="https://www.placecage.com/120/50" alt=""></figure>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#conteudoNavbarSuportado" aria-controls="conteudoNavbarSuportado"
          aria-expanded="false" aria-label="Alterna navegação">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="conteudoNavbarSuportado">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Categorias</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Entrar
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/login" class="dropdown-item">Login</router-link>
                <a class="dropdown-item" href="#">Meus Pedidos</a>
                <a class="dropdown-item" href="#">Endereços</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search"
              placeholder="Pesquisar" aria-label="Pesquisar">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Pesquisar</button>
          </form>
        </div>
      </nav>
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
