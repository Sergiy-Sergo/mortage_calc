import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import axios from "axios";

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.config.productionTip = false
axios.interceptors.request.use(function(config) {
  const isAuthenticated = store.getters["auth/isAuthenticated"]();
  if (isAuthenticated) {
    config.headers["Authorization"] =
      "Bearer " + store.getters["auth/getAccessToken"]();
  } else {
    config.headers["Authorization"] = null;
  }
  return config;
});

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      router.push({ path: "/login" });
    }
    return Promise.reject(error);
  }
);

router.beforeEach((to, from, next) => {
  let check =
    !store.getters["auth/isAuthenticated"]() &&
    !["/login", "/signup"].includes(to.path);

  if (check) {
    next({ path: "/login" });
    return;
  } else {
    next();
  }
});
new Vue({

  router,
  store,
  render: h => h(App),
}).$mount('#app')
