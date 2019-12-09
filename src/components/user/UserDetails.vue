<template>
  <div id="user-details" class="container internal-page">
    <div class="row d-flex justify-content-center">
      <form class="col-md-6" @submit.prevent="updateUserSubscription">
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
          </div>
        </fieldset>

        <div class="row">
          <div class="col-6">
            <button type="submit" class="btn btn-primary pl-4 pr-4">Atualizar</button>
          </div>
          <div class="col-6 d-flex justify-content-end" v-if="updated">
            <p class="text-success m-0">Dados atualizados com sucesso.</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'user-details',
  data() {
    return {
      formData: {
        id: '',
        email: '',
        nome: '',
        sobrenome: '',
        cpf: '',
        rg: '',
        nascimento: '',
      },
      updated: false,
    };
  },
  methods: {
    updateUserSubscription() {
      Axios.put(`/clientes/${this.formData.id}`, this.formData).then((response) => {
        if (response.status === 200) {
          this.updated = true;

          const obj = {};
          const { nome, sobrenome, email } = response.data;

          obj.nome = nome;
          obj.sobrenome = sobrenome;
          obj.email = email;

          this.updateUserData(obj);
        }
      }).catch((error) => {
        if (error.response.status === 401) {
          localStorage.removeItem('api_user_data');

          this.$store.commit('setApiToken', null);
          this.$store.commit('setUserName', null);
          this.$store.commit('setUserLastName', null);
          this.$store.commit('setUserEmail', null);
          this.$store.commit('setUserId', null);
          this.$store.commit('setIsLogged', false);
          this.$router.push('/login');
        }
      });
    },
    getUserById() {
      Axios.get(`/clientes/${this.formData.id}`).then((response) => {
        this.formData = response.data;
      });
    },
    ...mapActions(['updateUserData']),
  },
  computed: {
    ...mapGetters(['getUserName', 'getUserLastName', 'getUserEmail', 'getUserId']),
  },
  created() {
    this.formData.nome = this.getUserName;
    this.formData.sobrenome = this.getUserLastName;
    this.formData.email = this.getUserEmail;
    this.formData.id = this.getUserId;

    this.getUserById(this.getUserId);
  },
};
</script>

<style lang="scss" scoped>

</style>
