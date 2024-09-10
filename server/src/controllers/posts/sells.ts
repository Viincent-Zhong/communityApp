import prisma from '../../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createSells = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        const { title, content, date, item, price, quantity } = req.body;

        if (!title || !content || !date || !item || !price || !quantity) {
            return res.status(400).json({ message: 'Missing fields' });
        }
    
        const sell = await prisma.sells.create({
            data: {
                title,
                content,
                authorId: userData.id,
                date,
                item,
                price,
                quantity
            }
        });
        return res.status(200).json(sell);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSells = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const sells = await prisma.sells.findMany();

        return res.status(200).json(sells);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getSell = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const sellId = parseInt(req.query.id as string);
        
        const sell = await prisma.sells.findUnique({
            where: {
                id: sellId
            }
        });
        return res.status(200).json(sell);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
