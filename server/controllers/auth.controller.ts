import { Request, Response } from "express";
import { hashedPassword, comparePassword, generateToken } from "../utils/authUtils";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const router = Router();
const prisma = new PrismaClient();

export const register = async (req : Request, res : Response) => {

}

export const login = async (req : Request, res : Response) => {

}