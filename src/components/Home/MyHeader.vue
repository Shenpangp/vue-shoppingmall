<template>
  <div  class="header">
    <div class="logo" @click="handleLogo">
      <img src="../../../public/images/logo.png" />
    </div>
    <div class="search" @click="handleSearch">
      <i class="iconfont  icon-search"></i>
      <span>搜您喜欢的...</span>
    </div>
    <div  class="kefu">
      <i class="iconfont icon-service"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myHeader',
  data () {
    return {

    }
  },
  methods: {
    handleLogo() {
      if(this.$route.path != '/home'){
        this.$router.push('/home')
      }
    },
    handleSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 44px;
  background-color: #b0352f;
}
.header .logo {
  width: 70px;
  height: 44px;
}
.header .logo img {
  width: 100%;
  height: 100%;
}
.header .search {
  display: flex;
  align-items: center;
  width: 246px;
  height: 30px;
  background-color: #FFFFFF;
  border-radius: 12px;
}
.header i{
  font-size: 16px;
  padding-left: 10px;
  color: #666;
}

.header .search span{
  font-size: 16px;
  color: #666;
  padding-left: 10px;
} 
.header .kefu i{
  font-size: 28px;
  color: #FFFFFF;
}
</style>