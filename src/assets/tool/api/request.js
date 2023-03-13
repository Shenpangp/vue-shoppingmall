// import { Indicator } from 'mint-ui';
import axios from 'axios';
import { Indicators } from 'better-scroll';
export default {
    common: {
        method: 'GET',
        data: {},
        params: {}
    },
    $axios(options={}){
        options.method = options.method || this.common.method
        options.data = options.data || this.common.data
        options.params = options.params || this.common.params

        // 请求前 ==》 显示加载中。。。
        // Indicator.open()

        return axios(options).then( v => {
            let data = v.data.data
            return new Promise((res, rej) => {
                if(!v) return rej()
                // 结束 ==》关闭加载中。。。
                // setTimeout(() => {
                //     Indicators.close()
                // }, 500)
                res(data)
            })
        })
    }
}