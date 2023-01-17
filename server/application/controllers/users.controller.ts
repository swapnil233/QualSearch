const { findUserById, updateUserById } = require('../../infrastructure/services/user.service');
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
        const { firstName, middleName, lastName, email, username } = req.body;
        const user: User = await updateUserById(userId, { firstName, middleName, lastName, email, username });
        res.json(user);
    } catch (error) {
        next(error);
    }
}