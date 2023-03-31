<template>
  <div class="login">
    <mine-header>登录</mine-header>
    <section>
      <div class="tel">
        <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]">
      </div>
      <div class="identycode">
        <input type="text" placeholder="请输入图形验证码" v-model="userIdentifyCode">
        <verification-code :changeCode.sync='identifyCode'></verification-code>
      </div>
      <div class="code">
        <input type="text"  v-model="userCode" placeholder="请输入短信验证码" pattern="[0-9]">
        <button :disabled="disabled" @click='sendCode'>{{codeMsg}}</button>
      </div>
      <div class="checkin" @click="login">登录</div>
      <div class="tab">
        <span  @click="handlePwdLogin">密码登录</span>
        <span @click="handleRegister">快速注册</span>
      </div>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import MineHeader from '../../components/Mine/MineHeader.vue'
import Tabbar from '../../components/Tabbar.vue'
import Http from '@/assets/tool/api/request.js'
import { Toast } from 'mint-ui'
import VerificationCode from '../../components/VerificationCode.vue'
import { mapMutations } from 'vuex'
export default {
  data(){
    return{
      codeNum: 60,
      codeMsg:'获取短信验证码',
      disabled: false,
      userIdentifyCode: '', // 用户输入的验证码
      identifyCode:'',    // 当前生成的验证码
      code: '', // 后台返回的验证码
      userCode: '',
      userTel: '', // 用户输入的手机号
      // 验证规则
      rules:{
        // 手机号验证
        userTel:{
          rule:/^1[3456789]\d{9}$/,
          msg:'手机号不能为空,并且为11为数字'
        }
      }  
    }
  },
  components: { MineHeader, Tabbar, VerificationCode },
  name: 'login',
  methods: {
    ...mapMutations(['PWD_LOGIN']),
    handlePwdLogin(){
      this.$router.push('/userLogin')
    },
    handleRegister(){
      this.$router.push('/register')
    },
    // 发生短信验证码
    sendCode() {
      // 前端验证
      if (!this.Validate('userTel')) return
      // 图形验证码输入正确
      if (this.identifyCode == this.userIdentifyCode) {
        // 发送请求,后端验证
        Http.$axios({
          url: '/api/code',
          method: 'POST',
          data: {
            userTel: this.userTel
          }
        }).then(res => {
          if (res.success) {
            this.code = res.data
          }
        })
        // 按钮禁用
        this.disabled = true
        //倒计时
        let timer = setInterval(()=>{
          --this.codeNum;
          this.codeMsg = `重新发送 ${this.codeNum}`;
        },1000)
        //判断什么时候停止定时器
        setTimeout(()=>{
          clearInterval( timer );
          this.codeNum = 6;
          this.disabled = false;
          this.codeMsg = '获取短信验证码';
        },60000)
      }else{
        Toast('验证码输入错误')
      }
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
    },
    login(){
      // 短信验证码正确
      if(this.code == this.userCode){
        // 发送请求
        Http.$axios({
          url: '/api/addUser',
          method: 'POST',
          data: {
            phone: this.userTel
          }
        }).then(res => {
          // 登录成功
          this.PWD_LOGIN(res.data)
          // 跳转
          this.$router.push('./my')
        })
      }else{
        Toast('短信验证码错误')
      }
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
}
.login section .tel input {
  width: 93%;
}
.login section  .identycode {
  display: flex;
}
.login section  .identycode verification-code {
  width: 33%;
}
.login section  .identycode input {
  width: 60%;
}
.login section .code button{
  height: 44px;
  width: 33%;
  background-color: #b0352f;
  color: #fff;
  font-size: 14px;
  border: 0;
  border-radius: 5px;
}
.login section .code input {
  width: 60%;
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