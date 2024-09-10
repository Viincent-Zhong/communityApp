import prisma from '../../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createMeeting = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        // User 
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        // return res.json(chat);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMeetings = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        // User 
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        // return res.json(chat);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMeeting = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        // User 
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        // return res.json(chat);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
