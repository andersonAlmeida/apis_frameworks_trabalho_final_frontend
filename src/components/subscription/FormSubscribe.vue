<template>
  <div id="form-subscription" class="container internal-page">
    <div class="row d-flex justify-content-center">
      <h2 class="col-md-6 page-ttl">Cadastro</h2>
    </div>
    <div class="row d-flex justify-content-center">
      <form class="col-md-6">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div class="form-group">
            <label for="email">Endereço de email <small>(obrigatório)</small></label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Seu email" required>
          </div>

          <div class="row">
            <!-- Nome -->
            <div class="form-group col-6">
              <label for="nome">Nome <small>(obrigatório)</small></label>
              <input type="text" class="form-control" id="nome" placeholder="Nome" required>
            </div>
            <!-- Sobrenome -->
            <div class="form-group col-6">
              <label for="sobrenome">Sobrenome <small>(obrigatório)</small></label>
              <input type="text" class="form-control" id="sobrenome" placeholder="sobrenome" required>
            </div>
          </div>

          <div class="row">
            <!-- CPF -->
            <div class="form-group col-6">
              <label for="cpf">CPF <small>(obrigatório)</small></label>
              <input type="tel" class="form-control" name="cpf" id="cpf" placeholder="999.999.999-99" required>
            </div>
            <!-- RG -->
            <div class="form-group col-6">
              <label for="rg">RG</label>
              <input type="tel" class="form-control" name="rg" id="rg" placeholder="0123456789">
            </div>
          </div>

          <div class="row">
            <!-- Nascimento -->
            <div class="form-group col-md-6">
              <label for="nascimento">Nascimento</label>
              <input type="date" name="nascimento" id="nascimento" class="form-control">
            </div>
            <!-- Senha -->
            <div class="form-group col-md-6">
              <label for="senha">Senha <small>(obrigatório)</small></label>
              <input type="password" class="form-control" id="senha" placeholder="Senha" required>
            </div>
          </div>
        </fieldset>

        <!-- <div class="row">
          <div class="col-12 form-group">
            <button class="btn btn-link">+ Adicionar endereço</button>
          </div>
        </div> -->

        <div class="row">
          <div class="col-12">
            <button type="submit" class="btn btn-primary pl-4 pr-4">Cadastrar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'form-subscribe',
};
</script>

<style lang="scss" scoped>
</style>
