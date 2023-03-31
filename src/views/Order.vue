<template>
  <div class="order">
    <header>
      <mine-header>提交订单</mine-header>
    </header>
    <section>
      <div class="body">
        <h3>收货信息：</h3>
        <div class="info">
          <p class="name">{{ addr.name }}  {{ addr.tel }}</p>
          <p class="address">{{addr.province}} {{ addr.city }} {{ addr.county }} {{ addr.addressDetail }}</p>
        </div>
        <div class="pay">
          <div class="pay-header">
            支付方式：
            <span>选择在线支付，随机减0-100元</span>
          </div>
          <div class="pay-btn">
            <span>货到付款</span>
            <span>微信支付</span>
            <span>支付宝</span>
          </div>
        </div>
        <div class="goods">
          <ul>
            <li v-for="item in Arr" :key="item.id">
              <div class="item">
                <img :src="item.goods_imgUrl" alt="" />
                <div class="item-info">
                  <a>{{item.goods_name}}</a>
                  <p class="spec">规格：无</p>
                  <p class="price">￥{{item.goods_price}}</p>
                </div>
                <a style="padding-top: 55px;">×{{item.goods_num}}</a>
              </div>
            </li>
          </ul>
          <div class="shop-total">
            <p>合计：<span>￥{{total.price}}</span></p>
          </div>
        </div>
        <h3>账单明细：</h3>
        <div class="order-info">
          <dl>
            <dt>订单总价：</dt>
            <dd>￥{{total.price}}</dd>
          </dl>
          <dl>
            <dt>优惠券：</dt>
            <dd>-￥0.00</dd>
          </dl>
          <dl>
            <dt>实付款：</dt>
            <dd class="order-price">￥{{total.price}}</dd>
          </dl>
        </div>
      </div>
    </section>
    <footer>
      <div class="footer">
        <div class="center">
          <div>共<span style="color: #b0352f;">{{ total.num }} </span>件 ,<span>总金额：</span><span
              style="color: #b0352f;font-size: 18px;">￥{{ total.price }}</span></div>
        </div>
        <div class="right">提交订单</div>
      </div>
    </footer>
  </div>
</template>

<script>
import MineHeader from '@/components/Mine/MineHeader.vue'
import Http from '@/assets/tool/api/request.js'
import { mapState,mapGetters,mapMutations } from 'vuex';
export default {
  data () {
    return {
      addr: {},
      Arr:[]
    }
  },
  components: { MineHeader },
  computed: {
    ...mapState({
        list: state => state.cart.list,
        selectList: state => state.cart.selectList
    }),
    ...mapGetters(['total','defaultAddress']),
  },
  created() {
    this.getData()
    this.goodsList()
  },
  methods: {
    ...mapMutations(['INIT_ADDRESS']),
    getData() {
      Http.$axios({
        url: '/api/selectAdress',
        method: 'POST',
        headers: {
          token: true
        }
      }).then(res => {
        this.INIT_ADDRESS(res.data)
        //有默认收货地址
        if (this.defaultAddress.length) {
          this.addr = this.defaultAddress[0];
        } else {
          this.addr = res.data[0];
        }
      })
    },
    goodsList(){
      // console.log(this.selectList.map(v => v))
      // this.selectList.map(v => v).forEach(i => console.log(i))
      for(let i in this.selectList){
        this.Arr.push(this.list.find(v => v.id == this.selectList[i]))
      }
      console.log(this.Arr)
    },
  }
}
</script>

<style>
.order {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
.order section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}
.order section .body h3 {
  font-size: 14px;
  font-weight: 400;
  padding: 8px 15px;
}
.order section .body div {
  /* width: 100%; */
  background-color: #fff;
}
.order section .info {
  padding: 10px 15px;
  margin: 0 0 10px 0;
}
.order section .info p {
  font-size: 14px;
  color: #222;
}
.order section .info .name {
  padding: 0 0 5px;
}
.order section .pay {
  padding: 10px 15px;
  margin: 0 0 10px 0;
}
.order section .pay div {
  padding: 0;
  margin: 0;
  font-size: 14px;
}
.order section .pay .pay-header {
  padding: 0 0 10px;
}
.order section .pay .pay-header span {
  color: #b0352f;
}
.order section .pay .pay-btn {
  display: flex;
}
.order section .pay .pay-btn span {
  height: 30px;
  line-height: 30px;
  padding: 0 4px;
  margin: 0 10px 0 0;
  display: inline-block;
  float: left;
  border: 1px solid #ccd1d9;
}
.order section .goods ul li .item {
  padding: 10px 15px;
  display: flex;
  border-bottom: 1px solid #ccd1d9 ;
}
.order section .goods ul li img{
  width: 74px;
  height: 74px;
}
.order section .goods ul li .item-info {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0 45px 0 10px;
  margin: 0;
  font-size: 12px;
}
.order section .goods ul li .item-info a {
  padding: 0 0 18px 0;
}
.order section .goods ul li .item-info .spec {
  color: #999;
  margin: 4px 0;
}
.order section .goods ul li .item-info .price {
  color: #b0352f;
  font-size: 14px;
}
.order section .goods ul li .item-info .num {
  padding: 0;
  margin: 0;
}
.order section .goods .shop-total {
  display: flex;
  justify-content: right;
  padding: 10px 15px;
}
.order section .goods .shop-total p {
  font-size: 12px;
  font-weight: 400;
  color: #666;
}
.order section .goods .shop-total p span {
  font-size: 14px;
  font-weight: 700;
  color: #b0352f;
}
.order section .order-info {
  padding-bottom: 10px;
}
.order section .order-info dl {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px 0;
  font-size: 14px;
}
.order section .order-info dl dt {
  font-size: 14px;
  color: #999;
}
.order section .order-info dl .order-price {
  color: #b0352f;
}
.order footer .footer{
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 54px;
  background-color: #fff;
  border-top: 1px solid #e6dede;
}
.order footer .footer .center {
  flex: 1;
  font-size: 14px;
  padding-left: 15px;
}
.order footer .footer .right {
  width: 100px;
  height: 34px;
  padding: 10px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  background-color: #b0352f;
}
</style>