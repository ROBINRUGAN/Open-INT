// stores/chartStore.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useHistoryStore = defineStore(
  'history',
  () => {
    const taskIds = ref(Array.from({ length: 20 }, (_, i) => `任务${i + 1}`))
    const completionTimes = ref(
      Array.from({ length: 20 }, () => Math.floor(Math.random() * 30 + 30))
    )

    const addTask = (taskId: string, completionTime: number) => {
      taskIds.value.push(taskId)
      completionTimes.value.push(completionTime)
    }

    return {
      taskIds,
      completionTimes,
      addTask
    }
  },
  {
    persist: true
  }
)
