<template>
  <div ref="chartContainer" style="width: 100%; height: 320px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'
import dayjs from 'dayjs'

const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
let data = [] as any
let now = dayjs()

function initData() {
  now = dayjs()
  for (let i = 0; i < 15; i++) {
    data.push(randomData())
  }
}

function randomData() {
  now = now.add(1, 'second')
  return {
    name: now.format('HH:mm:ss'),
    value: [now.format('HH:mm:ss'), Math.floor(Math.random() * 20) + 10]
  }
}

const initChart = () => {
  if (chartContainer.value && !myChart) {
    myChart = echarts.init(chartContainer.value)
    const option = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: 50
      },
      title: {
        text: '网络流量监控图',
        left: 'center',
        top: 20
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(function (item: any) {
          return item.name
        }),
        axisLabel: {
          color: '#333',
          showMaxLabel: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333'
          }
        },
        axisTick: {
          show: true
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#333'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333'
          }
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          name: '网络流量值',
          type: 'line',
          data: data.map(function (item: any) {
            return item.value
          }),
          smooth: true,
          lineStyle: {
            color: '#83bff6'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(131, 191, 246, 0.5)'
              },
              {
                offset: 1,
                color: 'rgba(131, 191, 246, 0.2)'
              }
            ])
          }
        }
      ]
    }

    myChart.setOption(option)

    setInterval(() => {
      data.shift()
      data.push(randomData())
      myChart!.setOption({
        xAxis: {
          data: data.map(function (item: any) {
            return item.name
          })
        },
        series: [
          {
            data: data.map(function (item: any) {
              return item.value
            })
          }
        ]
      })
    }, 1000)
  }
}
watchEffect(() => {
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
})

onMounted(() => {
  initData()
  initChart()
})

onUnmounted(() => {
  if (myChart) {
    myChart.dispose()
  }
})
</script>

<style scoped>
/* 容器样式，根据需要调整 */
</style>
