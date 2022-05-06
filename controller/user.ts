import { NextFunction, Response, Request } from "express";
import { errorResult, successResult } from "../responseResult/index";

import { getUserInfoByUsername } from "../service/user";

export async function getUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 获取userinfo
  let user = JSON.parse((req as any).session.user);
  getUserInfoByUsername(user.sub)
    .then((result: any) => {
      res.send(successResult(result[0]));
    })
    .catch((err: any) => {
      console.error(err);
      res.send(errorResult(err, "查询用户信息出错"));
    });
}
