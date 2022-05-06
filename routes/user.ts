import express, { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";
import { errorResult, successResult } from "../responseResult/index";
import { checkToken } from "../middleware/checkToken";

import { users } from "../data/index";

let router = express.Router();

// 获取用户信息
router.get("/info", checkToken, async function (req, res, next) {
  // 获取userinfo
  let user = JSON.parse((req as any).session.user);
  return res.send(successResult(users[user.sub]));
});

module.exports = router;
