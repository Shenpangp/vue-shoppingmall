import { Toast, Dialog } from "vant"
import { CART_LIST, CHECKALL, CHECK_ITEM, UNCHECKALL } from "./mutations-types"
import Http from '@/assets/tool/api/request.js'
export default {
    state: {
        list:[], // 购物车数据
        selectList: [] // 选中的商品
    },
    getters: {
        isCheckAll(state){
            return state.list.length == state.selectList.length
        },
        total(state){
            let total = {
                num: 0,
                price: 0
            }
            state.list.forEach(v => {
                if(v.checked){
                    total.num += v.goods_num
                    total.price += v.goods_num * v.goods_price 
                }
            })
            return total
        }
    },
    mutations: {
        [CART_LIST](state, cartArr){
            state.list = cartArr
            cartArr.forEach(v => {
                state.selectList.push(v.id)
            })
            // 去重
            state.selectList = Array.from(new Set(state.selectList))
        },
        // 全选
        [CHECKALL](state){
            state.selectList = state.list.map(v => {
                v.checked = true
                return v.id
            })
        },
        // 全不选
        [UNCHECKALL](state){
            state.list.forEach(v => {
                v.checked = false
            })
            state.selectList = []
        },
        [CHECK_ITEM](state, index){
            console.log(state.list[index])
            let id = state.list[index].id
            let i = state.selectList.indexOf(id)
            // 能在selectList找到对应的id，就删除
            if(i > -1){
                return state.selectList.splice(i, 1)
            }else{ // 如果之前没有选中，就新增
                state.selectList.push(id)
            }
        },
        // 删除
        delGoods( state ){
            state.list = state.list.filter(v=>{
                return state.selectList.indexOf( v.id ) == -1
            })
        }
    },
    actions:{
        checkAllFn({commit,getters}){
            getters.isCheckAll ? commit('unCheckAll') : commit('checkAll')
        },
        // 删除操作
        delGoodsFn({ commit, state }, id) {
            let arrCart = [];
            //如果没有选中，则提示信息
            if (state.selectList.length == 0) {
                Toast('请选择商品');
            } else {
                Dialog.confirm({
                    message: '确定要删除这些商品吗？',
                }).then(() => {
                    if (typeof id == 'number') {
                        //当个删除
                        arrCart = [id];
                        let index = state.list.findIndex(v => {
                            return v.id == id
                        })
                        state.list.splice(index, 1);
                        state.selectList.splice(index, 1);
                    } else {
                        //多选删除
                        arrCart = state.selectList;
                        commit('delGoods');
                        //全不选
                        // commit('unCheckAll');
                    }
                    Http.$axios({
                        url: '/api/deleteCart',
                        method: 'post',
                        data: {
                            arrId: arrCart
                        }
                    }).then(res => {
                        Toast(res.msg)
                    })
                })
            }
        }
    }
}
