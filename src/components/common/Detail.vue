<template>
   <div>
        <div class="news-head">
            <h4>{{info.title}}</h4>
            <p class='mui-ellipsis news-time '>
                <span>发布时间: {{info.add_time | dateformatter("YYYY-MM-DD HH:mm:ss")}}</span>
                <span class="mui-pull-right">点击：{{info.click}}次</span>
            </p>
            <hr>
        </div>
        <slot name="imgs"></slot>
        <div class="news-content">
            <p v-html="info.content"></p>
        </div>
    </div>
</template>

<script>
import dateformatter from "../../filters/dateformatter.js"

export default {
  props: ["info"],
  filters:{
      dateformatter
  }
}
</script>

<style>
.news-content img{
    width:100%;
}

.news-content table{
    width: 100% !important;
}
</style>


