<template>
  <div class="container">
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a class="mui-control-item mui-active" @click="$router.push('/home/piclist')" data-wid="tab-top-subpage-1.html">
                        全部
                    </a>

                    <a v-for="(item, index) in categories" :key="index" class="mui-control-item" @click="$router.push('/home/piclist/' + item.id)" data-wid="tab-top-subpage-1.html">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <ul class="img-list">
            <li v-for="(item, index) in picList" :key="index" @click="$router.push('/home/picinfo/' + item.id)">
                <img class="pic-item" alt="" v-lazy="item.img_url">
                <div class="img-info">
                    <h4>
                        {{item.title}}
                    </h4>
                    {{item.zhaiyao}}
                </div>
            </li>
        </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      categories: [],
      picList: []
    };
  },
  created() {
      this.getCategoryData();
      this.getData();
  },
  methods: {
    getCategoryData() {
      axios({
        url: "http://vue.studyit.io/api/getimgcategory"
      }).then(res => {
        if (res.data.status == 0) {
          this.categories = res.data.message;
        }
      });
    },
    getData(){
        axios({
            url: "http://vue.studyit.io/api/getimages/" + (this.$route.params.id || 0)
        }).then(res => {
            if(res.data.status == 0){
                this.picList = res.data.message;
                // console.log(this.picList);
            }
        })
    }
  },
  watch: {
      "$route": function(){
          this.getData();
      }
  }
};
</script>

<style>


.mui-slider {
  position: relative;
  z-index: 0;
  overflow: hidden;
  width: 100%;
}
.img-list{
    list-style: none;
    padding: 10px;
}

.img-list li{
    box-shadow: 0 0 15px 3px #666;
    margin-bottom: 10px;
    position: relative;
    background-color: #ccc;
    text-align: center;
}

.img-list li .pic-item{
    width: 100%;
}

.img-list .img-info{
    color: white;
    background-color: rgba(0, 0, 0, .3);
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 14px;
    width: 100%;
    padding-bottom: 10px;
}

.img-list h4{
    font-size: 16px;
}

img[lazy=loading] {
  width: 40px !important;
  height: 300px;
  margin: 0 auto;
}
</style>
