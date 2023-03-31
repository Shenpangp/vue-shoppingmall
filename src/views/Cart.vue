<template>
  <div class="cart">
    <header>
      <i class="iconfont icon-back" @click="handleBack"></i>
      <h2>购物车</h2>
      <span @click="handleEdit" v-text="isEdit ? '完成' : '编辑'"></span>
    </header>
    <section  ref="wrapper">
      <div v-if="list == false">
        <h1>没有购物车数据</h1>
        <router-link :to="'/home'">去首页逛逛吧</router-link>
      </div>
      <div v-else>
        <div class="top"><van-checkbox  @click="checkAllFn"  :value="isCheckAll">商品</van-checkbox></div>
        <ul>
          <li v-for="(item, index) in list" :key="item.id">
            <div><van-checkbox @click="CHECK_ITEM(index)" v-model="item.checked"></van-checkbox></div>
            <h2><img :src="item.goods_imgUrl"></h2>
            <div class="info"> 
              <h3>{{ item.goods_name }}</h3>
              <p>￥{{ item.goods_price }}</p>
            </div>
            <div class="operate">
              <div class="delete" @click="delGoodsFn(item.id)"><van-icon name="delete-o"/></div>
              <van-stepper @change="changeNum($event, item)" v-model="item.goods_num" integer />
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer>
      <tabbar v-if="list == false"></tabbar>
      <div class="footer" v-else>
        <div class="left">
          <van-checkbox @click='checkAllFn' :value="isCheckAll"></van-checkbox>    
        </div>
        <div class="center" v-if="isEdit"></div>
        <div class="center" v-else>
          <div>共有<span style="color: #b0352f;">{{ total.num }}</span>件商品</div>
          <div><span>总计：</span><span style="color: #b0352f;">{{ total.price }}</span><span> + </span><span style="color: #b0352f;">0茶币</span></div>
        </div>
        <div class="right" v-if="isEdit" @click="delGoodsFn">删除</div>
        <div class="right" v-else @click="handleAccount">去结算</div>
      </div>
    </footer>
  </div>
</template>

<script>
import Http from '@/assets/tool/api/request.js'
import Tabbar from '../components/Tabbar.vue';
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import BScroll from 'better-scroll';
import { Toast } from 'vant';
export default {
  data(){
    return{
      checked: false,
      BetterScroll: [],
      isEdit: false
    }
  },
  components: { Tabbar },
  name: "cart",
  computed: {
    ...mapState({
        list: state => state.cart.list,
        selectList: state => state.cart.selectList
    }),
    ...mapGetters(['isCheckAll', 'total'])
  },
  created(){
    this.getData()
  },
  mounted() {
    this.$nextTick(() => {
      this.BetterScroll = new BScroll(this.$refs.wrapper, {
      movable: true,
      zoom: true,
      click: true,
      probeType: 3,
      })
    })
  }, 
  methods: {
    ...mapMutations(['CART_LIST', 'CHECK_ITEM']),
    ...mapActions(['checkAllFn', 'delGoodsFn']),
    handleBack(){
      this.$router.back()
    },
    async getData(){
      let res = await Http.$axios({
        url: '/api/selectCart',
        method: 'POST',
        headers:{
          token: true
        }
      })
      res.forEach(v => {
        v['checked'] = 'true'
      })
      this.CART_LIST(res)
    },
    handleEdit(){
      this.isEdit = !this.isEdit
    },
    // 修改数量
    changeNum(value, item){
      // 当前购物车商品的id以及修改后的数量传递给后端
      // value 修改后的数量
      // item.id购物车商品的id
      Http.$axios({
        url: '/api/updateNum',
        method: 'POST',
        data: {
          id: item.goods_id,
          num: value
        }
      }).then(res => {
        console.log(res)
      })
    },
    handleAccount(){
      if(this.selectList.length == 0){
        Toast('请选择要结算的商品')
      }else { 
        this.$router.push('/order')
      }
    }
  }
};
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
.cart section {
  flex: 1;
  overflow: hidden;
  background-color: #f5f5f5;
}
.cart header {
  width: 100%;
  height: 44px;
  background-color: #b0352f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}
.cart header i {
  text-align: center;
  width: 34px;
  height: 34px;
  margin: 5px;
  line-height: 32px;
  font-size: 20px;
}
.cart header h2 {
  font-size: 16px;
  font-weight: normal;
}
.cart header span {
  font-size: 14px;
  padding: 12.75px 8px;
}
.cart section .top {
  height: 40px;
  padding: 10px 5px;
  display: flex;
  align-content: center;
}
.cart section ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 74px;
  padding: 10px 5px;
  border-top: 1px solid #e6dede;
}
.cart section ul li img {
  width: 74px;
  height: 74px;
}
.cart section ul li .info {
  height: 74px;
  flex: 1;
}
.cart section ul li .info h3 {
  font-size: 12px;
  font-weight: normal;
  padding: 0 5px 15px;
}
.cart section ul li .info p {
  font-size: 14px;
  color: #b0352f;
}
.cart section ul li .operate {
  height: 74px;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.cart section ul li .operate .delete {
  padding: 0 5px 15px 70px;
}
.cart footer .footer{
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
.cart footer .footer .left {
  padding:  0 10px;
}
.cart footer .footer .center {
  flex: 1;
  font-size: 14px;
}
.cart footer .footer .right {
  width: 100px;
  height: 34px;
  padding: 10px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  background-color: #b0352f;
}
</style>
