import { loginUsernamePassword, registerUsernamePassword, refreshToken, revokeRefreshToken } from '../controllers/auth.controller';
const express = require("express");
const router = express.Router();

router.post("/login", loginUsernamePassword);
router.post("/register", registerUsernamePassword);
router.post("/refreshToken", refreshToken);
router.post("/revokeRefreshToken", revokeRefreshToken);

module.exports = router;