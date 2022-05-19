import Vue from "vue";
import Vuex from "vuex";
//实现vuex数据持久化存储的插件
import persistedState from "vuex-persistedstate";
// import { _getSongDetail, _getSongUrl } from "@/api/songs.js";
// import { _getHotSongs } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cookie: "",
    showLogin: false,
    isLogin: false,
    loginStatus: false,
    // 用户基本信息
    profile: {
      nickName: "请登录",
      avatar: "../assets/img/avatar.png",
      userId: "",
      backgroundUrl: "",
      level: "",
      listenSongs: "",
    },
    isPlay: false,
    recentPlayFirst: true,
    currentMusic: {
      id: 0,
      name: "请选择歌曲",
      singer: "xxx",
      imgUrl: require("../assets/img/top50.jpg"),
      currentTime: 0,
      duration: 0, //歌曲时长
      durationString: "", //歌曲时长 分：秒 形式
      isLike: false,
      url: "",
    },
    isShowPlayList: false, //是否显示播放列表
    currentPlayList: [],
    currentIndex: 0, //当前播放歌曲在播放列表的位置
    albumList: [],
    // 以下是我自己写的属性
    currentSingerId: "", //当前歌手的id
    currentMenuInfo: null, //当前歌单的简介信息
    bestSongsMenu: null, //歌单路由下的当前精选歌单
    mvInfo: null, //mv的简介信息
    topsInfo: [], //榜单信息
  },
  mutations: {
    //获取当前歌手的id
    getSingerId(state, singerId) {
      state.currentSingerId = singerId;
      // sessionStorage.setItem("Current_Singer_Id", JSON.stringify(singerId));
    },
    //设置当前歌单的简介信息
    setMenuInfo(state, menuInfo) {
      state.currentMenuInfo = menuInfo;
      // console.log(menuInfo, "vuex的menuInfo");
    },
    //改变歌单路由下的当前精选歌单
    changeBestSongsMenu(state, menuObj) {
      state.bestSongsMenu = menuObj;
      state.tags = menuObj.tags;
    },
    //设置被点击mv的简介信息
    setMVInfo(state, MVInfo) {
      state.mvInfo = MVInfo;
    },
    //设置榜单信息
    settopsInfo(state, topsInfo) {
      state.topsInfo = topsInfo;
    },

    // changeMusicState(state, id) {
    //   _getSongUrl(id).then((res2) => {
    //     state.currentMusic.url = res2.data.data[0].url;
    //     console.log(state.currentMusic.url);
    //   });

    //   _getSongDetail(id).then((res) => {
    //     const song = res.data.songs[0];
    //     state.currentMusic.id = song.id;
    //     state.currentMusic.name = song.name;
    //     if (song.ar.length > 1) {
    //       state.currentMusic.singer = song.ar
    //         .map((item) => {
    //           return item.name;
    //         })
    //         .join(" / ");
    //     } else {
    //       state.currentMusic.singer = song.ar[0].name;
    //     }
    //     state.currentMusic.imgUrl = song.al.picUrl;
    //     state.currentMusic.duration = song.dt;
    //     state.currentMusic.isLike = song.dt;
    //     // console.log(state.currentMusic)
    //   });
    // },
    // createPlayList(state, payload) {
    //   state.currentPlayList = payload.songList;
    //   state.currentIndex = payload.index;
    // },
  },
  getters: {
    // getAvatar(state) {
    //   let avatar = "";
    //   if (localStorage.getItem("avatar")) {
    //     avatar = localStorage.getItem("avatar");
    //     return avatar;
    //   }
    //   avatar = state.user && state.user.profile.avatarUrl;
    //   return avatar;
    // },
    getNickName(state) {
      let nickName = "";
      if (localStorage.getItem("nickName")) {
        nickName = localStorage.getItem("nickName");
        return nickName;
      }
      nickName = state.user && state.user.profile.nickname;
      return nickName;
    },
    getCookie(state) {
      if (localStorage.getItem("cookie")) {
        state.cookie = localStorage.getItem("cookie");
      }
      // console.log(state.cookie)
      return state.cookie;
    },
  },
  plugins: [persistedState({ storage: window.sessionStorage })],
  actions: {},
  modules: {},
});
