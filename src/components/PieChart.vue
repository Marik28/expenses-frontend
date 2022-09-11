import isEmpty from "lodash/isEmpty";
<template>
  <pie ref="pie" :chart-data="chartData" :chart-options="chartOptions"></pie>
</template>

<script>
import { Pie } from "vue-chartjs";
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

import { generatePalette } from "@/helpers/chartsUtils";

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
    Pie,
  },

  props: {
    // labels: {
    //   type: Array,
    //   required: true,
    // },
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
        },
        onClick: this.onPieChartClick,
        onHover: this.onPieChartHover,
      },
    };
  },

  methods: {
    onPieChartClick(_, clickInfo) {
      if (isEmpty(clickInfo)) return;
      const clickedLabelIndex = clickInfo[0].index;
      const clickedLabel = this.$refs.pie.chart.data.labels[clickedLabelIndex];
      this.$emit("click", clickedLabel);
    },
    onPieChartHover(event, chartElement) {
      event.native.target.style.cursor = chartElement[0]
        ? "pointer"
        : "default";
    },
    update(data) {
      this.chartData.datasets = [];
      this.chartData.labels = data["category"];
      this.chartData.datasets.push({
        data: data.amount,
        backgroundColor: generatePalette(data.amount.length),
      });
    },
  },
};
</script>
