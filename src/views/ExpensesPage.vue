<template>
  <div>
    <form
      class="row row-cols-lg-auto my-2 align-items-center justify-content-center"
    >
      <div class="col">
        <div class="input-group">
          <input
            v-model="searchParams.dateFrom"
            class="form-control"
            type="date"
          />
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model="searchParams.dateTo"
            class="form-control"
            type="date"
          />
        </div>
      </div>
      <div class="col">
        <div class="input-group">
          <input
            v-model="searchParams.category"
            class="form-control"
            type="text"
            placeholder="Категория"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="clearCategory"
          >
            Clear
          </button>
        </div>
      </div>
      <div class="col">
        <button
          class="btn btn-primary"
          type="submit"
          @click.prevent="getExpenses"
        >
          Show
        </button>
      </div>
    </form>
    <div class="container">
      <expenses-table v-if="hasExpenses" :expenses="expenses"></expenses-table>
    </div>
  </div>
</template>

<script>
import APIClient from "@/helpers/client";
import { userDataStore } from "@/helpers/store";
import ExpensesTable from "@/components/ExpensesTable.vue";
import isEmpty from "lodash/isEmpty";
export default {
  name: "ExpenseList",
  components: { ExpensesTable },
  data() {
    return {
      userDataStore,
      searchParams: {
        dateFrom: null,
        dateTo: null,
        category: "",
      },
      expenses: [],
    };
  },
  computed: {
    hasExpenses() {
      return this.expenses.length > 0;
    },
  },
  watch: {
    searchParams: {
      handler(newVal) {
        this.$router.replace({ query: newVal });
      },
      deep: true,
    },
  },
  created() {
    const dateTo = new Date();
    const dateFrom = new Date();
    dateFrom.setDate(dateTo.getDate() - 7);
    this.searchParams.dateTo = dateTo.toISOString().slice(0, 10);
    this.searchParams.dateFrom = dateFrom.toISOString().slice(0, 10);

    if (!isEmpty(this.$route.query)) {
      Object.entries(this.searchParams).forEach(([key, value]) => {
        this.searchParams[key] = this.$route.query[key] || value;
      });
    }

    this.getExpenses();
  },
  methods: {
    getExpenses() {
      const client = new APIClient(this.userDataStore.userId);
      client
        .getExpenses(this.searchParams)
        .then((response) => {
          this.expenses = response.data;
        })
        .catch((error) => console.error(error));
    },
    getCategories() {
      const client = new APIClient(this.userDataStore.userId);
      client
        .getCategories()
        .then((response) => (this.categories = response.data))
        .catch((error) => console.error(error));
    },
    clearCategory() {
      this.searchParams.category = "";
    },
  },
};
</script>
