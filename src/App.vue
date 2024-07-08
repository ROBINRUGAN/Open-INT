<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
</script>

<template>
  <el-container>
    <el-header>OpenINT——在线XXXXXXXX系统</el-header>
    <el-container>
      <el-aside width="200px">
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
  height: 100%;
}
.el-header {
  background-color: #85baff;
  color: #ffffff;
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  font-weight: bold;
  margin: 10px 10px 0px 10px;
  border-radius: 10px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
  border-radius: 10px;
  margin-top: 10px;
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
