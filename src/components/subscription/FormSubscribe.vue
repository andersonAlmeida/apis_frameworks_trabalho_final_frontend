<template>
  <div id="form-subscription" class="container internal-page">
    <div class="row d-flex justify-content-center">
      <h2 class="col-md-6 page-ttl">Cadastro</h2>
    </div>
    <div class="row d-flex justify-content-center">
      <form class="col-md-6" @submit.prevent="saveUserSubscription">
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div class="form-group">
            <label for="email">Endereço de email <small>(obrigatório)</small></label>
            <input type="email" class="form-control" id="email" v-model="formData.email" aria-describedby="emailHelp" placeholder="Seu email" required>
          </div>

          <div class="row">
            <!-- Nome -->
            <div class="form-group col-6">
              <label for="nome">Nome <small>(obrigatório)</small></label>
              <input type="text" class="form-control" id="nome" v-model="formData.nome" placeholder="Nome" required>
            </div>
            <!-- Sobrenome -->
            <div class="form-group col-6">
              <label for="sobrenome">Sobrenome <small>(obrigatório)</small></label>
              <input type="text" class="form-control" id="sobrenome" v-model="formData.sobrenome" placeholder="sobrenome" required>
            </div>
          </div>

          <div class="row">
            <!-- CPF -->
            <div class="form-group col-6">
              <label for="cpf">CPF <small>(obrigatório)</small></label>
              <input type="tel" class="form-control" name="cpf" id="cpf" v-model="formData.cpf" placeholder="999.999.999-99" required>
            </div>
            <!-- RG -->
            <div class="form-group col-6">
              <label for="rg">RG</label>
              <input type="tel" class="form-control" name="rg" id="rg" v-model="formData.rg" placeholder="0123456789">
            </div>
          </div>

          <div class="row">
            <!-- Nascimento -->
            <div class="form-group col-md-6">
              <label for="nascimento">Nascimento</label>
              <input type="date" name="nascimento" id="nascimento" v-model="formData.nascimento" class="form-control">
            </div>
            <!-- Senha -->
            <div class="form-group col-md-6">
              <label for="senha">Senha <small>(obrigatório)</small></label>
              <input type="password" class="form-control" id="senha" v-model="formData.senha" placeholder="Senha" required>
            </div>
          </div>
        </fieldset>

        <div class="row">
          <div class="col-6">
            <button type="submit" class="btn btn-primary pl-4 pr-4">Cadastrar</button>
          </div>
          <div class="col-6 d-flex justify-content-end" v-if="emailNotValid">
            <p class="text-danger m-0">E-mail já cadastrado!</p>
          </div>
          <div class="col-12 d-flex justify-content-end" v-if="emailNotValid">
            <router-link to="/login/recuperar-senha">> esqueci minha senha</router-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import Inputmask from 'inputmask';

export default {
  name: 'form-subscribe',
  data() {
    return {
      formData: {
        email: '',
        nome: '',
        sobrenome: '',
        cpf: '',
        rg: '',
        nascimento: '',
        senha: '',
        fbid: null,
      },
      emailNotValid: false,
    };
  },
  methods: {
    saveUserSubscription() {
      Axios.post('/clientes', this.formData).then((response) => {
        if (response.status === 201 && response.data.resposta !== false) {
          this.$router.push('login');
        } else {
          this.emailNotValid = true;
        }
      }).catch();
    },
  },
  created() {
    this.$store.watch(state => state.email,
      (newValue) => {
        this.formData.email = newValue;
      });
    this.$store.watch(state => state.nome,
      (newValue) => {
        this.formData.nome = newValue;
      });
    this.$store.watch(state => state.sobrenome,
      (newValue) => {
        this.formData.sobrenome = newValue;
      });
    this.$store.watch(state => state.fbObject,
      (newValue) => {
        this.formData.fbid = newValue.id;
      });
  },
  mounted() {
    Inputmask({ mask: '999.999.999-99' }).mask(document.querySelector('#cpf'));
    Inputmask({ mask: '9999999999' }).mask(document.querySelector('#rg'));
  },
};
</script>

<style lang="scss" scoped>
</style>
