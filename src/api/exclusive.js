import request from "../utils/request";

//用于请求独家放送的方法
export const exclusive = (params) =>
  request({
    url: "/personalized/privatecontent",
    params,
  });

//用于请求独家放送列表的方法
export const exclusiveList = (limit, offset) =>
  request({
    url: "/personalized/privatecontent/list",
    params: {
      limit, //返回数量 , 默认为 60
      offset, //偏移数量，用于分页 , 如 :( 页数 -1)*60, 其中 60 为 limit 的值 , 默认为 0
    },
  });
