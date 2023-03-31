<template>
  <div class="my">
    <header>
      <mine-header></mine-header>
      <div class="login" v-if="loginStatus">
        <div class="info">
          <img :src="userInfo.imgUrl">
          <p>{{userInfo.nickName}}</p>
          <button @click="CHECKOUT">退出登录</button>
        </div>
      </div>
      <div class="noLogin" v-else>
        <div @click="handleLogin">登录/注册</div>
      </div>
    </header>
    <section>
        <ul>
          <!-- 个人中心 -->
          <li>
            <h1>个人中心</h1>
            <ul>
              <li>
                <i class="iconfont icon-people"></i>
                <span>我的拼团</span>
              </li>
              <li>
                <i class="iconfont icon-people"></i>
                <span>我的收藏</span>
              </li>
              <li @click="handleAdress">
                <i class="iconfont icon-people"></i>
                <span>地址管理</span>
              </li>
            </ul>
          </li>
          <!-- 优惠福利 -->
          <li>
            <h1>优惠福利</h1>
            <ul>
              <li>
                <i class="iconfont icon-people"></i>
                <span>优惠券</span>
              </li>
            </ul>
          </li>
          <!-- 专属服务 -->
          <li>
            <h1>专属服务</h1>
            <ul>
              <li>
                <i class="iconfont icon-people"></i>
                <span>我的客服</span>
              </li>
              <li>
                <i class="iconfont icon-people"></i>
                <span>意见箱</span>
              </li>
              <li>
                <i class="iconfont icon-people"></i>
                <span>加入茶师</span>
              </li>
            </ul>
          </li>
        </ul>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import MineHeader from '../components/Mine/MineHeader.vue';
import Tabbar from '../components/Tabbar.vue';
export default {
  components: { Tabbar, MineHeader },
  name: "mine",
  data(){
    return{

    }
  },
  computed: {
    ...mapState({
      loginStatus: state => state.user.loginStatus,
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    handleAdress(){
      this.$router.push('/adress')
    },
    handleLogin(){
      this.$router.push('/login')
    },
    ...mapMutations(['CHECKOUT'])
  }
};
</script>

<style scoped>
.my {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
.my header {
  width: 100%;
  height: 156.5px;
  background-color: #b0352f;
}
.my header .noLogin {
  display: flex;
  text-align: center;
  padding: 5px 20px;
  margin: 30px 131px;
  border-radius: 4px;
  color: #fff;
  background-color: #ffb500e6;
}
.my .login .info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18.75px 12px;
}
.my .login .info img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
.my .login .info p {
  margin: 0 0 0 10px;
}
.my section{
  flex: 1;
  overflow: hidden;
}
.my section ul {
  width: 100%;
  background-color: #fff;
}
.my section ul  li h1 {
  line-height: 44px;
  padding: 0 12px;
  font-size: 14px;
  font-weight: lighter;
  color: #9e9e9e;
  border-bottom: 1px solid #e6dede;
}
.my section ul  li ul li {
  line-height: 44px;
  padding: 0 0 0 12px;
  font-size: 14px;
  font-weight: lighter;
}
</style>
