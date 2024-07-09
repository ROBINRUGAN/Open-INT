import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const useChartStore = defineStore(
  'chart',
  () => {
    const currentSwitch = ref('Switch 1')
    const refreshFunctions = ref<{ [key: string]: () => void }>({})

    const registerRefreshFunction = (chartId: string, refreshFunction: () => void) => {
      refreshFunctions.value[chartId] = refreshFunction
    }

    const refreshAllCharts = () => {
      Object.values(refreshFunctions.value).forEach((refresh) => refresh())
    }
    return {
      currentSwitch,
      refreshFunctions,
      registerRefreshFunction,
      refreshAllCharts
    }
  },
  {
    persist: true
  }
)
