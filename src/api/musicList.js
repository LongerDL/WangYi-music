import request from "../utils/request";

// 获取推荐歌单的详情
export function bestMenu(id, limit, offset) {
  return request({
    // url: "/playlist/track/all",
    url: "/playlist/track/all",
    params: {
      id, //必选参数，歌单id
      limit, //限制获取歌曲的数量，默认值为当前歌单的歌曲数量
      offset, //默认值为0
    },
  });
}

//获取音乐的url
export function musicUrl(id, br) {
  return request({
    url: "/song/url",
    params: {
      id, //歌曲id
      br, //码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
    },
  });
}
