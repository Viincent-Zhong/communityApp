import prisma from '../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';;

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // Compare passwords
    bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!match) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        });
        res.json({ message: 'Logged in' });
    });
}

export const register = async (req: Request, res: Response) => {
}

export const logout = async (req: Request, res: Response) => {
}