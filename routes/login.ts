import express from "express";

let router = express.Router();

import { checkLogin, login } from "../controller/login";

// 验证登录是否在有效期内
router.get("/", checkLogin);

// 登录验证
router.post("/", login);

module.exports = router;
