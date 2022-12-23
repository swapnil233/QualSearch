"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
// import cors from 'cors';
const helmet_1 = __importDefault(require("helmet"));
// Configurations and middlewares
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(helmet_1.default);
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, morgan_1.default)('common'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// app.use(cors());
const PORT = process.env.PORT || 3000;
// 404 Page
app.get("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});
// Server
try {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
catch (error) {
    console.error(error);
}
