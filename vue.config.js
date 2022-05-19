const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000 ", //这是服务器地址，设置反向代理是为了避免出现跨域
        // target: "https://netease-cloud-music-api-rho-roan.vercel.app/",
        ws: false, // 防止出现WebSocketClient.js?5586:16 WebSocket connection to 'ws://192.168.0.8:8080/ws' failed: 错误
        changeOrigin: true,
      },
    },
  },
});
