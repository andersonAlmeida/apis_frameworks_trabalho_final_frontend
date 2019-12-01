<template>
  <div id="Address-form" class="container internal-page">
    <div class="row">
      <div class="col-12">
        <h2>Novo Endereço</h2>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form class="form" @submit.prevent="saveAddress">
          <div class="row">
            <!-- Nome -->
            <div class="col-4">
              <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" name="nome" id="nome" class="form-control" required v-model="formData.nome">
              </div>
            </div>
            <!-- CEP -->
            <div class="col-4">
              <div class="form-group">
                <label for="cep">CEP</label>
                <input type="text" name="cep" id="cep" class="form-control" required v-model="formData.cep" @blur="getAddress">
              </div>
            </div>
            <!-- logradouro -->
            <div class="col-4">
              <div class="form-group">
                <label for="logradouro">Logradouro</label>
                <input type="text" name="logradouro" id="logradouro" class="form-control" required v-model="formData.logradouro">
              </div>
            </div>
          </div>

          <div class="row">
            <!-- Numero -->
            <div class="col-2">
              <div class="form-group">
                <label for="numero">Número</label>
                <input type="text" name="numero" id="numero" class="form-control" required v-model="formData.numero">
              </div>
            </div>
            <!-- Bairro -->
            <div class="col-4">
              <div class="form-group">
                <label for="bairro">Bairro</label>
                <input type="text" name="bairro" id="bairro" class="form-control" required v-model="formData.bairro">
              </div>
            </div>
            <!-- Cidade -->
            <div class="col-4">
              <div class="form-group">
                <label for="cidade">Cidade</label>
                <input type="text" name="cidade" id="cidade" class="form-control" required v-model="formData.cidade">
              </div>
            </div>
            <!-- Estado -->
            <div class="col-2">
              <div class="form-group">
                <label for="estado">Estado</label>
                <input type="text" name="estado" id="estado" class="form-control" required v-model="formData.estado">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <button class="btn btn-primary">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Correios from 'node-correios';
import Axios from 'axios';

const correios = new Correios();

export default {
  name: 'address-form',
  data() {
    return {
      formData: {
        nome: '',
        logradouro: '',
        bairro: '',
        cidade: '',
        numero: '',
        cep: null,
        estado: '',
        tipo: 1,
        idCliente: '',
      },
    };
  },
  methods: {
    getAddress() {
      correios.consultaCEP({
        cep: this.formData.cep,
      }).then((result) => {
        if (result) {
          const {
            logradouro,
            bairro,
            localidade: cidade,
            uf: estado,
          } = result;

          this.formData.logradouro = logradouro;
          this.formData.bairro = bairro;
          this.formData.cidade = cidade;
          this.formData.estado = estado;
        }
      });
    },
    saveAddress() {
      this.formData.idCliente = this.$store.getters.getUserId;

      Axios.post('clientes/enderecos', this.formData).then((result) => {
        if (result.data) {
          this.$router.push('/area-do-cliente/enderecos');
        }
      });
    },
  },
};
</script>
