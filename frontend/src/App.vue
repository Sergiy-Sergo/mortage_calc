<template>
  <div>
    <b-navbar class="bottom" centered fixed-top shadow>
      <template slot="brand">
        <b-navbar-item tag="div" >
          Hello
        </b-navbar-item>
      </template>
      //
      <template #start>
        <b-navbar-item v-if="isAuthenticated()" tag="router-link" :to="{ name: 'home' }">
          Home
        </b-navbar-item>
        <b-navbar-item v-if="isAuthenticated()" tag="router-link" :to="{ name: 'add' }">
          Add
        </b-navbar-item>
        <b-navbar-item v-if="isAuthenticated()" tag="router-link" :to="{ name: 'calculator' }">
          Calculator
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-navbar-item v-if="!isAuthenticated()" tag="router-link" :to="{ name: 'signup' }" >
              <strong>Sign up</strong>
            </b-navbar-item>
            <b-navbar-item v-if="!isAuthenticated()" tag="router-link" :to="{ name: 'login' }" >
              <strong>Log in</strong>
            </b-navbar-item>
            <button v-if="isAuthenticated()" @click="onLogout">Log out</button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="box1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
<style scoped>
.box1 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1300px;
  margin: 0 auto;
}
</style>
