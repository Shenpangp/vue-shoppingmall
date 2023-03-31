import {PWD_LOGIN, INIT_USER, CHECKOUT} from './mutations-types.js'
export default {
    state: {
        // 登录状态
        loginStatus: false,
        // token
        token: null,
        // 用户信息：头像//昵称
        userInfo: {

        }
    },
    getters: {

    },
    mutations: {
        // 设置
        [PWD_LOGIN](state, user){
            state.loginStatus = true
            state.token = user.token
            state.userInfo = user
            // 持久化存储==》本地存储
            localStorage.setItem('teaUserInfo', JSON.stringify(user))
        },
        // 读取
        [INIT_USER](state){
            let teaUserInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
            if(teaUserInfo){
                state.loginStatus = true
                state.token = teaUserInfo.token
                state.userInfo = teaUserInfo
            }
        },
        // 退出登录
        [CHECKOUT](state){
            state.loginStatus = false
            state.token = null
            state.userInfo = {}
            localStorage.removeItem('teaUserInfo')
        }
    },
    actions:{

    }
}