import prisma from '../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const getUser = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: {
                id: userData.id
            },
            select: {
                name: true,
                email: true,
                description: true,
                likeCounter: true,
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export const getUserFromId = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const userId = parseInt(req.params.id);

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                name: true,
                email: true,
                description: true,
                likeCounter: true,
            }
        });
        return res.status(200).json(user);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}