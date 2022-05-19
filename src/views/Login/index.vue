<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">登录网易云</h3>
    <el-form-item
      label="账号"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.phone"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import md5 from "md5";
import { phoneLogin, loginState } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      form: {
        phone: "18202760253",
        password: "Ldl201613",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "用户名长度不能小于三位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "用户名长度不能小于三位", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      //调用登录接口
      phoneLogin(
        this.form.phone,
        this.form.password,
        md5(this.form.password)
      ).then((res) => {
        // console.log(res, ".....");
        const item = res.data;
        //设置vuex中的cookie记录
        this.$store.state.cookie = item.cookie;
        //设置浏览器中的cookie
        document.cookie = encodeURIComponent(item.cookie);
        if (res.data.code) {
          this.success();
          this.$store.state.isLogin = true;
          this.$store.state.loginStatus = true;
          localStorage.setItem("cookie", item.cookie);
          // localStorage.setItem("avatar", item.profile.avatarUrl);
          // localStorage.setItem("userId", item.profile.userId);
          // localStorage.setItem("nickName", item.profile.nickname);

          //路由跳转
          this.$router.push({ name: "recommend" });
        } else {
          console.log("密码错误");
        }
      });
    },
    success() {
      this.$message({
        message: "登录成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_submit {
    margin: 10px auto 0px auto;
  }
}
</style>
