import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';

// Configurations and middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Prisma ORM
const prisma = new PrismaClient()
const PORT = process.env.PORT || 5000;

// Auth Routes
app.use('/api/auth', require('./routes/auth.route'));

// 404 Page
app.get("*", (req, res) => {
    res.status(404).json({ message: "Page not found" })
})

// Server
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
} catch (error) {
    console.error(error);
}