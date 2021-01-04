import { getRequest } from "./http";
import api from "@/api";

/*
 ************************************
               菜单相关
 ************************************
 */
export const initMenu = (router, store) => {
    if (store.state.menu.length > 0) {
        return;
    }
    /* 获取菜单 */
    getRequest(api.sys.menu.treeList).then(resp => {
        /* 将菜单储存在store中 */
        store.commit("initMenu", resp);
    });
};
