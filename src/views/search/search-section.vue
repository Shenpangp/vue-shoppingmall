<template>
  <div class="search">
    <search-header></search-header>
    <section>
      <div class="history-search" v-if="searchArr.length">
        <div class="hd">
          <i class="iconfont icon-time"></i>
          <span>历史搜索</span>
          <span class="delete" @click="handleDelete">清空搜索记录</span>
        </div>
        <ul>
          <li v-for="item in searchArr" :key="item" @click="handleHistorySearch(item)">{{item}}</li>
        </ul>
      </div>
      <div class="recommend">
        <div class="hd">
          <i class="icon icon-hot"></i>
          <span>推荐商品</span>
        </div>

      </div>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import SearchHeader from '@/components/Search/SearchHeader.vue'
import Tabbar from '@/components/Tabbar.vue'
export default {
  name: 'search-section',
  data () {
    return {
      searchArr: []
    }
  },
  components: { 
    SearchHeader,
    Tabbar
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem('searchList')) || []
  },
  methods: {
    handleDelete(){
      localStorage.removeItem('searchList')
      this.searchArr = []
    },
    handleHistorySearch(item){
      this.$router.push({
        name: 'searchlist',
        query: {
          key: item
        }
      })
    }
  }
}
</script>

<style scoped>
.search {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  background-color: #f5f5f5;
  overflow: hidden;
}
.history-search {
  padding: 15px;
}
.history-search .hd {
  position: relative;
  height: 30px;
  width: 300px;
  font-size: 18px;
  padding: 0 20px;

}
.history-search .hd i {
  color: #b0352f;
}
.history-search .hd .delete{
	position: absolute;
	right: 10px;
	
}
.history-search ul {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
}
.history-search ul li {
  padding: 3px 6px;
  margin: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
}
.recommend {
  padding: 15px;
}
.recommend .hd {
  height: 30px;
  width: 300px;
  font-size: 18px;
  padding: 0 20px;

}
.recommend .hd i {
  color: #b0352f;
}
</style>