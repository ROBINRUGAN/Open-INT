<script setup lang="ts">
import SwitchCard from '@/components/SwitchCard.vue'
</script>
<template>
  <div class="switch-list">
    <SwitchCard v-for="(item, index) in 5" :key="index" />
  </div>
</template>
<style scoped>
.switch-list {
  height: 540px;
  overflow: scroll;
  background-color: #ffffff;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  padding-bottom: 0;
}
</style>
