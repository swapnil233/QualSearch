import { Response } from "express";
import { createTeamByUserId, getAllTeamsByUserId, addTeamMember, deleteTeamById, getTeamById, removeTeamMember, updateTeamById } from "../../infrastructure/services/team.service";
import { IGetUserAuthInfoRequest } from '../../domain/interfaces/IGetUserAuthInfoRequest';

export const createTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const createdByUserId: string = req.payload.userId;
        const { name, description } = req.body;

        // Validate request
        if (!name || !description) return res.status(422).json({ message: "Missing name or description" });
        if (name.length < 3) return res.status(422).json({ message: "Name is too short, minimum length is 3" });
        if (!createdByUserId) return res.status(401).json({ message: "Unauthorized" });

        const team = await createTeamByUserId({ name, description, createdByUserId });

        return res.status(201).json({ message: "Team created successfully", data: team });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error creating team", error });
    }
}

export const getAllTeams = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const teams = await getAllTeamsByUserId(userId);

        return res.status(200).json({ message: `Retrieved all teams for ${req.payload.email}`, data: teams });
    } catch (error) {
        res.status(400).json({ message: "Error getting all teams", error })
    }
}

// Get a specific team by its ID
export const getTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        const { teamId } = req.params;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const team = await getTeamById(teamId, userId);

        return res.status(200).json({ message: "Retrieved team details", data: team });
    } catch (error) {
        return res.status(400).send(error)
    }
}

// Update a team's details by its ID
export const updateTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        const { teamId } = req.params;
        const { name, description } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        const updatedTeam = await updateTeamById(teamId, userId, { name, description });

        return res.status(200).json({ message: "Team updated successfully", data: updatedTeam });
    } catch (error) {
        res.status(400).json({ message: "Error updating team", error });
    }
}

// Delete a team by its ID
export const deleteTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        const { teamId } = req.params;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        await deleteTeamById(teamId, userId);

        return res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting team", error });
    }
}

// Add a user to a team
export const addUserToTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        const { teamId } = req.params;
        const { memberId } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        await addTeamMember(teamId, userId, memberId);

        return res.status(200).json({ message: "User added to team successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error adding user to team", error });
    }
}

// Remove a user from a team
export const removeUserFromTeam = async (req: IGetUserAuthInfoRequest, res: Response) => {
    try {
        const userId = req.payload.userId;
        const { teamId } = req.params;
        const { memberId } = req.body;

        if (!userId) return res.status(401).json({ message: "Unauthorized" });

        await removeTeamMember(teamId, userId, memberId);

        return res.status(200).json({ message: "User removed from team successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error removing user from team", error });
    }
}