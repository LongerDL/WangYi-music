import request from "../utils/request";

//用于请求精品歌单的方法
export function musicMenu(limit, before) {
  return request({
    url: "/top/playlist/highquality",
    params: {
      limit, //取出歌单数量 , 默认为 20
      before, //分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
    },
  });
}

//获取精品歌单的标签列表
export function musicTags() {
  return request({
    url: "/playlist/highquality/tags",
  });
}

//获取网友精选碟歌单
export function relatedMenu(order, cat, limit, offset) {
  return request({
    url: "/top/playlist",
    params: {
      //以下均为可选参数
      order, //可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
      cat, //tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
      limit, //取出歌单数量 , 默认为 50
      offset, //偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
    },
  });
}

//获取歌单的评论相关信息
export function comments(id, limit, offset, before) {
  return request({
    url: "/comment/playlist",
    params: {
      id, //必选参数 : id: 歌单 id
      limit, //可选参数 : limit: 取出评论数量 , 默认为 20
      offset, //offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
      before, //before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
    },
  });
}

//获取歌单的收藏者相关信息
export function subscribers(id, limit, offset) {
  return request({
    url: "/playlist/subscribers",
    params: {
      id, //必选参数 : id: 歌单 id
      limit, //可选参数 : limit: 取出评论数量 , 默认为 20
      offset, //offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
    },
  });
}
