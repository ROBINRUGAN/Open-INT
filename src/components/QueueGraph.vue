<template>
  <div
    ref="chartContainer"
    style="width: 100%; height: 247px; margin-left: 5%; padding-left: 5px"
  ></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import { useChartStore } from '@/stores/charts'
const chartStore = useChartStore()
const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
let data = {
  categories: [] as string[],
  values: [] as string[]
}

function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

function initData() {
  const now = new Date()
  for (let i = 0; i < 15; i++) {
    now.setSeconds(now.getSeconds() - 1)
    const time = formatTime(now)
    data.categories.unshift(time)
    data.values.unshift((98 + Math.random() * 2).toFixed(2)) // Simulate random queue occupancy around 98%
  }
}

function addData(shift = true) {
  const now = new Date()
  const time = formatTime(now)
  data.categories.push(time)
  data.values.push((98 + Math.random() * 2).toFixed(2)) // Simulate random queue occupancy around 98%

  if (shift) {
    data.categories.shift()
    data.values.shift()
  }

  myChart!.setOption({
    xAxis: {
      data: data.categories
    },
    series: [
      {
        data: data.values
      }
    ]
  })
}

function initChart() {
  myChart = echarts.init(chartContainer.value)
  const option = {
    grid: {
      left: 50
    },
    title: {
      text: `${chartStore.currentSwitch} 的网络队列占用情况`,
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['队列占用百分比'],
      top: 'bottom'
    },
    xAxis: {
      type: 'category',
      data: data.categories,
      boundaryGap: false,
      axisLabel: {
        showMaxLabel: true
      },
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      min: 98,
      max: 100,
      type: 'value',
      axisLabel: {
        formatter: '{value} %'
      }
    },
    series: [
      {
        name: '队列占用百分比',
        type: 'line',
        data: data.values,
        smooth: true,
        lineStyle: {
          color: '#FFD700' // Use a yellow color for clarity
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 215, 0, 0.5)' // Light yellow gradient start
            },
            {
              offset: 1,
              color: 'rgba(255, 215, 0, 0.2)' // Light yellow gradient end
            }
          ])
        }
      }
    ]
  }

  myChart.setOption(option)
}
function refreshCharts() {
  if (myChart) {
    myChart.dispose()
    data = {
      categories: [],
      values: []
    }
    initData()
    initChart()
  }
}
onMounted(() => {
  initData()
  initChart()
  setInterval(() => {
    addData()
  }, 1000) // Update data every second
  chartStore.registerRefreshFunction('queue', refreshCharts)
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
  window.removeEventListener('resize', () => {
    myChart?.resize()
  })
})
</script>

<style scoped>
/* Ensure the container has enough space and no overflow */
</style>
