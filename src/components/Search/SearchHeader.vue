<template>
    <div class="search-header">
        <div class="back">
            <i class="iconfont icon-back" @click="handleBack"></i>
        </div>
        <div class="input">
            <i class="iconfont  icon-search"></i>
            <form action="" onsubmit="return false" @keyup.enter="handleSearchBtn">
                <input type="text" placeholder="搜您喜欢的..." v-model="searchValue">
            </form>
        </div>
        <div class="search" @click="handleSearchBtn()">
            <span>搜索</span>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchValue: this.$route.query.key || '',
            searchArr: []
        }
    },
    methods: {
        handleBack () {
            if(!this.$route.query.key){
                this.$router.push("/")
            } else {
                this.$router.push('/search')
            }
        },
        handleSearchBtn () {
            // 如果搜索关键字是没有的，直接return
            if( !this.searchValue ) return
            // 判断之前有没有搜索的本地存储
            if( !localStorage.getItem('searchList')){
                // 没有
                localStorage.setItem('searchList', '[]')
            }else {
                //之前有
                this.searchArr = JSON.parse(localStorage.getItem('searchList'))
            }
            // 增加数据
            this.searchArr.unshift(this.searchValue)
            // 去重
            let newArr = new Set(this.searchArr)
            // 给本地存储赋值
            localStorage.setItem('searchList', JSON.stringify(Array.from(newArr)))
            // 如果路径没有变化，不跳转页面
            if(this.searchValue === this.$route.query.key) return
            // 跳转页面
            this.$router.push({
                name: 'searchlist',
                query: {
                    key: this.searchValue
                }
            })
        }
    }
    
}
</script>

<style scoped>
.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 44px;
    color: #FFFFFF;
    background-color: #b0352f;
}

/* .search-header .back {
    width: 44px;
    height: 44px;
} */
.search-header .back i {
    font-size: 25px;
    padding: 9.5px;
}
.search-header .input {
    display: flex;
    align-items: center;
    width: 280px;
    height: 30px;
    background-color: #FFFFFF;
    border-radius: 12px;
}

.search-header .input i {
    font-size: 16px;
    color: #666;
    padding: 5px;
}

.search-header .input form input {
    display: flex;
    justify-content: center;
    width: 230px;
    height: 30px;
    padding: 0 5px;
}

.search-header .search {
    width: 44px;
    height: 44px;
    font-size: 16px;
}

.search-header .search span{
    padding: 11.5px 6px;
}</style>