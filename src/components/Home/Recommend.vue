<template>
    <div class="recommend">
		<card>
			<span>爆款推荐</span>
		</card>
        <ul>
            <li v-for='(item, index) in recommendList' :key='index'>
                <h2>
                    <img :src="item.imgUrl" alt="">
                </h2>
                <div>
                    <h3>{{ item.name }}</h3>
                    <p>{{ item.content }}</p>
                    <div class='price'>
                        <span>¥</span>
                        <b>{{ item.price }}</b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import card from '../card.vue'
export default {
  	props: {
		recommendList: Array
	},
    data () {
        return {
            
        }
    },
	components: { card }
}
</script>

<style scoped>
.recommend ul li{
	position: relative;
}
.recommend ul li h2{
	text-align: center;
}
.recommend ul li img{
	width: 360px;
	height: 144px;
	border-radius: 12px;
}
.recommend ul li > div{
	position: absolute;
	right:0;
	top:0;
}
.recommend ul li > div{
	position: absolute;
	right:0;
	top:0;
	display: flex;
	flex-direction: column;
	padding: 20px;
}
.recommend ul li > div h3{
    position: absolute;
    top: 5px;
    right: 17.5px;
	font-size:12.75px;
    color: #666;
}
.recommend ul li > div p{
	font-size: 15px;
    padding: 5px 0;
}
.price{
	margin-top: 15px;
	text-align: right;
	color:#b0352f;
    font-size: 16px;
}
.price span{
	font-size: 10px;
}
</style>