const { findUserById, updateUserById, deleteUserById } = require('../../infrastructure/services/user.service');
import { Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { IGetUserAuthInfoRequest } from '../../domain/interfaces/IGetUserAuthInfoRequest';

export const getProfile = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.payload;
        const user: User = await findUserById(userId);
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const editProfile = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.payload;
        const { firstName, middleName, lastName, email, username, role, displayPic } = req.body;

        // Can't edit username or email.
        if (email || username) {
            res.status(400).send("400 error: You cannot change your email or username.");
            throw new Error('You cannot change your email or username.');
        }

        const user: User = await updateUserById(userId, { firstName, middleName, lastName, email, username, role, displayPic });
        res.json(user);
    } catch (error) {
        next(error);
    }
}

export const deleteProfile = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.payload;
        deleteUserById(userId);
        res.status(200).send("Success 200: User deleted.");
    } catch (error) {
        res.send(error);
        next(error);
    }
}