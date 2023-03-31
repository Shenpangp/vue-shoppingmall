<template>
  <div class="wrapper">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) of swiperList" :key="index">
        <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "detail-swiper",
  props: {
    swiperList: Array,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
          type: 'fraction',
        },
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        speed: 1000,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 375px;
  /* margin-top: 88px; */
}
.swiper-container {
  width: 100%;
  height: 375px;
}
.wrapper .swiper-img {
  width: 100%;
  height: 375px;
}
.swiper-pagination {
  width: 100%;
  bottom: 0;
  text-align: center;
  color: #666;
  font-size: 12px;
}

</style>
