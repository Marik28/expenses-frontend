<template>
  <bar
    ref="bar"
    :class="{ pointer: true }"
    :chart-data="chartData"
    :chart-options="chartOptions"
  ></bar>
</template>

<script>
import { Bar } from "vue-chartjs";
import zip from "lodash/zip";
import { getRandomPastelColor } from "@/helpers/chartsUtils";
import isEmpty from "lodash/isEmpty";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale
);
export default {
  components: {
    Bar,
  },
  props: {
    title: {
      type: String,
      default: "Траты",
    },
    responsive: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["click"],
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: this.responsive,
        plugins: {
          title: {
            display: true,
            text: this.title,
          },
          tooltip: {
            mode: "index",
          },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        onClick: this.onBarChartClick,
        onHover: this.onBarChartHover,
      },
    };
  },
  methods: {
    onBarChartClick(_, chartElement) {
      if (isEmpty(chartElement)) return;
      const clickedDateIndex = chartElement[0].index;
      const clickedDate = this.$refs.bar.chart.data.labels[clickedDateIndex];
      this.$emit("click", clickedDate);
    },
    onBarChartHover(event, chartElement) {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
    },
    update(data) {
      // TODO: супер неоптимизировано

      this.chartData.datasets = [];
      const dates = new Array(...new Set(data["date"]));
      this.chartData.labels = dates;

      const categories = Object.fromEntries(
        data.category.map((category) => [category, []])
      );
      const expenses = zip(data.amount, data.date, data.category);

      for (let date of dates) {
        /* eslint-disable */
        const dateExpenses = expenses.filter(
          ([amount, expDate, category]) => expDate == date
        );
        let curCategories = [];
        dateExpenses.forEach(([amount, expDate, category]) => {
          categories[category].push(amount);
          curCategories.push(category);
        });
        /* eslint-disable */

        Object.entries(categories)
          .filter(([category, expenses]) => !curCategories.includes(category))
          .forEach(([category, expenses]) => {
            expenses.push(null);
          });
      }
      Object.entries(categories).forEach(([category, expenses]) => {
        this.chartData.datasets.push({
          data: expenses,
          label: category,
          backgroundColor: getRandomPastelColor()
        });
      });
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
