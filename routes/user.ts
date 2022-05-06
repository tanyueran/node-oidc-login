import express from "express";
import { checkToken } from "../middleware/checkToken";
import { getUserInfo } from "../controller/user";

let router = express.Router();

// 获取用户信息
router.get("/info", checkToken, getUserInfo);

module.exports = router;
