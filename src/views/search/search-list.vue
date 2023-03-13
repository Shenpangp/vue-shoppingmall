<template>
  <div class="search-list">
    <div class="headers">
      <search-header></search-header>
      <ul>
        <li v-for="(item, index) in searchList.data" :key="index" @click="changeIndex(index)">
          <div :class="searchList.currentIndex == index ? 'active' : ''">{{ item.name }}</div>
          <div class="search-filter" v-if="index != 0">
            <i class="iconfont icon-fold" :class="item.status == 1 ? 'active' : '' "></i>
            <i class="iconfont icon-unfold" :class="item.status == 2 ? 'active' : '' "></i>
          </div>
        </li>
      </ul>
    </div>
    <section>
      <ul v-if="goodsList.length">
        <li v-for="item in goodsList" :key="item.id">
          <img v-lazy="item.imgUrl" alt="" />
          <h3>{{item.name}}</h3>
          <div>
            <div class="price">
              <span>￥{{item.price}}</span>
            </div>
            <div class="buy-btn">
              立即购买
            </div>
          </div>  
        </li>
      </ul>
      <h1 v-else>暂无数据...</h1>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import SearchHeader from '@/components/Search/SearchHeader.vue'
import Tabbar from '@/components/Tabbar.vue'
import Http from '@/assets/tool/api/request'
export default {
  name: 'search-list',
  data () {
    return {
      goodsList: [],
      searchList: {
        currentIndex: 0,
        data: [
          /*
          0:都不亮
          1：上箭头亮
          2：下箭头亮
          */
          {name: '综合', key: 'zonghe'},
          {name: '价格', status: 0, key: 'price'},
          {name: '销量', status: 0, key: 'num'}
        ]
      }
    }
  },
  computed: {
    orderBy() {
      // 获取当前点击的对象
      let obj = this.searchList.data[this.searchList.currentIndex]
      // 根据status判断是升序还是降序
      let val = obj.status == 1 ? 'asc' : 'desc'
      return {
        [obj.key]: val
      }
    }
  },
  components: { 
    SearchHeader,
    Tabbar
  },
  created () {
    this.getData()
  },
  methods: {
    getData() {
      Http.$axios({
        url: '/api/goods/goodsList',
        params:{
          searchName:this.$route.query.key,
          ...this.orderBy
        }
      }).then(res => {
        this.goodsList = res
        console.log(res)
      })
    },
    changeIndex(index){
      this.searchList.currentIndex = index
      // 获取点击的下标的对应数据
      let item = this.searchList.data[index]
      console.log(item)
      // 未点击的status变为0
      this.searchList.data.forEach((v, i) => {
        if(i != index){
          v.status = 0
        }
      })
      //  改变当前点击状态
      if(index == this.searchList.currentIndex){
        item.status = item.status == 1 ? 2 : 1
      }
      // 发送请求进行数据排序
      this.getData()
    }
  },
  watch: {
    $route(){
      this.getData()
    }
  }
}
</script>

<style scoped>
.search-list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.headers ul {
  display: flex;
  justify-content: space-around;  
}
.headers ul li {
  display: flex;
  align-items: center;
  font-size: 18px;
}
.headers ul li .search-filter {
  display: flex;
  flex-direction: column;
  padding: 0 2.5px
}
section {
  flex: 1;
  overflow: hidden;
}
section ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section ul li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 46%;
  padding: 7.5px 7.5px 3.75px;
}
section ul li img {
  width: 170px;
  height: 170px;
}
section ul li img[lazy=loading] {
  background-color: #f7f7f7;
}
section ul li h3 {
  width: 100%;
  padding: 3.75px 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #333;
  font-weight: normal;
}
section ul li div {
  display: flex;
  justify-content: space-between;
}
section ul li .price {
  width: 90px;
  height: 20px;
  font-size: 14px;
  padding: 8.75px 0;
}
section ul li .price span {
  color: #b0352f;
  text-align: center;
}
section ul li .buy-btn {
  height: 20px;
  padding: 3.75px 7.5px;
  margin: 5px 0 0;
  font-size: 14px;
  color: #fff;
  background-color: #b0352f;
  border-radius: 3px;
}
.active {
  color: #b0352f;
}
</style>