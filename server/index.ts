import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

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