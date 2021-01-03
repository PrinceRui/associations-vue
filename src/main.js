import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import { getRequest, jsonRequest, formRequest, uploadFileRequest, downloadRequest, downloadFile } from './utils/http'
import { initMenu } from './utils/system'

Vue.config.productionTip = false

Vue.use(ElementUI);

// 对后端接口 进行全局注册
Vue.prototype.$api = api;
// 对请求方式 进行全局注册
Vue.prototype.getRequest = getRequest;
Vue.prototype.jsonRequest = jsonRequest;
Vue.prototype.formRequest = formRequest;
Vue.prototype.uploadFileRequest = uploadFileRequest;
Vue.prototype.downloadRequest = downloadRequest;
Vue.prototype.downloadFile = downloadFile;

// 字典全局封装
//Vue.prototype.getDictList = getDictList;
//Vue.prototype.getDictLabel = getDictLabel;

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
