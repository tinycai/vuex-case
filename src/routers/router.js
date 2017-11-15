import VueRouter from "vue-router"

import Vue from "vue"

//使用Vue.use方法加载VueRouter模块
Vue.use(VueRouter)

import HelloVue from "../components/HelloVue.vue"

export default new VueRouter({
    routes: [
       {path: "/",  component: HelloVue}
    ]
});

