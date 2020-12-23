export function returnBrowserEnvFlag() {
    let browserEnvType = "";
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        browserEnvType = "wx";
    } else if (ua.match(/Alipay/i) == "alipay") {
        browserEnvType = "zfb";
    } else {
        browserEnvType = "browser";
    }
    return browserEnvType;
}
