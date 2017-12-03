<template>
  <div class="container">
      <detail :info="goodsinfo"></detail>
  </div>
</template>

<script>
import detail from "../common/Detail.vue"
import axios from "axios"

export default {
    data(){
        return {
            goodsinfo: {}
        }
    },
    components: {
        detail
    },
    created(){
        axios({
            url: "http://vue.studyit.io/api/goods/getdesc/" + this.$route.params.id
        }).then(res => {
            if(res.data.status == 0){
                this.goodsinfo = res.data.message[0];
            }
        })
    }
}
</script>

<style>

</style>
