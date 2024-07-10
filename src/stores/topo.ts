import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTopoStore = defineStore(
  'topo',
  () => {
    const threeData = ref([
      {
        name: 'Controller',
        symbol: 'image:///images/host.png',
        symbolSize: [60, 60],
        x: 170,
        y: 90,
        draggable: true
      },
      {
        name: 'Switch 1',
        symbol: 'image:///images/switch.png',
        symbolSize: [60, 60],
        x: 100,
        y: 250,
        draggable: true
      },
      {
        name: 'Switch 2',
        symbol: 'image:///images/switch.png',
        symbolSize: [60, 60],
        x: 170,
        y: 190,
        draggable: true
      },
      {
        name: 'Switch 3',
        symbol: 'image:///images/switch.png',
        symbolSize: [60, 60],
        x: 250,
        y: 250,
        draggable: true
      },
      {
        name: 'Sender 1',
        symbol: 'image:///images/host.png',
        symbolSize: [60, 60],
        x: 0,
        y: 270,
        draggable: true
      },
      {
        name: 'Receiver',
        symbol: 'image:///images/host.png',
        symbolSize: [60, 60],
        x: 340,
        y: 270,
        draggable: true
      }
    ])

    const threeLink = ref([
      { source: 'Controller', target: 'Switch 1' },
      { source: 'Controller', target: 'Switch 2' },
      { source: 'Controller', target: 'Switch 3' },
      { source: 'Switch 1', target: 'Switch 2' },
      { source: 'Switch 2', target: 'Switch 3' },
      { source: 'Switch 3', target: 'Switch 1' },
      { source: 'Switch 1', target: 'Sender 1' },
      { source: 'Switch 3', target: 'Receiver' },
      { source: 'Switch 4', target: 'Sender 2' },
      { source: 'Switch 1', target: 'Switch 4' }
    ])

    const addNode = () => {
      threeData.value.push(
        {
          name: 'Sender 2',
          symbol: 'image:///images/host.png',
          symbolSize: [60, 60],
          x: 100,
          y: 350,
          draggable: true
        },
        {
          name: 'Switch 4',
          symbol: 'image:///images/switch.png',
          symbolSize: [60, 60],
          x: 250,
          y: 350,
          draggable: true
        }
      )
      threeLink.value.push(
        { source: 'Switch 4', target: 'Sender 2' },
        { source: 'Switch 1', target: 'Switch 4' }
      )
    }

    const removeNode = () => {
      threeData.value = threeData.value.filter(
        (node) => node.name !== 'Sender 2' && node.name !== 'Switch 4'
      )
      threeLink.value = threeLink.value.filter(
        (link) =>
          !(
            (link.source === 'Switch 4' && link.target === 'Sender 2') ||
            (link.source === 'Switch 1' && link.target === 'Switch 4')
          )
      )
    }

    return {
      threeData,
      threeLink,
      addNode,
      removeNode
    }
  },
  {
    persist: true
  }
)
