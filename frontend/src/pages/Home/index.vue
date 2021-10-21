<template>
  <div class="box3">
    <div v-if="getError">
      <img
        src="https://realitsm.ru/wp-content/uploads/2013/12/error.png"
        alt=""
      />
    </div>
    <div v-if="getLoading">
      <img
        src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"
        alt="loader"
      />
    </div>
    
      <div class="box2" v-for="item in getBanksList" :key="item._id">
        <div v-if="!getLoading && !getError">
          <card class="box" :item="item" />
        </div>
      </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Card from "../../components/Card.vue";
export default {
  name: "home",
  components: {
    Card,
  },
  computed: {
    ...mapGetters("banks", ["getBanksList", "getError", "getLoading"]),
  },
  methods: {
    ...mapActions("banks", ["getBankList"]),
  },
  mounted() {
    this.getBankList();
  },
};
</script>

<style>
.box2 {
  margin: 10px;
  border: 1px solid #000;
  border-radius: 5px;
}
.box3 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
