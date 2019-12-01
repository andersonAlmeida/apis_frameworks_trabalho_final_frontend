<template>
  <div id="Address-list" class="container internal-page">
    <div class="row">
      <div class="col-12">
        <h2>Endereços</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-4 mb-4">
        <router-link to="/area-do-cliente/enderecos/novo" class="btn btn-primary">Adicionar Endereço</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table class="table table-striped">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Logradouro</th>
              <th scope="col">Número</th>
              <th scope="col">Cidade</th>
              <th scope="col">Estado</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(end, i) in enderecosComp" :key="end.id">
              <th scope="row">{{ i }}</th>
              <td>{{ end.nome }}</td>
              <td>{{ end.logradouro }}</td>
              <td>{{ end.numero }}</td>
              <td>{{ end.cidade }}</td>
              <td>{{ end.estado }}</td>
              <td>
                <router-link class="btn btn-primary" :to="`/area-do-cliente/enderecos/editar/${$store.getters.getUserId}/${end.id}`">Editar</router-link>
                <button class="btn btn-danger ml-2" @click="deleteAddress(end.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  data() {
    return {
      enderecos: [],
    };
  },
  computed: {
    enderecosComp() {
      return this.enderecos;
    },
  },
  methods: {
    getAddress() {
      Axios.get(`clientes/enderecos/${this.$store.getters.getUserId}`).then((result) => {
        if (result.data) {
          this.enderecos = result.data;
        }
      });
    },
    deleteAddress(id) {
      Axios.delete(`clientes/enderecos/${id}`).then((result) => {
        if (result.status === 200) {
          const idx = this.enderecos.findIndex(e => e.id === id);

          if (idx > -1) {
            this.enderecos.splice(idx, 1);
          }
        }
      });
    },
  },
  created() {
    this.getAddress();
  },
};
</script>
