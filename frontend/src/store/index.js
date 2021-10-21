import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import banks from "./modules/banks";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    banks
  }
});

export default store;
