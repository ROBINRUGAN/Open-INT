<script setup lang="ts">
import { Network } from 'vis-network'
import { nextTick, onMounted, ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import switchImageUrl from '../assets/mew.jpg'
import clientImageUrl from '../assets/mew.jpg'
import switchImageUrl2 from '../assets/mew.jpg'
import { BorderBox7 } from '@kjgl77/datav-vue3'
import { useElementSize } from '@vueuse/core'
// import { useGlobalState } from '@/store'
import { NUpload, NSwitch, NButton } from 'naive-ui'
import { before } from 'lodash-es'
const board = ref()
const { width } = useElementSize(board)
const panel = ref()
// const { isEase } = useGlobalState()
const isServer = ref(false)
const isWorker = ref(false)
const isLearning = ref(true)
const options = {
  nodes: {
    font: {
      color: '#fff'
    },
    color: '#fff'
  },
  edges: {
    color: 'rgba(255,255,255,0.2)'
  },
  layout: {
    hierarchical: {
      direction: 'LR'
    }
  }
}
const nodes = [
  {
    id: 1,
    label: 'pc1',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 2,
    label: 'pc2',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 3,
    label: 'pc3',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 4,
    label: 'pc4',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 5,
    label: 'pc5',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 6,
    label: 'pc6',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 7,
    label: 'pc7',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 8,
    label: 'pc8',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 9,
    label: 'pc9',
    level: 1,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 10,
    label: 'S1',
    level: 5,
    image: switchImageUrl,
    shape: 'image'
  },
  {
    id: 11,
    label: 'S2',
    level: 5,
    image: switchImageUrl,
    shape: 'image'
  },
  {
    id: 12,
    label: 'S3',
    level: 3,
    image: switchImageUrl,
    shape: 'image'
  },
  {
    id: 13,
    label: 'S4',
    level: 6,
    image: switchImageUrl,
    shape: 'image'
  },
  {
    id: 14,
    label: 'S5',
    level: 4,
    image: clientImageUrl,
    shape: 'image'
  },
  {
    id: 15,
    label: 'S6',
    level: 4,
    image: clientImageUrl,
    shape: 'image'
  }
]
function createDot(hexColor: any) {
  return {
    enabled: true,
    type: 'image',
    imageWidth: 12,
    imageHeight: 12,
    src: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='width:24px;height:24px' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23${hexColor.slice(
      1
    )}' /%3E%3C/svg%3E`
  }
}
const redDot = createDot('#ff0000')
const greenDot = createDot('#00ff00')
const yellowDot = createDot('#EAB308')
const edges = [
  {
    from: 1,
    to: 10
    // arrows: {
    //   to: greenDot,
    //   from: greenDot,
    // },
  },
  {
    from: 2,
    to: 10
    // arrows: {
    //   to: isEase.value ? yellowDot : redDot,
    //   from: isEase.value ? yellowDot : redDot,
    // },
  },
  {
    from: 3,
    to: 10
    // arrows: {
    //   to: greenDot,
    //   from: greenDot,
    // },
  },
  {
    from: 4,
    to: 10
    // arrows: {
    //   to: isEase.value ? yellowDot : redDot,
    //   from: isEase.value ? yellowDot : redDot,
    // },
  },
  {
    from: 4,
    to: 11
    // arrows: {
    //   to: isEase.value ? yellowDot : redDot,
    //   from: isEase.value ? yellowDot : redDot,
    // },
  },
  {
    from: 5,
    to: 12
    // arrows: {
    //   to: isEase.value ? greenDot : redDot,
    //   from: isEase.value ? greenDot : redDot,
    // },
  },
  {
    from: 6,
    to: 12
    // arrows: {
    //   to: isEase.value ? greenDot : redDot,
    //   from: isEase.value ? greenDot : redDot,
    // },
  },
  {
    from: 7,
    to: 14
    // arrows: {
    //   to: greenDot,
    //   from: greenDot,
    // },
  },
  {
    from: 8,
    to: 14
  },
  {
    from: 9,
    to: 15
  },
  {
    from: 11,
    to: 12
  },
  {
    from: 11,
    to: 13
  },
  {
    from: 11,
    to: 14
  },
  {
    from: 13,
    to: 15
  },
  {
    from: 14,
    to: 15
  }
]
const router = useRouter()
function renderNets() {
  // console.log(isServer.value);
  if (isServer.value) {
    nodes[9] = {
      id: 10,
      label: 'S1',
      level: 5,
      image: switchImageUrl2,
      shape: 'image'
    }
  } else {
    nodes[9] = {
      id: 10,
      label: 'S1',
      level: 5,
      image: switchImageUrl,
      shape: 'image'
    }
  }
  console.log(nodes[9])
  // new Network(panel.value, { nodes, edges }, options).on('doubleClick', function (params) {
  //   // const label = nodes.find((v) => v.id === params.nodes[0]).label
  //   if (label.startsWith('S')) router.push(`/flow?label=${label}`)
  //   // alert(JSON.stringify(params, null, 4))
  // })
}
const networkData = reactive({
  train_loss: '',
  train_acc: '',
  val_loss: '',
  val_acc: ''
})
onMounted(() => {
  renderNets()
})

watch(width, () => {
  nextTick(() => renderNets())
})

// watch(isEase, () => {
//   if (isEase.value) {
//     nextTick(() => {
//       setTimeout(() => {
//         changeShow2()
//         isLearning.value = false
//       }, 5000)
//     })
//   } else {
//     isLearning.value = true
//     networkData.train_loss = ''
//     networkData.train_acc = ''
//     networkData.val_loss = ''
//     networkData.val_acc = ''
//   }
// })
watch(isLearning, () => {
  if (!isLearning.value) {
    nextTick(() => {
      if (isShow.value) {
        changeShow2()
      } else {
        changeShow1()
      }
    })
  }
})
watch(isServer, () => {
  nextTick(() => {
    renderNets()
  })
})
watch(isWorker, () => {
  nextTick(() => {
    // 改变主机图片
  })
})

const isShow = ref(true)
function changeShow1() {
  isShow.value = false
  if (!isLearning.value) {
    networkData.train_loss = '0.234'
    networkData.train_acc = '0.989'
    networkData.val_loss = '0.012'
    networkData.val_acc = '0.956'
  }
}
function changeShow2() {
  isShow.value = true
  if (!isLearning.value) {
    networkData.train_loss = '0.012'
    networkData.train_acc = '0.978'
    networkData.val_loss = '0.234'
    networkData.val_acc = '0.967'
  }
}
const dataFileList = reactive([])
const codeFileList = reactive([])

// 文件上传和删除
const beforeUploadData = () => {
  console.log('before upload data')
  return true
}
const beforeUploadCode = () => {
  console.log('before upload code')
  return true
}
// const uploadData = (item) => {
//   console.log("item" + item.file);
//   dataFileList.push(item.file);
// };
const uploadFiles = () => {
  // 遍历文件列表，处理每个文件的上传逻辑
  dataFileList.forEach((file) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      // 文件读取成功后的处理逻辑
      // const fileData = event.target.result
      // console.log(fileData)
    }

    reader.onerror = (event) => {
      // 文件读取失败的处理逻辑
      console.error('文件读取失败')
    }

    reader.readAsDataURL(file) // 以DataURL的形式读取文件内容
  })
}
const uploadData = ({ file }) => {
  console.log('upload data')
  // dataFileList.push(file.file)
}
const uploadCode = (item) => {
  console.log(item)
  // codeFileList.push(item.file)
}
const finishData = () => {
  console.log('上传成功data')
}
const finishCode = () => {
  console.log('上传成功code')
}
</script>
<template>
  <div class="relative p-4" ref="board">
    <BorderBox7 :color="['white', 'white']" :key="width">
      <div class="h-full w-full" ref="panel"></div>
      <div class="border border-white w-80 h-64 top-8 left-8 absolute p-4 flex-y-start">
        <n-upload
          :headers="{
            'naive-info': 'hello!'
          }"
          :data="{
            'naive-data': 'cool! naive!'
          }"
          class="flex-col justify-center items-center h-16"
        >
          <button
            border="Border5"
            class="text-center h-10 font-semibold pt-1 w-72"
            fontSize="18px"
            fontColor="#ffffff"
          >
            上传训练数据
          </button>
        </n-upload>
        <n-upload
          :headers="{
            'naive-info': 'hello!'
          }"
          :data="{
            'naive-data': 'cool! naive!'
          }"
          class="flex-col justify-center items-center h-16 mt-6"
        >
          <DvButton
            border="Border5"
            class="text-center h-10 font-semibold pt-1 w-72"
            fontSize="18px"
            fontColor="#ffffff"
          >
            上传训练代码
          </DvButton>
        </n-upload>

        <div class="flex items-center gap-4 mt-6">
          <p class="font-bold" style="letter-spacing: 0.1em; font-size: 16px">parameter server</p>
          <NSwitch v-model:value="isServer" />
        </div>
        <div class="flex items-center gap-4">
          <p class="font-bold" style="letter-spacing: 0.1em; font-size: 16px">开始训练</p>
          <NSwitch v-model:value="isEase" />
        </div>
      </div>
      <div class="border border-white w-80 h-40 top-80 left-8 absolute p-4" v-if="isShow">
        <div class="flex items-center justify-between">
          <p class="mb-2 font-extrabold" style="letter-spacing: 0.1em">神经网络1</p>
          <p class="mb-2 font-extrabold" style="letter-spacing: 0.1em" v-if="isEase">
            <span class="ml-4" v-if="isLearning">正在训练</span>
            <span class="ml-4" v-else>训练完成</span>
          </p>

          <button class="w-6 h-6 mb-2" v-on:click="changeShow1">&#9660;</button>
        </div>
        <div class="flex items-center justify-start">
          <span class="bg-green-500 rounded-full aspect-square w-4 mr-4"></span>
          <span class="w-32">train_Loss:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.train_loss }}</p>
        </div>
        <div class="flex items-center justify-start">
          <span class="bg-yellow-500 rounded-full aspect-square w-4 mr-4"></span>
          <span class="w-32">train_Acc:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.train_acc }}</p>
        </div>
        <div class="flex items-center justify-start">
          <span class="bg-red-500 rounded-full aspect-square w-4 mr-4"></span>
          <span class="w-32">val_Loss:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.val_loss }}</p>
        </div>
        <div class="flex items-center justify-start">
          <span class="bg-blue-500 rounded-full aspect-square w-4 mr-4"></span>
          <span class="w-32">val_Acc:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.val_acc }}</p>
        </div>
      </div>
      <div class="border border-white w-80 h-40 top-80 left-8 absolute p-4" v-else>
        <div class="flex items-center justify-between">
          <p class="mb-2 font-extrabold" style="letter-spacing: 0.1em">神经网络2</p>
          <p class="mb-2 font-extrabold" style="letter-spacing: 0.1em" v-if="isEase">
            <span class="ml-4" v-if="isLearning">正在训练</span>
            <span class="ml-4" v-else>训练完成</span>
          </p>
          <button class="w-6 h-6 mb-2" v-on:click="changeShow2">&#9650;</button>
        </div>
        <div class="flex items-center justify-start">
          <span class="bg-green-500 rounded-full aspect-square w-4 mr-4"></span>
          <span class="w-32">train_Loss:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.train_loss }}</p>
        </div>
        <div class="flex items-center justify-start">
          <div class="bg-yellow-500 rounded-full aspect-square w-4 mr-4"></div>
          <span class="w-32">train_Acc:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.train_acc }}</p>
        </div>
        <div class="flex items-center justify-start">
          <div class="bg-red-500 rounded-full aspect-square w-4 mr-4"></div>
          <span class="w-32">val_Loss:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.val_loss }}</p>
        </div>
        <div class="flex items-center justify-start">
          <div class="bg-blue-500 rounded-full aspect-square w-4 mr-4"></div>
          <span class="w-32">val_Acc:</span>
          <p v-if="isEase" class="ml-4">{{ networkData.val_acc }}</p>
        </div>
      </div>
    </BorderBox7>
  </div>
</template>

<style scoped>
.flex-y-start {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
