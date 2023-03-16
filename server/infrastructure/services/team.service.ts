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

export const getTeamById = async (teamId: string, userId: string) => {
    try {
        const team = await db.team.findUnique({
            where: {
                id: teamId
            },
            include: {
                users: true,
                createdBy: true
            }
        });

        if (!team) throw new Error("Team not found");
        if (!team.users.some(user => user.id === userId)) {
            console.log("Unauthorized");
            throw new Error("Unauthorized");
        };

        return team;
    } catch (error) {
        throw error;
    }
}

export const updateTeamById = async (teamId: string, userId: string, updateData: { name: string, description: string }) => {
    try {
        const team = await getTeamById(teamId, userId);

        return await db.team.update({
            where: {
                id: teamId
            },
            data: {
                name: updateData.name,
                description: updateData.description
            }
        });
    } catch (error) {
        throw new Error("Can't update team");
    }
}

export const deleteTeamById = async (teamId: string, userId: string) => {
    try {
        await getTeamById(teamId, userId);

        return await db.team.delete({
            where: {
                id: teamId
            }
        });
    } catch (error) {
        throw new Error("Can't delete team");
    }
}

export const addTeamMember = async (teamId: string, userId: string, memberId: string) => {
    try {
        await getTeamById(teamId, userId);

        return await db.team.update({
            where: {
                id: teamId
            },
            data: {
                users: {
                    connect: {
                        id: memberId
                    }
                }
            }
        });
    } catch (error) {
        throw new Error("Can't add team member");
    }
}

export const removeTeamMember = async (teamId: string, userId: string, memberId: string) => {
    try {
        await getTeamById(teamId, userId);

        return await db.team.update({
            where: {
                id: teamId
            },
            data: {
                users: {
                    disconnect: {
                        id: memberId
                    }
                }
            }
        });
    } catch (error) {
        throw new Error("Can't remove team member");
    }
}