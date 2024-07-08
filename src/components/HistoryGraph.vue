<template>
  <div ref="chartContainer" style="width: 100%; height: 400px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (chartContainer.value && !myChart) {
    myChart = echarts.init(chartContainer.value)
    const dataAxis = Array.from({ length: 25 }, (_, i) => `${i.toString().padStart(2, '0')}:00`)
    // 假设只有从00:00到18:00的数据，其余时间留空
    const data = [
      15,
      20,
      18,
      21,
      24,
      30,
      40,
      35,
      33,
      31,
      25,
      28,
      32,
      36,
      34,
      23,
      22,
      19,
      17,
      null,
      null,
      null,
      null,
      null,
      null
    ]

    const option = {
      title: {
        text: '任务完成情况',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'item' // Ensures the tooltip is triggered when hovering over an item
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          inside: false,
          color: '#000',
          interval: 5 // 每6小时显示一个刻度
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: true
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#000'
        },
        max: 50
      },
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
          },
          data: data
        }
      ]
    }

    myChart.setOption(option)
  }
}

watchEffect(() => {
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
})

onMounted(initChart)

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    myChart?.resize()
  })
  myChart?.dispose()
})
</script>

<style scoped>
/* 根据需要调整容器的样式 */
</style>
