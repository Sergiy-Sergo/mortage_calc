export default {
   bank: {
      get: `${process.env.VUE_APP_API_URL}/bank`,
      add: `${process.env.VUE_APP_API_URL}/bank/add`,
      delete: (id) => `${process.env.VUE_APP_API_URL}/bank/delete/${id}`,
      find: (id) => `${process.env.VUE_APP_API_URL}/bank/find/${id}`,
      update: `${process.env.VUE_APP_API_URL}/bank/update`,

   },
   user: {
      signup: `${process.env.VUE_APP_API_URL}/users/signup`,
      login: `${process.env.VUE_APP_API_URL}/users/login`,
    },
}