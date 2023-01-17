import { getProfile, editProfile, deleteProfile } from '../controllers/users.controller';
const { isAuthenticated } = require('../middlewares/isAuthenticated.middleware');
const express = require("express");
const router = express.Router();

router.get("/profile", isAuthenticated, getProfile);
router.put("/profile", isAuthenticated, editProfile);
router.delete("/profile", isAuthenticated, deleteProfile);

module.exports = router;