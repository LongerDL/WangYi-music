import request from "../utils/request";

//用于请求每日推荐歌单的方法
export const recommendMenu = (params) =>
  request({
    // url: "/personalized",
    url: "/recommend/resource",
    params,
  });

//用于获取推荐歌单详情的方法
export const menuDetail = (id, s) =>
  request({
    url: "/playlist/detail",
    params: {
      id, //必选参数，歌单id
      s, //可选参数，歌单最近的 s 个收藏者,默认为 8
    },
  });

//用于获取每日推荐歌曲的方法
export const recomendSongs = (params) =>
  request({
    // url: "/personalized",
    url: "/recommend/songs",
    params,
  });
