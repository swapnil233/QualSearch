import { User } from "@prisma/client";
const jwt = require('jsonwebtoken');

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
    throw new Error('JWT_SECRET and/or JWT_REFRESH_SECRET are not defined in .env file');
}

const generateAccessToken = (user: User) => {
    return jwt.sign({
        userId: user.id
    }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: '15m'
    })
}

const generateRefreshToken = (user: User, jti: string) => {
    return jwt.sign({
        userId: user.id,
        jti
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '8h'
    })
}

const generateTokens = (user: User, jti: string) => {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user, jti);

    return {
        accessToken,
        refreshToken
    }
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    generateTokens
}