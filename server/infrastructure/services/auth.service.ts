const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();
import { hashToken } from '../utils/hashToken.util';

// Used when we create a refresh token.
const addRefreshTokenToWhitelist = async ({ jti, refreshToken, userId }: { jti: string, refreshToken: string, userId: string }) => {
    try {
        if (!jti || !refreshToken || !userId) {
            throw new Error("Missing required parameters");
        }

        return await db.refreshToken.create({
            data: {
                id: jti,
                hashedToken: hashToken(refreshToken),
                userId
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Used to check if the token sent by the client is in the database.
const findRefreshTokenById = async (id: string) => {
    try {
        if (!id) throw new Error("Refresh token id missing");

        return db.refreshToken.findUnique({
            where: {
                id,
            },
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Soft delete tokens after usage.
const deleteRefreshToken = async (id: string) => {
    try {
        if (!id) throw new Error("Refresh token id missing");

        return await db.refreshToken.update({
            where: {
                id,
            },
            data: {
                revoked: true
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const revokeTokens = async (userId: string) => {
    try {
        if (!userId) throw new Error("userId missing");

        return await db.refreshToken.updateMany({
            where: {
                userId
            },
            data: {
                revoked: true
            }
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
};