<template>
  <h1 class="text-red-500 bg-sky-500 mx-4">{{ formatDate }}</h1>

  <div id="chart">
    <VueApexCharts
      type="bar"
      height="350"
      width="768"
      :options="chartOptions"
      :series="series"
    ></VueApexCharts>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import VueApexCharts from "vue3-apexcharts";
import type { ApexOptions } from "apexcharts";

const date = new Date();
const formatDate = dayjs(date).format("DD/MM/YYYY HH:MM");
console.log(formatDate);

const series = computed(() => [
  {
    name: "Inflation",
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
  },
]);

const chartOptions = ref<ApexOptions>({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: "end",
      horizontal: true,
      distributed: true,
    },
  },
  colors: [
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
  ],
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [
      "South Korea",
      "Canada",
      "United Kingdom",
      "Netherlands",
      "Italy",
      "France",
      "Japan",
      "United States",
      "China",
      "Germany",
    ],
  },
});
</script>
