<template>
  <div class="footer">
        <ul>
            <li class="left">
                <i class="iconfont icon-service"></i>
                <span>客服</span>
            </li>
            <li class="left" @click="handleCart">
                <i class="iconfont icon-hot"></i>
                <span>购物车</span>
            </li>
            <li class="left">
                <i class="iconfont icon-appreciate"></i>
                <span>收藏</span>
            </li>
            <li class="cart" @click="addCart">
                加入购物车
            </li>
            <li class="buy">
                立即购买
            </li>
        </ul>
    </div>
</template>

<script>
import Http from '@/assets/tool/api/request.js'
import { Toast } from 'mint-ui'
export default {
    data() {
        return {

        }
    },
    methods: {
        // 跳转到购物车
        handleCart(){
            this.$router.push('/cart')
        },
        // 加入购物车  
        addCart() {
            Http.$axios({
                url: '/api/addCart',
                method: 'POST',
                data: {
                    goodsId: this.$route.query.id,
                },
                headers: {
                    token: true
                }
            }).then(res => {
                if(res.success){
                    Toast(res.msg)
                }
            })
        }
    }
}
</script>

<style scoped>
.footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 49px;
    border-top: 1px solid #e6dede;
    background-color: #fff;
}
.footer ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
}
.footer ul .left {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 49px;
  height: 100%;
  border-right: 1px solid #e6dede;
}
.footer ul .left i{
    font-size: 24px;
    color: #999;
}
.footer ul .left span{
    font-size: 14px;
    color: #999;
}
.footer ul .cart{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 112.5px;
    height: 100%;
    font-size: 16px;
    color: #fff;
    background-color: #ff9500;
}
.footer ul .buy{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 112.5px;
    height: 100%;
    font-size: 16px;
    color: #fff;
    background-color: #bb2727;
}
</style>