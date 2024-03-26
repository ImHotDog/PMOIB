<template>
    <div class="container py-10">
        <PieChart />
    </div>
    <div class="container py-10">
        <BarChart />
    </div>

    
  </template>
  
  <script>

  import PieChart from '../../components/PieChart.vue'
  import BarChart from '../../components/BarChart.vue'

  export default {
    name: 'Panel',
    components: { PieChart, BarChart }
  }
  </script>