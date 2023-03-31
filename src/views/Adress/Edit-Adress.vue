<template>
  <div class="edit">
    <header>
        <adress-header>编辑地址</adress-header>
    </header>
    <section>
      <van-address-edit
        :address-info="addressInfo"
        :area-list="areaList"
        show-set-default
        show-delete
        @save="onSave"
        @delete="onDelete"
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
import Http from '@/assets/tool/api/request.js'
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
export default {
  components: { Tabbar, AdressHeader },
  data(){
    return{
      areaList,
      addressInfo:{}
    }
  },
  created(){
    let info = JSON.parse(this.$route.params.key)
    console.log(info)
    this.addressInfo = info
    this.addressInfo.isDefault = info.isDefault == 1 ? true : false
  },
  methods: {
    onSave(content) {
      console.log(content)
      content.isDefault = content.isDefault==true ? 1 : 0;
      Http.$axios({
        url: '/api/updateAddress',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          ...content
        }
      }).then(res => {
        if(res.success)
        Toast(res.msg)
        this.$router.push('/adress') 
      })
    },
    onDelete(content) {
      Http.$axios({
        url: '/api/deleteAddress',
        method: 'POST',
        data: {
          ...content
        }
      }).then(res => {
        if(res.success)
        Toast(res.msg)
        this.$router.push('/adress') 
      })
    }
  }
}
</script>

<style scoped>
.edit {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 94vh;
    overflow: hidden;
    background-color: #f5f5f5;
}

.edit section {
    flex: 1;
    overflow: hidden;
}
.edit section .van-address-edit {
  padding: 0;
}
.edit section .van-address-edit ::v-deep .van-address-edit__fields{
  border-radius: 0;
}
.edit section .van-address-edit ::v-deep .van-address-edit__default{
  border-radius: 0;
}
.edit section .van-address-edit ::v-deep .van-address-edit__buttons{
  padding: 32px;
}
.edit section .van-address-edit ::v-deep .van-button--danger {
  background-color: #b0352f;
  border-radius: 0;
  border: none;
}
.edit section .van-address-edit ::v-deep .van-button--normal {
  /* background-color: #b0352f; */
  border-radius: 0;
  border: none;
}
</style>