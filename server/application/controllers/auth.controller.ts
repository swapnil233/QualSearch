import { RefreshToken, User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { hashToken } from '../../infrastructure/utils/hashToken.util';
const { v4: uuidv4 } = require('uuid');
const { generateTokens } = require('../../infrastructure/utils/jwt.util');
const { addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens } = require('../../infrastructure/services/auth.service');
const { findUserByEmail, findUserByUsername, findUserById, createUserByEmailAndPassword } = require('../../infrastructure/services/user.service');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const registerUsernamePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, username, firstName, middleName, lastName, role } = req.body;

        if (!email || !password || !username) {
            res.status(400).send("400 error: You must provide an username, email, and a password to register.");
            throw new Error('You must provide an username, email and a password.');
        }

        const emailExists = await findUserByEmail(email)
        const usernameExists = await findUserByUsername(username);

        if (emailExists) {
            res.status(400).send("400 error: Email already in use.");
            throw new Error('Email already in use.');
        }

        if (usernameExists) {
            res.status(400).send("400 error: Username already in use.");
            throw new Error('Email already in use.');
        }

        const user = await createUserByEmailAndPassword({ email, password, username, firstName, lastName, middleName, role });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const loginUsernamePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(400).send("400 error: Must provide an username and password to log in");

        const existingUser: User = await findUserByUsername(username);
        if (!existingUser) res.status(403).send("403 error: Invalid login credentials.");

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) res.status(403).send("403 error: Invalid password");

        // Generate access and refresh tokens and add them to user's profile
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        res.json({
            accessToken,
            refreshToken
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { refreshToken }: { refreshToken: string } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error("400 error: Missing refresh token");
        }

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken: RefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked == true) {
            res.status(401).send("401 error: Unauthorized");
            throw new Error("Unauthorized");
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401).send("401 error: Unauthorized");
            throw new Error("Unauthorized");
        }

        const user: User = await findUserById(payload.userId);
        if (!user) {
            res.status(401).send("401 error: Unauthorized");
            throw new Error("Unauthorized");
        }

        await deleteRefreshToken(savedRefreshToken.id);

        const jti = uuidv4();
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({
            jti,
            refreshToken: newRefreshToken,
            userId: user.id
        });
    } catch (error) {
        next(error);
    }
}

export const revokeRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (error) {
        next(error);
    }
}