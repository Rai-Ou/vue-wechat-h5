import { memberInfo } from "@/api/member";
class wechatAuth {
    constructor(config) {
        let defaultConfig = {
            appid: process.env.VUE_APP_WX_APPID,
            responseType: "code",
            redirectUri: encodeURIComponent(location.href),
            errorUri: "",
            scope: "snsapi_userinfo",
            getCodeCallback(next, code) {
                // 用户同意授权后回调方法
                // code：用户同意授权后，获得code值
                // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
                // next： 无论access_token是否获取成功,一定要调用该方法
                // next说明：next方法接收两个参数
                // 参数1(必填，切换到的路由地址，空字符串为当前路由，指定切换对象 next('/') 或者 next({ path: '/' })
                // 参数2为通过code值请求后端获取access_token的结果，true或者false，默认为false

                memberInfo({
                    accountInfoId: process.env.VUE_APP_WX_LOGIN,
                    applicationName: "parking_server",
                    code: code
                })
                    .then(res => {
                        sessionStorage.setItem(
                            "gasStation",
                            JSON.stringify(res.data)
                        );
                        next("", code);
                    })
                    .catch(() => {
                        next("/login");
                    });
            }
        };
        this.config = Object.assign(defaultConfig, config);
    }

    //调取微信获取code接口
    getCode() {
        let authPageBaseUri =
            "https://open.weixin.qq.com/connect/oauth2/authorize";
        let authParams = `?appid=${this.config.appid}&redirect_uri=${this.config.redirectUri}&response_type=${this.config.responseType}&scope=${this.config.scope}#wechat_redirect`;
        window.location.href = authPageBaseUri + authParams;
    }

    next(next) {
        return (to, code) => {
            if (code) {
                sessionStorage.setItem("wxcode", code);
                to ? next(to) : next();
            } else {
                to && next(to);
            }
        };
    }

    getCodeCallback(next, code) {
        return this.config.getCodeCallback(this.next(next), code);
    }
}

export default wechatAuth;
