import Vue from "vue";
import VueRouter from "vue-router";
import wechatAuth from "@/utils/wechatAuth";
import { returnBrowserEnvFlag } from "@/utils/env";
import Home from "../views/Home.vue";
import { setToken } from "@/utils/auth";

let wechatPlugin = new wechatAuth();

Vue.use(VueRouter);

const flag = returnBrowserEnvFlag();

const routes = [
    {
        path: "/home",
        name: "Home",
        meta: {
            wechatAuth: true // 如果此路由需要微信授权请设置为true,默认为false
        },
        component: Home
    },
    // {
    //     path: "/login",
    //     name: "Login",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ "../views/About.vue")
    // },
    {
        path: "*",
        name: "Home",
        meta: {
            wechatAuth: true // 如果此路由需要微信授权请设置为true,默认为false
        },
        component: Home
    }
];

const router = new VueRouter({
    mode: "history",
    base: "/gas-station/",
    routes
});
// var isIos = function() {
//     const u = navigator.userAgent;
//     return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
// };
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.wechatAuth)) {
        // 判断是否需要授权
        if (
            sessionStorage.getItem("gasStation") ||
            sessionStorage.getItem("login")
        ) {
            // 判断是否已经有授权
            // var url1 = "https://" + location.host + to.fullPath;
            // if (isIos() && to.path !== sessionStorage.getItem("urlTo")) {
            //     sessionStorage.setItem("urlTo", to.path);
            //     url1 = location.href.split("#")[0];
            // }
            // sessionStorage.setItem("url", url1);
            next();
        }
        // else if (to.query.code) {
        //     //判断是否是微信的回调地址
        //     wechatPlugin.getCodeCallback(next, to.query.code);
        // } else {
        //     //去获取code
        //     wechatPlugin.getCode();
        // }
        else {
            var userAgent = navigator.userAgent.toLowerCase(); //获取UA信息
            sessionStorage.setItem("userAgent", userAgent);

            if (
                flag == "browser" &&
                (userAgent.indexOf("xiaozhuang_ios") != -1 ||
                    userAgent.indexOf("xiaozhuang_android") != -1) &&
                to.query.xAuthToken
            ) {
                setToken(to.query.xAuthToken);
                next();
                return;
            }
            if (to.query.code) {
                console.log("有code，发起授权");
                //判断是否是微信的回调地址
                wechatPlugin.getCodeCallback(next, to.query.code);
                return;
            } else {
                console.log("去获取code");
                //去获取code
                wechatPlugin.getCode();
            }
        }
    } else {
        console.log("已授权");
        next();
    }
});
export default router;
