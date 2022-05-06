let createError = require("http-errors");
import express, { NextFunction, Response, Request } from "express";
const compression = require("compression");
const session = require("express-session");
let path = require("path");
let logger = require("morgan");

import route from "./routes";
import proxy from "./utils/proxy";

let app = express();
// session
app.use(
  session({
    secret: "node-oidc-login",
    resave: false,
    saveUninitialized: true,
  })
);
// 添加压缩
app.use(compression());

// 代理部分地址
proxy(app);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

route(app);

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
  res.send(err);
});

module.exports = app;
