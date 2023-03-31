<template>
  <div class="list-header">
    <div class="back">
      <i class="iconfont icon-back" @click="handleBack"></i>
    </div>
    <div class="search" @click="handleSearch">
      <i class="iconfont icon-search"></i>
      <span>搜您喜欢的</span>
    </div>
    <div class="home" @click="handleHome">
      <i class="iconfont icon-home"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleBack() {
      this.$router.back();
    },
    handleSearch() {
      this.$router.push("/search");
    },
    handleHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: #b0352f;
}
.list-header .back i {
  font-size: 25px;
  padding: 9.5px;
  color: #ffffff;
}
.list-header .search {
  display: flex;
  align-items: center;
  width: 280px;
  height: 30px;
  background-color: #ffffff;
  border-radius: 12px;
}
.list-header i {
  font-size: 16px;
  padding-left: 10px;
  color: #666;
}

.list-header .search span {
  font-size: 16px;
  color: #666;
  padding-left: 10px;
}
.list-header .home i {
  font-size: 25px;
  padding: 9.5px;
  color: #ffffff;
}
</style>
