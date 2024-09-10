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
        const userData : any = jwt.verify(authCookie, JWT_SECRET);
        const { title, content, date } = req.body;

        if (!title || !content || !date) {
            return res.status(400).json({ message: 'Missing fields' });
        }
    
        const meeting = await prisma.meeting.create({
            data: {
                title,
                content,
                authorId: userData.id,
                date
            }
        });
        return res.status(200).json(meeting);
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
        jwt.verify(authCookie, JWT_SECRET);
        const meetings = await prisma.meeting.findMany();

        return res.status(200).json(meetings);
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
        jwt.verify(authCookie, JWT_SECRET);
        const meetingId = parseInt(req.params.id);
        
        const meeting = await prisma.meeting.findUnique({
            where: {
                id: meetingId
            }
        });
        return res.status(200).json(meeting);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.clearCookie('token');
            return res.status(401).json({ message: 'Invalid token' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
};
