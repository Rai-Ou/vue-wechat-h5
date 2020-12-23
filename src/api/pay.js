import request from "@/utils/request";

// 更新新添加接口
export function getWechatInfoByOrganization(query) {
    return request({
        url: "/pay/business/getWechatInfoByOrganization",
        method: "post",
        data: query
    });
}
