import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSwitchStore = defineStore(
  'switch',
  () => {
    const switchData = ref([
      {
        name: 'Switch 1',
        ip: '192.168.1.1'
      },
      {
        name: 'Switch 2',
        ip: '192.168.1.2'
      },
      {
        name: 'Switch 3',
        ip: '192.168.1.3'
      }
    ])

    const addSwitch = () => {
      switchData.value.push({
        name: 'Switch 4',
        ip: '192.168.1.4'
      })
    }

    const removeSwitch = (name: string) => {
      switchData.value = switchData.value.filter((switchItem) => switchItem.name !== name)
    }

    return {
      switchData,
      addSwitch,
      removeSwitch
    }
  },
  {
    persist: true
  }
)
