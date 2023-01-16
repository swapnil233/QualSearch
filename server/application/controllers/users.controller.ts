const { findUserById } = require('../../infrastructure/services/user.service');
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