import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

export const createTeamByUserId = async ({ name, description, createdByUserId }: { name: string, description: string, createdByUserId: number }) => {
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