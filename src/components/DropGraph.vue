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

let chartContainer = ref<HTMLElement | null>(null)
const chartStore = useChartStore()
let dropCharts: echarts.ECharts | null = null
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
    data.values.unshift(Math.floor(Math.random() * 6).toString()) // Simulate random packet loss
  }
}

function addData(shift = true) {
  const now = new Date()
  const time = formatTime(now)
  data.categories.push(time)
  data.values.push(Math.floor(Math.random() * 10).toString()) // Simulate random packet loss

  if (shift) {
    data.categories.shift()
    data.values.shift()
  }

  dropCharts!.setOption({
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
  dropCharts = echarts.init(chartContainer.value)

  const option = {
    title: {
      text: `${chartStore.currentSwitch} 的网络丢包数量监控`,
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['丢包数量'],
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
      type: 'value',
      axisLabel: {
        formatter: '{value} 个'
      }
    },
    series: [
      {
        name: '丢包数量',
        type: 'line',
        data: data.values,
        smooth: true,
        lineStyle: {
          color: '#ff6347' // Use a different color for clarity
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 99, 71, 0.5)' // Light red gradient start
            },
            {
              offset: 1,
              color: 'rgba(255, 99, 71, 0.2)' // Light red gradient end
            }
          ])
        }
      }
    ]
  }
  dropCharts.setOption(option)
}

function refreshCharts() {
  if (dropCharts) {
    dropCharts.dispose()
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
  chartStore.registerRefreshFunction('drop', refreshCharts)
})
watchEffect(() => {
  window.addEventListener('resize', () => {
    dropCharts?.resize()
  })
})

onUnmounted(() => {
  if (dropCharts) {
    dropCharts.dispose()
  }
  window.removeEventListener('resize', () => {
    dropCharts?.resize()
  })
})
</script>

<style scoped>
/* Ensure the container has enough space and no overflow */
</style>
