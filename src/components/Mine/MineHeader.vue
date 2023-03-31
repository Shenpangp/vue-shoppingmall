<template>
  <div class="header">
    <i class="iconfont icon-back" @click="handleBack"></i>
    <div class="slot">
      <slot></slot>
    </div>
    <i class="iconfont icon-home" @click="handleHome"></i>
  </div>
</template>

<script>
export default {
    name: "mine",
    data() {
        return {

        }
    },
    methods: {
        handleBack() {
            this.$router.back()
        },
        handleHome() {
            this.$router.push('/home')
        }
    }
}
</script>

<style>
.header {
  width: 100%;
  height: 44px;
  background-color: #b0352f;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header i {
  text-align: center;
  width: 34px;
  height: 34px;
  margin: 5px;
  line-height: 32px;
  font-size: 20px;
  color: #fff;
}
.header .slot  {
  color: #fff;
}
</style>