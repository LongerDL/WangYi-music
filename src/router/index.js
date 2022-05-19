import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/login",
    children: [
      {
        // 个性推荐路由
        path: "/recommend",
        name: "recommend",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Recommend"),
        children: [],
      },
      {
        // 歌单路由
        path: "/songmenu",
        name: "songmenu",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/SongMenu"),
      },
      {
        // 排行榜路由
        path: "/ranklist",
        name: "ranklist",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/RankList"),
      },
      {
        // 歌手路由
        path: "/singers",
        name: "singers",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Singers"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Login"),
  },
  {
    name: "songListInfo",
    path: "/songListInfo",
    redirect: "/songListInfo/SongList",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/SongListInfo"),
    children: [
      {
        name: "SongList",
        path: "/songListInfo/SongList",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SongListInfo/SongList"
          ),
      },
      {
        name: "CurComment",
        path: "/songListInfo/curcomment",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SongListInfo/CurComment"
          ),
      },
      {
        name: "Collector",
        path: "/songListInfo/collector",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SongListInfo/Collector"
          ),
      },
    ],
  },
  {
    name: "singerInfo",
    path: "/singerInfo",
    redirect: "/singerInfo/album",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/SingerInfo"),
    children: [
      {
        name: "album",
        path: "/singerInfo/album",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SingerInfo/Album"
          ),
      },
      {
        name: "mv",
        path: "/singerInfo/mv",
        component: () =>
          import(/* webpackChunkName: "about" */ "../components/SingerInfo/MV"),
      },
      {
        name: "singerDetail",
        path: "/singerInfo/singerdetail",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SingerInfo/SingerDetail"
          ),
      },
      {
        name: "similarSingers",
        path: "/singerInfo/similarsingers",
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../components/SingerInfo/SimilarSingers"
          ),
      },
    ],
  },
  {
    name: "RecommendMVList",
    path: "/Recommendmvlist",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/RecommendMVList"),
  },
  {
    name: "mvInfo",
    path: "/mvInfo/:vid?",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/MVInfo"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
