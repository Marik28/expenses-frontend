<template>
  <div>
    <form
      class="row row-cols-lg-auto my-2 align-items-center justify-content-center"
    >
      <div class="col">
        <input
          v-model="searchParams.dateFrom"
          class="form-control"
          type="date"
        />
      </div>
      <div class="col">
        <input v-model="searchParams.dateTo" class="form-control" type="date" />
      </div>
      <div class="col">
        <button class="btn btn-primary" type="submit" @click.prevent="getData">
          Show
        </button>
      </div>
    </form>
    <div class="row text-center">
      <h1>Сумма трат: {{ sum }}</h1>
    </div>
    <div class="row">
      <div class="col">
        <stacked-bar-chart
          ref="stackedBarChart"
          :title="'Траты по дням'"
          @click="showDateExpenses"
        >
        </stacked-bar-chart>
      </div>
      <div class="col">
        <pie-chart
          ref="pieChart"
          :title="'Траты по категориям'"
          @click="showCategoryExpenses"
        ></pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import APIClient from "@/helpers/client";
import { userDataStore } from "@/helpers/store";

import PieChart from "@/components/PieChart.vue";
import StackedBarChart from "@/components/StackedBarChart.vue";
import isEmpty from "lodash/isEmpty";
export default {
  name: "StatsDashboard",
  components: { StackedBarChart, PieChart },
  data() {
    return {
      userDataStore,
      searchParams: {
        dateFrom: null,
        dateTo: null,
      },
      expenses: null,
    };
  },
  computed: {
    sum() {
      if (this.expenses === null) return null;
      return this.expenses.amount.reduce((prev, cur) => prev + cur);
    },
  },
  watch: {
    searchParams: {
      handler(newVal) {
        this.$router.replace({ query: newVal });
      },
      deep: true,
    },
    "searchParams.dateTo": {
      handler(newVal) {
        console.log(newVal);
      },
    },
  },
  created() {
    // TODO: вынести переиспользовать
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

    this.getData();
  },
  methods: {
    getData() {
      const client = new APIClient(this.userDataStore.userId);

      client
        .getStatistics(
          "category",
          "sum",
          this.searchParams.dateFrom,
          this.searchParams.dateTo
        )
        .then((response) => {
          this.$refs.pieChart.update(response.data);
          this.expenses = response.data;
        })
        .catch((error) => console.error(error));

      client
        .getStatistics(
          "date,category",
          "sum",
          this.searchParams.dateFrom,
          this.searchParams.dateTo
        )
        .then((response) => {
          this.$refs.stackedBarChart.update(response.data);
        })
        // TODO: handle errors
        .catch((error) => console.error(error));
    },
    showCategoryExpenses(category) {
      const query = {
        dateFrom: this.searchParams.dateFrom,
        dateTo: this.searchParams.dateTo,
        category: category,
      };

      this.$router.push({ name: "expenses", query });
    },

    showDateExpenses(date) {
      const query = {
        dateFrom: date,
        dateTo: date,
      };

      this.$router.push({ name: "expenses", query });
    },
  },
};
</script>
