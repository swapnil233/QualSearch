const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Hash user's password
export const hashedPassword = async (password : string) => {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
};

// Compare user's password
export const comparePassword = async (password : string, hashedPassword : string) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

// Generate a token
export const generateToken = (id : any) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}