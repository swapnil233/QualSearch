import { NextFunction, Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../../domain/interfaces/IGetUserAuthInfoRequest';
const jwt = require("jsonwebtoken");

export const isAuthenticated = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send("401 Unauthorized: no authorization header");
        throw new Error('Unauthorized');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err: any) {
        res.status(401).send("401 Unauthorized: no authorization header");
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }

        throw new Error('Unauthorized');
    }

    return next();
}