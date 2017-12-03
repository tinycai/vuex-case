<template>
  <div>
      <h4>发表评论:</h4>
      <hr>
      <textarea name="" id="" v-model="postContent" cols="30" rows="10"></textarea>
      <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item, index) in commentList" :key="index">
					<a href="javascript:;">
            <p class="comment-tilte">
              <span>第{{index + 1}}楼</span>
              <span>发表时间：{{item.add_time | dateformatter("YYYY-MM-DD HH:mm:ss")}}</span>
              <span class="mui-pull-right">
							  {{item.user_name}}   
              </span>
            </p>
						<img class="mui-media-object mui-pull-right" :src="'../../images/menu' + Math.floor(Math.random() * 6 + 1) + '.png'">
						<div class="mui-media-body">
							<p class="mui-ellipsis comment-content">{{item.content}}</p>
						</div>
					</a>
        </li>
			</ul>
      <mt-button type="danger" v-if="isShowMoreBtn" plain size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import axios from "axios"
import dateformatter from "../../filters/dateformatter.js"

import { Toast } from 'mint-ui';

export default {
  data(){
    return {
      commentList: [],
      pageIndex: 1,
      isShowMoreBtn: true,
      postContent: ""
    }
  },
  filters: {
    dateformatter
  },
  methods: {
    getData(){
      axios({
        url: "http://vue.studyit.io/api/getcomments/" + this.id +"?pageindex=" + this.pageIndex
      }).then(res => {
        if(res.data.status == 0){
          if(res.data.message.length > 0){
            this.commentList = this.commentList.concat(res.data.message);
          }else{
            this.isShowMoreBtn = false;
            Toast("没有更多数据了！")
          }
        }
      })
    },
    loadMore(){
      //让页码 +1
      this.pageIndex ++;
      //重新请求数据
      this.getData();
    },
    postComment(){
      if(this.postContent.trim()){
        axios({
          url: "http://vue.studyit.io/api/postcomment/" + this.id,
          method: "post",
          data: "content=" + this.postContent
        }).then(res => {
          if(res.data.status == 0){
            this.commentList.unshift({
              user_name: "匿名用户",
              add_time: new Date(),
              content: this.postContent
            })
            this.postContent = "";
          }
        })

      }
    }
  },
  created(){
    this.getData();
  },
  props: ["id"]
}
</script>

<style scoped>
 textarea{
   height: 150px;
   margin-bottom: 0;
 }
 .comment-tilte{
   /* border-bottom: 1px solid #ccc; */
   margin-bottom: 10px;
 }

 .comment-content{
   text-indent: 2em;
 }
</style>
