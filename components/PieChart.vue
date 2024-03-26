<template>
    <Pie v-if="loaded"
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
    />
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { useDocumentStore } from '~/stores/DocumentStore'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'PieChart',
    components: { Pie },

    data: () => ({
      loaded: false,
      chartData: {
        labels: [],
        datasets: [{
          backgroundColor: ['#41B883', '#E46651', '#FFA500'],
            data: null
          }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
  }),
  
  async mounted () {
    this.loaded = false
    try {
        const documentStore = useDocumentStore()
        const allDocuments = await documentStore.getAllDocuments()
        const allStatus = await documentStore.getDocumentModel()
            
        this.chartData.labels = allStatus
        
        this.chartData.datasets[0].data = this.chartData.labels.map((status) => documentStore.getDocumentsByStatus(status).length)

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
  }
  </script>