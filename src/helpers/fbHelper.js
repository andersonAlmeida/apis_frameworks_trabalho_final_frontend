import Axios from 'axios';
import { mapActions } from 'vuex';
import router from '@/router';
import store from '@/store';

const fbFunctions = {
  getFbUserData(fbid) {
    window.FB.api(`/${fbid}/?fields=first_name,last_name,birthday,email`, (userData) => {
      store.dispatch('setFbUserData', userData);
      return true;
    });
  },
  fbLogin(fbResponse) {
    if (fbResponse.authResponse) {
      const fbid = window.FB.getUserID();

      fbFunctions.getUserByFbId(fbid);

      return fbFunctions.getFbUserData();
    }
    console.log('User cancelled login or did not fully authorize.');
    return false;
  },
  fbLogout(response) {
    console.log(response);

    window.FB.logout();

    localStorage.removeItem('api_user_data');

    mapActions('setApiToken', null);
    mapActions('setUserName', null);
    mapActions('setUserLastName', null);
    mapActions('setUserEmail', null);
    mapActions('setUserId', null);
    mapActions('setIsLogged', true);
  },
  fbConnected() {
    if (window.FB.getAccessToken()) {
      const fbid = window.FB.getUserID();

      fbFunctions.getUserByFbId(fbid);

      return fbFunctions.getFbUserData(fbid);
    }

    return false;
  },
  fbInit(sdkObj) {
    if (sdkObj.FB.getAccessToken()) {
      return {
        userFbLogged: true,
      };
    }

    return {
      userFbLogged: false,
    };
  },
  getUserByFbId(fbId) {
    Axios.get(`/clientes/fblogin/${fbId}`).then((response) => {
      if (response.data) {
        const {
          nome,
          sobrenome,
          email,
          id,
          token,
        } = response.data;

        localStorage.setItem('api_user_data', JSON.stringify(response.data));

        mapActions('setApiToken', token);
        mapActions('setUserName', nome);
        mapActions('setUserLastName', sobrenome);
        mapActions('setUserEmail', email);
        mapActions('setUserId', id);
        mapActions('setIsLogged', true);

        // redireciona para a home já logado
        router.push('/');
      } else {
        // redireciona para a página de cadastro
        router.push('/cadastro');
      }
    }).catch();
  },
};

const {
  fbInit,
  fbLogin,
  fbLogout,
  fbConnected,
} = fbFunctions;

export {
  fbInit,
  fbLogin,
  fbLogout,
  fbConnected,
};
