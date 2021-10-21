<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <div>Please log in</div>
      <div>
        email :
        <input type="text" v-model="email" name="email" placeholder="Email" />
      </div>
      <div class="form-group">
        password :
        <input
          type="password"
          v-model="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group error" v-if="message">{{ message }}</div>
      <div class="form-group">
        <button class="btn btn-primary">Login</button>
        <router-link to="/signup" class="btn btn-link">Sign up</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    ...mapActions("auth", ["login", "logout"]),

    async submit() {
      try {
        const user = { email: this.email, password: this.password };
        await this.login(user);
        this.message = "";
        this.$buefy.toast.open({
          message: "Welcome!",
          position: "is-top-right",
          type: "is-success",
        });
        this.$router.push({ path: "/" });
      } catch (err) {
        this.message = err.response.data.error;
        this.$buefy.toast.open({
          duration: 5000,
          message: `Login error!`,
          position: "is-top-right",
          type: "is-danger",
        });
      }
    },
  },

  created() {
    this.logout();
  },
};
</script>
