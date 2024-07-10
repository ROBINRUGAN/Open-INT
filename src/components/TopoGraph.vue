<template>
  <div ref="chartContainer" class="chart-container" style="width: 100%; height: 440px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect, reactive, watch } from 'vue'
import * as echarts from 'echarts'
import { useTopoStore } from '@/stores/topo'

const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
const topoStore = useTopoStore()

const option = reactive({
  title: {
    text: '网络拓扑图',
    left: 'center',
    top: 20
  },

  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      zoom: 0.8,
      type: 'graph',
      layout: 'none',
      data: topoStore.threeData,
      links: topoStore.threeLink,

      roam: true,
      label: {
        show: true,
        position: 'right',
        formatter: '{b}'
      },
      lineStyle: {
        width: 2,
        color: 'source',
        curveness: 0.1
      }
    }
  ]
})

onMounted(() => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(option)
  }
})

watchEffect(() => {
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
})

watch(
  () => [topoStore.threeData, topoStore.threeLink],
  () => {
    if (myChart) {
      myChart.setOption({
        series: [
          {
            data: topoStore.threeData,
            links: topoStore.threeLink
          }
        ]
      })
    }
  },
  { deep: true }
)

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style scoped>
.chart-container {
  margin-left: -50px; /* 调整这个值来实现你想要的偏移量 */
}
</style>
