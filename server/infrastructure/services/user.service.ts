import { PrismaClient, User } from '@prisma/client';
const bcrypt = require('bcrypt');
const db = new PrismaClient();

const findUserByEmail = async (email: string) => {
    return await db.user.findUnique({
        where: {
            email
        },
    });
}

const findUserByUsername = async (username: string) => {
    return await db.user.findUnique({
        where: {
            username
        }
    })
}

const createUserByEmailAndPassword = async (user: User) => {
    try {
        user.password = bcrypt.hashSync(user.password, 12);
        return await db.user.create({
            data: user,
        });
    } catch (error) {
        console.log(error);
        throw new Error("500 Error: Something went wrong while trying to create a new user with 'createUserByEmail' function");
    }
}

const findUserById = (id: string) => {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}

const updateUserById = (id: string, data: User) => {
    return db.user.update({
        where: {
            id,
        },
        data,
    });
}

const deleteUserById = (id: string) => {
    const user = findUserById(id);
    if (!user) {
        throw new Error("404 Error: User not found");
    }

    const deleteAllRefreshTokens = db.refreshToken.deleteMany({
        where: {
            userId: id,
        },
    });

    const deleteUser = db.user.delete({
        where: {
            id,
        },
    });

    return db.$transaction([deleteAllRefreshTokens, deleteUser]);
}

module.exports = {
    findUserByEmail,
    findUserByUsername,
    findUserById,
    createUserByEmailAndPassword,
    updateUserById,
    deleteUserById
};