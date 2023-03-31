<template>
    <div class="register">
        <mine-header>注册</mine-header>
        <section>
            <div class="tel">
                <input type="text" v-model="userTel" placeholder="请输入手机号" pattern="[0-9]">
            </div>
            <div class="identycode">
                <input type="text" placeholder="请输入图形验证码" v-model="userIdentifyCode">
                <verification-code :changeCode.sync='identifyCode'></verification-code>
            </div>
            <div class="code">
                <input type="text" v-model="userCode" placeholder="请输入短信验证码" pattern="[0-9]">
                <button @click="sendCode">获取短信验证码</button>
            </div>
            <div class="pwd">
                <input type="password" v-model="firstPwd" placeholder="请设置密码">
            </div>
            <div class="pwd">
                <input type="password" v-model="secondPwd" placeholder="请再次确认输入的密码">
            </div>
            <div class="checkin" @click="register">注册</div>
            <div class="tab">
                <span>注册即视为同意<a href="">《用户协议》</a></span>
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
export default {
    data() {
        return {
            firstPwd: '', // 用户第一遍输入的密码
            secondPwd: '', // 用户第二遍输入的密码
            userIdentifyCode: '', // 用户输入的验证码
            identifyCode: '',    //当前生成的验证码
            code: '', // 后台返回的验证码
            userCode: '', // 用户输入的手机验证码
            userTel: '', // 用户输入的手机号
            // 验证规则
            rules: {
                // 手机号验证
                userTel: {
                    rule: /^1[3456789]\d{9}$/,
                    msg: '手机号不能为空,并且为11为数字'
                },
                firstPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空,并且要求6-12位'
                },
                secondPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空,并且要求6-12位'
                }
            }
        }
    },
    components: { MineHeader, Tabbar, VerificationCode },
    name: 'register',
    methods: {
        // 发生短信验证码
        sendCode() {
            console.log(this.identifyCode)
            console.log(this.userIdentifyCode)
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
                    //提示信息
                    Toast(res.msg);
                    //登录失败
                    if (!res.succcess) return;
                    // 登录成功
                })
            } else {
                Toast('验证码输入错误')
            }
        },
        // 验证信息提示
        Validate(key) {
            let bool = true
            if (!this.rules[key].rule.test(this[key])) {
                // 提示信息
                Toast(this.rules[key].msg)
                bool = false
                return false
            }
            return bool
        },
        register() {
            if (!this.Validate('userTel')) return
            // 短信验证码正确
            if (this.code == this.userCode && this.code != '') {
                // 验证密码格式
                if (this.Validate('firstPwd') &&
                    this.Validate('secondPwd') &&
                    this.firstPwd == this.secondPwd) {
                    Http.$axios({
                        url: '/api/register',
                        method: 'POST',
                        data: {
                            phone: this.userTel,
                            pwd: this.firstPwd
                        }
                    }).then(res => {
                        Toast(res.msg)
                    })
                } else {
                    Toast('密码格式有误或两次密码不一致错误')
                }
            } else {
                Toast('短信验证码输入错误')
            }
        }
    }
}
</script>
  
<style scoped>
.register {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 92vh;
    overflow: hidden;
}

.register section {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
}

.register section div {
    width: 335px;
    height: 44px;
    margin: 15px 0;
}

.register section div input {
    padding: 0 10px;
    line-height: 44px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.register section .tel input {
    width: 93%;
}

.register section .identycode {
    display: flex;
}

.register section .identycode input {
    width: 60%;
}

.register section .pwd input {
    width: 93%;
}

.register section .code button {
    height: 44px;
    width: 33%;
    background-color: #b0352f;
    color: #fff;
    border: 0;
    font-size: 14px;
    border-radius: 5px;
}

.register section .code input {
    width: 60%;
}

.register section .checkin {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b0352f;
    color: #fff;
    border-radius: 5px;
}

.register section .tab {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-weight: 500;
}
</style>