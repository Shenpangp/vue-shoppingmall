<template>
  <div class="home">
    <div class="headers">
      <div class="headers-main">
        <my-header></my-header>
	      <ly-tab v-model="selectedId" :items="topBar" :options="options" @change="changeTab"/>
      </div>
    </div>
    <section ref="wrapper">
      <div>
        <div v-for="item in newData" :key="item.id">
          <swiper v-if="item.type == 'swiperList'" :swiperList="item.data"></swiper>
          <icons v-if="item.type == 'iconsList'" :iconsList="item.data"></icons>
          <recommend v-if="item.type == 'recommendList'" :recommendList="item.data"></recommend>
          <like v-if="item.type == 'likeList'" :likeList="item.data"></like>
          <ad v-if="item.type == 'adList'" :adList="item.data"></ad>
        </div>  
      </div>  
    </section>
    <tabbar></tabbar>
  </div>
</template>


<script>
import Tabbar from '@/components/Tabbar.vue';
import MyHeader from '@/components/Home/MyHeader.vue'
import Swiper from '@/components/Home/Swiper.vue'
import Icons from '@/components/Home/Icons.vue'
import Recommend from '@/components/Home/Recommend.vue'
import Like from '@/components/Home/Like.vue'
import Ad from '@/components/Home/Ad.vue'
import BetterScroll from 'better-scroll'
import Http from '@/assets/tool/api/request'

export default {
  name: 'home',
  data () {
    return {
      selectedId: 0,
      topBar: [],
      newData: [],
      options: {
        activeColor: '#b0352f'
      }
    }
  },
  components: {
    Tabbar,
    MyHeader,
    Swiper,
    Icons,
    Recommend,
    BetterScroll,
    Like,
    Ad,
    Tabbar
  },
  methods: {
    changeTab (item, index) {
      this.addData(index)
    },
    async getData() {
      let res = await Http.$axios({
        url: '/api/index_list/0/data/1'
      })
      this.topBar = Object.freeze(res.topBar)
      this.newData = Object.freeze(res.data)

      this.$nextTick( () => {
        new BetterScroll(this.$refs.wrapper, {
          // movable: true,
          // zoom: true
        })
      })
    },
    async addData(index) {
      let res = await Http.$axios({
        url:`/api/index_list/${index}/data/1`
      })
      // console.log(index, 'addData')
      if(res.constructor != Array){
        this.newData = res.data
      } else {
        this.newData = res
      }
      this.$nextTick( () => {
        new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true
        })
      })
    }
  },
  created () {
    this.getData()
  },
  mounted() {
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 95vh;
  overflow: hidden;;
}
.headers {
  width:375px;
  height: 84px;
}
.headers-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}
section {
  flex: 1;
  overflow: hidden;
}
::v-deep .ly-tabbar {
  box-shadow: none;
  border-bottom: none;
}
</style>