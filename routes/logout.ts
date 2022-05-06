import express from "express";

let router = express.Router();

import { logout } from "../controller/logout";

router.get("/", logout);

module.exports = router;
