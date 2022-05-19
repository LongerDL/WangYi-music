import request from "../utils/request";

//用于请求轮播图的方法
const banners = (params) =>
  request({
    url: "/banner",
    params,
  });

export default banners