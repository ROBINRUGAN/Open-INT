<template>
  <div ref="chartContainer" class="chart-container" style="width: 100%; height: 440px"></div>
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
          name: 'Controller',
          symbol: 'image:///images/switch.png',
          symbolSize: [60, 60],
          x: 170,
          y: 90,
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
          x: 170,
          y: 190,
          draggable: true
        },
        {
          name: 'Switch 3',
          symbol: 'image:///images/switch.png',
          symbolSize: [60, 60],
          x: 250,
          y: 250,
          draggable: true
        },
        {
          name: 'Sender',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 0,
          y: 270,
          draggable: true
        },
        {
          name: 'Receiver',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 340,
          y: 270,
          draggable: true
        }
      ],
      links: [
        { source: 'Controller', target: 'Switch 1' },
        { source: 'Controller', target: 'Switch 2' },
        { source: 'Controller', target: 'Switch 3' },
        { source: 'Switch 1', target: 'Switch 2' },
        { source: 'Switch 2', target: 'Switch 3' },
        { source: 'Switch 3', target: 'Switch 1' },
        { source: 'Switch 1', target: 'Sender' },
        { source: 'Switch 3', target: 'Receiver' }
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
.chart-container {
  margin-left: -50px; /* 调整这个值来实现你想要的偏移量 */
}
</style>
