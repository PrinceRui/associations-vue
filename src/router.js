import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import {initMenu} from "@/utils/system";
import store from "@/store";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/home',
      name: '首页',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {

  // NProgress.start()

  if (to.name == "login") {
    next();
    return;
  }
  initMenu(router, store);
  next();
  /*if (getToken() == undefined) {
    if (to.meta.requireAuth || to.name == null) {
      next({path: "/", query: {redirect: to.path}});
    } else {
      next();
      // NProgress.done()
    }
  } else {
    initMenu(router, store);
    next();
    // NProgress.done()
  }*/
});

router.afterEach(() => {
  // NProgress.done() // finish progress bar
})

export default router;
