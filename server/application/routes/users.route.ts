import { getProfile } from '../controllers/users.controller';
const { isAuthenticated } = require('../middlewares/isAuthenticated.middleware');
const express = require("express");
const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);

module.exports = router;