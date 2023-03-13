<template>
  <div class="list">
    <list-header></list-header>
    <section>
      <div class="left" ref="left">
        <ul class="left-item">
          <li :class="{active: item.id == currentIndex}" @click="handleClick(item.id)" v-for="item in leftData" :key="item.id">{{ item.name }}</li>
        </ul>
      </div>
      <div class="right" ref="right">
        <div>
          <ul v-for="(item, index) in rightData" :key="index">
            <li class="shop-list" v-for="k in item" :key="k.id">
              <h2>{{ k.name }}</h2>
              <ul class="list-item">
                <li v-for="info in k.list" :key="info.id">
                  <img :src="info.imgUrl" />
                  <span>{{ info.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import ListHeader from '@/components/List/ListHeader.vue'
import Http from '@/assets/tool/api/request.js'
import BScroll from 'better-scroll'
export default {
  name: 'list',
  data () {
    return {
      //一级菜单
      leftData: [],
      rightData: [],
      rightBScroll: '',
      allHeight: [], // 承载右侧每一块的高度值
      scrollY:'' // 右侧滚动距离
    }
  },
  components: { Tabbar, ListHeader },
  async created () {
    let res = await Http.$axios({
      url:'/api/goods/list'
    })
    let leftArr = []
    let rightArr = []

    res.forEach(v => {
      leftArr.push({
        id: v.id,
        name: v.name
      })
      rightArr.push(v.data)
    })
    this.leftData = leftArr
    this.rightData = rightArr

    this.$nextTick( () => {
      // 左侧滑动
      new BScroll(this.$refs.left, {
        // movable: true,
        zoom: true,
        click: true  
      })
      // 右侧滑动
      this.rightBScroll = new BScroll(this.$refs.right, {
        movable: true,
        zoom: true,
        probeType: 3
      })
      // 统计右侧各板块高度值，并放入数组中
      let height = 0;
      this.allHeight.push(height)
      // 获取右侧每一块高度
      let lis = this.$refs.right.getElementsByClassName('shop-list')
      // 把dom对象转换成真正的对象
      Array.from(lis).forEach(v => {
        height += v.clientHeight
        this.allHeight.push(height)
      })
      // 得到右侧滚动的值
      this.rightBScroll.on('scroll', (pos) => {
        console.log(pos)
        this.scrollY = Math.abs(pos.y)
      })      
    })
  },
  computed: {
    currentIndex(){
      return this.allHeight.findIndex((item,index) => {
        return this.scrollY >= item && this.scrollY < this.allHeight[index + 1]
      })
    }
  },
  methods: {
    handleClick(index){
      this.rightBScroll.scrollTo(0, -this.allHeight[index])
    }
  }
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.list section {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.list .left {
  width: 93px;
  background-color: #fff;
  overflow: hidden;
  border-right: 1px solid #e6dede;
}
.list .left .left-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.list .left .left-item li {
  width: 100%;
  line-height: 30px;
  text-align: center;
  margin: 10px 0 5px;
  font-size: 14.5px;
  font-weight: lighter;
}
.list .left .left-item .active  {
  width: 90px;
  border-left: 3px solid #b0352f;
  color: #b0352f;
}
.list .right {
  flex: 1;
  height: 89%;
  padding: 10px;
  overflow: hidden;
}
.list .shop-list {
  text-align: center;

}
.list .shop-list h2 {
  padding: 20px 0 10px;
  font-size: 18px;
  font-weight: normal;
}
.list .shop-list .list-item {
  display: flex;
  flex-wrap: wrap;
}
.list .shop-list .list-item li {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.33%;
  padding: 10px 0;
}
.list .shop-list .list-item li img {
  width: 53px;
  height: 53px;
  margin: 0 6.5px;
}
.list .shop-list .list-item span {
  width: 66px;
  font-size: 12.75px;
}
</style>