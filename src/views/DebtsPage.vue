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
        <button class="btn btn-primary" type="submit" @click.prevent="getDebts">
          Show
        </button>
      </div>
    </form>
  </div>
  <div class="container">
    <debts-table :debts="debts"></debts-table>
  </div>
</template>

<script>
import DebtsTable from "@/components/DebtsTable.vue";
import APIClient from "@/helpers/client";
import { userDataStore } from "@/helpers/store";
import isEmpty from "lodash/isEmpty";
export default {
  components: { DebtsTable },
  data() {
    return {
      userDataStore,
      searchParams: {
        dateFrom: null,
        dateTo: null,
      },
      debts: null,
    };
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

    this.getDebts();
  },
  methods: {
    getDebts() {
      const client = new APIClient(this.userDataStore.userId);
      client
        .getDebts(this.searchParams.dateFrom, this.searchParams.dateTo)
        .then((response) => {
          this.debts = response.data;
        });
      console.log(client);
    },
  },
};
</script>
