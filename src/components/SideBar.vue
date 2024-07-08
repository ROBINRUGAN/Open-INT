<script setup lang="ts">
import router from '@/router'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
const activeIndex = ref('/home')
function handleOpen(key: string, keyPath: string) {
  // console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string) {
  // console.log(key, keyPath)
}
watch(
  () => router.currentRoute.value.fullPath,
  (newPath) => {
    // console.log(newPath)
    activeIndex.value = newPath
  }
)
</script>
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/home" @click="router.push('/home')">
      <el-icon><Odometer /></el-icon>
      <span>仪表盘</span>
    </el-menu-item>
    <el-menu-item index="/task" @click="router.push('/task')">
      <el-icon><document /></el-icon>
      <span>任务配置</span>
    </el-menu-item>
  </el-menu>
</template>
<style scoped>
.el-menu {
  border: none;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>
