<template>
  <div class="detail">
    <header>
      <div class="header-return" v-if="isShow">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <i class="iconfont icon-home" @click="handleHome"></i>
      </div>
      <div class="header-bar" v-else :style="styleOption">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <span>商品详情</span>
        <span>商品评价</span>
        <i class="iconfont icon-home" @click="handleHome"></i>
      </div>
    </header>
    <section ref="wrapper">
      <div>
        <detail-swiper :swiperList="swiperdata"></detail-swiper>
        <div class="name">
          <h1>{{goodsInfo.name}}</h1>
          <div>{{goodsInfo.content}}</div>
        </div>
        <div class="price">
          <div class="present-price">
            <span>￥</span>
            <p class="money">{{goodsInfo.price}}</p>
            <p class="weight">/ 250g</p>
          </div>
          <div class="old-price">
            <span>价格:</span>
            <del>{{goodsInfo.oldprice}}</del>
          </div>
        </div>
        <div class="info">
          <img :src="goodsInfo.imgUrl" alt="" />
          <img :src="goodsInfo.imgUrl" alt="" />
          <img :src="goodsInfo.imgUrl" alt="" />
          <img :src="goodsInfo.imgUrl" alt="" />
          <img :src="goodsInfo.imgUrl" alt="" />
        </div>
      </div>
    </section>
    <detail-footer></detail-footer>
  </div>
</template>

<script>
import DetailFooter from '../components/Detail/DetailFooter.vue';
import DetailSwiper from '../components/Detail/DetailSwiper.vue';
import BScroll from 'better-scroll';
import Http from '@/assets/tool/api/request.js'
export default {
  components: { DetailFooter, DetailSwiper },
  name: 'detail',
  data () {
    return{
      swiperdata:[
        {imgUrl: 'https://img.tea7.com/0156515_0.jpeg?x-oss-process=image/resize,w_800'},
        {imgUrl: 'https://img.tea7.com/0012978_0.jpeg?x-oss-process=image/resize,w_800'},
        {imgUrl: 'https://img.tea7.com/0012979_0.jpeg?x-oss-process=image/resize,w_800'},
        {imgUrl: 'https://img.tea7.com/0012992_0.jpeg?x-oss-process=image/resize,w_800'},
        {imgUrl: 'https://img.tea7.com/0012980_0.jpeg?x-oss-process=image/resize,w_800'},
        {imgUrl: 'https://img.tea7.com/0012981_0.jpeg?x-oss-process=image/resize,w_800'}
      ],
      isShow: true,
      BetterScroll: [],
      styleOption: {},
      goodsInfo: {},
      id: 0
    }
  },
  created(){
    this.id = this.$route.query.id;
    this.getData()
  },
  mounted() {
    this.BetterScroll = new BScroll(this.$refs.wrapper, {
      movable: true,
      zoom: true,
      click: true,
      probeType: 3
    });
    this.BetterScroll.on('scroll', (pos) => {
      let posY = Math.abs(pos.y)
      let opacity = posY / 600
      opacity = opacity > 1 ? 1 : opacity
      this.styleOption = {
        opacity
      }
      if(posY >= 400){
        this.isShow = false
      } else {
        this.isShow = true
      }
    })
  },
  activated() {
    if(this.$route.query.id != this.id){
      this.getData()
      this.id = this.$route.query.id
    }
  },
  methods: {
    async getData(){
      let id = this.$route.query.id
      let res = await Http.$axios({
        url: '/api/goods/id',
        params: {
          id
        }
      })
      this.goodsInfo = res
      console.log(res)
    },
    handleBack(){
      this.$router.back()
    },
    handleHome(){
      this.$router.push('/home')
    }
  }
};
</script>

<style scoped>
.detail {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 93vh;
  overflow: hidden;
}
.detail section{
  flex: 1;
  overflow: hidden;
}
.detail header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 44px;
}
.detail header .header-return {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail header .header-return i {
  text-align: center;
  width: 34px;
  height: 34px;
  margin: 5px;
  line-height: 32px;
  border-radius: 17px;
  font-size: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
}
.detail header .header-bar {
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}
.detail header .header-bar i {
  width: 34px;
  height: 34px;
  margin: 5px;
  font-size: 20px;
  line-height: 34px;
  text-align: center;
}
.detail header .header-bar span {
  width: 100px;
  height: 44px;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
} 
.detail .name {
  padding: 11.25px;
}
.detail .name h1 {
  font-size: 18px;
  color: #232326;
  font-weight: normal;
}
.detail .name div {
  font-size: 14px;
  color: #999;
  padding: 3.75px 0 0;
}
.detail .price {
  padding: 0 11.25px 11.25px;
}
.detail .price .present-price {
  display:flex;
  align-items:flex-end;
  padding-top: 11.25px;
  border-top: 1px solid #e6dede;
}
.detail .price .present-price span {
  font-size: 16px;
  color: #d22531;
}
.detail .price .present-price .money {
  font-size: 22px;
  color: #d22531;
}
.detail .price .present-price .weight {
  font-size: 15px;
  color: #999;
  padding-left: 10px;
}
.detail .price .old-price {
  font-size: 13.5px;
  color: #999;
}
.detail .info img {
  width: 375px;
  height: 375px;
}
</style>
