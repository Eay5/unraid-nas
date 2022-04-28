/*
 * @Author: your name
 * @Date: 2022-04-28 16:48:06
 * @LastEditTime: 2022-04-28 17:55:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \unraid-nas\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css/normalize.css";
// 全局时间处理
import dayjs from "./utils/dayjs";
// import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
