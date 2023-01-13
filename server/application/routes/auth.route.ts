import { login, register } from '../controllers/auth.controller';
const express = require("express");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);

module.exports = router;