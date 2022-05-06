import { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";
import { errorResult, successResult } from "../responseResult/index";

// 验证登录是否在有效期内
export function checkLogin(req: Request, res: Response, next: NextFunction) {
  const query = url.parse(req.url, true).query;
  const challenge = String(query.login_challenge);
  if (!challenge) {
    res.send(errorResult({}, "challenge is not empty"));
  }
  // 验证在有效期内
  hydraAdmin.getLoginRequest(challenge).then(({ data: body }) => {
    console.log("第一次登录验证：===========");
    console.log(body);
    if (body.skip) {
      return hydraAdmin
        .acceptLoginRequest(challenge, {
          subject: String(body.subject),
        })
        .then(({ data: body }) => {
          res.redirect(String(body.redirect_to));
        })
        .catch((err: any) => {
          console.log("======================第一次登录验证：");
          console.log(err);
          next();
        });
    }
    // 重定向到登录页面
    res.redirect("/login.html?login_challenge=" + challenge);
  });
}

// 登录验证
export function login(req: Request, res: Response, next: NextFunction) {
  let body = req.body;
  const challenge = String(body.login_challenge);
  console.log(body);
  if (body.username === "admin" && body.pwd === "123456") {
    hydraAdmin
      .acceptLoginRequest(challenge, {
        subject: "admin",
        remember: true,
        remember_for: 3600,
        acr: body.username + ":" + Math.random() + ":" + new Date().getTime(),
      })
      .then(({ data: body }) => {
        console.log("登录成功响应：===========");
        console.log(body);
        res.send(
          successResult({
            ...body,
          })
        );
      })
      .catch((err: any) => {
        console.log("======================登录成功响应：");
        console.log(err);
        next();
      });
  } else {
    res.send(errorResult(null, "账号或密码错误"));
  }
}
