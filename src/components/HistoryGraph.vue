<template>
  <div ref="chartContainer" style="width: 100%; height: 320px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watchEffect, reactive, watch } from 'vue'
import * as echarts from 'echarts'
import { useHistoryStore } from '@/stores/history'
const chartContainer = ref<HTMLElement | null>(null)
let myChart: echarts.ECharts | null = null
const historyStore = useHistoryStore()

const initChart = () => {
  if (chartContainer.value && !myChart) {
    myChart = echarts.init(chartContainer.value)

    const option = reactive({
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
        data: historyStore.taskIds,
        axisLabel: {
          color: '#333',
          showMaxLabel: true
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
          data: historyStore.completionTimes,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.3, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      ]
    })

    myChart.setOption(option)
  }
}

watch(
  () => [historyStore.taskIds, historyStore.completionTimes],
  () => {
    if (myChart) {
      myChart.setOption({
        series: [
          {
            data: historyStore.completionTimes
          }
        ],
        xAxis: {
          data: historyStore.taskIds
        }
      })
    }
  },
  { deep: true }
)

watchEffect(() => {
  window.addEventListener('resize', () => {
    myChart?.resize()
  })
})

onMounted(() => {
  initChart()
})

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
