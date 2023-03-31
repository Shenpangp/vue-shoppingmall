<template>
  <div class="icons">
    <ul>
      <li v-for="item in iconsList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script scoped>
export default {
  props: {
    iconsList: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.icons {
  padding: 15px 0;
  display: flex;
  justify-content: space-around;
}
.icons ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.icons ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.icons img {
  width: 37.5px;
  height: 37.5px;
}
.icons span {
  padding: 5px;
  font-size: 16px;
}
</style>
