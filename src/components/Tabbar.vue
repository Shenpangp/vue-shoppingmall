<template>
  <div class="tabbar">
    <ul>
      <li v-for="item in routerList" :key="item.title" @click="switchTab(item.path)">
        <img :src="$route.path.includes(item.path) ? item.selected : item.active" />
        <span :class="$route.path.includes(item.path) ? 'active' : ''">{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routerList: [
        {
          title: '首页',
          path: '/home', 
          active: '/images/home.png',
          selected: '/images/home-selected.png'
        },
        {
          title: '分类',
          path: '/list', 
          active: '/images/Tabulation.png',
          selected: '/images/Tabulation-selected.png'
        },
        {
          title: '购物车',
          path: '/cart', 
          active: '/images/cart.png',
          selected: '/images/cart-selected.png'
        },
        {
          title: '我的',
          path: '/my', 
          active: '/images/mine.png',
          selected: '/images/mine-selected.png'
        }
      ]
    }
  },
  methods: {
    switchTab(path) {
      if(this.$route.path != path){
        this.$router.push(path)
      }
    }
  }
}
</script>

<style scoped>
.tabbar{
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 54px;
  background-color: #fff;
  border-top: 1px solid #e6dede;
}
.tabbar ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;

}
.tabbar ul li {
  display: flex;
  flex-direction: column;
}
.tabbar ul li img {
  width: 31px;
  height: 31px;
}

.tabbar ul li span {
  font-size: 16px;
}
.active {
  color: red;
}
</style>