<script setup lang="ts">
import TopoGraph from '@/components/TopoGraph.vue'
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8"
      ><div class="three-column">
        <div class="graph-left-one"></div>
        <div class="graph-left-two"></div></div
    ></el-col>
    <el-col :span="8"
      ><div class="three-column">
        <TopoGraph /></div
    ></el-col>
    <el-col :span="8"><div class="three-column"></div></el-col>
  </el-row>
</template>

<style scoped>
.el-row {
  margin: 0;
}
.el-col {
  border-radius: 4px;
}
.three-column {
  height: 100%;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  margin: 0;
  overflow: hidden;
}
.graph-left-one {
  height: 400px;
  background-color: #ff8b8b;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  margin: 20px;
}
.graph-left-two {
  height: 400px;
  background-color: #baffcf;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  margin: 20px;
}
</style>
