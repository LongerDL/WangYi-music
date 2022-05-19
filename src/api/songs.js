// import { request } from "./request";
import request from "../utils/request";

export const hotSongs = function (id) {
  return request({
    url: "/artist/top/song",
    params: {
      id, //当前歌手的id
    },
  });
};

// 获取歌词
export function _getLyric(id) {
  return request({
    url: "/lyric",
    params: {
      id,
    },
  });
}
// 获取歌词
export function _getResentSong(limit, cookie) {
  return request({
    url: "/record/recent/song",
    params: {
      limit,
      cookie,
    },
  });
}
