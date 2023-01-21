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

        // Email validation check
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send("400 error: Invalid email format.");
        }

        // Username validation check
        if (!username || username.length < 6) {
            return res.status(400).send("400 error: Username must be at least 6 characters.");
        }

        // Password validation check
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).send("400 error: Password must contain at least one special character and one number.");
        }

        if (!email || !password || !username) {
            return res.status(400).send("400 error: You must provide an username, email, and a password to register.");
        }

        const emailExists = await findUserByEmail(email)
        const usernameExists = await findUserByUsername(username);

        if (emailExists) {
            return res.status(400).send("400 error: Email already in use.");
        }

        if (usernameExists) {
            return res.status(400).send("400 error: Username already in use.");
        }

        const user = await createUserByEmailAndPassword({ email, password, username, firstName, lastName, middleName, role });
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(user, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

        return res.json({
            accessToken,
            refreshToken
        });
    } catch (error) {
        return res.status(400).send(error);
    }
}

export const loginUsernamePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).send("400 error: Must provide an username and password to log in");

        const existingUser: User = await findUserByUsername(username);
        if (!existingUser) return res.status(403).send("403 error: Invalid login credentials.");

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) return res.status(403).send("403 error: Invalid password");

        // Generate access and refresh tokens and add them to user's profile
        const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser, jti);
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });

        return res.json({
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
            return res.status(401).send("401 error: Unauthorized");
        }

        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken: RefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked == true) {
            return res.status(401).send("401 error: Unauthorized");
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            return res.status(401).send("401 error: Unauthorized");
        }

        const user: User = await findUserById(payload.userId);
        if (!user) {
            return res.status(401).send("401 error: Unauthorized");
        }

        await deleteRefreshToken(savedRefreshToken.id);

        const jti = uuidv4();
        const { refreshToken: newRefreshToken } = generateTokens(user, jti);
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
        return res.json({ message: `Tokens revoked for user with id #${userId}` });
    } catch (error) {
        next(error);
    }
}