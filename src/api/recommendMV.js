import request from "../utils/request";

//用于获取推荐MV的方法
export function recommendMV() {
  return request({
    url: "/personalized/mv",
  });
}

//用于获取MV的url地址的方法
export function mvUrl(id, r) {
  return request({
    url: "/mv/url",
    params: {
      id, //必选参数 : id: mv id
      r, //可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表
    },
  });
}

//获得mv详情的方法
export function mvDetail(mvid) {
  return request({
    url: "/mv/detail",
    params: {
      mvid, //必选参数 mvid: mv的id
    },
  });
}

//获得mv详情的方法
export function similarMV(mvid) {
  return request({
    url: "/simi/mv",
    params: {
      mvid, //必选参数 mvid: mv的id
    },
  });
}

//获得mv的评论信息
export function mvComment(id, limit, offset, before) {
  return request({
    url: "/comment/mv",
    params: {
      id, //必选参数id: mv的id
      limit, //可选参数limit: 取出评论数量 , 默认为 20
      offset, //可选参数offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
      before, //可选参数before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
    },
  });
}
