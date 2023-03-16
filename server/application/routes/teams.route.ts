import { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam, addUserToTeam, removeUserFromTeam } from '../controllers/teams.controller';
const { isAuthenticated } = require('../middlewares/isAuthenticated.middleware');
const express = require("express");
const router = express.Router();

router.get("/", isAuthenticated, getAllTeams)
router.post("/create", isAuthenticated, createTeam);
router.get("/:teamId", isAuthenticated, getTeam);
router.put("/:teamId", isAuthenticated, updateTeam);
router.delete("/:teamId", isAuthenticated, deleteTeam);
router.post("/:teamId/members/:memberId", isAuthenticated, addUserToTeam);
router.delete("/:teamId/members/:memberId", isAuthenticated, removeUserFromTeam);

module.exports = router;