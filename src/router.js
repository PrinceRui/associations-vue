import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import {initMenu} from "@/utils/system";
import store from "@/store";
import { getToken } from "@/utils/auth";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/',
      name: '首页',
      component: Home
    },
    {
      path: '/error',
      name: '系统错误页面',
      component: function () {
        return import('./views/error')
      },
      meta: {
        isError: true
      }
    },
    {
      path: "*",
      name: '404',
      component: function () {
        return import('@/views/error/404')
      },
      meta: {
        isError: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (to.name == "login") {
    next();
    return;
  }
  /*initMenu(router, store);
  next();*/
  if (getToken() == undefined || getToken() === '') {
    //if (to.meta.requireAuth || to.name == null) {
      next({path: "/login"});
    //} else {
    //  next();
      // NProgress.done()
    //}
  } else {
    initMenu(router, store);
    next();
    // NProgress.done()
  }
});

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})

export default router;
