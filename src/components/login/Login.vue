<template>
  <div class="container internal-page" id="login">
    <div class="d-flex justify-content-center">
      <div class="col-md-6">
        <h2>Entrar</h2>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <form class="col-md-6" @submit.prevent="login">
        <div class="form-group">
          <label for="email">Endereço de email <small>(obrigatório)</small></label>
          <input type="email" class="form-control" id="email" v-model="formData.email" aria-describedby="emailHelp" placeholder="Seu email" required>
        </div>

        <div class="form-group">
          <label for="senha">Senha <small>(obrigatório)</small></label>
          <input type="password" class="form-control" id="senha" v-model="formData.senha" placeholder="Senha" required>
        </div>

        <div class="form-group">
          <router-link to="/login/recuperar-senha">> esqueci minha senha</router-link>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary pl-4 pr-4">Entrar</button>

          <router-link to="/cadastro" class="btn btn-link pl-4 pr-4">Não possui cadastro? Faça agora mesmo.</router-link>

          <v-facebook-login class="mt-4"
            :app-id="fbKey"
            :options="fbOptions"
            v-slot:login
            @sdk-init="fbInit"
            @login="fbLogin"
            @connect="fbConnected"
            @logout="fbLogout">
            Entrar com o Facebook
          </v-facebook-login>
        </div>

        <div class="form-group" v-if="invalidUser">
          <p class="text-danger">Usuário ou senha inválidos.</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { mapMutations } from 'vuex';
import 'regenerator-runtime';
import VFacebookLogin from 'vue-facebook-login-component';
import fbFuncs from '@/helpers/fbHelper';

export default {
  name: 'login',
  components: {
    VFacebookLogin,
  },
  data() {
    return {
      formData: {
        email: '',
        senha: '',
      },
      fbKey: process.env.VUE_APP_FB_KEY,
      invalidUser: false,
      fbOptions: {
        version: 'v5.0',
      },
    };
  },
  methods: {
    ...mapMutations([
      'setApiToken',
      'setUserName',
      'setUserLastName',
      'setUserEmail',
      'setUserId',
      'setIsLogged',
    ]),
    login() {
      Axios.post('/clientes/login', this.formData).then((response) => {
        if (response.data.resposta !== false) {
          const {
            nome,
            sobrenome,
            email,
            codigo,
            token,
          } = response.data;

          localStorage.setItem('api_user_data', JSON.stringify(response.data));

          this.setApiToken(token);
          this.setUserName(nome);
          this.setUserLastName(sobrenome);
          this.setUserEmail(email);
          this.setUserId(codigo);
          this.setIsLogged(true);

          this.invalidUser = false;

          // redireciona para a home já logado
          this.$router.push('/');
        } else if (response.data.resposta === false) {
          this.invalidUser = true;
        }
      }).catch();
    },
    ...fbFuncs,
  },
  mounted() {
    document.addEventListener('login', (response) => {
      console.log(response);
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
