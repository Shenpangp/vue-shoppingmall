<template>
  <div class="wrapper">
      <swiper :options="swiperOption">
          <swiper-slide v-for="item of swiperList" :key="item.id">
              <img class="swiper-img" :src="item.imgUrl"/>
          </swiper-slide>
          <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
  </div>   
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Swiper',
  props: {
    swiperList: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 1000
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 185px;
  /* margin-top: 88px; */
}
.swiper-container {
  width: 100%;
  height: 185px;
}
.wrapper .swiper-img {
  width: 100%;
  height: 185px;
}
.swiper-pagination {
  width: 100%;
  bottom: 0;
}
::v-deep .swiper-pagination-bullet-active{
	background-color: #b0352f;
}
::v-deep .swiper-pagination-bullet{
	margin:0 3px;
}
</style>