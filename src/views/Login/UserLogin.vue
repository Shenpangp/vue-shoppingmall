<template>
  <div class="login">
    <mine-header>登录</mine-header>
    <section>
      <div class="tel">
        <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]">
      </div>
      <div class="code">
        <input type="password" v-model="userPwd" placeholder="请输入密码">
      </div>
      <div class="checkin" @click="handleLogin">登录</div>
      <div class="tab">
        <span @click="handleTELLogin">短信登录</span>
        <span @click="handleFindPwd">忘记密码</span>
        <span @click="handleRegister">快速注册</span>
      </div>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import MineHeader from '../../components/Mine/MineHeader.vue'
import Tabbar from '../../components/Tabbar.vue'
import { Toast } from 'mint-ui'
import Http from '@/assets/tool/api/request.js'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      userTel: '', // 用户输入的手机号
      userPwd: '', // 用户输入的密码
      // 验证规则
      rules:{
        // 手机号验证
        userTel:{
          rule:/^1[3456789]\d{9}$/,
          msg:'手机号不能为空,并且为11为数字'
        },
        userPwd:{
          rule:/^\w{6,12}$/,
          msg:'密码不能为空,并且要求6-12位'
        }
      }  
    }
  },
  components: { MineHeader, Tabbar },
  name: 'login',
  methods: {
    ...mapMutations(['PWD_LOGIN']),
    handleTELLogin(){
      this.$router.push('/login')
    },
    handleRegister(){
      this.$router.push('/register')
    },
    handleFindPwd(){
      this.$router.push('/findpwd')
    },
    handleLogin() {
      console.log(this.userTel)
      // 前端验证
      if (!this.Validate('userTel')) return
      if (!this.Validate('userPwd')) return
      // 发送请求,后端验证
      Http.$axios({
        url: '/api/login',
        method: 'POST',
        data: {
          userTel: this.userTel,
          userPwd: this.userPwd
        }
      }).then(res => {
        //提示信息
        Toast(res.msg);
        //登录失败
        if (!res.success) return;
        // 登录成功
        this.PWD_LOGIN(res.data)
        // 跳转
        this.$router.push('./my')
      })
    },
    // 验证信息提示
    Validate(key){
      let bool = true
      if(!this.rules[key].rule.test(this[key])){
        // 提示信息
        Toast(this.rules[key].msg)
        bool = false
        return false
      }
      return bool
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 92vh;
  overflow: hidden;
}
.login section {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
}
.login section div {
  width: 335px;
  height: 44px;
  margin: 15px 0;
}
.login section div input {
  padding: 0 10px;
  line-height: 44px;
  background-color: #fff;
  border:  1px solid #ccc;
  border-radius: 5px;
  width: 93%;
}
.login section .checkin {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b0352f;
  color: #fff;
  border-radius: 5px;
}
.login section .tab {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;
}
</style>