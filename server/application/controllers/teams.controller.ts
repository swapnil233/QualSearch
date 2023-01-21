import { Response } from "express";
import { createTeamByUserId, getAllTeamsByUserId } from "../../infrastructure/services/team.service";
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