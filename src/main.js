import Vue from "vue";

//引入根组件
import App from "./App.vue"

import router from "./routers/router.js"

//引入mint-ui插件
import MintUI from "mint-ui"
//引入mint-ui的css样式
import "mint-ui/lib/style.css"

//安装mint-ui插件
Vue.use(MintUI);


//引入mui的样式文件
import "./lib/mui/css/mui.css"
//引入mui的扩展图标的样式
import "./lib/mui/css/icons-extra.css"

import "./lib/mui/js/mui.js"


var vm = new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: {App}
})