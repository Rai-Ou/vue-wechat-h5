import request from "@/utils/request";

// 获取国标油价列表
export function getNationalPrice() {
    return request({
        url: "/ipcshopping/gasPrice/getNationalPrice",
        method: "get"
    });
}

// 获取用户端优惠加油列表
export function getMemberGasStationList(query) {
    return request({
        url: "/ipcshopping/gasStation/getMemberGasStationList",
        method: "post",
        data: query
    });
}
