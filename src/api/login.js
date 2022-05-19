import { request } from "./request";

// 手机号登录
export function phoneLogin(phone, password, md5_password) {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      password,
      md5_password, //md5 加密后的密码,传入后 password 参数将失效
    },
  });
}

// 查询登陆状态
export function loginState() {
  return request({
    url: "/login/status",
  });
}

// 退出
export function logout() {
  return request({
    url: "/logout",
  });
}
