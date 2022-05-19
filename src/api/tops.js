import request from "../utils/request";

//获取所有榜单
export const tops = function () {
  return request({
    url: "/toplist",
  });
};
