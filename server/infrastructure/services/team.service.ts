import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const createTeamByUserId = async ({ name, description, createdByUserId }: { name: string, description: string, createdByUserId: string }) => {
    try {
        return await db.team.create({
            data: {
                name,
                description,
                createdBy: {
                    connect: {
                        id: createdByUserId
                    }
                },
                users: {
                    connect: {
                        id: createdByUserId
                    }
                }
            }
        })
    } catch (error) {
        throw new Error("Can't create team")
    }
}

// Get all user's teams
export const getAllTeamsByUserId = async (userId: string) => {
    try {
        return await db.team.findMany({
            where: {
                users: {
                    some: {
                        id: userId
                    }
                }
            }
        })
    } catch (error) {
        throw new Error("Can't get all teams")
    }
}

export const getTeamById = async ({ teamId }: { teamId: string }) => {
    try {
        return await db.team.findUnique({
            where: {
                id: teamId
            },
            include: {
                users: true,
                createdBy: true
            }
        })
    } catch (error) {
        throw new Error("Can't get team by id");
    }
}