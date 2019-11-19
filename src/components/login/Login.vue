<template>
  <div class="container internal-page" id="login">
    <div class="d-flex justify-content-center">
      <div class="col-md-6">
        <h2>Entrar</h2>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <form class="col-md-6">
        <div class="form-group">
          <label for="email">Endereço de email <small>(obrigatório)</small></label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
        </div>

        <div class="form-group">
          <label for="senha">Senha <small>(obrigatório)</small></label>
          <input type="password" class="form-control" id="senha" placeholder="Senha" required>
        </div>

        <div class="form-group">
          <router-link to="/login/recuperar-senha">> esqueci minha senha</router-link>
        </div>

        <button type="submit" class="btn btn-primary pl-4 pr-4">Cadastrar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
};
</script>

<style lang="scss" scoped>

</style>
