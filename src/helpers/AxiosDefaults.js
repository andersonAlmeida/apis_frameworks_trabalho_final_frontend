import Axios from 'axios';
import Vuex from '@/store/index';

function Init() {
  const storageData = JSON.parse(localStorage.getItem('api_user_data'));

  if (storageData) {
    Vuex.commit('setApiToken', storageData.token);
    Vuex.commit('setUserName', storageData.nome);
    Vuex.commit('setUserLastName', storageData.sobrenome);
    Vuex.commit('setUserEmail', storageData.email);
    Vuex.commit('setUserId', storageData.codigo);
    Vuex.commit('setIsLogged', true);
  }

  if (Vuex.getters.getApiToken) {
    Axios.defaults.headers.common.Authorization = Vuex.getters.getApiToken;
  }

  // Axios Base URL
  Axios.defaults.baseURL = process.env.VUE_APP_REST_API;

  return true;
}

export default Init;
