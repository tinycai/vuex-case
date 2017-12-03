<template>
  <div class="container">
        <transition @before-enter="beforeEnter" @enter="enter">
            <div class="red-ball" v-if="isShowBall"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="(item, index) in pics" :key="index">
                            <img :src="item.src">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span>市场价：
                            <del>￥{{goodsInfo.market_price}}</del>
                        </span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>销售价：
                            <span class="sale_price">￥{{goodsInfo.sell_price}}</span>
                        </span>
                    </div>
                    <div class="count">
                        <span>购买数量：</span>
                        <number-box v-model="count" :min="0" :max="10"></number-box>
                    </div>
                    <div class="btns">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}件</p>
                    <p>上架时间：{{goodsInfo.add_time | dateformatter("YYYY-MM-DD HH:mm:ss")}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large" @click="$router.push('/home/goodsdesc/' + $route.params.id)">图文介绍</mt-button>
                <br>
                <mt-button type="danger" plain size="large" @click="$router.push('/home/goodscomment/' + $route.params.id)">商品评论</mt-button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
import dateformatter from "../../filters/dateformatter.js";
import NumberBox from "../common/NumberBox.vue";

import globalEventBus from "../../store/eventbus.js";
import store from "../../store/store.js";

export default {
  data() {
    return {
      pics: [],
      goodsInfo: {},
      isShowBall: false,
      count: 0
    };
  },
  components: {
    "number-box": NumberBox
  },
  created() {
    this.getLunbo();
    this.getGoodsInfo();
  },
  filters: {
    dateformatter
  },
  methods: {
    //当numberbox内容发生变化的时候，就会调用这个方法
    // getCount(cart) {
    //   // alert("数字改变了" + number);
    //   //动物园里有小西几  小脑斧  小白去  大莽鞋  小福泥  小松许 大飞囊 大lai流
    //   this.count = cart.count;
    // },
    getLunbo() {
      axios({
        url: "http://vue.studyit.io/api/getthumimages/" + this.$route.params.id
      }).then(res => {
        if (res.data.status == 0) {
          this.pics = res.data.message;
        }
      });
    },
    getGoodsInfo() {
      axios({
        url: "http://vue.studyit.io/api/goods/getinfo/" + this.$route.params.id
      }).then(res => {
        if (res.data.status == 0) {
          this.goodsInfo = res.data.message[0];
        }
      });
    },
    beforeEnter(el) {
      el.style.top = "400px";
      el.style.left = "150px";
    },
    enter(el) {
      el.offsetWidth;
      el.style.transition = "all .4s cubic-bezier(0.29, -0.38, 1, 0.68)";
      el.style.top = 580 + window.scrollY + "px";
      el.style.left = "237px";
      this.isShowBall = false;
    },
    addToCart() {
      //1. 让小球显示
      this.isShowBall = true;
      //2. 要将当前的购物车信息存储到 localstorage中去
      store.addToCarts({
        id: this.$route.params.id,
        count: this.count
      });

      //3. 通知App.vue carts的内容更新了
      globalEventBus.$emit("cartChange");
    }
  }
};
</script>

<style>
.red-ball {
  width: 15px;
  height: 15px;
  background-color: red;
  position: absolute;
  border-radius: 50%;
  top: 400px;
  z-index: 999;
  left: 150px;
}

.container {
  padding-top: 5px;
  position: relative;
}
.mint-swipe {
  height: 180px;
}
.mint-swipe-item {
  text-align: center;
}
.mint-swipe-item img {
  height: 100%;
}

.mui-card-content-inner span {
  line-height: 3;
}

.sale_price {
  color: red;
  font-size: 18px;
}

.mui-card-header,
.mui-card-footer {
  display: block;
}
</style>
