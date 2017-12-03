<template>
    <div class="container">
        <mt-swipe :auto="4000" class="swipe">
            <mt-swipe-item v-for="(item,index) in swipePics" :key="index">
                <img :src="item.img"/>
            </mt-swipe-item>
        </mt-swipe>

        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
                <router-link to="/home/newslist">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/piclist">
                    <img src="../../images/menu2.png" alt="">
                
                    <div class="mui-media-body">图片分享</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">
                    <div class="mui-media-body">商品购买</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newslist">
                    <img src="../../images/menu4.png" alt="">
                    
                    <div class="mui-media-body">留言反馈</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-"><router-link to="/home/newslist">
                    <img src="../../images/menu5.png" alt="">
                    
                    <div class="mui-media-body">视频专区</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><router-link to="/home/newslist">
                    <img src="../../images/menu6.png" alt="">
                    
                    <div class="mui-media-body">练习我们</div></router-link></li>
        </ul>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            swipePics: []
        }
    },
    created(){
        axios({
            url: "http://vue.studyit.io/api/getlunbo"
        }).then(res => {
            if(res.data.status == 0){
                this.swipePics = res.data.message;
            }
        })
    }
}
</script>
<style scoped>
    .swipe{
        height: 220px;
    }

    .mint-swipe-item img{
        width: 100%;
        height: 100%;
    }

    .mui-table-view-cell img{
        width: 80%;
    }
    
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border: none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body{
        font-size: 16px;
    }
</style>

