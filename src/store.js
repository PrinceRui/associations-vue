import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    router: [],
    menu: [],
    user: "",
    dict: []
  },
  mutations: {
    initRouter(state, router) {
      state.router = router;
    },
    initMenu(state, menu) {
      state.menu = menu;
    },
    initUser(state, user) {
      state.user = user;
    },
    initDict(state, dict) {
      //state.dict.push(dict);
      state.dict = dict;
    }
  },
  actions: {

  }
})
