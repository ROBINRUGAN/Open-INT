<script setup lang="ts">
import HistoryGraph from '@/components/HistoryGraph.vue'
import TopoGraph from '@/components/TopoGraph.vue'
import { useHistoryStore } from '@/stores/history'

import { ElMessage } from 'element-plus'
import { ref, onMounted, watchEffect, nextTick } from 'vue'

const terminalContent = ref<HTMLElement | null>(null)
const msg0 = ref(false)
const msg1 = ref(false)
const msg2 = ref(false)
const msg3 = ref(false)
const msg4 = ref(false)
const msg5 = ref(false)
const msg6 = ref(false)
const msg7 = ref(false)
const msg8 = ref(false)
const msg9 = ref(false)
const msg10 = ref(false)
const historyStore = useHistoryStore()
const scrollToBottom = async () => {
  await nextTick()
  if (terminalContent.value) {
    terminalContent.value.scrollTop = terminalContent.value.scrollHeight
  }
}

onMounted(scrollToBottom)
watchEffect(scrollToBottom)
const form = ref({
  taskType: '',
  switch: [],
  dataTypes: []
})
const clearConfig = () => {
  ElMessage({
    message: '清除配置成功',
    type: 'success'
  })
  setTimeout(() => {
    msg0.value = true
  }, 400)
}

const updateTask = () => {
  // 模拟任务处理过程,点击后每隔400秒依次出现msg1到msg10
  ElMessage({
    message: '更新配置成功',
    type: 'success'
  })
  setTimeout(() => {
    msg1.value = true
    scrollToBottom()
  }, 400)
  setTimeout(() => {
    msg2.value = true
    scrollToBottom()
  }, 800)
  setTimeout(() => {
    msg3.value = true
    scrollToBottom()
  }, 1200)
  setTimeout(() => {
    msg4.value = true
    scrollToBottom()
  }, 10600)
  setTimeout(() => {
    msg5.value = true
    scrollToBottom()
  }, 10800)
  setTimeout(() => {
    msg6.value = true
    scrollToBottom()
  }, 11000)
  setTimeout(() => {
    msg7.value = true
    scrollToBottom()
  }, 11200)
  setTimeout(() => {
    msg8.value = true
    scrollToBottom()
  }, 11400)
  setTimeout(() => {
    msg9.value = true
    scrollToBottom()
  }, 11600)
  setTimeout(() => {
    msg10.value = true
    scrollToBottom()
    historyStore.addTask(
      `任务${historyStore.taskIds.length + 1}`,
      Math.floor(Math.random() * 5 + 20)
    )
  }, 11800)
}

const createTask = () => {
  if (!form.value.taskType || form.value.dataTypes.length === 0) {
    ElMessage({
      message: '请完整填写表单',
      type: 'warning'
    })
  } else {
    ElMessage({
      message: '任务提交成功',
      type: 'success'
    })
    console.log('提交的任务类别:', form.value.taskType)
    console.log('提交的数据类别:', form.value.dataTypes)
  }
}
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="12"
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
    <el-col :span="12"
      ><div class="three-column" style="display: flex; flex-direction: column">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="24">
            <div class="task-wrapper">
              <div style="font-size: 18px; font-weight: bold">新建任务</div>
              <div class="task-add">
                <el-form :model="form">
                  <el-form-item label="任务类别：">
                    <el-radio-group v-model="form.taskType">
                      <el-radio label="流量监控">流量监控</el-radio>
                      <el-radio label="丢包检测">丢包检测</el-radio>
                      <el-radio label="拥塞控制">拥塞控制</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="交 换 机 ：">
                    <el-checkbox-group v-model="form.switch">
                      <el-checkbox label="Switch 1">Switch 1</el-checkbox>
                      <el-checkbox label="Switch 2">Switch 2</el-checkbox>
                      <el-checkbox label="Switch 3">Switch 3</el-checkbox>
                      <el-checkbox label="Switch 4">Switch 4</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>

                  <el-form-item label="数据类别：">
                    <el-checkbox-group v-model="form.dataTypes">
                      <el-checkbox label="入端口接口标识符">入端口接口标识符</el-checkbox>
                      <el-checkbox label="入端口时间戳">入端口时间戳</el-checkbox>
                      <el-checkbox label="入端口接收数据包计数">入端口接收数据包计数</el-checkbox>
                      <el-checkbox label="入端口数据包丢失计数">入端口数据包丢失计数</el-checkbox>
                      <el-checkbox label="入端口接收链路利用率">入端口接收链路利用率</el-checkbox>
                      <el-checkbox label="出端口接口标识符">出端口接口标识符</el-checkbox>
                      <el-checkbox label="出端口时间戳">出端口时间戳</el-checkbox>
                      <el-checkbox label="出端口传输数据包计数">出端口传输数据包计数</el-checkbox>
                      <el-checkbox label="出端口数据包丢失计数">出端口数据包丢失计数</el-checkbox>
                      <el-checkbox label="出端口传输链路利用率">出端口传输链路利用率</el-checkbox>
                      <el-checkbox label="数据包处理延迟">数据包处理延迟</el-checkbox>
                      <el-checkbox label="队列标识符">队列标识符</el-checkbox>
                      <el-checkbox label="队列长度">队列长度</el-checkbox>
                      <el-checkbox label="接收数据包计数">接收数据包计数</el-checkbox>
                      <el-checkbox label="队列数据包丢失计数">队列数据包丢失计数</el-checkbox>
                      <el-checkbox label="队列占用情况">队列占用情况</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
              </div>
              <div style="display: flex; justify-content: end">
                <el-button class="task-add-btn1" @click="clearConfig">清除配置</el-button>
                <el-button class="task-add-btn2" @click="createTask">新建任务</el-button>
                <el-button class="task-add-btn3" @click="updateTask">更新配置</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="terminal-container">
              <div class="terminal-header">终端日志</div>
              <div class="terminal-content" ref="terminalContent">
                <p style="line-height: 0; margin-bottom: 10px">
                  ===================================================================================
                </p>
                <p style="display: flex; justify-content: center; font-weight: bold">
                  Welcome to OpenINT CLI!
                </p>
                <p style="line-height: 0; margin: 10px 0">
                  ===================================================================================
                </p>
                <p v-if="msg0">$ [INFO] Cleared configurations successfully!</p>
                <p v-if="msg1">$ [INFO] Receiving Task No.21 ...</p>
                <p v-if="msg2">$ [INFO] Received Task No.21</p>
                <p v-if="msg3">$ [INFO] Handling Task No.21 ...</p>
                <p v-if="msg4">$ [INFO] Task No.21 handled successfully!</p>
                <p v-if="msg5">$ [INFO] Task No.21 result:</p>
                <p v-if="msg6">$</p>
                <p v-if="msg7" style="color: rgb(100, 255, 100)">
                  $ [SUCCESS] Packet Loss Count: 23 packets
                </p>
                <p v-if="msg8" style="color: rgb(100, 255, 100)">$ [SUCCESS] Queue Length: 19</p>
                <p v-if="msg9" style="color: rgb(255, 100, 100)">
                  $ [RESULT] Network congestion detected!
                </p>
                <p v-if="msg10">$ _</p>
              </div>
            </div>
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
.task-wrapper {
  width: 100%;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
}
.task-add {
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: start;
  margin-top: 20px;
  text-align: start;
}
.task-add-btn1 {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: #d02323;
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  align-self: end;
}

.task-add-btn1:hover {
  background-color: #d02323da;
}

.task-add-btn1:active {
  background-color: #d02323;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.task-add-btn2 {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: #e99517;
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  align-self: end;
}

.task-add-btn2:hover {
  background-color: #e99517da;
}

.task-add-btn2:active {
  background-color: #e99517;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.task-add-btn3 {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: #409eff;
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  align-self: end;
}

.task-add-btn3:hover {
  background-color: #409effda;
}

.task-add-btn3:active {
  background-color: #409eff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.terminal-container {
  background-color: #2d2d2d;
  color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.terminal-header {
  background-color: #1a1a1a;
  padding: 10px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #444;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.terminal-content {
  height: 320px; /* 根据需要调整高度 */
  width: 100%;
  text-align: start;
  padding: 20px;
  line-height: 30px;
  font-family: 'Courier New', Courier, monospace;
  overflow: auto;
}

.terminal-content::-webkit-scrollbar {
  width: 6px; /* 设置纵轴（y轴）轴滚动条 */
  height: 4px; /* 设置横轴（x轴）轴滚动条 */
}

/* 滚动条滑块（里面小方块） */
.terminal-content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.711);
  visibility: hidden; /* 默认不可见 */
  opacity: 0; /* 默认透明 */
  transition:
    opacity 0.3s,
    visibility 0.3s; /* 添加过渡效果 */
}

/* 滚动条轨道 */
.terminal-content::-webkit-scrollbar-track {
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
.terminal-content:hover::-webkit-scrollbar-thumb,
.terminal-content:hover::-webkit-scrollbar-track {
  visibility: visible; /* 鼠标悬停时可见 */
  opacity: 1; /* 鼠标悬停时不透明 */
}
</style>
