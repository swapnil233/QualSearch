import { Request } from "express";

export interface IGetUserAuthInfoRequest extends Request {
    payload: any;
}