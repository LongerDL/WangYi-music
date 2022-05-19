//统一出口
//获取轮播图的接口
import banners from "./banners";
export const getBanners = banners;

//获取推荐歌单、推荐歌单详情、推荐歌曲的接口
import { recommendMenu, menuDetail, recomendSongs } from "./recommendSongs";
export const getRecommendMenu = recommendMenu;
export const getRecomendSongs = recomendSongs;
export const getMenuDetail = menuDetail;

//获取独家放送的接口
import { exclusive, exclusiveList } from "./exclusive";
export const getExclusive = exclusive;
export const getExclusiveList = exclusiveList;

//获取歌曲菜单列表、歌曲URL的接口
import { bestMenu, musicUrl } from "./musicList";
export const getBestMenu = bestMenu;
export const getMusicUrl = musicUrl;

//获取精品歌单、歌单分类tags、歌单列表的接口
import {
  musicTags,
  musicMenu,
  relatedMenu,
  comments,
  subscribers,
} from "./bestSongsMenu";
export const getMusicMenu = musicMenu;
export const getMusicTags = musicTags;
export const getRelatedMenu = relatedMenu;
export const getComments = comments;
export const getSubscribers = subscribers;

//获取歌手的接口
import { singers } from "./singers";
export const getSingers = singers;

//获取歌手简介、歌手详细信息的接口
import { singerInfo, singerDetail, singerMV, similarSingers } from "./singers";
export const getSingerInfo = singerInfo;
export const getSingerDetail = singerDetail;
export const getSingerMV = singerMV;
export const getSimilarSingers = similarSingers;

//获取当前歌手热门50首歌曲的接口
import { hotSongs } from "./songs";
export const getHotSongs = hotSongs;

//获取推荐MV的相关信息接口
import {
  recommendMV,
  mvUrl,
  mvDetail,
  similarMV,
  mvComment,
} from "./recommendMV";
export const getRecommendMV = recommendMV;
export const getMVUrl = mvUrl;
export const getMVDetail = mvDetail;
export const getSimilarMV = similarMV;
export const getMVComment = mvComment;

//获取所有榜单、歌单详情的接口
import { tops } from "./tops";
export const getTops = tops;
