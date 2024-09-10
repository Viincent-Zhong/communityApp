import prisma from '../prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

enum CommentType {
    Profile = 1,
    Chat = 2,
    Sells = 3,
    Meeting = 4
};

export const createComment = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        const { content, id, type } = req.body;

        if (!content || !id || !type) {
            return res.status(400).json({ message: 'Missing parameters' });
        }

        const comment = await prisma.comment.create({
            data: {
                content,
                authorId: userData.id,
                [CommentType[type].toLowerCase() + 'Id']: id
            }
        });
        return res.status(200).json(comment);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};

// 
export const getComments = async (req: Request, res: Response) => {
    const authCookie = req.cookies.token;
    if (!authCookie) {
        return res.status(401).json({ message: 'Not logged in' });
    }
    try {
        jwt.verify(authCookie, JWT_SECRET);
        const id = parseInt(req.query.id as string);
        const type = parseInt(req.query.type as string);
        
        const comments = await prisma.comment.findMany({
            where: {
                [CommentType[type].toLowerCase() + 'Id']: id
            }
        });
        return res.status(200).json(comments);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
};