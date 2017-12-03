<template>
  <div>
      <mt-header fixed title="SH14期 Vue项目">
          <mt-button icon="back" slot="left" @click="$router.go(-1)" v-if="$route.path!='/home'">返回</mt-button>
      </mt-header>

      <router-view/>

      <nav class="mui-bar mui-bar-tab">
			<a class="mui-tab-item mui-active" @click="$router.push('/home')">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</a>
			<a class="mui-tab-item"  @click="$router.push('/member')">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</a>
			<a class="mui-tab-item" @click="$router.push('/cart')">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge">{{cartNumber}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</a>
			<a class="mui-tab-item"  @click="$router.push('/search')">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</a>
		</nav>
  </div>
</template>

<script>
import globalEventBus from "./store/eventbus.js"

import store from "./store/store.js"

export default {
	data(){
		return {
			cartNumber: 0,
		}
	},
	created(){
		globalEventBus.$on("cartChange", _ => {
			this.cartNumber = store.getAllCount();
		})

		this.cartNumber = store.getAllCount();
	}
}
</script>

<style>
html,body{
  padding: 0;
  margin: 0;
	height: 100%;
	background-color: #fff;
}

.container{
		margin-top: 40px;
		margin-bottom: 50px;
}
</style>
