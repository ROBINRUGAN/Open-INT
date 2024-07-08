<template>
  <div ref="chartContainer" style="width: 100%; height: 670px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const option = {
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
      zoom: 0.9,
      type: 'graph',
      layout: 'none',
      data: [
        {
          name: 'Router',
          symbol: 'image:///images/router.png',
          symbolSize: [80, 80],
          x: 260,
          y: 250,
          draggable: true
        },
        {
          name: 'Switch 1',
          symbol: 'image:///images/switch.png',
          symbolSize: [60, 60],
          x: 100,
          y: 250,
          draggable: true
        },
        {
          name: 'Switch 2',
          symbol: 'image:///images/switch.png',
          symbolSize: [60, 60],
          x: 420,
          y: 250,
          draggable: true
        },
        {
          name: 'Server 1',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 50,
          y: 400,
          draggable: true
        },
        {
          name: 'Server 2',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 500,
          y: 400,
          draggable: true
        },
        {
          name: 'PC 1',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 50,
          y: 100,
          draggable: true
        },
        {
          name: 'PC 2',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 550,
          y: 250,
          draggable: true
        },
        {
          name: 'PC 3',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 500,
          y: 100,
          draggable: true
        }
      ],
      links: [
        { source: 'Router', target: 'Switch 1' },
        { source: 'Router', target: 'Switch 2' },
        { source: 'Switch 1', target: 'Server 1' },
        { source: 'Switch 1', target: 'PC 1' },
        { source: 'Switch 2', target: 'Server 2' },
        { source: 'Switch 2', target: 'PC 2' },
        { source: 'Switch 2', target: 'PC 3' }
      ],
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
}

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

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style scoped>
/* Ensure the container has enough space and no overflow */
</style>
