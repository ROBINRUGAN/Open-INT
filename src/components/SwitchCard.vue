<script lang="ts" setup></script>
<template>
  <div class="wrapper">
    <img src="/public/images/switch.png" alt="" />
    <div class="textWrapper">
      <div style="font-weight: bold; font-size: 18px">交换机1</div>
      <div style="font-size: 18px">状态：xxx</div>
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
  border-radius: 5px;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
}
.textWrapper {
  text-align: left;
  height: fit-content;
  margin: 0;
  padding: 0;
  line-height: 30px;
}
</style>
