<template>
  <div class="title">
    <slot>
      <span></span>
    </slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.title {
  padding: 7.16px 0;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.title span {
  position: relative;
}
.title span::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  margin-top: -4px;
  right: -18px;
}
.title span::before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: block;
  background: #d4c0a7;
  top: 50%;
  margin-top: -4px;
  left: -18px;
}
</style>
