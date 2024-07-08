<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <el-container>
    <el-header>OpenINT——在线XXXXXXXX系统</el-header>
    <el-container>
      <el-aside width="fit-content">
        <SideBar />
      </el-aside>
      <el-main> <router-view /></el-main>
    </el-container>
  </el-container>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
<style scoped>
.el-header {
  background-color: rgb(25, 144, 255);
  color: #ffffff;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 1px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid #ebeef5;
  font-size: 32px;
  font-weight: bold;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  z-index: 10000;
  padding: 40px 0px 50px 0;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  border-radius: 10px;
  margin-top: 10px;
  z-index: 10000;
}

.el-main {
  background-color: #f6faff;
  color: #333;
  text-align: center;
  line-height: 160px;
  height: 100%;
}
.el-container {
  height: 100%;
  overflow: hidden;
}
</style>
