<script setup lang="ts">
import HistoryGraph from '@/components/HistoryGraph.vue'
import TopoGraph from '@/components/TopoGraph.vue'
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="10"
      ><div class="three-column" style="display: flex; flex-direction: column">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="24">
            <div class="graph-left-one">
              <TopoGraph />
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="graph-left-two"><HistoryGraph /></div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="14"
      ><div class="three-column" style="display: flex; flex-direction: column">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="24">
            <div class="graph-left-one">111</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="graph-left-two">111</div>
          </el-col>
        </el-row>
      </div>
    </el-col>
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
  padding: 20px;
  overflow: hidden;
}
.graph-left-one {
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.graph-left-two {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
