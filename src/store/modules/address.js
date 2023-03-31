import { INIT_ADDRESS } from './mutations-types.js'
export default {
    state: {
        list:[]
    },
    getters: {
        defaultAddress( state ){
            return state.list.filter(v=>{
                return v.isDefault == 1;
            })
        }
    },
    mutations: {
        [INIT_ADDRESS]( state , arrAddress ){
            state.list = arrAddress;
        }
    },
    actions:{

    }
}