import request from "@/utils/request";

// 更新新添加接口
export function memberInfo(query) {
    return request({
        url: "/member/third/channel/memberInfo",
        method: "post",
        data: query
    });
}
