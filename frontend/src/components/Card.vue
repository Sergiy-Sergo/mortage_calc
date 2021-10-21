<template>
  <div class="main">
    <div v-if="!getError && !getLoading">
      <div class="wrapper">
        <div class="contant">
          <div class="bank_title ">
            <div class="bank__title">
              <div class="bank__name">
                {{ item.bankName }}
              </div>
            </div>
          </div>
          <div class="bank_body">
            <div class="bank__container">
              <div class="body__interest-rate">
                <div class="interest-rate__container">
                  <div class="interest-rate__title">Interest Rate:</div>
                  <div class="interest-rate__value">
                    {{ item.interestRate }}%
                  </div>
                </div>
              </div>
              <div class="body__maximum-loan">
                <div class="maximum-loan__container">
                  <div class="maximum-loan__title">Maximum Loan:</div>
                  <div class="maximum-loan__value">{{ item.maximumLoan }}$</div>
                </div>
              </div>
              <div class="body__minimum-down-payment">
                <div class="minimum-down-payment__container">
                  <div class="minimum-down-payment__title">
                    Minimum Down Payment:
                  </div>
                  <div class="minimum-down-payment__value">
                    {{ item.minimumDownPayment }}$
                  </div>
                </div>
              </div>
              <div class="body__loan-term">
                <div class="loan-term__container">
                  <div class="loan-term__title">Loan Term:</div>
                  <div class="loan-term__value">{{ item.loanTerm }}m</div>
                </div>
              </div>
              <div class="body__btns">
                <div class="btns__container">
                  <div class="btn__add">
                    <button @click="onEdit(item._id)">
                      <img
                        class="btn-img"
                        src="https://static.thenounproject.com/png/2473159-200.png"
                        alt=""
                      />
                    </button>
                  </div>
                  <div class="btn__del">
                    <button @click="confirm(item._id)">
                      <img
                        class="btn-img"
                        src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-1432400-1211078.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  computed: {
    ...mapGetters(["getError", "getLoading"]),
  },
  methods: {
    ...mapActions(["deleteBank"]),
    //
    confirm(id) {
      this.$buefy.dialog.confirm({
        message: "Delete this bank?",
        onConfirm: () => {
          this.onDelete(id)
          this.$buefy.toast.open("Bank deleted") 
        }
      });
    },

    onDelete(id) {
      this.deleteBank(id);
    },
    onEdit(id) {
      this.$router.push({ name: "add", params: { id } });
    },
    onCalculate(id) {
      this.$router.push({ name: "calculator", params: { id } });
    },
  },
};
</script>

<style lang="css" scoped>
.main {
  width: 250px;
  font-size: 16px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  background-color: #f5f5f5;
}
.wrapper {
}

.contant {
}
.bank_title {
  text-align: center;
  margin: -10px 0 10px 0;
}
.bank__title {
}
.bank__name {
  font-size: 24px;
  font-weight: 700;
}
.bank_body {
}
.bank__container {
}
.body__interest-rate {
  margin: 0 0 10px 0;
}
.interest-rate__container {
}
.interest-rate__title {
}
.interest-rate__value {
  text-align: right;
  color: darkgray;
  font-size: 19px;
}
.body__maximum-loan {
  margin: 0 0 10px 0;
}
.maximum-loan__container {
}
.maximum-loan__title {
}
.maximum-loan__value {
  text-align: right;
  color: darkgray;
  font-size: 19px;
}
.body__minimum-down-payment {
  margin: 0 0 10px 0;
}
.minimum-down-payment__container {
}
.minimum-down-payment__title {
}
.minimum-down-payment__value {
  text-align: right;
  color: darkgray;
  font-size: 19px;
}
.body__loan-term {
  margin: 0 0 10px 0;
}
.loan-term__container {
}
.loan-term__title {
}
.loan-term__value {
  text-align: right;
  color: darkgray;
  font-size: 19px;
}
.body__btns {
}
.btns__container {
  margin: 10px 0 0 0;
  display: flex;
  justify-content: space-around;
}
.btn__add {
}
.btn-img {
}
.btn__del {
}
img {
  width: 60px;
  height: 60px;
}
.btn-img {
  width: 30px;
  height: 30px;
}
</style>
