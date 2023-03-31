<template>
  <div class="adress-index">
    <header>
        <adress-header>我的地址</adress-header>
    </header>
    <section>
        <ul>
            <li @click="handleEditAdress(item)" v-for="item in list" :key="item.id">
                <p>
                    <em class="name">{{item.name}}</em>
                    <em class="phone">{{ item.tel }}</em>
                </p>
                <p>
                    <span class="default" v-show="item.isDefault == 1">[默认]</span>
                    {{item.province+' '+item.city+' '+item.county+' '+item.addressDetail}}
                </p>
            </li>
        </ul>
        <div class="add" @click="handleAddAdress">添加地址</div>
    </section>
    <footer>
        <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import AdressHeader from '../../components/Adress/AdressHeader.vue'
import Tabbar from '../../components/Tabbar.vue'
import Http from '@/assets/tool/api/request.js'
import {mapState,mapMutations} from 'vuex'
export default {
  components: { AdressHeader, Tabbar },
  name: 'adress-index',
  data(){
    return {

    }
  },
  created(){
    this.getData()
  },
  computed:{
    ...mapState({
        list: state=>state.address.list
    })  
  },
  methods: {
    ...mapMutations(['INIT_ADDRESS']),
    handleAddAdress(){
        this.$router.push('/add')
    },
    handleEditAdress(option){
        // console.log(option)
        this.$router.push({
            name:'edit',
            params: {
                key: JSON.stringify(option)
            }
        })
    },
    getData(){
        Http.$axios({
        url: '/api/selectAdress',
        method: 'POST',
        headers: {
          token: true
        }
      }).then(res => {
          this.INIT_ADDRESS(res.data) 
      })
    }
  }
}
</script>

<style scoped>
.adress-index {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 94vh;
    overflow: hidden;
    background-color: #f5f5f5;
}

.adress-index section {
    flex: 1;
    overflow: hidden;
}
.adress-index section ul li{
    padding: 10px 58px 10px 12px;
    margin: 5px 0;
    background-color: #fff;
}
.adress-index section ul li p {
    font-size: 14px;
    padding: 5px;
}
.adress-index section ul li p em {
    font-weight: 700;
    font-style: normal;
    color: #333;
}
.adress-index section ul li .phone {
    margin: 0 0 0 15px;
}
.adress-index section ul li .default {
    color: #b0352f;
}
.adress-index section .add {
    display: block;
    width: 100px;
    padding: 10px 12px;
    margin: 40px 125.5px 0;
    font-size: 14px;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    background-color: #b0352f;

}
</style>