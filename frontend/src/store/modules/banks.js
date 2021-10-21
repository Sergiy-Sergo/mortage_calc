import axios from "axios"
import apiEndpoints from "../../constants/apiEndpoints";
export default {
  namespaced: true,
  state: {
      banks: [],
      loading: null,
      error: null,
    },
    getters: {
      getBanksList: (state) => state.banks,
      getError: (state) => state.error,
      getLoading: (state) => state.loading,
    },
    mutations: {
      updateBankList(state, data) {
        state.banks = state.banks.filter((item) => item._id !== data._id);
      },
      setBankList(state, data) {
        state.banks = data;
      },
      setLoading(state, loading) {
        state.loading = loading;
      },
      hasError(state, error) {
        state.error = error;
      },
    },
    
    actions: {
      getBankList({ commit }) {
        commit("setLoading", true);
        commit("hasError", null);
       
        axios
          .get(apiEndpoints.bank.get)
          .then((res) => res.data)
          .then((resData) => {
            if (resData.success) commit("setBankList", resData.data);
          })
          .catch((err) => {
            commit("hasError", err);
          })
          .finally(() => commit("setLoading", false));
      },
    
      addNewBank({ commit }, data) {
        commit("setLoading", true);
        commit("hasError", null);
        return new Promise((resolve, reject) => {
          axios
            .post(apiEndpoints.bank.add, data)
            .then((res) => res.data)
            .then((resData) => {
              if (resData.success) resolve(true)
              else throw resData.err
            })
            .catch((err) => {
              commit("hasError", err);
              reject(err);
            })
            .finally(() => commit("setLoading", false));
        });
      },
      deleteBank({ commit }, id) {
        commit("setLoading", true);
        commit("hasError", null);
        return new Promise((resolve, reject) => {
          axios
            .delete(apiEndpoints.bank.delete(id))
            .then((res) => res.data)
            .then((resData) => {
              if (resData.success) commit("updateBankList", resData.data);
              resolve(true);
            })
            .catch((err) => {
              commit("hasError", err);
              reject(err);
            })
            .finally(() => commit("setLoading", false));
        });
      },
      findBankById({ commit }, id) {
        commit("setLoading", true);
        commit("hasError", null);
        return new Promise((resolve, reject) => {
          axios
            .get(apiEndpoints.bank.find(id))
            .then((res) => res.data)
            .then((resData) => {
              if (resData.success)
              resolve(resData.data);
            })
            .catch((err) => {
              commit("hasError", err);
              reject(err);
            })
            .finally(() => commit("setLoading", false));
        });
      },
      updateBank({ commit }, data) {
        commit("setLoading", true);
        commit("hasError", null);
        return new Promise((resolve, reject) => {
          axios
            .put(apiEndpoints.bank.update, data)
            .then((res) => res.data)
            .then((resData) => {
              if (resData.success) resolve(true);
            })
            .catch((err) => {
              commit("hasError", err);
              reject(err);
            })
            .finally(() => commit("setLoading", false));
        });
      },
    },
}