<template>
  <div class="container goods-list">
      <div class="mui-card" v-for="(item, index) in cartList" :key="index">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <mt-switch v-model="item.checked"></mt-switch>
                <img :src="item.thumb_path" class="thumb_img">
                <div class="info">
                    <h4>{{item.title}}</h4>
                    <div class="box">
                        <span class="price">￥{{item.sell_price}}</span>
                        <numberbox min="0" :goodsid="item.id" max="100" v-model="item.count" :key="index"></numberbox>
                        <a href="#" @click.prevent="del(item.id)">删除</a>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <div class="amount">
                    <p>总计（不含运费）</p>
                    <p>
                        已勾选商品
                        <span class="red">{{totalCount}}</span> 件 总价：
                        <span class="red">￥{{totalPrice}}</span>
                    </p>
                </div>
                <mt-button type="danger">去结算</mt-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import numberbox from "../common/NumberBox.vue";

import axios from "axios";

import store from "../../store/store.js";

import globalEventBus from "../../store/eventbus.js"

export default {
  data() {
    return {
      cartList: []
    };
  },
  components: {
    numberbox
  },
  methods: {
    del(id){
      //1. 删除当前页面中的cartList中对应的数据
      var index = -1;
      this.cartList.forEach((v, i)=> {
        if(v.id == id){
          index = i;
        }
      })
      this.cartList.splice(index, 1)
      //2. 删除localstorage中对应的数据
      store.deleteById(id);
      //3. 告诉App.vue购物车改变了
      globalEventBus.$emit("cartChange")
    }
  },
  created() {
    if (store.getIds()) {
      axios({
        url: "http://vue.studyit.io/api/goods/getshopcarlist/" + store.getIds()
      }).then(res => {
        if (res.data.status == 0) {
          res.data.message.forEach(v => {
            v.count = store.getCountById(v.id);
            v.checked = false;
          });
          this.cartList = res.data.message;
        }
      });
    }
  },
  computed: {
    totalCount() {
      //先在cartList中获取所有被选中的商品
      var temp = this.cartList.filter(v => v.checked);
      var result = 0;
      //遍历所有被选中的内容，将其count累加起来
      temp.forEach(v => (result += v.count));
      return result;
    },
    totalPrice() {
      //先在cartList中获取所有被选中的商品
      var temp = this.cartList.filter(v => v.checked);
      var result = 0;
      //遍历所有被选中的内容，将其count累加起来
      temp.forEach(v => (result += v.count * v.sell_price));
      return result;
    }
  }
};
</script>
<style>
.goods-list {
  padding-top: 5px;
}

.goods-list .mui-card-content-inner .thumb_img {
  width: 60px;
  height: 60px;
}

.goods-list .mui-card-content-inner .info {
  flex: 1;
}

.goods-list .mui-card-content-inner .info h4 {
  font-size: 14px;
}

.goods-list .mui-card-content-inner .info .box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-list .mui-card-content-inner .info .box .price {
  font-size: 16px;
  color: red;
}

.goods-list .mui-card-content-inner {
  display: flex;
}

.mui-card-content-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mui-card-content-inner .amount {
  flex: 1;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: bold;
}

.mui-card-content-inner .red {
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>

