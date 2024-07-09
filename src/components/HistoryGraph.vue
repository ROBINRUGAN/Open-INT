<template>
  <div ref="chartContainer" style="width: 100%; height: 320px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import * as echarts from 'echarts'

const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null

const initChart = () => {
  if (chartContainer.value && !myChart) {
    myChart = echarts.init(chartContainer.value)
    // 生成 25 个任务的编号
    const taskIds = Array.from({ length: 25 }, (_, i) => `任务${i + 1}`)
    // 生成随机任务完成时间
    const completionTimes = Array.from({ length: 25 }, () => Math.floor(Math.random() * 30 + 30))

    const option = {
      grid: {
        left: 58
      },
      title: {
        text: '任务完成时间统计',
        left: 'center',
        top: 20
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: taskIds,
        axisLabel: {
          color: '#333'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} s',
          color: '#333'
        }
      },
      series: [
        {
          name: '完成时间',
          type: 'bar',
          data: completionTimes,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.3, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
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
