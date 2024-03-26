<template>
    <Bar v-if="loaded"
      id="my-chart-id"
      :data="chartData"
      :options="chartOptions"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import { useDocumentStore } from '~/stores/DocumentStore'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },

    data: () => ({
      loaded: false,
      chartData: {
        labels: ['Документы'],
        datasets: [
            {
                backgroundColor: ['#41B883'],
                data: []
            },
            {
                backgroundColor: ['#E46651'],
                data: []
            },
            {
                backgroundColor: ['#FFA500'],
                data: []
            }
        ]
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
            
        // this.chartData.labels = allStatus
        
        // this.chartData.datasets[0].data = this.chartData.labels.map((status) => documentStore.getDocumentsByStatus(status).length)

        const dataList = allStatus.map(status => documentStore.getDocumentsByStatus(status).length)

        this.chartData.datasets.map((item, index) => {
            item.label = allStatus[index]
            item.data.push(dataList[index])
        })

      this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
  }
  </script>