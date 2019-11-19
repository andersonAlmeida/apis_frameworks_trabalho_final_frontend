<template>
  <div class="internal-page container" id="recover-password">
    <div class="d-flex justify-content-center">
      <div class="col-md-6">
        <h2 class="page-ttl">Recuperar Senha</h2>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <form class="col-md-6">
        <div class="form-group">
          <label for="email">Endereço de email <small>(obrigatório)</small></label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
        </div>

        <button type="submit" class="btn btn-primary pl-4 pr-4">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'password-recovery',
};
</script>

<style lang="scss" scoped>

</style>
