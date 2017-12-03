<template>
  <div class="container">
      <detail :info="newsinfo"></detail>
      <div class="news-comment">
        <comment :id="$route.params.id"></comment>
      </div>
  </div>
</template>

<script>
import dateformatter from "../../filters/dateformatter.js"

import axios from "axios"

import comment from "../common/Comment.vue"

import detail from "../common/Detail.vue"



export default {
  data(){
    return {
      newsinfo: {}
    }
  },
  filters:{
    dateformatter
  },
  components: {
    comment,
    detail
  },
  created(){
    axios({
      url: "http://vue.studyit.io/api/getnew/" + this.$route.params.id
    }).then(res => {
      if(res.data.status == 0){
        this.newsinfo = res.data.message[0];
      }
    })
  }
}
</script>
<style>
.news-head,.news-content,.news-comment{
  padding: 5px;
}
.news-content img{
  width: 100%;
}
.news-time{
  font-size: 12px;
}

</style>

