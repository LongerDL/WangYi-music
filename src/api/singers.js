import request from "../utils/request";

//用于歌手分类列表的方法
export const singers = (area, type, initial, limit, offset) =>
  request({
    url: "/artist/list",
    params: {
      area, //area 取值:-1:全部 7华语 96欧美 8:日本 16韩国 0:其他
      type, //type 取值: -1:全部 1:男歌手 2:女歌手 3:乐队
      initial, //取值a,b,c,d....
      limit, //返回数量 , 默认为 30
      offset, //偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
    },
  });

//用于获取歌手简介的方法
export const singerInfo = (id) =>
  request({
    url: "/artist/detail",
    params: {
      id, //歌手id
    },
  });

//用于获取歌手详细介绍的方法
export const singerDetail = (id) =>
  request({
    url: "/artist/desc",
    params: {
      id, //必选参数,歌手id
    },
  });

//用于获取歌手详细介绍的方法
export const singerMV = (id, limit, offset) =>
  request({
    url: "/artist/mv",
    params: {
      id, //必选参数,歌手id
      limit,
      offset,
    },
  });

//用于获取当前歌手的相似歌手的方法
export const similarSingers = (id, limit, offset) =>
  request({
    url: "/simi/artist",
    params: {
      id, //必选参数,歌手id
    },
  });
