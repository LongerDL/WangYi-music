//封装的网络请求方法
import axios from "axios";
const request = axios.create({
  //基路径
  baseURL: "https://netease-cloud-music-api-rho-roan.vercel.app/",
  // baseURL: "http://localhost:3000",
  withCredentials: true, //跨域请求时发送cookie
  headers: {
    "Content-Type": "application/json; charset=UTF-8;",
  },
  timeout: 15000, //请求时间
});
export default request;
