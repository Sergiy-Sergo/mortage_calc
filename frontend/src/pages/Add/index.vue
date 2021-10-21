<template>
  <div class="top">
    <div v-if="getLoading">Loading...</div>
    
    <!--  -->

    <section>
      <div class="titl">{{ title }}</div>
      <b-field label="Bank name" label-position="on-border">
        <b-input  v-model="bankName"></b-input>
      </b-field>

      <b-field label="Interest rate" label-position="on-border">
        <b-input type="number" v-model.number="interestRate"></b-input>
      </b-field>

      <b-field label="Maximum loan" label-position="on-border">
        <b-input type="number" v-model.number="maximumLoan"></b-input>
      </b-field>

      <b-field label="Minimum down payment" label-position="on-border">
        <b-input type="number" v-model.number="minimumDownPayment"></b-input>
      </b-field>

      <b-field label="Loan term" label-position="on-border">
        <b-input type="number" v-model.number="loanTerm"></b-input>
      </b-field>
    </section>
    <div>
      <button :disabled="isDisabled" class="btn" @click="addNew">{{ addEditBtn }}</button>
   </div>
    <div v-if="error">{{ error }}</div>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Add",
  data() {
    return {
      bankName: null,
      interestRate: null,
      maximumLoan: null,
      minimumDownPayment: null,
      loanTerm: null,
      error: null,
    };
  },
  computed: {
    ...mapGetters("banks",["getLoading"]),
    editBank() {
      return this.$route.params.id;
    },
    addEditBtn() {
      return this.editBank ? "Save" : "Add";
    },
    title() {
      return this.editBank ? "Edit" : "Add new";
    },

    isDisabled() {
      return !this.bankName || !this.interestRate || !this.maximumLoan || !this.minimumDownPayment || !this.loanTerm;
    },
  },
  methods: {
    ...mapActions("banks",["addNewBank", "findBankById", "updateBank"]),
    async addNew() {
      try {
        if (this.editBank) {
          await this.updateBank({
            id: this.editBank,
            bankName: this.bankName,
            interestRate: this.interestRate,
            maximumLoan: this.maximumLoan,
            minimumDownPayment: this.minimumDownPayment,
            loanTerm: this.loanTerm,
          });
        } else {
          await this.addNewBank({
            bankName: this.bankName,
            interestRate: this.interestRate,
            maximumLoan: this.maximumLoan,
            minimumDownPayment: this.minimumDownPayment,
            loanTerm: this.loanTerm,
          });
        }
        this.$router.push({ name: "home" });
      } catch {
        this.error = "Write correct values please";
      }
    },
  },
  async mounted() {
    if (this.editBank) {
      const resData = await this.findBankById(this.editBank);
      this.bankName = resData.bankName;
      this.interestRate = resData.interestRate;
      this.maximumLoan = resData.maximumLoan;
      this.minimumDownPayment = resData.minimumDownPayment;
      this.loanTerm = resData.loanTerm;
    }
  },
};
</script>

<style lang="css">
.top {
  margin-top: 20px;
  width: 330px;
}
.flex {
  display: flex;
}
.titl{
  font-size: 18px;
  margin: -10px 0 15px 12px;
}

.btn{
  margin: 10px 0 0 12px ;
}
</style>
