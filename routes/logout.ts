import express, { NextFunction, Response, Request } from "express";
import url from "url";
import { hydraAdmin } from "../utils/config";
import { errorResult } from "../responseResult/index";

let router = express.Router();

// 验证登录是否在有效期内
router.get("/", function (req, res, next) {
  
});
