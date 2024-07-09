<script lang="ts" setup>
// 接受父组件写在标签里的传递过来的三个参数
import { useChartStore } from '@/stores/charts'
import { defineProps } from 'vue'
const props = defineProps({
  id: String,
  name: String,
  ip: String
})
const chartStore = useChartStore()

function choose() {
  chartStore.currentSwitch = props.name as string
  chartStore.refreshAllCharts()
}
</script>
<template>
  <div class="wrapper" @click="choose">
    <img src="/public/images/switch.png" alt="" />
    <div class="textWrapper">
      <div style="font-weight: bold; font-size: 18px; margin-bottom: 5px">{{ props.name }}</div>
      <div style="font-size: 14px; line-height: 14px">状态：已连接</div>
      <div style="font-size: 14px">IP：{{ props.ip }}</div>
    </div>
  </div>
</template>
<style scoped>
img {
  width: 70px;
  height: 50px;
  margin-left: 20px;
  margin-right: 20px;
}
.wrapper {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 15px;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.wrapper:hover {
  background-color: #fcfcfc;
}
.wrapper:active {
  background-color: rgb(247, 247, 247);
}
.textWrapper {
  text-align: left;
  height: fit-content;
  margin: 0;
  padding: 0;
  line-height: 30px;
}
</style>
