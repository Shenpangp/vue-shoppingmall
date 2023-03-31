<template>
  <div class="add">
    <header>
        <adress-header>新增地址</adress-header>
    </header>
    <section>
      <van-address-edit
        :area-list="areaList"
        show-set-default
        @save="onSave"
      />
    </section>
    <footer>
        <tabbar></tabbar>
    </footer>
  </div>
</template>

<script>
import AdressHeader from '../../components/Adress/AdressHeader.vue'
import Tabbar from '../../components/Tabbar.vue'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import Http from '@/assets/tool/api/request.js'
export default {
  components: { Tabbar, AdressHeader },
  data(){
    return{
      areaList,
      searchResult: [],
    }
  },
  methods: {
    onSave(content) {
      console.log(content)
      content.isDefault = content.isDefault == true ? 1 : 0
      Http.$axios({
        url: '/api/addAdress',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          ...content
        }
      }).then(res => {
        if(res.success) Toast(res.msg)
          this.$router.push('/adress')   
      })
    }
  }
}
</script>

<style scoped>
.add {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 94vh;
    overflow: hidden;
    background-color: #f5f5f5;
}

.add section {
    flex: 1;
    overflow: hidden;
}
.add section .van-address-edit {
  padding: 0;
}
.add section .van-address-edit ::v-deep .van-address-edit__fields{
  border-radius: 0;
}
.add section .van-address-edit ::v-deep .van-address-edit__default{
  border-radius: 0;
}
.add section .van-address-edit ::v-deep .van-address-edit__buttons{
  padding: 32px;
}
.add section .van-address-edit ::v-deep .van-button--danger {
  background-color: #b0352f;
  border-radius: 0;
  border: none;
}
</style>