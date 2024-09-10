import prisma from '../../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const createChat = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Missing fields' });
        }
    
        const chat = await prisma.chat.create({
            data: {
                title,
                content,
                authorId: userData.id
            }
        });
        return res.status(200).json(chat);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getChats = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const chats = await prisma.chat.findMany();

        return res.status(200).json(chats);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getChat = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const chatId = parseInt(req.query.id as string);
        
        const chat = await prisma.chat.findUnique({
            where: {
                id: chatId
            }
        });
        return res.status(200).json(chat);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
