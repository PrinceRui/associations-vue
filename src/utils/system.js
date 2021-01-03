import Vue from "vue";
import {
    formRequest,
    getRequest
} from "./http";
import api from "@/api";
import store from "@/store";

/*
 ************************************
               菜单相关
 ************************************
 */
export const initMenu = (router, store) => {
    if (store.state.router.length > 0 && store.state.menu.length > 0) {
        return;
    }
    /* 获取菜单 */
    getRequest(api.sys.menu.treeList).then(resp => {
        store.commit("initMenu", resp);
    });
    /* 获取路由 */
    getRequest(api.sys.menu.list).then(resp => {
        var fmtRoutes = formatRoutes(resp);
        router.addRoutes(fmtRoutes);
        const notFoundRoutes = [
            {
                path: "*",
                redirect: "/404",
                hidden: true
            }
        ];
        router.addRoutes(notFoundRoutes);
        store.commit("initRouter", fmtRoutes);
    });
};

/**
 * 格式化路由
 */
export const formatRoutes = routes => {
    let fmRoutes = [];
    routes.forEach(router => {
        let {
            path,
            name,
            component
        } = router;
        let fmRouter = {
            path: path,
            name: name,
            component(resolve) {
                require(["@/views" + component + ".vue"], resolve);
            }
        };
        fmRoutes.push(fmRouter);
    });
    return fmRoutes;
};


/*
 ************************************
               store相关
 ************************************
 */
export const resetStroe = () => {
    store.commit("initRouter", []);
    store.commit("initMenu", []);
    store.commit("initUser", "");
    store.commit("initDict", []);
};
