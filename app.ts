let createError = require("http-errors");
import express, { NextFunction, Response, Request } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let loginRouter = require("./routes/login");
let consentRouter = require("./routes/consent");
let logoutRouter = require("./routes/logout");
let userRouter = require("./routes/user");

let app = express();

// 代理部分地址
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

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/login", loginRouter);
app.use("/api/consent", consentRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
