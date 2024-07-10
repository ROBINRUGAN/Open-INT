<script setup lang="ts">
import SwitchCard from '@/components/SwitchCard.vue'
import { useSwitchStore } from '@/stores/switch'
import { useTopoStore } from '@/stores/topo'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const dialogFormVisible = ref(false)
const topoStore = useTopoStore()
const switchStore = useSwitchStore()

const form = reactive({
  ip: '',
  port1: '',
  port2: '',
  port3: '',
  port4: ''
})
function addSwitch() {
  ElMessage.success('新增交换机成功！')
  topoStore.addNode()
  switchStore.addSwitch()
  dialogFormVisible.value = false
}
function deleteSwitch() {
  topoStore.removeNode()
  switchStore.removeSwitch('Switch 4')
}
</script>
<template>
  <div class="switch-list">
    <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 10px">
      <div style="font-size: 18px; font-weight: bold">交换机列表</div>
      <button class="btn" @click="dialogFormVisible = true">新增交换机</button>
      <button class="btn-trans" @click="deleteSwitch">删除交换机</button>
    </div>
    <SwitchCard
      v-for="(item, index) in switchStore.switchData"
      :key="index"
      :name="item.name"
      :ip="item.ip"
    />
    <br />
    <el-dialog v-model="dialogFormVisible" title="新增交换机" width="500">
      <el-form :model="form">
        <el-form-item label="ip地址">
          <el-input v-model="form.ip" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口1">
          <el-input v-model="form.port1" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口2">
          <el-input v-model="form.port2" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口3">
          <el-input v-model="form.port3" autocomplete="off" />
        </el-form-item>
        <el-form-item label="端口4">
          <el-input v-model="form.port4" autocomplete="off" />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSwitch"> 新增 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
/* 滚动条样式 */

.btn {
  background-color: #409eff;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 5px 10px;
  margin-left: 20px;
  cursor: pointer;
}
.btn:hover {
  background-color: #5eacff;
}
.btn:active {
  background-color: #409eff;
}

.switch-list {
  min-width: 300px;
  height: 780px;
  width: 100%;
  border: none;
  overflow: auto;
}

.btn-trans {
  background-color: #ffffff;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 5px 10px;
  margin-left: 20px;
}

.switch-list::-webkit-scrollbar {
  width: 6px; /* 设置纵轴（y轴）轴滚动条 */
  height: 4px; /* 设置横轴（x轴）轴滚动条 */
}

/* 滚动条滑块（里面小方块） */
.switch-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(10, 132, 255, 0.711);
  visibility: hidden; /* 默认不可见 */
  opacity: 0; /* 默认透明 */
  transition:
    opacity 0.3s,
    visibility 0.3s; /* 添加过渡效果 */
}

/* 滚动条轨道 */
.switch-list::-webkit-scrollbar-track {
  border-radius: 0;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(10, 132, 255, 0.1);
  visibility: hidden; /* 默认不可见 */
  opacity: 0; /* 默认透明 */
  transition:
    opacity 0.3s,
    visibility 0.3s; /* 添加过渡效果 */
}

/* hover时显色 */
.switch-list:hover::-webkit-scrollbar-thumb,
.switch-list:hover::-webkit-scrollbar-track {
  visibility: visible; /* 鼠标悬停时可见 */
  opacity: 1; /* 鼠标悬停时不透明 */
}
</style>
