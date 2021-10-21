<template>
  <div>
    <div class="top">
      <section>
        <div class="titl">Calculator</div>
        <b-field label="Initial loan" label-position="on-border">
          <b-input v-model.number="initialLoan"></b-input>
        </b-field>
        <b-field label="Down payment" label-position="on-border">
          <b-input v-model.number="downPayment"></b-input>
        </b-field>
        <b-field>
          <b-select v-model="selectedBank" placeholder="Select a bank" required>
            <option
              v-for="item in getBanksList"
              :key="item.id"
              :value="item._id"
            >
              {{ item.bankName }}
            </option>
          </b-select>
        </b-field>
      </section>
      <div v-if="selectedBank">Maximum Loan: {{ maximumLoan }}$</div>
      <div v-if="selectedBank">
        Minimum Down Payment: {{ minimumDownPayment }}$
      </div>
      <b-button @click="onCalculate" type="is-light" :disabled="isDisabled"
        >Calculate</b-button
      >
      <!--  -->

      <div v-if="result">
        Monthly payment:
        {{ result }}
      </div>
      <div v-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Calculator",
  data() {
    return {
      initialLoan: null,
      downPayment: null,
      //
      selectedBank: null,
      //
      bankName: null,
      interestRate: null,
      maximumLoan: null,
      minimumDownPayment: null,
      loanTerm: null,
      result: null,
      //
      error: null,
    };
  },

  computed: {
    ...mapGetters("banks", ["getBanksList"]),
    isDisabled() {
      return !this.selectedBank || !this.initialLoan || !this.downPayment;
    },
  },
  watch: {
    async selectedBank() {
      const resData = await this.findBankById(this.selectedBank);
      this.bankName = resData.bankName;
      this.interestRate = resData.interestRate;
      this.maximumLoan = resData.maximumLoan;
      this.minimumDownPayment = resData.minimumDownPayment;
      this.loanTerm = resData.loanTerm;
    },
    initialLoan(){
      return this.error = ''
    },
    downPayment(){
      return this.error = ''
    }
  },
  methods: {
    ...mapActions("banks", ["getBankList", "findBankById"]),
    async onCalculate() {
      this.error = "";
      const resData = await this.findBankById(this.selectedBank);
      this.bankName = resData.bankName;
      this.interestRate = resData.interestRate;
      this.maximumLoan = resData.maximumLoan;
      this.minimumDownPayment = resData.minimumDownPayment;
      this.loanTerm = resData.loanTerm;
      if (
        this.initialLoan < this.maximumLoan &&
        this.downPayment > this.minimumDownPayment
      ) {
        let rate = this.interestRate / 100 / 12;
        this.result = (
          (this.initialLoan * rate * Math.pow(1 + rate, this.loanTerm)) /
          (Math.pow(1 + rate, this.loanTerm) - 1)
        ).toFixed(2);
      } else {
        this.error = "Write correct values please";
      }
    },
  },

  mounted() {
    this.getBankList();
  },
};
</script>

<style lang="scss" scoped></style>
