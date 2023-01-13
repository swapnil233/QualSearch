import { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const register = async (req : Request, res : Response) => {
    console.log("called");
    const {username, password, email, firstName, middleName, lastName} = req.body;

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a user
    const user = await prisma.user.create({
        data: {
            
        }
    })
}

export const login = async (req : Request, res : Response) => {
    res.json("works");
}