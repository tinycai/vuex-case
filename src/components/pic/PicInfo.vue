<template>
  <div class="container">
      <detail :info="picInfo">
          <div slot="imgs" class="thumbs">
              <img class="preview-img" v-for="(item, index) in imgs" :key="index" :src="item.src" @click="$preview.open(index, imgs)">
          </div>
      </detail>

      <comment :id="$route.params.id"></comment>
  </div>
</template>

<script>
import Vue from "vue"
import VuePreview from "vue-preview"
Vue.use(VuePreview);

import detail from "../common/Detail.vue"
import comment from "../common/Comment.vue"

import axios from "axios"
export default {
    data(){
        return {
            picInfo: {},
            imgs: []
        }
    },
    methods: {
        getPicInfo(){
             axios({
                url: "http://vue.studyit.io/api/getimageInfo/" + this.$route.params.id
            }).then(res => {
                if(res.data.status == 0){
                    this.picInfo = res.data.message[0]
                }
            })
        },
        getImgList(){
            axios({
                url: "http://vue.studyit.io/api/getthumimages/" + this.$route.params.id
            }).then(res => {
                if(res.data.status == 0){
                    this.imgs = res.data.message.map(v => {
                        v.h = 400;
                        v.w = 600;
                        return v;
                    })
                }
            })
        }
    },
    created(){
       this.getImgList();
       this.getPicInfo();
    },
    components: {
        detail,
        comment
    }
}
</script>

<style>
    .thumbs img{
        width: 22%;
        margin: 0 5px;
        box-shadow: 0 0 15px #999
    }
    .container{
        padding:10px;
    }
</style>
