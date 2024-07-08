<template>
  <div
    ref="chartContainer"
    style="width: 100%; height: 540px; margin-left: 5%; padding-left: 5px"
  ></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

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
    data.values.unshift((Math.random() * 35 + 60).toString())
  }
}

function addData(shift = true) {
  const now = new Date()
  const time = formatTime(now)
  data.categories.push(time)
  data.values.push((Math.random() * 35 + 60).toString())

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
      left: 58
    },
    title: {
      text: '网络吞吐量监控',
      left: 'center',
      top: 20
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['网络吞吐量'],
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
      min: 50,
      max: 100,
      type: 'value',
      axisLine: {
        show: true,
        color: '#333'
      },
      axisLabel: {
        formatter: '{value} Gbps'
      }
    },
    series: [
      {
        name: '网络吞吐量',
        type: 'line',
        data: data.values,
        smooth: true,
        lineStyle: {
          color: '#32cd32' // Vibrant green color
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(50, 205, 50, 0.5)' // Light green gradient start
            },
            {
              offset: 1,
              color: 'rgba(34, 139, 34, 0.2)' // Dark green gradient end
            }
          ])
        }
      }
    ]
  }

  myChart.setOption(option)
}

onMounted(() => {
  initData()
  initChart()
  setInterval(() => {
    addData()
  }, 1000) // 每秒更新数据和时间

  watchEffect(() => {
    window.addEventListener('resize', () => {
      myChart?.resize()
    })
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
