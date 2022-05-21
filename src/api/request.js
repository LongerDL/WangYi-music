import axios from "axios";
// import $store from "@/store/index";

export function request(config) {
  // 创建一个 axios 对象
  const instance = axios.create({
    // 根路径
    // baseURL: "http://localhost:3000",
    baseURL: "https://netease-cloud-music-api-rho-roan.vercel.app/",
    // 请求时间
    timeout: 12000,
    withCredentials: true, //跨域请求时发送cookie
    // headers: {
    //   "Content-Type": "application/json; charset=UTF-8;",
    // },
  });

  // 返回 实例对象
  return instance(config);
}
