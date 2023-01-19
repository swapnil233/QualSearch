import { createTeam } from '../controllers/teams.controller';
const { isAuthenticated } = require('../middlewares/isAuthenticated.middleware');
const express = require("express");
const router = express.Router();

router.post("/create", isAuthenticated, createTeam);

module.exports = router;