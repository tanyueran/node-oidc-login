import express from "express";

import consent from "../controller/consent";

let router = express.Router();

// 授权校验
router.get("/", consent);

module.exports = router;
