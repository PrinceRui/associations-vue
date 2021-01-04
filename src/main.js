import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import { getRequest, jsonRequest, formRequest, uploadFileRequest, downloadRequest, downloadFile } from './utils/http'
import { Message } from 'element-ui'

Vue.config.productionTip = false

/* elementUi相关 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

/* cookie相关 */
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.getRequest = getRequest;
Vue.prototype.jsonRequest = jsonRequest;
Vue.prototype.formRequest = formRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.downloadRequest = downloadRequest;
Vue.prototype.downloadFile = downloadFile;

// 对弹出提示全局注册
Vue.prototype.message = Message;

// 字典全局封装
//Vue.prototype.getDictList = getDictList;
//Vue.prototype.getDictLabel = getDictLabel;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
