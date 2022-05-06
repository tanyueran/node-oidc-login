// 代理中间件
const { createProxyMiddleware } = require("http-proxy-middleware");

export default function (app: any) {
  app.use(
    "/oauth2/token",
    createProxyMiddleware({
      target: "http://localhost:4444",
      changeOrigin: true,
    })
  );
  app.use(
    "/oauth2/sessions/logout",
    createProxyMiddleware({
      target: "http://localhost:4444",
      changeOrigin: true,
    })
  );
  app.use(
    "/userinfo",
    createProxyMiddleware({
      target: "http://localhost:4444",
      changeOrigin: true,
    })
  );
}
