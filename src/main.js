import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require("./assets/img/loading.gif"),
  loading: require("./assets/img/loading.gif"),
});

//全局路由守卫，没有登录就不可访问页面
// router.beforeEach((to, from, next) => {});

new Vue({
  //注册全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
