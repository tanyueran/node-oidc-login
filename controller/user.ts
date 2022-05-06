import { NextFunction, Response, Request } from "express";
import { successResult } from "../responseResult/index";

import { users } from "../data/index";

export async function getUserInfo(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 获取userinfo
  let user = JSON.parse((req as any).session.user);
  return res.send(successResult(users[user.sub]));
}
