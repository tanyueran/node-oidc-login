import express, { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";
import { errorResult, successResult } from "../responseResult/index";
import { checkToken } from "../service/checkToken";

import { users } from "../data/index";

let router = express.Router();

// 获取用户信息
router.get("/info", async function (req, res, next) {
  let token = req.headers.authorization?.split(" ")?.[1];
  if (!token) {
    res.status(401).end({
      code: -1,
      msg: "token is not empty",
    });
  }
  let result = await checkToken(token as string);
  if (!result.active) {
    res.status(401);
    res.send({
      code: -1,
      msg: "token is active",
    });
    return;
  }
  console.log(result);
  // 获取userinfo
  let sub = result.sub;
  if (sub) {
    return res.send(successResult(users[sub]));
  }
  return res.send(successResult({}));
});

module.exports = router;
