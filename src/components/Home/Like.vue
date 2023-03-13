<template>
    <div class="like">
        <card>
            <span>猜你喜欢</span>
        </card>
            <ul>
                <li v-for="item in likeList" :key="item.id">
                    <h2>
                        <img v-lazy="item.imgUrl" />
                    </h2>
                    <h3>{{ item.name }}</h3>
                    <div class="price">
                        <span>￥</span>
                        <b>{{ item.price }}</b>
                    </div>
                </li>
            </ul>
    </div>
</template>

<script scoped>
import card from '../card.vue'
export default {
    props: {
        likeList: Array
    },
    data () {
        return {
            
        }
    },
  components: { card },

}
</script>

<style scoped>
.like ul {
    display: flex;
    flex-wrap: wrap;
}
.like ul li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 45%;
    margin: 7.5px;
}
.like h3 {
    width: 100%;
    font-size: 15px;
    font-weight: normal;
    color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.like img {
    width: 176.25px;
    height: 176.25px;
}
.like image[lazy=loading] {
  width: 176.25px;
  height: 176.25px;
  background-color: #7c7676;
}
.price {
    color: #f7f7f7;
}
.price span {
    font-size: 12.75px;
}
.price b {
    font-size: 18.75px;
    font-weight: normal;
}
</style>