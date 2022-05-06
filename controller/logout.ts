import { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";
import { errorResult } from "../responseResult/index";

export function logout(req: Request, res: Response, next: NextFunction) {
  const query = url.parse(req.url, true).query;
  const challenge = String(query.logout_challenge);
  if (!challenge) {
    return res.send(errorResult({}, "logout_challenge must is not empty"));
  }
  console.log("执行退出登录");
  hydraAdmin
    .getLogoutRequest(challenge)
    .then(({ data: body }) => {
      console.log("获取退出请求=======");
      console.log(body);
      hydraAdmin
        .acceptLogoutRequest(challenge)
        .then(({ data: body }) => {
          console.log("接受退出请求=======");
          console.log(body);
          res.redirect(String(body.redirect_to));
        })
        .catch((err) => {
          console.log(err);
          next();
        });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
}
