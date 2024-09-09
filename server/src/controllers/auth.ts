import prisma from '../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const login = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;

    if (authCookie) {
        try {
            jwt.verify(authCookie, JWT_SECRET);
        } catch(error) {
            res.clearCookie('token');
        }
        return res.status(200).json({ message: 'Already logged in'});
    }
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
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
                return res.status(401).json({ message: 'Invalid inputs' });
            }
            // Generate token
            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.json({ message: 'Logged in' });
        });
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: 'Email, name, and password are required' });
    }

    try {
        // Mail format ?
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        // Mail exist ?
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        // Generate token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000
        });
        return res.status(200).json({ message: 'User created' });
    } catch(error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const logout = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;

    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in'});
    }
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out' });
}